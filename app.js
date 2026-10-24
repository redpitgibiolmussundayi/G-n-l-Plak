/* Gönül Plak — uygulama */
(() => {
'use strict';

/* ================= Yardımcılar ================= */
const C = window.GP_CONFIG || {};
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

/* ================= Ses motoru ================= */
const Engine = (() => {
  const FREQS = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
  const fx = Object.assign({ rate: 1, semi: 0, formant: true, eqOn: true, eq: FREQS.map(() => 0), eqPreset: 'flat', preOn: false, pre: 0 }, LS.get('gp-fx', {}));
  let ctx = null, stretch = null, pre = null, bands = [], initP = null;
  let duration = 0, pos = 0, playing = false, loadedId = null;
  const listeners = { time: () => {}, end: () => {}, mode: () => {}, state: () => {}, peaks: () => {} };
  let peaks = null;
  function computePeaks(L, R, n = 700) {
    const out = new Uint8Array(n), step = L.length / n;
    for (let i = 0; i < n; i++) {
      let m = 0; const a = Math.floor(i * step), b = Math.min(L.length, Math.floor((i + 1) * step));
      for (let j = a; j < b; j += 4) { const v = Math.abs(L[j]) + (R ? Math.abs(R[j]) : Math.abs(L[j])); if (v > m) m = v; }
      out[i] = Math.min(255, Math.round(m * 0.5 * 255));
    }
    return out;
  }

  function silentUrl() {
    const sr = 8000, n = sr, b = new ArrayBuffer(44 + n * 2), v = new DataView(b);
    const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true);
    v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true);
    v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, n * 2, true);
    return URL.createObjectURL(new Blob([b], { type: 'audio/wav' }));
  }

  /* --- Teşhis kaydı --- */
  const diag = { events: [], mode: 'fx' };
  function log(m) { const d = new Date(); diag.events.push(d.toTimeString().slice(0, 8) + ' ' + m); if (diag.events.length > 40) diag.events.shift(); }
  window.addEventListener('error', e => log('JS hata: ' + (e.message || '')));
  window.addEventListener('unhandledrejection', e => log('Hata: ' + ((e.reason && e.reason.message) || e.reason)));

  /* --- İki motor: 'fx' (tempo+ton+EQ) ve 'simple' (yedek, sadece tempo) --- */
  let mode = LS.get('gp-engine', 'fx') === 'simple' ? 'simple' : 'fx';
  let el = null, elUrl = null, silent = null, curBlob = null, watchdog = 0;

  function makeEl() {
    if (el) return;
    el = new Audio(); el.setAttribute('playsinline', ''); el.preload = 'auto';
    el.addEventListener('timeupdate', () => { if (mode !== 'simple' || el.loop) return; pos = el.currentTime; listeners.time(pos); });
    el.addEventListener('ended', () => { if (mode !== 'simple' || el.loop) return; playing = false; listeners.end(); });
    el.addEventListener('error', () => { if (mode === 'simple' && !el.loop) log('Yedek oynatıcı dosyayı açamadı'); });
  }

  // Kullanıcı dokunuşu içinde senkron çağrılmalı (iOS kuralı)
  const needKeep = !navigator.audioSession;
  try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {} // sessiz modda da çalsın
  function unlock() {
    try { if (navigator.audioSession && navigator.audioSession.type !== 'playback') navigator.audioSession.type = 'playback'; } catch (e) {}
    makeEl();
    if (!el.src && (mode === 'simple' || needKeep)) { silent = silent || silentUrl(); el.src = silent; el.loop = true; el.play().then(() => { if (el.loop && mode === 'fx' && !playing) el.pause(); }).catch(() => {}); }
    if (mode === 'simple') return;
    if (!ctx) {
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        ctx = new AC({ latencyHint: 'playback' });
        log('AudioContext oluşturuldu, ' + ctx.sampleRate + ' Hz, durum ' + ctx.state);
        ctx.onstatechange = () => { log('AudioContext durumu: ' + ctx.state); if (playing && ctx.state !== 'running' && ctx.state !== 'closed') ctx.resume().catch(() => {}); };
      } catch (e) { log('AudioContext açılamadı'); toSimple(); return; }
    }
    if (ctx.state !== 'running') ctx.resume().catch(e => log('resume hatası: ' + e.message));
  }

  function init() {
    if (initP) return initP;
    initP = (async () => {
      if (!ctx) unlock();
      if (!ctx) throw new Error('ctx yok');
      await stretchLib();
      if (!ctx.audioWorklet) throw new Error('AudioWorklet desteklenmiyor');
      stretch = await Promise.race([
        window.SignalsmithStretch(ctx),
        new Promise((_, rej) => setTimeout(() => rej(new Error('ses motoru 6 sn içinde açılmadı')), 6000))
      ]);
      log('Ses motoru hazır');
      stretch.onprocessorerror = () => { log('Ses motoru çöktü (processorerror)'); if (playing) failFx(); };
      pre = ctx.createGain();
      bands = FREQS.map((f, i) => {
        const b = ctx.createBiquadFilter();
        b.type = i === 0 ? 'lowshelf' : i === FREQS.length - 1 ? 'highshelf' : 'peaking';
        b.frequency.value = f; b.Q.value = 1.1; return b;
      });
      const limiter = ctx.createDynamicsCompressor();
      limiter.threshold.value = -0.8; limiter.knee.value = 0; limiter.ratio.value = 20; limiter.attack.value = 0.002; limiter.release.value = 0.12;
      stretch.connect(pre); let n = pre; bands.forEach(b => { n.connect(b); n = b; }); n.connect(limiter); limiter.connect(ctx.destination);
      applyEq(true);
      stretch.setUpdateInterval(0.08, t => {
        if (mode !== 'fx') return;
        pos = t; listeners.time(t);
        if (playing && duration && t >= duration - 0.04) { playing = false; stretch.schedule({ active: false }); listeners.end(); }
      });
    })();
    initP.catch(e => { log('Motor hatası: ' + e.message); initP = null; });
    return initP;
  }

  function loadSimple(blob) {
    makeEl();
    return new Promise((res, rej) => {
      if (elUrl) URL.revokeObjectURL(elUrl);
      elUrl = URL.createObjectURL(blob);
      el.pause(); el.loop = false;
      const ok = () => { cleanup(); duration = el.duration || 0; res(); };
      const bad = () => { cleanup(); rej(new Error('decode')); };
      const cleanup = () => { el.removeEventListener('loadedmetadata', ok); el.removeEventListener('error', bad); };
      el.addEventListener('loadedmetadata', ok); el.addEventListener('error', bad);
      el.src = elUrl; el.load();
    });
  }
  function rateSimple() { if (!el) return; el.preservesPitch = true; el.webkitPreservesPitch = true; el.defaultPlaybackRate = fx.rate; el.playbackRate = fx.rate; }

  function toSimple() {
    if (mode === 'simple') return;
    mode = 'simple'; diag.mode = 'simple'; LS.set('gp-engine', 'simple');
    log('Yedek moda geçildi');
    if (stretch) try { stretch.schedule({ active: false }); } catch (e) {}
    listeners.mode();
  }
  async function failFx() {
    const at = pos, wasId = loadedId;
    toSimple();
    if (!curBlob) return;
    try {
      await loadSimple(curBlob); loadedId = wasId;
      el.currentTime = at; rateSimple();
      await el.play(); playing = true; listeners.time(at);
    } catch (e) { playing = false; log('Yedek oynatma başlatılamadı: ' + e.message); }
    listeners.state();
  }

  async function load(id, blob, cancelled) {
    curBlob = blob; playing = false; loadedId = null; duration = 0; pos = 0;
    clearTimeout(watchdog);
    if (mode === 'simple') {
      peaks = null;
      blob.arrayBuffer().then(ab => new Promise((res, rej) => { const oc = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 1, 22050); oc.decodeAudioData(ab, res, rej); }))
        .then(b => { if (curBlob !== blob) return; peaks = computePeaks(b.getChannelData(0), null); listeners.peaks(peaks, id); }).catch(() => {});
      await loadSimple(blob);
      if (cancelled()) return false;
      loadedId = id; return true;
    }
    try { await init(); }
    catch (e) { toSimple(); return load(id, blob, cancelled); }
    stretch.schedule({ active: false });
    await stretch.dropBuffers();
    const ab = await blob.arrayBuffer();
    if (cancelled()) return false;
    let buf;
    try { buf = await new Promise((res, rej) => ctx.decodeAudioData(ab, res, rej)); }
    catch (e) { log('Çözümleme hatası, yedek mod deneniyor'); toSimple(); return load(id, blob, cancelled); }
    if (cancelled()) return false;
    const L = buf.getChannelData(0), R = buf.numberOfChannels > 1 ? buf.getChannelData(1) : null;
    peaks = computePeaks(L, R); listeners.peaks(peaks, id);
    const CH = Math.round(ctx.sampleRate * 8);
    duration = buf.duration;
    for (let i = 0; i < buf.length; i += CH) {
      const a = L.slice(i, i + CH), b = R ? R.slice(i, i + CH) : a.slice();
      await stretch.addBuffers([a, b], [a.buffer, b.buffer]);
      if (cancelled()) return false;
    }
    stretch.schedule({ input: 0, output: ctx.currentTime, active: false });
    log('Şarkı yüklendi (' + Math.round(duration) + ' sn)');
    loadedId = id;
    return true;
  }

  function params() { return { rate: fx.rate, semitones: fx.semi, formantCompensation: fx.formant, formantBaseHz: 0 }; }

  function play() {
    if (!loadedId) return;
    if (mode === 'simple') {
      if (pos >= duration - 0.1) el.currentTime = 0;
      rateSimple(); playing = true;
      el.play().catch(e => { playing = false; log('Oynatma reddedildi: ' + e.message); listeners.state(); });
      return;
    }
    if (!stretch) return;
    if (pos >= duration - 0.1) seek(0);
    if (ctx.state !== 'running') ctx.resume().catch(() => {});
    stretch.schedule(Object.assign({ active: true, output: ctx.currentTime + 0.03 }, params()));
    playing = true;
    if (needKeep && el && el.loop) el.play().catch(() => {});
    // Bekçi: 2 saniyede zaman ilerlemezse motor çalışmıyordur, yedeğe geç
    const p0 = pos;
    clearTimeout(watchdog);
    watchdog = setTimeout(() => {
      if (mode === 'fx' && playing && Math.abs(pos - p0) < 0.3) { log('Motor ilerlemiyor (ctx ' + ctx.state + '), yedeğe geçiliyor'); failFx(); }
    }, 2200);
  }
  function pause() {
    clearTimeout(watchdog);
    playing = false;
    if (mode === 'simple') { if (el) el.pause(); return; }
    if (stretch) stretch.schedule({ active: false, output: ctx.currentTime });
    if (el && el.loop) el.pause();
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden && ctx && playing && mode === 'fx' && ctx.state !== 'running') ctx.resume().catch(() => {}); });
  function seek(t) {
    t = Math.max(0, Math.min(duration, t)); pos = t;
    if (mode === 'simple') { if (el) el.currentTime = t; return; }
    if (!stretch) return;
    stretch.schedule(Object.assign({ input: t, output: ctx.currentTime, active: playing }, params()));
  }
  const pushParams = raf(() => {
    if (mode === 'simple') return rateSimple();
    if (stretch && playing) stretch.schedule(Object.assign({ output: ctx.currentTime + 0.02 }, params()));
  });

  function setFx(patch) { Object.assign(fx, patch); LS.set('gp-fx', fx); pushParams(); }

  function applyEq(instant) {
    if (!bands.length) return;
    const g = fx.eqOn ? fx.eq : FREQS.map(() => 0);
    const t = ctx.currentTime;
    g.forEach((v, i) => instant ? bands[i].gain.value = v : bands[i].gain.setTargetAtTime(v, t, 0.03));
    const boost = Math.max(0, ...g);
    const pg = fx.preOn ? Math.pow(10, fx.pre / 20) : Math.pow(10, (-boost * 0.6) / 20); // ön kazanç (kapalıysa kırpmaya karşı otomatik pay)
    instant ? pre.gain.value = pg : pre.gain.setTargetAtTime(pg, t, 0.03);
  }
  function setEq(patch) { Object.assign(fx, patch); LS.set('gp-fx', fx); applyEq(false); }

  function response(freqs) { // çizim için toplam EQ eğrisi (dB)
    const out = new Float32Array(freqs.length);
    if (!bands.length) {
      freqs.forEach((f, k) => { let s = 0; FREQS.forEach((c, i) => { const g = fx.eqOn ? fx.eq[i] : 0; const d = Math.log2(f / c); s += g * Math.exp(-d * d * 1.6); }); out[k] = s; });
      return out;
    }
    const fr = Float32Array.from(freqs), mag = new Float32Array(freqs.length), ph = new Float32Array(freqs.length);
    bands.forEach((b, i) => {
      const save = b.gain.value; b.gain.value = fx.eqOn ? fx.eq[i] : 0;
      b.getFrequencyResponse(fr, mag, ph);
      for (let k = 0; k < mag.length; k++) out[k] += 20 * Math.log10(mag[k] || 1e-6);
      b.gain.value = save;
    });
    return out;
  }

  function info() {
    return {
      mode, ctx: ctx ? ctx.state + ' · ' + ctx.sampleRate + ' Hz' : 'yok', worklet: !!(window.AudioWorkletNode), motor: !!stretch,
      session: navigator.audioSession ? navigator.audioSession.type : 'yok', ua: navigator.userAgent.replace(/^Mozilla\/5\.0 /, ''), events: diag.events.slice()
    };
  }
  function retryFx() { LS.set('gp-engine', 'fx'); location.reload(); }

  return {
    FREQS, fx, unlock, init, load, play, pause, seek, setFx, setEq, response, info, retryFx, log,
    on(ev, fn) { listeners[ev] = fn; },
    get mode() { return mode; }, get peaks() { return peaks; },
    get duration() { return duration; }, get pos() { return pos; }, get playing() { return playing; }, get loadedId() { return loadedId; }
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
    else list.reverse(); // en yeni üstte
    return list;
  }
};

