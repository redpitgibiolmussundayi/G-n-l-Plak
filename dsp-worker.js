/* Gönül Plak — ses işçisi: tempo/ton (Signalsmith Stretch), MP3/WAV kodlama */
self.importScripts('stretch.js');

let M = null, src = null, current = 0;
const post = (m, t) => self.postMessage(m, t || []);
const tick = () => new Promise(r => setTimeout(r, 0));

async function mod() { if (!M) { M = await self.SignalsmithStretchModule(); if (M._main) M._main(); } return M; }

async function stretch(job, chs, sr, from, to, rate, semi, formant) {
  const M = await mod();
  M._presetDefault(2, sr);
  M._reset && M._reset();
  const inLat = M._inputLatency(), outLat = M._outputLatency(), bufLen = inLat + outLat;
  const ptr = M._setBuffers(2, bufLen);
  M._setTransposeSemitones(semi, 8000 / sr);
  M._setFormantSemitones(0, formant ? 1 : 0);
  M._setFormantBase(0);
  const N = chs[0].length, a = Math.max(0, Math.floor(from * sr)), b = Math.min(N, Math.ceil(to * sr));
  const outN = Math.floor((b - a) / rate);
  const out = [new Float32Array(outN), new Float32Array(outN)];
  const B = Math.min(1024, bufLen);
  const mem = () => (M.exports ? M.exports.memory.buffer : M.HEAP8.buffer);
  let since = 0;
  for (let k = 0; k < outN; k += B) {
    const n = Math.min(B, outN - k);
    const inEnd = a + Math.round((k + outLat) * rate) + inLat, start = inEnd - bufLen;
    let m = mem();
    for (let c = 0; c < 2; c++) {
      const dst = new Float32Array(m, ptr + bufLen * 4 * c, bufLen), s = chs[c];
      let i0 = 0;
      if (start < 0) { i0 = Math.min(bufLen, -start); dst.fill(0, 0, i0); }
      const s0 = start + i0, avail = Math.max(0, Math.min(bufLen - i0, N - s0));
      if (avail > 0) dst.set(s.subarray(s0, s0 + avail), i0);
      if (i0 + avail < bufLen) dst.fill(0, i0 + avail);
    }
    M._seek(bufLen, rate);
    M._process(0, n);
    m = mem();
    for (let c = 0; c < 2; c++) out[c].set(new Float32Array(m, ptr + bufLen * 4 * (c + 2), n), k);
    since += n;
    if (since > sr * 3) { // ara ver: yeni iş geldiyse bunu bırak
      since = 0; post({ type: 'progress', job, p: k / outN });
      await tick(); if (job !== current) return null;
    }
  }
  return out;
}

function toI16(x) { const o = new Int16Array(x.length); for (let i = 0; i < x.length; i++) { const v = Math.max(-1, Math.min(1, x[i])); o[i] = v < 0 ? v * 0x8000 : v * 0x7FFF; } return o; }
function wav(chs, sr) {
  const n = chs[0].length, b = new ArrayBuffer(44 + n * 4), v = new DataView(b);
  const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  w(0, 'RIFF'); v.setUint32(4, 36 + n * 4, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true);
  v.setUint16(22, 2, true); v.setUint32(24, sr, true); v.setUint32(28, sr * 4, true); v.setUint16(32, 4, true); v.setUint16(34, 16, true);
  w(36, 'data'); v.setUint32(40, n * 4, true);
  const L = toI16(chs[0]), R = toI16(chs[1]), out = new Int16Array(b, 44, n * 2);
  for (let i = 0; i < n; i++) { out[i * 2] = L[i]; out[i * 2 + 1] = R[i]; }
  return new Blob([b], { type: 'audio/wav' });
}
function id3(tags) {
  const frames = [];
  const enc16 = s => { const u = new Uint8Array(3 + s.length * 2 + 2); u[0] = 1; u[1] = 0xFF; u[2] = 0xFE; for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); u[3 + i * 2] = c & 255; u[4 + i * 2] = c >> 8; } return u; };
  const frame = (id, data) => { const h = new Uint8Array(10); for (let i = 0; i < 4; i++) h[i] = id.charCodeAt(i); const n = data.length; h[4] = n >>> 24; h[5] = (n >> 16) & 255; h[6] = (n >> 8) & 255; h[7] = n & 255; frames.push(h, data); };
  if (tags.title) frame('TIT2', enc16(tags.title));
  if (tags.artist) frame('TPE1', enc16(tags.artist));
  if (tags.album) frame('TALB', enc16(tags.album));
  if (tags.year) frame('TYER', enc16(String(tags.year)));
  frame('TSSE', enc16('Gönül Plak'));
  if (tags.cover) {
    const mime = 'image/jpeg', head = new Uint8Array(mime.length + 4);
    let p = 0; head[p++] = 0; for (const ch of mime) head[p++] = ch.charCodeAt(0); head[p++] = 0; head[p++] = 3; head[p++] = 0;
    const img = new Uint8Array(tags.cover), d = new Uint8Array(head.length + img.length); d.set(head); d.set(img, head.length);
    frame('APIC', d);
  }
  const size = frames.reduce((a, f) => a + f.length, 0), h = new Uint8Array(10);
  h.set([0x49, 0x44, 0x33, 3, 0, 0]); h[6] = (size >> 21) & 127; h[7] = (size >> 14) & 127; h[8] = (size >> 7) & 127; h[9] = size & 127;
  return [h, ...frames];
}
async function mp3(job, chs, sr, kbps, tags) {
  if (!self.lamejs) self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.min.js');
  const enc = new self.lamejs.Mp3Encoder(2, sr, kbps), L = toI16(chs[0]), R = toI16(chs[1]), parts = [], F = 1152 * 20;
  for (let i = 0; i < L.length; i += F) {
    const b = enc.encodeBuffer(L.subarray(i, i + F), R.subarray(i, i + F));
    if (b.length) parts.push(new Uint8Array(b));
    if ((i / F) % 40 === 0) post({ type: 'progress', job, p: i / L.length });
  }
  const end = enc.flush(); if (end.length) parts.push(new Uint8Array(end));
  return new Blob([...id3(tags), ...parts], { type: 'audio/mpeg' });
}

self.onmessage = async e => {
  const d = e.data;
  try {
    if (d.type === 'load') { src = { chs: [d.L, d.R], sr: d.sr }; current = 0; post({ type: 'loaded', job: d.job }); return; }
    if (d.type === 'cancel') { current = -1; return; }
    if (d.type === 'stretch') {
      current = d.job;
      const out = await stretch(d.job, src.chs, src.sr, d.from, d.to, d.rate, d.semi, d.formant);
      if (!out) return post({ type: 'cancelled', job: d.job });
      post({ type: 'stretched', job: d.job, L: out[0], R: out[1] }, [out[0].buffer, out[1].buffer]);
      return;
    }
    if (d.type === 'wav') { const blob = wav([d.L, d.R], d.sr); post({ type: 'encoded', job: d.job, blob }); return; }
    if (d.type === 'mp3') { const blob = await mp3(d.job, [d.L, d.R], d.sr, d.kbps, d.tags || {}); post({ type: 'encoded', job: d.job, blob }); return; }
  } catch (err) { post({ type: 'error', job: d.job, message: String(err && err.message || err) }); }
};
