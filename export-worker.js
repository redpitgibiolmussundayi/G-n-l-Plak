/* Gönül Plak — dışa aktarma işçisi
   Tempo + ton (Signalsmith Stretch, canlı motorla aynı algoritma), EQ, ön kazanç, MP3/WAV kodlama, etiket + kapak. */
self.importScripts('stretch.js');

const post = (m, t) => self.postMessage(m, t || []);

async function stretchProcess(chs, sr, rate, semi, formant, prog) {
  const M = await self.SignalsmithStretchModule();
  if (M._main) M._main();
  M._presetDefault(2, sr);
  const inLat = M._inputLatency(), outLat = M._outputLatency();
  const bufLen = inLat + outLat;
  const ptr = M._setBuffers(2, bufLen);
  M._setTransposeSemitones(semi, 8000 / sr);
  M._setFormantSemitones(0, formant ? 1 : 0);
  M._setFormantBase(0);
  const N = chs[0].length, outN = Math.floor(N / rate);
  const out = [new Float32Array(outN), new Float32Array(outN)];
  const B = Math.min(1024, bufLen);
  const mem = () => (M.exports ? M.exports.memory.buffer : M.HEAP8.buffer);
  let lastProg = 0;
  for (let k = 0; k < outN; k += B) {
    const n = Math.min(B, outN - k);
    const inEnd = Math.round((k + outLat) * rate) + inLat;
    const start = inEnd - bufLen;
    let m = mem();
    for (let c = 0; c < 2; c++) {
      const dst = new Float32Array(m, ptr + bufLen * 4 * c, bufLen), src = chs[c];
      let i0 = 0;
      if (start < 0) { i0 = Math.min(bufLen, -start); dst.fill(0, 0, i0); }
      const s0 = start + i0, avail = Math.max(0, Math.min(bufLen - i0, N - s0));
      if (avail > 0) dst.set(src.subarray(s0, s0 + avail), i0);
      if (i0 + avail < bufLen) dst.fill(0, i0 + avail);
    }
    M._seek(bufLen, rate);
    M._process(0, n);
    m = mem();
    for (let c = 0; c < 2; c++) out[c].set(new Float32Array(m, ptr + bufLen * 4 * (c + 2), n), k);
    if (k - lastProg > sr * 4) { lastProg = k; prog(k / outN); }
  }
  return out;
}

/* Web Audio ile aynı RBJ formülleri */
function biquad(type, f0, gainDb, Q, sr) {
  const A = Math.pow(10, gainDb / 40), w0 = 2 * Math.PI * f0 / sr, cs = Math.cos(w0), sn = Math.sin(w0);
  let b0, b1, b2, a0, a1, a2;
  if (type === 'peaking') {
    const al = sn / (2 * Q);
    b0 = 1 + al * A; b1 = -2 * cs; b2 = 1 - al * A; a0 = 1 + al / A; a1 = -2 * cs; a2 = 1 - al / A;
  } else {
    const al = sn / 2 * Math.SQRT2, sA = 2 * Math.sqrt(A) * al;
    if (type === 'lowshelf') {
      b0 = A * ((A + 1) - (A - 1) * cs + sA); b1 = 2 * A * ((A - 1) - (A + 1) * cs); b2 = A * ((A + 1) - (A - 1) * cs - sA);
      a0 = (A + 1) + (A - 1) * cs + sA; a1 = -2 * ((A - 1) + (A + 1) * cs); a2 = (A + 1) + (A - 1) * cs - sA;
    } else {
      b0 = A * ((A + 1) + (A - 1) * cs + sA); b1 = -2 * A * ((A - 1) + (A + 1) * cs); b2 = A * ((A + 1) + (A - 1) * cs - sA);
      a0 = (A + 1) - (A - 1) * cs + sA; a1 = 2 * ((A - 1) - (A + 1) * cs); a2 = (A + 1) - (A - 1) * cs - sA;
    }
  }
  return [b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0];
}
function applyEq(chs, sr, freqs, gains, preDb) {
  const filters = freqs.map((f, i) => gains[i] ? biquad(i === 0 ? 'lowshelf' : i === freqs.length - 1 ? 'highshelf' : 'peaking', Math.min(f, sr * 0.45), gains[i], 1.1, sr) : null).filter(Boolean);
  const g = Math.pow(10, preDb / 20);
  let peak = 0;
  for (const x of chs) {
    for (const [b0, b1, b2, a1, a2] of filters) {
      let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
      for (let i = 0; i < x.length; i++) { const v = x[i], y = b0 * v + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2; x2 = x1; x1 = v; y2 = y1; y1 = y; x[i] = y; }
    }
    for (let i = 0; i < x.length; i++) { const v = x[i] * g; x[i] = v; const a = v < 0 ? -v : v; if (a > peak) peak = a; }
  }
  if (peak > 0.98) { const s = 0.98 / peak; for (const x of chs) for (let i = 0; i < x.length; i++) x[i] *= s; }
}