/* ================= Çalma kontrolü ================= */
let loadToken = 0;
async function playSong(id, queue) {
  const s = App.byId(id); if (!s) return;
  Engine.unlock();
  if (queue) App.queue = queue;
  if (!App.queue.includes(id)) App.queue = App.filtered().map(x => x.id);
  const tok = ++loadToken;
  App.curId = id; App.loadingId = id;
  Wave.set(s.peaks ? Uint8Array.from(s.peaks) : null);
  UI.now(); UI.lib(); UI.lists(); UI.busy('Hazırlanıyor…');
  try {
    let blob = s.blob;
    if (!blob) {
      if (!Cloud.user || !s.audioPath) throw new Error('nofile');
      UI.busy('Buluttan indiriliyor…');
      blob = await Cloud.download(s.audioPath);
      if (tok !== loadToken) return;
      s.blob = blob; DB.put('songs', s);
      UI.busy('Hazırlanıyor…');
    }
    const ok = await Engine.load(id, blob, () => tok !== loadToken);
    if (!ok || tok !== loadToken) return;
    if (!s.duration) { s.duration = Engine.duration; DB.put('songs', s); }
    Engine.play();
  } catch (e) {
    if (tok !== loadToken) return;
    toast(e.message === 'nofile' ? 'Bu şarkının dosyası bu cihazda yok' : 'Şarkı açılamadı. Dosya bozuk ya da desteklenmiyor.');
  }
  if (tok !== loadToken) return;
  App.loadingId = null; UI.busy(null); UI.now(); UI.lib(); UI.lists(); Media.meta();
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
  let n = i + dir;
  if (n >= q.length) n = 0; if (n < 0) n = q.length - 1;
  return q[n];
}
function step(dir, auto) {
  if (auto && App.prefs.repeat === 'one') { Engine.seek(0); Engine.play(); UI.now(); return; }
  if (dir < 0 && Engine.pos > 3) { Engine.seek(0); return; }
  const q = App.queue.filter(id => App.byId(id));
  if (auto && App.prefs.repeat === 'off' && !App.prefs.shuffle && q.indexOf(App.curId) === q.length - 1) { UI.now(); return; }
  const id = nextId(dir); if (id) playSong(id);
}
function skip(sec) { if (Engine.loadedId !== App.curId) return; Engine.seek(Engine.pos + sec * Engine.fx.rate); setSeek(Engine.pos, Engine.duration); }
Engine.on('end', () => step(1, true));
Engine.on('state', () => UI.now());
Engine.on('mode', () => { toast('Gelişmiş ses motoru başlamadı, yedek moda geçildi. Ses gelmezse çal tuşuna bir kez daha bas.'); UI.now(); renderFx(); });
Engine.on('peaks', (pk, id) => {
  const s = App.byId(id); if (!s) return;
  if (!s.peaks) { s.peaks = Array.from(pk); DB.put('songs', s); }
  if (id === App.curId) Wave.set(pk);
});

