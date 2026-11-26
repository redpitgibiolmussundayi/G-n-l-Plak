/* Gönül Plak — Enstrümanlar
   Bütün sesler telefonda üretilir (dosya indirmez):
   telli sazlar Karplus-Strong tel modeliyle, keman/ney/klarnet canlı sentezle, darbuka vurmalı sentezle. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const LS = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };

  /* ------------------------------------------------------------ makamlar */
  // c: tonikten cent; n: [isim, işaret]  ('k' = koma bemol)
  const MK = [
    { id: 'major', t: 'Do Majör (do re mi)', tonic: 261.63, c: [0, 200, 400, 500, 700, 900, 1100, 1200], n: [['Do'], ['Re'], ['Mi'], ['Fa'], ['Sol'], ['La'], ['Si'], ['Do']] },
    { id: 'hicaz', t: 'Hicaz', tonic: 220, c: [0, 113, 384, 498, 702, 792, 996, 1200], n: [['La'], ['Si', '♭'], ['Do', '♯'], ['Re'], ['Mi'], ['Fa'], ['Sol'], ['La']] },
    { id: 'kurdi', t: 'Kürdi', tonic: 220, c: [0, 90, 294, 498, 702, 792, 996, 1200], n: [['La'], ['Si', '♭'], ['Do'], ['Re'], ['Mi'], ['Fa'], ['Sol'], ['La']] },
    { id: 'ussak', t: 'Uşşak', tonic: 220, c: [0, 151, 294, 498, 702, 792, 996, 1200], n: [['La'], ['Si', 'k'], ['Do'], ['Re'], ['Mi'], ['Fa'], ['Sol'], ['La']] },
    { id: 'huseyni', t: 'Hüseyni', tonic: 220, c: [0, 151, 294, 498, 702, 906, 996, 1200], n: [['La'], ['Si', 'k'], ['Do'], ['Re'], ['Mi'], ['Fa', '♯'], ['Sol'], ['La']] },
    { id: 'nihavend', t: 'Nihavend', tonic: 196, c: [0, 204, 294, 498, 702, 792, 1086, 1200], n: [['Sol'], ['La'], ['Si', '♭'], ['Do'], ['Re'], ['Mi', '♭'], ['Fa', '♯'], ['Sol']] },
    { id: 'rast', t: 'Rast', tonic: 196, c: [0, 204, 384, 498, 702, 906, 1086, 1200], n: [['Sol'], ['La'], ['Si', 'k'], ['Do'], ['Re'], ['Mi'], ['Fa', '♯'], ['Sol']] }
  ];

  /* ------------------------------------------------------------ enstrümanlar */
  const INST = {
    baglama: { t: 'Bağlama', kind: 'pluck', oct: -1, tech: 'Tezene titret', techOn: false, tip: 'Tuşa basılı tutup "Tezene titret"i açarsan tel titrer. Parmağını tuşlarda kaydırabilirsin.',
      ks: { dur: 2.8, t60: 2.2, bright: 0.82, pick: 0.14, courses: [[0, 1], [5, 0.85], [1200, 0.32]] },
      eq: [['highpass', 120, 0.7, 0], ['peaking', 340, 1.4, 4], ['peaking', 1500, 1.6, 3], ['peaking', 3200, 2, 4], ['highshelf', 6000, 0.7, -2]], vol: 0.9, trem: 68 },
    kanun: { t: 'Kanun', kind: 'pluck', oct: 0, tech: 'Mızrap titret', techOn: false, tip: 'Kanun telleri üçlü gerilir; titretince tıpkı taksim gibi akar.',
      ks: { dur: 3.6, t60: 3.0, bright: 0.9, pick: 0.11, courses: [[-4, 0.9], [0, 1], [4, 0.9]] },
      eq: [['highpass', 140, 0.7, 0], ['peaking', 260, 1.2, 3], ['peaking', 2400, 1.5, 4], ['highshelf', 5000, 0.7, 2]], vol: 0.78, trem: 58 },
    ud: { t: 'Ud', kind: 'pluck', oct: -1, tech: 'Mızrap titret', techOn: false, tip: 'Perdesiz, sıcak ve derin bir ses. Kaydırınca notalar birbirine bağlanır.',
      ks: { dur: 3.0, t60: 2.0, bright: 0.55, pick: 0.2, courses: [[0, 1], [3, 0.9]] },
      eq: [['highpass', 70, 0.7, 0], ['peaking', 180, 1.2, 5], ['peaking', 900, 1.2, 1], ['highshelf', 3500, 0.7, -5]], vol: 1.0, trem: 80 },
    keman: { t: 'Keman', kind: 'bow', oct: 1, tech: 'Ekstra vibrato', techOn: false, tip: 'Basılı tuttuğun sürece yay çeker. Parmağını kaydır, arabesk glissandosu yapsın.',
      vol: 0.5, glide: 0.09 },
    ney: { t: 'Ney', kind: 'ney', oct: 1, tech: 'Ekstra vibrato', techOn: false, tip: 'Nefesli, buğulu bir ses. Yavaş yavaş, uzun uzun çal.', vol: 0.55, glide: 0.11 },
    klarnet: { t: 'Klarnet', kind: 'reed', oct: 0, tech: 'Ekstra vibrato', techOn: false, tip: 'Roman havası için Hicaz ya da Kürdi seç, tuşlar arasında kaydır.', vol: 0.5, glide: 0.07 },
    darbuka: { t: 'Darbuka', kind: 'drum', tip: 'Düm ortaya, tek kenara. Ritim başlatıp üstüne sen de vur.' }
  };
  const ORDER = ['baglama', 'kanun', 'ud', 'keman', 'ney', 'klarnet', 'darbuka'];

  const st = Object.assign({ inst: 'baglama', mk: 'major', oct: {}, tech: {}, dem: false, rev: true, rh: 'maksum', bpm: 100 }, LS.get('gp-ens', {}));
  const save = () => LS.set('gp-ens', st);
  const I = () => INST[st.inst];
  const M = () => MK.find(m => m.id === st.mk) || MK[0];
  const octOf = id => (st.oct[id] || 0);
  const techOf = id => (st.tech[id] == null ? INST[id].techOn : st.tech[id]);

  /* ------------------------------------------------------------ ses motoru */
  let ctx = null, master = null, revSend = null, conv = null, buses = {}, noiseBuf = null;
  function audio() {
    if (ctx) { if (ctx.state !== 'running') ctx.resume(); return ctx; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
    ctx = new AC({ latencyHint: 'interactive' });
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 3.5; comp.attack.value = 0.004; comp.release.value = 0.2;
    master = ctx.createGain(); master.gain.value = 0.9; master.connect(comp).connect(ctx.destination);
    conv = ctx.createConvolver(); conv.buffer = impulse(2.3, 2.6);
    revSend = ctx.createGain(); revSend.gain.value = st.rev ? 0.26 : 0; revSend.connect(conv).connect(comp);
    setTimeout(() => loadInst(st.inst), 0);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    return ctx;
  }
  function impulse(sec, decay) {
    const sr = ctx.sampleRate, n = Math.floor(sr * sec), b = ctx.createBuffer(2, n, sr);
    for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, decay) * (i < sr * 0.012 ? i / (sr * 0.012) : 1); }
    return b;
  }
  // her enstrümanın gövde rezonansı (EQ zinciri) + yankı gönderimi
  function bus(id) {
    if (buses[id]) return buses[id];
    const inst = INST[id], g = ctx.createGain(); g.gain.value = inst.vol || 0.8;
    let head = g, tail = g;
    if (inst.eq) {
      head = null;
      for (const [type, f, q, gain] of inst.eq) { const b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; b.gain.value = gain; if (!head) head = b; else tail.connect(b); tail = b; }
      tail.connect(g); tail = g;
    }
    g.connect(master); g.connect(revSend);
    return (buses[id] = head);
  }

  /* ---- telli: Karplus-Strong (kesirli gecikme, perde konumu, çift/üçlü tel) */
  const pluckCache = new Map();
  function renderString(out, f, amp, p, sr) {
    const N = out.length, D = sr / f - 0.5, L = Math.max(2, Math.round(D));
    const g = Math.pow(10, -3 / (p.t60 * f * Math.pow(f / 220, 0.35)));
    const ys = new Float32Array(N), exc = new Float32Array(L);
    let lp = 0; const a = p.bright;
    for (let i = 0; i < L; i++) { lp = lp + a * ((Math.random() * 2 - 1) - lp); exc[i] = lp; }
    const pk = Math.max(1, Math.round(p.pick * L));
    for (let i = L - 1; i >= pk; i--) exc[i] -= exc[i - pk];          // tezenenin tele vurduğu nokta
    let mean = 0; for (let i = 0; i < L; i++) mean += exc[i]; mean /= L; for (let i = 0; i < L; i++) exc[i] -= mean;
    for (let n = 0; n < N; n++) {
      const t = n - D, i0 = Math.floor(t), fr = t - i0;
      const y0 = i0 >= 0 ? ys[i0] : 0, y1 = i0 + 1 >= 0 ? ys[i0 + 1] || 0 : 0, ym = i0 - 1 >= 0 ? ys[i0 - 1] : 0;
      const d1 = y0 + (y1 - y0) * fr, d2 = ym + (y0 - ym) * fr;
      ys[n] = (n < L ? exc[n] : 0) + g * 0.5 * (d1 + d2);
    }
    for (let n = 0; n < N; n++) out[n] += ys[n] * amp;
  }
  function pluckBuf(id, f) {
    const key = id + '|' + f.toFixed(2); if (pluckCache.has(key)) return pluckCache.get(key);
    const p = INST[id].ks, sr = ctx.sampleRate, N = Math.floor(sr * p.dur), out = new Float32Array(N);
    for (const [cents, amp] of p.courses) renderString(out, f * Math.pow(2, cents / 1200), amp, p, sr);
    let pk = 0; for (let i = 0; i < N; i++) pk = Math.max(pk, Math.abs(out[i]));
    const s = pk ? 0.6 / pk : 1, fade = Math.floor(sr * 0.25);
    for (let i = 0; i < N; i++) out[i] *= s * (i > N - fade ? (N - i) / fade : 1);
    const b = ctx.createBuffer(1, N, sr); b.getChannelData(0).set(out);
    if (pluckCache.size > 140) pluckCache.delete(pluckCache.keys().next().value);
    pluckCache.set(key, b); return b;
  }
  const ringing = {};                                       // tuş -> çalan tel
  /* ---- gerçek kayıtlar (ens/…m4a): yoksa ya da inemezse sentez yedek olarak çalar */
  let SM = null;
  fetch('ens/samples.json?t=' + Date.now(), { cache: 'no-store' }).then(r => r.json()).then(j => { SM = j; if (j.credits) { $('cr').hidden = false; $('cr').onclick = () => { $('tip').textContent = j.credits; setTimeout(() => { $('tip').textContent = INST[st.inst].tip; }, 7000); }; } audio(); loadInst(st.inst); }).catch(() => {});
  const sbuf = new Map(), sload = new Map();
  function getBuf(u) {
    if (sbuf.has(u)) return Promise.resolve(sbuf.get(u));
    if (!sload.has(u)) sload.set(u, fetch('ens/' + u).then(r => r.ok ? r.arrayBuffer() : Promise.reject(r.status))
      .then(ab => new Promise((res, rej) => ctx.decodeAudioData(ab, res, rej)))
      .then(b => { sbuf.set(u, b); return b; }, () => { sload.delete(u); return null; }));
    return sload.get(u);
  }
  const smList = id => { const L = SM && SM[id]; return !L ? [] : Array.isArray(L) ? L : Object.values(L).reduce((a2, b2) => a2.concat(b2), []); };
  function srcBadge() { const L = smList(st.inst), n = L.filter(x => sbuf.has(x.u)).length, el = $('src'); if (!el) return; el.textContent = L.length && n ? 'Gerçek kayıt' : L.length ? 'Kayıtlar iniyor…' : 'Sentez'; el.classList.toggle('on', !!(L.length && n)); }
  function loadInst(id) {
    const L = smList(id); if (!L.length || !ctx) return;
    const todo = L.filter(x => !sbuf.has(x.u)); if (!todo.length) return;
    if (id === st.inst) $('tip').textContent = 'Gerçek sesler yükleniyor…';
    srcBadge(); Promise.all(todo.map(x => getBuf(x.u).then(b => { srcBadge(); return b; }))).then(() => { if (id === st.inst) $('tip').textContent = INST[id].tip; srcBadge(); });
  }
  function nearest(id, f) {
    let best = null, bd = 1e9;
    for (const x of smList(id)) { if (!sbuf.has(x.u)) continue; const d = Math.abs(Math.log2(f / x.f)) + (x.f < f ? 0.01 : 0); if (d < bd) { bd = d; best = x; } }
    return best;
  }
  let sbusN = {};
  function sbus(id) { if (sbusN[id]) return sbusN[id]; const g = ctx.createGain(); g.gain.value = (SM && SM.vol && SM.vol[id]) || 0.9; g.connect(master); g.connect(revSend); return (sbusN[id] = g); }
  function pluck(k, f, vel) {
    const c0 = audio(), x = c0 && nearest(st.inst, f);
    if (x) {
      const c = c0, old = ringing[k]; if (old) { try { old.g.gain.setTargetAtTime(0, c.currentTime, 0.02); old.s.stop(c.currentTime + 0.12); } catch (e) {} }
      const s = c.createBufferSource(), g = c.createGain(); s.buffer = sbuf.get(x.u); s.playbackRate.value = f / x.f; g.gain.value = vel;
      s.connect(g).connect(sbus(st.inst)); s.start();
      ringing[k] = { s, g }; s.onended = () => { if (ringing[k] && ringing[k].s === s) delete ringing[k]; };
      return;
    }
    return pluckSynth(k, f, vel);
  }
  function pluckSynth(k, f, vel) {
    const c = audio(); if (!c) return;
    const old = ringing[k]; if (old) { try { old.g.gain.setTargetAtTime(0, c.currentTime, 0.015); old.s.stop(c.currentTime + 0.1); } catch (e) {} }
    const s = c.createBufferSource(), g = c.createGain(); s.buffer = pluckBuf(st.inst, f); g.gain.value = vel;
    s.connect(g).connect(bus(st.inst)); s.start();
    ringing[k] = { s, g }; s.onended = () => { if (ringing[k] && ringing[k].s === s) delete ringing[k]; };
  }

  /* ---- yaylı / nefesli: tek ses, kayarak geçiş (glissando) */
  let mono = null;
  function makeMono(id) {
    const c = audio(), inst = INST[id], t = c.currentTime;
    const out = c.createGain(); out.gain.value = 0; out.connect(bus(id));
    const lfo = c.createOscillator(), lfoG = c.createGain(); lfo.frequency.value = id === 'klarnet' ? 6.2 : id === 'ney' ? 5 : 5.7; lfoG.gain.value = 0; lfo.connect(lfoG); lfo.start(t);
    const oscs = [], add = (o, gain, mul) => { const g = c.createGain(); g.gain.value = gain; o.connect(g); lfoG.connect(o.detune); oscs.push({ o, mul: mul || 1 }); o.start(t); return g; };
    const lp = c.createBiquadFilter(); lp.type = 'lowpass';
    let noise = null;
    if (inst.kind === 'bow') {
      lp.frequency.value = 4200; lp.Q.value = 0.6;
      const a = c.createOscillator(); a.type = 'sawtooth'; a.detune.value = -5;
      const b = c.createOscillator(); b.type = 'sawtooth'; b.detune.value = 6;
      add(a, 0.5).connect(lp); add(b, 0.5).connect(lp);
      let tail = lp;
      for (const [f, q, gn] of [[290, 2.2, 7], [520, 2.5, 3], [1150, 2, -4], [2600, 2.2, 7], [3600, 3, 4]]) { const pf = c.createBiquadFilter(); pf.type = 'peaking'; pf.frequency.value = f; pf.Q.value = q; pf.gain.value = gn; tail.connect(pf); tail = pf; }
      const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 180; tail.connect(hp); hp.connect(out);
      noise = c.createBufferSource(); noise.buffer = noiseBuf; noise.loop = true;
      const nb = c.createBiquadFilter(); nb.type = 'bandpass'; nb.frequency.value = 3200; nb.Q.value = 0.8; const ng = c.createGain(); ng.gain.value = 0.035;
      noise.connect(nb).connect(ng).connect(out); noise.start(t);
    } else if (inst.kind === 'ney') {
      lp.frequency.value = 2600; lp.Q.value = 0.4;
      const a = c.createOscillator(); a.type = 'sine';
      const b = c.createOscillator(); b.type = 'sine';
      const d = c.createOscillator(); d.type = 'triangle';
      add(a, 0.8).connect(lp); add(b, 0.16, 2).connect(lp); add(d, 0.05, 3).connect(lp);
      lp.connect(out);
      noise = c.createBufferSource(); noise.buffer = noiseBuf; noise.loop = true;
      const nb = c.createBiquadFilter(); nb.type = 'bandpass'; nb.Q.value = 1.6; const ng = c.createGain(); ng.gain.value = 0.42;
      const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2500; const hg = c.createGain(); hg.gain.value = 0.05;
      noise.connect(nb).connect(ng).connect(out); noise.connect(hp).connect(hg).connect(out); noise.start(t);
      noise._bp = nb;
    } else {
      lp.frequency.value = 3000; lp.Q.value = 0.7;
      const re = new Float32Array(16), im = new Float32Array(16), amps = [0, 1, 0.08, 0.72, 0.05, 0.5, 0.04, 0.34, 0.03, 0.2, 0.02, 0.12, 0, 0.07, 0, 0.04];
      for (let i = 0; i < 16; i++) im[i] = amps[i];
      const a = c.createOscillator(); a.setPeriodicWave(c.createPeriodicWave(re, im)); add(a, 0.55).connect(lp);
      const pf = c.createBiquadFilter(); pf.type = 'peaking'; pf.frequency.value = 1400; pf.Q.value = 1.2; pf.gain.value = 4; lp.connect(pf).connect(out);
      noise = c.createBufferSource(); noise.buffer = noiseBuf; noise.loop = true;
      const nb = c.createBiquadFilter(); nb.type = 'bandpass'; nb.frequency.value = 1800; nb.Q.value = 0.7; const ng = c.createGain(); ng.gain.value = 0.02;
      noise.connect(nb).connect(ng).connect(out); noise.start(t);
    }
    return { id, out, lfoG, oscs, noise, lp, held: [], f: 0 };
  }
  function monoSetF(m, f, glide) {
    const t = ctx.currentTime;
    for (const x of m.oscs) { const p = x.o.frequency; p.cancelScheduledValues(t); if (glide) { p.setValueAtTime(p.value, t); p.exponentialRampToValueAtTime(f * x.mul, t + glide); } else p.setValueAtTime(f * x.mul, t); }
    if (m.noise && m.noise._bp) { m.noise._bp.frequency.setTargetAtTime(f * 2, t, 0.02); }
    m.f = f;
  }
  let sv = null;                                  // kayıtlı sürekli ses (keman, klarnet, ney)
  function svVoice(x, f, t, fadeIn) {
    const s = ctx.createBufferSource(), g = ctx.createGain(); s.buffer = sbuf.get(x.u); s.loop = true; s.loopStart = x.ls; s.loopEnd = x.le;
    s.playbackRate.value = f / x.f;
    let lfo = null;
    if (techOf(st.inst) && s.detune) { lfo = ctx.createOscillator(); const lg = ctx.createGain(); lfo.frequency.value = 5.6; lg.gain.value = 14; lfo.connect(lg).connect(s.detune); lfo.start(t); }
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + (fadeIn || 0.015));
    s.connect(g).connect(sbus(st.inst)); s.start(t);
    return { s, g, x, lfo };
  }
  function svStop(v, t, rel) { try { v.g.gain.cancelScheduledValues(t); v.g.gain.setValueAtTime(v.g.gain.value, t); v.g.gain.linearRampToValueAtTime(0, t + rel); v.s.stop(t + rel + 0.05); if (v.lfo) v.lfo.stop(t + rel + 0.05); } catch (e) {} }
  function svOn(k, f) {
    const t = ctx.currentTime, legato = sv && sv.held.length > 0, glide = INST[st.inst].glide;
    if (!sv) sv = { v: null, held: [], id: st.inst };
    sv.held = sv.held.filter(h => h.k !== k); sv.held.push({ k, f });
    const v = sv.v;
    if (legato && v) {
      const r = f / v.x.f;
      if (r > 0.74 && r < 1.42) { const p = v.s.playbackRate; p.cancelScheduledValues(t); p.setValueAtTime(p.value, t); p.exponentialRampToValueAtTime(r, t + glide); return; }
      const x = nearest(st.inst, f); svStop(v, t, 0.08); sv.v = svVoice(x, f, t, 0.06); return;
    }
    if (v) svStop(v, t, 0.04);
    sv.v = svVoice(nearest(st.inst, f), f, t);
  }
  function svOff(k) {
    if (!sv) return;
    const was = sv.held.length && sv.held[sv.held.length - 1].k === k;
    sv.held = sv.held.filter(h => h.k !== k);
    if (sv.held.length) { if (was && sv.v) svOn(sv.held[sv.held.length - 1].k, sv.held[sv.held.length - 1].f); return; }
    if (sv.v) { svStop(sv.v, ctx.currentTime, 0.28); sv.v = null; }
  }
  function svKill() { if (sv && sv.v && ctx) svStop(sv.v, ctx.currentTime, 0.05); sv = null; }
  function monoOn(k, f, vel) {
    const c0 = audio(); if (c0 && nearest(st.inst, f)) { if (mono) monoKill(); if (sv && sv.id !== st.inst) svKill(); return svOn(k, f); }
    const c = audio(); if (!c) return;
    if (mono && mono.id !== st.inst) monoKill();
    if (!mono) mono = makeMono(st.inst);
    const m = mono, inst = INST[m.id], t = c.currentTime, legato = m.held.length > 0;
    m.held = m.held.filter(h => h.k !== k); m.held.push({ k, f });
    monoSetF(m, f, legato ? inst.glide : 0);
    const peak = (inst.kind === 'ney' ? 0.55 : 0.6) * vel;
    const g = m.out.gain; g.cancelScheduledValues(t); g.setValueAtTime(g.value, t);
    if (!legato) {
      const atk = inst.kind === 'ney' ? 0.16 : inst.kind === 'bow' ? 0.1 : 0.045;
      g.linearRampToValueAtTime(peak * 0.75, t + atk); g.linearRampToValueAtTime(peak, t + atk + 0.45);   // yay ya da nefes kabarır
    } else g.linearRampToValueAtTime(peak, t + 0.05);
    const d = m.lfoG.gain; d.cancelScheduledValues(t); d.setValueAtTime(legato ? d.value : 0, t);
    if (techOf(m.id)) d.linearRampToValueAtTime(m.id === 'keman' ? 16 : m.id === 'ney' ? 9 : 13, t + (legato ? 0.25 : 0.4));
    else d.linearRampToValueAtTime(0, t + 0.1);
  }
  function monoOff(k) {
    if (sv) { svOff(k); if (!mono) return; }
    const m = mono; if (!m) return;
    const was = m.held.length && m.held[m.held.length - 1].k === k;
    m.held = m.held.filter(h => h.k !== k);
    if (m.held.length) { if (was) monoSetF(m, m.held[m.held.length - 1].f, INST[m.id].glide); return; }
    const t = ctx.currentTime, g = m.out.gain, rel = INST[m.id].kind === 'bow' ? 0.22 : 0.18;
    g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(0, t + rel);
  }
  function monoKill() {
    svKill();
    const m = mono; mono = null; if (!m || !ctx) return;
    const t = ctx.currentTime; m.out.gain.cancelScheduledValues(t); m.out.gain.setTargetAtTime(0, t, 0.03);
    setTimeout(() => { try { m.oscs.forEach(x => x.o.stop()); if (m.noise) m.noise.stop(); m.out.disconnect(); } catch (e) {} }, 300);
  }

  /* ---- dem (sürekli tonik sesi) */
  let dem = null;
  function demOn() {
    const c = audio(); if (!c || dem) return;
    const f = M().tonic * Math.pow(2, octOf(st.inst) + (INST[st.inst].oct || 0) - 1), t = c.currentTime;
    const g = c.createGain(); g.gain.value = 0; g.gain.linearRampToValueAtTime(0.07, t + 1.2);
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 700; lp.Q.value = 0.3;
    const os = [[f, 'sawtooth', 0.6], [f * 1.003, 'sawtooth', 0.5], [f / 2, 'triangle', 0.8], [f * 1.5, 'sine', 0.12]].map(([fr, ty, a]) => { const o = c.createOscillator(); o.type = ty; o.frequency.value = fr; const og = c.createGain(); og.gain.value = a; o.connect(og).connect(lp); o.start(t); return o; });
    lp.connect(g); g.connect(master); g.connect(revSend);
    dem = { g, os };
  }
  function demOff() { if (!dem) return; const d = dem; dem = null; const t = ctx.currentTime; d.g.gain.cancelScheduledValues(t); d.g.gain.setTargetAtTime(0, t, 0.25); setTimeout(() => d.os.forEach(o => { try { o.stop(); } catch (e) {} }), 1500); }
  function demRefresh() { if (st.dem && INST[st.inst].kind !== 'drum') { demOff(); demOn(); } else demOff(); }

  /* ---- darbuka */
  function drum(type, when, vel) {
    const c = audio(); if (!c) return;
    const D = SM && SM.darbuka && SM.darbuka[type], have = D && D.filter(x => sbuf.has(x.u));
    if (have && have.length) {
      const x = have[Math.floor(Math.random() * have.length)], t = when || c.currentTime, s = c.createBufferSource(), g = c.createGain();
      s.buffer = sbuf.get(x.u); s.playbackRate.value = 0.98 + Math.random() * 0.04; g.gain.value = (vel == null ? 1 : vel) * (x.g || 1);
      s.connect(g).connect(sbus('darbuka')); s.start(t);
      if (!when) hit(type); else setTimeout(() => hit(type), Math.max(0, (t - c.currentTime) * 1000));
      return;
    }
    const t = when || c.currentTime, v = vel == null ? 1 : vel, out = c.createGain(); out.gain.value = v; out.connect(master); out.connect(revSend);
    const env = (node, a, d, peak) => { const g = c.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0008, t + a + d); node.connect(g).connect(out); return g; };
    const nz = (f, q, type2) => { const s = c.createBufferSource(); s.buffer = noiseBuf; s.playbackRate.value = 0.8 + Math.random() * 0.4; const b = c.createBiquadFilter(); b.type = type2 || 'bandpass'; b.frequency.value = f; b.Q.value = q; s.connect(b); s.start(t, Math.random()); s.stop(t + 0.6); return b; };
    if (type === 'D') {
      const o = c.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(62, t + 0.22); o.start(t); o.stop(t + 0.7);
      env(o, 0.004, 0.55, 1.1);
      const o2 = c.createOscillator(); o2.type = 'sine'; o2.frequency.setValueAtTime(320, t); o2.frequency.exponentialRampToValueAtTime(140, t + 0.08); o2.start(t); o2.stop(t + 0.2); env(o2, 0.002, 0.09, 0.35);
      env(nz(420, 0.8, 'lowpass'), 0.002, 0.05, 0.5);
    } else if (type === 'T' || type === 'k') {
      const p = type === 'T' ? 1 : 0.5;
      env(nz(type === 'T' ? 3100 : 2600, 0.9), 0.001, 0.07, 0.9 * p);
      const o = c.createOscillator(); o.type = 'triangle'; o.frequency.value = type === 'T' ? 840 : 780; o.start(t); o.stop(t + 0.3); env(o, 0.001, 0.13, 0.35 * p);
      const o2 = c.createOscillator(); o2.type = 'sine'; o2.frequency.value = type === 'T' ? 1710 : 1560; o2.start(t); o2.stop(t + 0.2); env(o2, 0.001, 0.07, 0.18 * p);
    } else if (type === 'S') {
      env(nz(1500, 0.5), 0.001, 0.16, 1.0);
      const o = c.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(220, t); o.frequency.exponentialRampToValueAtTime(110, t + 0.1); o.start(t); o.stop(t + 0.3); env(o, 0.002, 0.15, 0.6);
    }
    setTimeout(() => { try { out.disconnect(); } catch (e) {} }, ((when ? when - c.currentTime : 0) + 1.2) * 1000);
    if (!when) hit(type); else setTimeout(() => hit(type), Math.max(0, (when - c.currentTime) * 1000));
  }
  const RHY = [
    { id: 'maksum', t: 'Maksum (4/4)', s: 'D T . T D . T .' },
    { id: 'ciftetelli', t: 'Çiftetelli (8/4)', s: 'D . . T T . D . D . . T T . . .' },
    { id: 'roman', t: 'Roman havası (9/8)', s: 'D . T . D . T k T' },
    { id: 'ayyub', t: 'Ayyub (2/4)', s: 'D k T k' },
    { id: 'malfuf', t: 'Malfuf (2/4)', s: 'D . . T . . T .' },
    { id: 'baladi', t: 'Baladi (4/4)', s: 'D D . T D . T .' }
  ];
  let rhyOn = false, rhyStep = 0, rhyNext = 0, rhyT = 0;
  function rhyLoop() {
    if (!rhyOn) return;
    const r = RHY.find(x => x.id === st.rh) || RHY[0], steps = r.s.split(' '), dt = 60 / st.bpm / 2;
    while (rhyNext < ctx.currentTime + 0.12) {
      const s = steps[rhyStep % steps.length];
      if (s !== '.') drum(s, rhyNext, s === 'D' ? 0.95 : s === 'T' ? 0.8 : 0.6);
      else if (st.bpm < 150) drum('k', rhyNext + dt / 2 * 0, 0.18);       // süsleme
      rhyNext += dt; rhyStep++;
    }
    rhyT = setTimeout(rhyLoop, 25);
  }
  function rhyToggle(on) {
    rhyOn = on == null ? !rhyOn : on; clearTimeout(rhyT);
    $('rhp').textContent = rhyOn ? '■ Durdur' : '▶ Başlat'; $('rhp').classList.toggle('on', rhyOn);
    if (rhyOn) { audio(); rhyStep = 0; rhyNext = ctx.currentTime + 0.06; rhyLoop(); }
  }

  /* ------------------------------------------------------------ tuşlar */
  const freqOf = i => { const m = M(); return m.tonic * Math.pow(2, (I().oct || 0) + octOf(st.inst) + m.c[i] / 1200); };
  const label = i => { const [n, a] = M().n[i]; return a === 'k' ? n + '<sup>♭</sup>' : n + (a || ''); };
  const plain = i => { const [n, a] = M().n[i]; return a === 'k' ? n + ' koma♭' : n + (a || ''); };
  const KEYMAP = 'asdfghjk';
  function buildKeys() {
    const m = M();
    $('keys').innerHTML = m.n.map((x, i) => `<div class="k${i === 0 || i === 7 ? ' tonic' : ''}" data-k="${i}"><b>${label(i)}</b><small>${x[1] === 'k' ? 'koma' : (matchMedia('(hover:hover)').matches ? KEYMAP[i].toUpperCase() : '')}</small></div>`).join('');
    $('pads').innerHTML = [['D', 'Düm', 'orta'], ['T', 'Tek', 'kenar'], ['k', 'Ka', 'hafif'], ['S', 'Şak', 'tokat']].map(([k, n, s]) => `<div class="pad" data-p="${k}"><span>${n}<small>${s}</small></span></div>`).join('');
  }
  const held = {};                                   // tuş -> titretme zamanlayıcısı
  function noteOn(i, rec) {
    const inst = I(), f = freqOf(i), el = $('keys').children[i];
    if (el) el.classList.add('dn');
    show(plain(i));
    if (rec !== false) recEv('on', i);
    if (inst.kind === 'pluck') {
      pluck(i, f, 0.85 + Math.random() * 0.15); strum(i, 1);
      if (techOf(st.inst)) { let up = false; clearInterval(held[i]); held[i] = setInterval(() => { up = !up; pluck(i, f, up ? 0.5 : 0.68); strum(i, 0.6); }, inst.trem); }
    } else { monoOn(i, f, 1); strum(i, 1); }
    vis.active[i] = true;
  }
  function noteOff(i, rec) {
    const el = $('keys').children[i]; if (el) el.classList.remove('dn');
    clearInterval(held[i]); delete held[i];
    if (rec !== false) recEv('off', i);
    if (I().kind !== 'pluck') monoOff(i);
    vis.active[i] = false;
  }
  function allOff() { for (const k in held) { clearInterval(held[k]); delete held[k]; } for (let i = 0; i < 8; i++) { vis.active[i] = false; const el = $('keys').children[i]; if (el) el.classList.remove('dn'); } if (mono) { mono.held = []; monoOff(-1); } }

  // çoklu dokunuş + parmak kaydırma
  const ptr = new Map();
  const keyAt = (x, y) => { const el = document.elementFromPoint(x, y); const k = el && el.closest('[data-k]'); return k ? +k.dataset.k : null; };
  $('keys').addEventListener('pointerdown', e => {
    e.preventDefault(); audio(); hintSilent();
    const k = keyAt(e.clientX, e.clientY); if (k == null) return;
    try { $('keys').setPointerCapture(e.pointerId); } catch (er) {}
    ptr.set(e.pointerId, k); noteOn(k);
  });
  $('keys').addEventListener('pointermove', e => {
    if (!ptr.has(e.pointerId)) return;
    const k = keyAt(e.clientX, e.clientY), was = ptr.get(e.pointerId);
    if (k == null || k === was) return;
    ptr.set(e.pointerId, k);
    const otherHolds = [...ptr.values()].filter(v => v === was).length;
    if (I().kind === 'pluck') { if (!otherHolds) noteOff(was); noteOn(k); }
    else { noteOn(k); if (!otherHolds) noteOff(was); }         // önce yeni nota: kayarak geçsin
  });
  const up = e => { if (!ptr.has(e.pointerId)) return; const k = ptr.get(e.pointerId); ptr.delete(e.pointerId); if (![...ptr.values()].includes(k)) noteOff(k); };
  $('keys').addEventListener('pointerup', up); $('keys').addEventListener('pointercancel', up); $('keys').addEventListener('lostpointercapture', up);
  $('pads').addEventListener('pointerdown', e => {
    e.preventDefault(); audio(); hintSilent();
    const p = e.target.closest('[data-p]'); if (!p) return;
    p.classList.add('dn'); setTimeout(() => p.classList.remove('dn'), 110);
    drum(p.dataset.p); recEv('pad', p.dataset.p);
  });
  const kd = new Set();
  addEventListener('keydown', e => {
    if (e.repeat || e.metaKey || e.ctrlKey) return;
    const ch = e.key.toLowerCase();
    if (I().kind === 'drum') { const m = { d: 'D', f: 'T', j: 'k', k: 'S' }[ch]; if (m) { audio(); drum(m); recEv('pad', m); } return; }
    const i = KEYMAP.indexOf(ch); if (i < 0 || kd.has(i)) return; kd.add(i); audio(); noteOn(i);
  });
  addEventListener('keyup', e => { const i = KEYMAP.indexOf(e.key.toLowerCase()); if (i >= 0 && kd.has(i)) { kd.delete(i); noteOff(i); } });
  addEventListener('blur', allOff);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { allOff(); rhyToggle(false); demOff(); } else if (st.dem) demRefresh(); });

  /* ------------------------------------------------------------ kayıt */
  let rec = null, recData = LS.get('gp-ens-rec', null), playing = null;
  function recEv(type, v) { if (rec) rec.ev.push([Math.round(performance.now() - rec.t0), type, v]); }
  function recSnap() { return { inst: st.inst, mk: st.mk, oct: octOf(st.inst), tech: techOf(st.inst) }; }
  $('rec').onclick = () => {
    audio();
    if (rec) {
      const r = rec; rec = null; $('rec').classList.remove('on'); $('rec').querySelector('span').textContent = 'Kaydet';
      allOff();
      if (r.ev.length) { r.len = Math.round(performance.now() - r.t0); recData = r; LS.set('gp-ens-rec', r); toast('Kaydedildi · ' + Math.round(r.len / 1000) + ' sn'); }
      updPlay(); return;
    }
    stopPlay(); rec = { t0: performance.now(), ev: [], snap: recSnap() };
    $('rec').classList.add('on'); $('rec').querySelector('span').textContent = 'Durdur'; toast('Kayıt başladı, çal bakalım');
  };
  function updPlay() { $('play').hidden = !recData; }
  function stopPlay() { if (!playing) return; playing.forEach(clearTimeout); playing = null; allOff(); $('play').textContent = '▶ Dinle'; $('play').classList.remove('on'); }
  $('play').onclick = () => {
    if (playing) return stopPlay();
    if (!recData || rec) return;
    audio(); const s = recData.snap;
    st.inst = s.inst; st.mk = s.mk; st.oct[s.inst] = s.oct; st.tech[s.inst] = s.tech; applyInst();
    playing = recData.ev.map(([t, type, v]) => setTimeout(() => {
      if (type === 'on') noteOn(v, false); else if (type === 'off') noteOff(v, false); else if (type === 'pad') { drum(v); }
      else if (type === 'set') { st.inst = v.inst; st.mk = v.mk; st.oct[v.inst] = v.oct; applyInst(); }
    }, t + 150));
    playing.push(setTimeout(stopPlay, recData.len + 2200));
    $('play').textContent = '■ Durdur'; $('play').classList.add('on');
  };

  /* ------------------------------------------------------------ arayüz */
  let toastT = 0;
  function toast(t) { const el = $('toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), 2200); }
  let nowT = 0;
  function show(t) { const el = $('now'); el.textContent = t; el.classList.add('on'); clearTimeout(nowT); nowT = setTimeout(() => el.classList.remove('on'), 900); }
  let hinted = LS.get('gp-ens-hint', false);
  function hintSilent() { if (hinted || navigator.audioSession) return; hinted = true; LS.set('gp-ens-hint', true); toast('Ses gelmiyorsa telefonun sessiz modunu kapat'); }

  function buildInsts() {
    $('insts').innerHTML = ORDER.map(id => `<button class="ic" data-i="${id}"><canvas width="92" height="68"></canvas>${INST[id].t}</button>`).join('');
    [...$('insts').children].forEach(b => { const cv = b.querySelector('canvas'), g = cv.getContext('2d'); DRAW[b.dataset.i](g, 92, 68, null, true); });
  }
  $('insts').addEventListener('click', e => {
    const b = e.target.closest('[data-i]'); if (!b || b.dataset.i === st.inst) return;
    allOff(); monoKill(); rhyToggle(false);
    st.inst = b.dataset.i; save(); applyInst();
    if (rec) recEv('set', { inst: st.inst, mk: st.mk, oct: octOf(st.inst) });
  });
  function applyInst() {
    const inst = I();
    document.body.classList.toggle('dar', inst.kind === 'drum');
    [...$('insts').children].forEach(b => b.classList.toggle('on', b.dataset.i === st.inst));
    const cur = $('insts').querySelector('.on'); if (cur && cur.scrollIntoView) cur.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    $('nm').textContent = inst.t; $('tip').textContent = inst.tip; $('sub').textContent = inst.kind === 'drum' ? 'Vur, ritim tut' : M().t;
    $('mk').value = st.mk; $('rh').value = st.rh; $('tv').textContent = st.bpm;
    if (inst.tech) { $('tech').textContent = inst.tech; $('tech').classList.toggle('on', techOf(st.inst)); }
    $('dem').classList.toggle('on', !!st.dem); $('rev').classList.toggle('on', !!st.rev);
    const o = octOf(st.inst); $('ov').textContent = o === 0 ? 'Orta' : (o > 0 ? '+' : '') + o + ' oktav';
    buildKeys(); vis.reset(); demRefresh();
    if (ctx && inst.kind === 'pluck' && !smList(st.inst).length) warm();
    if (ctx) loadInst(st.inst);
    srcBadge();
  }
  function warm() { const id = st.inst; let i = 0; const go = () => { if (st.inst !== id || i > 7) return; pluckBuf(id, freqOf(i++)); setTimeout(go, 8); }; go(); }
  $('mk').innerHTML = MK.map(m => `<option value="${m.id}">${m.t}</option>`).join('');
  $('rh').innerHTML = RHY.map(r => `<option value="${r.id}">${r.t}</option>`).join('');
  $('mk').onchange = () => { allOff(); st.mk = $('mk').value; save(); applyInst(); if (rec) recEv('set', { inst: st.inst, mk: st.mk, oct: octOf(st.inst) }); };
  $('rh').onchange = () => { st.rh = $('rh').value; save(); };
  const setOct = d => { allOff(); const o = Math.max(-2, Math.min(2, octOf(st.inst) + d)); st.oct[st.inst] = o; save(); applyInst(); if (rec) recEv('set', { inst: st.inst, mk: st.mk, oct: o }); };
  $('od').onclick = () => setOct(-1); $('ou').onclick = () => setOct(1);
  const setBpm = d => { st.bpm = Math.max(60, Math.min(200, st.bpm + d)); $('tv').textContent = st.bpm; save(); };
  $('td').onclick = () => setBpm(-8); $('tu').onclick = () => setBpm(8);
  $('rhp').onclick = () => rhyToggle();
  $('tech').onclick = () => { st.tech[st.inst] = !techOf(st.inst); save(); $('tech').classList.toggle('on', techOf(st.inst)); };
  $('dem').onclick = () => { audio(); st.dem = !st.dem; save(); $('dem').classList.toggle('on', st.dem); demRefresh(); };
  $('rev').onclick = () => { audio(); st.rev = !st.rev; save(); $('rev').classList.toggle('on', st.rev); revSend.gain.setTargetAtTime(st.rev ? 0.26 : 0, ctx.currentTime, 0.05); };
  $('back').onclick = () => { allOff(); rhyToggle(false); demOff(); try { parent.postMessage('game-exit', '*'); } catch (e) {} };

  /* ------------------------------------------------------------ çizim */
  const cv = $('cv'), g = cv.getContext('2d');
  const vis = { active: {}, amp: new Float32Array(16), notes: [], ripple: 0, reset() { this.amp.fill(0); this.notes = []; } };
  function strum(i, a) {
    vis.amp[i] = Math.max(vis.amp[i], a);
    if (Math.random() < 0.7) vis.notes.push({ x: 0.3 + Math.random() * 0.5, y: 0.75, vx: (Math.random() - 0.5) * 0.002, life: 1, ch: Math.random() < 0.5 ? '♪' : '♫' });
  }
  function hit(type) { vis.ripple = type === 'D' ? 1 : type === 'S' ? 0.8 : 0.55; vis.rtype = type; if (Math.random() < 0.6) vis.notes.push({ x: 0.45 + Math.random() * 0.1, y: 0.6, vx: (Math.random() - 0.5) * 0.004, life: 1, ch: '•' }); }
  const woodG = (ctx2, x0, y0, x1, y1, a, b) => { const gr = ctx2.createLinearGradient(x0, y0, x1, y1); gr.addColorStop(0, a); gr.addColorStop(1, b); return gr; };
  // titreşen tel: (x0,y0)-(x1,y1) arasında, genlik a
  function str(c2, x0, y0, x1, y1, a, w, col, t) {
    c2.strokeStyle = col || 'rgba(240,226,200,.85)'; c2.lineWidth = w || 1;
    c2.beginPath(); c2.moveTo(x0, y0);
    if (a > 0.01) { const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, off = Math.sin(t * 90) * a * 4; c2.quadraticCurveTo(mx, my + off, x1, y1); } else c2.lineTo(x1, y1);
    c2.stroke();
  }
  // her enstrümanın çizimi: (c2, W, H, durum, küçük?)  — durum: {amp, active, t}
  const DRAW = {
    baglama(c, W, H, s, small) {
      const cx = W * 0.27, cy = H * 0.55, rx = W * 0.2, ry = H * 0.3, t = s ? s.t : 0;
      c.save();
      // sap
      c.fillStyle = woodG(c, 0, cy - H * 0.05, 0, cy + H * 0.05, '#7a4a28', '#3a2010'); c.beginPath(); c.moveTo(cx + rx * 0.7, cy - H * 0.045); c.lineTo(W * 0.9, cy - H * 0.03); c.lineTo(W * 0.9, cy + H * 0.03); c.lineTo(cx + rx * 0.7, cy + H * 0.045); c.fill();
      // perdeler
      if (!small) { c.strokeStyle = 'rgba(230,210,170,.55)'; c.lineWidth = 1; for (let i = 0; i < 17; i++) { const x = cx + rx + (W * 0.9 - cx - rx) * (1 - Math.pow(0.9, i + 1)) * 1.12; if (x > W * 0.89) break; c.beginPath(); c.moveTo(x, cy - H * 0.04); c.lineTo(x, cy + H * 0.04); c.stroke(); } }
      // kafa + burgular
      c.fillStyle = '#4a2a16'; c.fillRect(W * 0.89, cy - H * 0.05, W * 0.08, H * 0.1);
      c.fillStyle = '#e8d6b0'; for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(W * 0.905 + i * W * 0.024, cy - H * 0.075, Math.max(1.5, H * 0.018), 0, 7); c.fill(); c.beginPath(); c.arc(W * 0.905 + i * W * 0.024, cy + H * 0.075, Math.max(1.5, H * 0.018), 0, 7); c.fill(); }
      // tekne (armut)
      c.fillStyle = woodG(c, cx - rx, cy - ry, cx + rx, cy + ry, '#9a5a2e', '#4a2412');
      c.beginPath(); c.moveTo(cx + rx * 0.95, cy); c.bezierCurveTo(cx + rx * 0.6, cy - ry * 1.05, cx - rx * 1.15, cy - ry * 1.05, cx - rx, cy); c.bezierCurveTo(cx - rx * 1.15, cy + ry * 1.05, cx + rx * 0.6, cy + ry * 1.05, cx + rx * 0.95, cy); c.fill();
      // göğüs (kapak)
      c.fillStyle = woodG(c, cx - rx, 0, cx + rx, 0, '#d9b47c', '#b98a52');
      c.beginPath(); c.moveTo(cx + rx * 0.85, cy); c.bezierCurveTo(cx + rx * 0.5, cy - ry * 0.85, cx - rx * 1.0, cy - ry * 0.85, cx - rx * 0.86, cy); c.bezierCurveTo(cx - rx * 1.0, cy + ry * 0.85, cx + rx * 0.5, cy + ry * 0.85, cx + rx * 0.85, cy); c.fill();
      c.fillStyle = '#2a1608'; c.beginPath(); c.arc(cx + rx * 0.2, cy - ry * 0.35, Math.max(1, H * 0.022), 0, 7); c.fill();
      c.fillStyle = '#3a2010'; c.fillRect(cx - rx * 0.55, cy - H * 0.05, W * 0.012, H * 0.1);
      // teller (3 çift)
      for (let i = 0; i < 3; i++) { const yo = (i - 1) * H * 0.026, a = s ? s.amp[i * 2] + s.amp[i * 2 + 1] + s.amp[(i * 3) % 8] * 0.3 : 0; str(c, cx - rx * 0.55, cy + yo, W * 0.9, cy + yo * 0.6, a, small ? 0.7 : 1.2, null, t); str(c, cx - rx * 0.55, cy + yo + 2, W * 0.9, cy + yo * 0.6 + 1.5, a * 0.8, small ? 0.5 : 0.9, null, t + 0.3); }
      c.restore();
    },
    ud(c, W, H, s, small) {
      const cx = W * 0.34, cy = H * 0.55, r = Math.min(W * 0.26, H * 0.4), t = s ? s.t : 0;
      c.fillStyle = woodG(c, cx + r * 0.6, 0, W * 0.8, 0, '#5a3218', '#2a160a'); c.beginPath(); c.moveTo(cx + r * 0.75, cy - H * 0.06); c.lineTo(W * 0.78, cy - H * 0.04); c.lineTo(W * 0.78, cy + H * 0.04); c.lineTo(cx + r * 0.75, cy + H * 0.06); c.fill();
      c.fillStyle = '#3a1f0e'; c.save(); c.translate(W * 0.78, cy); c.rotate(0.55); c.fillRect(0, -H * 0.04, W * 0.14, H * 0.08); c.fillStyle = '#e8d6b0'; for (let i = 0; i < 4; i++) { c.beginPath(); c.arc(W * 0.025 + i * W * 0.03, -H * 0.06, Math.max(1.3, H * 0.016), 0, 7); c.fill(); } c.restore();
      c.fillStyle = woodG(c, cx - r, cy - r, cx + r, cy + r, '#a06030', '#3a1c0c'); c.beginPath(); c.ellipse(cx, cy, r * 1.05, r * 0.92, 0, 0, 7); c.fill();
      c.fillStyle = woodG(c, cx - r, 0, cx + r, 0, '#e0c08a', '#b8884e'); c.beginPath(); c.ellipse(cx, cy, r * 0.92, r * 0.8, 0, 0, 7); c.fill();
      for (const [dx, dy, rr] of [[0.15, -0.28, 0.2], [0.18, 0.3, 0.13], [-0.05, 0.38, 0.11]]) { c.strokeStyle = 'rgba(60,30,10,.8)'; c.lineWidth = small ? 0.6 : 1.4; c.beginPath(); c.arc(cx + dx * r, cy + dy * r, rr * r, 0, 7); c.stroke(); if (!small) { c.fillStyle = 'rgba(40,20,8,.5)'; c.beginPath(); c.arc(cx + dx * r, cy + dy * r, rr * r * 0.6, 0, 7); c.fill(); } }
      c.fillStyle = '#2a1608'; c.fillRect(cx - r * 0.55, cy - H * 0.08, W * 0.014, H * 0.16);
      for (let i = 0; i < 6; i++) { const yo = (i - 2.5) * H * 0.024, a = s ? (s.amp[i] + s.amp[(i + 3) % 8] * 0.4) : 0; str(c, cx - r * 0.55, cy + yo, W * 0.78, cy + yo * 0.6, a, small ? 0.5 : 1, null, t); }
    },
    kanun(c, W, H, s, small) {
      const x0 = W * 0.08, x1 = W * 0.92, y0 = H * 0.2, y1 = H * 0.85, t = s ? s.t : 0;
      c.fillStyle = woodG(c, 0, y0, 0, y1, '#b07840', '#5a3418');
      c.beginPath(); c.moveTo(x0 + W * 0.12, y0); c.lineTo(x1, y0); c.lineTo(x1, y1); c.lineTo(x0, y1); c.closePath(); c.fill();
      c.fillStyle = woodG(c, 0, y0, 0, y1, '#e4c690', '#c49a60'); c.beginPath(); c.moveTo(x0 + W * 0.14, y0 + H * 0.04); c.lineTo(x1 - W * 0.17, y0 + H * 0.04); c.lineTo(x1 - W * 0.17, y1 - H * 0.04); c.lineTo(x0 + W * 0.03, y1 - H * 0.04); c.closePath(); c.fill();
      c.fillStyle = '#efe4cc'; c.fillRect(x1 - W * 0.16, y0 + H * 0.04, W * 0.13, y1 - y0 - H * 0.08);  // deri
      if (!small) { c.strokeStyle = 'rgba(90,50,20,.6)'; for (const [cx2, cy2, rr] of [[0.42, 0.5, 0.06], [0.6, 0.62, 0.04]]) { c.beginPath(); c.arc(W * cx2, H * cy2, H * rr * 2, 0, 7); c.stroke(); } }
      c.fillStyle = '#d8c8a0'; const n = small ? 9 : 26;
      for (let i = 0; i < n; i++) { const fy = y0 + H * 0.06 + (y1 - y0 - H * 0.12) * i / (n - 1); const lx = x0 + W * 0.03 + (W * 0.11) * (1 - (fy - y0) / (y1 - y0)); if (!small) c.fillRect(lx - 4, fy - 1.5, 6, 3);
        const k = Math.floor(i / n * 8), a = s ? s.amp[7 - k] * (i % 3 === 1 ? 1 : 0.7) : 0; str(c, lx, fy, x1 - W * 0.06, fy, a * 0.6, small ? 0.4 : 0.8, 'rgba(250,240,220,.8)', t + i); }
    },
    keman(c, W, H, s, small) {
      const cx = W * 0.36, cy = H * 0.55, L = W * 0.26, Hh = H * 0.27, t = s ? s.t : 0;
      c.fillStyle = '#1e120a'; c.beginPath(); c.moveTo(cx + L * 0.85, cy - H * 0.03); c.lineTo(W * 0.84, cy - H * 0.025); c.lineTo(W * 0.84, cy + H * 0.025); c.lineTo(cx + L * 0.85, cy + H * 0.03); c.fill();
      c.fillStyle = '#6a3214'; c.beginPath(); c.arc(W * 0.87, cy, H * 0.055, 0, 7); c.fill(); c.fillStyle = '#3a1a08'; c.beginPath(); c.arc(W * 0.87, cy, H * 0.025, 0, 7); c.fill();
      c.fillStyle = woodG(c, cx - L, cy - Hh, cx + L, cy + Hh, '#c0601e', '#6a2a08');
      c.beginPath(); c.moveTo(cx - L, cy);
      c.bezierCurveTo(cx - L, cy - Hh * 1.1, cx - L * 0.35, cy - Hh * 1.15, cx - L * 0.2, cy - Hh * 0.62);
      c.bezierCurveTo(cx - L * 0.05, cy - Hh * 0.55, cx + L * 0.12, cy - Hh * 0.55, cx + L * 0.22, cy - Hh * 0.62);
      c.bezierCurveTo(cx + L * 0.35, cy - Hh * 1.0, cx + L * 0.9, cy - Hh * 0.95, cx + L * 0.88, cy);
      c.bezierCurveTo(cx + L * 0.9, cy + Hh * 0.95, cx + L * 0.35, cy + Hh * 1.0, cx + L * 0.22, cy + Hh * 0.62);
      c.bezierCurveTo(cx + L * 0.12, cy + Hh * 0.55, cx - L * 0.05, cy + Hh * 0.55, cx - L * 0.2, cy + Hh * 0.62);
      c.bezierCurveTo(cx - L * 0.35, cy + Hh * 1.15, cx - L, cy + Hh * 1.1, cx - L, cy); c.fill();
      if (!small) { c.strokeStyle = '#1a0a02'; c.lineWidth = 2; for (const sg of [-1, 1]) { c.beginPath(); c.moveTo(cx - L * 0.1, cy + sg * Hh * 0.42); c.bezierCurveTo(cx, cy + sg * Hh * 0.3, cx + L * 0.05, cy + sg * Hh * 0.5, cx + L * 0.15, cy + sg * Hh * 0.38); c.stroke(); } }
      c.fillStyle = '#e0c89a'; c.fillRect(cx - L * 0.02, cy - H * 0.05, W * 0.008, H * 0.1);
      c.fillStyle = '#1a0e06'; c.beginPath(); c.moveTo(cx - L * 0.9, cy - H * 0.035); c.lineTo(cx - L * 0.55, cy - H * 0.02); c.lineTo(cx - L * 0.55, cy + H * 0.02); c.lineTo(cx - L * 0.9, cy + H * 0.035); c.fill();
      for (let i = 0; i < 4; i++) { const yo = (i - 1.5) * H * 0.016, a = s ? s.amp[i * 2] * 0.5 + s.amp[i * 2 + 1] * 0.5 : 0; str(c, cx - L * 0.6, cy + yo * 1.4, W * 0.85, cy + yo * 0.7, a * 0.4, small ? 0.5 : 0.9, null, t); }
      // yay
      if (!small) { const on = s && Object.values(s.active).some(Boolean), bx = on ? Math.sin(t * 2.2) * W * 0.12 : 0;
        c.save(); c.translate(cx + L * 0.08 + bx, cy); c.rotate(-1.45); c.strokeStyle = '#3a2410'; c.lineWidth = 3; c.beginPath(); c.moveTo(-H * 0.45, 0); c.lineTo(H * 0.45, 0); c.stroke(); c.strokeStyle = 'rgba(245,240,230,.85)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(-H * 0.43, 5); c.lineTo(H * 0.43, 5); c.stroke(); c.restore(); }
    },
    ney(c, W, H, s, small) {
      const y = H * 0.55, x0 = W * 0.06, x1 = W * 0.94, r = Math.max(2.5, H * 0.045);
      c.fillStyle = woodG(c, 0, y - r, 0, y + r, '#e8cc8a', '#a8803e'); c.beginPath(); c.roundRect ? c.roundRect(x0, y - r, x1 - x0, r * 2, r) : c.rect(x0, y - r, x1 - x0, r * 2); c.fill();
      c.strokeStyle = 'rgba(120,80,30,.7)'; c.lineWidth = small ? 0.8 : 2; for (let i = 1; i < 9; i++) { const x = x0 + (x1 - x0) * i / 9; c.beginPath(); c.moveTo(x, y - r); c.lineTo(x, y + r); c.stroke(); }
      c.fillStyle = '#2a1a0a'; c.fillRect(x0 - W * 0.01, y - r * 1.15, W * 0.035, r * 2.3);   // başpare
      for (let i = 0; i < 7; i++) { const x = x0 + (x1 - x0) * (0.42 + i * 0.065), on = s && s.active[7 - i];
        c.fillStyle = on ? '#ffd27a' : '#3a240e'; if (on && !small) { c.shadowColor = '#ffb84c'; c.shadowBlur = 14; } c.beginPath(); c.ellipse(x, y - r * 0.1, r * 0.42, r * 0.36, 0, 0, 7); c.fill(); c.shadowBlur = 0; }
      if (s && Object.values(s.active).some(Boolean) && !small) { c.fillStyle = 'rgba(255,240,210,.25)'; for (let i = 0; i < 6; i++) { const p = (s.t * 0.8 + i / 6) % 1; c.beginPath(); c.arc(x0 - W * 0.02 - p * W * 0.05, y - p * H * 0.2 + Math.sin(i * 3 + s.t * 3) * 6, 2 + p * 6, 0, 7); c.fill(); } }
    },
    klarnet(c, W, H, s, small) {
      const y = H * 0.55, x0 = W * 0.06, x1 = W * 0.8, r = Math.max(2.5, H * 0.05);
      c.fillStyle = woodG(c, 0, y - r, 0, y + r, '#3a3a3e', '#0c0c0e'); c.fillRect(x0, y - r, x1 - x0, r * 2);
      c.fillStyle = '#0c0c0e'; c.beginPath(); c.moveTo(x1, y - r); c.quadraticCurveTo(W * 0.88, y - r, W * 0.95, y - r * 3); c.lineTo(W * 0.95, y + r * 3); c.quadraticCurveTo(W * 0.88, y + r, x1, y + r); c.fill();
      c.fillStyle = '#cfd2d8'; for (const x of [0.2, 0.36, 0.52, 0.68]) c.fillRect(W * x, y - r * 1.05, W * 0.012, r * 2.1);
      c.fillStyle = '#d8b878'; c.fillRect(x0 - W * 0.02, y - r * 0.7, W * 0.03, r * 1.4);
      for (let i = 0; i < 7; i++) { const x = x0 + (x1 - x0) * (0.12 + i * 0.12), on = s && s.active[7 - i]; c.fillStyle = on ? '#ffd27a' : '#b8bcc4'; if (on && !small) { c.shadowColor = '#ffb84c'; c.shadowBlur = 14; } c.beginPath(); c.arc(x, y, r * 0.42, 0, 7); c.fill(); c.shadowBlur = 0; }
    },
    darbuka(c, W, H, s, small) {
      const cx = W * 0.5, top = H * 0.2, R = Math.min(W * 0.3, H * 0.36), t = s ? s.t : 0;
      c.fillStyle = woodG(c, cx - R, 0, cx + R, 0, '#8a6a30', '#d8b860');
      c.beginPath(); c.moveTo(cx - R, top + R * 0.25); c.bezierCurveTo(cx - R * 1.05, top + R * 1.2, cx - R * 0.3, top + R * 1.1, cx - R * 0.3, top + R * 1.55); c.lineTo(cx - R * 0.45, H * 0.95); c.lineTo(cx + R * 0.45, H * 0.95); c.lineTo(cx + R * 0.3, top + R * 1.55); c.bezierCurveTo(cx + R * 0.3, top + R * 1.1, cx + R * 1.05, top + R * 1.2, cx + R, top + R * 0.25); c.fill();
      if (!small) { c.strokeStyle = 'rgba(60,40,10,.5)'; c.lineWidth = 2; for (let i = 0; i < 9; i++) { const a = -1 + i * 0.25; c.beginPath(); c.moveTo(cx + a * R * 0.9, top + R * 0.35); c.quadraticCurveTo(cx + a * R * 0.6, top + R * 1.1, cx + a * R * 0.28, top + R * 1.5); c.stroke(); } }
      c.fillStyle = '#c8c0b0'; c.beginPath(); c.ellipse(cx, top + R * 0.25, R * 1.02, R * 0.3, 0, 0, 7); c.fill();
      const rp = s ? s.ripple : 0;
      c.fillStyle = '#f2ead8'; c.beginPath(); c.ellipse(cx, top + R * 0.25, R * 0.95, R * 0.26, 0, 0, 7); c.fill();
      if (rp > 0.02) { c.strokeStyle = `rgba(240,180,76,${rp})`; c.lineWidth = 2; for (let i = 1; i <= 3; i++) { const k = (1 - rp) * i / 3 + 0.15; c.beginPath(); c.ellipse(cx, top + R * 0.25, R * 0.95 * k, R * 0.26 * k, 0, 0, 7); c.stroke(); } }
    }
  };
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const r = cv.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1), W = Math.round(r.width * dpr), H = Math.round(r.height * dpr);
    if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
    g.clearRect(0, 0, W, H);
    for (let i = 0; i < 16; i++) vis.amp[i] = vis.active[i] && I().kind !== 'pluck' ? Math.max(vis.amp[i], 0.35) : vis.amp[i] * Math.pow(0.04, dt);
    vis.ripple *= Math.pow(0.02, dt);
    const top = Math.min(H * 0.32, 66 * dpr), sx = W * 0.04;
    g.save(); g.translate(sx, top);
    DRAW[st.inst](g, W - sx * 2, H - top - 6 * dpr, { amp: vis.amp, active: vis.active, t: now / 1000, ripple: vis.ripple }, false);
    g.restore();
    g.font = `${Math.round(22 * dpr)}px Georgia,serif`; g.textAlign = 'center';
    vis.notes = vis.notes.filter(n => (n.life -= dt * 0.7) > 0);
    for (const n of vis.notes) { n.y -= dt * 0.25; n.x += n.vx; g.fillStyle = `rgba(255,210,122,${n.life})`; g.fillText(n.ch, n.x * W, n.y * H); }
    requestAnimationFrame(frame);
  }

  buildInsts(); applyInst(); updPlay(); requestAnimationFrame(frame);
})();
