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
  const fx = Object.assign({ rate: 1, semi: 0, formant: true, eqOn: true, eq: FREQS.map(() => 0), eqPreset: 'flat' }, LS.get('gp-fx', {}));
  let ctx = null, stretch = null, pre = null, bands = [], initP = null, keep = null;
  let duration = 0, pos = 0, playing = false, loadedId = null;
  const listeners = { time: () => {}, end: () => {} };

  function silentUrl() {
    const sr = 8000, n = sr, b = new ArrayBuffer(44 + n * 2), v = new DataView(b);
    const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true);
    v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true);
    v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, n * 2, true);
    return URL.createObjectURL(new Blob([b], { type: 'audio/wav' }));
  }

  // Kullanıcı dokunuşu içinde senkron çağrılmalı (iOS kuralı)
  function unlock() {
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {} // sessiz moddayken de çalsın
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC({ latencyHint: 'playback' });
    }
    if (ctx.state !== 'running') ctx.resume().catch(() => {});
    if (!keep) { keep = new Audio(silentUrl()); keep.loop = true; keep.setAttribute('playsinline', ''); }
    keep.play().catch(() => {});
  }

  function init() {
    if (initP) return initP;
    initP = (async () => {
      if (!ctx) unlock();
      await stretchLib();
      stretch = await window.SignalsmithStretch(ctx);
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
        pos = t; listeners.time(t);
        if (playing && duration && t >= duration - 0.04) { playing = false; stretch.schedule({ active: false }); listeners.end(); }
      });
    })();
    initP.catch(() => { initP = null; });
    return initP;
  }

  async function load(id, blob, cancelled) {
    await init();
    playing = false;
    stretch.schedule({ active: false });
    await stretch.dropBuffers();
    loadedId = null; duration = 0; pos = 0;
    const ab = await blob.arrayBuffer();
    if (cancelled()) return false;
    const buf = await new Promise((res, rej) => ctx.decodeAudioData(ab, res, rej));
    if (cancelled()) return false;
    const L = buf.getChannelData(0), R = buf.numberOfChannels > 1 ? buf.getChannelData(1) : null;
    const CH = Math.round(ctx.sampleRate * 8);
    duration = buf.duration;
    for (let i = 0; i < buf.length; i += CH) {
      const a = L.slice(i, i + CH), b = R ? R.slice(i, i + CH) : a.slice();
      await stretch.addBuffers([a, b], [a.buffer, b.buffer]);
      if (cancelled()) return false;
    }
    stretch.schedule({ input: 0, output: ctx.currentTime, active: false });
    loadedId = id;
    return true;
  }

  function params() { return { rate: fx.rate, semitones: fx.semi, formantCompensation: fx.formant, formantBaseHz: 0 }; }

  function play() {
    if (!stretch || !loadedId) return;
    if (pos >= duration - 0.1) seek(0);
    stretch.schedule(Object.assign({ active: true, output: ctx.currentTime + 0.03 }, params()));
    playing = true;
    if (ctx.state !== 'running') ctx.resume().catch(() => {});
    if (keep) keep.play().catch(() => {});
  }
  function pause() { if (!stretch) return; stretch.schedule({ active: false, output: ctx.currentTime }); playing = false; if (keep) keep.pause(); }
  document.addEventListener('visibilitychange', () => { if (!document.hidden && ctx && playing && ctx.state !== 'running') ctx.resume().catch(() => {}); });
  function seek(t) { if (!stretch) return; t = Math.max(0, Math.min(duration, t)); pos = t; stretch.schedule(Object.assign({ input: t, output: ctx.currentTime, active: playing }, params())); }
  const pushParams = raf(() => { if (stretch && playing) stretch.schedule(Object.assign({ output: ctx.currentTime + 0.02 }, params())); });

  function setFx(patch) { Object.assign(fx, patch); LS.set('gp-fx', fx); pushParams(); }

  function applyEq(instant) {
    if (!bands.length) return;
    const g = fx.eqOn ? fx.eq : FREQS.map(() => 0);
    const t = ctx.currentTime;
    g.forEach((v, i) => instant ? bands[i].gain.value = v : bands[i].gain.setTargetAtTime(v, t, 0.03));
    const boost = Math.max(0, ...g);
    const pg = Math.pow(10, (-boost * 0.6) / 20); // kırpmayı önlemek için ön kazanç
    instant ? pre.gain.value = pg : pre.gain.setTargetAtTime(pg, t, 0.03);
  }
  function setEq(patch) { Object.assign(fx, patch); LS.set('gp-fx', fx); applyEq(false); }

  function response(freqs) { // çizim için toplam EQ eğrisi (dB)
    const out = new Float32Array(freqs.length);
    if (!bands.length) {
      // motor hazır değilken yaklaşık eğri
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

  return {
    FREQS, fx, unlock, init, load, play, pause, seek, setFx, setEq, response,
    on(ev, fn) { listeners[ev] = fn; },
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
  prefs: Object.assign({ shuffle: false, repeat: 'off' }, LS.get('gp-prefs', {})),
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
    const q = norm(this.query); if (!q) return this.songs;
    return this.songs.filter(s => norm([s.title, s.artist, s.album].join(' ')).includes(q));
  }
};

/* ================= Çalma kontrolü ================= */
let loadToken = 0;
async function playSong(id, queue) {
  const s = App.byId(id); if (!s) return;
  Engine.unlock();
  if (queue) App.queue = queue;
  if (!App.queue.includes(id)) App.queue = App.songs.map(x => x.id);
  const tok = ++loadToken;
  App.curId = id; App.loadingId = id;
  UI.now(); UI.lib(); UI.lists(); UI.busy('Plak hazırlanıyor…');
  try {
    let blob = s.blob;
    if (!blob) {
      if (!Cloud.user || !s.audioPath) throw new Error('nofile');
      UI.busy('Buluttan indiriliyor…');
      blob = await Cloud.download(s.audioPath);
      if (tok !== loadToken) return;
      s.blob = blob; DB.put('songs', s);
      UI.busy('Plak hazırlanıyor…');
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
    const first = App.curId || (App.prefs.shuffle ? App.songs[Math.floor(Math.random() * App.songs.length)] : App.songs[0] || {}).id;
    if (first) playSong(first); return;
  }
  Engine.playing ? Engine.pause() : Engine.play();
  UI.now();
}
function step(dir, auto) {
  const q = App.queue.filter(id => App.byId(id));
  if (!q.length) return;
  if (auto && App.prefs.repeat === 'one') { Engine.seek(0); Engine.play(); UI.now(); return; }
  if (dir < 0 && Engine.pos > 3) { Engine.seek(0); return; }
  let i = q.indexOf(App.curId), n;
  if (App.prefs.shuffle && q.length > 1 && dir > 0) { do n = Math.floor(Math.random() * q.length); while (n === i); }
  else n = i + dir;
  if (n >= q.length) { if (auto && App.prefs.repeat === 'off') { UI.now(); return; } n = 0; }
  if (n < 0) n = q.length - 1;
  playSong(q[n]);
}
Engine.on('end', () => step(1, true));

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
  h('seekto', d => { if (d && isFinite(d.seekTime)) Engine.seek(d.seekTime); });
}

/* ================= Arayüz ================= */
const ICON = {
  play: '<path d="M8 5v14l11-7z"/>', pause: '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18z"/></svg>',
  cloudDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18"/><path d="M12 11v7m-3-3 3 3 3-3"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>'
};
const initial = s => esc((s.title || '?').trim().charAt(0).toLocaleUpperCase('tr-TR'));
const thumb = (url, s) => `<span class="thumb">${url ? `<img src="${esc(url)}" alt="" loading="lazy" decoding="async">` : initial(s)}</span>`;

const UI = {
  now() {
    const s = App.byId(App.curId);
    $('title').textContent = s ? s.title : (App.songs.length ? 'Çalmaya hazır' : 'Henüz plak yok');
    $('artist').textContent = s ? [s.artist, s.album].filter(Boolean).join(' · ') || 'Bilinmeyen sanatçı' : (App.songs.length ? 'Bir şarkı seç ya da çal tuşuna bas' : 'Şarkılarını ekle, gerisi kolay');
    const url = Img.url(s);
    const label = $('label'), img = label.querySelector('img');
    if (url) { if (!img) label.insertAdjacentHTML('afterbegin', '<img alt="">'); const im = label.querySelector('img'); if (im.getAttribute('src') !== url) im.src = url; }
    else if (img) img.remove();
    label.querySelector('.rpm').hidden = !!url; $('labelText').hidden = !!url;
    $('labelText').textContent = s ? s.title : 'Plak koy';
    const on = Engine.playing && Engine.loadedId === App.curId;
    $('app').classList.toggle('playing', on);
    $('playIcon').innerHTML = on ? ICON.pause : ICON.play;
    $('play').setAttribute('aria-label', on ? 'Duraklat' : 'Çal');
    ['prev', 'next', 'play'].forEach(id => $(id).disabled = !App.songs.length);
    if (Engine.loadedId !== App.curId) { setSeek(0, 0); } else { $('dur').textContent = fmt(Engine.duration); }
    Media.pos();
  },
  busy(t) { $('busy').hidden = !t; if (t) $('busyText').textContent = t; },
  modes() {
    $('shuffle').setAttribute('aria-pressed', App.prefs.shuffle);
    $('repeat').setAttribute('aria-pressed', App.prefs.repeat !== 'off');
    $('repeatOne').hidden = App.prefs.repeat !== 'one';
    $('repeat').setAttribute('aria-label', 'Tekrarla: ' + ({ off: 'kapalı', all: 'tüm liste', one: 'tek şarkı' })[App.prefs.repeat]);
  },
  chips() {
    const f = Engine.fx;
    $('chipTempoV').textContent = num(f.rate) + '×';
    $('chipPitchV').textContent = 'Ton ' + (f.semi > 0.04 ? '+' : '') + (Math.abs(f.semi) < 0.05 ? '0' : num(f.semi, 1));
    $('chipEqV').textContent = 'EQ';
    $('chipTempo').classList.toggle('on', Math.abs(f.rate - 1) > 0.001);
    $('chipPitch').classList.toggle('on', Math.abs(f.semi) > 0.04);
    $('chipEq').classList.toggle('on', f.eqOn && f.eq.some(v => v));
  },
  lib() {
    if (App.view !== 'lib') return;
    const list = App.filtered();
    $('count').textContent = App.songs.length + ' şarkı' + (App.query ? ` · ${list.length} sonuç` : '');
    $('empty').hidden = App.songs.length > 0;
    $('syncState').textContent = Cloud.state;
    $('list').innerHTML = list.map(s => {
      const st = s.cloud ? (s.blob ? ICON.cloud : ICON.cloudDown) : '';
      return `<li class="row${s.id === App.curId ? ' on' : ''}" data-id="${esc(s.id)}">${thumb(Img.url(s), s)}
        <span class="m"><div class="st">${esc(s.title)}</div><div class="sa">${st}<span>${esc(s.artist || 'Bilinmeyen sanatçı')}${s.album ? ' · ' + esc(s.album) : ''}</span></div></span>
        <button class="more" data-edit="${esc(s.id)}" aria-label="Düzenle">${ICON.more}</button></li>`;
    }).join('');
  },
  lists() {
    if (App.view !== 'lists') return;
    const v = $('listsView');
    if (App.openList) {
      const L = App.lists.find(l => l.id === App.openList);
      if (!L) { App.openList = null; return UI.lists(); }
      const rows = L.tracks.map((t, i) => ({ t, i, s: App.match(t) }));
      const ready = rows.filter(r => r.s).length;
      v.innerHTML = `<div class="list-head"><button class="back" id="listBack" aria-label="Geri">${ICON.back}</button>
          <div class="grow"><h2>${esc(L.name)}</h2><div class="sub">${ready}/${L.tracks.length} şarkı çalınabilir</div></div>
          <button class="btn primary" id="listPlay" ${ready ? '' : 'disabled'}>Çal</button></div>
        <ul class="rows">${rows.map(({ t, i, s }) => `<li class="row${s ? '' : ' missing'}${s && s.id === App.curId ? ' on' : ''}" ${s ? `data-id="${esc(s.id)}" data-list="1"` : ''}>
          ${thumb(s ? Img.url(s) || t.coverUrl : t.coverUrl, t)}
          <span class="m"><div class="st">${esc(t.title)}</div><div class="sa"><span>${esc(t.artist)}</span></div></span>
          ${s ? `<button class="more" data-edit="${esc(s.id)}" aria-label="Düzenle">${ICON.more}</button>` : `<button class="mini" data-attach="${i}">Dosya ekle</button>`}</li>`).join('')}</ul>
        <button class="btn danger" id="listDel">Listeyi sil</button>`;
      return;
    }
    const sp = Spotify.enabled
      ? (Spotify.connected ? `<button class="btn sp" id="spImport">Spotify'dan liste aktar</button>` : `<button class="btn sp" id="spConnect">Spotify ile bağlan</button>`)
      : '';
    v.innerHTML = `<div class="list-head"><div class="grow"><h2>Listeler</h2></div>${sp}</div>` +
      (App.lists.length ? `<div class="cards">${App.lists.map(L => {
        const ready = L.tracks.filter(t => App.match(t)).length;
        return `<button class="card" data-list-open="${esc(L.id)}"><span class="img" style="${L.image ? `background-image:url('${esc(L.image)}')` : ''}">${L.image ? '' : '♪'}</span>
          <span class="cb"><span class="cn">${esc(L.name)}</span><span class="cs">${ready}/${L.tracks.length} hazır</span></span></button>`;
      }).join('')}</div>` :
      `<div class="empty"><p><strong>Henüz liste yok.</strong> ${Spotify.enabled
        ? 'Spotify\'ı bağla, listelerini ve beğendiklerini getir. Elindeki MP3\'ler isimlerine göre otomatik eşleşir, eksikler için "Dosya ekle" ile şarkıyı seçince Spotify\'daki ad, sanatçı ve kapak dosyaya işlenir.'
        : 'Spotify listelerini getirmek için kurulum rehberindeki Spotify adımını yap ve config.js\'e Client ID\'yi yaz.'}</p></div>`);
  },
  acctBtn() {
    const b = $('acctBtn');
    if (Cloud.user) { b.innerHTML = esc((Cloud.user.email || '?').charAt(0).toUpperCase()) + '<span class="dot"></span>'; b.style.color = 'var(--gold)'; }
    else { b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>'; b.style.color = ''; }
  },
  account() {
    const el = $('acctBody'); if (!el) return;
    let cloud;
    if (!Cloud.enabled) cloud = `<p class="msg">Bulut henüz kurulmadı. Rehberdeki Supabase adımını yapıp config.js dosyasına adresi ve anahtarı yazınca burada giriş ekranı çıkar.</p>`;
    else if (Cloud.user) cloud = `<p class="msg">Giriş yapıldı: <strong style="color:var(--fg)">${esc(Cloud.user.email)}</strong></p>
      <p class="msg" id="acSync">${esc(Cloud.state || '')}</p>
      <div class="btns"><button class="btn" id="acSyncBtn">Şimdi eşitle</button><button class="btn danger" id="acOut">Çıkış yap</button></div>`;
    else cloud = `<p class="msg">Giriş yaparsan şarkıların, bilgileri ve kapaklarıyla buluta yedeklenir. Telefon değişse de kaybolmaz.</p>
      <div class="field"><label for="acMail">E-posta</label><input id="acMail" type="email" autocomplete="email" inputmode="email"></div>
      <div class="field"><label for="acPw">Şifre (en az 6 karakter)</label><input id="acPw" type="password" autocomplete="current-password"></div>
      <p class="msg" id="acMsg" hidden></p>
      <div class="btns"><button class="btn primary" id="acIn">Giriş yap</button><button class="btn" id="acUp">Hesap oluştur</button></div>`;
    let sp;
    if (!Spotify.enabled) sp = `<p class="msg">Spotify bağlantısı için rehberdeki Spotify adımını yapıp Client ID'yi config.js'e yaz.</p>`;
    else if (Spotify.connected) sp = `<p class="msg">Bağlı hesap: <strong style="color:var(--fg)">${esc(Spotify.me ? Spotify.me.name : 'Spotify')}</strong></p>
      <div class="btns"><button class="btn sp" id="acSpImport">Liste aktar</button><button class="btn danger" id="acSpOut">Bağlantıyı kes</button></div>`;
    else sp = `<p class="msg">Listelerini ve beğendiklerini getirir, şarkılarına doğru ad ve kapak bulur.</p><button class="btn sp" id="acSpIn">Spotify ile bağlan</button>`;
    el.innerHTML = `<div class="grip"></div><div class="sec"><h3>Hesap</h3>${cloud}</div><div class="sec"><h4>Spotify</h4>${sp}</div>`;
  }
};

function setSeek(t, d) {
  const v = d ? t / d * 1000 : 0;
  const s = $('seek'); s.value = v; s.style.setProperty('--p', (v / 10) + '%');
  $('cur').textContent = fmt(t); $('dur').textContent = fmt(d);
}
let dragging = false;
Engine.on('time', t => { if (!dragging && Engine.loadedId === App.curId) setSeek(t, Engine.duration); Media.pos(); });

/* ================= Sheet yönetimi ================= */
function openSheet(id) { $(id).hidden = false; document.body.style.overflow = 'hidden'; }
function closeSheet(id) { $(id).hidden = true; if (![...document.querySelectorAll('.sheet')].some(s => !s.hidden)) document.body.style.overflow = ''; }
document.querySelectorAll('.sheet').forEach(sh => sh.addEventListener('click', e => { if (e.target === sh) closeSheet(sh.id); }));

/* ================= Ses sayfası ================= */
const EQ_PRESETS = {
  flat:    { n: 'Düz',            g: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  vokal:   { n: 'Arabesk vokal',  g: [-1, 0, 0, -1, -1, 1, 3, 3, 2, 1] },
  bass:    { n: 'Bas',            g: [6, 5, 4, 2, 0, 0, 0, 0, 0, 0] },
  baglama: { n: 'Bağlama / tiz',  g: [0, 0, -1, -1, 0, 1, 2, 4, 4, 3] },
  gece:    { n: 'Gece',           g: [2, 2, 1, 0, 0, -1, -2, -2, -3, -4] },
  kulak:   { n: 'Kulaklık',       g: [3, 2, 1, 0, -1, 0, 1, 2, 3, 2] },
  hoparlor:{ n: 'Telefon hoparlörü', g: [-4, -2, 2, 3, 2, 1, 1, 2, 2, 0] }
};
const RATE_PRESETS = [0.75, 0.85, 0.9, 1, 1.1, 1.25];
const MODES = [
  { n: 'Orijinal', rate: 1, semi: 0 },
  { n: 'Slowed', rate: 0.85, semi: +(12 * Math.log2(0.85)).toFixed(1) },
  { n: 'Ağır damar', rate: 0.92, semi: -1 },
  { n: 'Speed up', rate: 1.2, semi: +(12 * Math.log2(1.2)).toFixed(1) },
  { n: 'Karaoke tonu −2', rate: 1, semi: -2 },
  { n: 'Karaoke tonu +2', rate: 1, semi: 2 }
];
function buildFx() {
  $('ratePills').innerHTML = RATE_PRESETS.map(r => `<button class="pill" data-rate="${r}">${num(r)}×</button>`).join('');
  $('modePills').innerHTML = MODES.map((m, i) => `<button class="pill" data-mode="${i}">${m.n}</button>`).join('');
  $('eqPills').innerHTML = Object.entries(EQ_PRESETS).map(([k, p]) => `<button class="pill" data-eq="${k}">${p.n}</button>`).join('');
  $('bands').innerHTML = Engine.FREQS.map((f, i) => `<div class="band"><span>${f >= 1000 ? f / 1000 + 'k' : f}</span>
    <input type="range" class="center" id="b${i}" data-band="${i}" min="-12" max="12" step="0.5" aria-label="${f} Hz"><span id="bv${i}"></span></div>`).join('');
}
function renderFx() {
  const f = Engine.fx;
  $('rate').value = Math.round(f.rate * 100); $('rateV').textContent = num(f.rate) + '×';
  $('semi').value = Math.round(f.semi * 10); $('semiV').textContent = (f.semi > 0.04 ? '+' : '') + (Math.abs(f.semi) < 0.05 ? '0' : num(f.semi, 1));
  $('formant').setAttribute('aria-checked', f.formant);
  $('eqOn').setAttribute('aria-checked', f.eqOn);
  document.querySelectorAll('[data-rate]').forEach(b => b.classList.toggle('on', Math.abs(+b.dataset.rate - f.rate) < 0.001));
  document.querySelectorAll('[data-mode]').forEach(b => { const m = MODES[+b.dataset.mode]; b.classList.toggle('on', Math.abs(m.rate - f.rate) < 0.001 && Math.abs(m.semi - f.semi) < 0.05); });
  document.querySelectorAll('[data-eq]').forEach(b => b.classList.toggle('on', b.dataset.eq === f.eqPreset));
  f.eq.forEach((v, i) => { $('b' + i).value = v; $('bv' + i).textContent = (v > 0 ? '+' : '') + num(v, 1) + ' dB'; });
  ['rate', 'semi', ...f.eq.map((_, i) => 'b' + i)].forEach(id => { const el = $(id); el.style.setProperty('--p', ((el.value - el.min) / (el.max - el.min) * 100) + '%'); });
  drawEq(); UI.chips();
}
const drawEq = raf(() => {
  const cv = $('eqCurve'); if ($('fxSheet').hidden) return;
  const g = cv.getContext('2d'), W = cv.width, H = cv.height;
  const css = getComputedStyle(document.documentElement);
  const N = 120, freqs = [...Array(N)].map((_, i) => 20 * Math.pow(1000, i / (N - 1)));
  const r = Engine.response(freqs);
  g.clearRect(0, 0, W, H);
  g.strokeStyle = css.getPropertyValue('--line'); g.lineWidth = 1;
  [-12, 0, 12].forEach(db => { const y = H / 2 - db / 15 * (H / 2); g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); });
  const gold = css.getPropertyValue('--gold').trim();
  g.beginPath();
  r.forEach((db, i) => { const x = i / (N - 1) * W, y = H / 2 - Math.max(-15, Math.min(15, db)) / 15 * (H / 2); i ? g.lineTo(x, y) : g.moveTo(x, y); });
  g.strokeStyle = gold; g.lineWidth = 3; g.stroke();
  g.lineTo(W, H / 2); g.lineTo(0, H / 2); g.closePath(); g.fillStyle = gold + '22'; g.fill();
});
function setRate(r) { r = Math.round(Math.max(0.5, Math.min(1.5, r)) * 100) / 100; Engine.setFx({ rate: r }); renderFx(); Media.pos(); }
function setSemi(s) { s = Math.round(Math.max(-12, Math.min(12, s)) * 10) / 10; Engine.setFx({ semi: s }); renderFx(); }

$('rate').addEventListener('input', e => setRate(e.target.value / 100));
$('semi').addEventListener('input', e => setSemi(e.target.value / 10));
$('rateDown').onclick = () => setRate(Engine.fx.rate - 0.05);
$('rateUp').onclick = () => setRate(Engine.fx.rate + 0.05);
$('semiDown').onclick = () => setSemi(Math.ceil(Engine.fx.semi - 1e-9) - 1);
$('semiUp').onclick = () => setSemi(Math.floor(Engine.fx.semi + 1e-9) + 1);
$('formant').onclick = () => { Engine.setFx({ formant: !Engine.fx.formant }); renderFx(); };
$('eqOn').onclick = () => { Engine.setEq({ eqOn: !Engine.fx.eqOn }); renderFx(); };
$('fxSheet').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.rate) setRate(+b.dataset.rate);
  else if (b.dataset.mode) { const m = MODES[+b.dataset.mode]; Engine.setFx({ rate: m.rate, semi: m.semi }); renderFx(); Media.pos(); }
  else if (b.dataset.eq) { Engine.setEq({ eq: EQ_PRESETS[b.dataset.eq].g.slice(), eqPreset: b.dataset.eq, eqOn: true }); renderFx(); }
});
$('bands').addEventListener('input', e => {
  const i = e.target.dataset.band; if (i == null) return;
  const eq = Engine.fx.eq.slice(); eq[+i] = +e.target.value;
  Engine.setEq({ eq, eqPreset: 'custom' }); renderFx();
});
$('fxReset').onclick = () => { Engine.setFx({ rate: 1, semi: 0, formant: true }); Engine.setEq({ eq: Engine.FREQS.map(() => 0), eqPreset: 'flat', eqOn: true }); renderFx(); Media.pos(); };
const openFx = () => { openSheet('fxSheet'); renderFx(); Engine.init().then(drawEq).catch(() => {}); };
$('chipTempo').onclick = openFx; $('chipPitch').onclick = openFx; $('chipEq').onclick = openFx;