/* Kilit ekranı / kulaklık */
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
    try { navigator.mediaSession.setPositionState({ duration: Engine.duration, playbackRate: Engine.fx.rate, position: Math.min(Engine.pos, Engine.duration) }); } catch (e) {}
    try { navigator.mediaSession.playbackState = Engine.playing ? 'playing' : 'paused'; } catch (e) {}
  })
};
if ('mediaSession' in navigator) {
  const h = (a, f) => { try { navigator.mediaSession.setActionHandler(a, f); } catch (e) {} };
  h('play', () => { Engine.play(); UI.now(); });
  h('pause', () => { Engine.pause(); UI.now(); });
  h('previoustrack', () => step(-1));
  h('nexttrack', () => step(1));
  h('seekbackward', () => skip(-10));
  h('seekforward', () => skip(10));
  h('seekto', d => { if (d && isFinite(d.seekTime)) Engine.seek(d.seekTime); });
}

/* ================= Simgeler ================= */
const ICON = {
  note: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 3.5 20 1.5v13.2a3.3 3.3 0 1 1-2-3V5.4l-6 1.2v10.1a3.3 3.3 0 1 1-2-3z"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l12.5-7.5z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4.2v16H6zM13.8 4H18v16h-4.2z"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18z"/></svg>',
  cloudDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18"/><path d="M12 11v7m-3-3 3 3 3-3"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  export: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m-4-4 4 4 4-4"/><path d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>',
  sort: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M6 12h12M10 18h4"/></svg>',
  wave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10M21 12h0"/></svg>'
};
const thumb = url => `<span class="thumb">${url ? `<img src="${esc(url)}" alt="" loading="lazy" decoding="async">` : ICON.note}</span>`;
function setThumb(el, url) {
  const img = el.querySelector('img');
  if (url) { if (!img || img.getAttribute('src') !== url) el.innerHTML = `<img src="${esc(url)}" alt="">`; }
  else if (img || !el.firstChild) el.innerHTML = ICON.note;
}
const rangeFill = el => el.style.setProperty('--p', ((el.value - el.min) / (el.max - el.min) * 100) + '%');

