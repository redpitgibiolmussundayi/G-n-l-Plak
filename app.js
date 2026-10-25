/* Gönül Plak — uygulama */
(() => {
'use strict';

/* ================= Yardımcılar ================= */
const C = window.GP_CONFIG || {};
const VERSION = 8;
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = t => { if (!isFinite(t) || t < 0) t = 0; const m = Math.floor(t / 60), s = Math.floor(t % 60); return m + ':' + String(s).padStart(2, '0'); };
const num = (v, d = 2) => v.toFixed(d).replace('.', ',').replace('-', '−');
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const norm = s => String(s || '').toLocaleLowerCase('tr-TR').replace(/ı/g, 'i').normalize('NFD')
  .replace(/[̀-ͯ]/g, '').replace(/\(.*?\)|\[.*?\]/g, ' ').replace(/\b(feat|ft)\b.*$/, '')
  .replace(/\b(remaster(ed)?|live|canli|official|video|audio|klip)\b/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};
function toast(msg) { const t = $('toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2800); }
function loadScript(src) {
  return new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = src; s.async = true;
    s.onload = res; s.onerror = () => rej(new Error('yüklenemedi: ' + src));
    document.head.appendChild(s);
  });
}
const stretchLib = () => window.SignalsmithStretch ? Promise.resolve() : (stretchLib.p = stretchLib.p || loadScript('stretch.js').catch(e => { stretchLib.p = null; throw e; }));
const raf = fn => { let q = false; return (...a) => { if (q) return; q = true; requestAnimationFrame(() => { q = false; fn(...a); }); }; };

/* ================= Yerel depo (IndexedDB) ================= */
const DB = (() => {
  let db = null;
  const open = () => new Promise(res => {
    try {
      const r = indexedDB.open('gonulplak', 2);
      r.onupgradeneeded = () => {
        const d = r.result;
        if (!d.objectStoreNames.contains('songs')) d.createObjectStore('songs', { keyPath: 'id' });
        if (!d.objectStoreNames.contains('lists')) d.createObjectStore('lists', { keyPath: 'id' });
      };
      r.onsuccess = () => { db = r.result; res(true); };
      r.onerror = r.onblocked = () => res(false);
    } catch (e) { res(false); }
  });
  const run = (store, mode, fn) => new Promise(res => {
    if (!db) return res(null);
    try {
      const t = db.transaction(store, mode); const r = fn(t.objectStore(store));
      t.oncomplete = () => res(r ? r.result : true); t.onerror = t.onabort = () => res(null);
    } catch (e) { res(null); }
  });
  return {
    open,
    all: s => run(s, 'readonly', o => o.getAll()).then(r => r || []),
    put: (s, v) => run(s, 'readwrite', o => o.put(v)),
    del: (s, id) => run(s, 'readwrite', o => o.delete(id))
  };
})();

/* ================= Etiket okuma (ID3 v1/v2, M4A) ================= */
const Tags = (() => {
  const syncsafe = (b, i) => ((b[i] & 0x7f) << 21) | ((b[i+1] & 0x7f) << 14) | ((b[i+2] & 0x7f) << 7) | (b[i+3] & 0x7f);
  const be32 = (b, i) => ((b[i] << 24) >>> 0) + (b[i+1] << 16) + (b[i+2] << 8) + b[i+3];
  function text(enc, bytes) {
    try {
      let s;
      if (enc === 1) {
        if (bytes[0] === 0xFE && bytes[1] === 0xFF) s = new TextDecoder('utf-16be').decode(bytes.subarray(2));
        else if (bytes[0] === 0xFF && bytes[1] === 0xFE) s = new TextDecoder('utf-16le').decode(bytes.subarray(2));
        else s = new TextDecoder('utf-16le').decode(bytes);
      } else if (enc === 2) s = new TextDecoder('utf-16be').decode(bytes);
      else if (enc === 3) s = new TextDecoder('utf-8').decode(bytes);
      else s = new TextDecoder('windows-1254').decode(bytes); // Türkçe eski MP3'ler genelde bu kodlamada
      return s.split('\u0000')[0].trim();
    } catch (e) { return ''; }
  }
  function apic(d) {
    const enc = d[0]; let i = 1;
    while (i < d.length && d[i] !== 0) i++;
    let mime = new TextDecoder('latin1').decode(d.subarray(1, i)).toLowerCase() || 'image/jpeg';
    if (!mime.includes('/')) mime = 'image/' + (mime === 'jpg' ? 'jpeg' : mime);
    i += 2; // null + resim tipi
    if (enc === 1 || enc === 2) { while (i + 1 < d.length && !(d[i] === 0 && d[i+1] === 0)) i += 2; i += 2; }
    else { while (i < d.length && d[i] !== 0) i++; i++; }
    if (i >= d.length) return null;
    return new Blob([d.slice(i)], { type: mime });
  }
  async function id3(file, out) {
    const head = new Uint8Array(await file.slice(0, 10).arrayBuffer());
    if (!(head[0] === 0x49 && head[1] === 0x44 && head[2] === 0x33)) return;
    const ver = head[3], flags = head[5], size = syncsafe(head, 6);
    if (ver < 3) return;
    let buf = new Uint8Array(await file.slice(10, 10 + size).arrayBuffer());
    if (flags & 0x80 && ver === 3) { // unsynchronisation
      const o = []; for (let i = 0; i < buf.length; i++) { o.push(buf[i]); if (buf[i] === 0xFF && buf[i+1] === 0x00) i++; }
      buf = Uint8Array.from(o);
    }
    let p = 0;
    if (flags & 0x40) p += ver === 4 ? syncsafe(buf, 0) : be32(buf, 0) + 4;
    while (p + 10 <= buf.length) {
      const id = String.fromCharCode(buf[p], buf[p+1], buf[p+2], buf[p+3]);
      if (!/^[A-Z0-9]{4}$/.test(id)) break;
      const fs = ver === 4 ? syncsafe(buf, p + 4) : be32(buf, p + 4);
      let data = buf.subarray(p + 10, p + 10 + fs);
      if (ver === 4 && (buf[p + 9] & 0x01)) data = data.subarray(4);
      p += 10 + fs;
      if (fs <= 0) continue;
      if (id === 'TIT2') out.title ||= text(data[0], data.subarray(1));
      else if (id === 'TPE1') out.artist ||= text(data[0], data.subarray(1));
      else if (id === 'TALB') out.album ||= text(data[0], data.subarray(1));
      else if (id === 'TYER' || id === 'TDRC') out.year ||= text(data[0], data.subarray(1)).slice(0, 4);
      else if (id === 'APIC' && !out.cover) out.cover = apic(data);
    }
  }
  async function id3v1(file, out) {
    if (file.size < 128) return;
    const t = new Uint8Array(await file.slice(file.size - 128).arrayBuffer());
    if (!(t[0] === 84 && t[1] === 65 && t[2] === 71)) return;
    const d = new TextDecoder('windows-1254');
    const f = (a, b) => d.decode(t.subarray(a, b)).split('\u0000')[0].trim();
    out.title ||= f(3, 33); out.artist ||= f(33, 63); out.album ||= f(63, 93); out.year ||= f(93, 97);
  }
  async function viaLib(file, out) {
    if (!window.jsmediatags) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js');
    const tags = await new Promise((res, rej) => window.jsmediatags.read(file, { onSuccess: r => res(r.tags), onError: rej }));
    out.title ||= tags.title; out.artist ||= tags.artist; out.album ||= tags.album; out.year ||= String(tags.year || '').slice(0, 4);
    if (!out.cover && tags.picture) out.cover = new Blob([new Uint8Array(tags.picture.data)], { type: tags.picture.format || 'image/jpeg' });
  }
  function fromName(name) {
    const n = name.replace(/\.[^.]+$/, '').replace(/_/g, ' ').replace(/^\d{1,3}[\s.\-]+/, '').replace(/\s+/g, ' ').trim();
    const p = n.split(/\s+-\s+/);
    if (p.length > 1) return { artist: p[0].trim(), title: p.slice(1).join(' - ').trim() };
    return { title: n };
  }
  async function read(file) {
    const out = {};
    try { await id3(file, out); } catch (e) {}
    try { await id3v1(file, out); } catch (e) {}
    if ((!out.title || !out.artist) && /\.(m4a|mp4|aac|alac)$/i.test(file.name || '')) { try { await viaLib(file, out); } catch (e) {} }
    const fb = fromName(file.name || '');
    out.title = (out.title || fb.title || 'İsimsiz şarkı').trim();
    out.artist = (out.artist || fb.artist || '').trim();
    if (out.cover) out.cover = await Img.square(out.cover);
    return out;
  }
  return { read };
})();

/* ================= Görsel ================= */
const Img = {
  async square(blob, size = 600) {
    try {
      const bmp = await createImageBitmap(blob);
      const s = Math.min(bmp.width, bmp.height), o = Math.min(size, s);
      const c = document.createElement('canvas'); c.width = c.height = o;
      c.getContext('2d').drawImage(bmp, (bmp.width - s) / 2, (bmp.height - s) / 2, s, s, 0, 0, o, o);
      bmp.close && bmp.close();
      return await new Promise(r => c.toBlob(b => r(b || blob), 'image/jpeg', 0.86));
    } catch (e) { return blob; }
  },
  async fromUrl(url) {
    try { const r = await fetch(url, { mode: 'cors' }); if (!r.ok) return null; return await Img.square(await r.blob()); } catch (e) { return null; }
  },
  cache: new Map(),
  url(s) {
    if (!s) return null;
    if (s.cover instanceof Blob) {
      const c = Img.cache.get(s.id);
      if (c && c.blob === s.cover) return c.url;
      if (c) URL.revokeObjectURL(c.url);
      const url = URL.createObjectURL(s.cover); Img.cache.set(s.id, { blob: s.cover, url }); return url;
    }
    return s.coverUrl || null;
  },
  drop(id) { const c = Img.cache.get(id); if (c) { URL.revokeObjectURL(c.url); Img.cache.delete(id); } }
};

/* ================= Efekt zinciri (canlı ve hazırlamalı motorda aynı) ================= */
const FREQS = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
const FX_DEFAULT = {
  rate: 1, semi: 0, formant: true,
  preOn: false, pre: 0, eqOn: true, eq: FREQS.map(() => 0), eqPreset: 'flat',
  rvbOn: false, rvbType: 'gazino', rvbMix: 0.3,
  echoOn: false, echoTime: 0.32, echoFb: 0.3, echoMix: 0.25,
  tapeOn: false, tapeWow: 0.5, tapeHiss: 0.3,
  vinylOn: false, vinyl: 0.4,
  radioOn: false,
  d8On: false, d8Speed: 0.12,
  preset: 'orijinal'
};
const RVB_TYPES = { oda: 'Oda', gazino: 'Gazino', hamam: 'Hamam', konser: 'Konser' };
const IR_CACHE = new Map();
function makeIR(ctx, type) {
  const sr = ctx.sampleRate, key = type + sr;
  if (IR_CACHE.has(key)) return IR_CACHE.get(key);
  const P = { oda: [0.8, 3.2, 0.006, 6500, 0], gazino: [2.3, 2.6, 0.022, 5200, 0], hamam: [3.0, 1.9, 0.010, 9500, 1], konser: [3.8, 2.4, 0.030, 4300, 0] }[type] || [2, 2.5, 0.02, 5000, 0];
  const [sec, decay, pre, tone, taps] = P, len = Math.round(sr * sec), buf = ctx.createBuffer(2, len, sr);
  let rnd = 12345 + type.length * 777; const rand = () => (rnd = (rnd * 16807) % 2147483647) / 2147483647 * 2 - 1;
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c), a = Math.exp(-2 * Math.PI * tone / sr), p0 = Math.round(pre * sr);
    let lp = 0, e = 0;
    for (let i = 0; i < len; i++) {
      const n = i < p0 ? 0 : rand() * Math.pow(1 - i / len, decay);
      lp = lp * a + n * (1 - a); d[i] = lp; e += lp * lp;
    }
    if (taps) [0.031, 0.047, 0.069, 0.093, 0.121].forEach((t, k) => { const i = Math.round((t + c * 0.004) * sr); if (i < len) d[i] += (0.5 - k * 0.07) * (k % 2 ? -1 : 1) * Math.sqrt(e / len) * 30; });
    const g = 1 / Math.sqrt(e / len * sr * 0.5 + 1e-9);
    for (let i = 0; i < len; i++) d[i] *= g;
  }
  IR_CACHE.set(key, buf); return buf;
}
function noiseBuf(ctx, kind) {
  const sr = ctx.sampleRate, len = sr * (kind === 'crackle' ? 5 : 3), b = ctx.createBuffer(2, len, sr);
  let rnd = kind === 'crackle' ? 99 : 7; const rand = () => (rnd = (rnd * 16807) % 2147483647) / 2147483647;
  for (let c = 0; c < 2; c++) {
    const d = b.getChannelData(c);
    if (kind === 'hiss') { for (let i = 0; i < len; i++) d[i] = rand() * 2 - 1; continue; }
    let rum = 0;
    for (let i = 0; i < len; i++) { rum = rum * 0.995 + (rand() * 2 - 1) * 0.005; d[i] = rum * 0.6; }
    const pops = Math.round(len / sr * 26);
    for (let k = 0; k < pops; k++) {
      const at = Math.floor(rand() * (len - 400)), amp = (rand() < 0.12 ? 0.9 : 0.25) * (rand() < 0.5 ? -1 : 1), w = 8 + Math.floor(rand() * 60);
      for (let j = 0; j < w; j++) d[at + j] += amp * Math.exp(-j / (w * 0.25)) * (rand() * 2 - 1 > -0.2 ? 1 : -0.5);
    }
  }
  return b;
}
function buildGraph(ctx) {
  const n = {}, G = () => ctx.createGain(), nyq = ctx.sampleRate / 2 - 200;
  n.input = G(); n.pre = G();
  n.eq = FREQS.map((f, i) => { const b = ctx.createBiquadFilter(); b.type = i === 0 ? 'lowshelf' : i === FREQS.length - 1 ? 'highshelf' : 'peaking'; b.frequency.value = Math.min(f, nyq); b.Q.value = 1.1; return b; });
  n.hp = ctx.createBiquadFilter(); n.hp.type = 'highpass'; n.hp.Q.value = 0.7; n.hp.frequency.value = 10;
  n.lp = ctx.createBiquadFilter(); n.lp.type = 'lowpass'; n.lp.Q.value = 0.7; n.lp.frequency.value = nyq;
  n.wow = ctx.createDelay(0.1); n.wow.delayTime.value = 0.008;
  n.wowLfo = ctx.createOscillator(); n.wowLfo.frequency.value = 0.55; n.wowDepth = G(); n.wowDepth.gain.value = 0;
  n.flLfo = ctx.createOscillator(); n.flLfo.frequency.value = 6.3; n.flDepth = G(); n.flDepth.gain.value = 0;
  n.wowLfo.connect(n.wowDepth).connect(n.wow.delayTime); n.flLfo.connect(n.flDepth).connect(n.wow.delayTime);
  n.dry = G(); n.conv = ctx.createConvolver(); n.rvb = G(); n.rvb.gain.value = 0;
  n.echo = ctx.createDelay(2); n.echoFb = G(); n.echoFb.gain.value = 0; n.echoLp = ctx.createBiquadFilter(); n.echoLp.type = 'lowpass'; n.echoLp.frequency.value = 3600;
  n.echoWet = G(); n.echoWet.gain.value = 0;
  n.mix = G(); n.master = G(); n.output = G();
  n.pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
  n.panLfo = ctx.createOscillator(); n.panLfo.frequency.value = 0.12; n.panDepth = G(); n.panDepth.gain.value = 0;
  n.lim = ctx.createDynamicsCompressor(); n.lim.threshold.value = -1; n.lim.knee.value = 0; n.lim.ratio.value = 20; n.lim.attack.value = 0.002; n.lim.release.value = 0.12;
  n.hissSrc = ctx.createBufferSource(); n.hissSrc.buffer = noiseBuf(ctx, 'hiss'); n.hissSrc.loop = true;
  n.hissHp = ctx.createBiquadFilter(); n.hissHp.type = 'highpass'; n.hissHp.frequency.value = 2500; n.hiss = G(); n.hiss.gain.value = 0;
  n.crackSrc = ctx.createBufferSource(); n.crackSrc.buffer = noiseBuf(ctx, 'crackle'); n.crackSrc.loop = true; n.crack = G(); n.crack.gain.value = 0;

  let x = n.input; x.connect(n.pre); x = n.pre;
  n.eq.forEach(b => { x.connect(b); x = b; });
  x.connect(n.hp); n.hp.connect(n.lp); n.lp.connect(n.wow);
  n.wow.connect(n.dry); n.dry.connect(n.mix);
  n.wow.connect(n.conv); n.conv.connect(n.rvb); n.rvb.connect(n.mix);
  n.wow.connect(n.echo); n.echo.connect(n.echoLp); n.echoLp.connect(n.echoFb); n.echoFb.connect(n.echo); n.echo.connect(n.echoWet); n.echoWet.connect(n.mix);
  if (n.pan) { n.mix.connect(n.pan); n.pan.connect(n.master); n.panLfo.connect(n.panDepth).connect(n.pan.pan); } else n.mix.connect(n.master);
  n.hissSrc.connect(n.hissHp).connect(n.hiss).connect(n.master);
  n.crackSrc.connect(n.crack).connect(n.master);
  n.master.connect(n.lim); n.lim.connect(n.output);

  let irType = null;
  n.apply = (fx, smooth) => {
    const t = ctx.currentTime, set = (p, v) => smooth ? p.setTargetAtTime(v, t, 0.04) : (p.value = v);
    const g = fx.eqOn ? fx.eq : FREQS.map(() => 0);
    g.forEach((v, i) => set(n.eq[i].gain, v));
    const boost = Math.max(0, ...g);
    set(n.pre.gain, fx.preOn ? Math.pow(10, fx.pre / 20) : Math.pow(10, -boost * 0.6 / 20));
    let hp = 10, lp = nyq;
    if (fx.tapeOn) { hp = 70; lp = 7800; }
    if (fx.vinylOn) { hp = Math.max(hp, 40); lp = Math.min(lp, 12500); }
    if (fx.radioOn) { hp = 420; lp = 3300; }
    set(n.hp.frequency, hp); set(n.lp.frequency, Math.min(lp, nyq));
    set(n.wowDepth.gain, fx.tapeOn ? 0.0024 * fx.tapeWow : 0); set(n.flDepth.gain, fx.tapeOn ? 0.00035 * fx.tapeWow : 0);
    set(n.hiss.gain, fx.tapeOn ? 0.018 * fx.tapeHiss : 0);
    set(n.crack.gain, fx.vinylOn ? 0.32 * fx.vinyl : 0);
    if (fx.rvbOn && irType !== fx.rvbType) { irType = fx.rvbType; n.conv.buffer = makeIR(ctx, fx.rvbType); }
    set(n.rvb.gain, fx.rvbOn ? fx.rvbMix * 1.25 : 0);
    set(n.dry.gain, fx.rvbOn ? 1 - fx.rvbMix * 0.35 : 1);
    set(n.echo.delayTime, fx.echoTime); set(n.echoFb.gain, fx.echoOn ? fx.echoFb : 0); set(n.echoWet.gain, fx.echoOn ? fx.echoMix : 0);
    set(n.panDepth.gain, fx.d8On && n.pan ? 0.85 : 0); set(n.panLfo.frequency, fx.d8Speed);
    set(n.master.gain, fx.radioOn ? 1.6 : 1);
  };
  n.start = (when = 0) => { [n.wowLfo, n.flLfo, n.panLfo, n.hissSrc, n.crackSrc].forEach(s => { try { s.start(when); } catch (e) {} }); };
  n.stop = () => { [n.wowLfo, n.flLfo, n.panLfo, n.hissSrc, n.crackSrc].forEach(s => { try { s.stop(); } catch (e) {} }); };
  return n;
}
const fxNeedsStretch = fx => Math.abs(fx.rate - 1) > 0.001 || Math.abs(fx.semi) > 0.001;
const fxNeutral = fx => !fxNeedsStretch(fx) && !(fx.eqOn && fx.eq.some(Boolean)) && !(fx.preOn && fx.pre) && !fx.rvbOn && !fx.echoOn && !fx.tapeOn && !fx.vinylOn && !fx.radioOn && !fx.d8On;
const fxTail = fx => (fx.rvbOn ? 4 : 0) + (fx.echoOn ? Math.min(6, fx.echoTime * 8) : 0);

function wavBlob(buf) {
  const n = buf.length, ch = [buf.getChannelData(0), buf.numberOfChannels > 1 ? buf.getChannelData(1) : buf.getChannelData(0)];
  const b = new ArrayBuffer(44 + n * 4), v = new DataView(b), sr = buf.sampleRate;
  const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  w(0, 'RIFF'); v.setUint32(4, 36 + n * 4, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true);
  v.setUint16(22, 2, true); v.setUint32(24, sr, true); v.setUint32(28, sr * 4, true); v.setUint16(32, 4, true); v.setUint16(34, 16, true);
  w(36, 'data'); v.setUint32(40, n * 4, true);
  const o = new Int16Array(b, 44, n * 2), L = ch[0], R = ch[1];
  for (let i = 0, j = 0; i < n; i++, j += 2) {
    let a = L[i]; a = a > 1 ? 1 : a < -1 ? -1 : a; o[j] = a < 0 ? a * 32768 : a * 32767;
    let c = R[i]; c = c > 1 ? 1 : c < -1 ? -1 : c; o[j + 1] = c < 0 ? c * 32768 : c * 32767;
  }
  return new Blob([b], { type: 'audio/wav' });
}
const OAC = () => window.OfflineAudioContext || window.webkitOfflineAudioContext;
function decodeAt(ab, sr = 44100) { return new Promise((res, rej) => { const oc = new (OAC())(2, 1, sr); const p = oc.decodeAudioData(ab, res, rej); if (p && p.catch) p.catch(rej); }); }
function renderOffline(oc) { return new Promise((res, rej) => { oc.oncomplete = e => res(e.renderedBuffer); const p = oc.startRendering(); if (p && p.then) p.then(res, rej); }); }