/* ================= Şarkı ekleme ================= */
async function addFiles(files, preset) {
  const added = [];
  UI.busy(files.length > 1 ? `${files.length} şarkı okunuyor…` : 'Şarkı okunuyor…');
  for (const f of files) {
    const meta = await Tags.read(f);
    const s = Object.assign({ id: newId(), blob: f, added: Date.now() + added.length, updated: Date.now(), cloud: false, album: '', year: '' }, meta);
    if (preset) {
      Object.assign(s, { title: preset.title, artist: preset.artist, album: preset.album || s.album, year: preset.year || s.year, spId: preset.spId });
      if (preset.coverUrl) { s.coverUrl = preset.coverUrl; const b = await Img.fromUrl(preset.coverUrl); if (b) s.cover = b; }
    }
    App.songs.push(s); added.push(s);
    await DB.put('songs', s);
  }
  UI.busy(null); UI.lib(); UI.lists(); UI.now();
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

/* ================= Düzenleme sayfası ================= */
let edit = null; // {id, cover:Blob|null|undefined, coverUrl}
function edThumb() {
  const s = App.byId(edit.id);
  let url = null;
  if (edit.cover instanceof Blob) { if (edit.tmpUrl) URL.revokeObjectURL(edit.tmpUrl); edit.tmpUrl = URL.createObjectURL(edit.cover); url = edit.tmpUrl; }
  else if (edit.cover === null) url = null;
  else url = Img.url(s);
  $('edCover').innerHTML = url ? `<img src="${esc(url)}" alt="">` : initial({ title: $('edTitle').value || s.title });
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
$('coverInput').addEventListener('change', async e => {
  const f = e.target.files && e.target.files[0]; e.target.value = '';
  if (!f || !edit) return;
  edit.cover = await Img.square(f); edit.coverUrl = null; edThumb();
});
$('edCoverDel').onclick = () => { edit.cover = null; edit.coverUrl = null; edThumb(); };
$('edSpBtn').onclick = async () => {
  const q = [$('edTitle').value, $('edArtist').value].filter(Boolean).join(' ');
  const msg = $('edSpMsg'); msg.hidden = false; msg.className = 'msg'; msg.textContent = 'Aranıyor…';
  try {
    const res = await Spotify.search(q);
    edit.results = res;
    msg.textContent = res.length ? 'Doğru olana dokun:' : 'Sonuç bulunamadı. Adı düzeltip tekrar dene.';
    $('edSpRes').innerHTML = res.map((t, i) => `<div class="row" data-res="${i}">${thumb(t.coverUrl, t)}<span class="m"><div class="st">${esc(t.title)}</div><div class="sa"><span>${esc(t.artist)} · ${esc(t.album)} ${esc(t.year)}</span></div></span></div>`).join('');
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
$('edDel').onclick = async () => {
  const b = $('edDel');
  if (!b.classList.contains('sure')) { b.classList.add('sure'); b.textContent = 'Emin misin? Tekrar bas'; return; }
  const s = App.byId(edit.id); if (!s) return;
  App.songs.splice(App.songs.indexOf(s), 1); Img.drop(s.id);
  await DB.del('songs', s.id); Cloud.remove(s);
  if (App.curId === s.id) { Engine.pause(); App.curId = null; }
  closeSheet('editSheet'); UI.lib(); UI.lists(); UI.now();
  toast('Silindi');
};

/* ================= Hesap sayfası ================= */
$('acctBtn').onclick = () => { UI.account(); openSheet('acctSheet'); };
$('acctBody').addEventListener('click', async e => {
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
    e.target.disabled = false;
  }
  else if (id === 'acOut') { await Cloud.signOut(); UI.account(); UI.acctBtn(); UI.lib(); }
  else if (id === 'acSyncBtn') { Cloud.sync(); closeSheet('acctSheet'); }
  else if (id === 'acSpIn') Spotify.login();
  else if (id === 'acSpOut') { Spotify.logout(); UI.account(); UI.lists(); }
  else if (id === 'acSpImport') { closeSheet('acctSheet'); openSpImport(); }
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
    ul.innerHTML = items.map(p => `<li class="row" data-pl="${esc(p.id)}" data-name="${esc(p.name)}" data-img="${esc(p.image || '')}">${thumb(p.image, { title: p.name })}
      <span class="m"><div class="st">${esc(p.name)}</div><div class="sa"><span>${esc(p.sub)}</span></div></span><span class="mini">Aktar</span></li>`).join('');
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

/* ================= Liste görünümü olayları ================= */
function setView(v) {
  App.view = v;
  $('tabLib').setAttribute('aria-selected', v === 'lib'); $('tabLists').setAttribute('aria-selected', v === 'lists');
  $('libView').hidden = v !== 'lib'; $('listsView').hidden = v !== 'lists';
  UI.lib(); UI.lists();
}
$('tabLib').onclick = () => setView('lib');
$('tabLists').onclick = () => { App.openList = null; setView('lists'); };
$('listsView').addEventListener('click', async e => {
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
  const open = t.closest('[data-list-open]'); if (open) { App.openList = open.dataset.listOpen; return UI.lists(); }
  const at = t.closest('[data-attach]'); if (at && L) { attachTrack = L.tracks[+at.dataset.attach]; $('attachInput').click(); return; }
  const ed = t.closest('[data-edit]'); if (ed) return openEdit(ed.dataset.edit);
  const row = t.closest('[data-id]');
  if (row && L) { const q = L.tracks.map(x => App.match(x)).filter(Boolean).map(s => s.id); row.dataset.id === App.curId ? toggle() : playSong(row.dataset.id, q); }
});
$('list').addEventListener('click', e => {
  const ed = e.target.closest('[data-edit]'); if (ed) return openEdit(ed.dataset.edit);
  const row = e.target.closest('[data-id]'); if (!row) return;
  const id = row.dataset.id;
  id === App.curId && Engine.loadedId === id ? toggle() : playSong(id, App.filtered().map(s => s.id));
});
$('search').addEventListener('input', raf(() => { App.query = $('search').value; UI.lib(); }));

/* ================= Kontroller ================= */
$('play').onclick = toggle;
$('next').onclick = () => { Engine.unlock(); step(1); };
$('prev').onclick = () => { Engine.unlock(); step(-1); };
$('shuffle').onclick = () => { App.prefs.shuffle = !App.prefs.shuffle; App.savePrefs(); UI.modes(); };
$('repeat').onclick = () => { App.prefs.repeat = { off: 'all', all: 'one', one: 'off' }[App.prefs.repeat]; App.savePrefs(); UI.modes(); };
const seekEl = $('seek');
seekEl.addEventListener('input', () => {
  dragging = true; seekEl.style.setProperty('--p', (seekEl.value / 10) + '%');
  if (Engine.duration) $('cur').textContent = fmt(seekEl.value / 1000 * Engine.duration);
});
seekEl.addEventListener('change', () => { if (Engine.duration && Engine.loadedId === App.curId) Engine.seek(seekEl.value / 1000 * Engine.duration); dragging = false; });

/* ================= Başlat ================= */
(async () => {
  if (navigator.standalone) document.querySelector('.note').hidden = true;
  buildFx(); UI.modes(); UI.chips();
  await DB.open();
  const [songs, lists] = await Promise.all([DB.all('songs'), DB.all('lists')]);
  App.songs = songs; App.lists = lists; App.sortSongs();
  App.queue = App.songs.map(s => s.id);
  UI.now(); UI.lib(); UI.acctBtn();
  document.documentElement.classList.remove('booting');
  const back = await Spotify.handleRedirect();
  if (back) { setView('lists'); openSpImport(); }
  Cloud.init();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
  // ses motorunu arka planda hazırla (ilk çalışta bekleme olmasın)
  if ('requestIdleCallback' in window) requestIdleCallback(() => stretchLib().catch(() => {}));
})();

})();