/* ================= Dalga formu ================= */
const Wave = (() => {
  const cv = $('wave'), g = cv.getContext('2d');
  let pk = null, drag = false;
  function size() { const w = Math.round(cv.clientWidth * (window.devicePixelRatio || 2)); if (w && cv.width !== w) { cv.width = w; cv.height = Math.round(96 * (window.devicePixelRatio || 2)); } }
  const draw = raf(() => {
    if ($('player').classList.contains('closed')) return;
    size();
    const W = cv.width, H = cv.height;
    g.clearRect(0, 0, W, H);
    $('waveHint').hidden = !!pk;
    if (!pk) return;
    const n = pk.length, bw = W / n, prog = Engine.duration && Engine.loadedId === App.curId ? Engine.pos / Engine.duration : 0;
    const cut = prog * W;
    for (let i = 0; i < n; i++) {
      const x = i * bw, h = Math.max(2, (pk[i] / 255) * H * 0.92);
      g.fillStyle = x < cut ? '#5d1f8c' : '#2c1340';
      g.fillRect(x, (H - h) / 2, Math.max(1, bw * 0.9), h);
    }
  });
  function seekFrom(e) {
    if (!Engine.duration || Engine.loadedId !== App.curId) return;
    const r = cv.getBoundingClientRect();
    const f = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    Engine.seek(f * Engine.duration); setSeek(Engine.pos, Engine.duration); draw();
  }
  cv.addEventListener('pointerdown', e => { drag = true; cv.setPointerCapture(e.pointerId); seekFrom(e); });
  cv.addEventListener('pointermove', e => { if (drag) seekFrom(e); });
  cv.addEventListener('pointerup', () => drag = false);
  cv.addEventListener('pointercancel', () => drag = false);
  window.addEventListener('resize', draw);
  return { set(p) { pk = p; draw(); }, draw };
})();

/* ================= Arayüz ================= */
function setSeek(t, d) {
  const v = d ? t / d * 1000 : 0;
  const s = $('seek'); s.value = v; rangeFill(s);
  $('cur').textContent = fmt(t / (Engine.fx.rate || 1)); $('dur').textContent = fmt(d / (Engine.fx.rate || 1));
}
let dragging = false;
Engine.on('time', t => { if (!dragging && Engine.loadedId === App.curId) { setSeek(t, Engine.duration); Wave.draw(); } Media.pos(); });

