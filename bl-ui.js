/* Gönül Plak · Bilardo
 * 3D (three.js) üstten bakan masa ve 8-top arayüzü. Dikeyde masa dik, yatayda yan durur.
 * Fizik, kurallar ve robot: tailuge/billiards motoru (GPL-3.0); 3D çizimi kapalı, motor arkada çalışır. */
(() => {
  'use strict';
  const qs = new URLSearchParams(location.search);
  const ME = (qs.get('userName') || 'Eren').slice(0, 14);
  const LVL = qs.get('bot') === 'ClawBreak' ? 'kolay' : 'zor';
  const BOTNAME = LVL === 'kolay' ? 'Robot Kolay' : 'Robot Zor';
  const ls = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

  const COL = { 0: [250, 248, 240], 1: [250, 196, 20], 2: [20, 74, 200], 3: [220, 34, 28], 4: [100, 38, 158], 5: [246, 114, 22], 6: [16, 134, 62], 7: [132, 22, 24], 8: [18, 18, 20] };
  const baseOf = n => COL[n > 8 ? n - 8 : n] || COL[0];

  let G, C, table, cue;
  let W = 0, H = 0, dpr = 1, port = false;
  let VW = 0, VH = 0, VT = [1, 0, 0, 1, 0, 0];   // virtual (landscape table frame) → screen
  let K = 1, OX = 0, OY = 0, RP = 8;
  let geo = null, box = {}, chute = null;
  const stage = document.createElement('div'); stage.id = 'g8';
  const cv = document.createElement('canvas'); cv.className = 'g8cv';
  const ctx = cv.getContext('2d');
  const bg = document.createElement('canvas');

  /* ------------------------------------------------------------ coordinates */
  const tx = x => OX + x * K, ty = y => OY - y * K;                       // table → virtual
  const vToS = (u, v) => [VT[0] * u + VT[2] * v + VT[4], VT[1] * u + VT[3] * v + VT[5]];
  const sToV = (x, y) => port ? [VT[5] - y, x - VT[4]] : [x, y];
  const tToS = (x, y) => vToS(tx(x), ty(y));
  const sToT = (sx, sy) => { const [u, v] = sToV(sx, sy); return { x: (u - OX) / K, y: (OY - v) / K }; };
  const useV = c => c.setTransform(VT[0] * dpr, VT[1] * dpr, VT[2] * dpr, VT[3] * dpr, VT[4] * dpr, VT[5] * dpr);
  const useS = c => c.setTransform(dpr, 0, 0, dpr, 0, 0);

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

  // vert: table long axis is vertical on screen (portrait)
  function paintBall(label, q, rp, out, vert) {
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
        const sx = nx / Math.max(1, r), sy = -ny / Math.max(1, r);           // screen normal (y up) for light
        const wx = vert ? -ny / Math.max(1, r) : sx, wy = vert ? -nx / Math.max(1, r) : sy, wz = nz; // table normal
        const dt = ux * wx + uy * wy + uz * wz;
        const cx = uy * wz - uz * wy, cy = uz * wx - ux * wz, cz = ux * wy - uy * wx;
        const lx = 2 * dt * ux + (s * s - uu) * wx + 2 * s * cx;
        const ly = 2 * dt * uy + (s * s - uu) * wy + 2 * s * cy;
        const lz = 2 * dt * uz + (s * s - uu) * wz + 2 * s * cz;
        let R0, G0, B0;
        if (cueb) { R0 = 250; G0 = 248; B0 = 240; }
        else if (Math.abs(lz) > 0.875) {
          const qx = (lz > 0 ? lx : -lx) / 0.484, qy = ly / 0.484;
          const tX = Math.max(0, Math.min(63, ((qx * 0.5 + 0.5) * 64) | 0)), tY = Math.max(0, Math.min(63, ((0.5 - qy * 0.5) * 64) | 0));
          R0 = G0 = B0 = tex[(tY * 64 + tX) * 4] > 128 ? 252 : 20;
        } else if (stripe && Math.abs(lx) > 0.52) { R0 = 250; G0 = 248; B0 = 240; }
        else { R0 = base[0]; G0 = base[1]; B0 = base[2]; }
        const df = Math.max(0, sx * L[0] + sy * L[1] + nz * L[2]);
        const sp = Math.pow(Math.max(0, sx * Hh[0] + sy * Hh[1] + nz * Hh[2]), 48) * 0.9;
        const k = 0.52 + 0.6 * df, rim = 0.84 + 0.16 * nz;
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
    const c = document.createElement('canvas'); paintBall(n, IDQ, 22, c, false);
    return (iconCache[n] = c.toDataURL());
  }
  const chuteImgs = {};
  function chuteIcon(n) {
    const rp = RP * dpr;
    if (chuteImgs[n] && chuteImgs[n].rp === rp) return chuteImgs[n].cv;
    const c = document.createElement('canvas'); paintBall(n, { x: 0, y: 0.38, z: 0, w: 0.925 }, rp, c, false);
    chuteImgs[n] = { cv: c, rp }; return c;
  }

  /* ------------------------------------------------------------ layout */
  function readGeo() {
    const r = G.R(), T = G.TableGeometry, P = G.PocketGeometry;
    geo = { r, X: T.tableX, Y: T.tableY, pockets: (P.pocketCenters || []).map(p => ({ x: p.pos.x, y: p.pos.y, rad: p.radius })) };
    geo.cx = geo.X + r; geo.cy = geo.Y + r;
    geo.cw = r * 1.5; geo.rw = r * 3.1; geo.rim = r * 0.55;
    geo.HX = geo.cx + geo.cw + geo.rw + geo.rim; geo.HY = geo.cy + geo.cw + geo.rw + geo.rim;
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  let lastSize = '';
  function layout() {
    W = innerWidth; H = innerHeight; lastSize = W + 'x' + H;
    if (!W || !H) return;
    port = H > W;
    stage.classList.toggle('port', port);
    stage.style.width = W + 'px'; stage.style.height = H + 'px';
    const u = Math.min(W, H) / 100;
    stage.style.setProperty('--u', u + 'px');
    dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    if (!geo) return;
    let slot;
    if (port) {
      const hudH = clamp(H * 0.115, 58, 92), botH = clamp(H * 0.11, 58, 84), slotW = clamp(W * 0.115, 38, 54), pad = 8;
      const A = { x: pad + slotW + pad, y: hudH + 2, w: W - (pad + slotW + pad) - pad, h: H - hudH - botH - 4 };
      VW = A.h; VH = A.w; VT = [0, -1, 1, 0, A.x, A.y + A.h];
      K = Math.min(VW / (2 * geo.HX), VH / (2 * geo.HY));
      OX = VW / 2; OY = VH / 2;
      const [l, b] = vToS(tx(-geo.HX), ty(-geo.HY)), [r2, t] = vToS(tx(geo.HX), ty(geo.HY));
      box = { l: Math.min(l, r2), r: Math.max(l, r2), t: Math.min(t, b), b: Math.max(t, b) };
      slot = { l: pad, w: slotW, t: box.t + 14, h: box.b - box.t - 28 };
      stage.style.setProperty('--hud', hudH + 'px'); stage.style.setProperty('--bot', botH + 'px');
    } else {
      const top = H * 0.17, bot = H * 0.03, side = Math.max(W * 0.13, H * 0.24);
      VW = W; VH = H; VT = [1, 0, 0, 1, 0, 0];
      const bw = W - side * 2, bh = H - top - bot;
      K = Math.min(bw / (2 * geo.HX), bh / (2 * geo.HY));
      OX = W / 2; OY = top + bh / 2;
      box = { l: tx(-geo.HX), r: tx(geo.HX), t: ty(geo.HY), b: ty(-geo.HY) };
      const slotW = clamp(u * 8, 30, 52);
      slot = { l: Math.max(6, (box.l - slotW) / 2), w: slotW, t: box.t + (box.b - box.t) * 0.12, h: (box.b - box.t) * 0.76 };
      stage.style.setProperty('--hud', top + 'px');
    }
    RP = geo.r * K;
    stage.style.setProperty('--sl', slot.l + 'px'); stage.style.setProperty('--sw', slot.w + 'px');
    stage.style.setProperty('--st', slot.t + 'px'); stage.style.setProperty('--sh', slot.h + 'px');
    stage.style.setProperty('--tb', (H - box.b) + 'px'); stage.style.setProperty('--tt', box.t + 'px');
    drawTable();
  }

  /* ------------------------------------------------------------ backdrop (2D, under the 3D table) */
  function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
  function drawTable() {
    bg.width = cv.width; bg.height = cv.height;
    const x = bg.getContext('2d');
    useS(x);
    const g0 = x.createRadialGradient(W / 2, H * 0.45, Math.min(W, H) * 0.05, W / 2, H * 0.5, Math.max(W, H) * 0.75);
    g0.addColorStop(0, '#2b3954'); g0.addColorStop(0.55, '#18213a'); g0.addColorStop(1, '#0b101c');
    x.fillStyle = g0; x.fillRect(0, 0, W, H);
    // soft drop shadow under the table
    x.save(); x.shadowColor = 'rgba(0,0,0,.75)'; x.shadowBlur = 34; x.shadowOffsetX = port ? -10 : 0; x.shadowOffsetY = port ? 0 : 12;
    rr(x, box.l + 4, box.t + 4, box.r - box.l - 8, box.b - box.t - 8, RP * 2.2); x.fillStyle = '#05070c'; x.fill(); x.restore();
    // ball return chute (landscape only; in portrait the HUD rows show potted balls)
    chute = null;
    if (!port && W - box.r > RP * 5) {
      const cxr = box.r + Math.min(W * 0.032, (W - box.r) * 0.4), cwid = RP * 2.6, ctop = ty(geo.cy) + RP * 0.5, cbot = box.b - RP * 1.6, bend = RP * 2.2;
      chute = { x: cxr, top: ctop + bend, bot: cbot };
      const tube = () => { x.beginPath(); x.moveTo(box.r - RP * 1.2, ctop); x.lineTo(cxr - bend, ctop); x.arcTo(cxr, ctop, cxr, ctop + bend, bend); x.lineTo(cxr, cbot); };
      x.save(); x.lineCap = 'round'; x.lineJoin = 'round';
      tube(); x.strokeStyle = '#7d8794'; x.lineWidth = cwid + Math.max(4, RP * 0.55); x.stroke();
      tube(); x.strokeStyle = '#c3cad3'; x.lineWidth = cwid + Math.max(2, RP * 0.25); x.stroke();
      tube(); x.strokeStyle = '#090c13'; x.lineWidth = cwid; x.stroke();
      tube(); x.strokeStyle = 'rgba(255,255,255,.07)'; x.lineWidth = cwid * 0.3; x.stroke();
      x.restore();
    }
    if (S3) sizeGL();
  }

  /* ------------------------------------------------------------ 3D table (three.js, orthographic, top down) */
  let T = null, S3 = null;   // three namespace, scene state
  const glcv = document.createElement('canvas'); glcv.className = 'g8gl';
  bg.className = 'g8bg';
  const mkCanvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  function tex(c, o) {
    const t = new T.CanvasTexture(c);
    t.colorSpace = T.SRGBColorSpace;
    t.anisotropy = Math.min(8, S3.r.capabilities.getMaxAnisotropy());
    if (o && o.rep) { t.wrapS = t.wrapT = T.RepeatWrapping; t.repeat.set(o.rep, o.rep); }
    return t;
  }
  // screen up / right as table directions (portrait: table x points up)
  const scrUp = () => port ? [1, 0] : [0, 1];
  const scrRt = () => port ? [0, -1] : [1, 0];

  function noiseTile(n, a, b) {
    const c = mkCanvas(n, n), x = c.getContext('2d'), id = x.createImageData(n, n), d = id.data;
    for (let i = 0; i < d.length; i += 4) { const v = a + Math.random() * (b - a); d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
    x.putImageData(id, 0, 0); return c;
  }
  function woodCanvas() {
    const c = mkCanvas(1024, 1024), x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, 1024);
    g.addColorStop(0, '#6e130f'); g.addColorStop(0.5, '#8a1d15'); g.addColorStop(1, '#6a120e');
    x.fillStyle = g; x.fillRect(0, 0, 1024, 1024);
    for (let i = 0; i < 420; i++) {
      const y = Math.random() * 1024, a = 0.03 + Math.random() * 0.09, w = 0.6 + Math.random() * 2.4;
      x.strokeStyle = Math.random() < 0.7 ? `rgba(30,0,0,${a})` : `rgba(255,150,110,${a * 0.6})`; x.lineWidth = w;
      x.beginPath(); x.moveTo(0, y);
      for (let k = 1; k <= 8; k++) x.lineTo(k * 128, y + Math.sin(k * 0.9 + y * 0.03) * (4 + Math.random() * 6));
      x.stroke();
    }
    for (let i = 0; i < 14; i++) {   // knots
      const kx = Math.random() * 1024, ky = Math.random() * 1024, rw = 20 + Math.random() * 60;
      for (let j = 0; j < 6; j++) { x.strokeStyle = 'rgba(40,0,0,.08)'; x.lineWidth = 1.5; x.beginPath(); x.ellipse(kx, ky, rw * (1 - j * 0.14), rw * 0.18 * (1 - j * 0.12), 0, 0, 7); x.stroke(); }
    }
    return c;
  }
  // cloth: lighting, edge shade, head string and the emblem are baked into one texture
  function clothCanvas() {
    const { r, cx, cy, cw } = geo, wx = cx + cw, wy = cy + cw;
    const PX = 1400, PY = Math.round(PX * wy / wx), s = PX / (2 * wx);
    const c = mkCanvas(PX, PY), x = c.getContext('2d');
    const X = v => (v + wx) * s, Y = v => (wy - v) * s;
    const g = x.createRadialGradient(PX / 2, PY / 2, PY * 0.05, PX / 2, PY / 2, PX * 0.62);
    g.addColorStop(0, '#47b4ec'); g.addColorStop(0.45, '#2f9ad9'); g.addColorStop(1, '#176aa8');
    x.fillStyle = g; x.fillRect(0, 0, PX, PY);
    const n = noiseTile(256, 0, 255);
    x.save(); x.globalAlpha = 0.05; x.globalCompositeOperation = 'overlay';
    for (let i = 0; i < PX; i += 256) for (let j = 0; j < PY; j += 256) x.drawImage(n, i, j);
    x.restore();
    // shade under the cushions
    const e = r * 1.3 * s;
    [[0, Y(cy), 0, Y(cy) + e, 0, 0, PX, Y(cy) + e], [0, Y(-cy), 0, Y(-cy) - e, 0, Y(-cy) - e, PX, PY], [X(-cx), 0, X(-cx) + e, 0, 0, 0, X(-cx) + e, PY], [X(cx), 0, X(cx) - e, 0, X(cx) - e, 0, PX, PY]]
      .forEach(([a, b, c2, d, rx, ry, rx2, ry2]) => { const lg = x.createLinearGradient(a, b, c2, d); lg.addColorStop(0, 'rgba(0,20,50,.42)'); lg.addColorStop(1, 'rgba(0,20,50,0)'); x.fillStyle = lg; x.fillRect(rx, ry, rx2 - rx, ry2 - ry); });
    // head string + spots
    x.strokeStyle = 'rgba(225,245,255,.22)'; x.lineWidth = Math.max(1.5, r * s * 0.07);
    x.beginPath(); x.moveTo(X(-geo.X / 2), Y(cy)); x.lineTo(X(-geo.X / 2), Y(-cy)); x.stroke();
    x.fillStyle = 'rgba(225,245,255,.28)';
    [[-geo.X / 2, 0], [geo.X / 2, 0]].forEach(([a, b]) => { x.beginPath(); x.arc(X(a), Y(b), r * s * 0.13, 0, 7); x.fill(); });
    // emblem: Fernsehturm + GÖNÜL PLAK, upright on screen
    x.save(); x.translate(X(0), Y(0)); if (port) x.rotate(Math.PI / 2);
    const k = r * s; x.globalAlpha = 0.17; x.strokeStyle = '#04304f'; x.fillStyle = '#04304f'; x.lineWidth = k * 0.2; x.lineJoin = 'round'; x.lineCap = 'round';
    x.beginPath(); x.moveTo(-0.55 * k, 4.6 * k); x.lineTo(-0.3 * k, -2.0 * k); x.lineTo(0.3 * k, -2.0 * k); x.lineTo(0.55 * k, 4.6 * k); x.stroke();
    rr(x, -1.15 * k, -3.5 * k, 2.3 * k, 1.5 * k, 0.45 * k); x.stroke();
    x.beginPath(); x.moveTo(0, -3.5 * k); x.lineTo(0, -6.4 * k); x.stroke();
    x.beginPath(); x.ellipse(0, 4.8 * k, 3.6 * k, 0.75 * k, 0, 0, 7); x.stroke();
    x.font = `800 ${1.3 * k}px system-ui,-apple-system,Arial`; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText('GÖNÜL PLAK', 0, 7.0 * k);
    x.restore();
    return c;
  }
  function radialCanvas(n, stops) {
    const c = mkCanvas(n, n), x = c.getContext('2d'), g = x.createRadialGradient(n / 2, n / 2, 0, n / 2, n / 2, n / 2);
    stops.forEach(([o, col]) => g.addColorStop(o, col)); x.fillStyle = g; x.fillRect(0, 0, n, n); return c;
  }
  // ball skin in sphere UV space; spots at local ±Z, stripe band around |x| < .52
  function ballCanvas(label) {
    const Wd = 512, Hd = 256, c = mkCanvas(Wd, Hd), x = c.getContext('2d'), id = x.createImageData(Wd, Hd), d = id.data;
    const base = baseOf(label), stripe = label > 8, cueb = !label;
    let dg = null, DN = 128;
    if (label) {
      const dc = mkCanvas(DN, DN), dx = dc.getContext('2d');
      dx.fillStyle = '#fff'; dx.fillRect(0, 0, DN, DN);
      dx.fillStyle = '#141414'; dx.font = `800 ${label > 9 ? 70 : 88}px system-ui,-apple-system,Arial`; dx.textAlign = 'center'; dx.textBaseline = 'middle';
      dx.fillText(String(label), DN / 2, DN / 2 + 5);
      if (label === 6 || label === 9) { dx.fillRect(DN * 0.3, DN * 0.86, DN * 0.4, DN * 0.05); }
      dg = dx.getImageData(0, 0, DN, DN).data;
    }
    const WH = [246, 243, 234], SPOT = 0.85, SR = Math.sqrt(1 - SPOT * SPOT) * 1.02;
    const sm = (a, b, v) => { const t = Math.max(0, Math.min(1, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
    for (let py = 0; py < Hd; py++) {
      const th = (py + 0.5) / Hd * Math.PI, st = Math.sin(th), ct = Math.cos(th);
      for (let px = 0; px < Wd; px++) {
        const ph = (px + 0.5) / Wd * 2 * Math.PI;
        const lx = -Math.cos(ph) * st, ly = ct, lz = Math.sin(ph) * st;
        let col = base;
        if (cueb) col = WH;
        else {
          let r0 = base[0], g0 = base[1], b0 = base[2];
          if (stripe) { const t = sm(0.5, 0.54, Math.abs(lx)); r0 += (WH[0] - r0) * t; g0 += (WH[1] - g0) * t; b0 += (WH[2] - b0) * t; }
          const ts = sm(SPOT - 0.012, SPOT + 0.006, Math.abs(lz));
          if (ts > 0) {
            const qx = (lz > 0 ? lx : -lx) / SR, qy = ly / SR;
            const tX = Math.max(0, Math.min(DN - 1, ((qx * 0.5 + 0.5) * DN) | 0)), tY = Math.max(0, Math.min(DN - 1, ((0.5 - qy * 0.5) * DN) | 0));
            const v = dg[(tY * DN + tX) * 4] / 255, sr = 20 + (WH[0] - 20) * v, sg = 20 + (WH[1] - 20) * v, sb = 20 + (WH[2] - 20) * v;
            r0 += (sr - r0) * ts; g0 += (sg - g0) * ts; b0 += (sb - b0) * ts;
          }
          col = [r0, g0, b0];
        }
        const i = (py * Wd + px) * 4; d[i] = col[0]; d[i + 1] = col[1]; d[i + 2] = col[2]; d[i + 3] = 255;
      }
    }
    x.putImageData(id, 0, 0);
    if (cueb) {   // small red dot so spin and roll are visible on the cue ball, like real practice balls
      x.fillStyle = '#d0201a';
      [[0.25, 0.5], [0.75, 0.5]].forEach(([u, v]) => { x.beginPath(); x.ellipse(u * Wd, v * Hd, Wd * 0.012, Hd * 0.024, 0, 0, 7); x.fill(); });
    }
    return c;
  }
  function cueCanvas() {   // row 0 = butt, last row = tip
    const Wc = 64, Hc = 2048, c = mkCanvas(Wc, Hc), x = c.getContext('2d');
    const band = (a, b, col) => { x.fillStyle = col; x.fillRect(0, a * Hc, Wc, (b - a) * Hc + 1); };
    band(0, 0.015, '#0d0d0d'); band(0.015, 0.03, '#d7b25a');
    band(0.03, 0.27, '#1a1a22');
    for (let y = 0.03 * Hc; y < 0.27 * Hc; y += 6) { x.fillStyle = 'rgba(255,255,255,.05)'; x.fillRect(0, y, Wc, 2); }   // linen wrap
    band(0.27, 0.285, '#d7b25a'); band(0.285, 0.29, '#111');
    const fg = x.createLinearGradient(0, 0.29 * Hc, 0, 0.47 * Hc); fg.addColorStop(0, '#120705'); fg.addColorStop(1, '#2a0f08');
    x.fillStyle = fg; x.fillRect(0, 0.29 * Hc, Wc, 0.18 * Hc);
    for (let k = 0; k < 4; k++) {   // maple points running into the ebony forearm
      const cx0 = (k + 0.5) * Wc / 4; x.fillStyle = '#e8cf9a';
      x.beginPath(); x.moveTo(cx0 - Wc / 9, 0.47 * Hc); x.lineTo(cx0, 0.33 * Hc); x.lineTo(cx0 + Wc / 9, 0.47 * Hc); x.fill();
      x.fillStyle = '#c63a20'; x.beginPath(); x.moveTo(cx0 - Wc / 24, 0.47 * Hc); x.lineTo(cx0, 0.36 * Hc); x.lineTo(cx0 + Wc / 24, 0.47 * Hc); x.fill();
    }
    band(0.47, 0.478, '#cfd4da'); band(0.478, 0.482, '#222'); band(0.482, 0.49, '#cfd4da');
    const sg = x.createLinearGradient(0, 0.49 * Hc, 0, 0.965 * Hc); sg.addColorStop(0, '#d9b57a'); sg.addColorStop(1, '#f1dfb8');
    x.fillStyle = sg; x.fillRect(0, 0.49 * Hc, Wc, 0.475 * Hc);
    for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(120,70,20,${0.03 + Math.random() * 0.05})`; x.fillRect(0, (0.49 + Math.random() * 0.47) * Hc, Wc, 1 + Math.random() * 3); }
    band(0.965, 0.985, '#f5f3ee'); band(0.985, 1, '#2d6fd8');
    return c;
  }

  function init3D() {
    T = G.THREE; if (!T) return false;
    const r = new T.WebGLRenderer({ canvas: glcv, antialias: true, alpha: true, powerPreference: 'high-performance' });
    r.setClearColor(0x000000, 0);
    r.outputColorSpace = T.SRGBColorSpace;
    r.toneMapping = T.ACESFilmicToneMapping; r.toneMappingExposure = 1.12;
    const scene = new T.Scene();
    const cam = new T.OrthographicCamera(-1, 1, 1, -1, 0.01, 20);
    S3 = { r, scene, cam, balls: new Map() };
    const R0 = geo.r, { cx, cy, cw, rw, rim } = geo;

    // environment for reflections: a dark hall with three lamp panels above the table
    const es = new T.Scene();
    es.add(new T.Mesh(new T.BoxGeometry(12, 12, 12), new T.MeshBasicMaterial({ color: 0x232a38, side: T.BackSide })));
    [-1.4, 0, 1.4].forEach(ox => { const m = new T.Mesh(new T.PlaneGeometry(0.9, 0.5), new T.MeshBasicMaterial({ color: new T.Color(6, 5.7, 5.2), side: T.DoubleSide })); m.position.set(ox, 0, 3.2); es.add(m); });
    const side = new T.Mesh(new T.PlaneGeometry(6, 1.2), new T.MeshBasicMaterial({ color: new T.Color(0.5, 0.6, 0.85), side: T.DoubleSide })); side.position.set(0, -5.5, 1.5); side.rotation.x = Math.PI / 2; es.add(side);
    const pm = new T.PMREMGenerator(r);
    scene.environment = pm.fromScene(es, 0.025).texture;
    pm.dispose();

    scene.add(new T.AmbientLight(0xffffff, 0.45));
    const key = new T.DirectionalLight(0xfff6ea, 2.4); scene.add(key); scene.add(key.target); S3.key = key;

    // cloth
    const clothMat = new T.MeshBasicMaterial({ map: tex(clothCanvas()) });
    const cloth = new T.Mesh(new T.PlaneGeometry(2 * (cx + cw), 2 * (cy + cw)), clothMat);
    cloth.position.z = -R0; scene.add(cloth); S3.cloth = cloth; S3.clothPort = port;

    // cushions
    const feltN = tex(noiseTile(128, 222, 255), { rep: 1 / (5 * R0) });
    const cushMat = new T.MeshStandardMaterial({ color: 0x2386c8, map: feltN, roughness: 0.95, metalness: 0, envMapIntensity: 0.3 });
    const cutC = R0 * 2.9, cutM = R0 * 2.0, jaw = R0 * 0.95;
    const cushions = [];
    const bs = R0 * 0.12, ny = cy + bs, nx = cx + bs;   // nose shifted so the bevelled edge lands on the physics cushion line
    [1, -1].forEach(sg => {
      cushions.push([[-cx + cutC - jaw, sg * (cy + cw)], [-cutM, sg * (cy + cw)], [-cutM - jaw * 0.6, sg * ny], [-cx + cutC, sg * ny]]);
      cushions.push([[cutM, sg * (cy + cw)], [cx - cutC + jaw, sg * (cy + cw)], [cx - cutC, sg * ny], [cutM + jaw * 0.6, sg * ny]]);
      cushions.push([[sg * (cx + cw), cy - cutC + jaw], [sg * (cx + cw), -cy + cutC - jaw], [sg * nx, -cy + cutC], [sg * nx, cy - cutC]]);
    });
    cushions.forEach(pts => {
      const sh = new T.Shape(); pts.forEach((p, i) => i ? sh.lineTo(p[0], p[1]) : sh.moveTo(p[0], p[1])); sh.closePath();
      const g = new T.ExtrudeGeometry(sh, { depth: R0 * 1.0, bevelEnabled: true, bevelThickness: R0 * 0.14, bevelSize: bs, bevelSegments: 3, curveSegments: 4 });
      const m = new T.Mesh(g, cushMat); m.position.z = -R0 - R0 * 0.02; scene.add(m);
    });

    // wooden rails with rounded outer corners, then a dark metal rim
    const rrShape = (hx, hy, rad) => { const s = new T.Shape(); s.moveTo(-hx + rad, -hy); s.lineTo(hx - rad, -hy); s.quadraticCurveTo(hx, -hy, hx, -hy + rad); s.lineTo(hx, hy - rad); s.quadraticCurveTo(hx, hy, hx - rad, hy); s.lineTo(-hx + rad, hy); s.quadraticCurveTo(-hx, hy, -hx, hy - rad); s.lineTo(-hx, -hy + rad); s.quadraticCurveTo(-hx, -hy, -hx + rad, -hy); return s; };
    const rrPath = (hx, hy, rad) => { const s = new T.Path(); s.moveTo(-hx + rad, -hy); s.lineTo(hx - rad, -hy); s.quadraticCurveTo(hx, -hy, hx, -hy + rad); s.lineTo(hx, hy - rad); s.quadraticCurveTo(hx, hy, hx - rad, hy); s.lineTo(-hx + rad, hy); s.quadraticCurveTo(-hx, hy, -hx, hy - rad); s.lineTo(-hx, -hy + rad); s.quadraticCurveTo(-hx, -hy, -hx + rad, -hy); return s; };
    const ox = cx + cw + rw, oy = cy + cw + rw;
    const railShape = rrShape(ox, oy, R0 * 1.7); railShape.holes.push(rrPath(cx + cw - R0 * 0.05, cy + cw - R0 * 0.05, R0 * 0.05));
    const woodT = tex(woodCanvas(), { rep: 1 / (14 * R0) });
    const railMat = new T.MeshStandardMaterial({ map: woodT, color: 0xd8d0d0, roughness: 0.7, metalness: 0, envMapIntensity: 0.35 });
    const railG = new T.ExtrudeGeometry(railShape, { depth: R0 * 1.15, bevelEnabled: true, bevelThickness: R0 * 0.2, bevelSize: R0 * 0.22, bevelSegments: 4, curveSegments: 10 });
    const rail = new T.Mesh(railG, railMat); rail.position.z = -R0; scene.add(rail);
    const topZ = -R0 + R0 * 1.15 + R0 * 0.2;
    const rimShape = rrShape(ox + rim, oy + rim, R0 * 2.0); rimShape.holes.push(rrPath(ox - R0 * 0.1, oy - R0 * 0.1, R0 * 1.6));
    const rimMat = new T.MeshStandardMaterial({ color: 0x2b2f36, roughness: 0.35, metalness: 0.85, envMapIntensity: 0.4 });
    const rimM = new T.Mesh(new T.ExtrudeGeometry(rimShape, { depth: R0 * 1.0, bevelEnabled: true, bevelThickness: R0 * 0.16, bevelSize: R0 * 0.12, bevelSegments: 3, curveSegments: 10 }), rimMat);
    rimM.position.z = -R0; scene.add(rimM);

    // diamonds
    const dMat = new T.MeshStandardMaterial({ color: 0xf6efe2, roughness: 0.25, metalness: 0.1, emissive: 0x2a2620 });
    const dGeo = new T.CircleGeometry(R0 * 0.2, 20);
    const dy = cy + cw + rw * 0.48, dx = cx + cw + rw * 0.48;
    const addD = (px, py, rot) => { const m = new T.Mesh(dGeo, dMat); m.scale.set(rot ? 0.7 : 1.15, rot ? 1.15 : 0.7, 1); m.position.set(px, py, topZ + 0.0004); scene.add(m); };
    for (let i = -3; i <= 3; i++) if (i) { addD(cx * i / 4, dy, false); addD(cx * i / 4, -dy, false); }
    for (let j = -1; j <= 1; j++) { addD(dx, cy * j / 2, true); addD(-dx, cy * j / 2, true); }

    // pockets: deep black holes with a chrome liner on the rail side
    const holeT = tex(radialCanvas(128, [[0, '#000'], [0.72, '#020202'], [0.9, '#0b0b0d'], [1, '#202227']]));
    const holeMat = new T.MeshBasicMaterial({ map: holeT });
    const linerMat = new T.MeshStandardMaterial({ color: 0x5d6570, roughness: 0.3, metalness: 1, envMapIntensity: 0.35 });
    const lipMat = new T.MeshStandardMaterial({ color: 0x15171b, roughness: 0.6, metalness: 0.2 });
    geo.pockets.forEach(p => {
      const corner = Math.abs(p.x) > geo.X * 0.5, pr = p.rad * (corner ? 1.06 : 1.0);
      const out = Math.atan2(corner ? Math.sign(p.y) : Math.sign(p.y), corner ? Math.sign(p.x) : 0);
      const hole = new T.Mesh(new T.CircleGeometry(pr, 48), holeMat); hole.position.set(p.x, p.y, topZ + 0.0008); scene.add(hole);
      const span = corner ? 3.9 : 3.5;
      const lip = new T.Mesh(new T.RingGeometry(pr * 0.98, pr * 1.16, 48, 1, out - span / 2, span), lipMat); lip.position.set(p.x, p.y, topZ + 0.001); scene.add(lip);
      const ln = new T.Mesh(new T.RingGeometry(pr * 1.16, pr * 1.42, 48, 1, out - span / 2, span), linerMat); ln.position.set(p.x, p.y, topZ + 0.0012); scene.add(ln);
    });

    // balls + blob shadows
    const sph = new T.SphereGeometry(R0, 48, 32);
    const shT = tex(radialCanvas(64, [[0, 'rgba(0,0,0,.62)'], [0.45, 'rgba(0,0,0,.42)'], [1, 'rgba(0,0,0,0)']]));
    const shGeo = new T.PlaneGeometry(R0 * 2.7, R0 * 2.7);
    table.balls.forEach(b => {
      const mat = new T.MeshPhysicalMaterial({ map: tex(ballCanvas(b.label || 0)), roughness: 0.16, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.03, envMapIntensity: 1.0 });
      const m = new T.Mesh(sph, mat); scene.add(m);
      const s = new T.Mesh(shGeo, new T.MeshBasicMaterial({ map: shT, transparent: true, depthWrite: false })); s.renderOrder = 1; scene.add(s);
      S3.balls.set(b, { m, s, mat });
    });

    // cue stick + its shadow
    const L = geo.X * 1.35, rt = R0 * 0.3, rb = R0 * 0.56;
    const cueMat = new T.MeshPhysicalMaterial({ map: tex(cueCanvas()), roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.08, transparent: true });
    const cueMesh = new T.Mesh(new T.CylinderGeometry(rb, rt, L, 28, 1), cueMat);
    cueMesh.rotation.z = -Math.PI / 2;
    const cueInner = new T.Group(); cueInner.add(cueMesh);
    const cueGrp = new T.Group(); cueGrp.add(cueInner); cueGrp.position.z = R0 * 1.45; scene.add(cueGrp);
    const csc = mkCanvas(32, 256), cx2 = csc.getContext('2d'), cg = cx2.createLinearGradient(0, 0, 32, 0);
    cg.addColorStop(0, 'rgba(0,0,0,0)'); cg.addColorStop(0.5, 'rgba(0,0,0,.42)'); cg.addColorStop(1, 'rgba(0,0,0,0)'); cx2.fillStyle = cg; cx2.fillRect(0, 0, 32, 256);
    const cueShMat = new T.MeshBasicMaterial({ map: tex(csc), transparent: true, depthWrite: false });
    const cueSh = new T.Mesh(new T.PlaneGeometry(L, rb * 3.2), cueShMat); cueSh.renderOrder = 1;
    const cueShInner = new T.Group(); cueShInner.add(cueSh);
    const cueShGrp = new T.Group(); cueShGrp.add(cueShInner); cueShGrp.position.z = -R0 + 0.0007; scene.add(cueShGrp);
    Object.assign(S3, { cueGrp, cueInner, cueMat, cueShGrp, cueShInner, cueShMat, cueL: L });

    sizeGL();
    try { r.compile(scene, cam); } catch (e) {}
    return true;
  }

  let started = false;
  function uprightNumbers() {   // before the break, turn the numbers to face the player
    if (started) return;
    const q0 = port ? [0, 0, -Math.SQRT1_2, Math.SQRT1_2] : [0, 0, 0, 1];
    table.balls.forEach(b => { try { b.ballmesh.mesh.quaternion.set(...q0); } catch (e) {} });
  }
  function sizeGL() {
    if (!S3 || !W) return;
    uprightNumbers();
    const { r, cam, key } = S3;
    r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    r.setSize(W, H, false);
    glcv.style.width = W + 'px'; glcv.style.height = H + 'px';
    const c = sToT(W / 2, H / 2), hw = W / 2 / K, hh = H / 2 / K, up = scrUp(), rt = scrRt();
    cam.left = -hw; cam.right = hw; cam.top = hh; cam.bottom = -hh; cam.updateProjectionMatrix();
    cam.up.set(up[0], up[1], 0); cam.position.set(c.x, c.y, 5); cam.lookAt(c.x, c.y, 0);
    key.position.set((up[0] - rt[0]) * 1.2, (up[1] - rt[1]) * 1.2, 3); key.target.position.set(0, 0, 0);
    S3.shOff = [(rt[0] - up[0]) * geo.r * 0.2, (rt[1] - up[1]) * geo.r * 0.2];
    if (S3.clothPort !== port) {   // emblem follows the orientation
      const old = S3.cloth.material.map; S3.cloth.material.map = tex(clothCanvas()); S3.cloth.material.needsUpdate = true; old.dispose(); S3.clothPort = port;
    }
  }

  /* ------------------------------------------------------------ engine helpers */
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
    const a = d.x > 0 ? (geo.X - p.x) / d.x : d.x < 0 ? (-geo.X - p.x) / d.x : Infinity;
    const b = d.y > 0 ? (geo.Y - p.y) / d.y : d.y < 0 ? (-geo.Y - p.y) / d.y : Infinity;
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
      return { p, ghost: g, ball: hit, n, dot, tan: { x: d.x - dot * n.x, y: d.y - dot * n.y } };
    }
    return { p, wall: { x: p.x + d.x * w.t, y: p.y + d.y * w.t } };
  }
  function seg(x, a, b) { x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke(); }
  function drawGuide(x) {   // virtual space
    const t = trace(), r = geo.r, rp = RP, cs = [tx(t.p.x), ty(t.p.y)];
    x.save(); x.lineCap = 'round'; x.strokeStyle = 'rgba(255,255,255,.95)'; x.lineWidth = Math.max(1.3, rp * 0.16);
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

  /* ------------------------------------------------------------ cue stick (3D) */
  let pull = 0, strike = null, cueAlpha = 0, dispAng = null;
  function placeCue(ang, gap, alpha) {
    const { cueGrp, cueInner, cueMat, cueShGrp, cueShInner, cueShMat, cueL } = S3;
    const vis = alpha > 0.01;
    cueGrp.visible = cueShGrp.visible = vis;
    if (!vis) return;
    const c = cb().pos, R0 = geo.r, a = ang + Math.PI;
    cueGrp.position.x = c.x; cueGrp.position.y = c.y; cueGrp.rotation.z = a;
    cueInner.position.x = R0 + gap + cueL / 2;
    const o = S3.shOff;
    cueShGrp.position.x = c.x + o[0] * 2.6; cueShGrp.position.y = c.y + o[1] * 2.6; cueShGrp.rotation.z = a;
    cueShInner.position.x = R0 + gap + cueL / 2;
    cueMat.opacity = alpha; cueShMat.opacity = alpha;
  }

  /* ------------------------------------------------------------ frame */
  const potted = [], chuteAnim = {};
  function trackPotted(now) {
    table.balls.forEach(b => { if (b.label && b.state === 'InPocket' && !potted.includes(b.label)) { potted.push(b.label); chuteAnim[b.label] = now; } });
  }
  function syncBalls() {
    const R0 = geo.r, o = S3.shOff;
    for (const b of table.balls) {
      const e = S3.balls.get(b); if (!e) continue;
      if (b.state === 'InPocket') { e.m.visible = e.s.visible = false; continue; }
      e.m.visible = e.s.visible = true;
      e.m.position.set(b.pos.x, b.pos.y, b.pos.z);
      const q = b.ballmesh && b.ballmesh.mesh.quaternion; if (q) e.m.quaternion.copy(q);
      const f = b.pos.z < 0 ? Math.max(0, 1 + b.pos.z / (1.6 * R0)) : 1;
      e.s.position.set(b.pos.x + o[0], b.pos.y + o[1], -R0 + 0.0005);
      e.s.material.opacity = f;
      const dk = 0.25 + 0.75 * f; e.mat.color.setRGB(dk, dk, dk);
    }
  }
  let lastCtrl = '', lastMine = null, lastTick = 0;
  function frame(ts) {
    try {
      if (innerWidth + 'x' + innerHeight !== lastSize) layout();
      if (!W || !geo || !S3) return;
      const name = ctrl(), mine = myTurn(), still = table.allStationary();
      syncBalls();
      // cue
      const showCue = (still && (name === 'Aim' || name === 'WatchAim' || (name === 'PlaceBall' && mine))) || !!strike;
      cueAlpha += ((showCue ? 1 : 0) - cueAlpha) * (showCue ? 0.4 : 0.25);
      let gap = pull * RP * 9;
      if (strike) {
        const k = Math.min(1, (ts - strike.t0) / 80);
        gap = strike.from * (1 - k * k) - RP * 0.7 * k * k;
        if (k >= 1 && !strike.done) { strike.done = true; strike.fire(); }
        if (ts - strike.t0 > 240) strike = null;
      }
      if (mine || dispAng == null) dispAng = cue.aim.angle; else dispAng += wrap(cue.aim.angle - dispAng) * 0.12;
      placeCue(dispAng, Math.max(-RP * 0.7, gap) / K, cueAlpha);
      S3.r.render(S3.scene, S3.cam);

      // 2D overlay: guideline, ball-in-hand ring, chute
      const x = ctx;
      x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, cv.width, cv.height);
      if (mine && placing()) {
        useS(x);
        const c = cb(), [px, py] = tToS(c.pos.x, c.pos.y), bad = table.overlapsAny(c.pos);
        x.save(); x.strokeStyle = bad ? '#ff3b30' : 'rgba(255,255,255,.9)'; x.lineWidth = 1.5; x.setLineDash([4, 4]);
        x.lineDashOffset = -ts / 60; x.beginPath(); x.arc(px, py, RP * 2.2, 0, 7); x.stroke(); x.restore();
        x.font = `${Math.max(16, RP * 2.2)}px system-ui`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✋', px + RP * 2.1, py - RP * 2.3);
      }
      useV(x);
      if (mine && still && !strike) drawGuide(x);
      trackPotted(ts);
      if (chute) {
        useS(x); const step = RP * 2.05;
        potted.forEach((lab, i) => {
          const target = chute.bot - RP * 0.1 - i * step;
          const t0 = chuteAnim[lab], k = Math.min(1, (ts - t0) / 700), e = 1 - Math.pow(1 - k, 3);
          const yy = chute.top + (target - chute.top) * e;
          if (target < chute.top) return;
          x.drawImage(chuteIcon(lab), chute.x - RP, yy - RP, RP * 2, RP * 2);
        });
      }
      if (mine !== lastMine) { lastMine = mine; stage.classList.toggle('mine', mine); if (!mine) closeSpin(); else { try { cue.setSpin(V(0, 0), table); } catch (e) {} } }
      if (name !== lastCtrl) { lastCtrl = name; hud(); if (name === 'PlayShot' || name === 'WatchShot') started = true; }
      hudBalls(); paintSpinDot(); idleMsg();
    } catch (e) { if (!frame.err) { frame.err = 1; console.warn(e); } }
  }
  // draw right after the engine steps the physics, in the same animation frame (no lag, no jitter)
  function hookEngineLoop() {
    const proto = Object.getPrototypeOf(C).animate;
    C.animate = function (t) { proto.call(C, t); lastTick = t; frame(t); };
    const watchdog = t => { if (t - lastTick > 120) frame(t); requestAnimationFrame(watchdog); };
    requestAnimationFrame(watchdog);
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
    <div class="g8power"><div class="g8slot"><div class="g8stick"></div></div><span class="g8hint">çek ↓</span></div>
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

  function hud() {
    const mine = myTurn(), n = ctrl();
    $('.g8av.me').classList.toggle('on', mine || (n === 'PlayShot' && lastMine));
    $('.g8av.op').classList.toggle('on', n === 'WatchAim' || n === 'WatchShot');
  }
  let hudKey = '';
  function hudBalls() {
    const g = myGroup(), on = labelsOn(), key = g + [...on].join(',');
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
  const TRN = [['Hitting the 8-ball first is a foul', 'Önce 8 numaraya vurdun'], ['Must hit 8-ball first', 'Önce 8 numaraya vurmalısın'], ['Wrong group hit first', 'Önce rakibin topuna vurdun'],
    ['Wrong ball hit first', 'Önce yanlış topa vurdun'], ['Cue ball potted', 'Beyaz top deliğe girdi'], ['No ball hit', 'Hiçbir topa değmedi'], ['No cushion after contact', 'Temastan sonra banda değmedi'], ['ELDE TOP', '· Elde top']];
  function trNote(t) { TRN.forEach(([a, b]) => { t = t.split(a).join(b); }); return t.replace(/^FAUL\s+/, 'FAUL · '); }
  function watchNotes() {
    const el = document.getElementById('notification');
    if (!el) return setTimeout(watchNotes, 300);
    let last = '';
    new MutationObserver(() => {
      let txt = (el.innerText || '').trim().replace(/\s+/g, ' ');
      if (!txt || txt === last) return; last = txt;
      txt = trNote(txt);
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
    if (a === 'reset') cue.setSpin(V(0, 0), table);
    if (a === 'ok' || e.target.classList.contains('g8spinbox')) closeSpin();
  });
  function spinAt(e) {
    const r = big.getBoundingClientRect();
    let u = (e.clientX - r.left) / r.width * 2 - 1, v = (e.clientY - r.top) / r.height * 2 - 1;
    const m = Math.hypot(u, v); if (m > 0.78) { u *= 0.78 / m; v *= 0.78 / m; }
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

  /* ------------------------------------------------------------ input
   * Table drag rotates the cue by how far the finger travels around the cue ball;
   * near the ball the rotation is damped so it never jumps. A quick tap on a ball aims straight at it. */
  const touch = document.createElement('div'); touch.className = 'g8touch';
  let drag = null;
  touch.addEventListener('pointerdown', e => {
    if (!myTurn() || strike || pd) return;
    touch.setPointerCapture(e.pointerId);
    const p = sToT(e.clientX, e.clientY), c = cb().pos;
    if (placing() && Math.hypot(p.x - c.x, p.y - c.y) * K < Math.max(30, RP * 3.2)) { drag = { mode: 'ball' }; return; }
    drag = { mode: 'aim', last: p, sx: e.clientX, sy: e.clientY, t0: performance.now(), moved: 0, placed: !placing() };
    if (placing()) { if (!commitPlace()) { drag = null; return; } setTimeout(() => { if (drag) drag.placed = true; }, 120); }
  });
  touch.addEventListener('pointermove', e => {
    if (!drag || !myTurn()) return;
    const p = sToT(e.clientX, e.clientY);
    if (drag.mode === 'ball') {
      if (!placing()) return;
      const pos = C.rules.placeBall(new G.Vector3(p.x, p.y, 0));
      cb().pos.copy(pos); cb().fround && cb().fround(); cb().updateMesh && cb().updateMesh(0); cue.moveTo(cb().pos);
      return;
    }
    drag.moved = Math.max(drag.moved, Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy));
    if (!drag.placed) { drag.last = p; return; }
    const c = cb().pos;
    const r0x = drag.last.x - c.x, r0y = drag.last.y - c.y, r1x = p.x - c.x, r1y = p.y - c.y;
    const da = Math.atan2(r0x * r1y - r0y * r1x, r0x * r1x + r0y * r1y);
    const distPx = Math.hypot(r1x, r1y) * K, damp = Math.min(1, distPx / 140);
    drag.last = p;
    if (isFinite(da)) setAngle(cue.aim.angle + da * damp);
  });
  function endDrag(e) {
    if (drag && drag.mode === 'aim' && drag.placed && drag.moved < 8 && performance.now() - drag.t0 < 300) {
      const p = sToT(e.clientX, e.clientY), r = geo.r;
      const hit = table.balls.find(b => b !== cb() && onTable(b) && Math.hypot(b.pos.x - p.x, b.pos.y - p.y) < r * 1.6);
      if (hit) { const c = cb().pos; setAngle(Math.atan2(hit.pos.y - c.y, hit.pos.x - c.x)); }
    }
    drag = null;
  }
  touch.addEventListener('pointerup', endDrag); touch.addEventListener('pointercancel', () => drag = null);

  // power: pull the cue down in the slot, release to strike
  const pw = $('.g8power'), stick = $('.g8stick');
  let pd = null;
  pw.addEventListener('pointerdown', e => { if (!myTurn() || strike) return; pw.setPointerCapture(e.pointerId); pd = { y: e.clientY }; drag = null; });
  pw.addEventListener('pointermove', e => {
    if (!pd) return; const len = pw.offsetHeight * 0.75;
    pull = clamp((e.clientY - pd.y) / len, 0, 1);
    stick.style.transform = `translateY(${pull * len}px)`;
    pw.classList.toggle('pulling', pull > 0);
  });
  function releasePower() {
    if (!pd) return; pd = null; pw.classList.remove('pulling');
    const p = pull; stick.style.transition = 'transform .1s ease-in'; stick.style.transform = ''; setTimeout(() => stick.style.transition = '', 120);
    if (p < 0.02 || !myTurn()) { pull = 0; return; }
    const go = () => {
      strike = { t0: performance.now(), from: p * RP * 9, fire: () => { const inp = document.getElementById('cuePower'); if (inp) inp.value = String(Math.max(0.04, p)); cue.aimInputs.hit(); } };
      pull = 0;
    };
    if (placing()) { if (!commitPlace()) { pull = 0; return; } setTimeout(go, 150); } else go();
  }
  pw.addEventListener('pointerup', releasePower);
  pw.addEventListener('pointercancel', () => { pd = null; pull = 0; stick.style.transform = ''; pw.classList.remove('pulling'); });

  /* ------------------------------------------------------------ sound
   * The engine plays one sample at a time and never unlocks audio on iPhone.
   * Here every collision gets its own voice, and the context is resumed inside a real tap. */
  let AC = null, voices = 0;
  function setupSound() {
    const snd = C.sound; if (!snd || !snd.listener) return;
    AC = snd.listener.context;
    snd.play = (audio, volume, detune = 0) => {
      if (!AC || AC.state !== 'running' || !audio || !audio.buffer || voices > 14) return;
      const v = Math.max(0, Math.min(1, volume)); if (v < 0.01) return;
      const src = AC.createBufferSource(), g = AC.createGain();
      src.buffer = audio.buffer; try { src.detune.value = detune; } catch (e) {}
      g.gain.value = v; src.connect(g); g.connect(AC.destination);
      voices++; src.onended = () => { voices--; try { g.disconnect(); } catch (e) {} };
      src.start();
    };
    snd.processOutcomes = function (outcomes) {
      if (outcomes !== this.lastOutcomesRef || this.lastOutcomeIndex > outcomes.length) { this.lastOutcomeIndex = 0; this.lastOutcomesRef = outcomes; }
      let n = 0;
      for (let i = this.lastOutcomeIndex; i < outcomes.length && n < 6; i++) {
        const o = outcomes[i]; this.lastOutcomeIndex = i + 1;
        if (o.timestamp > this.lastOutcomeTime) { this.lastOutcomeTime = o.timestamp; this.outcomeToSound(o); n++; }
      }
    };
    const unlock = () => { if (AC && AC.state !== 'running') AC.resume().catch(() => {}); };
    ['pointerdown', 'touchend', 'click'].forEach(ev => document.addEventListener(ev, unlock, { capture: true, passive: true }));
  }

  /* ------------------------------------------------------------ boot */
  function boot() {
    G = window.__gp;
    if (!G || !G.container || !G.container.table || !G.container.view) return setTimeout(boot, 40);
    C = G.container; table = C.table; cue = table.cue;
    try { C.view.render = () => {}; C.view.renderCamera = () => {}; } catch (e) {}
    readGeo(); setupSound();
    document.body.classList.add('g8on');
    stage.append(bg, glcv, cv, touch, ui);
    document.body.append(stage);
    layout();
    init3D();
    window.__g8 = { toScreen: (x, y) => tToS(x, y) };   // test hook
    watchNotes(); hud(); hudBalls();
    hookEngineLoop();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