/* İşçi yardımcısı */
function DSP() {
  const w = new Worker('dsp-worker.js'); let id = 0; const wait = new Map();
  w.onmessage = e => { const d = e.data, h = wait.get(d.job); if (!h) return; if (d.type === 'progress') return h.prog && h.prog(d.p); wait.delete(d.job); d.type === 'error' ? h.rej(new Error(d.message)) : h.res(d); };
  w.onerror = e => { wait.forEach(h => h.rej(new Error(e.message || 'işçi hatası'))); wait.clear(); };
  return {
    call(msg, transfer, prog) { const job = ++id; return new Promise((res, rej) => { wait.set(job, { res, rej, prog }); w.postMessage(Object.assign({ job }, msg), transfer || []); }); },
    cancel() { w.postMessage({ type: 'cancel' }); wait.forEach((h, job) => h.res({ type: 'cancelled', job })); wait.clear(); },
    end() { w.terminate(); }
  };
}

/* İşlenmiş ses üret: [from,to] aralığı (giriş saniyesi) → AudioBuffer */
async function processRange(dsp, src, fx, from, to, opts = {}) {
  const sr = src.sampleRate;
  let L, R;
  if (fxNeedsStretch(fx)) {
    const r = await dsp.call({ type: 'stretch', from, to, rate: fx.rate, semi: fx.semi, formant: fx.formant }, [], opts.prog);
    if (r.type !== 'stretched') return null;
    L = r.L; R = r.R;
  } else {
    const a = Math.floor(from * sr), b = Math.min(src.length, Math.ceil(to * sr));
    L = src.getChannelData(0).slice(a, b); R = (src.numberOfChannels > 1 ? src.getChannelData(1) : src.getChannelData(0)).slice(a, b);
  }
  if (opts.cancelled && opts.cancelled()) return null;
  const tail = opts.tail ? Math.round(fxTail(fx) * sr) : 0;
  const oc = new (OAC())(2, L.length + tail, sr);
  const b = oc.createBuffer(2, L.length, sr); b.copyToChannel(L, 0); b.copyToChannel(R, 1);
  const s = oc.createBufferSource(); s.buffer = b;
  const g = buildGraph(oc); g.apply(fx, false); s.connect(g.input); g.output.connect(oc.destination); g.start(0); s.start(0);
  return renderOffline(oc);
}

/* ================= Ses motoru ================= */
const Engine = (() => {
  const fx = Object.assign({}, FX_DEFAULT, LS.get('gp-fx2', {}));
  fx.eq = (fx.eq && fx.eq.length === 10) ? fx.eq : FREQS.map(() => 0);
  let mode = LS.get('gp-engine2', 'live') === 'render' ? 'render' : 'live';
  let duration = 0, pos = 0, playing = false, loadedId = null, curBlob = null;
  const L = { time() {}, end() {}, mode() {}, state() {}, busy() {} };
  const diag = [];
  function log(m) { diag.push(new Date().toTimeString().slice(0, 8) + ' ' + m); if (diag.length > 40) diag.shift(); }
  window.addEventListener('error', e => log('JS hata: ' + (e.message || '')));
  window.addEventListener('unhandledrejection', e => log('Hata: ' + ((e.reason && e.reason.message) || e.reason)));
  try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}

  /* ---- ortak: HTML ses elemanı (hazırlamalı motor ve iOS kilitleri için) ---- */
  let el = null, silent = null, primed = false;
  function silentUrl() {
    const sr = 8000, n = 800, b = new ArrayBuffer(44 + n * 2), v = new DataView(b);
    const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, n * 2, true);
    return URL.createObjectURL(new Blob([b], { type: 'audio/wav' }));
  }
  function makeEl() {
    if (el) return;
    el = new Audio(); el.setAttribute('playsinline', ''); el.preload = 'auto';
    el.addEventListener('timeupdate', () => { if (mode !== 'render' || !seg) return; pos = seg.inStart + el.currentTime * seg.rate; L.time(pos); });
    el.addEventListener('ended', () => {
      if (mode !== 'render' || !seg) return;
      if (seg.full) { playing = false; L.end(); }
      else { waitFull = true; L.busy('Devamı hazırlanıyor…'); }
    });
    el.addEventListener('pause', () => { if (mode === 'render' && playing && !swapping && !waitFull && el.currentTime < el.duration - 0.2) { playing = false; L.state(); } });
    el.addEventListener('play', () => { if (mode === 'render' && !playing) { playing = true; L.state(); } });
  }

  /* ---- canlı motor ---- */
  let ctx = null, stretch = null, graph = null, initP = null, watchdog = 0;
  function unlockCtx() {
    if (!ctx) {
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: 'playback' });
        log('AudioContext ' + ctx.sampleRate + ' Hz, ' + ctx.state);
        ctx.onstatechange = () => { log('AudioContext: ' + ctx.state); if (playing && mode === 'live' && ctx.state !== 'running' && ctx.state !== 'closed') ctx.resume().catch(() => {}); };
      } catch (e) { log('AudioContext açılamadı'); return; }
    }
    if (ctx.state !== 'running') ctx.resume().catch(e => log('resume: ' + e.message));
    try { const b = ctx.createBuffer(1, 1, ctx.sampleRate), s = ctx.createBufferSource(); s.buffer = b; s.connect(ctx.destination); s.start(0); } catch (e) {} // klasik iOS kilidi
  }
  function unlock() {
    try { if (navigator.audioSession && navigator.audioSession.type !== 'playback') navigator.audioSession.type = 'playback'; } catch (e) {}
    makeEl();
    if (!primed) { primed = true; silent = silent || silentUrl(); if (!el.src) { el.src = silent; el.play().then(() => { if (el.src === silent) el.pause(); }).catch(() => { primed = false; }); } }
    if (mode === 'live') unlockCtx();
  }
  function initLive() {
    if (initP) return initP;
    initP = (async () => {
      if (!ctx) unlockCtx();
      if (!ctx || !ctx.audioWorklet) throw new Error('AudioWorklet yok');
      await stretchLib();
      stretch = await Promise.race([window.SignalsmithStretch(ctx), new Promise((_, r) => setTimeout(() => r(new Error('motor 6 sn içinde açılmadı')), 6000))]);
      stretch.onprocessorerror = () => { log('canlı motor çöktü'); if (playing) toRender(); };
      graph = buildGraph(ctx); graph.apply(fx, false); graph.start(0);
      stretch.connect(graph.input); graph.output.connect(ctx.destination);
      stretch.setUpdateInterval(0.08, t => {
        if (mode !== 'live') return;
        pos = t; L.time(t);
        if (playing && duration && t >= duration - 0.04) { playing = false; stretch.schedule({ active: false }); L.end(); }
      });
      log('Canlı motor hazır');
    })();
    initP.catch(e => { log('Canlı motor: ' + e.message); initP = null; });
    return initP;
  }
  const params = () => ({ rate: fx.rate, semitones: fx.semi, formantCompensation: fx.formant, formantBaseHz: 0 });
  /* ---- hazırlamalı motor ---- */
  let dsp = null, src = null, seg = null, job = 0, waitFull = false, swapping = false, origUrl = null, dirtyT = 0, applyBusy = false;
  const urls = new Set();
  function setSeg(s, at, autoplay) {
    const old = seg; seg = s; swapping = true;
    el.src = s.url;
    const go = () => {
      try { el.currentTime = Math.max(0, (at - s.inStart) / s.rate); } catch (e) {}
      swapping = false;
      if (autoplay) el.play().catch(e => { log('oynatma reddedildi: ' + e.message); playing = false; L.state(); L.busy(null); });
      if (old && old.url !== origUrl && old.url !== s.url) { URL.revokeObjectURL(old.url); urls.delete(old.url); }
    };
    el.addEventListener('loadedmetadata', go, { once: true });
    el.load();
  }
  async function prepare(at, autoplay) {
    const my = ++job; waitFull = false;
    if (dsp) dsp.cancel();
    if (fxNeutral(fx)) { setSeg({ url: origUrl, inStart: 0, rate: 1, full: true }, at, autoplay); L.busy(null); return; }
    L.busy(seg ? 'Uygulanıyor…' : 'Ses hazırlanıyor…');
    const stale = () => my !== job;
    try {
      const qTo = Math.min(duration, at + 18 * fx.rate);
      const q = await processRange(dsp, src, fx, at, qTo, { cancelled: stale, tail: qTo >= duration - 0.01 });
      if (!q || stale()) return;
      const qUrl = URL.createObjectURL(wavBlob(q)); urls.add(qUrl);
      const full = qTo >= duration - 0.01;
      const p = seg && playing ? curPos() : at;
      setSeg({ url: qUrl, inStart: at, rate: fx.rate, full, end: qTo }, Math.max(at, Math.min(p, qTo - 0.5)), autoplay || playing);
      L.busy(null);
      if (full) return;
      const f = await processRange(dsp, src, fx, 0, duration, { cancelled: stale, tail: true });
      if (!f || stale()) return;
      const fUrl = URL.createObjectURL(wavBlob(f)); urls.add(fUrl);
      const wasWaiting = waitFull; waitFull = false;
      setSeg({ url: fUrl, inStart: 0, rate: fx.rate, full: true }, curPos(), playing || wasWaiting);
      L.busy(null);
    } catch (e) { if (!stale()) { log('Hazırlama hatası: ' + e.message); L.busy(null); } }
  }
  const curPos = () => seg ? seg.inStart + (el.currentTime || 0) * seg.rate : pos;

  async function loadRender(id, blob, cancelled) {
    makeEl();
    if (!dsp) dsp = DSP();
    dsp.cancel(); job++;
    const ab = await blob.arrayBuffer(); if (cancelled()) return false;
    src = await decodeAt(ab); if (cancelled()) return false;
    duration = src.duration; pos = 0;
    const L0 = src.getChannelData(0).slice(), R0 = (src.numberOfChannels > 1 ? src.getChannelData(1) : src.getChannelData(0)).slice();
    await dsp.call({ type: 'load', L: L0, R: R0, sr: src.sampleRate }, [L0.buffer, R0.buffer]);
    if (cancelled()) return false;
    if (origUrl) URL.revokeObjectURL(origUrl);
    origUrl = URL.createObjectURL(blob);
    urls.forEach(u => URL.revokeObjectURL(u)); urls.clear(); seg = null;
    loadedId = id;
    log('Şarkı hazır (' + Math.round(duration) + ' sn, hazırlamalı)');
    return true;
  }

  /* ---- canlıdan hazırlamalıya geçiş ---- */
  async function toRender() {
    if (mode === 'render') return;
    const at = pos, id = loadedId, wasPlaying = playing;
    mode = 'render'; LS.set('gp-engine2', 'render'); log('Hazırlamalı motora geçildi');
    try { stretch && stretch.schedule({ active: false }); } catch (e) {}
    playing = false; L.mode();
    if (!curBlob || !id) return;
    const ok = await loadRender(id, curBlob, () => false);
    if (ok) { playing = wasPlaying; prepare(at, wasPlaying); }
  }

  /* ---- genel API ---- */
  async function load(id, blob, cancelled) {
    curBlob = blob; playing = false; loadedId = null; duration = 0; pos = 0; clearTimeout(watchdog);
    if (mode === 'render') {
      if (el && !el.paused) { swapping = true; el.pause(); swapping = false; }
      return loadRender(id, blob, cancelled);
    }
    try { await initLive(); } catch (e) { mode = 'render'; LS.set('gp-engine2', 'render'); L.mode(); return loadRender(id, blob, cancelled); }
    stretch.schedule({ active: false }); await stretch.dropBuffers();
    const ab = await blob.arrayBuffer(); if (cancelled()) return false;
    let buf;
    try { buf = await new Promise((res, rej) => { const p = ctx.decodeAudioData(ab, res, rej); if (p && p.catch) p.catch(rej); }); }
    catch (e) { log('çözümleme hatası'); throw e; }
    if (cancelled()) return false;
    // Tek parça halinde ver: kütüphane parça sınırlarında taşma hatası veriyor
    const a = buf.getChannelData(0).slice(), b = buf.numberOfChannels > 1 ? buf.getChannelData(1).slice() : a.slice();
    duration = buf.duration;
    await stretch.addBuffers([a, b], [a.buffer, b.buffer]);
    if (cancelled()) return false;
    stretch.schedule({ input: 0, output: ctx.currentTime, active: false });
    loadedId = id; log('Şarkı hazır (' + Math.round(duration) + ' sn, canlı)');
    return true;
  }
  function play() {
    if (!loadedId) return;
    if (mode === 'render') {
      playing = true;
      if (!seg) { prepare(pos >= duration - 0.2 ? 0 : pos, true); return; }
      if (seg.full && curPos() >= duration - 0.2) { prepare(0, true); return; }
      el.play().catch(e => { log('oynatma: ' + e.message); playing = false; L.state(); });
      return;
    }
    if (!stretch) return;
    if (pos >= duration - 0.1) seek(0);
    if (ctx.state !== 'running') ctx.resume().catch(() => {});
    stretch.schedule(Object.assign({ active: true, output: ctx.currentTime + 0.03 }, params()));
    playing = true;
    const p0 = pos; clearTimeout(watchdog);
    watchdog = setTimeout(() => { if (mode === 'live' && playing && Math.abs(pos - p0) < 0.3) { log('Canlı motor ilerlemiyor (ses ' + ctx.state + ')'); toRender(); } }, 2200);
  }
  function pause() {
    clearTimeout(watchdog); playing = false; waitFull = false;
    if (mode === 'render') { if (el) el.pause(); L.busy(null); return; }
    if (stretch) stretch.schedule({ active: false, output: ctx.currentTime });
  }
  function seek(t) {
    t = Math.max(0, Math.min(duration, t)); pos = t;
    if (mode === 'render') {
      if (seg && (seg.full || (t >= seg.inStart && t < seg.end - 0.5))) { try { el.currentTime = (t - seg.inStart) / seg.rate; } catch (e) {} }
      else if (loadedId) prepare(t, playing);
      return;
    }
    if (stretch) stretch.schedule(Object.assign({ input: t, output: ctx.currentTime, active: playing }, params()));
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden && ctx && playing && mode === 'live' && ctx.state !== 'running') ctx.resume().catch(() => {}); });

  function setFx(patch) {
    Object.assign(fx, patch); LS.set('gp-fx2', fx);
    if (mode === 'live') {
      if (graph) graph.apply(fx, true);
      if (stretch && playing) stretch.schedule(Object.assign({ output: ctx.currentTime + 0.02 }, params()));
    } else if (loadedId) {
      clearTimeout(dirtyT);
      L.busy(playing ? 'Uygulanıyor…' : null);
      dirtyT = setTimeout(() => { if (playing || seg) prepare(curPos(), playing); }, 380);
    }
  }
  function setMode(m) { if (m === mode) return; if (m === 'render') return toRender(); LS.set('gp-engine2', 'live'); location.reload(); }
  function info() {
    return { mode, ctx: ctx ? ctx.state + ' · ' + ctx.sampleRate + ' Hz' : 'kullanılmıyor', motor: !!stretch,
      session: navigator.audioSession ? navigator.audioSession.type : 'yok', ua: navigator.userAgent.replace(/^Mozilla\/5\.0 /, ''), events: diag.slice() };
  }
  return {
    fx, unlock, load, play, pause, seek, setFx, setMode, info, log,
    on(ev, fn) { L[ev] = fn; },
    get mode() { return mode; }, get duration() { return duration; }, get pos() { return mode === 'render' && seg ? curPos() : pos; },
    get playing() { return playing; }, get loadedId() { return loadedId; }
  };
})();

/* ================= Bulut (Supabase) ================= */
const Cloud = (() => {
  const enabled = !!(C.SUPABASE_URL && C.SUPABASE_ANON_KEY);
  let sb = null, user = null, busy = false, state = '';
  const ext = b => (b && b.type && b.type.split('/')[1] || 'mp3').replace('mpeg', 'mp3').replace('x-m4a', 'm4a').replace(/[^a-z0-9]/g, '').slice(0, 5) || 'mp3';

  async function init() {
    if (!enabled) return;
    try {
      if (!window.supabase) await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js');
      sb = window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } });
      const { data } = await sb.auth.getSession();
      user = data.session ? data.session.user : null;
      sb.auth.onAuthStateChange((ev, s) => {
        const was = user && user.id; user = s ? s.user : null;
        UI.account(); UI.acctBtn();
        if (user && user.id !== was) sync();
      });
      UI.acctBtn();
      if (user) sync();
    } catch (e) { setState('Bulut bağlantısı kurulamadı'); }
  }
  function setState(s) { state = s; const el = $('syncState'); if (el) el.textContent = s; }

  const row = s => ({ id: s.id, user_id: user.id, title: s.title || '', artist: s.artist || '', album: s.album || '', year: s.year || '',
    sp_id: s.spId || null, cover_url: s.coverUrl || null, audio_path: s.audioPath || null, cover_path: s.coverPath || null,
    duration: s.duration || null, added: s.added || Date.now(), updated: s.updated || Date.now() });

  async function upload(s) {
    if (!user || !s.blob) return;
    const path = `${user.id}/${s.id}.${ext(s.blob)}`;
    const { error } = await sb.storage.from('music').upload(path, s.blob, { upsert: true, contentType: s.blob.type || 'audio/mpeg' });
    if (error) throw error;
    s.audioPath = path;
    if (s.cover instanceof Blob) await uploadCover(s);
    const r = await sb.from('songs').upsert(row(s)); if (r.error) throw r.error;
    s.cloud = true; await DB.put('songs', s);
  }
  async function uploadCover(s) {
    const path = `${user.id}/${s.id}-cover.jpg`;
    const { error } = await sb.storage.from('music').upload(path, s.cover, { upsert: true, contentType: 'image/jpeg' });
    if (!error) s.coverPath = path;
  }
  async function pushMeta(s, coverChanged) {
    if (!user || !s.cloud) return;
    try {
      if (coverChanged) {
        if (s.cover instanceof Blob) await uploadCover(s);
        else if (s.coverPath) { await sb.storage.from('music').remove([s.coverPath]); s.coverPath = null; }
      }
      await sb.from('songs').upsert(row(s)); await DB.put('songs', s);
    } catch (e) { setState('Değişiklik buluta yazılamadı'); }
  }
  async function remove(s) {
    if (!user || !s.cloud) return;
    try {
      const files = [s.audioPath, s.coverPath].filter(Boolean);
      if (files.length) await sb.storage.from('music').remove(files);
      await sb.from('songs').delete().eq('id', s.id);
    } catch (e) {}
  }
  async function download(path) {
    const { data, error } = await sb.storage.from('music').download(path);
    if (error) throw error; return data;
  }

  async function sync() {
    if (!user || busy) return;
    busy = true; setState('Eşitleniyor…');
    try {
      const { data: rows, error } = await sb.from('songs').select('*');
      if (error) throw error;
      const remote = new Map(rows.map(r => [r.id, r]));
      for (const r of rows) {
        let s = App.byId(r.id);
        if (!s) {
          s = { id: r.id, title: r.title, artist: r.artist, album: r.album, year: r.year, spId: r.sp_id, coverUrl: r.cover_url,
            audioPath: r.audio_path, coverPath: r.cover_path, duration: r.duration, added: r.added, updated: r.updated, blob: null, cover: null, cloud: true };
          App.songs.push(s); await DB.put('songs', s);
          if (r.cover_path) download(r.cover_path).then(b => { s.cover = b; DB.put('songs', s); UI.lib(); UI.now(); }).catch(() => {});
        } else if ((r.updated || 0) > (s.updated || 0)) {
          Object.assign(s, { title: r.title, artist: r.artist, album: r.album, year: r.year, spId: r.sp_id, coverUrl: r.cover_url, updated: r.updated, cloud: true });
          if (r.cover_path && r.cover_path !== s.coverPath) { s.coverPath = r.cover_path; download(r.cover_path).then(b => { s.cover = b; DB.put('songs', s); UI.lib(); }).catch(() => {}); }
          await DB.put('songs', s);
        }
      }
      // başka cihazdan silinenler
      for (const s of App.songs.slice()) if (s.cloud && !remote.has(s.id)) { App.songs.splice(App.songs.indexOf(s), 1); Img.drop(s.id); await DB.del('songs', s.id); }
      App.sortSongs(); UI.lib(); UI.lists();
      // sadece bu cihazda olanları yükle
      const todo = App.songs.filter(s => !s.cloud && s.blob);
      for (let i = 0; i < todo.length; i++) {
        setState(`Buluta yükleniyor ${i + 1}/${todo.length}`);
        try { await upload(todo[i]); } catch (e) { setState('Yükleme hatası: ' + (e.message || 'bilinmiyor')); await new Promise(r => setTimeout(r, 1500)); }
      }
      setState('Bulutla eşit');
      UI.lib();
    } catch (e) { setState('Eşitleme hatası'); }
    busy = false;
  }

  return {
    enabled, init, sync, upload, pushMeta, remove, download,
    get user() { return user; }, get state() { return state; },
    async signIn(email, pw) { const { error } = await sb.auth.signInWithPassword({ email, password: pw }); if (error) throw error; },
    async signUp(email, pw) { const { data, error } = await sb.auth.signUp({ email, password: pw }); if (error) throw error; return !data.session; },
    async signOut() { await sb.auth.signOut(); setState(''); }
  };
})();