function toI16(x) { const o = new Int16Array(x.length); for (let i = 0; i < x.length; i++) { const v = Math.max(-1, Math.min(1, x[i])); o[i] = v < 0 ? v * 0x8000 : v * 0x7FFF; } return o; }

function wav(chs, sr) {
  const n = chs[0].length, b = new ArrayBuffer(44 + n * 4), v = new DataView(b);
  const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  w(0, 'RIFF'); v.setUint32(4, 36 + n * 4, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true);
  v.setUint16(22, 2, true); v.setUint32(24, sr, true); v.setUint32(28, sr * 4, true); v.setUint16(32, 4, true); v.setUint16(34, 16, true);
  w(36, 'data'); v.setUint32(40, n * 4, true);
  const L = toI16(chs[0]), R = toI16(chs[1]);
  for (let i = 0, o = 44; i < n; i++, o += 4) { v.setInt16(o, L[i], true); v.setInt16(o + 2, R[i], true); }
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
    const mime = 'image/jpeg', head = new Uint8Array(1 + mime.length + 1 + 1 + 1);
    let p = 0; head[p++] = 0; for (const ch of mime) head[p++] = ch.charCodeAt(0); head[p++] = 0; head[p++] = 3; head[p++] = 0;
    const img = new Uint8Array(tags.cover), d = new Uint8Array(head.length + img.length); d.set(head); d.set(img, head.length);
    frame('APIC', d);
  }
  const size = frames.reduce((a, f) => a + f.length, 0);
  const h = new Uint8Array(10); h.set([0x49, 0x44, 0x33, 3, 0, 0]);
  h[6] = (size >> 21) & 127; h[7] = (size >> 14) & 127; h[8] = (size >> 7) & 127; h[9] = size & 127;
  return [h, ...frames];
}

async function mp3(chs, sr, kbps, tags, prog) {
  if (!self.lamejs) self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.min.js');
  const enc = new self.lamejs.Mp3Encoder(2, sr, kbps);
  const L = toI16(chs[0]), R = toI16(chs[1]), parts = [], F = 1152 * 20;
  for (let i = 0; i < L.length; i += F) {
    const b = enc.encodeBuffer(L.subarray(i, i + F), R.subarray(i, i + F));
    if (b.length) parts.push(new Uint8Array(b));
    if ((i / F) % 50 === 0) prog(i / L.length);
  }
  const end = enc.flush(); if (end.length) parts.push(new Uint8Array(end));
  return new Blob([...id3(tags), ...parts], { type: 'audio/mpeg' });
}

self.onmessage = async e => {
  const d = e.data;
  try {
    let chs = [d.L, d.R];
    const sr = d.sr;
    if (Math.abs(d.rate - 1) > 1e-4 || Math.abs(d.semi) > 1e-4) {
      post({ type: 'stage', text: 'Tempo ve ton işleniyor', p: 0 });
      chs = await stretchProcess(chs, sr, d.rate, d.semi, d.formant, p => post({ type: 'stage', text: 'Tempo ve ton işleniyor', p }));
    }
    if (d.eq && (d.eq.some(Boolean) || d.preDb)) { post({ type: 'stage', text: 'Ekolayzır uygulanıyor', p: 1 }); applyEq(chs, sr, d.freqs, d.eq, d.preDb || 0); }
    let blob;
    if (d.format === 'wav') { post({ type: 'stage', text: 'WAV oluşturuluyor', p: 1 }); blob = wav(chs, sr); }
    else blob = await mp3(chs, sr, d.kbps || 256, d.tags || {}, p => post({ type: 'stage', text: 'MP3 kodlanıyor', p }));
    post({ type: 'done', blob, duration: chs[0].length / sr });
  } catch (err) { post({ type: 'error', message: String(err && err.message || err) }); }
};