const UI = {
  now() {
    const s = App.byId(App.curId);
    const url = Img.url(s);
    $('mini').hidden = !s;
    if (s) {
      $('miniT').textContent = s.title; $('miniA').textContent = s.artist || 'Bilinmeyen sanatçı';
      $('pT').textContent = s.title; $('pA').textContent = [s.artist || 'Bilinmeyen sanatçı', s.album].filter(Boolean).join(' · ');
      setThumb($('miniThumb'), url); setThumb($('pThumb'), url);
    } else { $('pT').textContent = 'Henüz şarkı seçilmedi'; $('pA').textContent = 'Kütüphaneden bir şarkıya dokun'; setThumb($('pThumb'), null); }
    const on = Engine.playing && Engine.loadedId === App.curId;
    $('miniPlay').innerHTML = on ? ICON.pause : ICON.play; $('play').innerHTML = on ? ICON.pause : ICON.play;
    $('play').setAttribute('aria-label', on ? 'Duraklat' : 'Çal');
    ['prev', 'next', 'play', 'back10', 'fwd10'].forEach(id => $(id).disabled = !App.songs.length);
    if (Engine.loadedId !== App.curId) setSeek(0, s && s.duration || 0); else setSeek(Engine.pos, Engine.duration);
    const nid = s ? (App.prefs.repeat === 'one' ? s.id : (App.prefs.shuffle ? null : nextId(1))) : null;
    const ns = nid && (nid !== App.curId || App.prefs.repeat === 'one') ? App.byId(nid) : null;
    $('upnextT').textContent = App.prefs.shuffle ? 'Sıradaki: karışık' : ns ? 'Sıradaki: ' + ns.title : '';
    $('fxNote').hidden = Engine.mode !== 'simple';
    Wave.draw(); Media.pos();
  },
  busy(t) { $('busy').hidden = !t; if (t) $('busy').textContent = t; },
  modes() {
    $('shuffle').setAttribute('aria-pressed', App.prefs.shuffle);
    $('repeat').setAttribute('aria-pressed', App.prefs.repeat !== 'off');
    $('repeatOne').hidden = App.prefs.repeat !== 'one';
    $('repeat').setAttribute('aria-label', 'Tekrarla: ' + ({ off: 'kapalı', all: 'tüm liste', one: 'tek şarkı' })[App.prefs.repeat]);
  },
  lib() {
    if (App.view !== 'lib') return;
    const list = App.filtered();
    $('count').textContent = App.songs.length ? App.songs.length + ' şarkı' + (App.query ? ` · ${list.length} sonuç` : '') : '';
    $('empty').hidden = App.songs.length > 0;
    $('syncState').textContent = Cloud.state;
    $('list').innerHTML = list.map(s => {
      const st = s.cloud ? (s.blob ? ICON.cloud : ICON.cloudDown) : '';
      return `<li class="row${s.id === App.curId ? ' on' : ''}" data-id="${esc(s.id)}">${thumb(Img.url(s))}
        <span class="m"><div class="t">${esc(s.title)}</div><div class="a">${st}<span>${esc(s.artist || 'Bilinmeyen sanatçı')}</span></div></span>
        <button class="more" data-edit="${esc(s.id)}" aria-label="Seçenekler">${ICON.more}</button></li>`;
    }).join('');
  },
  lists() {
    if (App.view !== 'lists') return;
    const v = $('vLists');
    if (App.openList) {
      const L = App.lists.find(l => l.id === App.openList);
      if (!L) { App.openList = null; return UI.lists(); }
      const rows = L.tracks.map((t, i) => ({ t, i, s: App.match(t) }));
      const ready = rows.filter(r => r.s).length;
      v.innerHTML = `<div class="top"></div><div class="lhead"><button class="circle" id="listBack" aria-label="Geri">${ICON.back}</button>
          <div class="grow"><h2>${esc(L.name)}</h2><div class="sub">${ready}/${L.tracks.length} şarkı çalınabilir</div></div>
          <button class="btn primary" id="listPlay" ${ready ? '' : 'disabled'}>Çal</button></div>
        <ul class="rows">${rows.map(({ t, i, s }) => `<li class="row${s ? '' : ' missing'}${s && s.id === App.curId ? ' on' : ''}" ${s ? `data-id="${esc(s.id)}"` : ''}>
          ${thumb(s ? Img.url(s) || t.coverUrl : t.coverUrl)}
          <span class="m"><div class="t">${esc(t.title)}</div><div class="a"><span>${esc(t.artist)}</span></div></span>
          ${s ? `<button class="more" data-edit="${esc(s.id)}" aria-label="Seçenekler">${ICON.more}</button>` : `<button class="chipbtn" data-attach="${i}">Dosya ekle</button>`}</li>`).join('')}</ul>
        <div style="height:18px"></div><button class="btn danger" id="listDel" style="width:100%">Listeyi sil</button>`;
      return;
    }
    const sp = Spotify.enabled ? (Spotify.connected ? `<button class="btn sp" id="spImport">Spotify'dan aktar</button>` : `<button class="btn sp" id="spConnect">Spotify ile bağlan</button>`) : '';
    v.innerHTML = `<div class="top">${sp}</div><h1>Listeler</h1>` +
      (App.lists.length ? `<div class="cards">${App.lists.map(L => {
        const ready = L.tracks.filter(t => App.match(t)).length;
        return `<button class="card" data-list-open="${esc(L.id)}"><span class="img" style="${L.image ? `background-image:url('${esc(L.image)}')` : ''}">${L.image ? '' : ICON.note}</span>
          <span class="cn">${esc(L.name)}</span><span class="cs">${ready}/${L.tracks.length} hazır</span></button>`;
      }).join('')}</div>` :
      `<div class="empty"><p><strong>Henüz liste yok.</strong></p><p>${Spotify.enabled
        ? 'Spotify\'ı bağla, listelerini ve beğendiklerini getir. Elindeki şarkılar isimlerine göre otomatik eşleşir; eksikler için "Dosya ekle" deyince Spotify\'daki ad, sanatçı ve kapak dosyaya işlenir.'
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
    else sp = `<p class="msg">Listelerini ve beğendiklerini getirir, şarkılarına doğru ad ve kapak bulur.</p><button class="btn sp" id="acSpIn">Spotify ile bağlan</button>`;
    const d = Engine.info();
    el.innerHTML = `<div class="top"></div><h1>Hesap</h1>
      <div class="group"><h3>Bulut</h3>${cloud}</div>
      <div class="group"><h3>Spotify</h3>${sp}</div>
      <div class="group"><h3>Ses motoru</h3>
        <p class="msg">Şu an: <strong>${d.mode === 'fx' ? 'Gelişmiş (tempo + ton + ekolayzır)' : 'Yedek (sadece tempo)'}</strong></p>
        <pre class="diag" id="diagText">${esc(['motor: ' + d.mode + (d.motor ? ' (hazır)' : ''), 'ses: ' + d.ctx, 'oturum: ' + d.session, 'worklet: ' + (d.worklet ? 'var' : 'yok'), d.ua, '', ...d.events].join('\n'))}</pre>
        <div class="btns"><button class="btn" id="diagCopy">Kopyala</button>${d.mode === 'simple' ? '<button class="btn" id="diagRetry">Gelişmiş motoru dene</button>' : ''}</div></div>`;
  }
};

/* ================= Sekmeler ================= */
function setView(v) {
  App.view = v;
  $('vLib').hidden = v !== 'lib'; $('vLists').hidden = v !== 'lists'; $('vAcct').hidden = v !== 'acct';
  $('tLib').setAttribute('aria-selected', v === 'lib'); $('tLists').setAttribute('aria-selected', v === 'lists'); $('tAcct').setAttribute('aria-selected', v === 'acct');
  if (v === 'acct') UI.account();
  UI.lib(); UI.lists();
  window.scrollTo(0, 0);
}
$('tLib').onclick = () => setView('lib');
$('tLists').onclick = () => { App.openList = null; setView('lists'); };
$('tAcct').onclick = () => setView('acct');
$('tNow').onclick = () => openPlayer();

/* ================= Tam ekran oynatıcı ================= */
function openPlayer() {
  const p = $('player'); p.classList.remove('closed'); p.setAttribute('aria-hidden', 'false'); p.style.transform = '';
  $('tNow').setAttribute('aria-selected', 'true'); document.body.style.overflow = 'hidden';
  renderFx(); UI.now(); requestAnimationFrame(() => Wave.draw());
}
function closePlayer() {
  const p = $('player'); p.classList.add('closed'); p.setAttribute('aria-hidden', 'true'); p.style.transform = '';
  $('tNow').setAttribute('aria-selected', 'false'); document.body.style.overflow = '';
}
(() => { // aşağı çekerek kapat
  const h = $('phDrag'), p = $('player'); let y0 = null, dy = 0;
  h.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; y0 = e.clientY; dy = 0; h.setPointerCapture(e.pointerId); p.style.transition = 'none'; });
  h.addEventListener('pointermove', e => { if (y0 == null) return; dy = Math.max(0, e.clientY - y0); p.style.transform = `translateY(${dy}px)`; });
  const end = () => { if (y0 == null) return; p.style.transition = ''; y0 = null; if (dy > 110) closePlayer(); else p.style.transform = ''; };
  h.addEventListener('pointerup', end); h.addEventListener('pointercancel', end);
  h.addEventListener('click', e => { if (!e.target.closest('button') && dy < 5) closePlayer(); });
})();
$('miniOpen').onclick = openPlayer;
$('miniThumb').onclick = openPlayer;
$('miniPlay').onclick = toggle;
$('miniNext').onclick = () => { Engine.unlock(); step(1); };

/* ================= Sheet yönetimi ================= */
function openSheet(id) { $(id).hidden = false; document.body.style.overflow = 'hidden'; }
function closeSheet(id) { $(id).hidden = true; if (![...document.querySelectorAll('.sheet')].some(s => !s.hidden) && $('player').classList.contains('closed')) document.body.style.overflow = ''; }
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

/* ================= Ses ayarları ================= */
const EQ_PRESETS = {
  flat:    { n: 'Düz',            g: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  vokal:   { n: 'Arabesk vokal',  g: [-1, 0, 0, -1, -1, 1, 3, 3, 2, 1] },
  bass:    { n: 'Bas',            g: [6, 5, 4, 2, 0, 0, 0, 0, 0, 0] },
  baglama: { n: 'Bağlama / tiz',  g: [0, 0, -1, -1, 0, 1, 2, 4, 4, 3] },
  gece:    { n: 'Gece',           g: [2, 2, 1, 0, 0, -1, -2, -2, -3, -4] },
  kulak:   { n: 'Kulaklık',       g: [3, 2, 1, 0, -1, 0, 1, 2, 3, 2] },
  hoparlor:{ n: 'Telefon hoparlörü', g: [-4, -2, 2, 3, 2, 1, 1, 2, 2, 0] }
};
const MODES = [
  { n: 'Orijinal', rate: 1, semi: 0 },
  { n: 'Slowed', rate: 0.85, semi: Math.round(1200 * Math.log2(0.85)) / 100 },
  { n: 'Ağır damar', rate: 0.92, semi: -1 },
  { n: 'Speed up', rate: 1.2, semi: Math.round(1200 * Math.log2(1.2)) / 100 },
  { n: 'Nightcore', rate: 1.25, semi: 3 },
  { n: 'Karaoke tonu −2', rate: 1, semi: -2 },
  { n: 'Karaoke tonu +2', rate: 1, semi: 2 }
];
const signed = (v, d) => (v > 0.0001 ? '+' : '') + (Math.abs(v) < 0.005 ? (0).toFixed(d).replace('.', ',') : num(v, d));
function buildEq() {
  $('eqPills').innerHTML = Object.entries(EQ_PRESETS).map(([k, p]) => `<button class="pill" data-eq="${k}">${p.n}</button>`).join('');
  $('eqGrid').innerHTML = Engine.FREQS.map((f, i) => `<div class="eqb"><span class="v" id="ev${i}"></span>
    <div class="vs" data-band="${i}"><span class="tr"></span><span class="mid"></span><span class="fill" id="ef${i}"></span><span class="kn" id="ek${i}"></span></div>
    <span class="f">${f >= 1000 ? f / 1000 + 'k' : f}</span></div>`).join('');
}
function bandUI(i, v) {
  const H = 170, y = (1 - (v + 12) / 24) * H, mid = H / 2;
  $('ek' + i).style.top = y + 'px';
  const f = $('ef' + i); f.style.top = Math.min(y, mid) + 'px'; f.style.height = Math.abs(y - mid) + 'px';
  $('ev' + i).textContent = (v > 0 ? '+' : '') + num(v, 1);
}
function renderFx() {
  const f = Engine.fx;
  $('rate').value = Math.round(f.rate * 100); $('rateV').textContent = Math.round(f.rate * 100) + ' %';
  $('semi').value = Math.round(f.semi * 100); $('semiV').textContent = signed(f.semi, 2);
  $('pre').value = Math.round(f.pre * 10); $('preV').textContent = signed(f.pre, 1) + ' dB';
  $('preV').classList.toggle('off', !f.preOn); $('pre').classList.toggle('dim', !f.preOn); $('preReset').classList.toggle('off', !f.preOn);
  $('preOn').setAttribute('aria-checked', f.preOn);
  $('formant').classList.toggle('on', f.formant);
  $('eqOn').setAttribute('aria-checked', f.eqOn); $('eqBlk').classList.toggle('eqoff', !f.eqOn);
  document.querySelectorAll('[data-eq]').forEach(b => b.classList.toggle('on', b.dataset.eq === f.eqPreset));
  f.eq.forEach((v, i) => bandUI(i, v));
  ['rate', 'semi', 'pre'].forEach(id => rangeFill($(id)));
  $('fxNote').hidden = Engine.mode !== 'simple';
}
function setRate(r) { r = Math.round(Math.max(0.5, Math.min(1.5, r)) * 100) / 100; Engine.setFx({ rate: r }); renderFx(); UI.now(); }
function setSemi(s) { s = Math.round(Math.max(-12, Math.min(12, s)) * 100) / 100; Engine.setFx({ semi: s }); renderFx(); }
$('rate').addEventListener('input', e => setRate(e.target.value / 100));
$('semi').addEventListener('input', e => { let v = e.target.value / 100; if (Math.abs(v - Math.round(v)) < 0.06) v = Math.round(v); setSemi(v); });
$('rateReset').onclick = () => setRate(1);
$('semiReset').onclick = () => setSemi(0);
$('formant').onclick = () => { Engine.setFx({ formant: !Engine.fx.formant }); renderFx(); toast(Engine.fx.formant ? 'Doğal vokal açık: ton değişince ses karakteri korunur' : 'Doğal vokal kapalı'); };
$('pre').addEventListener('input', e => { Engine.setEq({ pre: e.target.value / 10, preOn: true }); renderFx(); });
$('preOn').onclick = () => { Engine.setEq({ preOn: !Engine.fx.preOn }); renderFx(); };
$('preReset').onclick = () => { Engine.setEq({ pre: 0 }); renderFx(); };
$('eqOn').onclick = () => { Engine.setEq({ eqOn: !Engine.fx.eqOn }); renderFx(); };
$('eqReset').onclick = () => { Engine.setEq({ eq: Engine.FREQS.map(() => 0), eqPreset: 'flat' }); renderFx(); };
$('eqPills').addEventListener('click', e => { const b = e.target.closest('[data-eq]'); if (!b) return; Engine.setEq({ eq: EQ_PRESETS[b.dataset.eq].g.slice(), eqPreset: b.dataset.eq, eqOn: true }); renderFx(); });
(() => { // dikey EQ kaydırıcıları
  let act = null;
  const val = (e, el) => { const r = el.getBoundingClientRect(); let v = (1 - (e.clientY - r.top) / r.height) * 24 - 12; v = Math.max(-12, Math.min(12, Math.round(v * 10) / 10)); if (Math.abs(v) < 0.35) v = 0; return v; };
  const set = (i, v) => { const eq = Engine.fx.eq.slice(); eq[i] = v; Engine.setEq({ eq, eqPreset: 'custom', eqOn: true }); bandUI(i, v); if (!Engine.fx.eqOn) renderFx(); document.querySelectorAll('[data-eq]').forEach(b => b.classList.remove('on')); };
  $('eqGrid').addEventListener('pointerdown', e => { const el = e.target.closest('.vs'); if (!el) return; act = { el, i: +el.dataset.band }; el.setPointerCapture(e.pointerId); set(act.i, val(e, el)); });
  $('eqGrid').addEventListener('pointermove', e => { if (act) set(act.i, val(e, act.el)); });
  const end = () => act = null;
  $('eqGrid').addEventListener('pointerup', end); $('eqGrid').addEventListener('pointercancel', end);
})();
$('pModes').onclick = () => menu(MODES.map(m => ({
  label: `${m.n}  ·  ${Math.round(m.rate * 100)} %  ·  ton ${signed(m.semi, 2)}`, icon: ICON.wave,
  cls: Math.abs(m.rate - Engine.fx.rate) < 0.001 && Math.abs(m.semi - Engine.fx.semi) < 0.005 ? 'on' : '',
  run: () => { Engine.setFx({ rate: m.rate, semi: m.semi }); renderFx(); UI.now(); }
})));

/* ================= Kontroller ================= */
$('play').onclick = toggle;
$('next').onclick = () => { Engine.unlock(); step(1); };
$('prev').onclick = () => { Engine.unlock(); step(-1); };
$('back10').onclick = () => skip(-10);
$('fwd10').onclick = () => skip(10);
$('shuffle').onclick = () => { App.prefs.shuffle = !App.prefs.shuffle; App.savePrefs(); UI.modes(); UI.now(); };
$('repeat').onclick = () => { App.prefs.repeat = { off: 'all', all: 'one', one: 'off' }[App.prefs.repeat]; App.savePrefs(); UI.modes(); UI.now(); };
const seekEl = $('seek');
seekEl.addEventListener('input', () => { dragging = true; rangeFill(seekEl); if (Engine.duration) $('cur').textContent = fmt(seekEl.value / 1000 * Engine.duration / Engine.fx.rate); });
seekEl.addEventListener('change', () => { if (Engine.duration && Engine.loadedId === App.curId) Engine.seek(seekEl.value / 1000 * Engine.duration); dragging = false; Wave.draw(); });
$('pMore').onclick = () => { const s = App.byId(App.curId); if (s) songMenu(s.id); };
$('pExport').onclick = () => { if (App.curId) openExport(App.curId); else toast('Önce bir şarkı çal'); };

function songMenu(id) {
  const s = App.byId(id); if (!s) return;
  menu([
    { label: 'Bilgileri ve kapağı düzenle', icon: ICON.edit, run: () => openEdit(id) },
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
  if (App.curId === s.id) { Engine.pause(); App.curId = null; Wave.set(null); }
  UI.lib(); UI.lists(); UI.now(); toast('Silindi');
}
$('libMenuBtn').onclick = () => menu([['added', 'En yeni üstte'], ['title', 'Şarkı adına göre'], ['artist', 'Sanatçıya göre']].map(([k, l]) => ({
  label: l, icon: ICON.sort, cls: App.prefs.sort === k ? 'on' : '', run: () => { App.prefs.sort = k; App.savePrefs(); UI.lib(); }
})));

/* ================= Şarkı ekleme ================= */
async function addFiles(files, preset) {
  const added = [];
  const old = $('player').classList.contains('closed');
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
$('file').addEventListener('change', async e => {
  const files = Array.from(e.target.files || []); e.target.value = '';
  if (!files.length) return;
  const added = await addFiles(files);
  toast(added.length + ' şarkı eklendi');
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
    img.onload = () => {
      w = img.naturalWidth; h = img.naturalHeight; img.style.width = w + 'px'; img.style.height = h + 'px';
      S = box.clientWidth; min = S / Math.min(w, h); sc = min; tx = (S - w * sc) / 2; ty = (S - h * sc) / 2; apply();
    };
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
      const [a, b] = [...pts.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y), m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      if (last) { tx += m.x - last.m.x; ty += m.y - last.m.y; zoomAt(m.x, m.y, sc * d / last.d); }
      last = { d, m };
    }
  });
  const up = e => { pts.delete(e.pointerId); last = null; };
  box.addEventListener('pointerup', up); box.addEventListener('pointercancel', up);
  box.addEventListener('wheel', e => { e.preventDefault(); const p = local(e); zoomAt(p.x, p.y, sc * (e.deltaY < 0 ? 1.08 : 0.93)); }, { passive: false });
  zoom.addEventListener('input', () => zoomAt(S / 2, S / 2, min * zoom.value / 100));
  $('cropCancel').onclick = () => { closeSheet('cropSheet'); };
  $('cropOk').onclick = () => {
    const c = document.createElement('canvas'); c.width = c.height = 800;
    const g = c.getContext('2d'); g.imageSmoothingQuality = 'high';
    g.drawImage(img, -tx / sc, -ty / sc, S / sc, S / sc, 0, 0, 800, 800);
    c.toBlob(b => { closeSheet('cropSheet'); if (b && done) done(b); }, 'image/jpeg', 0.9);
  };
  return { open };
})();

/* ================= Düzenleme ================= */
let edit = null;
function edThumb() {
  const s = App.byId(edit.id);
  let url = null;
  if (edit.cover instanceof Blob) { if (edit.tmpUrl) URL.revokeObjectURL(edit.tmpUrl); edit.tmpUrl = URL.createObjectURL(edit.cover); url = edit.tmpUrl; }
  else if (edit.cover !== null) url = Img.url(s);
  setThumb($('edCover'), url);
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
    $('edSpRes').innerHTML = res.map((t, i) => `<li class="row" data-res="${i}">${thumb(t.coverUrl)}<span class="m"><div class="t">${esc(t.title)}</div><div class="a"><span>${esc(t.artist)} · ${esc(t.album)} ${esc(t.year)}</span></div></span><span></span></li>`).join('');
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
  toast('Kaydedildi');
};
$('edDel').onclick = () => {
  const b = $('edDel');
  if (!b.classList.contains('sure')) { b.classList.add('sure'); b.textContent = 'Emin misin? Tekrar bas'; return; }
  closeSheet('editSheet'); deleteSong(edit.id);
};

/* ================= Dışa aktarma ================= */
const Exp = { id: null, fmt: 'mp3-320', fx: true, lib: false, blob: null, name: '', busy: false };
function fxSuffix() {
  const f = Engine.fx, p = [];
  const m = MODES.find(m => m.n !== 'Orijinal' && Math.abs(m.rate - f.rate) < 0.001 && Math.abs(m.semi - f.semi) < 0.005);
  if (m) p.push(m.n);
  else {
    if (Math.abs(f.rate - 1) > 0.001) p.push(Math.round(f.rate * 100) + '%');
    if (Math.abs(f.semi) > 0.004) p.push('ton ' + signed(f.semi, 2));
  }
  return p.join(' ');
}
function exRender() {
  const f = Engine.fx, s = App.byId(Exp.id);
  const fxParts = [`tempo ${Math.round(f.rate * 100)} %`, `ton ${signed(f.semi, 2)}`, f.eqOn && f.eq.some(Boolean) ? 'ekolayzır açık' : 'ekolayzır yok', f.preOn && f.pre ? `ön kazanç ${signed(f.pre, 1)} dB` : ''].filter(Boolean);
  $('exSummary').innerHTML = `<strong>${esc(s ? s.title : '')}</strong><br>${Exp.fx ? esc(fxParts.join(' · ')) : 'Orijinal ses, sadece format değişir'}`;
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
  const bar = $('exBar'), msg = $('exMsg'); const prog = (t, p) => { msg.textContent = t; bar.style.width = Math.round(p * 100) + '%'; };
  try {
    let blob = s.blob;
    if (!blob) { if (!Cloud.user || !s.audioPath) throw new Error('Bu şarkının dosyası bu cihazda yok'); prog('Buluttan indiriliyor', 0.02); blob = await Cloud.download(s.audioPath); s.blob = blob; DB.put('songs', s); }
    prog('Ses çözülüyor', 0.04);
    const ab = await blob.arrayBuffer();
    const OC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    const buf = await new Promise((res, rej) => new OC(2, 44100, 44100).decodeAudioData(ab, res, rej));
    const L = buf.getChannelData(0).slice(), R = (buf.numberOfChannels > 1 ? buf.getChannelData(1) : buf.getChannelData(0)).slice();
    const f = Engine.fx, mp3 = Exp.fmt !== 'wav';
    let cover = null; if (s.cover instanceof Blob) cover = await (await Img.square(s.cover, 800)).arrayBuffer();
    const suffix = Exp.fx ? fxSuffix() : '';
    const title = s.title + (suffix ? ` (${suffix})` : '');
    const msgData = {
      L, R, sr: buf.sampleRate, freqs: Engine.FREQS,
      rate: Exp.fx ? f.rate : 1, semi: Exp.fx ? f.semi : 0, formant: f.formant,
      eq: Exp.fx && f.eqOn ? f.eq.slice() : null, preDb: Exp.fx && f.preOn ? f.pre : 0,
      format: mp3 ? 'mp3' : 'wav', kbps: Exp.fmt === 'mp3-192' ? 192 : 320,
      tags: { title, artist: s.artist || '', album: s.album || '', year: s.year || '', cover }
    };
    const out = await new Promise((res, rej) => {
      const w = new Worker('export-worker.js');
      w.onmessage = e => {
        const d = e.data;
        if (d.type === 'stage') prog(d.text, 0.08 + d.p * 0.9);
        else if (d.type === 'done') { w.terminate(); res(d); }
        else if (d.type === 'error') { w.terminate(); rej(new Error(d.message)); }
      };
      w.onerror = e => { w.terminate(); rej(new Error(e.message || 'işçi başlatılamadı')); };
      w.postMessage(msgData, [L.buffer, R.buffer].concat(cover ? [cover] : []));
    });
    const safe = t => t.replace(/[\\/:*?"<>|]+/g, ' ').trim();
    Exp.blob = out.blob; Exp.name = safe(`${s.artist ? s.artist + ' - ' : ''}${title}`) + (mp3 ? '.mp3' : '.wav');
    prog(`Hazır · ${(out.blob.size / 1048576).toFixed(1)} MB · ${fmt(out.duration)}`, 1);
    if (Exp.lib) {
      const file = new File([out.blob], Exp.name, { type: out.blob.type });
      await addFiles([file], { title, artist: s.artist, album: s.album, year: s.year, cover: s.cover instanceof Blob ? s.cover : null, coverUrl: s.cover ? null : s.coverUrl });
    }
    $('exBtns').hidden = true; $('exDone').hidden = false;
  } catch (e) { prog('Olmadı: ' + e.message, 0); $('exGo').disabled = false; }
  Exp.busy = false;
};
$('exSave').onclick = async () => {
  if (!Exp.blob) return;
  const file = new File([Exp.blob], Exp.name, { type: Exp.blob.type });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: Exp.name }); return; }
  } catch (e) { if (e.name === 'AbortError') return; }
  const a = document.createElement('a'); a.href = URL.createObjectURL(file); a.download = Exp.name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
};

/* ================= Hesap sekmesi ================= */
$('vAcct').addEventListener('click', async e => {
  const id = e.target.id;
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
      else { const needConfirm = await Cloud.signUp(mail, pw); if (needConfirm) { const m = $('acMsg'); m.hidden = false; m.className = 'msg'; m.textContent = 'Hesap açıldı. E-postana gelen onay linkine bas, sonra giriş yap.'; e.target.disabled = false; return; } }
      UI.account(); toast('Giriş yapıldı');
    } catch (er) { msg(tr(er)); }
    if ($(id)) $(id).disabled = false;
  }
  else if (id === 'acOut') { await Cloud.signOut(); UI.account(); UI.lib(); }
  else if (id === 'acSyncBtn') { Cloud.sync(); toast('Eşitleniyor'); }
  else if (id === 'acSpIn') Spotify.login();
  else if (id === 'acSpOut') { Spotify.logout(); UI.account(); UI.lists(); }
  else if (id === 'acSpImport') openSpImport();
  else if (id === 'diagRetry') Engine.retryFx();
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
    ul.innerHTML = items.map(p => `<li class="row" data-pl="${esc(p.id)}" data-name="${esc(p.name)}" data-img="${esc(p.image || '')}">${thumb(p.image)}
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

/* ================= Liste ve kütüphane olayları ================= */
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
  buildEq(); UI.modes();
  await DB.open();
  const [songs, lists] = await Promise.all([DB.all('songs'), DB.all('lists')]);
  App.songs = songs; App.lists = lists; App.sortSongs();
  App.queue = App.filtered().map(s => s.id);
  UI.now(); UI.lib(); renderFx();
  document.documentElement.classList.remove('booting');
  const back = await Spotify.handleRedirect();
  if (back) { setView('lists'); openSpImport(); }
  Cloud.init();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
  if ('requestIdleCallback' in window) requestIdleCallback(() => stretchLib().catch(() => {})); else setTimeout(() => stretchLib().catch(() => {}), 1500);
})();

})();