/* ================= Spotify ================= */
const Spotify = (() => {
  const enabled = !!C.SPOTIFY_CLIENT_ID;
  const REDIRECT = location.origin + location.pathname.replace(/index\.html$/, '');
  let tok = LS.get('gp-sp-token', null), me = LS.get('gp-sp-me', null);
  const b64url = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  async function login() {
    const arr = crypto.getRandomValues(new Uint8Array(48));
    const verifier = b64url(arr);
    LS.set('gp-sp-verifier', verifier);
    const challenge = b64url(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));
    const p = new URLSearchParams({ client_id: C.SPOTIFY_CLIENT_ID, response_type: 'code', redirect_uri: REDIRECT,
      code_challenge_method: 'S256', code_challenge: challenge, scope: 'playlist-read-private playlist-read-collaborative user-library-read' });
    location.href = 'https://accounts.spotify.com/authorize?' + p;
  }
  async function token(body) {
    const r = await fetch('https://accounts.spotify.com/api/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(Object.assign({ client_id: C.SPOTIFY_CLIENT_ID }, body)) });
    if (!r.ok) throw new Error('Spotify girişi reddedildi');
    const j = await r.json();
    tok = { access: j.access_token, refresh: j.refresh_token || (tok && tok.refresh), exp: Date.now() + (j.expires_in - 60) * 1000 };
    LS.set('gp-sp-token', tok);
  }
  async function handleRedirect() {
    const q = new URLSearchParams(location.search);
    if (!q.has('code') && !q.has('error')) return false;
    history.replaceState(null, '', REDIRECT);
    if (q.get('error')) { toast('Spotify bağlantısı iptal edildi'); return false; }
    try {
      await token({ grant_type: 'authorization_code', code: q.get('code'), redirect_uri: REDIRECT, code_verifier: LS.get('gp-sp-verifier', '') });
      LS.del('gp-sp-verifier');
      me = await api('/me'); LS.set('gp-sp-me', { name: me.display_name || me.id });
      me = LS.get('gp-sp-me');
      toast('Spotify bağlandı');
      return true;
    } catch (e) { toast('Spotify bağlanamadı. Redirect adresini kontrol et.'); return false; }
  }
  async function api(path) {
    if (!tok) throw new Error('Spotify bağlı değil');
    if (Date.now() > tok.exp) await token({ grant_type: 'refresh_token', refresh_token: tok.refresh });
    let r = await fetch('https://api.spotify.com/v1' + path, { headers: { Authorization: 'Bearer ' + tok.access } });
    if (r.status === 401) { await token({ grant_type: 'refresh_token', refresh_token: tok.refresh }); r = await fetch('https://api.spotify.com/v1' + path, { headers: { Authorization: 'Bearer ' + tok.access } }); }
    if (r.status === 429) throw new Error('Spotify limiti doldu, biraz sonra tekrar dene');
    if (!r.ok) { const e = new Error('Spotify hatası ' + r.status); e.status = r.status; throw e; }
    return r.json();
  }
  const track = t => t && t.type === 'track' && t.id ? {
    spId: t.id, title: t.name, artist: (t.artists || []).map(a => a.name).join(', '), album: t.album ? t.album.name : '',
    year: t.album && t.album.release_date ? t.album.release_date.slice(0, 4) : '',
    coverUrl: t.album && t.album.images && t.album.images[0] ? t.album.images[0].url : null, duration: (t.duration_ms || 0) / 1000
  } : null;

  async function playlists() {
    const out = []; let url = '/me/playlists?limit=50';
    while (url && out.length < 500) { const j = await api(url); out.push(...j.items.filter(Boolean)); url = j.next ? j.next.replace('https://api.spotify.com/v1', '') : null; }
    return out;
  }
  async function items(id, onProg) {
    const res = []; let url, total = 0;
    if (id === 'liked') url = '/me/tracks?limit=50';
    else url = `/playlists/${id}/items?limit=50`;
    while (url) {
      let j;
      try { j = await api(url); }
      catch (e) { if (e.status === 404 && url.includes('/items')) { url = url.replace('/items', '/tracks'); continue; } throw e; }
      total = j.total || total;
      for (const it of j.items || []) { const t = track(it.item || it.track); if (t) res.push(t); }
      onProg && onProg(res.length, total);
      url = j.next ? j.next.replace('https://api.spotify.com/v1', '') : null;
    }
    return res;
  }
  async function search(q) { const j = await api('/search?type=track&limit=10&q=' + encodeURIComponent(q)); return (j.tracks && j.tracks.items || []).map(track).filter(Boolean); }

  return { enabled, REDIRECT, login, handleRedirect, playlists, items, search,
    get connected() { return !!tok; }, get me() { return me; },
    logout() { tok = null; me = null; LS.del('gp-sp-token'); LS.del('gp-sp-me'); } };
})();

/* ================= Stuttgart manzarası: gerçek saat, gün batımı, ay, hava, kuleler ================= */
const Scene = (() => {
  const LAT = 48.7758, LNG = 9.1829, IW = 1672, IH = 941;
  const META = {"t":{"gunduz":[1173,449,465,491,965,463,481,512],"altin":[1181,454,470,496,973,468,486,517],"gunbatimi":[1172,449,465,491,964,463,481,512],"alacakaranlik":[1171,450,466,492,963,464,482,513],"gece":[1170,450,466,492,962,465,483,514],"dolunay":[1171,450,466,492,963,465,483,514],"bulutlu":[1173,449,465,491,965,463,481,512],"bulutlu-aksam":[1171,450,466,492,963,464,482,513],"bulutlu-gece":[1170,450,466,492,962,465,483,514]},"l":{"gece":[960,654,1214,560,1475,659,780,662,922,594,962,480,816,586,960,486,952,684,1036,551,1138,586,1536,650,1504,566,1672,564,1166,522,1341,567,1510,586,1108,613,1278,610,1010,648,1644,570,1214,596,1022,610,1648,646,1200,598,576,576,904,662,1486,542,1098,574,1660,588,1627,592,1618,682,1264,554,950,590,1092,526,1654,698,1532,556,712,578,946,677,1381,648,1420,647,1426,647,1450,590,1546,570,1416,566,1374,590,1350,600,1650,644,1334,588,1364,558,1006,654,1494,576,858,642,1008,596,1475,588,1618,638,844,572,1636,636,1663,636,992,616,1604,604,702,581,1390,656,1130,564,1312,590,1261,657,657,609,1504,560,748,592,1500,574,1492,568,902,648,836,569,1246,578,1328,592,1473,657,1638,694,1164,540,804,614,1520,650,1308,564,1296,606,890,576,1484,588,1348,594,1062,557,1438,610,1249,558,972,584,1053,556,1342,592,1436,652,1412,653,1630,586,624,590,1554,586,1522,569,736,658,1445,594,1610,630,1578,622,1246,656,808,608,966,574,1275,610,1428,656,1572,624,1006,594,1587,632,1352,556,854,572,1553,592,1553,620,1512,604,1500,561,1650,636,899,637,1270,572,1144,570,933,572,1340,589,1438,598,763,630,545,590,1184,617,1460,665,972,646,1196,552,1508,652,1306,610,1234,620,738,574,770,600,1438,652,1098,510,952,678,1091,604,1298,571,763,574,1384,566,949,652,1342,548,1018,646,768,574,1340,592,978,674,1618,636,734,602,1184,558,1592,589,1614,684,1146,524,1628,562,687,606,810,594,1188,602,911,640,1242,620,1504,585,688,632,908,596,1021,582,1630,602,1514,586,1654,588,1184,603,1004,610,1632,636,1574,574,1048,640,1186,622,1052,639,1432,656,948,684,1654,636,996,646,672,590,1616,582,1115,560,1068,546,1150,586,1518,560,985,614,935,593,908,640,1524,560,1649,588,758,574,906,632,568,574,1282,573,1494,538,1449,584,1382,652,1152,550,920,568,1604,568,1196,540,662,609,1377,649,1248,564,1606,688,1024,650,586,574,1024,650,1430,582,604,582,864,592,1028,550,1166,622,730,578,772,626,1668,586,1570,600,1642,598,1630,618,954,646,1637,576,1058,619,1297,582,737,638,939,573,900,632,1590,560,893,638,864,638,1212,548,798,662,1124,614,1458,656,1370,660,968,647,544,582,1500,540,1616,568,1153,618,1134,564,1490,658,1202,620,1288,522,1067,608,1546,564,1052,634,684,583,1244,622,1116,612,780,606,1614,694,1148,590,1442,580,924,675,1621,591,1480,540,1346,588,889,629,1555,674,1089,612,1142,518,1560,674,1077,553],"dolunay":[1574,574,731,572,991,616,1552,574,1162,542,678,610,1321,567,736,584,1591,564,864,638,1418,561,1376,649,854,604,1292,558,1520,652,1270,574,1272,554,986,606,1454,592,608,580,1166,506,780,574,1191,548,598,590,1170,540,1102,553,753,581,1382,649,687,583,1316,554,798,601,1434,614,1608,564,978,600,1498,540,1228,558,890,566,594,556,1244,543,1432,700,1472,605,952,676,1589,561,1394,592,1233,586,1124,508,722,590,1380,656,1148,620,688,588,802,587,1428,652,960,688,918,596,1332,586,1390,590,964,480,1570,622,1655,697,1546,569,1528,650,1565,674,1386,589,1598,681,672,609,1625,591,700,636,1548,574,1528,578,1208,559,934,571,1618,678,1150,532,1280,609,1636,578,1069,548,923,569,1038,562,1636,636,814,616,1120,508,1536,584,1556,674,1435,652,1364,652,1484,630,1106,556,1542,574,1242,577,1028,550,1665,590,1098,510,1153,551,1399,569,530,580,1262,565,1300,608,909,606,1475,568,1158,501,1625,562,864,576,882,602,1059,588,1505,584,1556,676,700,628,979,614,876,566,970,574,700,632,812,586,818,570,908,640,1463,590,1037,572,1132,552,1516,604,1457,584,1504,543,1364,562,1444,594,688,633,1323,591,1022,545,1077,551,1486,588,888,602,1403,649,735,634,1430,658,1378,554,1265,610,536,602,1042,574,1079,548,960,486,1134,614,977,682,1644,588,874,604,780,558,1124,526,1508,662,1248,565,919,568,768,592,1655,639,1458,669,1491,540,1158,522,1188,600,1124,575,1464,523,768,608,1146,522,1026,574,829,588,916,574,1248,536,1125,614,602,566,1138,516,1532,556,1370,652,952,684,940,572,954,646,1240,667,1429,560,1184,536,1222,604,902,575,1510,636,586,574,1445,576,850,590,948,650,1464,598,1356,555,1252,564,902,646,1136,538,1292,534,1018,550,1114,559,1106,524,973,574,1266,598,856,592,1650,610,936,592,1096,556,1629,602,1563,618,1629,617,742,574,762,610,930,577,1654,564,1482,577,1538,621,1396,622,1088,526,1437,612,1440,653,1012,584,1122,547,1380,560,912,605,1586,579,967,656,998,586,1242,665,1278,561,1456,656,1654,580,636,594,1510,604,753,574,1540,560,1604,636,1235,658,948,678,1634,638,1142,530,1376,544,720,588,1636,642,1241,566,1214,550,630,574,1420,566,836,569,954,591,976,576,1209,592,1566,574,1184,615,1198,542,939,696,1564,580,1114,530,864,592,910,562,1648,602,1020,610,1558,560,704,626,676,590,1200,598,1439,555,1457,608,1432,564,1667,637,1114,572,1186,604,1450,584,1088,605,1632,638]}};
  const SCENES = {
    gunduz: { n: 'gündüz', day: true }, altin: { n: 'altın saat' }, gunbatimi: { n: 'gün batımı' },
    alacakaranlik: { n: 'alacakaranlık', dusk: true }, gece: { n: 'gece', night: true }, dolunay: { n: 'dolunay', night: true },
    bulutlu: { n: 'kapalı gündüz', day: true, oc: true }, 'bulutlu-aksam': { n: 'kapalı akşam', dusk: true, oc: true }, 'bulutlu-gece': { n: 'kapalı gece', night: true, oc: true }
  };
  const PICK = { gunduz: 'Gündüz', altin: 'Altın saat', gunbatimi: 'Gün batımı', alacakaranlik: 'Alacakaranlık', gece: 'Gece', dolunay: 'Dolunay', bulutlu: 'Kapalı hava' };
  /* Güneş hesabı (SunCalc yöntemi) */
  const rad = Math.PI / 180, J2000 = 2451545, J0 = 0.0009;
  const toDays = ms => ms / 864e5 - 0.5 + 2440588 - J2000, fromJ = j => (j + 0.5 - 2440588) * 864e5;
  function sun(date) {
    const lw = -LNG * rad, phi = LAT * rad, d = toDays(date.getTime());
    const n = Math.round(d - J0 - lw / (2 * Math.PI)), ds = J0 + lw / (2 * Math.PI) + n;
    const M = rad * (357.5291 + 0.98560028 * ds), C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
    const L = M + C + rad * 102.9372 + Math.PI, dec = Math.asin(Math.sin(L) * Math.sin(rad * 23.4397));
    const noon = J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
    const at = h => { const w = Math.acos((Math.sin(h * rad) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec))); const set = J2000 + J0 + (w + lw) / (2 * Math.PI) + n + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L); return [fromJ(noon - (set - noon)), fromJ(set)]; };
    const [rise, set] = at(-0.833), [dawn, dusk] = at(-6);
    return { rise, set, dawn, dusk };
  }
  function moonIllum(date) { const jd = date.getTime() / 864e5 + 2440587.5; let p = ((jd - 2451550.1) / 29.530588853) % 1; if (p < 0) p++; return (1 - Math.cos(2 * Math.PI * p)) / 2; }
  function phase(now = new Date()) {
    const t = now.getTime(), s = sun(now), m = 60000;
    if (t < s.dawn || t > s.dusk + 25 * m) return moonIllum(now) > 0.6 ? 'dolunay' : 'gece';
    if (t < s.rise) return 'alacakaranlik';
    if (t < s.rise + 60 * m) return 'altin';
    if (t < s.set - 100 * m) return 'gunduz';
    if (t < s.set - 30 * m) return 'altin';
    if (t < s.set + 8 * m) return 'gunbatimi';
    return 'alacakaranlik';
  }
  const overcastOf = p => (p === 'gece' || p === 'dolunay') ? 'bulutlu-gece' : (p === 'gunbatimi' || p === 'alacakaranlik') ? 'bulutlu-aksam' : 'bulutlu';

  /* Hava (Open-Meteo) */
  const WX = c => c === 0 ? ['clear', 'açık'] : c === 1 ? ['clear', 'az bulutlu'] : c === 2 ? ['clear', 'parçalı bulutlu'] : c === 3 ? ['cloud', 'kapalı']
    : c <= 48 ? ['fog', 'sisli'] : c <= 57 ? ['rain', 'çiseliyor'] : c <= 67 ? ['rain', 'yağmurlu'] : c <= 77 ? ['snow', 'karlı'] : c <= 82 ? ['rain', 'sağanak'] : c <= 86 ? ['snow', 'kar yağışlı'] : ['storm', 'fırtınalı'];
  let wx = LS.get('gp-wx', null), mode = LS.get('gp-scene', 'auto'), wxOn = LS.get('gp-wx-on', true), cur = null, front = 'B', kind = null, imgTok = 0;
  async function fetchWx(force) {
    if (!wxOn) return;
    if (!force && wx && Date.now() - wx.at < 15 * 60000) return;
    try {
      const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}&current=temperature_2m,weather_code,is_day&timezone=Europe%2FBerlin`);
      const c = (await r.json()).current;
      wx = { t: Math.round(c.temperature_2m), code: c.weather_code, at: Date.now() }; LS.set('gp-wx', wx); apply();
    } catch (e) {}
  }
  const wxKind = () => wxOn && wx && Date.now() - wx.at < 3 * 3600000 ? WX(wx.code)[0] : null;

  /* ---------- Canlı katman (resim koordinatlarında çizilir) ---------- */
  const cv = $('sky'), g = cv.getContext('2d');
  cv.width = IW; cv.height = IH;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let running = false, last = 0, drops = [], splashes = [], flash = 0, nextBolt = 0, fogT = 0, lights = [], stars = [];
  const rnd = (a, b) => a + Math.random() * (b - a);
  function seedFx() {
    const k = kind;
    drops = [];
    if (k === 'rain' || k === 'storm') for (let i = 0; i < (k === 'storm' ? 320 : 230); i++) drops.push({ x: rnd(-200, IW), y: rnd(-IH, IH), z: Math.random() < 0.35 ? 1 : 0, l: rnd(12, 26) });
    if (k === 'snow') for (let i = 0; i < 200; i++) drops.push({ x: rnd(0, IW), y: rnd(0, IH), z: Math.random(), p: rnd(0, 6.28) });
    const L = META.l[cur === 'bulutlu-gece' ? 'gece' : cur] || [];
    lights = []; for (let i = 0; i < L.length; i += 2) lights.push({ x: L[i], y: L[i + 1], p: rnd(0, 6.28), s: rnd(0.4, 1.6), off: 0 });
    stars = []; if (cur === 'gece' || cur === 'dolunay') for (let i = 0; i < 70; i++) stars.push({ x: rnd(0, IW), y: rnd(0, IH * 0.42), p: rnd(0, 6.28), b: Math.random() < 0.2 });
  }
  function glow(x, y, r, c, a) {
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, `rgba(${c},${a})`); gr.addColorStop(1, `rgba(${c},0)`);
    g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  /* Fernsehturm ışık oyunu: aşağıdan yukarı kayar, sepette döner, aşağı iner */
  function towerShow(t, T) {
    const [cx, top, head, base] = T, L = 15000, s = (t % L) / 1000;
    const ease = u => u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
    const hy = head + 1;
    g.globalCompositeOperation = 'lighter';
    let y = null, rot = null;
    if (s < 4) y = base - (base - hy) * ease(s / 4);
    else if (s < 9.5) { y = hy; rot = (s - 4) / 1.3; }
    else if (s < 13.5) y = hy + (base - hy) * ease((s - 9.5) / 4);
    if (y != null) {
      // iz
      const trail = s < 4 ? 1 : s >= 9.5 ? -1 : 0;
      for (let k = 1; k <= 6 && trail; k++) { g.fillStyle = `rgba(255,232,180,${0.16 - k * 0.022})`; g.fillRect(cx - 2, y + trail * k * 2, 5, 2); }
      if (rot == null) {
        g.fillStyle = 'rgba(255,244,214,.95)'; g.fillRect(cx - 2, y - 1, 5, 3);
        glow(cx, y, 10, '255,226,160', 0.55);
      } else {
        // sepet aydınlık, ışık bandı kendi ekseninde döner
        const ph = rot % 1, front = Math.sin(ph * Math.PI * 2);
        const bx = cx + Math.cos(ph * Math.PI * 2) * 4.5;
        g.fillStyle = 'rgba(255,230,170,.35)'; g.fillRect(cx - 4, head - 2, 9, 5);
        if (front > -0.2) { g.fillStyle = `rgba(255,248,225,${(0.55 + 0.45 * front).toFixed(2)})`; g.fillRect(Math.round(bx) - 1, head - 3, 2, 7); }
        glow(cx, head, 13 + 3 * Math.max(0, front), '255,220,150', 0.35 + 0.25 * Math.max(0, front));
      }
    }
    // tepedeki kırmızı ikaz ışığı
    const on = (t % 1500) < 750;
    if (on) { g.fillStyle = 'rgba(255,60,60,1)'; g.fillRect(cx - 1, top - 1, 2, 2); glow(cx, top, 4, '255,40,40', 0.6); }
    g.globalCompositeOperation = 'source-over';
  }
  function fmtLights(t, T) {
    const [, , , , fx, ftop, fplat] = T;
    g.globalCompositeOperation = 'lighter';
    const on = ((t + 600) % 1500) < 750;
    if (on) { g.fillStyle = 'rgb(255,60,60)'; g.fillRect(fx - 1, ftop - 1, 2, 2); glow(fx, ftop, 4, '255,40,40', 0.6); }
    if (((t + 1100) % 1500) < 750) { g.fillStyle = 'rgba(255,70,70,.9)'; g.fillRect(fx - 5, fplat - 1, 1, 1); g.fillRect(fx + 5, fplat - 1, 1, 1); glow(fx, fplat, 7, '255,50,50', 0.35); }
    g.globalCompositeOperation = 'source-over';
  }
  function frame(t) {
    if (!running) return;
    requestAnimationFrame(frame);
    if (document.hidden || $('scene').hidden) return;
    if (t - last < 33) return; // ~30 fps yeter
    const dt = last ? Math.min(80, t - last) : 33; last = t;
    g.clearRect(0, 0, IW, IH);
    const sc = SCENES[cur], T = META.t[cur];
    // yıldızlar
    if (stars.length && !kind) for (const s of stars) { const a = 0.15 + 0.6 * Math.max(0, Math.sin(t / 700 + s.p)); g.fillStyle = `rgba(255,250,235,${a.toFixed(2)})`; g.fillRect(s.x, s.y, s.b ? 2 : 1, s.b ? 2 : 1); }
    // şehir ışıkları
    if (lights.length) {
      g.globalCompositeOperation = 'lighter';
      for (const L of lights) {
        if (L.off > 0) { L.off -= dt; continue; }
        if (Math.random() < 0.0004 * dt / 33) { L.off = rnd(1500, 6000); continue; }
        const a = 0.18 + 0.42 * (0.5 + 0.5 * Math.sin(t / 1000 * L.s + L.p));
        g.fillStyle = `rgba(255,205,130,${a.toFixed(2)})`; g.fillRect(L.x - 1, L.y - 1, 3, 3);
      }
      g.globalCompositeOperation = 'source-over';
    }
    // kuleler
    if (T && (sc.night || sc.dusk)) { towerShow(t, T); fmtLights(t, T); }
    // sis
    if (kind === 'fog') {
      fogT += dt / 1000;
      for (let i = 0; i < 4; i++) {
        const y = 400 + i * 70, x = ((fogT * (8 + i * 4)) % (IW * 2)) - IW;
        const gr = g.createLinearGradient(0, y - 60, 0, y + 60); gr.addColorStop(0, 'rgba(220,224,230,0)'); gr.addColorStop(0.5, `rgba(220,224,230,${sc.night ? 0.10 : 0.22})`); gr.addColorStop(1, 'rgba(220,224,230,0)');
        g.fillStyle = gr; g.fillRect(x, y - 60, IW * 2, 120);
      }
    }
    // yağmur
    if (kind === 'rain' || kind === 'storm') {
      const sp = kind === 'storm' ? 1.5 : 1;
      g.lineWidth = 1; g.lineCap = 'round';
      for (const d of drops) {
        const v = (d.z ? 1.25 : 0.8) * sp * dt;
        d.y += v; d.x += v * 0.16;
        if (d.y > IH) { if (d.z && Math.random() < 0.5) splashes.push({ x: d.x, y: rnd(700, IH - 10), a: 1 }); d.y = rnd(-80, -10); d.x = rnd(-200, IW); }
        g.strokeStyle = d.z ? 'rgba(210,222,242,.6)' : 'rgba(190,205,230,.32)'; g.lineWidth = d.z ? 1.6 : 1;
        g.beginPath(); g.moveTo(d.x, d.y); g.lineTo(d.x - d.l * 0.16, d.y - d.l * (d.z ? 1.3 : 0.8)); g.stroke();
      }
      g.fillStyle = 'rgba(215,228,245,.55)';
      splashes = splashes.filter(s => (s.a -= dt / 260) > 0);
      for (const s of splashes) { g.globalAlpha = s.a; g.fillRect(s.x - 3, s.y, 2, 1); g.fillRect(s.x + 1, s.y - 1, 2, 1); g.fillRect(s.x - 1, s.y - 2, 1, 1); }
      g.globalAlpha = 1;
    }
    // kar
    if (kind === 'snow') {
      for (const d of drops) {
        d.y += (0.03 + d.z * 0.05) * dt; d.x += Math.sin(t / 1400 + d.p) * 0.25;
        if (d.y > IH) { d.y = -4; d.x = rnd(0, IW); }
        g.fillStyle = `rgba(255,255,255,${(0.5 + d.z * 0.45).toFixed(2)})`; const s = d.z > 0.6 ? 5 : 3; g.fillRect(d.x, d.y, s, s);
      }
    }
    // şimşek
    if (kind === 'storm') {
      if (!nextBolt) nextBolt = t + rnd(4000, 11000);
      if (t > nextBolt) { flash = 1; nextBolt = t + rnd(5000, 14000); setTimeout(() => flash = 0.8, 160); }
      if (flash > 0) { g.fillStyle = `rgba(235,240,255,${(flash * 0.45).toFixed(2)})`; g.fillRect(0, 0, IW, IH); flash -= dt / 180; }
    }
  }
  function setRun() {
    const sc = cur && SCENES[cur];
    const need = !reduce && sc && (sc.night || sc.dusk || kind === 'rain' || kind === 'storm' || kind === 'snow' || kind === 'fog');
    if (need && !running) { running = true; last = 0; requestAnimationFrame(frame); }
    else if (!need && running) { running = false; g.clearRect(0, 0, IW, IH); }
    if (reduce) { g.clearRect(0, 0, IW, IH); const T = cur && META.t[cur]; if (T && sc && (sc.night || sc.dusk)) { g.fillStyle = 'rgb(255,60,60)'; g.fillRect(T[0] - 1, T[1] - 1, 2, 2); g.fillRect(T[4] - 1, T[5] - 1, 2, 2); } }
  }

  function apply() {
    const box = $('scene');
    document.documentElement.classList.toggle('has-scene', mode !== 'off');
    if (mode === 'off') { box.hidden = true; running = false; label(); return; }
    box.hidden = false;
    kind = wxKind();
    let name;
    if (mode === 'auto') { const p = phase(); name = kind && kind !== 'clear' ? overcastOf(p) : p; }
    else if (mode === 'bulutlu') name = overcastOf(phase());
    else name = SCENES[mode] ? mode : phase();
    if (kind === 'clear') kind = null;
    if (name !== cur) {
      const a = $('sceneA'), b = $('sceneB'), shown = front === 'A' ? a : b, next = shown === a ? b : a, tok = ++imgTok;
      next.onload = () => { if (tok !== imgTok) return; next.style.opacity = 1; shown.style.opacity = 0; front = next === a ? 'A' : 'B'; };
      next.src = `stg-${name}.webp`; cur = name;
    }
    const sc = SCENES[cur];
    box.className = 'scene' + (sc.day ? ' day' : '') + (sc.night ? ' night' : '') + (kind === 'rain' || kind === 'storm' ? ' wet' : '') + (kind === 'snow' ? ' snowy' : '');
    seedFx(); setRun(); label();
  }
  function label() {
    const el = $('wx'); if (!el) return;
    const parts = [];
    if (wxOn && wx) parts.push(wx.t + '°');
    const k = wxKind();
    if (k && k !== 'clear') parts.push(WX(wx.code)[1] + (cur && SCENES[cur].night ? ' gece' : ''));
    else if (cur && mode !== 'off') parts.push(SCENES[cur].n);
    el.innerHTML = '<small>Stuttgart</small>' + esc(parts.join(' · ') || 'sevdası');
  }
  function info() {
    const s = sun(new Date()), f = ms => new Date(ms).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    return { rise: f(s.rise), set: f(s.set), moon: Math.round(moonIllum(new Date()) * 100), scene: cur ? SCENES[cur].n : '-', wx: wx && wxOn ? `${wx.t}°C, ${WX(wx.code)[1]}` : null };
  }
  return {
    PICK, info,
    start() { apply(); fetchWx(); setInterval(() => { apply(); fetchWx(); }, 60000); document.addEventListener('visibilitychange', () => { if (!document.hidden) { apply(); fetchWx(); } }); },
    get mode() { return mode; }, get wxOn() { return wxOn; },
    setMode(m) { mode = m; LS.set('gp-scene', m); cur = null; apply(); },
    setWx(v) { wxOn = v; LS.set('gp-wx-on', v); if (v) fetchWx(true); apply(); },
    describe() { const i = info(); return `Stuttgart'ta şu an: ${i.scene}${i.wx ? ', hava ' + i.wx : ''}. Bugün gün doğumu ${i.rise}, batımı ${i.set}. Ay %${i.moon} dolu.`; }
  };
})();

