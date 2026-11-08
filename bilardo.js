/* Gönül Plak · Bilardo (8 top)
   Kendi başına çalışan modül: fizik, kurallar, bilgisayar rakip, çizim, dokunmatik kontroller, sesler.
   Masa ölçüleri milimetre, zaman milisaniye. Masa fizikte hep yatay; dik ekranda 90° döndürülerek çizilir. */
(() => {
  'use strict';
  const L = 2540, W = 1270, R = 38, D = 2 * R; // toplar telefonda rahat görünsün diye gerçeğinden biraz iri
  const FRICTION = 0.00085;      // yuvarlanma yavaşlaması (mm/ms²)
  const VMAX = 5.6;               // en sert vuruş (mm/ms)
  const E_BALL = 0.95, E_RAIL = 0.74;
  const CORNER_GAP = 138, SIDE_GAP = 80;
  const POCKETS = [
    { x: -18, y: -18, r: 80, c: 1 }, { x: L / 2, y: -44, r: 76, c: 0 }, { x: L + 18, y: -18, r: 80, c: 1 },
    { x: -18, y: W + 18, r: 80, c: 1 }, { x: L / 2, y: W + 44, r: 76, c: 0 }, { x: L + 18, y: W + 18, r: 80, c: 1 }];
  // bant parçaları (top merkezinin gidebileceği sınır = bant çizgisi ± R)
  const RAILS = [
    { a: [CORNER_GAP, 0], b: [L / 2 - SIDE_GAP, 0], n: [0, 1] }, { a: [L / 2 + SIDE_GAP, 0], b: [L - CORNER_GAP, 0], n: [0, 1] },
    { a: [CORNER_GAP, W], b: [L / 2 - SIDE_GAP, W], n: [0, -1] }, { a: [L / 2 + SIDE_GAP, W], b: [L - CORNER_GAP, W], n: [0, -1] },
    { a: [0, CORNER_GAP], b: [0, W - CORNER_GAP], n: [1, 0] }, { a: [L, CORNER_GAP], b: [L, W - CORNER_GAP], n: [-1, 0] }];
  const JAWS = []; RAILS.forEach(r => { JAWS.push(r.a, r.b); });
  const COLORS = { 1: '#f2c21b', 2: '#1f4fb8', 3: '#d4271f', 4: '#5b2a86', 5: '#f2731c', 6: '#1c7a3c', 7: '#7a1f1f', 8: '#111111' };
  const colorOf = n => COLORS[n > 8 ? n - 8 : n] || '#fff';
  const LS = { get: (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }, set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };

  // ---------- durum
  let root, cv, g, dpr = 1, portrait = false, S = 0.2, ox = 0, oy = 0, cw = 0, ch = 0, felt = null, feltKey = '';
  let balls = [], moving = false, raf = 0, lastT = 0, visible = false;
  let aim = 0, power = 0, spin = { x: 0, y: 0 }, aimFine = false;
  let mode = LS.get('gp-pool-mode', 'cpu'), level = LS.get('gp-pool-lvl', 'orta');
  let turn = 0, groups = [null, null], open = true, breakShot = true, inHand = 'kitchen', over = null, msg = '', msgT = 0;
  let shot = null; // atış sırasında olanlar
  let stick = null; // isteka animasyonu
  let wins = LS.get('gp-pool-wins', [0, 0]);
  let cpuBusy = false, soundOn = LS.get('gp-pool-snd', true);
  const names = () => mode === 'cpu' ? ['Sen', 'Bilgisayar'] : mode === 'iki' ? ['1. Oyuncu', '2. Oyuncu'] : ['Antrenman', ''];

  // ---------- ses (kısa, kuru tık sesleri; kalabalık falan yok)
  let ac = null;
  function audio() { if (ac || !soundOn) return ac; try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} return ac; }
  function tick(kind, v) {
    if (!soundOn) return; const c = audio(); if (!c) return; if (c.state !== 'running') c.resume().catch(() => {});
    const t = c.currentTime, vol = Math.min(1, v);
    if (vol < 0.02) return;
    const len = kind === 'pocket' ? 0.25 : kind === 'rail' ? 0.09 : 0.05, b = c.createBuffer(1, Math.floor(c.sampleRate * len), c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) { const u = i / d.length; d[i] = (Math.random() * 2 - 1) * Math.exp(-u * (kind === 'ball' ? 9 : kind === 'rail' ? 7 : 4)); }
    const s = c.createBufferSource(); s.buffer = b;
    const f = c.createBiquadFilter(); f.type = kind === 'ball' ? 'bandpass' : 'lowpass'; f.frequency.value = kind === 'ball' ? 3200 : kind === 'rail' ? 420 : 260; f.Q.value = kind === 'ball' ? 1.4 : 0.8;
    const gn = c.createGain(); gn.gain.value = (kind === 'ball' ? 0.9 : kind === 'cue' ? 0.6 : 0.8) * vol;
    s.connect(f).connect(gn).connect(c.destination); s.start(t);
    if (kind === 'ball' || kind === 'cue') { const o = c.createOscillator(), og = c.createGain(); o.frequency.value = kind === 'cue' ? 900 : 2600 + Math.random() * 600; og.gain.setValueAtTime(0.25 * vol, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.03); o.connect(og).connect(c.destination); o.start(t); o.stop(t + 0.04); }
  }

  // ---------- toplar
  function newBall(n, x, y) { return { n, x, y, vx: 0, vy: 0, in: false, sink: 0, q: [Math.random() * 2 - 1, Math.random() * 2 - 1, 1].map((v, i, a) => v / Math.hypot(a[0], a[1], a[2])) }; }
  function rack() {
    balls = [newBall(0, L * 0.25, W / 2)];
    const fx = L * 0.72, rows = [];
    // 8 ortada, arka köşelerde bir düz bir çizgili
    const solids = [1, 2, 3, 4, 5, 6, 7], stripes = [9, 10, 11, 12, 13, 14, 15];
    const shuf = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    shuf(solids); shuf(stripes);
    const order = new Array(15).fill(0); // satır satır: 1,2,3,4,5
    const cornerA = solids.pop(), cornerB = stripes.pop();
    const rest = shuf(solids.concat(stripes));
    let idx = 0;
    for (let r = 0; r < 5; r++) for (let k = 0; k <= r; k++) {
      let n;
      if (r === 2 && k === 1) n = 8; else if (r === 4 && k === 0) n = cornerA; else if (r === 4 && k === 4) n = cornerB; else n = rest[idx++];
      const x = fx + r * D * 0.866 + (Math.random() - 0.5) * 0.4, y = W / 2 + (k - r / 2) * (D + 0.25);
      balls.push(newBall(n, x, y));
    }
    turn = 0; groups = [null, null]; open = true; breakShot = true; inHand = 'kitchen'; over = null; aim = 0; power = 0; spin = { x: 0, y: 0 };
    say(mode === 'pratik' ? 'Antrenman: istediğin gibi vur' : `${names()[0]} açıyor`);
  }
  const cue = () => balls[0];
  const live = () => balls.filter(b => !b.in);
  const groupOf = n => n === 0 ? null : n === 8 ? 8 : n < 8 ? 'duz' : 'cizgili';

  // ---------- fizik
  function step(dt) {
    let any = false;
    for (const b of balls) {
      if (b.in) { if (b.sink < 1) { b.sink = Math.min(1, b.sink + dt / 220); any = true; } continue; }
      const sp = Math.hypot(b.vx, b.vy); if (sp === 0) continue;
      any = true;
      const ns = Math.max(0, sp - FRICTION * dt);
      if (ns < 0.004) { b.vx = b.vy = 0; continue; }
      b.vx *= ns / sp; b.vy *= ns / sp;
      b.x += b.vx * dt; b.y += b.vy * dt;
      // yuvarlanma: kutup vektörünü döndür
      const ax = -b.vy / R * dt, ay = b.vx / R * dt; rot(b.q, ax, ay);
    }
    // top-top
    for (let i = 0; i < balls.length; i++) {
      const a = balls[i]; if (a.in) continue;
      for (let j = i + 1; j < balls.length; j++) {
        const b = balls[j]; if (b.in) continue;
        const dx = b.x - a.x, dy = b.y - a.y, d2 = dx * dx + dy * dy;
        if (d2 >= D * D || d2 === 0) continue;
        const d = Math.sqrt(d2), nx = dx / d, ny = dy / d, ov = D - d;
        a.x -= nx * ov / 2; a.y -= ny * ov / 2; b.x += nx * ov / 2; b.y += ny * ov / 2;
        const rv = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
        if (rv <= 0) continue;
        const jimp = rv * (1 + E_BALL) / 2;
        a.vx -= jimp * nx; a.vy -= jimp * ny; b.vx += jimp * nx; b.vy += jimp * ny;
        tick('ball', rv / 3);
        if (shot) {
          if (!shot.first && (a.n === 0 || b.n === 0)) {
            shot.first = a.n === 0 ? b.n : a.n;
            // istekaya verilen falso: takip / geri çekme
            const c = a.n === 0 ? a : b;
            if (shot.spin.y) { const k = shot.spin.y * shot.v0 * 0.55; c.vx += shot.dir[0] * k; c.vy += shot.dir[1] * k; }
          }
          shot.contacts++;
        }
      }
    }
    // bantlar, ağız köşeleri, cepler
    for (const b of balls) {
      if (b.in) continue;
      for (const p of POCKETS) { const dx = b.x - p.x, dy = b.y - p.y; if (dx * dx + dy * dy < (p.r - R * 0.35) ** 2) { pot(b, p); break; } }
      if (b.in) continue;
      for (const r of RAILS) {
        const [nx, ny] = r.n, along = nx === 0 ? b.x : b.y, lo = nx === 0 ? r.a[0] : r.a[1], hi = nx === 0 ? r.b[0] : r.b[1];
        if (along < lo || along > hi) continue;
        const pos = nx === 0 ? b.y : b.x, line = nx === 0 ? r.a[1] : r.a[0], dist = (pos - line) * (nx + ny);
        if (dist < R) {
          if (nx === 0) b.y = line + ny * R; else b.x = line + nx * R;
          const vn = b.vx * nx + b.vy * ny;
          if (vn < 0) {
            b.vx -= (1 + E_RAIL) * vn * nx; b.vy -= (1 + E_RAIL) * vn * ny;
            // yan falso bantta açıyı değiştirir
            if (b.n === 0 && shot && shot.spin.x && shot.rails < 2) { const tx = -ny, ty = nx, k = shot.spin.x * Math.abs(vn) * 0.35; b.vx += tx * k; b.vy += ty * k; }
            b.vx *= 0.97; b.vy *= 0.97;
            tick('rail', -vn / 3);
            if (shot) { shot.rails++; if (shot.first) shot.railAfter = true; }
          }
        }
      }
      for (const j of JAWS) {
        const dx = b.x - j[0], dy = b.y - j[1], d2 = dx * dx + dy * dy;
        if (d2 < R * R && d2 > 0) { const d = Math.sqrt(d2), nx = dx / d, ny = dy / d; b.x = j[0] + nx * R; b.y = j[1] + ny * R; const vn = b.vx * nx + b.vy * ny; if (vn < 0) { b.vx -= (1 + E_RAIL) * vn * nx; b.vy -= (1 + E_RAIL) * vn * ny; tick('rail', -vn / 4); if (shot && shot.first) shot.railAfter = true; } }
      }
      // ağızdan dışarı kaçarsa cebe düşmüş say
      if (b.x < -R * 3 || b.x > L + R * 3 || b.y < -R * 3 || b.y > W + R * 3) { let best = POCKETS[0], bd = 1e9; for (const p of POCKETS) { const d = Math.hypot(b.x - p.x, b.y - p.y); if (d < bd) { bd = d; best = p; } } pot(b, best); }
    }
    return any;
  }
  function rot(q, ax, ay) {
    // küçük açılı döndürme (x ve y eksenleri etrafında)
    let [x, y, z] = q;
    let c = Math.cos(ax), s = Math.sin(ax); [y, z] = [y * c - z * s, y * s + z * c];
    c = Math.cos(ay); s = Math.sin(ay); [x, z] = [x * c + z * s, -x * s + z * c];
    const m = Math.hypot(x, y, z) || 1; q[0] = x / m; q[1] = y / m; q[2] = z / m;
  }
  function pot(b, p) {
    b.in = true; b.sink = 0; b.px = p.x; b.py = p.y; b.vx = b.vy = 0;
    tick('pocket', 0.8);
    if (shot) shot.potted.push(b.n);
  }

  // ---------- atış
  function shoot(dirAng, pw, sp) {
    const c = cue(), v = Math.max(0.15, pw) * VMAX, dir = [Math.cos(dirAng), Math.sin(dirAng)];
    c.vx = dir[0] * v; c.vy = dir[1] * v;
    shot = { player: turn, first: null, potted: [], contacts: 0, rails: 0, railAfter: false, v0: v, dir, spin: Object.assign({}, sp || spin), breakShot };
    inHand = null; moving = true; power = 0;
    tick('cue', pw);
    kick();
  }
  function settle() {
    // atış bitti: kuralları uygula
    const sh = shot; shot = null; if (!sh) return;
    const me = sh.player, them = 1 - me, cueIn = cue().in;
    const pottedObj = sh.potted.filter(n => n !== 0);
    if (mode === 'pratik') {
      if (cueIn) { respot(); inHand = 'any'; say('Beyaz top düştü, istediğin yere koy'); }
      else say(pottedObj.length ? 'Güzel! ' + pottedObj.length + ' top' : 'Devam');
      if (live().length === 1) { say('Masa temizlendi! Yeniden diziliyor'); setTimeout(rack, 1600); }
      breakShot = false; return finishTurn();
    }
    let foul = null;
    const myG = groups[me];
    const onEight = myG && !live().some(b => groupOf(b.n) === myG);
    if (cueIn) foul = 'Beyaz top cebe girdi';
    else if (!sh.first) foul = 'Hiçbir topa değmedi';
    else if (!sh.breakShot) {
      if (open) { if (sh.first === 8) foul = 'Önce 8 numaraya vurulmaz'; }
      else if (onEight) { if (sh.first !== 8) foul = 'Önce 8 numaraya vurmalıydın'; }
      else if (groupOf(sh.first) !== myG) foul = 'Önce kendi grubuna vurmalıydın';
      if (!foul && !pottedObj.length && !sh.railAfter) foul = 'Temastan sonra hiçbir top banda değmedi';
    }
    // 8 numara
    if (pottedObj.includes(8)) {
      if (sh.breakShot && !foul) { respot8(); say('Açılışta 8 düştü, yerine kondu'); }
      else if (!foul && onEight) return win(me, mode === 'cpu' && me === 0 ? '8 numarayı soktun, oyun senin!' : `${names()[me]} 8 numarayı soktu!`);
      else return win(them, foul ? `${foul} ve 8 düştü. ${names()[them]} kazandı` : `8 numara erken düştü. ${names()[them]} kazandı`);
    }
    // grup belirleme
    if (open && !foul && !sh.breakShot) {
      const first = pottedObj.find(n => n !== 8);
      if (first) { const gp = groupOf(first); groups[me] = gp; groups[them] = gp === 'duz' ? 'cizgili' : 'duz'; open = false; }
    }
    breakShot = false;
    if (cueIn) respot();
    if (foul) { turn = them; inHand = 'any'; say(`Faul: ${foul}. ${names()[them]} beyaz topu istediği yere koyar`); return finishTurn(); }
    const mine = pottedObj.filter(n => n !== 8 && (open || groupOf(n) === groups[me]));
    if (mine.length || (sh.breakShot && pottedObj.length)) { say(`${names()[me]} devam ediyor`); }
    else { turn = them; say(`Sıra ${names()[them]}${mode === 'cpu' && them === 0 ? 'de' : 'da'}`); }
    finishTurn();
  }
  function finishTurn() { hud(); if (mode === 'cpu' && turn === 1 && !over) setTimeout(cpuMove, 900); }
  function respot() { const c = cue(); c.in = false; c.sink = 0; c.vx = c.vy = 0; place(c, L * 0.25, W / 2); }
  function respot8() { const b = balls.find(x => x.n === 8); b.in = false; b.sink = 0; place(b, L * 0.72, W / 2); }
  function place(b, x, y) {
    for (let k = 0; k < 200; k++) { const ok = !balls.some(o => o !== b && !o.in && Math.hypot(o.x - x, o.y - y) < D + 0.5); if (ok) { b.x = x; b.y = y; return; } x += (Math.random() - 0.5) * D; y += (Math.random() - 0.5) * D; x = Math.max(R, Math.min(L - R, x)); y = Math.max(R, Math.min(W - R, y)); }
    b.x = x; b.y = y;
  }
  function win(p, text) {
    over = { p, text }; if (mode !== 'pratik') { wins[p]++; LS.set('gp-pool-wins', wins); }
    say(text); hud(); draw();
  }
  function say(t) { msg = t; msgT = performance.now(); const el = root && root.querySelector('.pmsg'); if (el) { el.textContent = t; el.classList.remove('fade'); void el.offsetWidth; el.classList.add('show'); } }

  // ---------- bilgisayar rakip
  const LV = { kolay: { err: 2.6, think: 1400 }, orta: { err: 1.1, think: 1100 }, zor: { err: 0.35, think: 900 } };
  function targetsFor(p) {
    const gp = groups[p];
    if (open) return live().filter(b => b.n !== 0 && b.n !== 8);
    const mine = live().filter(b => groupOf(b.n) === gp);
    return mine.length ? mine : live().filter(b => b.n === 8);
  }
  function clearPath(x1, y1, x2, y2, skip, rad) {
    const dx = x2 - x1, dy = y2 - y1, len2 = dx * dx + dy * dy || 1;
    for (const o of live()) {
      if (skip.includes(o)) continue;
      const t = Math.max(0, Math.min(1, ((o.x - x1) * dx + (o.y - y1) * dy) / len2)), px = x1 + dx * t, py = y1 + dy * t;
      if (Math.hypot(o.x - px, o.y - py) < rad) return false;
    }
    return true;
  }
  function bestShot(cx, cy) {
    let best = null; const c = cue();
    for (const t of targetsFor(turn)) for (const p of POCKETS) {
      const tx = p.x + (p.c ? (p.x < L / 2 ? 18 : -18) : 0), ty = p.y + (p.y < W / 2 ? 22 : -22);
      const dx = tx - t.x, dy = ty - t.y, d2 = Math.hypot(dx, dy), ux = dx / d2, uy = dy / d2;
      const gx = t.x - ux * D, gy = t.y - uy * D;
      const ax = gx - cx, ay = gy - cy, d1 = Math.hypot(ax, ay); if (d1 < 1) continue;
      const cos = (ax * ux + ay * uy) / d1; if (cos < 0.26) continue;
      // köşe ceplerde çok dar açıdan girmez
      if (!p.c && Math.abs(uy) < 0.35) continue;
      if (!clearPath(cx, cy, gx, gy, [c, t], D - 1)) continue;
      if (!clearPath(t.x, t.y, tx, ty, [t, c], D - 1)) continue;
      const score = cos * cos * cos / (1 + d1 / 900 + d2 / 700);
      if (!best || score > best.score) best = { score, ang: Math.atan2(ay, ax), pw: Math.min(1, 0.22 + (d1 / cos * 0.6 + d2) / 3800), t };
    }
    return best;
  }
  function cpuMove() {
    if (over || turn !== 1 || mode !== 'cpu' || moving) return;
    cpuBusy = true;
    const lv = LV[level] || LV.orta;
    if (inHand) {
      // en iyi atış veren yere koy
      let bestPos = null;
      for (let k = 0; k < 160; k++) {
        const x = inHand === 'kitchen' ? R + Math.random() * (L * 0.25 - R) : R + Math.random() * (L - 2 * R), y = R + Math.random() * (W - 2 * R);
        if (balls.some(o => o.n !== 0 && !o.in && Math.hypot(o.x - x, o.y - y) < D + 2)) continue;
        const bs = bestShot(x, y); if (bs && (!bestPos || bs.score > bestPos.s)) bestPos = { x, y, s: bs.score };
      }
      if (bestPos) { cue().x = bestPos.x; cue().y = bestPos.y; } else respot();
    }
    let ang, pw;
    if (breakShot) { const apex = balls.find(b => b.n !== 0 && !b.in && Math.abs(b.y - W / 2) < 2 && b.x < L * 0.75) || balls[1]; ang = Math.atan2(apex.y - cue().y, apex.x - cue().x) + (Math.random() - 0.5) * 0.01; pw = 1; }
    else {
      const bs = bestShot(cue().x, cue().y);
      if (bs) { ang = bs.ang; pw = bs.pw; }
      else { // güvenli vuruş: en yakın uygun topa hafifçe
        const ts = targetsFor(1).sort((a, b) => Math.hypot(a.x - cue().x, a.y - cue().y) - Math.hypot(b.x - cue().x, b.y - cue().y));
        const t = ts[0] || live()[1]; ang = Math.atan2(t.y - cue().y, t.x - cue().x); pw = 0.45;
      }
      ang += (Math.random() - 0.5) * 2 * lv.err * Math.PI / 180;
    }
    aim = ang; power = 0; draw();
    // isteka geri çekilip vursun
    const t0 = performance.now(), pull = 650;
    const anim = () => {
      const u = Math.min(1, (performance.now() - t0) / pull); power = pw * Math.sin(u * Math.PI / 2); draw();
      if (u < 1) return requestAnimationFrame(anim);
      setTimeout(() => { cpuBusy = false; strike(ang, pw, { x: 0, y: breakShot ? 0 : (Math.random() < 0.3 ? -0.4 : 0) }); }, 200);
    };
    setTimeout(() => requestAnimationFrame(anim), lv.think - 400);
  }
  // isteka ileri gidip topa vurur
  function strike(ang, pw, sp) {
    const t0 = performance.now(); stick = { ang, pw, t0 };
    const go = () => { const u = (performance.now() - t0) / 90; if (u < 1) { draw(); return requestAnimationFrame(go); } stick = null; shoot(ang, pw, sp); };
    requestAnimationFrame(go);
  }

  // ---------- çizim
  function layout() {
    const r = root.getBoundingClientRect(), hudH = root.querySelector('.phud').offsetHeight, side = 54;
    const aw = r.width - side - 12, ah = r.height - hudH - 10;
    portrait = ah > aw;
    const TW = L + 2 * 130, TH = W + 2 * 130; // ahşap dahil
    const tw = portrait ? TH : TW, th = portrait ? TW : TH;
    S = Math.min(aw / tw, ah / th);
    cw = Math.round(tw * S); ch = Math.round(th * S);
    dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = cw * dpr; cv.height = ch * dpr; cv.style.width = cw + 'px'; cv.style.height = ch + 'px';
    felt = null;
  }
  // masa koordinatı -> ekran (kanvas css px)
  function toTable(sx, sy) { if (portrait) { const Y = (W + 260) * S - sx, X = sy; return [X / S - 130, Y / S - 130]; } return [sx / S - 130, sy / S - 130]; }
  function tableTransform() { g.setTransform(dpr, 0, 0, dpr, 0, 0); if (portrait) { g.translate((W + 260) * S, 0); g.rotate(Math.PI / 2); } g.scale(S, S); g.translate(130, 130); }
  function buildFelt() {
    // masa: ahşap çerçeve, bant, çuha (bir kez çizilir)
    const c = document.createElement('canvas'), k = Math.min(0.5, S * dpr * 1.2);
    c.width = Math.round((L + 260) * k); c.height = Math.round((W + 260) * k);
    const x = c.getContext('2d'); x.scale(k, k); x.translate(130, 130);
    // ahşap
    const wood = x.createLinearGradient(0, -130, 0, W + 130); wood.addColorStop(0, '#5a2e17'); wood.addColorStop(0.5, '#3b1d0e'); wood.addColorStop(1, '#5a2e17');
    x.fillStyle = wood; rr(x, -130, -130, L + 260, W + 260, 60); x.fill();
    x.globalAlpha = 0.18; for (let i = 0; i < 90; i++) { x.strokeStyle = i % 2 ? '#2a1208' : '#7a4424'; x.lineWidth = 2 + Math.random() * 4; x.beginPath(); const yy = -130 + Math.random() * (W + 260); x.moveTo(-130, yy); x.bezierCurveTo(L * 0.3, yy + rnd(-20, 20), L * 0.7, yy + rnd(-20, 20), L + 130, yy + rnd(-10, 10)); x.stroke(); } x.globalAlpha = 1;
    x.strokeStyle = '#1c0b04'; x.lineWidth = 6; rr(x, -128, -128, L + 256, W + 256, 58); x.stroke();
    x.strokeStyle = 'rgba(255,220,170,.18)'; x.lineWidth = 3; rr(x, -118, -118, L + 236, W + 236, 52); x.stroke();
    // elmas işaretler
    x.fillStyle = '#efe6d0';
    for (let i = 1; i < 8; i++) { if (i === 4) continue; const px = L * i / 8; dia(x, px, -78); dia(x, px, W + 78); }
    for (let i = 1; i < 4; i++) { const py = W * i / 4; dia(x, -78, py); dia(x, L + 78, py); }
    // bant (yeşil kauçuk)
    x.fillStyle = '#145c37'; x.fillRect(-52, -52, L + 104, W + 104);
    // çuha
    const cl = x.createRadialGradient(L / 2, W / 2, 80, L / 2, W / 2, L * 0.62); cl.addColorStop(0, '#1f8a52'); cl.addColorStop(0.7, '#17744a'); cl.addColorStop(1, '#0f5636');
    x.fillStyle = cl; x.fillRect(0, 0, L, W);
    // çuha dokusu
    const img = x.getImageData(0, 0, c.width, c.height); const d = img.data;
    for (let i = 0; i < d.length; i += 4) { const n = (Math.random() - 0.5) * 9; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
    x.putImageData(img, 0, 0);
    // bant kenar gölgesi
    x.save(); x.beginPath(); x.rect(0, 0, L, W); x.clip();
    x.shadowColor = 'rgba(0,0,0,.55)'; x.shadowBlur = 30 * k * 2; x.strokeStyle = 'rgba(0,0,0,.4)'; x.lineWidth = 30; x.strokeRect(-15, -15, L + 30, W + 30); x.restore();
    // bant burunları: cep ağızlarına doğru eğik
    x.fillStyle = '#0f4a2c';
    RAILS.forEach(r => { const [nx, ny] = r.n; x.beginPath(); const o = 52;
      const a = r.a, b = r.b, ex = -nx * o, ey = -ny * o, cut = 36;
      const along = nx === 0 ? [1, 0] : [0, 1];
      x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.lineTo(b[0] + ex + along[0] * cut, b[1] + ey + along[1] * cut); x.lineTo(a[0] + ex - along[0] * cut, a[1] + ey - along[1] * cut); x.closePath(); x.globalAlpha = 0.5; x.fill(); x.globalAlpha = 1; });
    // çizgiler: baş çizgisi ve noktalar
    x.strokeStyle = 'rgba(255,255,255,.12)'; x.lineWidth = 3; x.beginPath(); x.moveTo(L * 0.25, 0); x.lineTo(L * 0.25, W); x.stroke();
    x.fillStyle = 'rgba(255,255,255,.35)'; [[L * 0.25, W / 2], [L * 0.72, W / 2]].forEach(([px, py]) => { x.beginPath(); x.arc(px, py, 7, 0, 7); x.fill(); });
    // cepler
    POCKETS.forEach(p => {
      x.fillStyle = '#c9a24a'; x.beginPath(); x.arc(p.x, p.y, p.r + 16, 0, 7); x.fill();
      x.fillStyle = '#2a1a0c'; x.beginPath(); x.arc(p.x, p.y, p.r + 7, 0, 7); x.fill();
      const pg = x.createRadialGradient(p.x, p.y, 4, p.x, p.y, p.r); pg.addColorStop(0, '#000'); pg.addColorStop(0.75, '#050505'); pg.addColorStop(1, '#1c1c1c');
      x.fillStyle = pg; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fill();
    });
    // tavan lambası ışığı
    const lamp = x.createRadialGradient(L / 2, W / 2, 0, L / 2, W / 2, L * 0.55); lamp.addColorStop(0, 'rgba(255,240,200,.10)'); lamp.addColorStop(1, 'rgba(0,0,0,.18)');
    x.fillStyle = lamp; x.fillRect(-130, -130, L + 260, W + 260);
    felt = c;
  }
  const rnd = (a, b) => a + Math.random() * (b - a);
  function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
  function dia(x, px, py) { x.beginPath(); x.moveTo(px, py - 11); x.lineTo(px + 7, py); x.lineTo(px, py + 11); x.lineTo(px - 7, py); x.closePath(); x.fill(); }
  function drawBall(b) {
    let x = b.x, y = b.y, r = R, a = 1;
    if (b.in) { if (b.sink >= 1) return; const u = b.sink; x = b.x + (b.px - b.x) * u; y = b.y + (b.py - b.y) * u; r = R * (1 - 0.45 * u); a = 1 - u * 0.8; }
    g.globalAlpha = a;
    // gölge (lamba üstte, hafif sağ-alt)
    g.fillStyle = 'rgba(0,0,0,.38)'; g.beginPath(); g.ellipse(x + r * 0.22, y + r * 0.3, r * 1.02, r * 0.92, 0, 0, 7); g.fill();
    const col = b.n === 0 ? '#f6f3ea' : b.n > 8 ? '#f6f3ea' : colorOf(b.n);
    g.save(); g.beginPath(); g.arc(x, y, r, 0, 7); g.clip();
    g.fillStyle = col; g.fillRect(x - r, y - r, 2 * r, 2 * r);
    const [qx, qy, qz] = b.q;
    if (b.n > 8) {
      // çizgili: renkli kuşak = kutuplara dik büyük çember etrafı
      g.fillStyle = colorOf(b.n); fillBand(x, y, r, qx, qy, qz);
    }
    // numara pulu
    if (b.n !== 0) for (const sgn of [1, -1]) {
      const px = qx * sgn, py = qy * sgn, pz = qz * sgn; if (pz < 0.12) continue;
      const ang = Math.atan2(py, px), rr2 = r * 0.42;
      g.save(); g.translate(x + px * r * 0.96, y + py * r * 0.96); g.rotate(ang); g.scale(Math.max(0.15, pz), 1); g.rotate(-ang);
      g.fillStyle = '#fbf8f0'; g.beginPath(); g.arc(0, 0, rr2, 0, 7); g.fill();
      if (pz > 0.45 && r * S > 5) { g.fillStyle = '#151515'; g.font = `700 ${Math.round(rr2 * 1.25)}px -apple-system, "Helvetica Neue", sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; if (portrait) g.rotate(-Math.PI / 2); g.fillText(String(b.n), 0, rr2 * 0.08); }
      g.restore();
    }
    if (b.n === 0) { // beyaz topta dönüşü gösteren küçük noktalar
      for (const sgn of [1, -1]) { const pz = b.q[2] * sgn; if (pz < 0.1) continue; g.fillStyle = 'rgba(200,30,30,.75)'; g.beginPath(); g.arc(x + b.q[0] * sgn * r, y + b.q[1] * sgn * r, r * 0.12, 0, 7); g.fill(); }
    }
    // ışık ve gölgelendirme
    const sh = g.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.05, x, y, r * 1.05);
    sh.addColorStop(0, 'rgba(255,255,255,.55)'); sh.addColorStop(0.25, 'rgba(255,255,255,.08)'); sh.addColorStop(0.7, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,.45)');
    g.fillStyle = sh; g.fillRect(x - r, y - r, 2 * r, 2 * r);
    g.restore();
    g.globalAlpha = 1;
  }
  // kutup yönüne dik renkli kuşak: kutup çevresindeki beyaz başlıkları boyamak yerine renkli kuşak çizilir
  function fillBand(x, y, r, qx, qy, qz) {
    // kuşak = |p·q| < 0.5 olan bölge; ekranda birkaç dilimle yaklaşık çiz
    const N = 26, half = 0.5;
    g.beginPath();
    for (let side = 0; side < 2; side++) {
      const lim = side ? -half : half;
      const pts = [];
      for (let i = 0; i <= N; i++) {
        const t = i / N * Math.PI * 2;
        // q'ya dik iki birim vektör
        let ux = -qy, uy = qx, uz = 0; let m = Math.hypot(ux, uy); if (m < 1e-3) { ux = 1; uy = 0; m = 1; } ux /= m; uy /= m;
        const vx = qy * uz - qz * uy, vy = qz * ux - qx * uz, vz = qx * uy - qy * ux;
        const s = Math.sqrt(1 - lim * lim);
        const px = qx * lim + (ux * Math.cos(t) + vx * Math.sin(t)) * s, py = qy * lim + (uy * Math.cos(t) + vy * Math.sin(t)) * s, pz = qz * lim + (uz * Math.cos(t) + vz * Math.sin(t)) * s;
        pts.push([x + px * r, y + py * r, pz]);
      }
      pts.forEach(([a, b2], i) => i ? g.lineTo(a, b2) : g.moveTo(a, b2));
      g.closePath();
    }
    // iki çember arasındaki bölge: çift-tek kuralıyla
    g.save(); g.clip('evenodd');
    // kuşak bölgesinin ön yüzü: diskin kendisi (iki elips arası); arka taraf zaten ön yüzde görünmez
    g.fillRect(x - r, y - r, 2 * r, 2 * r);
    g.restore();
  }
  function aimInfo() {
    // nişan çizgisi: beyazın ilk değeceği top ve gidecekleri yön
    const c = cue(), dx = Math.cos(aim), dy = Math.sin(aim);
    let tMin = Infinity, hit = null;
    for (const b of live()) { if (b === c) continue; const fx = b.x - c.x, fy = b.y - c.y, proj = fx * dx + fy * dy; if (proj <= 0) continue; const perp2 = fx * fx + fy * fy - proj * proj; if (perp2 > D * D) continue; const t = proj - Math.sqrt(D * D - perp2); if (t < tMin) { tMin = t; hit = b; } }
    let rail = Infinity; const tx = dx > 0 ? (L - R - c.x) / dx : dx < 0 ? (R - c.x) / dx : Infinity, ty = dy > 0 ? (W - R - c.y) / dy : dy < 0 ? (R - c.y) / dy : Infinity; rail = Math.min(tx, ty);
    if (!hit || tMin > rail) return { gx: c.x + dx * rail, gy: c.y + dy * rail, hit: null };
    const gx = c.x + dx * tMin, gy = c.y + dy * tMin, nx = (hit.x - gx) / D, ny = (hit.y - gy) / D;
    return { gx, gy, hit, ox: nx, oy: ny, tx: dx - nx * (dx * nx + dy * ny), ty: dy - ny * (dx * nx + dy * ny) };
  }
  function drawStick(ang, pw, fwd) {
    const c = cue(), back = R + 18 + pw * 260 - (fwd || 0) * (pw * 260 + 10), dx = Math.cos(ang), dy = Math.sin(ang);
    const sx = c.x - dx * back, sy = c.y - dy * back, len = 1450;
    g.save(); g.translate(sx, sy); g.rotate(ang + Math.PI);
    g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.moveTo(10, 14); g.lineTo(len, 26); g.lineTo(len, 40); g.lineTo(10, 22); g.fill();
    const wd = g.createLinearGradient(0, 0, len, 0); wd.addColorStop(0, '#f1e3c2'); wd.addColorStop(0.6, '#d7b47a'); wd.addColorStop(0.62, '#2a1208'); wd.addColorStop(0.75, '#5a2410'); wd.addColorStop(0.77, '#c9a24a'); wd.addColorStop(0.79, '#2a1208'); wd.addColorStop(1, '#140804');
    g.fillStyle = wd; g.beginPath(); g.moveTo(0, -6); g.lineTo(len, -13); g.lineTo(len, 13); g.lineTo(0, 6); g.closePath(); g.fill();
    g.fillStyle = '#3d6fd1'; g.fillRect(-3, -6, 5, 12); g.fillStyle = '#f5f2ea'; g.fillRect(2, -6, 14, 12);
    g.restore();
  }
  function draw() {
    if (!cv || !visible) return;
    if (!felt) buildFelt();
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, cv.width, cv.height);
    tableTransform();
    g.imageSmoothingEnabled = true;
    g.drawImage(felt, -130, -130, L + 260, W + 260);
    const resting = !moving && !stick && !over;
    const humanTurn = mode !== 'cpu' || turn === 0;
    // nişan
    if (resting && humanTurn && !cue().in) {
      const ai = aimInfo(), c = cue();
      g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 3; g.setLineDash([16, 12]); g.beginPath(); g.moveTo(c.x, c.y); g.lineTo(ai.gx, ai.gy); g.stroke(); g.setLineDash([]);
      g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 2.5; g.beginPath(); g.arc(ai.gx, ai.gy, R, 0, 7); g.stroke();
      if (ai.hit) {
        const legal = mode === 'pratik' || open ? ai.hit.n !== 8 || breakShot : (groups[turn] && (live().some(b => groupOf(b.n) === groups[turn]) ? groupOf(ai.hit.n) === groups[turn] : ai.hit.n === 8));
        g.strokeStyle = legal ? 'rgba(255,255,255,.75)' : 'rgba(255,80,80,.85)'; g.lineWidth = 3;
        g.beginPath(); g.moveTo(ai.hit.x, ai.hit.y); g.lineTo(ai.hit.x + ai.ox * 260, ai.hit.y + ai.oy * 260); g.stroke();
        g.strokeStyle = 'rgba(255,255,255,.3)'; g.beginPath(); g.moveTo(ai.gx, ai.gy); g.lineTo(ai.gx + ai.tx * 160, ai.gy + ai.ty * 160); g.stroke();
      }
    }
    for (const b of balls) if (b.in) drawBall(b);
    for (const b of balls) if (!b.in) drawBall(b);
    if (inHand && humanTurn && !moving) { const c = cue(); g.strokeStyle = 'rgba(255,214,90,.9)'; g.lineWidth = 4; g.setLineDash([10, 8]); g.beginPath(); g.arc(c.x, c.y, R + 14, 0, 7); g.stroke(); g.setLineDash([]); if (inHand === 'kitchen') { g.fillStyle = 'rgba(255,214,90,.06)'; g.fillRect(0, 0, L * 0.25, W); } }
    if (stick) drawStick(stick.ang, stick.pw, Math.min(1, (performance.now() - stick.t0) / 90));
    else if (resting && !cue().in && (humanTurn || cpuBusy)) drawStick(aim, power, 0);
    g.setTransform(1, 0, 0, 1, 0, 0);
  }
  function loop(t) {
    raf = 0; if (!visible) return;
    const dt = Math.min(34, lastT ? t - lastT : 16); lastT = t;
    if (moving) {
      const vmax = Math.max(0.01, ...balls.map(b => Math.hypot(b.vx, b.vy)));
      const n = Math.min(40, Math.max(2, Math.ceil(vmax * dt / (R * 0.35)))), h = dt / n;
      let any = false; for (let i = 0; i < n; i++) any = step(h) || any;
      if (!any) { moving = false; settle(); }
    }
    draw();
    if (moving || stick) raf = requestAnimationFrame(loop);
  }
  function kick() { lastT = 0; if (!raf) raf = requestAnimationFrame(loop); }

  // ---------- kontroller
  function pt(e) { const r = cv.getBoundingClientRect(); return toTable(e.clientX - r.left, e.clientY - r.top); }
  let drag = null;
  function onDown(e) {
    if (moving || stick || over || (mode === 'cpu' && turn === 1)) return;
    audio();
    const [x, y] = pt(e), c = cue();
    cv.setPointerCapture(e.pointerId);
    if (inHand && Math.hypot(x - c.x, y - c.y) < R * 3.2) drag = { k: 'place' };
    else { drag = { k: 'aim' }; aim = Math.atan2(y - c.y, x - c.x); draw(); }
  }
  function onMove(e) {
    if (!drag) return; const [x, y] = pt(e), c = cue();
    if (drag.k === 'place') {
      const maxX = inHand === 'kitchen' ? L * 0.25 : L - R;
      const nx = Math.max(R, Math.min(maxX, x)), ny = Math.max(R, Math.min(W - R, y));
      if (!balls.some(o => o !== c && !o.in && Math.hypot(o.x - nx, o.y - ny) < D)) { c.x = nx; c.y = ny; }
    } else aim = Math.atan2(y - c.y, x - c.x);
    draw();
  }
  function onUp() { drag = null; }
  // güç çubuğu: aşağı çek, bırakınca vur
  let pdrag = null;
  function powerDown(e) { if (moving || stick || over || (mode === 'cpu' && turn === 1) || cue().in) return; audio(); e.target.setPointerCapture(e.pointerId); pdrag = { y: e.clientY, h: e.currentTarget.getBoundingClientRect().height }; }
  function powerMove(e) { if (!pdrag) return; power = Math.max(0, Math.min(1, (e.clientY - pdrag.y) / (pdrag.h * 0.8))); powerUI(); draw(); }
  function powerUp() { if (!pdrag) return; pdrag = null; const p = power; powerUI(); if (p < 0.03) { power = 0; draw(); return; } strike(aim, p, spin); setTimeout(() => { power = 0; powerUI(); }, 120); }
  function powerUI() { const f = root.querySelector('.pfill'), k = root.querySelector('.pcue'); if (f) f.style.height = (power * 100).toFixed(1) + '%'; if (k) k.style.transform = `translateY(${(power * 80).toFixed(1)}%)`; }

  // ---------- arayüz
  function miniBall(n, gone) { const c = n > 8 ? colorOf(n) : colorOf(n); return `<i class="mb${n > 8 ? ' st' : ''}${gone ? ' gone' : ''}" style="--c:${c}">${n}</i>`; }
  function hud() {
    if (!root) return;
    const nm = names(), rem = gp => [1, 2, 3, 4, 5, 6, 7].map(i => gp === 'duz' ? i : i + 8).map(n => miniBall(n, !live().some(b => b.n === n))).join('');
    const pl = i => `<div class="pp${turn === i && !over ? ' on' : ''}"><b>${nm[i]}</b><span class="pw">${wins[i]}</span><div class="pg">${groups[i] ? rem(groups[i]) + (groups[i] && !live().some(b => groupOf(b.n) === groups[i]) ? miniBall(8, !live().some(b => b.n === 8)) : '') : `<em>${open ? 'masa açık' : ''}</em>`}</div></div>`;
    root.querySelector('.pplayers').innerHTML = mode === 'pratik' ? `<div class="pp on"><b>Antrenman</b><div class="pg"><em>${live().length - 1} top kaldı</em></div></div>` : pl(0) + pl(1);
    root.querySelector('.pover').hidden = !over;
    if (over) root.querySelector('.pover').innerHTML = `<div><b>${over.p === 0 && mode === 'cpu' ? 'Kazandın! 🎱' : over.text}</b><span>${over.p === 0 && mode === 'cpu' ? over.text : ''}</span><button class="pbtn primary" data-pa="new">Yeni oyun</button></div>`;
  }
  function menu() {
    const m = root.querySelector('.pmenu'); m.hidden = !m.hidden; if (m.hidden) return;
    m.innerHTML = `<b>Oyun</b>
      <button data-pa="mode-cpu" class="${mode === 'cpu' ? 'on' : ''}">Bilgisayara karşı</button>
      <div class="plv">${['kolay', 'orta', 'zor'].map(l => `<button data-pa="lv-${l}" class="${level === l ? 'on' : ''}">${l[0].toUpperCase() + l.slice(1)}</button>`).join('')}</div>
      <button data-pa="mode-iki" class="${mode === 'iki' ? 'on' : ''}">İki kişi (aynı telefon)</button>
      <button data-pa="mode-pratik" class="${mode === 'pratik' ? 'on' : ''}">Antrenman</button>
      <hr><button data-pa="new">Yeni oyun</button><button data-pa="snd">${soundOn ? 'Sesi kapat' : 'Sesi aç'}</button><button data-pa="reset">Skoru sıfırla</button>`;
  }
  function spinUI() {
    const s = root.querySelector('.pspin'); s.hidden = !s.hidden;
    const dot = root.querySelector('.pdot'); dot.style.left = (50 + spin.x * 38) + '%'; dot.style.top = (50 - spin.y * 38) + '%';
  }
  function act(a) {
    if (a === 'new') { root.querySelector('.pmenu').hidden = true; rack(); hud(); draw(); return; }
    if (a.startsWith('mode-')) { mode = a.slice(5); LS.set('gp-pool-mode', mode); rack(); hud(); menu(); menu(); draw(); return; }
    if (a.startsWith('lv-')) { level = a.slice(3); LS.set('gp-pool-lvl', level); menu(); menu(); return; }
    if (a === 'snd') { soundOn = !soundOn; LS.set('gp-pool-snd', soundOn); menu(); menu(); return; }
    if (a === 'reset') { wins = [0, 0]; LS.set('gp-pool-wins', wins); hud(); return; }
    if (a === 'menu') return menu();
    if (a === 'exit') return window.dispatchEvent(new Event('pool-exit'));
    if (a === 'spin') return spinUI();
    if (a === 'left' || a === 'right') { aim += (a === 'left' ? -1 : 1) * 0.15 * Math.PI / 180; draw(); return; }
  }
  function mount(el) {
    if (root) return;
    root = el;
    root.innerHTML = `<div class="phud"><div class="pplayers"></div><div class="pbtns"><button class="pib" data-pa="left" aria-label="Biraz sola">‹</button><button class="pib" data-pa="right" aria-label="Biraz sağa">›</button><button class="pib pspinb" data-pa="spin" aria-label="Falso"><i></i></button><button class="pib" data-pa="menu" aria-label="Menü">☰</button><button class="pib pexit" data-pa="exit" aria-label="Bilardodan çık">✕</button></div></div>
      <div class="pmain"><div class="pwrap"><canvas class="pcv"></canvas><div class="pmsg"></div><div class="pover" hidden></div></div>
        <div class="ppow" aria-label="Güç: aşağı çek ve bırak"><div class="pfill"></div><div class="pcue"></div><span>çek<br>bırak</span></div></div>
      <div class="pmenu" hidden></div>
      <div class="pspin" hidden><div class="pball"><div class="pdot"></div></div><span>Falso: beyaz topun neresine vuracağını seç</span><button class="pbtn" data-pa="spin">Tamam</button></div>`;
    cv = root.querySelector('.pcv'); g = cv.getContext('2d');
    cv.addEventListener('pointerdown', onDown); cv.addEventListener('pointermove', onMove); cv.addEventListener('pointerup', onUp); cv.addEventListener('pointercancel', onUp);
    const pw = root.querySelector('.ppow'); pw.addEventListener('pointerdown', powerDown); pw.addEventListener('pointermove', powerMove); pw.addEventListener('pointerup', powerUp); pw.addEventListener('pointercancel', powerUp);
    root.addEventListener('click', e => { const b = e.target.closest('[data-pa]'); if (b) act(b.dataset.pa); });
    const pb = root.querySelector('.pball');
    const setSpin = e => { const r = pb.getBoundingClientRect(); let x = (e.clientX - r.left) / r.width * 2 - 1, y = -((e.clientY - r.top) / r.height * 2 - 1); const m = Math.hypot(x, y); if (m > 0.8) { x *= 0.8 / m; y *= 0.8 / m; } spin = { x, y }; const dot = root.querySelector('.pdot'); dot.style.left = (50 + x * 50) + '%'; dot.style.top = (50 - y * 50) + '%'; root.querySelector('.pspinb i').style.transform = `translate(${x * 6}px,${-y * 6}px)`; };
    pb.addEventListener('pointerdown', e => { pb.setPointerCapture(e.pointerId); setSpin(e); }); pb.addEventListener('pointermove', e => { if (e.buttons) setSpin(e); });
    window.addEventListener('resize', () => { if (visible) { layout(); draw(); } });
    rack(); hud();
  }
  function show() { visible = true; requestAnimationFrame(() => { layout(); hud(); draw(); if (moving || stick) kick(); if (mode === 'cpu' && turn === 1 && !over && !moving) cpuMove(); }); }
  function hide() { visible = false; }
  window.Bilardo = { mount, show, hide, _test: { get balls() { return balls; }, shoot, step, settle: () => settle(), rack, get state() { return { turn, groups, open, over, inHand, moving, breakShot, msg }; }, setMode(m) { mode = m; }, cpuMove, bestShot } };
})();
