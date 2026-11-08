/* Gönül Plak · Bilardo
 * 2D, üstten bakan masa çizimi ve 8-top arayüzü.
 * Fizik, kurallar ve robot: tailuge/billiards motoru (GPL-3.0); 3D çizimi kapalı, motor arkada çalışır. */
(() => {
  'use strict';
  const qs = new URLSearchParams(location.search);
  const ME = (qs.get('userName') || 'Eren').slice(0, 14);
  const LVL = qs.get('bot') === 'ClawBreak' ? 'kolay' : 'zor';
  const BOTNAME = LVL === 'kolay' ? 'Robot Kolay' : 'Robot Zor';
  const ls = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

  const COL = { 0: [246, 243, 232], 1: [250, 196, 20], 2: [20, 74, 200], 3: [220, 34, 28], 4: [100, 38, 158], 5: [246, 114, 22], 6: [16, 134, 62], 7: [132, 22, 24], 8: [18, 18, 20] };
  const baseOf = n => COL[n > 8 ? n - 8 : n] || COL[0];

  let G, C, table, cue;
  let W = 0, H = 0, dpr = 1, rot = false;
  let K = 1, OX = 0, OY = 0, RP = 8;          // table → stage scale / origin / ball radius px
  let geo = null;                              // table geometry in engine units
  const stage = document.createElement('div'); stage.id = 'g8';
  const cv = document.createElement('canvas'); cv.className = 'g8cv';
  const ctx = cv.getContext('2d');
  let bg = document.createElement('canvas');   // pre-rendered table

  /* ------------------------------------------------------------ ball sprites */
  const digitTex = {};
  function digit(n) {
    if (digitTex[n]) return digitTex[n];
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const x = c.getContext('2d');
    x.fillStyle = '#fff'; x.fillRect(0, 0, 64, 64);
    x.fillStyle = '#111'; x.font = `800 ${n > 9 ? 30 : 36}px system-ui,-apple-system,Arial`; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText(String(n), 32, 35);
    return (digitTex[n] = x.getImageData(0, 0, 64, 64).data);
  }
  const L = (() => { const v = [-0.42, 0.52, 0.74], m = Math.hypot(...v); return v.map(a => a / m); })();
  const Hh = (() => { const v = [L[0], L[1], L[2] + 1], m = Math.hypot(...v); return v.map(a => a / m); })();

  function paintBall(label, q, rp, out) {
    const size = Math.ceil(rp * 2) + 2, c = size / 2;
    if (out.width !== size) { out.width = out.height = size; }
    const x2 = out.getContext('2d');
    const img = x2.createImageData(size, size), d = img.data;
    const ux = -q.x, uy = -q.y, uz = -q.z, s = q.w, uu = ux * ux + uy * uy + uz * uz;
    const base = baseOf(label), stripe = label > 8, cueb = !label, tex = label ? digit(label) : null;
    for (let py = 0; py < size; py++) {
      for (let px = 0; px < size; px++) {
        const nx = (px + 0.5 - c) / rp, ny = (py + 0.5 - c) / rp, d2 = nx * nx + ny * ny;
        if (d2 > 1 + 2.2 / rp) continue;
        const r = Math.sqrt(d2), a = Math.max(0, Math.min(1, (1 - r) * rp + 0.5));
        if (a <= 0) continue;
        const nz = Math.sqrt(Math.max(0, 1 - Math.min(1, d2)));
        const wx = nx / Math.max(1, r), wy = -ny / Math.max(1, r), wz = nz;
        // rotate world normal into ball space (conjugate quaternion)
        const dt = ux * wx + uy * wy + uz * wz;
        const cx = uy * wz - uz * wy, cy = uz * wx - ux * wz, cz = ux * wy - uy * wx;
        const lx = 2 * dt * ux + (s * s - uu) * wx + 2 * s * cx;
        const ly = 2 * dt * uy + (s * s - uu) * wy + 2 * s * cy;
        const lz = 2 * dt * uz + (s * s - uu) * wz + 2 * s * cz;
        let R0, G0, B0;
        if (cueb) { R0 = 246; G0 = 243; B0 = 232; }
        else if (Math.abs(lz) > 0.875) {
          const sx = (lz > 0 ? lx : -lx) / 0.484, sy = ly / 0.484;
          const tx = Math.max(0, Math.min(63, ((sx * 0.5 + 0.5) * 64) | 0)), ty = Math.max(0, Math.min(63, ((0.5 - sy * 0.5) * 64) | 0));
          const v = tex[(ty * 64 + tx) * 4];
          R0 = G0 = B0 = v > 128 ? 250 : 20;
        } else if (stripe && Math.abs(lx) > 0.52) { R0 = 246; G0 = 243; B0 = 232; }
        else { R0 = base[0]; G0 = base[1]; B0 = base[2]; }
        const df = Math.max(0, wx * L[0] + wy * L[1] + wz * L[2]);
        const sp = Math.pow(Math.max(0, wx * Hh[0] + wy * Hh[1] + wz * Hh[2]), 48) * 0.9;
        const k = 0.5 + 0.62 * df, rim = 0.84 + 0.16 * nz;
        const i = (py * size + px) * 4;
        d[i] = Math.min(255, R0 * k * rim + 255 * sp);
        d[i + 1] = Math.min(255, G0 * k * rim + 255 * sp);
        d[i + 2] = Math.min(255, B0 * k * rim + 255 * sp);
        d[i + 3] = a * 255;
      }
    }
    x2.putImageData(img, 0, 0);
    return out;
  }
  const IDQ = { x: 0, y: 0, z: 0, w: 1 };
  const iconCache = {};
  function ballIcon(n) {
    if (iconCache[n]) return iconCache[n];
    const c = document.createElement('canvas'); paintBall(n, IDQ, 22, c);
    return (iconCache[n] = c.toDataURL());
  }
  const sprites = new Map();
  function ballSprite(b) {
    let s = sprites.get(b.id);
    if (!s) { s = { cv: document.createElement('canvas'), key: '' }; sprites.set(b.id, s); }
    const q = b.ballmesh ? b.ballmesh.mesh.quaternion : IDQ;
    const rp = RP * dpr;
    const key = rp.toFixed(2) + '|' + q.x.toFixed(4) + q.y.toFixed(4) + q.z.toFixed(4) + q.w.toFixed(4);
    if (key !== s.key) { paintBall(b.label || 0, q, rp, s.cv); s.key = key; }
    return s.cv;
  }

  /* ------------------------------------------------------------ geometry & layout */
  const tx = x => OX + x * K, ty = y => OY - y * K;
  const fromStage = (sx, sy) => ({ x: (sx - OX) / K, y: (OY - sy) / K });
  function readGeo() {
    const r = G.R(), T = G.TableGeometry, P = G.PocketGeometry;
    geo = { r, X: T.tableX, Y: T.tableY, pockets: (P.pocketCenters || []).map(p => ({ x: p.pos.x, y: p.pos.y, rad: p.radius })) };
    geo.cx = geo.X + r; geo.cy = geo.Y + r;          // cushion nose
    geo.cw = r * 1.5; geo.rw = r * 3.1; geo.rim = r * 0.55;
    geo.HX = geo.cx + geo.cw + geo.rw + geo.rim; geo.HY = geo.cy + geo.cw + geo.rw + geo.rim;
  }
  let box = {};
  function layout() {
    const vw = innerWidth, vh = innerHeight;
    rot = vh > vw * 1.05;
    W = rot ? vh : vw; H = rot ? vw : vh;
    stage.style.width = W + 'px'; stage.style.height = H + 'px';
    stage.style.transform = rot ? `translate(${vw}px,0) rotate(90deg)` : 'none';
    stage.style.setProperty('--u', (H / 100) + 'px');
    dpr = Math.min(3, window.devicePixelRatio || 1);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    if (!geo) return;
    const top = H * 0.155, bot = H * 0.035, side = Math.max(W * 0.135, H * 0.2);
    const bw = W - side * 2, bh = H - top - bot;
    K = Math.min(bw / (2 * geo.HX), bh / (2 * geo.HY));
    OX = W / 2; OY = top + bh / 2;
    RP = geo.r * K;
    box = { l: tx(-geo.HX), r: tx(geo.HX), t: ty(geo.HY), b: ty(-geo.HY) };
    stage.style.setProperty('--tl', box.l + 'px'); stage.style.setProperty('--tr', (W - box.r) + 'px');
    stage.style.setProperty('--tt', box.t + 'px'); stage.style.setProperty('--tb', (H - box.b) + 'px');
    drawTable();
    sprites.forEach(s => s.key = '');
  }

  /* ------------------------------------------------------------ static table */
  function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
  function drawTable() {
    bg.width = cv.width; bg.height = cv.height;
    const x = bg.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0);
    // backdrop
    const g0 = x.createRadialGradient(W / 2, H * 0.55, H * 0.1, W / 2, H * 0.55, W * 0.7);
    g0.addColorStop(0, '#243149'); g0.addColorStop(1, '#141b29');
    x.fillStyle = g0; x.fillRect(0, 0, W, H);
    const { r, cx, cy, cw, rw, rim, HX, HY } = geo;
    // drop shadow
    x.save(); x.shadowColor = 'rgba(0,0,0,.6)'; x.shadowBlur = 24; x.shadowOffsetY = 8;
    rr(x, tx(-HX), ty(HY), 2 * HX * K, 2 * HY * K, 2.4 * r * K); x.fillStyle = '#555c66'; x.fill(); x.restore();
    // metal rim
    const gm = x.createLinearGradient(0, ty(HY), 0, ty(-HY));
    gm.addColorStop(0, '#b9c0c8'); gm.addColorStop(0.5, '#6d757f'); gm.addColorStop(1, '#a9b0b8');
    rr(x, tx(-HX), ty(HY), 2 * HX * K, 2 * HY * K, 2.4 * r * K); x.fillStyle = gm; x.fill();
    // wooden rails (deep red)
    const ox = cx + cw + rw, oy = cy + cw + rw;
    const gw = x.createLinearGradient(0, ty(oy), 0, ty(-oy));
    gw.addColorStop(0, '#8e1b18'); gw.addColorStop(0.08, '#b02a22'); gw.addColorStop(0.5, '#7a1513'); gw.addColorStop(0.92, '#b02a22'); gw.addColorStop(1, '#6a100f');
    rr(x, tx(-ox), ty(oy), 2 * ox * K, 2 * oy * K, 1.6 * r * K); x.fillStyle = gw; x.fill();
    // wood grain shimmer
    x.save(); rr(x, tx(-ox), ty(oy), 2 * ox * K, 2 * oy * K, 1.6 * r * K); x.clip();
    x.globalAlpha = 0.07; x.strokeStyle = '#000';
    for (let i = 0; i < 70; i++) { const yy = ty(oy) + Math.random() * 2 * oy * K; x.lineWidth = Math.random() * 1.2; x.beginPath(); x.moveTo(tx(-ox), yy); x.bezierCurveTo(W * 0.3, yy + 3, W * 0.6, yy - 3, tx(ox), yy + 1); x.stroke(); }
    x.restore();
    // inner rail shadow edge
    x.fillStyle = '#3d0807'; x.fillRect(tx(-(cx + cw) - 0.12 * r), ty(cy + cw + 0.12 * r), (2 * (cx + cw) + 0.24 * r) * K, (2 * (cy + cw) + 0.24 * r) * K);
    // cloth (incl. under cushions)
    const gc = x.createRadialGradient(OX, OY, 2 * r * K, OX, OY, (cx + cw) * K * 1.05);
    gc.addColorStop(0, '#36b3e6'); gc.addColorStop(0.55, '#2697cf'); gc.addColorStop(1, '#14699f');
    x.fillStyle = gc; x.fillRect(tx(-(cx + cw)), ty(cy + cw), 2 * (cx + cw) * K, 2 * (cy + cw) * K);
    // felt noise
    const nW = Math.round(2 * (cx + cw) * K * dpr), nH = Math.round(2 * (cy + cw) * K * dpr);
    if (nW > 0 && nH > 0) {
      const nc = document.createElement('canvas'); nc.width = nW; nc.height = nH;
      const nx = nc.getContext('2d'), id = nx.createImageData(nW, nH), dd = id.data;
      for (let i = 0; i < dd.length; i += 4) { const v = Math.random() * 255; dd[i] = dd[i + 1] = dd[i + 2] = v; dd[i + 3] = 10; }
      nx.putImageData(id, 0, 0);
      x.save(); x.setTransform(1, 0, 0, 1, 0, 0); x.drawImage(nc, Math.round(tx(-(cx + cw)) * dpr), Math.round(ty(cy + cw) * dpr)); x.restore();
    }
    // centre emblem: Fernsehturm + name
    x.save(); x.globalAlpha = 0.16; x.strokeStyle = '#06324f'; x.fillStyle = '#06324f'; x.lineWidth = Math.max(1.2, r * K * 0.22); x.lineJoin = 'round';
    const s = r * K, ex = OX, ey = OY;
    x.beginPath();
    x.moveTo(ex - 0.5 * s, ey + 5 * s); x.lineTo(ex - 0.32 * s, ey - 2.2 * s); x.lineTo(ex + 0.32 * s, ey - 2.2 * s); x.lineTo(ex + 0.5 * s, ey + 5 * s); x.stroke();
    rr(x, ex - 1.1 * s, ey - 3.6 * s, 2.2 * s, 1.4 * s, 0.4 * s); x.stroke();
    x.beginPath(); x.moveTo(ex, ey - 3.6 * s); x.lineTo(ex, ey - 6.2 * s); x.stroke();
    x.beginPath(); x.ellipse(ex, ey + 5.2 * s, 3.4 * s, 0.7 * s, 0, 0, 7); x.stroke();
    x.font = `800 ${1.25 * s}px system-ui,-apple-system,Arial`; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText('GÖNÜL PLAK', ex, ey + 7.3 * s);
    x.restore();
    // head string
    x.save(); x.globalAlpha = 0.28; x.strokeStyle = '#e8f6ff'; x.lineWidth = 1;
    x.beginPath(); x.moveTo(tx(-geo.X / 2), ty(cy)); x.lineTo(tx(-geo.X / 2), ty(-cy)); x.stroke(); x.restore();
    // cushions (lighter bevel strips, cut at the pockets)
    const cushion = (pts) => { x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(tx(p[0]), ty(p[1])) : x.moveTo(tx(p[0]), ty(p[1]))); x.closePath(); x.fill(); };
    const cutC = r * 2.9, cutM = r * 2.0, jaw = r * 0.95;
    const gcu = x.createLinearGradient(0, ty(cy + cw), 0, ty(-(cy + cw)));
    gcu.addColorStop(0, '#1b7fb6'); gcu.addColorStop(0.5, '#1f8cc4'); gcu.addColorStop(1, '#1b7fb6');
    x.fillStyle = '#0d5f93';
    [1, -1].forEach(sg => {
      cushion([[-cx + cutC - jaw, sg * (cy + cw)], [-cutM, sg * (cy + cw)], [-cutM - jaw * 0.6, sg * cy], [-cx + cutC, sg * cy]]);
      cushion([[cutM, sg * (cy + cw)], [cx - cutC + jaw, sg * (cy + cw)], [cx - cutC, sg * cy], [cutM + jaw * 0.6, sg * cy]]);
      cushion([[sg * (cx + cw), cy - cutC + jaw], [sg * (cx + cw), -cy + cutC - jaw], [sg * cx, -cy + cutC], [sg * cx, cy - cutC]]);
    });
    // cushion nose highlight
    x.strokeStyle = 'rgba(170,230,255,.55)'; x.lineWidth = Math.max(1, r * K * 0.12);
    [1, -1].forEach(sg => {
      [[-cx + cutC, -cutM - jaw * 0.6], [cutM + jaw * 0.6, cx - cutC]].forEach(([a, b]) => { x.beginPath(); x.moveTo(tx(a), ty(sg * cy)); x.lineTo(tx(b), ty(sg * cy)); x.stroke(); });
      x.beginPath(); x.moveTo(tx(sg * cx), ty(cy - cutC)); x.lineTo(tx(sg * cx), ty(-cy + cutC)); x.stroke();
    });
    // diamonds
    x.fillStyle = '#f3e9d8';
    const dy = cy + cw + rw * 0.5, dx = cx + cw + rw * 0.5;
    for (let i = -3; i <= 3; i++) { if (!i) continue; const xx = (cx) * i / 4; [dy, -dy].forEach(yy => { x.beginPath(); x.ellipse(tx(xx), ty(yy), 0.22 * r * K, 0.16 * r * K, 0, 0, 7); x.fill(); }); }
    for (let j = -1; j <= 1; j++) { const yy = cy * j / 2; [dx, -dx].forEach(xx => { x.beginPath(); x.ellipse(tx(xx), ty(yy), 0.16 * r * K, 0.22 * r * K, 0, 0, 7); x.fill(); }); }
    // pockets with metal covers
    geo.pockets.forEach(p => {
      const corner = Math.abs(p.x) > geo.X * 0.5;
      const pr = (corner ? 1.0 : 0.95) * p.rad * K;
      const px = tx(p.x), py = ty(p.y);
      if (corner) {
        const gcov = x.createRadialGradient(px, py, pr * 0.5, px, py, pr * 1.75);
        gcov.addColorStop(0, '#2a2d31'); gcov.addColorStop(0.6, '#5b626b'); gcov.addColorStop(1, '#8d959e');
        x.fillStyle = gcov; x.beginPath(); x.arc(px, py, pr * 1.3, 0, 7); x.fill();
      } else {
        x.fillStyle = '#4d535b'; x.beginPath(); x.ellipse(px, py, pr * 1.3, pr * 1.12, 0, 0, 7); x.fill();
      }
      const gp = x.createRadialGradient(px, py, 0, px, py, pr);
      gp.addColorStop(0, '#000'); gp.addColorStop(0.75, '#060606'); gp.addColorStop(1, '#202020');
      x.fillStyle = gp; x.beginPath(); x.arc(px, py, pr, 0, 7); x.fill();
    });
    // ball return chute: a tube from the top-right rail down the side
    const cxr = box.r + Math.min(W * 0.032, (W - box.r) * 0.4), cwid = RP * 2.6, ctop = ty(geo.cy) + RP * 0.5, cbot = box.b - RP * 1.6, bend = RP * 2.2;
    chute = { x: cxr, top: ctop + bend, bot: cbot, w: cwid };
    const tube = () => { x.beginPath(); x.moveTo(box.r - RP * 1.2, ctop); x.lineTo(cxr - bend, ctop); x.arcTo(cxr, ctop, cxr, ctop + bend, bend); x.lineTo(cxr, cbot); };
    x.save(); x.lineCap = 'round'; x.lineJoin = 'round';
    tube(); x.strokeStyle = '#9aa3ae'; x.lineWidth = cwid + Math.max(3, RP * 0.45); x.stroke();
    tube(); x.strokeStyle = '#0c1018'; x.lineWidth = cwid; x.stroke();
    tube(); x.strokeStyle = 'rgba(255,255,255,.06)'; x.lineWidth = cwid * 0.35; x.stroke();
    x.restore();
  }
  let chute = null;

  /* ------------------------------------------------------------ engine state helpers */
  const ctrl = () => (C && C.controller && C.controller.name) || '';
  const placing = () => ctrl() === 'PlaceBall';
  const myTurn = () => { const n = ctrl(); return (n === 'Aim' || n === 'PlaceBall') && cue.aimInputs && !cue.aimInputs.isDisabled(); };
  const cb = () => table.cueball;
  const V = (x, y) => new G.Vector3(x, y, 0);
  const wrap = a => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };
  function setAngle(a) {
    if (!myTurn() || placing()) return;
    cue.rotateAim(wrap(a - cue.aim.angle), table);
    try { C.sendEvent(cue.aim); C.lastEventTime = performance.now(); } catch (e) {}
  }
  function commitPlace() {
    if (!placing()) return true;
    if (table.overlapsAny(cb().pos)) { say('Top buraya konamaz', 1400); return false; }
    C.inputQueue.push(new G.Input(1, 'SpaceUp'));
    return true;
  }
  function myGroup() { const t = G.Session.getInstance().p1type; return t === 1 ? 'solid' : t === 2 ? 'stripe' : null; }
  const inGroup = (n, g) => g === 'solid' ? n >= 1 && n <= 7 : n >= 9 && n <= 15;
  const onTable = b => b.state !== 'InPocket' && b.state !== 'Falling';
  function labelsOn() { const s = new Set(); table.balls.forEach(b => { if (b.label && onTable(b)) s.add(b.label); }); return s; }
  function legalTarget(n) {
    const g = myGroup(), on = labelsOn();
    if (!g) return n !== 8;
    return [...on].some(l => inGroup(l, g)) ? inGroup(n, g) : n === 8;
  }

  /* ------------------------------------------------------------ guideline */
  function wallT(p, d) {
    const X = geo.X, Y = geo.Y;
    const a = d.x > 0 ? (X - p.x) / d.x : d.x < 0 ? (-X - p.x) / d.x : Infinity;
    const b = d.y > 0 ? (Y - p.y) / d.y : d.y < 0 ? (-Y - p.y) / d.y : Infinity;
    return { t: Math.max(0, Math.min(a, b)), side: a < b ? 'x' : 'y' };
  }
  function trace() {
    const p = cb().pos, a = cue.aim.angle, d = { x: Math.cos(a), y: Math.sin(a) }, r = geo.r;
    let best = Infinity, hit = null;
    for (const b of table.balls) {
      if (b === cb() || !onTable(b)) continue;
      const fx = p.x - b.pos.x, fy = p.y - b.pos.y;
      const B = fx * d.x + fy * d.y, D = B * B - (fx * fx + fy * fy - 4 * r * r);
      if (D < 0) continue;
      const t = -B - Math.sqrt(D);
      if (t > 1e-6 && t < best) { best = t; hit = b; }
    }
    const w = wallT(p, d);
    if (hit && best < w.t) {
      const g = { x: p.x + d.x * best, y: p.y + d.y * best };
      let n = { x: hit.pos.x - g.x, y: hit.pos.y - g.y }; const m = Math.hypot(n.x, n.y) || 1; n = { x: n.x / m, y: n.y / m };
      const dot = d.x * n.x + d.y * n.y;
      return { p, d, ghost: g, ball: hit, n, dot, tan: { x: d.x - dot * n.x, y: d.y - dot * n.y } };
    }
    const wp = { x: p.x + d.x * w.t, y: p.y + d.y * w.t };
    return { p, d, wall: wp, rd: w.side === 'x' ? { x: -d.x, y: d.y } : { x: d.x, y: -d.y } };
  }
  function seg(x, a, b) { x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke(); }
  function drawGuide(x) {
    const t = trace(), r = geo.r, rp = RP;
    const cs = [tx(t.p.x), ty(t.p.y)];
    x.save(); x.lineCap = 'round'; x.strokeStyle = 'rgba(255,255,255,.95)'; x.lineWidth = Math.max(1.3, rp * 0.16);
    x.shadowColor = 'rgba(0,0,0,.35)'; x.shadowBlur = 2;
    if (t.ghost) {
      const gs = [tx(t.ghost.x), ty(t.ghost.y)];
      const L0 = Math.hypot(gs[0] - cs[0], gs[1] - cs[1]) || 1, ux = (gs[0] - cs[0]) / L0, uy = (gs[1] - cs[1]) / L0;
      seg(x, [cs[0] + ux * rp, cs[1] + uy * rp], [gs[0] - ux * rp, gs[1] - uy * rp]);
      x.beginPath(); x.arc(gs[0], gs[1], rp, 0, 7); x.stroke();
      if (!legalTarget(t.ball.label)) {
        x.strokeStyle = '#ff3b30'; const k = rp * 0.6;
        seg(x, [gs[0] - k, gs[1] - k], [gs[0] + k, gs[1] + k]); seg(x, [gs[0] + k, gs[1] - k], [gs[0] - k, gs[1] + k]);
      } else {
        const len = Math.min(r * (3 + 16 * t.dot * t.dot), wallT(t.ball.pos, t.n).t);
        const bs = [tx(t.ball.pos.x), ty(t.ball.pos.y)];
        seg(x, [bs[0] + t.n.x * rp, bs[1] - t.n.y * rp], [tx(t.ball.pos.x + t.n.x * len), ty(t.ball.pos.y + t.n.y * len)]);
        const tl = Math.hypot(t.tan.x, t.tan.y);
        if (tl > 0.03) {
          const td = { x: t.tan.x / tl, y: t.tan.y / tl }, ll = Math.min(r * 9 * tl, wallT(t.ghost, td).t);
          x.globalAlpha = 0.85;
          seg(x, [gs[0] + td.x * rp, gs[1] - td.y * rp], [tx(t.ghost.x + td.x * ll), ty(t.ghost.y + td.y * ll)]);
        }
      }
    } else {
      const ws = [tx(t.wall.x), ty(t.wall.y)];
      const L0 = Math.hypot(ws[0] - cs[0], ws[1] - cs[1]) || 1, ux = (ws[0] - cs[0]) / L0, uy = (ws[1] - cs[1]) / L0;
      seg(x, [cs[0] + ux * rp, cs[1] + uy * rp], [ws[0] - ux * rp, ws[1] - uy * rp]);
      x.beginPath(); x.arc(ws[0], ws[1], rp, 0, 7); x.stroke();
    }
    x.restore();
  }

  /* ------------------------------------------------------------ cue stick */
  let pull = 0, strike = null, cueAlpha = 0;
  function drawCue(x, ang, gapPx, alpha) {
    if (alpha <= 0.01) return;
    const c = cb(), px = tx(c.pos.x), py = ty(c.pos.y);
    const len = Math.max(W * 0.42, geo.X * K * 1.05), tipW = RP * 0.36, buttW = RP * 0.82;
    x.save(); x.globalAlpha = alpha; x.translate(px, py); x.rotate(-ang + Math.PI);
    x.translate(RP + gapPx, 0);
    // shadow
    x.save(); x.translate(RP * 0.2, RP * 0.45); x.fillStyle = 'rgba(0,0,0,.16)';
    x.beginPath(); x.moveTo(0, -tipW / 2); x.lineTo(len, -buttW / 2); x.lineTo(len, buttW / 2); x.lineTo(0, tipW / 2); x.fill(); x.restore();
    const g = x.createLinearGradient(0, 0, len, 0);
    g.addColorStop(0, '#f4f1ea'); g.addColorStop(0.012, '#f4f1ea'); g.addColorStop(0.013, '#2f6fd6'); g.addColorStop(0.022, '#2f6fd6');
    g.addColorStop(0.023, '#efe3c6'); g.addColorStop(0.08, '#e8cf9c'); g.addColorStop(0.52, '#d2a466');
    g.addColorStop(0.525, '#e8c35a'); g.addColorStop(0.535, '#e8c35a'); g.addColorStop(0.54, '#1d0d06'); g.addColorStop(0.62, '#5a2410');
    g.addColorStop(0.75, '#7b3416'); g.addColorStop(0.9, '#3a1508'); g.addColorStop(0.97, '#e8c35a'); g.addColorStop(0.98, '#111'); g.addColorStop(1, '#111');
    x.fillStyle = g;
    x.beginPath(); x.moveTo(0, -tipW / 2); x.lineTo(len, -buttW / 2); x.lineTo(len, buttW / 2); x.lineTo(0, tipW / 2); x.closePath(); x.fill();
    x.globalAlpha = alpha * 0.45; x.fillStyle = '#fff';
    x.beginPath(); x.moveTo(0, -tipW * 0.32); x.lineTo(len, -buttW * 0.3); x.lineTo(len, -buttW * 0.1); x.lineTo(0, -tipW * 0.1); x.fill();
    x.restore();
  }

  /* ------------------------------------------------------------ frame */
  const potted = [];
  function trackPotted() {
    table.balls.forEach(b => { if (b.label && b.state === 'InPocket' && !potted.includes(b.label)) potted.push(b.label); });
  }
  let lastCtrl = '', lastTurnMine = null;
  function frame(ts) {
    try {
      const x = ctx; x.setTransform(1, 0, 0, 1, 0, 0);
      x.drawImage(bg, 0, 0); x.setTransform(dpr, 0, 0, dpr, 0, 0);
      const name = ctrl(), mine = myTurn();
      const still = table.allStationary();
      // shadows
      x.fillStyle = 'rgba(0,0,0,.33)';
      for (const b of table.balls) {
        if (b.state === 'InPocket') continue;
        const sc = b.state === 'Falling' ? Math.max(0.2, 1 + b.pos.z / (2 * geo.r)) : 1;
        x.beginPath(); x.ellipse(tx(b.pos.x) + RP * 0.28, ty(b.pos.y) + RP * 0.38, RP * 1.02 * sc, RP * 0.96 * sc, 0, 0, 7); x.fill();
      }
      // balls
      for (const b of table.balls) {
        if (b.state === 'InPocket') continue;
        let sc = 1, al = 1;
        if (b.state === 'Falling') { sc = Math.max(0.15, 1 + b.pos.z / (2 * geo.r)); al = Math.max(0, sc); }
        const sp = ballSprite(b), sz = sp.width / dpr * sc;
        x.globalAlpha = al; x.drawImage(sp, tx(b.pos.x) - sz / 2, ty(b.pos.y) - sz / 2, sz, sz); x.globalAlpha = 1;
      }
      // ball in hand marker
      if (mine && placing()) {
        const c = cb(), px = tx(c.pos.x), py = ty(c.pos.y), bad = table.overlapsAny(c.pos);
        x.save(); x.strokeStyle = bad ? '#ff3b30' : 'rgba(255,255,255,.9)'; x.lineWidth = 1.5; x.setLineDash([4, 4]);
        x.lineDashOffset = -ts / 60; x.beginPath(); x.arc(px, py, RP * 2.2, 0, 7); x.stroke(); x.restore();
        x.font = `${RP * 2.2}px system-ui`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✋', px + RP * 2.1, py - RP * 2.3);
      }
      // guideline + cue
      if (mine && still && !strike) drawGuide(x);
      const showCue = still && (name === 'Aim' || name === 'WatchAim' || (name === 'PlaceBall' && mine)) || strike;
      cueAlpha += ((showCue ? 1 : 0) - cueAlpha) * (showCue ? 0.35 : 0.2);
      let gap = pull * RP * 9;
      if (strike) {
        const k = Math.min(1, (ts - strike.t0) / 90);
        gap = strike.from * (1 - k * k) - RP * 0.6 * k * k;
        if (k >= 1 && !strike.done) { strike.done = true; strike.fire(); }
        if (ts - strike.t0 > 260) strike = null;
      }
      drawCue(x, cue.aim.angle, Math.max(-RP * 0.6, gap), cueAlpha);
      // chute
      trackPotted();
      if (chute) {
        const n = potted.length, step = RP * 2.05;
        potted.forEach((lab, i) => {
          const img = chuteIcon(lab), yy = chute.bot - RP * 0.1 - i * step;
          if (yy < chute.top) return;
          x.drawImage(img, chute.x - RP, yy - RP, RP * 2, RP * 2);
        });
      }
      // turn change
      if (mine !== lastTurnMine) {
        lastTurnMine = mine;
        stage.classList.toggle('mine', mine);
        if (!mine) closeSpin();
      }
      if (name !== lastCtrl) { lastCtrl = name; hud(); }
      hudBalls(); paintSpinDot(); idleMsg();
    } catch (e) { if (!frame.err) { frame.err = 1; console.warn(e); } }
    requestAnimationFrame(frame);
  }
  const chuteImgs = {};
  function chuteIcon(n) {
    if (chuteImgs[n] && chuteImgs[n].rp === RP * dpr) return chuteImgs[n].cv;
    const c = document.createElement('canvas'); paintBall(n, { x: 0, y: 0.38, z: 0, w: 0.925 }, RP * dpr, c);
    chuteImgs[n] = { cv: c, rp: RP * dpr }; return c;
  }

  /* ------------------------------------------------------------ HUD (DOM) */
  const ui = document.createElement('div'); ui.className = 'g8ui';
  ui.innerHTML = `
    <button class="g8menu" aria-label="Menü"><i></i><i></i><i></i></button>
    <div class="g8top">
      <div class="g8side l"><div class="g8name"><span class="g8lvl">★</span><b>${ME}</b></div><div class="g8row" id="g8r1"></div></div>
      <div class="g8av me"><span>${(ME[0] || 'E').toUpperCase()}</span></div>
      <div class="g8pot"><span class="g8tro">🏆</span><b id="g8wins">0</b></div>
      <div class="g8av op"><span>🤖</span></div>
      <div class="g8side r"><div class="g8name"><b>${BOTNAME}</b><span class="g8lvl">${LVL === 'zor' ? '★★' : '★'}</span></div><div class="g8row" id="g8r2"></div></div>
    </div>
    <div class="g8power"><div class="g8slot"><div class="g8stick"></div></div></div>
    <button class="g8spin" aria-label="Falso"><i></i></button>
    <div class="g8msg"></div>
    <div class="g8sheet" hidden><div class="g8card">
      <button data-a="new">Yeni oyun</button>
      <button data-a="lvl">Rakip: <b>${LVL === 'zor' ? 'Zor' : 'Kolay'}</b> → ${LVL === 'zor' ? 'Kolay' : 'Zor'}</button>
      <button data-a="exit">Bilardodan çık</button>
      <button data-a="close" class="g8ghost">Kapat</button>
    </div></div>
    <div class="g8spinbox" hidden><div class="g8card"><div class="g8big"><i></i></div><p>Topa vuracağın noktayı seç</p>
      <div class="g8two"><button data-a="reset" class="g8ghost">Ortala</button><button data-a="ok">Tamam</button></div></div></div>
    <div class="g8over" hidden><div class="g8card"><div class="g8ot"></div><div class="g8os"></div>
      <button data-a="new">Tekrar oyna</button><button data-a="exit" class="g8ghost">Çık</button></div></div>`;
  const $ = s => ui.querySelector(s);
  $('#g8wins').textContent = ls.get('gp_pool_wins', '0');

  let hudKey = '';
  function hud() {
    const mine = myTurn(), n = ctrl();
    const opTurn = n === 'WatchAim' || n === 'WatchShot';
    $('.g8av.me').classList.toggle('on', mine || (n === 'PlayShot' && lastTurnMine));
    $('.g8av.op').classList.toggle('on', opTurn);
  }
  function hudBalls() {
    const g = myGroup(), on = labelsOn();
    const key = g + [...on].join(',');
    if (key === hudKey) return; hudKey = key;
    const og = g === 'solid' ? 'stripe' : g === 'stripe' ? 'solid' : null;
    const row = grp => {
      if (!grp) return '<i></i>'.repeat(7);
      const left = [];
      for (let i = 1; i <= 15; i++) if (i !== 8 && inGroup(i, grp) && on.has(i)) left.push(i);
      if (!left.length && on.has(8)) left.push(8);
      let h = '';
      for (let i = 0; i < 7; i++) h += left[i] ? `<i style="background-image:url(${ballIcon(left[i])})"></i>` : '<i></i>';
      return h;
    };
    $('#g8r1').innerHTML = row(g); $('#g8r2').innerHTML = row(og);
  }

  // messages
  let msgUntil = 0;
  function say(t, ms) { const m = $('.g8msg'); m.textContent = t; m.classList.add('on'); msgUntil = performance.now() + (ms || 2200); }
  function idleMsg() {
    if (performance.now() < msgUntil) return;
    const m = $('.g8msg'), n = ctrl();
    let t = '';
    if (myTurn()) t = placing() ? 'Elde top. Beyazı sürükle.' : 'Sıra sende.';
    else if (n === 'WatchAim') t = 'Rakip nişan alıyor…';
    if (m.textContent !== t) m.textContent = t;
    m.classList.toggle('on', !!t);
  }
  // mirror engine notifications (FAUL etc.) and detect game over
  function watchNotes() {
    const el = document.getElementById('notification');
    if (!el) return setTimeout(watchNotes, 300);
    let last = '';
    new MutationObserver(() => {
      const txt = (el.innerText || '').trim().replace(/\s+/g, ' ');
      if (!txt || txt === last) return; last = txt;
      const up = txt.toLocaleUpperCase('tr');
      if (/KAZANDIN|KAYBETTİN|OYUN BİTTİ/.test(up)) return gameOver(/KAZANDIN/.test(up));
      say(txt.length > 60 ? txt.slice(0, 58) + '…' : txt, 2600);
    }).observe(el, { childList: true, subtree: true, characterData: true });
  }
  let over = false;
  function gameOver(won) {
    if (over) return; over = true;
    if (won) { const w = (+ls.get('gp_pool_wins', '0') || 0) + 1; ls.set('gp_pool_wins', String(w)); $('#g8wins').textContent = w; }
    $('.g8ot').textContent = won ? 'KAZANDIN! 🏆' : 'Kaybettin';
    $('.g8os').textContent = won ? `${BOTNAME}'u yendin.` : `${BOTNAME} bu eli aldı. Rövanş?`;
    setTimeout(() => { $('.g8over').hidden = false; }, 900);
  }

  // menu
  function restart(level) {
    const p = new URLSearchParams(location.search);
    if (level) { ls.set('gp_pool_lvl', level); p.set('bot', level === 'kolay' ? 'ClawBreak' : 'TheFarJaw'); }
    p.set('t', Date.now()); location.search = p.toString();
  }
  function exitPool() { try { parent.postMessage('pool-exit', '*'); } catch (e) {} }
  ui.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const a = b.dataset.a;
    if (b.classList.contains('g8menu')) { $('.g8sheet').hidden = false; return; }
    if (a === 'new') restart();
    else if (a === 'lvl') restart(LVL === 'zor' ? 'kolay' : 'zor');
    else if (a === 'exit') { $('.g8sheet').hidden = true; exitPool(); }
    else if (a === 'close') $('.g8sheet').hidden = true;
  });
  $('.g8sheet').addEventListener('click', e => { if (e.target.classList.contains('g8sheet')) e.currentTarget.hidden = true; });

  // spin
  const big = $('.g8big');
  function closeSpin() { $('.g8spinbox').hidden = true; }
  $('.g8spin').addEventListener('click', () => { if (myTurn()) $('.g8spinbox').hidden = false; });
  $('.g8spinbox').addEventListener('click', e => {
    const a = e.target.dataset && e.target.dataset.a;
    if (a === 'reset') { cue.setSpin(V(0, 0), table); }
    if (a === 'ok' || e.target.classList.contains('g8spinbox')) closeSpin();
  });
  function spinAt(e) {
    const p = local(e), r = big.getBoundingClientRect();
    // r is in screen coords; convert centre to stage coords
    const c = local({ clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 }), rad = big.offsetWidth / 2;
    let u = (p.x - c.x) / rad, v = (p.y - c.y) / rad; const m = Math.hypot(u, v); if (m > 0.78) { u *= 0.78 / m; v *= 0.78 / m; }
    cue.setSpin(V(-u / 1.3, -v / 1.3), table);
    try { C.sendEvent(cue.aim); } catch (er) {}
  }
  let spinning = false;
  big.addEventListener('pointerdown', e => { spinning = true; big.setPointerCapture(e.pointerId); spinAt(e); });
  big.addEventListener('pointermove', e => spinning && spinAt(e));
  big.addEventListener('pointerup', () => spinning = false);
  function paintSpinDot() {
    const o = cue.aim.offset, u = -o.x * 1.3, v = -o.y * 1.3;
    const css = `left:${(u / 2 + 0.5) * 100}%;top:${(v / 2 + 0.5) * 100}%`;
    const a = $('.g8spin i'), b = $('.g8big i');
    if (a.style.cssText !== css) { a.style.cssText = css; b.style.cssText = css; }
  }

  /* ------------------------------------------------------------ input */
  function local(e) { return rot ? { x: e.clientY, y: innerWidth - e.clientX } : { x: e.clientX, y: e.clientY }; }
  const touch = document.createElement('div'); touch.className = 'g8touch';
  let drag = null;
  touch.addEventListener('pointerdown', e => {
    if (!myTurn() || strike) return;
    touch.setPointerCapture(e.pointerId);
    const p = local(e), c = cb().pos, cs = { x: tx(c.x), y: ty(c.y) };
    if (placing() && Math.hypot(p.x - cs.x, p.y - cs.y) < Math.max(28, RP * 3.2)) { drag = { mode: 'ball' }; return; }
    if (placing()) { if (!commitPlace()) return; drag = { mode: 'aim', p0: p, t0: performance.now(), moved: 0, wait: true }; setTimeout(() => { if (drag) { drag.wait = false; aimAt(p); } }, 120); return; }
    const a0 = Math.atan2(-(p.y - cs.y), p.x - cs.x);
    drag = { mode: 'aim', p0: p, t0: performance.now(), moved: 0, fa: a0, ca: cue.aim.angle, near: Math.hypot(p.x - cs.x, p.y - cs.y) < RP * 4 };
  });
  touch.addEventListener('pointermove', e => {
    if (!drag || !myTurn()) return;
    const p = local(e);
    if (drag.mode === 'ball') {
      if (!placing()) return;
      const t = fromStage(p.x, p.y);
      const pos = C.rules.placeBall(new G.Vector3(t.x, t.y, 0));
      cb().pos.copy(pos); cb().fround && cb().fround(); cb().updateMesh && cb().updateMesh(0); cue.moveTo(cb().pos);
      return;
    }
    if (drag.wait) return;
    drag.moved = Math.max(drag.moved, Math.hypot(p.x - drag.p0.x, p.y - drag.p0.y));
    const c = cb().pos, cs = { x: tx(c.x), y: ty(c.y) };
    if (drag.near || drag.fa == null) { aimAt(p); return; }
    const fa = Math.atan2(-(p.y - cs.y), p.x - cs.x);
    setAngle(drag.ca + wrap(fa - drag.fa));
  });
  function endDrag(e) {
    if (drag && drag.mode === 'aim' && !drag.wait && drag.moved < 6 && performance.now() - drag.t0 < 350 && e && e.type === 'pointerup') aimAt(local(e));
    drag = null;
  }
  touch.addEventListener('pointerup', endDrag); touch.addEventListener('pointercancel', () => drag = null);
  function aimAt(p) { const t = fromStage(p.x, p.y), c = cb().pos; setAngle(Math.atan2(t.y - c.y, t.x - c.x)); }

  // power: pull the cue down in the slot, release to strike
  const pw = $('.g8power'), stick = $('.g8stick');
  let pd = null;
  pw.addEventListener('pointerdown', e => { if (!myTurn() || strike) return; pw.setPointerCapture(e.pointerId); pd = { y: local(e).y }; });
  pw.addEventListener('pointermove', e => {
    if (!pd) return; const len = pw.offsetHeight * 0.78;
    pull = Math.max(0, Math.min(1, (local(e).y - pd.y) / len));
    stick.style.transform = `translateY(${pull * len}px)`;
    pw.classList.toggle('pulling', pull > 0);
  });
  function releasePower() {
    if (!pd) return; pd = null; pw.classList.remove('pulling');
    const p = pull; stick.style.transition = 'transform .12s ease-in'; stick.style.transform = ''; setTimeout(() => stick.style.transition = '', 140);
    if (p < 0.03 || !myTurn()) { pull = 0; return; }
    const go = () => {
      strike = { t0: performance.now(), from: p * RP * 9, fire: () => { const inp = document.getElementById('cuePower'); if (inp) inp.value = String(Math.max(0.04, p)); cue.aimInputs.hit(); } };
      pull = 0;
    };
    if (placing()) { if (!commitPlace()) { pull = 0; return; } setTimeout(go, 150); } else go();
  }
  pw.addEventListener('pointerup', releasePower);
  pw.addEventListener('pointercancel', () => { pd = null; pull = 0; stick.style.transform = ''; });

  /* ------------------------------------------------------------ boot */
  function boot() {
    G = window.__gp;
    if (!G || !G.container || !G.container.table || !G.container.view) return setTimeout(boot, 50);
    C = G.container; table = C.table; cue = table.cue;
    try { C.view.render = () => {}; C.view.renderCamera = () => {}; } catch (e) {}   // 3D off – we draw in 2D
    table.balls.forEach(b => { try { b.ballmesh.mesh.quaternion.set(0, 0, 0, 1); } catch (e) {} });
    readGeo();
    document.body.classList.add('g8on');
    stage.append(cv, touch, ui);
    document.body.append(stage);
    layout();
    addEventListener('resize', () => setTimeout(layout, 60));
    addEventListener('orientationchange', () => setTimeout(layout, 250));
    window.__g8 = { toStage: (x, y) => [tx(x), ty(y)] };   // test hook
    watchNotes(); hud(); hudBalls();
    requestAnimationFrame(frame);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