/* ================= Uygulama durumu ================= */
const App = {
  songs: [], lists: [], queue: [], curId: null, loadingId: null,
  view: 'lib', openList: null, query: '',
  prefs: Object.assign({ shuffle: false, repeat: 'off', sort: 'added' }, LS.get('gp-prefs', {})),
  byId(id) { return this.songs.find(s => s.id === id); },
  sortSongs() { this.songs.sort((a, b) => (a.added || 0) - (b.added || 0)); },
  savePrefs() { LS.set('gp-prefs', this.prefs); },
  match(t) {
    if (t.spId) { const s = this.songs.find(x => x.spId === t.spId); if (s) return s; }
    const nt = norm(t.title), na = norm(t.artist).split(' ').slice(0, 2).join(' ');
    if (!nt) return null;
    return this.songs.find(s => norm(s.title) === nt && (!na || !s.artist || norm(s.artist).includes(na) || na.includes(norm(s.artist).split(' ').slice(0, 2).join(' ')))) || null;
  },
  filtered() {
    const q = norm(this.query);
    let list = q ? this.songs.filter(s => norm([s.title, s.artist, s.album].join(' ')).includes(q)) : this.songs.slice();
    const k = this.prefs.sort;
    if (k === 'title') list.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'tr'));
    else if (k === 'artist') list.sort((a, b) => (a.artist || '~').localeCompare(b.artist || '~', 'tr') || (a.title || '').localeCompare(b.title || '', 'tr'));
    else list.reverse();
    return list;
  }
};
const fx = Engine.fx;
const isWide = () => matchMedia('(min-width:920px)').matches;
const signed = (v, d) => (v > 0.0001 ? '+' : '') + (Math.abs(v) < Math.pow(10, -d) / 2 ? (0).toFixed(d).replace('.', ',') : num(v, d));

/* ================= Çalma kontrolü ================= */
let loadToken = 0;
async function playSong(id, queue) {
  const s = App.byId(id); if (!s) return;
  Engine.unlock();
  if (queue) App.queue = queue;
  if (!App.queue.includes(id)) App.queue = App.filtered().map(x => x.id);
  const tok = ++loadToken;
  App.curId = id; App.loadingId = id;
  UI.now(); UI.lib(); UI.lists(); UI.busy('Kaset takılıyor');
  try {
    let blob = s.blob;
    if (!blob) {
      if (!Cloud.user || !s.audioPath) throw new Error('nofile');
      UI.busy('Buluttan indiriliyor');
      blob = await Cloud.download(s.audioPath);
      if (tok !== loadToken) return;
      s.blob = blob; DB.put('songs', s);
    }
    const ok = await Engine.load(id, blob, () => tok !== loadToken);
    if (!ok || tok !== loadToken) return;
    if (!s.duration) { s.duration = Engine.duration; DB.put('songs', s); }
    UI.busy(null);
    Engine.play();
    AI.onSong(s);
  } catch (e) {
    if (tok !== loadToken) return;
    UI.busy(null);
    toast(e.message === 'nofile' ? 'Bu şarkının dosyası bu cihazda yok' : 'Şarkı açılamadı. Dosya bozuk ya da desteklenmiyor.');
  }
  if (tok !== loadToken) return;
  App.loadingId = null; UI.now(); UI.lib(); UI.lists(); Media.meta();
}
function toggle() {
  Engine.unlock();
  if (App.loadingId) return;
  if (!App.curId || Engine.loadedId !== App.curId) {
    const list = App.filtered();
    const first = App.curId || (App.prefs.shuffle ? list[Math.floor(Math.random() * list.length)] : list[0] || {}).id;
    if (first) playSong(first); return;
  }
  Engine.playing ? Engine.pause() : Engine.play();
  UI.now();
}
function nextId(dir) {
  const q = App.queue.filter(id => App.byId(id));
  if (!q.length) return null;
  const i = q.indexOf(App.curId);
  if (App.prefs.shuffle && q.length > 1 && dir > 0) { let n; do n = Math.floor(Math.random() * q.length); while (n === i); return q[n]; }
  let n = i + dir; if (n >= q.length) n = 0; if (n < 0) n = q.length - 1;
  return q[n];
}
function step(dir, auto) {
  if (auto && App.prefs.repeat === 'one') { Engine.seek(0); Engine.play(); UI.now(); return; }
  if (dir < 0 && Engine.pos > 3) { Engine.seek(0); return; }
  const q = App.queue.filter(id => App.byId(id));
  if (auto && App.prefs.repeat === 'off' && !App.prefs.shuffle && q.indexOf(App.curId) === q.length - 1) { UI.now(); return; }
  const id = nextId(dir); if (id) playSong(id);
}
Engine.on('end', () => step(1, true));
Engine.on('state', () => UI.now());
Engine.on('busy', t => UI.busy(t));
Engine.on('mode', () => { toast('iPhone için hazırlamalı motora geçildi. Ton, yankı ve EQ çalışır; ayar değişince ses bir saniyede güncellenir.'); UI.now(); renderFx(); UI.account(); });

/* Kilit ekranı */
const Media = {
  meta() {
    if (!('mediaSession' in navigator)) return;
    const s = App.byId(App.curId); if (!s) return;
    try {
      const art = Img.url(s);
      navigator.mediaSession.metadata = new MediaMetadata({ title: s.title, artist: s.artist || '', album: s.album || 'Gönül Plak',
        artwork: art ? [{ src: art, sizes: '600x600', type: 'image/jpeg' }] : [{ src: 'icon-512.png', sizes: '512x512', type: 'image/png' }] });
    } catch (e) {}
  },
  pos: raf(() => {
    if (!('mediaSession' in navigator) || !Engine.duration) return;
    try { navigator.mediaSession.setPositionState({ duration: Engine.duration, playbackRate: fx.rate, position: Math.min(Engine.pos, Engine.duration) }); } catch (e) {}
  })
};
if ('mediaSession' in navigator) {
  const h = (a, f) => { try { navigator.mediaSession.setActionHandler(a, f); } catch (e) {} };
  h('play', () => { Engine.play(); UI.now(); });
  h('pause', () => { Engine.pause(); UI.now(); });
  h('previoustrack', () => step(-1));
  h('nexttrack', () => step(1));
  h('seekto', d => { if (d && isFinite(d.seekTime)) Engine.seek(d.seekTime); });
}

/* ================= Simgeler ================= */
const ICON = {
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 4.8v14.4L19.5 12z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18z"/></svg>',
  cloudDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18"/><path d="M12 11v7m-3-3 3 3 3-3"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  export: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m-4-4 4 4 4-4"/><path d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>',
  sort: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M6 12h12M10 18h4"/></svg>',
  rvb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 20V10a9 9 0 0 1 18 0v10"/><path d="M7 20v-8a5 5 0 0 1 10 0v8"/></svg>',
  echo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 12h2M9 8v8M14 10v4M19 11v2"/></svg>',
  tape: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2.5"/><circle cx="8" cy="11" r="2"/><circle cx="16" cy="11" r="2"/></svg>',
  vinyl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3a9 9 0 0 1 9 9" opacity=".5"/></svg>',
  radio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="8" width="18" height="12" rx="2"/><circle cx="15" cy="14" r="3"/><path d="M7 12h3M7 16h3M6 8l10-5"/></svg>',
  d8: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 14a8 4 0 1 0 16 0"/><path d="M3 12h3M18 12h3"/><circle cx="12" cy="9" r="3"/></svg>'
};
const PAL = ['#ff3f6d', '#f4b13e', '#5bc0be', '#a06cd5', '#f15bb5', '#8ac926', '#ff8c42'];
function hash(s) { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); }
function miniTape(seed) {
  const c = PAL[hash(seed) % PAL.length], c2 = PAL[(hash(seed) >> 3) % PAL.length];
  return `<svg viewBox="0 0 52 52"><rect width="52" height="52" fill="#2a1920"/><rect x="6" y="13" width="40" height="27" rx="3" fill="#3a252c"/><rect x="9" y="16" width="34" height="15" rx="2" fill="#efe1c4"/><rect x="9" y="25" width="34" height="3" fill="${c}"/><rect x="9" y="28" width="34" height="2" fill="${c2}"/><rect x="17" y="21" width="18" height="8" rx="3" fill="#130b0f"/><circle cx="21" cy="25" r="2.4" fill="#efe1c4"/><circle cx="31" cy="25" r="2.4" fill="#efe1c4"/><path d="M14 40l2-5h20l2 5" fill="#2c1b21"/></svg>`;
}
const thumb = (url, seed) => `<span class="th">${url ? `<img src="${esc(url)}" alt="" loading="lazy" decoding="async">` : miniTape(seed || 'x')}</span>`;
function setThumb(el, url, seed) {
  const img = el.querySelector('img');
  if (url) { if (!img || img.getAttribute('src') !== url) el.innerHTML = `<img src="${esc(url)}" alt="">`; }
  else if (img || el.dataset.seed !== String(seed)) { el.innerHTML = miniTape(seed || 'x'); el.dataset.seed = String(seed); }
}
const rangeFill = el => el.style.setProperty('--p', ((el.value - el.min) / (el.max - el.min) * 100) + '%');

/* ================= Kaset ================= */
const Tape = (() => {
  const tL = $('tapeL'), tR = $('tapeR'), hL = $('hubL'), hR = $('hubR');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let aL = 0, aR = 0, last = 0, run = false, label = '';
  const R0 = 16, R1 = 41;
  function radii() {
    const p = Engine.duration && Engine.loadedId === App.curId ? Math.min(1, Engine.pos / Engine.duration) : 0;
    return [Math.sqrt(R0 * R0 + (1 - p) * (R1 * R1 - R0 * R0)), Math.sqrt(R0 * R0 + p * (R1 * R1 - R0 * R0))];
  }
  function frame(t) {
    const dt = last ? Math.min(0.1, (t - last) / 1000) : 0; last = t;
    const [rl, rr] = radii();
    tL.setAttribute('r', rl.toFixed(2)); tR.setAttribute('r', rr.toFixed(2));
    if (!reduce && Engine.playing) { const v = 46 * fx.rate; aL += dt * v / rl * 57.3; aR += dt * v / rr * 57.3; }
    hL.setAttribute('transform', `translate(148 125) rotate(${aL % 360})`); hR.setAttribute('transform', `translate(252 125) rotate(${aR % 360})`);
    if (run) requestAnimationFrame(frame);
  }
  function fit(el, text, maxW, size, min) {
    el.textContent = text; el.setAttribute('font-size', size);
    try {
      let s = size;
      while (s > min && el.getComputedTextLength() > maxW) { s -= 1; el.setAttribute('font-size', s); }
      let t = text;
      while (t.length > 3 && el.getComputedTextLength() > maxW) { t = t.slice(0, -2); el.textContent = t + '…'; }
    } catch (e) {}
  }
  return {
    label(s, url) {
      const key = s ? s.id + '|' + s.title + '|' + s.artist + '|' + (url || '') : '';
      if (key === label) return; label = key;
      const cv = $('cCover'), w = url ? 240 : 292;
      cv.innerHTML = url ? `<image href="${esc(url)}" x="318" y="30" width="48" height="48" preserveAspectRatio="xMidYMid slice"/>` : '';
      fit($('cTitle'), s ? s.title : 'Plak koy, gönlünü aç', w, 27, 17);
      fit($('cArtist'), s ? (s.artist || 'bilinmeyen sanatçı') : 'arşivden bir şarkı seç', w, 20, 14);
    },
    sync() { const want = Engine.playing; if (want && !run) { run = true; last = 0; requestAnimationFrame(frame); } else if (!want) { run = false; frame(performance.now()); } }
  };
})();

/* ================= Arayüz ================= */
function setSeek(t, d) {
  const v = d ? t / d * 1000 : 0, s = $('seek'); s.value = v; rangeFill(s);
  $('cur').textContent = fmt(t / fx.rate); $('dur').textContent = fmt(d / fx.rate);
  $('miniBar').style.width = (v / 10) + '%';
}
let dragging = false;
Engine.on('time', t => { if (!dragging && Engine.loadedId === App.curId) setSeek(t, Engine.duration); Media.pos(); });

