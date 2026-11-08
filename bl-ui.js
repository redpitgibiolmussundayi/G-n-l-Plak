/* Gönül Plak – 8 Ball Pool tarzı arayüz. Fizik: tailuge/billiards motoru (GPL-3.0). */
(() => {
  'use strict';
  const qs = new URLSearchParams(location.search);
  const ME = (qs.get('userName') || 'Eren').slice(0, 14);
  const BOT = qs.get('bot') === 'ClawBreak' ? 'Robot · Kolay' : 'Robot · Zor';
  const COLORS = { 1: '#f4c20d', 2: '#1d4fc4', 3: '#d7261e', 4: '#6b2fa0', 5: '#f2761c', 6: '#14883e', 7: '#8a1c1c', 8: '#111' };
  const ballCss = n => {
    if (n === 8) return 'background:radial-gradient(circle at 35% 30%,#666,#111 60%)';
    const c = COLORS[n > 8 ? n - 8 : n];
    return n > 8
      ? `background:radial-gradient(circle at 35% 30%,#ffffff55,transparent 45%),linear-gradient(#fff 0 26%,${c} 26% 74%,#fff 74%)`
      : `background:radial-gradient(circle at 35% 30%,#ffffff66,transparent 45%),${c}`;
  };

  let G, C, table, cue, cam, view, ov, ctx, dpr = 1;
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ---------- DOM ---------- */
  const hud = el('div', 'g8-hud', `
    <div class="g8-p me"><div class="g8-av">😎</div><div class="g8-info"><b>${ME}</b><div class="g8-balls" id="g8b1"></div></div></div>
    <div class="g8-mid"><div class="g8-eight"></div></div>
    <div class="g8-p op"><div class="g8-info"><b>${BOT}</b><div class="g8-balls" id="g8b2"></div></div><div class="g8-av">🤖</div></div>`);
  const power = el('div', 'g8-power', `<div class="g8-track"><div class="g8-fill"></div><div class="g8-stick"></div></div><span class="g8-pct"></span>`);
  const spinBtn = el('button', 'g8-spin', '<i></i>');
  spinBtn.setAttribute('aria-label', 'Falso');
  const fine = el('div', 'g8-fine', '<div class="g8-ribs"></div>');
  const modal = el('div', 'g8-modal', `<div class="g8-mbox"><div class="g8-bigball"><i></i></div><p>Topa vurulacak noktayı seç</p><div class="g8-mrow"><button data-a="reset">Ortala</button><button data-a="ok" class="ok">Tamam</button></div></div>`);
  modal.hidden = true;
  const touch = el('div', 'g8-touch');
  const banner = el('div', 'g8-banner');
  ov = el('canvas', 'g8-ov');
  ctx = ov.getContext('2d');

  /* ---------- helpers ---------- */
  const ctrlName = () => (C && C.controller && C.controller.name) || '';
  const placing = () => ctrlName() === 'PlaceBall';
  const myTurn = () => {
    const n = ctrlName();
    return (n === 'Aim' || n === 'PlaceBall') && cue.aimInputs && !cue.aimInputs.isDisabled();
  };
  let lastTurn = 'me';
  const R = () => G.R();
  const cb = () => table.cueball;
  const canvasRect = () => view.element.getBoundingClientRect();
  const v3 = (x, y, z) => new G.Vector3(x, y, z || 0);

  function toScreen(p) {
    const v = v3(p.x, p.y, p.z || 0).project(cam);
    const r = canvasRect();
    return { x: r.left + (v.x + 1) / 2 * r.width, y: r.top + (1 - v.y) / 2 * r.height };
  }
  function toTable(sx, sy) {
    const r = canvasRect();
    const nx = (sx - r.left) / r.width * 2 - 1, ny = -((sy - r.top) / r.height * 2 - 1);
    const near = v3(nx, ny, -1).unproject(cam), far = v3(nx, ny, 1).unproject(cam);
    const t = near.z / (near.z - far.z);
    return v3(near.x + (far.x - near.x) * t, near.y + (far.y - near.y) * t, 0);
  }
  const wrap = a => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; };

  function setAngle(a) {
    if (!myTurn() || placing()) return;
    cue.rotateAim(wrap(a - cue.aim.angle), table);
    try { C.sendEvent(cue.aim); C.lastEventTime = performance.now(); } catch (e) {}
  }
  function place() {
    if (!placing()) return true;
    if (table.overlapsAny(cb().pos)) { flash('Top buraya konamaz'); return false; }
    C.inputQueue.push(new G.Input(1, 'SpaceUp'));
    return true;
  }
  function shoot(p) {
    if (!myTurn()) return;
    const go = () => {
      const inp = document.getElementById('cuePower');
      if (inp) inp.value = String(p);
      cue.aimInputs.hit();
    };
    if (placing()) { if (!place()) return; setTimeout(go, 160); } else go();
  }
  function flash(t) { banner.textContent = t; banner.classList.add('on'); clearTimeout(flash.t); flash.t = setTimeout(() => banner.classList.remove('on'), 1600); }

  /* ---------- groups / legality ---------- */
  function myGroup() { const t = G.Session.getInstance().p1type; return t === 1 ? 'solid' : t === 2 ? 'stripe' : null; }
  const inGroup = (n, g) => g === 'solid' ? n >= 1 && n <= 7 : n >= 9 && n <= 15;
  function onTableLabels() { const s = new Set(); table.balls.forEach(b => { if (b.label && b.onTable()) s.add(b.label); }); return s; }
  function legal(n) {
    const g = myGroup(), on = onTableLabels();
    if (!g) return n !== 8;
    const left = [...on].some(l => inGroup(l, g));
    return left ? inGroup(n, g) : n === 8;
  }

  let hudKey = '';
  function paintHud() {
    const g = myGroup(), on = onTableLabels();
    const turn = myTurn() ? 'me' : (['PlayShot', 'Replay'].includes(ctrlName()) ? lastTurn : 'op');
    lastTurn = turn;
    const key = g + [...on].sort().join(',') + turn;
    if (key === hudKey) return; hudKey = key;
    const og = g === 'solid' ? 'stripe' : g === 'stripe' ? 'solid' : null;
    const row = grp => {
      let h = '';
      for (let i = 0; i < 7; i++) {
        const n = grp === 'solid' ? i + 1 : grp === 'stripe' ? i + 9 : 0;
        h += n && on.has(n) ? `<i style="${ballCss(n)}"></i>` : '<i class="e"></i>';
      }
      return h;
    };
    hud.querySelector('#g8b1').innerHTML = row(g);
    hud.querySelector('#g8b2').innerHTML = row(og);
    hud.querySelector('.me').classList.toggle('on', turn === 'me');
    hud.querySelector('.op').classList.toggle('on', turn === 'op');
  }

  /* ---------- guideline ---------- */
  function trace() {
    const p = cb().pos, a = cue.aim.angle, d = v3(Math.cos(a), Math.sin(a)), r = R();
    let best = Infinity, hit = null;
    for (const b of table.balls) {
      if (b === cb() || !b.onTable()) continue;
      const fx = p.x - b.pos.x, fy = p.y - b.pos.y;
      const B = fx * d.x + fy * d.y, Cc = fx * fx + fy * fy - 4 * r * r, D = B * B - Cc;
      if (D < 0) continue;
      const t = -B - Math.sqrt(D);
      if (t > 1e-6 && t < best) { best = t; hit = b; }
    }
    const X = G.TableGeometry.tableX, Y = G.TableGeometry.tableY;
    const tx = d.x > 0 ? (X - p.x) / d.x : d.x < 0 ? (-X - p.x) / d.x : Infinity;
    const ty = d.y > 0 ? (Y - p.y) / d.y : d.y < 0 ? (-Y - p.y) / d.y : Infinity;
    const tw = Math.min(tx, ty);
    if (hit && best < tw) {
      const gp = v3(p.x + d.x * best, p.y + d.y * best);
      const n = v3(hit.pos.x - gp.x, hit.pos.y - gp.y).normalize();
      const dot = d.x * n.x + d.y * n.y;
      const tan = v3(d.x - dot * n.x, d.y - dot * n.y);
      return { ghost: gp, ball: hit, n, dot, tan };
    }
    const wp = v3(p.x + d.x * tw, p.y + d.y * tw);
    const rd = tx < ty ? v3(-d.x, d.y) : v3(d.x, -d.y);
    return { wall: wp, rd };
  }

  function wallT(p, d) {
    const X = G.TableGeometry.tableX, Y = G.TableGeometry.tableY;
    const tx = d.x > 0 ? (X - p.x) / d.x : d.x < 0 ? (-X - p.x) / d.x : Infinity;
    const ty = d.y > 0 ? (Y - p.y) / d.y : d.y < 0 ? (-Y - p.y) / d.y : Infinity;
    return Math.max(0, Math.min(tx, ty));
  }
  function line(a, b) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
  function draw() {
    const w = innerWidth, h = innerHeight;
    if (ov.width !== Math.round(w * dpr) || ov.height !== Math.round(h * dpr)) { ov.width = w * dpr; ov.height = h * dpr; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (!myTurn()) return;
    const r = R(), c = cb();
    const cs = toScreen(c.pos), rpx = Math.abs(toScreen(v3(c.pos.x + r, c.pos.y)).x - cs.x) || Math.abs(toScreen(v3(c.pos.x, c.pos.y + r)).y - cs.y);
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 3;
    if (placing()) {
      const bad = table.overlapsAny(c.pos);
      ctx.strokeStyle = bad ? '#ff4d4d' : '#ffffffd0'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.arc(cs.x, cs.y, rpx * 2.1, 0, 7); ctx.stroke(); ctx.setLineDash([]);
      ctx.font = `${Math.max(18, rpx * 1.8)}px system-ui`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('✋', cs.x + rpx * 2.2, cs.y - rpx * 2.2);
    }
    const t = trace();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
    if (t.ghost) {
      const gs = toScreen(t.ghost), bs = toScreen(t.ball.pos);
      const ok = legal(t.ball.label);
      // cue ball → ghost (stop at ghost rim)
      const dx = gs.x - cs.x, dy = gs.y - cs.y, L = Math.hypot(dx, dy) || 1;
      line(cs, { x: gs.x - dx / L * rpx, y: gs.y - dy / L * rpx });
      ctx.beginPath(); ctx.arc(gs.x, gs.y, rpx, 0, 7); ctx.stroke();
      if (!ok) {
        ctx.strokeStyle = '#ff4d4d'; ctx.lineWidth = 2.5; const k = rpx * 0.55;
        line({ x: gs.x - k, y: gs.y - k }, { x: gs.x + k, y: gs.y + k }); line({ x: gs.x + k, y: gs.y - k }, { x: gs.x - k, y: gs.y + k });
        return;
      }
      // object ball path, longer when straighter
      const len = Math.min(r * (6 + 22 * t.dot * t.dot), wallT(t.ball.pos, t.n));
      const oe = toScreen(v3(t.ball.pos.x + t.n.x * len, t.ball.pos.y + t.n.y * len));
      const odx = oe.x - bs.x, ody = oe.y - bs.y, oL = Math.hypot(odx, ody) || 1;
      line({ x: bs.x + odx / oL * rpx, y: bs.y + ody / oL * rpx }, oe);
      // cue ball deflection
      const tl = Math.hypot(t.tan.x, t.tan.y);
      if (tl > 0.02) {
        ctx.globalAlpha = 0.75;
        const td = v3(t.tan.x / tl, t.tan.y / tl), tlen = Math.min(r * 10 * tl, wallT(t.ghost, td));
        const te = toScreen(v3(t.ghost.x + td.x * tlen, t.ghost.y + td.y * tlen));
        line(gs, te); ctx.globalAlpha = 1;
      }
    } else {
      const ws = toScreen(t.wall);
      line(cs, ws);
      ctx.globalAlpha = 0.6;
      const rl = Math.min(r * 8, wallT(t.wall, t.rd) || r * 8);
      line(ws, toScreen(v3(t.wall.x + t.rd.x * rl, t.wall.y + t.rd.y * rl)));
      ctx.globalAlpha = 1;
      ctx.beginPath(); ctx.arc(ws.x, ws.y, rpx, 0, 7); ctx.stroke();
    }
  }

  /* ---------- input ---------- */
  let drag = null;
  touch.addEventListener('pointerdown', e => {
    if (!myTurn()) return;
    touch.setPointerCapture(e.pointerId);
    if (placing()) {
      const cs = toScreen(cb().pos);
      if (Math.hypot(e.clientX - cs.x, e.clientY - cs.y) < 46) { drag = { mode: 'ball' }; return; }
      if (!place()) return;
      drag = { mode: 'aim', wait: true };
      setTimeout(() => { if (drag) drag.wait = false; aimTo(e.clientX, e.clientY); }, 140);
      return;
    }
    drag = { mode: 'aim' }; aimTo(e.clientX, e.clientY);
  });
  touch.addEventListener('pointermove', e => {
    if (!drag || !myTurn()) return;
    if (drag.mode === 'ball' && placing()) {
      const pos = C.rules.placeBall(toTable(e.clientX, e.clientY));
      cb().pos.copy(pos); cb().fround && cb().fround(); cb().updateMesh && cb().updateMesh(0); cue.moveTo(cb().pos);
    } else if (drag.mode === 'aim' && !drag.wait) aimTo(e.clientX, e.clientY);
  });
  const end = () => { drag = null; };
  touch.addEventListener('pointerup', end); touch.addEventListener('pointercancel', end);
  function aimTo(x, y) { const p = toTable(x, y), c = cb().pos; setAngle(Math.atan2(p.y - c.y, p.x - c.x)); }

  // fine tune: drag along the ribbed strip
  let fy = null;
  fine.addEventListener('pointerdown', e => { if (!myTurn()) return; if (placing() && !place()) return; fine.setPointerCapture(e.pointerId); fy = vertical() ? e.clientY : e.clientX; });
  fine.addEventListener('pointermove', e => {
    if (fy == null) return; const v = vertical() ? e.clientY : e.clientX; const dlt = v - fy; fy = v;
    setAngle(cue.aim.angle + dlt * 0.0016);
    fine.firstChild.style.backgroundPositionY = fine.firstChild.style.backgroundPositionX = ((parseFloat(fine.dataset.o || 0) + dlt) | 0) + 'px';
    fine.dataset.o = (parseFloat(fine.dataset.o || 0) + dlt);
  });
  fine.addEventListener('pointerup', () => fy = null); fine.addEventListener('pointercancel', () => fy = null);

  // power: pull the stick back, release to shoot
  const vertical = () => innerWidth > innerHeight;
  let pw = null;
  const track = power.querySelector('.g8-track'), fill = power.querySelector('.g8-fill'), stick = power.querySelector('.g8-stick'), pct = power.querySelector('.g8-pct');
  function setPw(p) {
    const vert = vertical(); const len = vert ? track.clientHeight : track.clientWidth;
    fill.style[vert ? 'height' : 'width'] = (p * 100) + '%'; fill.style[vert ? 'width' : 'height'] = '';
    stick.style.transform = vert ? `translateY(${p * len * 0.85}px)` : `translateX(${-p * len * 0.85}px)`;
    pct.textContent = p > 0 ? Math.round(p * 100) + '%' : '';
  }
  power.addEventListener('pointerdown', e => { if (!myTurn()) return; power.setPointerCapture(e.pointerId); pw = { x: e.clientX, y: e.clientY, p: 0 }; power.classList.add('pull'); });
  power.addEventListener('pointermove', e => {
    if (!pw) return; const vert = vertical(); const len = (vert ? track.clientHeight : track.clientWidth) * 0.85;
    const d = vert ? e.clientY - pw.y : pw.x - e.clientX;
    pw.p = Math.max(0, Math.min(1, d / len)); setPw(pw.p);
  });
  function release() {
    if (!pw) return; const p = pw.p; pw = null; power.classList.remove('pull');
    stick.style.transition = 'transform .09s ease-in'; setPw(0); setTimeout(() => stick.style.transition = '', 120);
    if (p > 0.03) shoot(Math.max(0.05, p));
  }
  power.addEventListener('pointerup', release); power.addEventListener('pointercancel', () => { pw = null; power.classList.remove('pull'); setPw(0); });

  // spin
  const bigBall = modal.querySelector('.g8-bigball');
  function spinXY(e) {
    const r = bigBall.getBoundingClientRect();
    let u = (e.clientX - r.left) / r.width * 2 - 1, v = (e.clientY - r.top) / r.height * 2 - 1;
    const m = Math.hypot(u, v); if (m > 0.78) { u *= 0.78 / m; v *= 0.78 / m; }
    cue.setSpin(v3(-u / 1.3, -v / 1.3), table);
    try { C.sendEvent(cue.aim); } catch (er) {}
  }
  let sp = false;
  bigBall.addEventListener('pointerdown', e => { sp = true; bigBall.setPointerCapture(e.pointerId); spinXY(e); });
  bigBall.addEventListener('pointermove', e => sp && spinXY(e));
  bigBall.addEventListener('pointerup', () => sp = false);
  spinBtn.onclick = () => { if (myTurn()) modal.hidden = false; };
  modal.addEventListener('click', e => {
    const a = e.target.dataset && e.target.dataset.a;
    if (a === 'reset') { cue.setSpin(v3(0, 0), table); }
    if (a === 'ok' || e.target === modal) modal.hidden = true;
  });
  function paintSpin() {
    const o = cue.aim.offset, u = -o.x * 1.3, v = -o.y * 1.3;
    const pos = `left:${(u / 2 + 0.5) * 100}%;top:${(v / 2 + 0.5) * 100}%`;
    spinBtn.firstChild.style.cssText = pos; bigBall.firstChild.style.cssText = pos;
  }

  /* ---------- loop ---------- */
  let lastMine = null;
  function frame() {
    try {
      if (cue.helperMesh) cue.helperMesh.visible = false;
      const mine = myTurn();
      if (mine !== lastMine) {
        lastMine = mine;
        document.body.classList.toggle('g8-mine', mine);
        if (mine) flash(placing() ? 'Elde top – topu sürükle' : 'Sıra sende');
        else modal.hidden = true;
      }
      draw(); paintHud(); paintSpin();
    } catch (e) { /* engine not ready yet */ }
    requestAnimationFrame(frame);
  }

  function boot() {
    G = window.__gp;
    if (!G || !G.container || !G.container.table || !G.container.view.camera) return setTimeout(boot, 60);
    C = G.container; table = C.table; cue = table.cue; view = C.view; cam = view.camera.camera;
    G.Camera.lockTop = true;
    try { if (view.assets && view.assets.background) view.assets.background.visible = false; } catch (e) {}
    dpr = Math.min(2, devicePixelRatio || 1);
    document.body.classList.add('gp8');
    document.body.append(touch, ov, hud, power, fine, spinBtn, banner, modal);
    setPw(0);
    // hide the room every frame in case assets load late
    const hideRoom = () => { try { if (view.assets.background) view.assets.background.visible = false; } catch (e) {} };
    setInterval(hideRoom, 500);
    requestAnimationFrame(frame);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