const UI = {
  now() {
    const s = App.byId(App.curId), url = Img.url(s);
    Tape.label(s, url);
    $('npT').textContent = s ? s.title : 'Henüz kaset takılmadı';
    $('npA').textContent = s ? [s.artist || 'Bilinmeyen sanatçı', s.album, s.year].filter(Boolean).join(' · ') : 'Arşivden bir şarkıya dokun';
    const on = Engine.playing && Engine.loadedId === App.curId;
    $('play').innerHTML = on ? ICON.pause : ICON.play; $('miniPlay').innerHTML = on ? ICON.pause : ICON.play;
    $('play').setAttribute('aria-label', on ? 'Duraklat' : 'Çal');
    ['prev', 'next', 'play'].forEach(id => $(id).disabled = !App.songs.length);
    if (Engine.loadedId !== App.curId) setSeek(0, s && s.duration || 0); else setSeek(Engine.pos, Engine.duration);
    $('mini').hidden = !s || App.view === 'now' || isWide();
    if (s) { $('miniT').textContent = s.title; $('miniA').textContent = s.artist || 'Bilinmeyen sanatçı'; setThumb($('miniTh'), url, s.id); }
    let nx = '';
    if (s) {
      if (App.prefs.repeat === 'one') nx = 'Bu şarkı tekrar çalacak';
      else if (App.prefs.shuffle) nx = 'Sırada: karışık';
      else { const n = App.byId(nextId(1)); if (n && n.id !== s.id) nx = `Sırada: <b>${esc(n.title)}</b>`; }
    }
    if (typeof Sleep !== 'undefined' && Sleep.left) nx += (nx ? ' · ' : '') + `<b>uyku ${Sleep.left} dk</b>`;
    $('upnext').innerHTML = nx;
    $('engineTag').textContent = Engine.mode === 'live' ? 'canlı motor' : 'hazırlamalı motor';
    Tape.sync(); Media.pos();
  },
  busy(t) { $('busy').hidden = !t; if (t) $('busy').textContent = t.replace(/…$/, ''); },
  modes() {
    $('shuffle').setAttribute('aria-pressed', App.prefs.shuffle);
    $('repeat').setAttribute('aria-pressed', App.prefs.repeat !== 'off');
    $('repeatOne').hidden = App.prefs.repeat !== 'one';
    $('repeat').setAttribute('aria-label', 'Tekrarla: ' + ({ off: 'kapalı', all: 'tüm liste', one: 'tek şarkı' })[App.prefs.repeat]);
  },
  lib() {
    const list = App.filtered();
    $('count').textContent = App.songs.length ? App.songs.length + ' kaset' + (App.query ? ` · ${list.length} sonuç` : '') : '';
    $('syncState').textContent = Cloud.state;
    const em = $('empty'); em.hidden = App.songs.length > 0;
    if (!App.songs.length && !em.dataset.done) {
      em.dataset.done = 1;
      em.innerHTML = `${miniTape('gönül').replace('viewBox="0 0 52 52"', 'viewBox="4 10 44 32"')}<strong>Arşivin bomboş</strong><p>Telefondaki MP3, M4A veya WAV şarkılarını ekle. İçlerinde yazan ad, sanatçı, albüm ve kapak otomatik okunur.</p>
        <label class="btn primary" style="position:relative">Şarkı ekle<input type="file" accept="audio/*,.mp3,.m4a,.aac,.wav,.flac" multiple style="position:absolute;inset:0;opacity:0" data-add></label>`;
    }
    $('list').innerHTML = list.map(s => {
      const st = s.cloud ? (s.blob ? ICON.cloud : ICON.cloudDown) : '';
      return `<li class="row${s.id === App.curId ? ' on' : ''}" data-id="${esc(s.id)}">${thumb(Img.url(s), s.id)}
        <span class="m"><div class="t">${esc(s.title)}</div><div class="a">${st}<span>${esc(s.artist || 'Bilinmeyen sanatçı')}</span></div></span>
        <span class="rt">${s.duration ? fmt(s.duration) : ''}<button class="more" data-edit="${esc(s.id)}" aria-label="Seçenekler">${ICON.more}</button></span></li>`;
    }).join('');
  },
  lists() {
    const v = $('vLists');
    if (App.openList) {
      const L = App.lists.find(l => l.id === App.openList);
      if (!L) { App.openList = null; return UI.lists(); }
      const rows = L.tracks.map((t, i) => ({ t, i, s: App.match(t) }));
      const ready = rows.filter(r => r.s).length;
      v.innerHTML = `<div class="lhead"><button class="iconbtn" id="listBack" aria-label="Geri">${ICON.back}</button>
          <div class="grow"><h2>${esc(L.name)}</h2><div class="sub">${ready}/${L.tracks.length} şarkı çalınabilir</div></div>
          <button class="btn primary" id="listPlay" ${ready ? '' : 'disabled'}>Çal</button></div>
        <ul class="rows">${rows.map(({ t, i, s }) => `<li class="row${s ? '' : ' missing'}${s && s.id === App.curId ? ' on' : ''}" ${s ? `data-id="${esc(s.id)}"` : ''}>
          ${thumb(s ? Img.url(s) || t.coverUrl : t.coverUrl, t.title)}
          <span class="m"><div class="t">${esc(t.title)}</div><div class="a"><span>${esc(t.artist)}</span></div></span>
          ${s ? `<button class="more" data-edit="${esc(s.id)}" aria-label="Seçenekler">${ICON.more}</button>` : `<button class="chipbtn" data-attach="${i}">Dosya ekle</button>`}</li>`).join('')}</ul>
        <div style="height:18px"></div><button class="btn danger" id="listDel" style="width:100%">Listeyi sil</button>`;
      return;
    }
    const sp = Spotify.enabled ? (Spotify.connected ? `<button class="btn sp" id="spImport">Spotify'dan aktar</button>` : `<button class="btn sp" id="spConnect">Spotify'ı bağla</button>`) : '';
    v.innerHTML = `<div class="toprow"><div><span class="kicker">derdimin</span><h1>Listeleri</h1></div><div class="acts">${sp}</div></div>` +
      (App.lists.length ? `<div class="cards">${App.lists.map(L => {
        const ready = L.tracks.filter(t => App.match(t)).length;
        return `<button class="card" data-list-open="${esc(L.id)}"><span class="img" style="${L.image ? `background-image:url('${esc(L.image)}')` : ''}">${L.image ? '' : miniTape(L.name)}</span>
          <span class="cn">${esc(L.name)}</span><span class="cs">${ready}/${L.tracks.length} hazır</span></button>`;
      }).join('')}</div>` :
      `<div class="empty">${miniTape('liste').replace('viewBox="0 0 52 52"', 'viewBox="4 10 44 32"')}<strong>Henüz liste yok</strong><p>${Spotify.enabled
        ? 'Spotify\'ı bağla; listelerin ve beğendiklerin ad, sanatçı ve kapaklarıyla gelsin. Arşivindeki şarkılar otomatik eşleşir.'
        : 'Spotify listelerini getirmek için rehberdeki Spotify adımını yapıp config.js dosyasına Client ID\'yi yaz.'}</p></div>`);
  },
  acctBtn() {},
  account() {
    const el = $('vAcct'); if (!el) return;
    let cloud;
    if (!Cloud.enabled) cloud = `<p class="msg">Bulut henüz kurulmadı. Rehberdeki Supabase adımını yapıp config.js dosyasına adresi ve anahtarı yazınca burada giriş ekranı çıkar.</p>`;
    else if (Cloud.user) cloud = `<p class="msg">Giriş yapıldı: <strong>${esc(Cloud.user.email)}</strong></p><p class="msg">${esc(Cloud.state || '')}</p>
      <div class="btns"><button class="btn" id="acSyncBtn">Şimdi eşitle</button><button class="btn danger" id="acOut">Çıkış yap</button></div>`;
    else cloud = `<p class="msg">Giriş yaparsan şarkıların bilgileri ve kapaklarıyla buluta yedeklenir, telefon değişse de kaybolmaz.</p>
      <div class="field"><label for="acMail">E-posta</label><input id="acMail" type="email" autocomplete="email" inputmode="email"></div>
      <div class="field"><label for="acPw">Şifre (en az 6 karakter)</label><input id="acPw" type="password" autocomplete="current-password"></div>
      <p class="msg" id="acMsg" hidden></p>
      <div class="btns"><button class="btn primary" id="acIn">Giriş yap</button><button class="btn" id="acUp">Hesap oluştur</button></div>`;
    let sp;
    if (!Spotify.enabled) sp = `<p class="msg">Spotify bağlantısı için rehberdeki Spotify adımını yapıp Client ID'yi config.js'e yaz.</p>`;
    else if (Spotify.connected) sp = `<p class="msg">Bağlı hesap: <strong>${esc(Spotify.me ? Spotify.me.name : 'Spotify')}</strong></p>
      <div class="btns"><button class="btn sp" id="acSpImport">Liste aktar</button><button class="btn danger" id="acSpOut">Bağlantıyı kes</button></div>`;
    else sp = `<p class="msg">Listelerini ve beğendiklerini getirir, şarkılarına doğru ad ve kapak bulur.</p><button class="btn sp" id="acSpIn">Spotify'ı bağla</button>`;
    const d = Engine.info();
    el.innerHTML = `<div class="toprow"><div><span class="kicker">hesabım</span><h1>Ben</h1></div></div>
      <div class="group"><h3>Bulut</h3>${cloud}</div>
      <div class="group"><h3>Spotify</h3>${sp}</div>
      <div class="group"><h3>Gönül Dostu</h3>
        <p class="msg">Şarkılara laf atan, seninle dertleşen, istersen kaseti senin yerine yöneten yapay zekâ (Claude). Anahtar sadece bu telefonda saklanır.</p>
        <div class="field"><label for="aiKey">Claude API anahtarı</label><input id="aiKey" type="password" autocomplete="off" placeholder="sk-ant-..." value="${esc(AI.key)}"></div>
        <p class="msg" id="aiMsg" hidden></p>
        <div class="btns"><button class="btn primary" id="aiSave">Kaydet ve dene</button>${AI.key ? '<button class="btn danger" id="aiDel">Anahtarı sil</button>' : ''}</div>
        <div class="field"><label>Zekâ</label><div class="seg" id="aiModel"><button data-aim="akilli" aria-pressed="${AI.model === 'akilli'}">Akıllı (Sonnet)</button><button data-aim="hizli" aria-pressed="${AI.model === 'hizli'}">Hızlı ve ucuz (Haiku)</button></div>
          <span class="sub">Akıllı: daha derin sohbet, mesaj başı ~0,6 cent. Hızlı: ~0,05 cent. Şarkı başı yorumları her zaman hızlı modelle yapılır.</span></div>
        <div class="toggle"><div class="tl"><span>İnternetten bilgi baksın</span><span class="sub">Şarkı ve sanatçı bilgisini doğrular, kaynak gösterir. Arama başına ~1 cent.</span></div><button class="sw" id="aiWeb" role="switch" aria-checked="${AI.web}" aria-label="İnternet araması"></button></div>
        <div class="toggle"><div class="tl"><span>Şarkı başlayınca laf atsın</span><span class="sub">Her şarkıya bir kez, kısa</span></div><button class="sw" id="aiAuto" role="switch" aria-checked="${AI.auto}" aria-label="Otomatik yorum"></button></div>
        <div class="field"><label>Gönül Dostu'nun seninle ilgili notları</label>
          ${AI.mem.length ? `<ul class="memlist">${AI.mem.map((m, i) => `<li><span>${esc(m.t)}</span><button class="more" data-forget="${i}" aria-label="Notu sil">×</button></li>`).join('')}</ul>` : '<span class="sub">Henüz not yok. Sohbet ettikçe sevdiklerini öğrenip not alır.</span>'}</div>
        <button class="btn" id="aiClear">Sohbet geçmişini temizle</button></div>
      <div class="group"><h3>Stuttgart manzarası</h3>
        <p class="msg">${(() => { const i = Scene.info(); return `Bugün Stuttgart'ta gün doğumu <strong>${i.rise}</strong>, batımı <strong>${i.set}</strong>. Ay %${i.moon} dolu.${i.wx ? ' Hava: ' + esc(i.wx) + '.' : ''}`; })()}</p>
        <div class="chips" id="sceneChips">${[['auto', 'Gerçek saat ve hava'], ...Object.entries(Scene.PICK), ['off', 'Kapalı']].map(([k, n]) => `<button class="chip${Scene.mode === k ? ' on' : ''}" data-scene="${k}">${n}</button>`).join('')}</div>
        <div class="toggle"><div class="tl"><span>Canlı Stuttgart havası</span><span class="sub">Yağmur yağıyorsa manzarada da yağar · Hava verisi: Open-Meteo</span></div><button class="sw" id="wxOn" role="switch" aria-checked="${Scene.wxOn}" aria-label="Canlı hava"></button></div></div>
      <div class="group"><h3>Ses motoru</h3>
        <div class="seg" id="engSeg"><button data-m="live" aria-pressed="${d.mode === 'live'}">Canlı</button><button data-m="render" aria-pressed="${d.mode === 'render'}">Hazırlamalı</button></div>
        <p class="msg">${d.mode === 'live' ? 'Canlı: ayarlar anında duyulur. Telefon desteklemezse uygulama kendiliğinden hazırlamalıya geçer.' : 'Hazırlamalı: ses arka planda işlenip çalınır. Her iPhone\'da çalışır, kilit ekranında da devam eder. Ayar değişince yaklaşık bir saniyede güncellenir.'}</p>
        <pre class="diag" id="diagText">${esc(['motor: ' + d.mode + (d.motor ? ' (hazır)' : ''), 'ses: ' + d.ctx, 'oturum: ' + d.session, d.ua, '', ...d.events].join('\n'))}</pre>
        <button class="btn" id="diagCopy">Teknik bilgiyi kopyala</button></div>
      <div class="group"><h3>Uygulama</h3><p class="msg">Sürüm <strong>${VERSION}</strong></p><button class="btn" id="upd">Güncellemeyi kontrol et</button></div>`;
  }
};

/* ================= Sekmeler ================= */
function setView(v) {
  if (v === 'now' && isWide()) v = 'lib';
  App.view = v;
  $('vNow').hidden = v !== 'now'; $('vLib').hidden = v !== 'lib'; $('vLists').hidden = v !== 'lists'; $('vAcct').hidden = v !== 'acct';
  ['tNow', 'tLib', 'tLists', 'tAcct'].forEach(t => $(t).setAttribute('aria-selected', 'v' + t.slice(1) === 'v' + { now: 'Now', lib: 'Lib', lists: 'Lists', acct: 'Acct' }[v]));
  if (v === 'acct') UI.account();
  if (v === 'lists') UI.lists();
  UI.now(); window.scrollTo(0, 0);
}
$('tNow').onclick = () => setView('now');
$('tLib').onclick = () => setView('lib');
$('tLists').onclick = () => { App.openList = null; setView('lists'); };
$('tAcct').onclick = () => setView('acct');
$('miniOpen').onclick = () => setView('now');
$('miniTh').onclick = () => setView('now');
$('miniPlay').onclick = toggle;
$('miniNext').onclick = () => { Engine.unlock(); step(1); };
matchMedia('(min-width:920px)').addEventListener('change', () => setView(App.view));

/* ================= Sheet ================= */
function openSheet(id) { $(id).hidden = false; document.body.style.overflow = 'hidden'; }
function closeSheet(id) { $(id).hidden = true; if (![...document.querySelectorAll('.sheet')].some(s => !s.hidden)) document.body.style.overflow = ''; }
document.querySelectorAll('.sheet').forEach(sh => sh.addEventListener('click', e => { if (e.target === sh && sh.id !== 'cropSheet') closeSheet(sh.id); }));
function menu(items) {
  $('menuBody').innerHTML = `<div class="menu">${items.map((it, i) => `<button data-i="${i}" class="${it.cls || ''}">${it.icon || ''}<span>${esc(it.label)}</span></button>`).join('')}</div><button class="btn" id="menuClose">Vazgeç</button>`;
  $('menuBody').onclick = e => {
    if (e.target.closest('#menuClose')) return closeSheet('menuSheet');
    const b = e.target.closest('[data-i]'); if (!b) return;
    const it = items[+b.dataset.i]; if (!it.keep) closeSheet('menuSheet'); it.run(b);
  };
  openSheet('menuSheet');
}

/* ================= Modlar ================= */
const EQ_PRESETS = {
  flat: { n: 'Düz', g: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  vokal: { n: 'Arabesk vokal', g: [-1, 0, 0, -1, -1, 1, 3, 3, 2, 1] },
  bass: { n: 'Bas', g: [6, 5, 4, 2, 0, 0, 0, 0, 0, 0] },
  baglama: { n: 'Bağlama', g: [0, 0, -1, -1, 0, 1, 2, 4, 4, 3] },
  keman: { n: 'Keman', g: [-2, -1, 0, 0, 1, 2, 3, 2, 1, 0] },
  gece: { n: 'Gece', g: [2, 2, 1, 0, 0, -1, -2, -2, -3, -4] },
  hoparlor: { n: 'Telefon hoparlörü', g: [-4, -2, 2, 3, 2, 1, 1, 2, 2, 0] }
};
const BASE = { rate: 1, semi: 0, rvbOn: false, echoOn: false, tapeOn: false, vinylOn: false, radioOn: false, d8On: false };
const PRESETS = [
  { id: 'orijinal', n: 'Orijinal', d: 'Olduğu gibi, katıksız', p: {} },
  { id: 'slowed', n: 'Slowed + Reverb', d: 'Yavaş, derin, gece üç', p: { rate: 0.85, semi: -2.81, rvbOn: true, rvbType: 'gazino', rvbMix: 0.35 } },
  { id: 'gazino', n: 'Gazino Gecesi', d: 'Sahne yankısı, hafif eko', p: { rvbOn: true, rvbType: 'gazino', rvbMix: 0.26, echoOn: true, echoTime: 0.34, echoFb: 0.2, echoMix: 0.13, eqOn: true, eq: EQ_PRESETS.vokal.g.slice(), eqPreset: 'vokal' } },
  { id: 'hamam', n: 'Hamam', d: 'Kubbede yankılanan ses', p: { rvbOn: true, rvbType: 'hamam', rvbMix: 0.45 } },
  { id: 'kaset', n: 'Eski Kaset', d: 'Bant titremesi, hışırtı', p: { tapeOn: true, tapeWow: 0.55, tapeHiss: 0.35, rvbOn: true, rvbType: 'oda', rvbMix: 0.12 } },
  { id: 'plak', n: '45\'lik Plak', d: 'Cızırtı, sıcak ses', p: { vinylOn: true, vinyl: 0.45, rvbOn: true, rvbType: 'oda', rvbMix: 0.1 } },
  { id: 'dolmus', n: 'Dolmuş Teybi', d: 'Küçük hoparlör, eski bant', p: { radioOn: true, tapeOn: true, tapeWow: 0.3, tapeHiss: 0.25 } },
  { id: 'damar', n: 'Ağır Damar', d: 'Biraz ağır, biraz pes', p: { rate: 0.92, semi: -1, rvbOn: true, rvbType: 'konser', rvbMix: 0.22 } },
  { id: 'd8', n: '8D Gönül', d: 'Ses başının etrafında döner', p: { d8On: true, d8Speed: 0.12, rvbOn: true, rvbType: 'oda', rvbMix: 0.15 } },
  { id: 'fernsehturm', n: 'Fernsehturm Tepesi', d: 'Şehrin üstünde, geniş ve derin', p: { rvbOn: true, rvbType: 'konser', rvbMix: 0.32, d8On: true, d8Speed: 0.06 } },
  { id: 'ubahn', n: 'U-Bahn Gecesi', d: 'Yeraltında yankılanan uzak ses', p: { rvbOn: true, rvbType: 'hamam', rvbMix: 0.36, echoOn: true, echoTime: 0.18, echoFb: 0.25, echoMix: 0.12, eqOn: true, eq: [-3, -2, 0, 1, 2, 1, 0, -2, -4, -6], eqPreset: 'custom' } },
  { id: 'neckar', n: 'Neckar Kenarı', d: 'Sakin, sudan gelen bir hüzün', p: { rate: 0.96, semi: -0.5, rvbOn: true, rvbType: 'oda', rvbMix: 0.2, tapeOn: true, tapeWow: 0.25, tapeHiss: 0.1, eqOn: true, eq: [2, 2, 1, 0, 0, -1, -2, -2, -3, -4], eqPreset: 'gece' } },
  { id: 'nightcore', n: 'Nightcore', d: 'Hızlı ve tiz', p: { rate: 1.25, semi: 3 } }
];
function renderModes() {
  $('modes').innerHTML = PRESETS.map(m => `<button class="mode${fx.preset === m.id ? ' on' : ''}" data-preset="${m.id}"><b>${m.n}</b><span>${m.d}</span></button>`).join('');
}
$('modes').addEventListener('click', e => {
  const b = e.target.closest('[data-preset]'); if (!b) return;
  const m = PRESETS.find(x => x.id === b.dataset.preset);
  Engine.setFx(Object.assign({}, BASE, m.id === 'orijinal' ? { eq: FREQS.map(() => 0), eqPreset: 'flat', preOn: false } : {}, m.p, { preset: m.id }));
  renderFx(); UI.now();
});
const custom = patch => Engine.setFx(Object.assign(patch, { preset: 'custom' }));

/* ================= Ses masası: radyo kadranları ================= */
const DIALS = [
  { id: 'rate', l: 'Tempo', min: 50, max: 150, def: 100, marks: [50, 75, 100, 125, 150], mk: v => '%' + v, get: () => fx.rate * 100, set: v => ({ rate: Math.round(v) / 100 }), fmt: v => '%' + Math.round(v), step: 1, snap: 1.2 },
  { id: 'semi', l: 'Ton', min: -12, max: 12, def: 0, marks: [-12, -6, 0, 6, 12], mk: v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v), get: () => fx.semi, set: v => ({ semi: Math.round(v * 20) / 20 }), fmt: v => signed(v, Math.abs(v - Math.round(v)) < 0.001 ? 0 : 2) + ' yarım ton', step: 1, snap: 0.15, semi: true },
  { id: 'rvb', l: 'Yankı', min: 0, max: 100, def: 0, marks: [0, 25, 50, 75, 100], mk: v => v, get: () => fx.rvbOn ? fx.rvbMix * 100 : 0, set: v => ({ rvbMix: Math.round(v) / 100, rvbOn: v >= 1 }), fmt: v => v >= 1 ? '%' + Math.round(v) + ' · ' + RVB_TYPES[fx.rvbType] : 'kapalı', step: 5 },
  { id: 'echo', l: 'Eko', min: 0, max: 100, def: 0, marks: [0, 25, 50, 75, 100], mk: v => v, get: () => fx.echoOn ? fx.echoMix * 100 : 0, set: v => ({ echoMix: Math.round(v) / 100, echoOn: v >= 1 }), fmt: v => v >= 1 ? '%' + Math.round(v) : 'kapalı', step: 5 }
];
function buildKnobs() {
  $('knobs').innerHTML = DIALS.map(d => `<div class="dial">
    <div class="dtop"><span class="dl">${d.l}</span><span class="dv" id="dv-${d.id}"></span>
      <span class="dsteps"><button data-dstep="${d.id}" data-d="-1" aria-label="${d.l} azalt">−</button><button data-dstep="${d.id}" data-d="1" aria-label="${d.l} artır">+</button><button data-dreset="${d.id}" aria-label="${d.l} sıfırla">↺</button></span></div>
    <div class="dscale" data-dial="${d.id}" role="slider" tabindex="0" aria-label="${d.l}">
      <span class="dfill" id="df-${d.id}"></span>
      ${d.marks.map((m, i) => `<span class="dmark${i === 0 ? ' l' : i === d.marks.length - 1 ? ' r' : ''}" style="left:${(m - d.min) / (d.max - d.min) * 100}%"><i></i>${d.mk(m)}</span>`).join('')}
      <span class="dneedle" id="dn-${d.id}"></span>
    </div></div>`).join('');
}
function dialUI(d) {
  const v = d.get(), f = (v - d.min) / (d.max - d.min), f0 = (d.def - d.min) / (d.max - d.min);
  $('dn-' + d.id).style.left = (f * 100) + '%';
  const fl = $('df-' + d.id); fl.style.left = (Math.min(f, f0) * 100) + '%'; fl.style.width = (Math.abs(f - f0) * 100) + '%';
  $('dv-' + d.id).textContent = d.fmt(v);
  $('dv-' + d.id).classList.toggle('off', Math.abs(v - d.def) < 0.001);
}
(() => {
  let act = null;
  const clampSnap = (d, v) => { v = Math.max(d.min, Math.min(d.max, v)); const r = Math.round(v); if (d.snap && Math.abs(v - r) < (d.semi ? d.snap : d.snap)) v = r; return v; };
  const at = (d, e, el) => { const r = el.getBoundingClientRect(); return d.min + Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * (d.max - d.min); };
  $('knobs').addEventListener('pointerdown', e => {
    const el = e.target.closest('[data-dial]'); if (!el) return;
    const d = DIALS.find(x => x.id === el.dataset.dial);
    act = { d, el, x: e.clientX, y: e.clientY, v: d.get(), moved: false, id: e.pointerId };
  });
  $('knobs').addEventListener('pointermove', e => {
    if (!act || e.pointerId !== act.id) return;
    const dx = e.clientX - act.x, dy = e.clientY - act.y;
    if (!act.moved) { if (Math.abs(dx) < 6) return; if (Math.abs(dy) > Math.abs(dx)) { act = null; return; } act.moved = true; try { act.el.setPointerCapture(e.pointerId); } catch (er) {} }
    const r = act.el.getBoundingClientRect(), d = act.d;
    custom(d.set(clampSnap(d, act.v + dx / r.width * (d.max - d.min)))); renderFx();
  });
  const end = e => {
    if (!act || e.pointerId !== act.id) return;
    if (!act.moved && e.type === 'pointerup') { const d = act.d; custom(d.set(clampSnap(d, at(d, e, act.el)))); renderFx(); }
    act = null;
  };
  $('knobs').addEventListener('pointerup', end); $('knobs').addEventListener('pointercancel', end);
  $('knobs').addEventListener('click', e => {
    const r = e.target.closest('[data-dreset]'); if (r) { const d = DIALS.find(x => x.id === r.dataset.dreset); custom(d.set(d.def)); renderFx(); return; }
    const b = e.target.closest('[data-dstep]'); if (!b) return;
    const d = DIALS.find(x => x.id === b.dataset.dstep), s = +b.dataset.d;
    let v = d.get();
    v = d.semi ? (s > 0 ? Math.floor(v + 1e-6) + 1 : Math.ceil(v - 1e-6) - 1) : Math.round((v + s * d.step) / d.step) * d.step;
    custom(d.set(Math.max(d.min, Math.min(d.max, v)))); renderFx();
  });
  $('knobs').addEventListener('keydown', e => {
    const el = e.target.closest('[data-dial]'); if (!el) return;
    const d = DIALS.find(x => x.id === el.dataset.dial), st = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 }[e.key];
    if (!st) return; e.preventDefault();
    custom(d.set(Math.max(d.min, Math.min(d.max, d.get() + st * (d.semi ? 0.5 : d.step))))); renderFx();
  });
})();
$('formant').onclick = () => { custom({ formant: !fx.formant }); renderFx(); };

/* ================= Dinleme geçmişi ve uyku zamanlayıcısı ================= */
const Hist = (() => {
  let h = LS.get('gp-hist', []);
  return {
    add(s) { h.push({ id: s.id, t: Date.now(), m: fx.preset }); if (h.length > 500) h = h.slice(-500); LS.set('gp-hist', h); },
    summary() {
      const now = Date.now(), day = 864e5, start = new Date(); start.setHours(0, 0, 0, 0);
      const today = h.filter(x => x.t >= start.getTime()).length;
      const month = h.filter(x => now - x.t < 30 * day);
      const cnt = (arr, key) => { const m = new Map(); arr.forEach(x => { const k = key(x); if (k) m.set(k, (m.get(k) || 0) + 1); }); return [...m.entries()].sort((a, b) => b[1] - a[1]); };
      const art = cnt(month, x => (App.byId(x.id) || {}).artist).slice(0, 5).map(([a, n]) => `${a} (${n})`).join(', ');
      const songs = cnt(month, x => (App.byId(x.id) || {}).title).slice(0, 5).map(([a, n]) => `${a} (${n})`).join(', ');
      const modes = cnt(month, x => x.m !== 'orijinal' && x.m !== 'custom' ? (PRESETS.find(p => p.id === x.m) || {}).n : null).slice(0, 3).map(([a, n]) => `${a} (${n})`).join(', ');
      const ago = t => { const m = Math.round((now - t) / 60000); return m < 60 ? m + ' dk önce' : m < 1440 ? Math.round(m / 60) + ' saat önce' : Math.round(m / 1440) + ' gün önce'; };
      const recent = h.slice(-8).reverse().map(x => { const s = App.byId(x.id); return s ? `${s.title} (${ago(x.t)})` : null; }).filter(Boolean).join('; ');
      return `Bugün ${today} şarkı dinlendi. Son 30 günde en çok dinlenen sanatçılar: ${art || 'henüz yok'}. En çok dinlenen şarkılar: ${songs || 'henüz yok'}. Sık kullanılan modlar: ${modes || 'yok'}. Son dinlenenler: ${recent || 'yok'}.`;
    }
  };
})();
const Sleep = (() => {
  let at = 0, timer = 0;
  const tick = () => { if (at && Date.now() >= at) { at = 0; Engine.pause(); UI.now(); toast('Uyku zamanı. Kaset durdu, iyi geceler.'); } UI.now(); };
  return {
    set(min) { at = min > 0 ? Date.now() + min * 60000 : 0; clearInterval(timer); if (at) timer = setInterval(tick, 15000); UI.now(); },
    get left() { return at ? Math.max(0, Math.ceil((at - Date.now()) / 60000)) : 0; }
  };
})();

/* ================= Gönül Dostu (yapay zekâ) ================= */
const AI = (() => {
  const MODELS = { hizli: 'claude-haiku-5-5', akilli: 'claude-sonnet-5-5' };
  let key = LS.get('gp-ai-key', '');
  let auto = LS.get('gp-ai-auto', true);
  let model = LS.get('gp-ai-model', 'akilli');
  let web = LS.get('gp-ai-web', true);
  let mem = LS.get('gp-ai-mem', []);           // kalıcı notlar
  let log = LS.get('gp-ai-log2', []);          // {r:'u'|'a'|'n'|'e'|'act', t, src?}
  const said = LS.get('gp-ai-said', {});
  let busy = false, songTimer = 0, live = null, numMap = [];
  const save = () => { log = log.slice(-80); LS.set('gp-ai-log2', log); };

  const STATIC = `Sen "Gönül Dostu"sun: Gönül Plak adlı arabesk müzik çalarının içinde yaşayan sohbet arkadaşı. Stuttgart'ta bir kahvehanede çay demleyip arabesk konuşan, Orhan Gencebay'dan Müslüm Gürses'e, Ferdi Tayfur'dan Bergen'e, Hakkı Bulut'tan İbrahim Tatlıses'e kadar eski kasetleri bilen, dertten anlayan ama ağlak olmayan, esprili, sıcak bir dostsun. Almanya'daki Türklerin, gurbetçi kuşağının ve Stuttgart'ın Türk mahallelerinin arabeskle bağını bilirsin.

Nasıl konuşursun:
- Türkçe, samimi, kısa: genelde 1-4 cümle. Kullanıcı uzun anlatırsa sen de biraz açılabilirsin.
- Her cevaba aynı kalıpla başlama; "Ah", "Vay" gibi girişleri tekrar etme. Klişe arabesk lafını ara sıra, yerinde kullan.
- Şarkı sözlerini asla alıntılama ya da yazma; sözlerin ne anlattığını kendi cümlelerinle anlatabilirsin.
- Bir şarkı, yıl, albüm ya da hikâye hakkında emin değilsen uydurma. İnternet araman varsa kısa bir aramayla doğrula; yoksa "tam emin değilim" de.
- Markdown başlık, liste ya da kalın yazı kullanma; düz konuşma dili.

Uygulamayı yönetebilirsin (araçlar): şarkı çalmak, sıraya koymak, liste kurmak, mod açmak, tempo/ton/yankı gibi sesi ayarlamak, uyku zamanlayıcısı kurmak, kullanıcıyla ilgili kalıcı not almak.
- Kullanıcı bir şey çalmanı, açmanı, ayarlamanı isterse sormadan aracı kullan, sonra kısaca ne yaptığını söyle.
- Kullanıcı açıkça istemedikçe şarkı değiştirme ya da ses ayarını bozma; öneri yap, "açayım mı?" diye sor.
- Şarkıları sadece arşivdeki numarayla çalabilirsin. Arşivde olmayan bir şarkıyı önerirsen arşivde olmadığını söyle.
- Kullanıcı kendisi hakkında kalıcı bir şey söylerse (sevdiği sanatçı, ruh hali alışkanlığı, adı, sevdiği semt) remember aracıyla kısa bir not al. Her konuşmada not alma, sadece gerçekten kalıcı şeylerde.
- Notları ve dinleme geçmişini doğal kullan; "notlarıma göre" gibi teknik laflar etme.

Kullanıcı Stuttgart'ta yaşıyor ve Stuttgart'a sevdalı. Saate, havaya ve gün batımına göre yeri gelince Stuttgart'a değin (Fernsehturm, Fernmeldeturm, Schlossplatz, Königstraße, Neckar, Bad Cannstatt, Karlshöhe, Killesberg, Feuersee gibi) ama her cevapta değil.

Kullanıcı kendine zarar vermeyi düşündüğünü ya da çok kötü olduğunu söylerse dertleşmeyi sürdür, yargılama; nazikçe güvendiği biriyle ya da bir uzmanla konuşmasını öner ve Almanya'da ücretsiz, 7/24 açık Telefonseelsorge'u ver: 0800 111 0 111 veya 0800 111 0 222.`;

  function dynamicCtx() {
    const s = App.byId(App.curId);
    const eff = [];
    if (Math.abs(fx.rate - 1) > 0.001) eff.push('tempo %' + Math.round(fx.rate * 100));
    if (Math.abs(fx.semi) > 0.01) eff.push('ton ' + signed(fx.semi, 1) + ' yarım ton');
    if (fx.rvbOn) eff.push(RVB_TYPES[fx.rvbType] + ' yankısı %' + Math.round(fx.rvbMix * 100));
    if (fx.echoOn) eff.push('eko'); if (fx.tapeOn) eff.push('eski kaset'); if (fx.vinylOn) eff.push('plak cızırtısı'); if (fx.radioOn) eff.push('dolmuş hoparlörü'); if (fx.d8On) eff.push('8D');
    const mode = PRESETS.find(p => p.id === fx.preset);
    const list = App.songs.slice().sort((a, b) => (b.added || 0) - (a.added || 0)).slice(0, 220);
    numMap = list.map(x => x.id);
    const arc = list.map((x, i) => `${i + 1}. ${x.title}${x.artist ? ' – ' + x.artist : ''}`).join('\n');
    const now = new Date();
    return `Şu an: ${now.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}, saat ${now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}. ${Scene.describe()}
Çalan şarkı: ${s ? `"${s.title}"${s.artist ? ' – ' + s.artist : ''}${s.album ? ', albüm ' + s.album : ''}${s.year ? ', ' + s.year : ''} (arşiv no ${numMap.indexOf(s.id) + 1})` : 'yok'}; ${Engine.playing ? 'çalıyor' : 'duraklatılmış'}.
Ses: mod ${mode ? mode.n : 'özel ayar'}; efektler: ${eff.join(', ') || 'yok'}.${Sleep.left ? ` Uyku zamanlayıcısı: ${Sleep.left} dk kaldı.` : ''}
Dinleme: ${Hist.summary()}
Kullanıcı hakkında notlar: ${mem.length ? mem.map(m => '- ' + m.t).join('\n') : 'henüz yok'}
Modlar (id: ad): ${PRESETS.map(p => p.id + ': ' + p.n).join(', ')}
Arşiv (${App.songs.length} şarkı${App.songs.length > 220 ? ', en yeni 220' : ''}):
${arc || 'boş'}`;
  }

  const num = { type: 'integer', description: 'Arşiv listesindeki şarkı numarası' };
  const TOOLS = [
    { name: 'play_song', description: 'Arşivden bir şarkıyı hemen çalar.', input_schema: { type: 'object', properties: { song: num }, required: ['song'] } },
    { name: 'queue_songs', description: 'Şu anki şarkıdan sonra çalacak sırayı belirler.', input_schema: { type: 'object', properties: { songs: { type: 'array', items: num } }, required: ['songs'] } },
    { name: 'make_playlist', description: 'Arşivdeki şarkılardan yeni bir liste kurar ve Listeler sekmesine kaydeder. İstenirse hemen çalar.', input_schema: { type: 'object', properties: { name: { type: 'string' }, songs: { type: 'array', items: num }, play: { type: 'boolean' } }, required: ['name', 'songs'] } },
    { name: 'set_mode', description: 'Hazır ses modunu açar.', input_schema: { type: 'object', properties: { mode: { type: 'string', enum: PRESETS.map(p => p.id) } }, required: ['mode'] } },
    { name: 'set_sound', description: 'Ses ayarlarını değiştirir. Sadece verilen alanlar değişir.', input_schema: { type: 'object', properties: {
      tempo_percent: { type: 'number', minimum: 50, maximum: 150 }, semitones: { type: 'number', minimum: -12, maximum: 12 },
      reverb_percent: { type: 'number', minimum: 0, maximum: 100 }, reverb_room: { type: 'string', enum: Object.keys(RVB_TYPES) },
      echo_percent: { type: 'number', minimum: 0, maximum: 100 }, tape: { type: 'boolean' }, vinyl: { type: 'boolean' }, radio: { type: 'boolean' }, eight_d: { type: 'boolean' },
      eq_preset: { type: 'string', enum: Object.keys(EQ_PRESETS) } } } },
    { name: 'sleep_timer', description: 'Belirtilen dakika sonra çalmayı durdurur. 0 iptal eder.', input_schema: { type: 'object', properties: { minutes: { type: 'integer', minimum: 0, maximum: 240 } }, required: ['minutes'] } },
    { name: 'remember', description: 'Kullanıcı hakkında kalıcı, kısa bir not kaydeder (ör. sevdiği sanatçı).', input_schema: { type: 'object', properties: { fact: { type: 'string' } }, required: ['fact'] } }
  ];
  const songAt = n => App.byId(numMap[(n | 0) - 1]);
  function act(t) { log.push({ r: 'act', t }); }
  function runTool(name, x) {
    try {
      if (name === 'play_song') { const s = songAt(x.song); if (!s) return 'Bu numarada şarkı yok.'; playSong(s.id, App.queue.includes(s.id) ? App.queue : App.filtered().map(y => y.id)); act(`♪ ${s.title} çalıyor`); return `Çalıyor: ${s.title}`; }
      if (name === 'queue_songs') {
        const ids = (x.songs || []).map(songAt).filter(Boolean).map(s => s.id); if (!ids.length) return 'Geçerli şarkı yok.';
        App.queue = [App.curId, ...ids].filter(Boolean); App.prefs.shuffle = false; App.savePrefs(); UI.modes(); UI.now();
        act(`Sıra kuruldu: ${ids.length} şarkı`); return 'Sıra kuruldu: ' + ids.map(id => App.byId(id).title).join(', ');
      }
      if (name === 'make_playlist') {
        const ss = (x.songs || []).map(songAt).filter(Boolean); if (!ss.length) return 'Geçerli şarkı yok.';
        const L = { id: 'gd-' + newId(), name: String(x.name || 'Gönül Dostu listesi').slice(0, 60), image: null, tracks: ss.map(s => ({ title: s.title, artist: s.artist, spId: s.spId || null, coverUrl: s.coverUrl || null })), source: 'ai', imported: Date.now() };
        App.lists.push(L); DB.put('lists', L); UI.lists();
        if (x.play) playSong(ss[0].id, ss.map(s => s.id));
        act(`"${L.name}" listesi kuruldu (${ss.length} şarkı)`); return `Liste kuruldu: ${L.name}`;
      }
      if (name === 'set_mode') {
        const m = PRESETS.find(p => p.id === x.mode); if (!m) return 'Böyle bir mod yok.';
        Engine.setFx(Object.assign({}, BASE, m.id === 'orijinal' ? { eq: FREQS.map(() => 0), eqPreset: 'flat', preOn: false } : {}, m.p, { preset: m.id }));
        renderFx(); UI.now(); act(`${m.n} modu açıldı`); return `${m.n} açık.`;
      }
      if (name === 'set_sound') {
        const p = {};
        if (x.tempo_percent != null) p.rate = Math.round(Math.max(50, Math.min(150, x.tempo_percent))) / 100;
        if (x.semitones != null) p.semi = Math.round(Math.max(-12, Math.min(12, x.semitones)) * 20) / 20;
        if (x.reverb_percent != null) { p.rvbMix = Math.max(0, Math.min(100, x.reverb_percent)) / 100; p.rvbOn = p.rvbMix > 0.005; }
        if (x.reverb_room) { p.rvbType = x.reverb_room; if (p.rvbOn == null) p.rvbOn = true; }
        if (x.echo_percent != null) { p.echoMix = Math.max(0, Math.min(100, x.echo_percent)) / 100; p.echoOn = p.echoMix > 0.005; }
        if (x.tape != null) p.tapeOn = !!x.tape; if (x.vinyl != null) p.vinylOn = !!x.vinyl; if (x.radio != null) p.radioOn = !!x.radio; if (x.eight_d != null) p.d8On = !!x.eight_d;
        if (x.eq_preset && EQ_PRESETS[x.eq_preset]) Object.assign(p, { eq: EQ_PRESETS[x.eq_preset].g.slice(), eqPreset: x.eq_preset, eqOn: true });
        custom(p); renderFx(); UI.now(); act('Ses ayarlandı'); return 'Ayarlandı.';
      }
      if (name === 'sleep_timer') { Sleep.set(x.minutes | 0); act(x.minutes > 0 ? `Uyku zamanlayıcısı: ${x.minutes} dk` : 'Uyku zamanlayıcısı kapatıldı'); return 'Tamam.'; }
      if (name === 'remember') { const f = String(x.fact || '').trim().slice(0, 160); if (f && !mem.some(m => m.t === f)) { mem.push({ t: f, at: Date.now() }); mem = mem.slice(-40); LS.set('gp-ai-mem', mem); act('Not aldım: ' + f); } return 'Kaydedildi.'; }
    } catch (e) { return 'Hata: ' + e.message; }
    return 'Bilinmeyen araç.';
  }

  /* Akışlı istek */
  async function stream(body, onText) {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify(Object.assign({ stream: true }, body))
    });
    if (!r.ok) {
      let m = ''; try { const j = await r.json(); m = (j.error && j.error.message) || ''; } catch (e) {}
      if (r.status === 401) throw new Error('Anahtar geçersiz. Ben sekmesinden kontrol et.');
      if (r.status === 429) throw new Error('Çok hızlı gittik, birazdan tekrar dene.');
      if (r.status === 529 || r.status === 503) throw new Error('Sunucular şu an yoğun, biraz sonra tekrar dene.');
      if (/credit|balance|billing/i.test(m)) throw new Error('Claude hesabında kredi kalmamış. console.anthropic.com\'dan yükleme yapabilirsin.');
      throw new Error(m || 'Bağlantı hatası (' + r.status + ')');
    }
    const blocks = [], json = {}; let stop = null, buf = '';
    const rd = r.body.getReader(), dec = new TextDecoder();
    for (;;) {
      const { done, value } = await rd.read(); if (done) break;
      buf += dec.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf('\n\n')) >= 0) {
        const chunk = buf.slice(0, i); buf = buf.slice(i + 2);
        const line = chunk.split('\n').find(l => l.startsWith('data:')); if (!line) continue;
        let ev; try { ev = JSON.parse(line.slice(5)); } catch (e) { continue; }
        if (ev.type === 'content_block_start') { blocks[ev.index] = ev.content_block; if (ev.content_block.type === 'text' && ev.content_block.text) onText(ev.content_block.text); }
        else if (ev.type === 'content_block_delta') {
          const b = blocks[ev.index], d = ev.delta;
          if (d.type === 'text_delta') { b.text = (b.text || '') + d.text; onText(d.text); }
          else if (d.type === 'input_json_delta') json[ev.index] = (json[ev.index] || '') + d.partial_json;
          else if (d.type === 'citations_delta') (b.citations = b.citations || []).push(d.citation);
        }
        else if (ev.type === 'content_block_stop') { if (json[ev.index] != null) { try { blocks[ev.index].input = JSON.parse(json[ev.index] || '{}'); } catch (e) { blocks[ev.index].input = {}; } } }
        else if (ev.type === 'message_delta') stop = ev.delta && ev.delta.stop_reason;
        else if (ev.type === 'error') throw new Error((ev.error && ev.error.message) || 'Akış hatası');
      }
    }
    return { blocks: blocks.filter(Boolean), stop };
  }
  function history() {
    const m = [];
    log.filter(x => x.r === 'u' || x.r === 'a').slice(-18).forEach(x => {
      const role = x.r === 'u' ? 'user' : 'assistant';
      if (!x.t) return;
      if (m.length && m[m.length - 1].role === role) m[m.length - 1].content += '\n' + x.t; else m.push({ role, content: x.t });
    });
    while (m.length && m[0].role !== 'user') m.shift();
    return m;
  }
  function sysBlocks() { return [{ type: 'text', text: STATIC, cache_control: { type: 'ephemeral' } }, { type: 'text', text: dynamicCtx() }]; }
  async function converse(messages, opt = {}) {
    const tools = opt.noTools ? [] : TOOLS.slice();
    if (!opt.noTools && web) tools.push({ type: 'web_search_20250305', name: 'web_search', max_uses: 2, user_location: { type: 'approximate', city: 'Stuttgart', region: 'Baden-Württemberg', country: 'DE', timezone: 'Europe/Berlin' } });
    let text = '', src = [], searched = 0;
    for (let round = 0; round < 6; round++) {
      const body = { model: opt.model || MODELS[model], max_tokens: opt.max || 700, system: sysBlocks(), messages };
      if (tools.length) body.tools = tools;
      const res = await stream(body, d => { text += d; opt.onText && opt.onText(text); });
      res.blocks.forEach(b => {
        if (b.type === 'text' && b.citations) b.citations.forEach(c => { if (c.url && !src.some(s => s.url === c.url)) src.push({ url: c.url, title: c.title || c.url }); });
        if (b.type === 'server_tool_use') { searched++; opt.onStatus && opt.onStatus('İnternete bakıyor…'); }
      });
      if (res.stop === 'tool_use') {
        messages.push({ role: 'assistant', content: res.blocks });
        const results = res.blocks.filter(b => b.type === 'tool_use').map(b => ({ type: 'tool_result', tool_use_id: b.id, content: runTool(b.name, b.input || {}) }));
        messages.push({ role: 'user', content: results });
        save(); render();
        if (text && !/\s$/.test(text)) text += ' ';
        continue;
      }
      if (res.stop === 'pause_turn') { messages.push({ role: 'assistant', content: res.blocks }); continue; }
      break;
    }
    return { text: text.trim(), src, searched };
  }

  async function send(text) {
    if (!key || busy || !text.trim()) return;
    log.push({ r: 'u', t: text.trim() }); save(); busy = true; live = { t: '' }; render();
    try {
      const out = await converse(history(), { onText: t => { live.t = t; live.st = null; renderLive(); }, onStatus: st => { live.st = st; renderLive(); } });
      log.push({ r: 'a', t: out.text || 'Tamamdır.', src: out.src.slice(0, 4) });
    } catch (e) { log.push({ r: 'e', t: e.message }); }
    busy = false; live = null; save(); render();
  }
  async function onSong(s) {
    clearTimeout(songTimer);
    if (!s) return;
    Hist.add(s);
    if (!key || !auto) return;
    songTimer = setTimeout(async () => {
      if (App.curId !== s.id || !Engine.playing || busy) return;
      const last = log[log.length - 1];
      if (!(last && last.r === 'n' && last.id === s.id)) { log.push({ r: 'n', id: s.id, t: s.title + (s.artist ? ' · ' + s.artist : '') }); save(); }
      if (said[s.id]) { render(); return; }
      busy = true; live = { t: '' }; render();
      try {
        const msgs = history(); const note = `(Sistem notu: "${s.title}"${s.artist ? ' – ' + s.artist : ''} şimdi başladı. Bu şarkıya, saate ya da Stuttgart'ın şu anki haline dair 1-2 cümlelik kısa, samimi bir lafla sohbet aç. Araç kullanma.)`;
        if (msgs.length && msgs[msgs.length - 1].role === 'user') msgs[msgs.length - 1].content += '\n' + note; else msgs.push({ role: 'user', content: note });
        const out = await converse(msgs, { noTools: true, model: MODELS.hizli, max: 180, onText: t => { live.t = t; renderLive(); } });
        if (out.text) { log.push({ r: 'u', t: `(${s.title} başladı)`, hide: true }, { r: 'a', t: out.text }); said[s.id] = 1; const k = Object.keys(said); if (k.length > 400) delete said[k[0]]; LS.set('gp-ai-said', said); }
      } catch (e) {}
      busy = false; live = null; save(); render();
    }, 3500);
  }

  function lastLine() { for (let i = log.length - 1; i >= 0; i--) if (log[i].r === 'a') return log[i]; return null; }
  function bubble(x) {
    if (x.r === 'n') return `<div class="cnote">♪ ${esc(x.t)}</div>`;
    if (x.r === 'act') return `<div class="cact">${esc(x.t)}</div>`;
    if (x.r === 'e') return `<div class="cmsg err">${esc(x.t)}</div>`;
    if (x.hide) return '';
    const src = x.src && x.src.length ? `<div class="csrc">${x.src.map(s => { let h = ''; try { h = new URL(s.url).hostname.replace(/^www\./, ''); } catch (e) {} return `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(h || s.title)}</a>`; }).join('')}</div>` : '';
    return `<div class="cmsg ${x.r === 'u' ? 'me' : 'gd'}">${esc(x.t).replace(/\n/g, '<br>')}${src}</div>`;
  }
  function renderLive() {
    const el = $('chatLive'); if (el) el.innerHTML = live && live.t ? esc(live.t).replace(/\n/g, '<br>') : `<span class="typing"><i></i><i></i><i></i></span>${live && live.st ? `<span class="sub">${esc(live.st)}</span>` : ''}`;
    const c = $('gdLine'); if (c && live && live.t) c.textContent = live.t;
    const box = $('chatLog'); if (box) box.scrollTop = box.scrollHeight;
  }
  function render() {
    const c = $('gdCard');
    if (c) {
      if (!key) c.innerHTML = `<div class="gdav">${TEA}</div><div class="gdtx"><b>Gönül Dostu</b><span>Şarkılara laf atan, seninle dertleşen, istersen kaseti senin yerine yöneten bir dost. Açmak için Ben sekmesinden anahtarını ekle.</span></div><button class="chipbtn" id="gdSetup">Kur</button>`;
      else { const l = lastLine(); c.innerHTML = `<div class="gdav">${TEA}</div><div class="gdtx"><b>Gönül Dostu</b><span id="gdLine">${busy && live && live.t ? esc(live.t) : busy ? 'düşünüyor…' : l ? esc(l.t) : 'Bir şarkı aç, lafa girelim.'}</span></div><button class="chipbtn" id="gdOpen">Sohbet</button>`; }
    }
    const box = $('chatLog'); if (!box || $('chatSheet').hidden) return;
    const html = log.map(bubble).join('') + (busy ? '<div class="cmsg gd" id="chatLive"></div>' : '');
    box.innerHTML = html || `<div class="cnote">Merhaba! Bir şey sor, ya da "bana gece için bir liste yap" de.</div>`;
    if (busy) renderLive();
    box.scrollTop = box.scrollHeight;
    $('chatSend').disabled = busy;
  }
  return {
    get key() { return key; }, get auto() { return auto; }, get model() { return model; }, get web() { return web; }, get mem() { return mem; },
    setKey(k) { key = k.trim(); LS.set('gp-ai-key', key); render(); },
    setAuto(v) { auto = v; LS.set('gp-ai-auto', v); },
    setModel(m) { model = MODELS[m] ? m : 'akilli'; LS.set('gp-ai-model', model); },
    setWeb(v) { web = v; LS.set('gp-ai-web', v); },
    forget(i) { mem.splice(i, 1); LS.set('gp-ai-mem', mem); },
    clear() { log = []; save(); render(); },
    async test() { const out = await converse([{ role: 'user', content: 'Tek kısa cümleyle merhaba de.' }], { noTools: true, max: 60 }); return out.text; },
    send, onSong, render
  };
})();
const TEA = '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#2a1920"/><path d="M13 13h14l-1.6 15.5a2 2 0 0 1-2 1.8h-6.8a2 2 0 0 1-2-1.8z" fill="#f5e7d0" opacity=".9"/><path d="M14.1 19h11.8l-.9 9.3a1.6 1.6 0 0 1-1.6 1.4h-6.8a1.6 1.6 0 0 1-1.6-1.4z" fill="#c2412d"/><path d="M12 31.5h16" stroke="#f4b13e" stroke-width="2" stroke-linecap="round"/><path d="M17 10c0-2 2-2 2-4M22 10c0-2 2-2 2-4" stroke="#b39a90" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>';
document.addEventListener('click', e => {
  if (e.target.closest('#gdOpen')) { openSheet('chatSheet'); AI.render(); return; }
  if (e.target.closest('#gdSetup')) { setView('acct'); setTimeout(() => { const k = $('aiKey'); if (k) k.scrollIntoView({ block: 'center' }); }, 60); return; }
  const ap = e.target.closest('[data-apply]');
  if (ap) { const m = PRESETS.find(p => p.id === ap.dataset.apply); if (m) { Engine.setFx(Object.assign({}, BASE, m.id === 'orijinal' ? { eq: FREQS.map(() => 0), eqPreset: 'flat', preOn: false } : {}, m.p, { preset: m.id })); renderFx(); UI.now(); toast(m.n + ' açıldı'); } return; }
  const q = e.target.closest('[data-ask]'); if (q) { AI.send(q.dataset.ask); return; }
});
$('chatForm').addEventListener('submit', e => { e.preventDefault(); const i = $('chatIn'); const t = i.value; i.value = ''; AI.send(t); });

/* ================= Efekt kartları ================= */
const FXCARDS = [
  { id: 'rvb', on: 'rvbOn', ic: ICON.rvb, n: 'Yankı', d: 'Odanın, gazinonun, hamamın sesi', chips: true, sl: [['rvbMix', 'Miktar', 0, 1, 0.01, v => '%' + Math.round(v * 100)]] },
  { id: 'echo', on: 'echoOn', ic: ICON.echo, n: 'Eko', d: 'Sesin dağlara çarpıp dönmesi', sl: [['echoTime', 'Süre', 0.08, 0.9, 0.01, v => num(v, 2) + ' sn'], ['echoFb', 'Tekrar', 0, 0.75, 0.01, v => '%' + Math.round(v * 100)], ['echoMix', 'Miktar', 0, 1, 0.01, v => '%' + Math.round(v * 100)]] },
  { id: 'tape', on: 'tapeOn', ic: ICON.tape, n: 'Eski kaset', d: 'Bant titremesi ve hışırtı', sl: [['tapeWow', 'Titreme', 0, 1, 0.01, v => '%' + Math.round(v * 100)], ['tapeHiss', 'Hışırtı', 0, 1, 0.01, v => '%' + Math.round(v * 100)]] },
  { id: 'vinyl', on: 'vinylOn', ic: ICON.vinyl, n: 'Plak cızırtısı', d: 'İğnenin plakta gezinmesi', sl: [['vinyl', 'Seviye', 0, 1, 0.01, v => '%' + Math.round(v * 100)]] },
  { id: 'radio', on: 'radioOn', ic: ICON.radio, n: 'Dolmuş hoparlörü', d: 'Küçük, cızırtılı teyp sesi', sl: [] },
  { id: 'd8', on: 'd8On', ic: ICON.d8, n: '8D dönen ses', d: 'Kulaklıkla dinle', sl: [['d8Speed', 'Hız', 0.04, 0.4, 0.01, v => num(v, 2) + ' Hz']] }
];
function buildFx() {
  $('fxlist').innerHTML = FXCARDS.map(c => `<div class="fx" id="fx-${c.id}"><div class="fxh"><span class="ic">${c.ic}</span><span class="tl"><b>${c.n}</b><span class="sub">${c.d}</span></span>
    <button class="sw" data-fxon="${c.on}" role="switch" aria-label="${c.n}"></button></div>
    <div class="fxb">${c.chips ? `<div class="chips">${Object.entries(RVB_TYPES).map(([k, n]) => `<button class="chip" data-rvbt="${k}">${n}</button>`).join('')}</div>` : ''}
    ${c.sl.map(([key, l, mn, mx, st]) => `<div class="slrow"><span>${l}</span><input type="range" data-fxk="${key}" min="${mn}" max="${mx}" step="${st}" aria-label="${c.n} ${l}"><span data-fxv="${key}"></span></div>`).join('')}
    ${c.id === 'radio' ? '<p class="msg">Bas ve tizler kesilir, ses küçük bir teypten geliyormuş gibi olur.</p>' : ''}</div></div>`).join('');
}
$('fxlist').addEventListener('click', e => {
  const s = e.target.closest('[data-fxon]'); if (s) { custom({ [s.dataset.fxon]: !fx[s.dataset.fxon] }); renderFx(); return; }
  const c = e.target.closest('[data-rvbt]'); if (c) { custom({ rvbType: c.dataset.rvbt, rvbOn: true }); renderFx(); }
});
$('fxlist').addEventListener('input', e => { const k = e.target.dataset.fxk; if (!k) return; custom({ [k]: +e.target.value }); renderFx(); });

/* ================= Ekolayzır ================= */
function buildEq() {
  $('eqPresets').innerHTML = Object.entries(EQ_PRESETS).map(([k, p]) => `<button class="chip" data-eq="${k}">${p.n}</button>`).join('');
  $('faders').innerHTML = FREQS.map((f, i) => `<div class="fd"><span class="v" id="ev${i}"></span><div class="slot" data-band="${i}"><span class="tr"></span><span class="tick"></span><span class="cap" id="ec${i}"></span></div><span class="f">${f >= 1000 ? f / 1000 + 'k' : f}</span></div>`).join('');
}
function bandUI(i, v) { $('ec' + i).style.top = ((1 - (v + 12) / 24) * 150) + 'px'; $('ev' + i).textContent = (v > 0 ? '+' : '') + num(v, 1); }
(() => {
  let act = null;
  const val = (e, el) => { const r = el.getBoundingClientRect(); let v = (1 - (e.clientY - r.top) / r.height) * 24 - 12; v = Math.max(-12, Math.min(12, Math.round(v * 10) / 10)); if (Math.abs(v) < 0.35) v = 0; return v; };
  const set = (i, v) => { const eq = fx.eq.slice(); eq[i] = v; custom({ eq, eqPreset: 'custom', eqOn: true }); renderFx(); };
  $('faders').addEventListener('pointerdown', e => { const el = e.target.closest('.slot'); if (!el) return; act = { el, i: +el.dataset.band }; el.setPointerCapture(e.pointerId); set(act.i, val(e, el)); });
  $('faders').addEventListener('pointermove', e => { if (act) set(act.i, val(e, act.el)); });
  const end = () => act = null;
  $('faders').addEventListener('pointerup', end); $('faders').addEventListener('pointercancel', end);
})();
$('eqPresets').addEventListener('click', e => { const b = e.target.closest('[data-eq]'); if (!b) return; custom({ eq: EQ_PRESETS[b.dataset.eq].g.slice(), eqPreset: b.dataset.eq, eqOn: true }); renderFx(); });
$('eqOn').onclick = () => { custom({ eqOn: !fx.eqOn }); renderFx(); };
$('pre').addEventListener('input', e => { const v = e.target.value / 10; custom({ pre: v, preOn: Math.abs(v) > 0.01 }); renderFx(); });
$('fxReset').onclick = () => { Engine.setFx(Object.assign({}, FX_DEFAULT, { eq: FREQS.map(() => 0) })); renderFx(); UI.now(); toast('Her şey sıfırlandı'); };
$('npExport').onclick = () => { if (App.curId) openExport(App.curId); else toast('Önce bir şarkı çal'); };

function renderFx() {
  DIALS.forEach(dialUI);
  $('formant').setAttribute('aria-checked', fx.formant);
  FXCARDS.forEach(c => {
    const on = !!fx[c.on], card = $('fx-' + c.id);
    card.classList.toggle('on', on); card.querySelector('[data-fxon]').setAttribute('aria-checked', on);
    c.sl.forEach(([key, , , , , f]) => { const r = card.querySelector(`[data-fxk="${key}"]`); r.value = fx[key]; rangeFill(r); card.querySelector(`[data-fxv="${key}"]`).textContent = f(fx[key]); });
  });
  document.querySelectorAll('[data-rvbt]').forEach(b => b.classList.toggle('on', b.dataset.rvbt === fx.rvbType));
  $('eqOn').setAttribute('aria-checked', fx.eqOn); $('eqpanel').classList.toggle('off', !fx.eqOn);
  document.querySelectorAll('[data-eq]').forEach(b => b.classList.toggle('on', b.dataset.eq === fx.eqPreset));
  fx.eq.forEach((v, i) => bandUI(i, v));
  $('pre').value = Math.round(fx.pre * 10); rangeFill($('pre')); $('preV').textContent = (fx.preOn ? signed(fx.pre, 1) : '0') + ' dB';
  document.querySelectorAll('.mode').forEach(b => b.classList.toggle('on', b.dataset.preset === fx.preset));
}

/* ================= Kontroller ================= */
$('play').onclick = toggle;
$('next').onclick = () => { Engine.unlock(); step(1); };
$('prev').onclick = () => { Engine.unlock(); step(-1); };
$('shuffle').onclick = () => { App.prefs.shuffle = !App.prefs.shuffle; App.savePrefs(); UI.modes(); UI.now(); };
$('repeat').onclick = () => { App.prefs.repeat = { off: 'all', all: 'one', one: 'off' }[App.prefs.repeat]; App.savePrefs(); UI.modes(); UI.now(); };
const seekEl = $('seek');
seekEl.addEventListener('input', () => { dragging = true; rangeFill(seekEl); if (Engine.duration) $('cur').textContent = fmt(seekEl.value / 1000 * Engine.duration / fx.rate); });
seekEl.addEventListener('change', () => { if (Engine.duration && Engine.loadedId === App.curId) Engine.seek(seekEl.value / 1000 * Engine.duration); dragging = false; });

function songMenu(id) {
  const s = App.byId(id); if (!s) return;
  menu([
    { label: 'Etiketi ve kapağı düzenle', icon: ICON.edit, run: () => openEdit(id) },
    { label: 'Dışa aktar', icon: ICON.export, run: () => openExport(id) },
    { label: 'Şarkıyı sil', icon: ICON.trash, cls: 'danger', keep: true, run: b => {
      if (!b.dataset.sure) { b.dataset.sure = 1; b.querySelector('span').textContent = 'Emin misin? Tekrar bas'; return; }
      closeSheet('menuSheet'); deleteSong(id);
    } }
  ]);
}
async function deleteSong(id) {
  const s = App.byId(id); if (!s) return;
  App.songs.splice(App.songs.indexOf(s), 1); Img.drop(s.id);
  await DB.del('songs', s.id); Cloud.remove(s);
  if (App.curId === s.id) { Engine.pause(); App.curId = null; }
  UI.lib(); UI.lists(); UI.now(); toast('Silindi');
}
$('libSort').onclick = () => menu([['added', 'En yeni üstte'], ['title', 'Şarkı adına göre'], ['artist', 'Sanatçıya göre']].map(([k, l]) => ({
  label: l, icon: ICON.sort, cls: App.prefs.sort === k ? 'on' : '', run: () => { App.prefs.sort = k; App.savePrefs(); UI.lib(); }
})));

/* ================= Şarkı ekleme ================= */
async function addFiles(files, preset) {
  const added = [];
  toast(files.length > 1 ? `${files.length} şarkı okunuyor…` : 'Şarkı okunuyor…');
  for (const f of files) {
    const meta = await Tags.read(f);
    const s = Object.assign({ id: newId(), blob: f, added: Date.now() + added.length, updated: Date.now(), cloud: false, album: '', year: '' }, meta);
    if (preset) {
      Object.assign(s, { title: preset.title, artist: preset.artist, album: preset.album || s.album, year: preset.year || s.year, spId: preset.spId });
      if (preset.coverUrl) { s.coverUrl = preset.coverUrl; const b = await Img.fromUrl(preset.coverUrl); if (b) s.cover = b; }
      if (preset.cover) s.cover = preset.cover;
    }
    App.songs.push(s); added.push(s);
    await DB.put('songs', s);
  }
  UI.lib(); UI.lists(); UI.now();
  if (Cloud.user) Cloud.sync();
  return added;
}
document.addEventListener('change', async e => {
  if (e.target.id !== 'file' && !e.target.hasAttribute('data-add')) return;
  const files = Array.from(e.target.files || []); e.target.value = '';
  if (!files.length) return;
  const added = await addFiles(files);
  toast(added.length + ' şarkı arşive eklendi');
});
let attachTrack = null;
$('attachInput').addEventListener('change', async e => {
  const f = e.target.files && e.target.files[0]; e.target.value = '';
  if (!f || !attachTrack) return;
  await addFiles([f], attachTrack); attachTrack = null;
  toast('Şarkı eşleşti, bilgileri ve kapağı işlendi');
});

/* ================= Kapak kırpma ================= */
const Crop = (() => {
  const box = $('cropBox'), img = $('cropImg'), zoom = $('cropZoom');
  let w = 0, h = 0, S = 0, min = 1, sc = 1, tx = 0, ty = 0, url = null, done = null;
  const pts = new Map(); let last = null;
  const clamp = () => { tx = Math.min(0, Math.max(S - w * sc, tx)); ty = Math.min(0, Math.max(S - h * sc, ty)); };
  const apply = () => { clamp(); img.style.transform = `translate(${tx}px,${ty}px) scale(${sc})`; zoom.value = Math.round(sc / min * 100); rangeFill(zoom); };
  const zoomAt = (px, py, ns) => { ns = Math.max(min, Math.min(min * 5, ns)); tx = px - (px - tx) * (ns / sc); ty = py - (py - ty) * (ns / sc); sc = ns; apply(); };
  function open(file, cb) {
    done = cb; if (url) URL.revokeObjectURL(url); url = URL.createObjectURL(file);
    openSheet('cropSheet');
    img.onload = () => { w = img.naturalWidth; h = img.naturalHeight; img.style.width = w + 'px'; img.style.height = h + 'px'; S = box.clientWidth; min = S / Math.min(w, h); sc = min; tx = (S - w * sc) / 2; ty = (S - h * sc) / 2; apply(); };
    img.onerror = () => { closeSheet('cropSheet'); toast('Bu resim açılamadı'); };
    img.src = url;
  }
  const local = e => { const r = box.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  box.addEventListener('pointerdown', e => { box.setPointerCapture(e.pointerId); pts.set(e.pointerId, local(e)); last = null; });
  box.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return;
    const prev = pts.get(e.pointerId), cur = local(e); pts.set(e.pointerId, cur);
    if (pts.size === 1) { tx += cur.x - prev.x; ty += cur.y - prev.y; apply(); }
    else if (pts.size === 2) {
      const [a, b] = [...pts.values()], d = Math.hypot(a.x - b.x, a.y - b.y), m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      if (last) { tx += m.x - last.m.x; ty += m.y - last.m.y; zoomAt(m.x, m.y, sc * d / last.d); }
      last = { d, m };
    }
  });
  const up = e => { pts.delete(e.pointerId); last = null; };
  box.addEventListener('pointerup', up); box.addEventListener('pointercancel', up);
  box.addEventListener('wheel', e => { e.preventDefault(); const p = local(e); zoomAt(p.x, p.y, sc * (e.deltaY < 0 ? 1.08 : 0.93)); }, { passive: false });
  zoom.addEventListener('input', () => zoomAt(S / 2, S / 2, min * zoom.value / 100));
  $('cropCancel').onclick = () => closeSheet('cropSheet');
  $('cropOk').onclick = () => {
    const c = document.createElement('canvas'); c.width = c.height = 800;
    const g = c.getContext('2d'); g.imageSmoothingQuality = 'high';
    g.drawImage(img, -tx / sc, -ty / sc, S / sc, S / sc, 0, 0, 800, 800);
    c.toBlob(b => { closeSheet('cropSheet'); if (b && done) done(b); }, 'image/jpeg', 0.9);
  };
  return { open };
})();

/* ================= Etiket düzenleme ================= */
let edit = null;
function edThumb() {
  const s = App.byId(edit.id);
  let url = null;
  if (edit.cover instanceof Blob) { if (edit.tmpUrl) URL.revokeObjectURL(edit.tmpUrl); edit.tmpUrl = URL.createObjectURL(edit.cover); url = edit.tmpUrl; }
  else if (edit.cover !== null) url = Img.url(s);
  setThumb($('edCover'), url, s.id);
}
function openEdit(id) {
  const s = App.byId(id); if (!s) return;
  edit = { id, cover: undefined, coverUrl: undefined };
  $('edTitle').value = s.title || ''; $('edArtist').value = s.artist || ''; $('edAlbum').value = s.album || ''; $('edYear').value = s.year || '';
  $('edSpSec').hidden = !(Spotify.enabled && Spotify.connected);
  $('edSpRes').innerHTML = ''; $('edSpMsg').hidden = true;
  $('edDel').classList.remove('sure'); $('edDel').textContent = 'Şarkıyı sil';
  edThumb(); openSheet('editSheet');
}
$('edCoverBtn').onclick = () => $('coverInput').click();
$('edCover').onclick = () => $('coverInput').click();
$('coverInput').addEventListener('change', e => {
  const f = e.target.files && e.target.files[0]; e.target.value = '';
  if (!f || !edit) return;
  Crop.open(f, b => { edit.cover = b; edit.coverUrl = null; edThumb(); });
});
$('edCoverDel').onclick = () => { edit.cover = null; edit.coverUrl = null; edThumb(); };
$('edSwap').onclick = () => { const t = $('edTitle').value; $('edTitle').value = $('edArtist').value; $('edArtist').value = t; };
$('edSpBtn').onclick = async () => {
  const q = [$('edTitle').value, $('edArtist').value].filter(Boolean).join(' ');
  const msg = $('edSpMsg'); msg.hidden = false; msg.className = 'msg'; msg.textContent = 'Aranıyor…';
  try {
    const res = await Spotify.search(q);
    edit.results = res;
    msg.textContent = res.length ? 'Doğru olana dokun:' : 'Sonuç bulunamadı. Adı düzeltip tekrar dene.';
    $('edSpRes').innerHTML = res.map((t, i) => `<li class="row" data-res="${i}">${thumb(t.coverUrl, t.title)}<span class="m"><div class="t">${esc(t.title)}</div><div class="a"><span>${esc(t.artist)} · ${esc(t.album)} ${esc(t.year)}</span></div></span><span></span></li>`).join('');
  } catch (e) { msg.className = 'msg err'; msg.textContent = e.message; }
};
$('edSpRes').addEventListener('click', async e => {
  const r = e.target.closest('[data-res]'); if (!r) return;
  const t = edit.results[+r.dataset.res];
  $('edTitle').value = t.title; $('edArtist').value = t.artist; $('edAlbum').value = t.album; $('edYear').value = t.year;
  edit.spId = t.spId;
  $('edSpRes').innerHTML = ''; $('edSpMsg').textContent = 'Kapak indiriliyor…';
  if (t.coverUrl) { const b = await Img.fromUrl(t.coverUrl); edit.cover = b || undefined; edit.coverUrl = t.coverUrl; }
  $('edSpMsg').textContent = 'Bilgiler dolduruldu. Kaydet\'e bas.';
  edThumb();
});
$('edSave').onclick = async () => {
  const s = App.byId(edit.id); if (!s) return closeSheet('editSheet');
  s.title = $('edTitle').value.trim() || s.title; s.artist = $('edArtist').value.trim();
  s.album = $('edAlbum').value.trim(); s.year = $('edYear').value.trim();
  if (edit.spId) s.spId = edit.spId;
  let coverChanged = false;
  if (edit.cover !== undefined) { s.cover = edit.cover; coverChanged = true; Img.drop(s.id); }
  if (edit.coverUrl !== undefined) s.coverUrl = edit.coverUrl;
  if (edit.cover === null) s.coverUrl = null;
  s.updated = Date.now();
  await DB.put('songs', s);
  Cloud.pushMeta(s, coverChanged);
  closeSheet('editSheet'); UI.lib(); UI.lists(); UI.now(); if (s.id === App.curId) Media.meta();
  toast('Etiket kaydedildi');
};
$('edDel').onclick = () => {
  const b = $('edDel');
  if (!b.classList.contains('sure')) { b.classList.add('sure'); b.textContent = 'Emin misin? Tekrar bas'; return; }
  closeSheet('editSheet'); deleteSong(edit.id);
};

/* ================= Dışa aktarma ================= */
const Exp = { id: null, fmt: 'mp3-320', fx: true, lib: false, blob: null, name: '', busy: false };
function fxName() {
  const m = PRESETS.find(p => p.id === fx.preset && p.id !== 'orijinal');
  if (m) return m.n;
  const p = [];
  if (Math.abs(fx.rate - 1) > 0.001) p.push('%' + Math.round(fx.rate * 100));
  if (Math.abs(fx.semi) > 0.004) p.push('ton ' + signed(fx.semi, 1));
  if (fx.rvbOn) p.push(RVB_TYPES[fx.rvbType] + ' yankısı');
  return p.join(', ');
}
function exRender() {
  const s = App.byId(Exp.id), parts = [];
  parts.push('tempo %' + Math.round(fx.rate * 100), 'ton ' + signed(fx.semi, 2));
  if (fx.rvbOn) parts.push(RVB_TYPES[fx.rvbType] + ' yankısı'); if (fx.echoOn) parts.push('eko'); if (fx.tapeOn) parts.push('kaset'); if (fx.vinylOn) parts.push('plak cızırtısı'); if (fx.radioOn) parts.push('dolmuş hoparlörü'); if (fx.d8On) parts.push('8D');
  if (fx.eqOn && fx.eq.some(Boolean)) parts.push('ekolayzır');
  $('exSummary').innerHTML = `<strong>${esc(s ? s.title : '')}</strong><br>${Exp.fx ? esc(parts.join(' · ')) : 'Orijinal ses, sadece format değişir'}`;
  document.querySelectorAll('#exFmt button').forEach(b => b.setAttribute('aria-pressed', b.dataset.f === Exp.fmt));
  $('exFx').setAttribute('aria-checked', Exp.fx); $('exLib').setAttribute('aria-checked', Exp.lib);
}
function openExport(id) {
  if (Exp.busy) { openSheet('exportSheet'); return; }
  Exp.id = id; Exp.blob = null;
  $('exProg').hidden = true; $('exDone').hidden = true; $('exBtns').hidden = false; $('exGo').disabled = false;
  exRender(); openSheet('exportSheet');
}
$('exFmt').addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (b && !Exp.busy) { Exp.fmt = b.dataset.f; exRender(); } });
$('exFx').onclick = () => { if (!Exp.busy) { Exp.fx = !Exp.fx; exRender(); } };
$('exLib').onclick = () => { if (!Exp.busy) { Exp.lib = !Exp.lib; exRender(); } };
$('exClose').onclick = () => closeSheet('exportSheet');
$('exGo').onclick = async () => {
  const s = App.byId(Exp.id); if (!s || Exp.busy) return;
  Exp.busy = true; $('exGo').disabled = true; $('exProg').hidden = false;
  const bar = $('exBar'), msg = $('exMsg'), prog = (t, p) => { msg.textContent = t; bar.style.width = Math.round(p * 100) + '%'; };
  const dsp = DSP();
  try {
    let blob = s.blob;
    if (!blob) { if (!Cloud.user || !s.audioPath) throw new Error('Bu şarkının dosyası bu cihazda yok'); prog('Buluttan indiriliyor', 0.02); blob = await Cloud.download(s.audioPath); s.blob = blob; DB.put('songs', s); }
    prog('Ses çözülüyor', 0.04);
    const src = await decodeAt(await blob.arrayBuffer());
    const L0 = src.getChannelData(0).slice(), R0 = (src.numberOfChannels > 1 ? src.getChannelData(1) : src.getChannelData(0)).slice();
    await dsp.call({ type: 'load', L: L0, R: R0, sr: src.sampleRate }, [L0.buffer, R0.buffer]);
    const use = Exp.fx ? Object.assign({}, fx) : Object.assign({}, FX_DEFAULT, { eq: FREQS.map(() => 0) });
    prog(fxNeedsStretch(use) ? 'Tempo ve ton işleniyor' : 'Efektler uygulanıyor', 0.08);
    const out = await processRange(dsp, src, use, 0, src.duration, { tail: true, prog: p => prog('Tempo ve ton işleniyor', 0.08 + p * 0.55) });
    prog('Efektler uygulanıyor', 0.66);
    const suffix = Exp.fx ? fxName() : '';
    const title = s.title + (suffix ? ` (${suffix})` : '');
    const mp3 = Exp.fmt !== 'wav';
    let file;
    if (mp3) {
      const L = out.getChannelData(0).slice(), R = out.getChannelData(1).slice();
      let cover = null; if (s.cover instanceof Blob) cover = await (await Img.square(s.cover, 800)).arrayBuffer();
      const r = await dsp.call({ type: 'mp3', L, R, sr: out.sampleRate, kbps: Exp.fmt === 'mp3-192' ? 192 : 320, tags: { title, artist: s.artist || '', album: s.album || '', year: s.year || '', cover } },
        [L.buffer, R.buffer].concat(cover ? [cover] : []), p => prog('MP3 kodlanıyor', 0.7 + p * 0.29));
      file = r.blob;
    } else { prog('WAV oluşturuluyor', 0.9); file = wavBlob(out); }
    const safe = t => t.replace(/[\\/:*?"<>|]+/g, ' ').trim();
    Exp.blob = file; Exp.name = safe(`${s.artist ? s.artist + ' - ' : ''}${title}`) + (mp3 ? '.mp3' : '.wav');
    prog(`Hazır · ${(file.size / 1048576).toFixed(1)} MB · ${fmt(out.duration)}`, 1);
    if (Exp.lib) {
      const f = new File([file], Exp.name, { type: file.type });
      await addFiles([f], { title, artist: s.artist, album: s.album, year: s.year, cover: s.cover instanceof Blob ? s.cover : null, coverUrl: s.cover ? null : s.coverUrl });
    }
    $('exBtns').hidden = true; $('exDone').hidden = false;
  } catch (e) { prog('Olmadı: ' + e.message, 0); $('exGo').disabled = false; }
  dsp.end(); Exp.busy = false;
};
$('exSave').onclick = async () => {
  if (!Exp.blob) return;
  const file = new File([Exp.blob], Exp.name, { type: Exp.blob.type });
  try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: Exp.name }); return; } }
  catch (e) { if (e.name === 'AbortError') return; }
  const a = document.createElement('a'); a.href = URL.createObjectURL(file); a.download = Exp.name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
};

/* ================= Hesap ================= */
$('vAcct').addEventListener('click', async e => {
  const id = e.target.id;
  const seg = e.target.closest('[data-m]'); if (seg) { Engine.setMode(seg.dataset.m); setTimeout(() => UI.account(), 50); return; }
  const msg = t => { const m = $('acMsg'); if (m) { m.hidden = false; m.className = 'msg err'; m.textContent = t; } };
  const tr = er => {
    const m = (er && er.message || '').toLowerCase();
    if (m.includes('invalid login')) return 'E-posta veya şifre yanlış.';
    if (m.includes('already registered')) return 'Bu e-postayla zaten hesap var. Giriş yap.';
    if (m.includes('password')) return 'Şifre en az 6 karakter olmalı.';
    if (m.includes('email not confirmed')) return 'E-postana gelen onay linkine bas, sonra giriş yap.';
    return 'Olmadı: ' + (er && er.message || 'bilinmeyen hata');
  };
  if (id === 'acIn' || id === 'acUp') {
    const mail = $('acMail').value.trim(), pw = $('acPw').value;
    if (!mail || !pw) return msg('E-posta ve şifreyi yaz.');
    e.target.disabled = true;
    try {
      if (id === 'acIn') await Cloud.signIn(mail, pw);
      else { const need = await Cloud.signUp(mail, pw); if (need) { const m = $('acMsg'); m.hidden = false; m.className = 'msg'; m.textContent = 'Hesap açıldı. E-postana gelen onay linkine bas, sonra giriş yap.'; e.target.disabled = false; return; } }
      UI.account(); toast('Giriş yapıldı');
    } catch (er) { msg(tr(er)); }
    if ($(id)) $(id).disabled = false;
  }
  else if (id === 'acOut') { await Cloud.signOut(); UI.account(); UI.lib(); }
  else if (id === 'acSyncBtn') { Cloud.sync(); toast('Eşitleniyor'); }
  else if (id === 'acSpIn') Spotify.login();
  else if (id === 'acSpOut') { Spotify.logout(); UI.account(); UI.lists(); }
  else if (id === 'acSpImport') openSpImport();
  else if (id === 'aiSave') {
    const k = $('aiKey').value.trim(), m = $('aiMsg'); m.hidden = false; m.className = 'msg';
    if (!k) { m.className = 'msg err'; m.textContent = 'Önce anahtarı yapıştır.'; return; }
    AI.setKey(k); m.textContent = 'Deneniyor…'; e.target.disabled = true;
    try { const t = await AI.test(); m.textContent = 'Çalışıyor: ' + t; } catch (er) { m.className = 'msg err'; m.textContent = er.message; }
    e.target.disabled = false;
  }
  else if (e.target.closest('[data-scene]')) { Scene.setMode(e.target.closest('[data-scene]').dataset.scene); UI.account(); }
  else if (id === 'wxOn') { Scene.setWx(!Scene.wxOn); e.target.setAttribute('aria-checked', Scene.wxOn); }
  else if (e.target.closest('[data-aim]')) { AI.setModel(e.target.closest('[data-aim]').dataset.aim); UI.account(); }
  else if (id === 'aiWeb') { AI.setWeb(!AI.web); e.target.setAttribute('aria-checked', AI.web); }
  else if (e.target.closest('[data-forget]')) { AI.forget(+e.target.closest('[data-forget]').dataset.forget); UI.account(); }
  else if (id === 'aiDel') { AI.setKey(''); UI.account(); }
  else if (id === 'aiAuto') { AI.setAuto(!AI.auto); e.target.setAttribute('aria-checked', AI.auto); }
  else if (id === 'aiClear') { AI.clear(); toast('Sohbet temizlendi'); }
  else if (id === 'upd') {
    e.target.disabled = true; e.target.textContent = 'Kontrol ediliyor…';
    try {
      const r = await fetch('version.json?' + Date.now(), { cache: 'no-store' }); const v = (await r.json()).v;
      if (v > VERSION) { toast('Sürüm ' + v + ' bulundu, yükleniyor'); const reg = await navigator.serviceWorker.getRegistration(); if (reg) await reg.update(); const ks = await caches.keys(); await Promise.all(ks.map(k => caches.delete(k))); location.reload(); return; }
      toast('En güncel sürümdesin (' + VERSION + ')');
    } catch (er) { toast('Kontrol edilemedi, internet bağlantını kontrol et'); }
    e.target.disabled = false; e.target.textContent = 'Güncellemeyi kontrol et';
  }
  else if (id === 'diagCopy') {
    const txt = $('diagText').textContent;
    try { await navigator.clipboard.writeText(txt); toast('Kopyalandı'); }
    catch (er) { const r = document.createRange(); r.selectNodeContents($('diagText')); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); toast('Metni seçtim, Kopyala de'); }
  }
});

/* ================= Spotify aktarma ================= */
async function openSpImport() {
  openSheet('spSheet');
  const ul = $('spLists'), msg = $('spMsg'); ul.innerHTML = ''; msg.hidden = false; msg.className = 'msg'; msg.textContent = 'Listelerin yükleniyor…';
  try {
    const pls = await Spotify.playlists();
    msg.hidden = true;
    const items = [{ id: 'liked', name: 'Beğenilen Şarkılar', sub: 'Kalpli şarkıların', image: null }]
      .concat(pls.map(p => ({ id: p.id, name: p.name, sub: (p.items || p.tracks || {}).total != null ? ((p.items || p.tracks).total + ' şarkı') : '', image: p.images && p.images[0] ? p.images[0].url : null })));
    ul.innerHTML = items.map(p => `<li class="row" data-pl="${esc(p.id)}" data-name="${esc(p.name)}" data-img="${esc(p.image || '')}">${thumb(p.image, p.name)}
      <span class="m"><div class="t">${esc(p.name)}</div><div class="a"><span>${esc(p.sub)}</span></div></span><span class="chipbtn">Aktar</span></li>`).join('');
  } catch (e) { msg.className = 'msg err'; msg.textContent = e.message; }
}
$('spLists').addEventListener('click', async e => {
  const r = e.target.closest('[data-pl]'); if (!r || $('spSheet').dataset.busy) return;
  $('spSheet').dataset.busy = '1';
  const prog = $('spProg'), msg = $('spMsg'); prog.hidden = false; msg.hidden = false; msg.className = 'msg'; msg.textContent = 'Aktarılıyor…';
  try {
    const tracks = await Spotify.items(r.dataset.pl, (n, t) => { prog.firstElementChild.style.width = (t ? n / t * 100 : 50) + '%'; msg.textContent = `${n}${t ? '/' + t : ''} şarkı alındı`; });
    if (!tracks.length) throw new Error('Bu listeden şarkı alınamadı. Spotify sadece senin oluşturduğun listelerin içeriğini veriyor.');
    const L = { id: 'sp-' + r.dataset.pl, name: r.dataset.name, image: r.dataset.img || (tracks[0] && tracks[0].coverUrl) || null, tracks, source: 'spotify', imported: Date.now() };
    const i = App.lists.findIndex(x => x.id === L.id); if (i >= 0) App.lists[i] = L; else App.lists.push(L);
    await DB.put('lists', L);
    closeSheet('spSheet'); App.openList = L.id; setView('lists');
    toast(`${tracks.length} şarkı aktarıldı`);
  } catch (er) { msg.className = 'msg err'; msg.textContent = er.message; }
  prog.hidden = true; delete $('spSheet').dataset.busy;
});

/* ================= Liste ve arşiv olayları ================= */
$('vLists').addEventListener('click', async e => {
  const t = e.target;
  if (t.closest('#listBack')) { App.openList = null; return UI.lists(); }
  if (t.closest('#spConnect')) return Spotify.login();
  if (t.closest('#spImport')) return openSpImport();
  const L = App.lists.find(l => l.id === App.openList);
  if (t.closest('#listPlay') && L) { const q = L.tracks.map(x => App.match(x)).filter(Boolean).map(s => s.id); if (q.length) playSong(App.prefs.shuffle ? q[Math.floor(Math.random() * q.length)] : q[0], q); return; }
  if (t.closest('#listDel') && L) {
    const b = t.closest('#listDel');
    if (!b.classList.contains('sure')) { b.classList.add('sure'); b.textContent = 'Emin misin? Tekrar bas'; return; }
    App.lists.splice(App.lists.indexOf(L), 1); await DB.del('lists', L.id); App.openList = null; return UI.lists();
  }
  const open = t.closest('[data-list-open]'); if (open) { App.openList = open.dataset.listOpen; window.scrollTo(0, 0); return UI.lists(); }
  const at = t.closest('[data-attach]'); if (at && L) { attachTrack = L.tracks[+at.dataset.attach]; $('attachInput').click(); return; }
  const ed = t.closest('[data-edit]'); if (ed) return songMenu(ed.dataset.edit);
  const row = t.closest('[data-id]');
  if (row && L) { const q = L.tracks.map(x => App.match(x)).filter(Boolean).map(s => s.id); row.dataset.id === App.curId && Engine.loadedId === row.dataset.id ? toggle() : playSong(row.dataset.id, q); }
});
$('list').addEventListener('click', e => {
  const ed = e.target.closest('[data-edit]'); if (ed) return songMenu(ed.dataset.edit);
  const row = e.target.closest('[data-id]'); if (!row) return;
  const id = row.dataset.id;
  id === App.curId && Engine.loadedId === id ? toggle() : playSong(id, App.filtered().map(s => s.id));
});
$('search').addEventListener('input', raf(() => { App.query = $('search').value; UI.lib(); }));

/* ================= Başlat ================= */
(async () => {
  buildKnobs(); buildFx(); buildEq(); renderModes(); UI.modes();
  await DB.open();
  const [songs, lists] = await Promise.all([DB.all('songs'), DB.all('lists')]);
  App.songs = songs; App.lists = lists; App.sortSongs();
  App.queue = App.filtered().map(s => s.id);
  renderFx(); UI.lib(); AI.render(); $('chatAv').innerHTML = TEA; Scene.start();
  setView(App.songs.length ? 'now' : 'lib');
  document.documentElement.classList.remove('booting');
  const back = await Spotify.handleRedirect();
  if (back) { setView('lists'); openSpImport(); }
  Cloud.init();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).catch(() => {});
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (reloaded || Engine.playing) return; reloaded = true; location.reload(); });
  }
  fetch('version.json?' + Date.now(), { cache: 'no-store' }).then(r => r.json()).then(async j => {
    if (j.v > VERSION && !Engine.playing && !sessionStorage.getItem('gp-upd-' + j.v)) {
      sessionStorage.setItem('gp-upd-' + j.v, 1);
      const ks = await caches.keys(); await Promise.all(ks.map(k => caches.delete(k)));
      const reg = await navigator.serviceWorker.getRegistration(); if (reg) await reg.update();
      location.reload();
    }
  }).catch(() => {});
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
  if (Engine.mode === 'live') { if ('requestIdleCallback' in window) requestIdleCallback(() => stretchLib().catch(() => {})); else setTimeout(() => stretchLib().catch(() => {}), 1500); }
})();

})();
