/* Gönül Plak · Kıraathane 3D okey
   Okey masasına oturunca masa 3D okeye döner: önünde iki katlı ıstaka, ortada deste ve gösterge, köşelerde atılan taşlar,
   karşında ve yanlarında robotlar ya da online arkadaşların. Kurallar okey.js ile aynı (kh-okey-core.js).
   Online: kıraathane odasındaki herkes masayı görür; masayı ilk açan hakemdir, oturan arkadaşlar robotların yerini alır. */
import * as K from './kh-okey-core.js';

export function createOkey(ctx) {
  const { THREE, scene, M, T, toast, esc } = ctx;
  const tg = ctx.table;             // masa grubu (dönüşü 0)
  const RING = ctx.ring;            // oyun koltuğu g → sandalye (seats[]) ; sırayla sağa doğru
  const TOP = 0.79;                 // örtünün üstü
  const TW = 0.05, TH = 0.074, TD = 0.017, PITCH = 0.057;

  /* ---------------- taş yüzleri (tek doku atlası) */
  const ATL = document.createElement('canvas'); ATL.width = 2048; ATL.height = 1024;
  {
    const x = ATL.getContext('2d'), CW = 128, CH = 200;
    for (let fi = 0; fi < 53; fi++) {
      const cx = (fi % 16) * CW, cy = ((fi / 16) | 0) * CH;
      const g = x.createLinearGradient(cx, cy, cx, cy + CH); g.addColorStop(0, '#fbf6ea'); g.addColorStop(1, '#e9dfc8');
      x.fillStyle = g; x.fillRect(cx, cy, CW, CH);
      x.strokeStyle = 'rgba(120,100,70,.35)'; x.lineWidth = 4; x.strokeRect(cx + 3, cy + 3, CW - 6, CH - 6);
      if (fi === 52) {   // sahte okey
        x.fillStyle = '#1d6b3a'; x.save(); x.translate(cx + CW / 2, cy + 86);
        for (let k = 0; k < 4; k++) { x.rotate(Math.PI / 2); x.beginPath(); x.arc(0, -20, 19, 0, 7); x.fill(); }
        x.fillRect(-5, 0, 10, 46); x.restore();
        x.fillStyle = '#1d6b3a'; x.font = '700 26px Georgia,serif'; x.textAlign = 'center'; x.fillText('OKEY', cx + CW / 2, cy + 178);
        continue;
      }
      const c = (fi / 13) | 0, n = fi % 13 + 1;
      x.fillStyle = K.COL[c]; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.font = `800 ${n >= 10 ? 76 : 92}px -apple-system,"Segoe UI",Roboto,Arial,sans-serif`; x.fillText(String(n), cx + CW / 2, cy + 82);
      x.beginPath(); x.arc(cx + CW / 2, cy + 150, 13, 0, 7); x.fill();
    }
  }
  const atlasTex = new THREE.CanvasTexture(ATL); atlasTex.colorSpace = THREE.SRGBColorSpace; atlasTex.anisotropy = 4;
  const faceMat = []; const sideMat = new THREE.MeshStandardMaterial({ color: 0xf3ecdc, roughness: 0.45 }), backMat = new THREE.MeshStandardMaterial({ color: 0xe8dfca, roughness: 0.5 });
  for (let fi = 0; fi < 53; fi++) {
    const t = atlasTex.clone(); t.needsUpdate = true; t.repeat.set(128 / 2048, 200 / 1024);
    t.offset.set((fi % 16) * 128 / 2048, 1 - (((fi / 16) | 0) + 1) * 200 / 1024);
    faceMat[fi] = new THREE.MeshStandardMaterial({ map: t, roughness: 0.42 });
  }
  const selMat = new THREE.MeshStandardMaterial({ color: 0xffe2a0, emissive: 0xffb84a, emissiveIntensity: 0.35, roughness: 0.4 });
  const tileGeo = new THREE.BoxGeometry(TW, TH, TD);
  const faceOf = id => { const r = K.raw(id); return r.fake ? 52 : r.c * 13 + r.n - 1; };
  const tileMesh = new Map();    // id → mesh (oyunda kullanılan taşlar)
  function tile(id, faceUp) {
    let m = tileMesh.get(id);
    if (!m) { m = new THREE.Mesh(tileGeo, [sideMat, sideMat, sideMat, sideMat, faceMat[faceOf(id)], backMat]); m.castShadow = true; m.userData.okTile = id; tileMesh.set(id, m); root.add(m); }
    m.material[4] = faceUp ? faceMat[faceOf(id)] : backMat;
    m.visible = true; return m;
  }

  /* ---------------- masa üstü düzeni */
  const root = new THREE.Group(); root.userData.dyn = 1; tg.add(root); root.visible = false;
  const dirOf = g => { const s = ctx.seats[RING[g]], dx = s.x - tg.position.x, dz = s.z - tg.position.z, l = Math.hypot(dx, dz); return [dx / l, dz / l]; };
  const racks = [], rackBack = [];
  for (let g = 0; g < 4; g++) {
    const [dx, dz] = dirOf(g), r = new THREE.Group(); r.position.set(dx * 0.5, TOP, dz * 0.5); r.rotation.y = Math.atan2(dx, dz); root.add(r); racks.push(r);
    const wood = M.dark;
    const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.018, 0.13), wood); b1.position.set(0, 0.009, 0); r.add(b1);
    const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.05, 0.03), wood); b2.position.set(0, 0.06, -0.07); r.add(b2);       // arka (üst raf) tahtası
    const b3 = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.012, 0.045), wood); b3.position.set(0, 0.052, -0.035); r.add(b3);   // üst raf
    const b4 = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.018, 0.012), wood); b4.position.set(0, 0.026, 0.06); r.add(b4);      // ön çıta
    for (const s of [-1, 1]) { const e = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.09, 0.14), wood); e.position.set(s * 0.465, 0.04, -0.005); r.add(e); }
    [b1, b2, b3, b4].forEach(m => { m.castShadow = true; m.receiveShadow = true; });
  }
  // sıra halkası (oynayanın ıstakasının altında yanar)
  const turnRing = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.2), new THREE.MeshBasicMaterial({ color: 0xffc56a, transparent: true, opacity: 0.0, depthWrite: false }));
  turnRing.rotation.x = -Math.PI / 2; root.add(turnRing);
  // dokunma hedefleri: 30 yuva, deste, atılan taşlar
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  const slotHit = [];
  const slotPos = i => { const row = (i / 15) | 0, k = i % 15; return row === 0 ? [(k - 7) * PITCH, 0.058 + TH / 2, -0.035] : [(k - 7) * PITCH, 0.018 + TH / 2, 0.028]; };
  const pileHit = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.14, 0.2), hitMat); pileHit.position.set(-0.03, TOP + 0.05, -0.02); pileHit.userData.okPile = 1; root.add(pileHit);
  const discHit = [0, 1, 2, 3].map(g => { const m = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.16), hitMat); m.userData.okDisc = g; root.add(m); return m; });
  function discSpot(g) { const [dx, dz] = dirOf(g), rx = dz, rz = -dx; return [dx * 0.26 + rx * 0.33, dz * 0.26 + rz * 0.33]; }
  discHit.forEach((m, g) => { const [x, z] = discSpot(g); m.position.set(x, TOP + 0.04, z); });
  // isim levhaları
  function label(text, on) {
    const c = document.createElement('canvas'); c.width = 512; c.height = 128; const x = c.getContext('2d');
    x.font = '600 50px -apple-system,Segoe UI,Roboto,sans-serif'; const w = Math.min(500, x.measureText(text).width + 56);
    x.fillStyle = on ? 'rgba(217,162,79,.95)' : 'rgba(14,10,8,.75)'; x.beginPath(); x.roundRect((512 - w) / 2, 18, w, 90, 34); x.fill();
    x.fillStyle = on ? '#24130a' : '#fff1d6'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 256, 64);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }
  const labels = [0, 1, 2, 3].map(g => { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthTest: false, depthWrite: false })); sp.scale.set(0.62, 0.155, 1); sp.renderOrder = 12; const [dx, dz] = dirOf(g); sp.position.set(dx * 0.95, 1.62, dz * 0.95); sp.visible = false; root.add(sp); sp.userData.key = ''; return sp; });

  /* ---------------- durum */
  let G = null, names = ['', '', '', ''], humans = [null, null, null, null], master = null, myG = -1, playing = false;
  let slots = new Array(30).fill(null), sel = null, arrMode = 0, botT = 0, lastSeq = -1, ended = false;
  const ARR = ['akilli', 'seri', 'cift'], ARRN = ['Akıllı diz', 'Seri diz', 'Çift diz'];
  const bots = [null, null, null, null];   // robot görünümleri
  const myId = () => ctx.netId();
  const isMaster = () => master === myId();
  const N = () => ctx.net();

  /* ---------------- arayüz (küçük alt çubuk) */
  const bar = document.createElement('div'); bar.id = 'okbar'; bar.className = 'ui'; bar.hidden = true;
  bar.innerHTML = `<div id="okinfo" class="gl"></div><div class="okb"><button class="gl" data-o="disc">${T('Taş At')}</button><button class="gl" data-o="arr">${T('Diz')}</button><button class="gl fin" data-o="fin">${T('Bitir')}</button><button class="gl" data-o="up">${T('Kalk')}</button></div>`;
  document.body.appendChild(bar);
  const info = bar.querySelector('#okinfo'); info.className = 'gl ui'; document.body.appendChild(info); const _i = 0, bDisc = bar.querySelector('[data-o=disc]'), bFin = bar.querySelector('[data-o=fin]');
  bar.addEventListener('click', e => {
    const b = e.target.closest('[data-o]'); if (!b) return;
    const o = b.dataset.o;
    if (o === 'up') return ctx.standUp();
    if (o === 'arr') { arrMode = (arrMode + 1) % 3; arrange(ARR[arrMode]); toast(T(ARRN[arrMode])); layoutMine(true); return; }
    if (o === 'disc') { if (sel == null) return toast(T('Önce atacağın taşa dokun')); act({ t: 'disc', id: sel }); return; }
    if (o === 'fin') { finish(); return; }
  });

  /* ---------------- ıstaka yuvaları (okey.js ile aynı mantık) */
  function syncRack(auto) {
    const hand = G && myG >= 0 ? G.hands[myG] : []; const set = new Set(hand);
    for (let i = 0; i < 30; i++) if (slots[i] != null && !set.has(slots[i])) slots[i] = null;
    const have = new Set(slots.filter(x => x != null)), add = hand.filter(id => !have.has(id));
    if (auto || have.size === 0) { arrange(ARR[arrMode]); return; }
    for (const id of add) { let i = 29; while (i >= 0 && slots[i] != null) i--; if (i < 0) i = slots.indexOf(null); slots[i] = id; }
  }
  function arrange(kind) {
    const hand = G && myG >= 0 ? G.hands[myG].slice() : []; slots.fill(null); let seq = [];
    if (kind === 'seri' || kind === 'cift') {
      const vs = hand.map(id => ({ id, v: K.val(id, G) })), jok = vs.filter(o => o.v.j).map(o => o.id), rest = vs.filter(o => !o.v.j);
      if (kind === 'seri') rest.sort((a, b) => a.v.c - b.v.c || a.v.n - b.v.n); else rest.sort((a, b) => a.v.n - b.v.n || a.v.c - b.v.c);
      let prev = null;
      for (const o of rest) { if (prev && (kind === 'seri' ? (o.v.c !== prev.c || o.v.n > prev.n + 1) : o.v.n !== prev.n)) seq.push(null); seq.push(o.id); prev = o.v; }
      seq.push(null, ...jok);
    } else {
      const m = K.melds(hand, G); for (const grp of m.melds) seq.push(...grp, null);
      seq.push(...m.left.slice().sort((a, b) => { const x = K.val(a, G), y = K.val(b, G); return (x.j - y.j) || x.c - y.c || x.n - y.n; }));
    }
    let i = 0; const groups = []; let cur = [];
    for (const id of seq) { if (id == null) { if (cur.length) groups.push(cur); cur = []; } else cur.push(id); }
    if (cur.length) groups.push(cur);
    for (const grp of groups) { if ((i % 15) + grp.length > 15 && i < 15) i = 15; for (const id of grp) { if (i >= 30) i = slots.indexOf(null); slots[i++] = id; } if (i % 15 !== 0) i++; }
    for (const id of hand) if (!slots.includes(id)) slots[slots.indexOf(null)] = id;
  }
  function moveTo(id, t) {
    const from = slots.indexOf(id); if (from >= 0) slots[from] = null;
    if (slots[t] == null) { slots[t] = id; return; }
    let best = -1, bd = 99;
    for (let e = 0; e < 30; e++) if (slots[e] == null && Math.abs(e - t) < bd && ((e / 15) | 0) === ((t / 15) | 0)) { bd = Math.abs(e - t); best = e; }
    if (best < 0) for (let e = 0; e < 30; e++) if (slots[e] == null && Math.abs(e - t) < bd) { bd = Math.abs(e - t); best = e; }
    if (best > t) for (let k = best; k > t; k--) slots[k] = slots[k - 1]; else for (let k = best; k < t; k++) slots[k] = slots[k + 1];
    slots[t] = id;
  }

  /* ---------------- taşları yerleştir (yumuşak geçiş) */
  const tw = new Map(); // id → {from, to, q0, q1, t0, dur}
  const tmpV = new THREE.Vector3(), tmpQ = new THREE.Quaternion(), tmpE = new THREE.Euler();
  function place(m, x, y, z, rx, ry, rz, anim) {
    const to = new THREE.Vector3(x, y, z), q1 = new THREE.Quaternion().setFromEuler(tmpE.set(rx, ry, rz, 'YXZ'));
    if (!anim || !m.userData.placed) { m.position.copy(to); m.quaternion.copy(q1); m.userData.placed = true; tw.delete(m.userData.okTile); return; }
    if (m.position.distanceTo(to) < 1e-4) return;
    tw.set(m.userData.okTile, { m, from: m.position.clone(), to, q0: m.quaternion.clone(), q1, t0: performance.now(), dur: 380 });
  }
  function rackLocal(g, lx, ly, lz) { const r = racks[g]; tmpV.set(lx, ly, lz).applyEuler(r.rotation).add(r.position); return tmpV; }
  function layoutMine(anim) {
    if (myG < 0) return;
    const r = racks[myG];
    slots.forEach((id, i) => {
      if (id == null) return; const m = tile(id, true); const [lx, ly, lz] = slotPos(i);
      const p = rackLocal(myG, lx, ly + (id === sel ? 0.022 : 0), lz);
      m.material[1] = m.material[0] = id === sel ? selMat : sideMat;
      place(m, p.x, p.y, p.z, -0.22, r.rotation.y, 0, anim);
    });
  }
  function layoutAll(anim) {
    if (!G) return;
    const used = new Set();
    for (let g = 0; g < 4; g++) {
      const h = G.hands[g];
      if (g === myG) { h.forEach(id => used.add(id)); continue; }
      const r = racks[g], n = h.length;
      h.forEach((id, k) => { used.add(id); const m = tile(id, !!G.over); const p = rackLocal(g, (k - (n - 1) / 2) * PITCH, 0.018 + TH / 2, 0.012); place(m, p.x, p.y, p.z, G.over ? -0.9 : -0.12, r.rotation.y, 0, anim); });
    }
    layoutMine(anim);
    // atılan taşlar: üstteki yüzü açık, altındakiler biraz kayık
    for (let g = 0; g < 4; g++) {
      const d = G.disc[g], [x, z] = discSpot(g), [dx, dz] = dirOf(g);
      d.forEach((id, k) => { used.add(id); const m = tile(id, true); const top = k === d.length - 1, j = Math.min(k, 6); place(m, x + (k % 2) * 0.004, TOP + TD / 2 + j * 0.002 + (top ? 0.004 : 0), z - (k % 3) * 0.003, -Math.PI / 2, Math.atan2(dx, dz), 0, anim); m.visible = k >= d.length - 7; });
    }
    // gösterge + deste
    { const m = tile(G.gost, true); used.add(G.gost); place(m, 0.13, TOP + TD / 2, 0.03, -Math.PI / 2, 0.3, 0, anim); }
    const pile = G.pile, show = Math.min(pile.length, 40);
    pile.forEach((id, k) => {
      used.add(id); const m = tile(id, false);
      if (k < pile.length - show) { m.visible = false; return; }
      const j = k - (pile.length - show), col = j % 4, row = ((j / 4) | 0) % 2, lvl = (j / 8) | 0;
      place(m, -0.11 + col * (TW + 0.003), TOP + TD / 2 + lvl * (TD + 0.0005), -0.06 + row * (TH + 0.003), -Math.PI / 2, 0, 0, false);
    });
    for (const [id, m] of tileMesh) if (!used.has(id)) m.visible = false;
    // sıra ışığı
    if (!G.over) { const [dx, dz] = dirOf(G.turn); turnRing.position.set(dx * 0.5, TOP + 0.002, dz * 0.5); turnRing.rotation.z = -Math.atan2(dx, dz); turnRing.material.opacity = 0.35; } else turnRing.material.opacity = 0;
    // isimler
    for (let g = 0; g < 4; g++) {
      const sp = labels[g], txt = `${names[g] || '—'} · ${G.score[g]}`, on = !G.over && G.turn === g, key = txt + on;
      sp.visible = g !== myG; if (sp.userData.key !== key) { if (sp.material.map) sp.material.map.dispose(); sp.material.map = label(txt, on); sp.material.needsUpdate = true; sp.userData.key = key; }
    }
  }

  /* ---------------- oyuncu görünümleri: robotlar sandalyede */
  const BOT_AV = [{ shirt: 0x5a4a3a, vest: 0x2a2018, sleeve: 0x5a4a3a, mustache: 1, cap: 0x2a2a2a, hair: 0x9a9a9a }, { shirt: 0x7a3a5a, hair: 0x3a2414, hairStyle: 2 }, { shirt: 0x2a4a6a, mustache: 1, hair: 0x1a120c }, { shirt: 0x6a6a5a, beard: 1, hair: 0x6a6a6a }];
  function syncBots() {
    for (let g = 0; g < 4; g++) {
      const need = playing && G && !humans[g] && g !== myG;
      if (need && !bots[g]) { const p = ctx.makePerson(BOT_AV[g]); ctx.sitAt(p, ctx.seats[RING[g]]); bots[g] = p; ctx.seats[RING[g]].bot = true; }
      if (!need && bots[g]) { scene.remove(bots[g]); bots[g] = null; ctx.seats[RING[g]].bot = false; }
    }
  }

  /* ---------------- akış */
  function newGame(keepScore) {
    const prev = G;
    const dealer = prev ? K.nextSeat(prev.dealer) : (Math.random() * 4) | 0;
    G = K.deal(names.map((n, g) => ({ name: n, bot: !humans[g] })), dealer, keepScore && prev ? prev.score : null, prev ? prev.n + 1 : 1);
    K.setG(G); ended = false; sel = null;
    syncRack(true); broadcast(); refresh(true);
  }
  function refresh(anim) {
    K.setG(G);
    if (!G) return;
    if (G.seq !== lastSeq) { syncRack(false); lastSeq = G.seq; }
    layoutAll(anim); syncBots(); ui();
    if (G.over && !ended) { ended = true; endHand(); }
  }
  function ui() {
    if (!playing || !G) { bar.hidden = true; info.hidden = true; return; }
    bar.hidden = false; info.hidden = false;
    const mine = myG >= 0 && G.turn === myG && !G.over, need = G.need;
    info.textContent = G.over ? T('El bitti') : mine ? (need === 'draw' ? T('Sıra sende: ortadan çek ya da soldakinin taşını al') : T('Bir taş seç ve at')) : `${T('Sıra')}: ${names[G.turn]}`;
    bDisc.disabled = !(mine && need === 'discard' && sel != null);
    const canFin = mine && need === 'discard' && myG >= 0 && K.finishTile(G.hands[myG], G) != null;
    bFin.classList.toggle('on', canFin); bFin.disabled = !canFin;
  }
  function finish() {
    if (myG < 0 || !G) return; const h = G.hands[myG];
    let id = sel != null && K.isWin(h.filter(x => x !== sel), G) ? sel : K.finishTile(h, G);
    if (id == null) return toast(T('Elin henüz bitmiyor'));
    act({ t: 'fin', id });
  }
  function act(a) {
    if (!G || myG < 0) return;
    if (isMaster() || !N()) { const err = K.apply(myG, a); if (err) return toast(T(err)); afterApply(myG, a); }
    else { N().room.send('okA', { g: myG, a }); }
    if (a.t === 'disc' || a.t === 'fin') sel = null;
  }
  function afterApply(seat, a) { ctx.sfx && ctx.sfx(a.t); broadcast(); refresh(true); }
  function endHand() {
    const o = G.over, who = o.w >= 0 ? names[o.w] : '';
    const txt = o.w < 0 ? T('Deste bitti, el berabere') : o.w === myG ? (o.how === 'okey' ? T('Okey atarak bitirdin! +2') : o.how === 'cift' ? T('Çiftten bitirdin! +2') : T('Eli bitirdin! +1')) : `${who} ${T('eli bitirdi')}`;
    toast('🀄 ' + txt, 4200);
    if (!N() || isMaster()) setTimeout(() => { if (playing && G && G.over) newGame(true); }, 5200);
  }
  function botTick(now) {
    if (!G || G.over || !(isMaster() || !N())) return;
    const g = G.turn; if (humans[g] || g === myG) return;
    if (!botT) { botT = now + 900 + Math.random() * 700; return; }
    if (now < botT) return; botT = 0;
    const mv = K.botMove(g); const err = K.apply(g, mv); if (!err) afterApply(g, mv);
  }

  /* ---------------- online */
  function broadcast() {
    if (!N() || !isMaster() || !G) return;
    N().room.send('okS', { g: G, names, humans, master });
  }
  function onMsg(t, d, from) {
    if (t === 'okS') {
      if (d.master !== from.id) return;
      master = d.master; G = d.g; names = d.names; humans = d.humans;
      myG = humans.indexOf(myId());
      if (myG < 0 && playing) { /* masadayız ama koltuk verilmedi */ }
      root.visible = true; refresh(true); return;
    }
    if (!isMaster()) return;
    if (t === 'okA') { if (humans[d.g] !== from.id) return; const err = K.apply(d.g, d.a); if (err) return N().room.send('okE', { e: err }, from.id); afterApply(d.g, d.a); return; }
    if (t === 'okJ') { const g = d.g; if (g < 0 || g > 3 || (humans[g] && humans[g] !== from.id)) return; humans[g] = from.id; names[g] = from.name; if (G) G.seats[g] = { name: from.name, bot: false }; broadcast(); refresh(false); return; }
    if (t === 'okL') { const g = humans.indexOf(from.id); if (g < 0) return; humans[g] = null; names[g] = K.BOTN[(g * 3 + 1) % K.BOTN.length]; broadcast(); refresh(false); return; }
  }
  function onErr(d) { toast(T(d.e)); }
  function onLeave(id) {
    if (master === id) { master = null; if (playing) { toast(T('Masanın sahibi ayrıldı, yeni el başlıyor')); takeOver(); } else { G = null; root.visible = false; syncBots(); } return; }
    if (isMaster()) { const g = humans.indexOf(id); if (g >= 0) { humans[g] = null; names[g] = K.BOTN[(g * 3 + 1) % K.BOTN.length]; broadcast(); refresh(false); } }
  }
  function onPeers() { if (isMaster()) broadcast(); }
  function takeOver() { // hakem yoksa masayı ben açarım
    master = myId(); const keep = G;
    names = names.map((n, g) => humans[g] && humans[g] !== myId() ? n : K.BOTN[(g * 3 + 1) % K.BOTN.length]);
    humans = humans.map(h => (h === myId() ? h : null));
    if (myG >= 0) { humans[myG] = myId(); names[myG] = ctx.myName(); }
    G = keep && !keep.over ? keep : null; if (!G) newGame(false); else { broadcast(); refresh(false); }
  }

  /* ---------------- kamera: oyuncunun ıstakasının arkasından masaya bakış */
  function camPose() {
    if (myG < 0) return null;
    const [dx, dz] = dirOf(myG), cam = ctx.camera;
    const hf = Math.atan(Math.tan(cam.fov * Math.PI / 360) * cam.aspect);
    const L = cam.aspect < 1 ? Math.max(0.9, Math.min(1.9, 0.12 + 0.5 / Math.tan(hf))) : Math.max(1.0, Math.min(2.3, 0.4 + 0.66 / Math.tan(hf))), a = cam.aspect < 1 ? 1.1 : 1.02;
    const k = cam.aspect < 1 ? 0.2 : 0.3, tx = tg.position.x + dx * k, tz = tg.position.z + dz * k, ty = TOP + 0.02;
    return { x: tx + dx * L * Math.cos(a), y: ty + L * Math.sin(a), z: tz + dz * L * Math.cos(a), yaw: Math.atan2(dx, dz), pitch: -a };
  }

  /* ---------------- dışa açık */
  function sit(chairId) {
    const g = RING.indexOf(chairId); if (g < 0) return false;
    playing = true; myG = g; root.visible = true; slots.fill(null); sel = null; lastSeq = -1;
    const net = N();
    if (net && master && master !== myId()) { net.room.send('okJ', { g }); toast(T('Masaya oturdun, sıradaki elde oynarsın')); }
    else {
      master = net ? myId() : null;
      for (let k = 0; k < 4; k++) { if (!humans[k] || k === g) { humans[k] = null; names[k] = K.BOTN[(k * 3 + 1 + ((Math.random() * 3) | 0)) % K.BOTN.length]; } }
      humans[g] = net ? myId() : 'me'; names[g] = ctx.myName() || T('Sen');
      if (!net) humans = humans.map((h, k) => (k === g ? 'me' : null));
      // masada oturan online arkadaşlar robotların yerini alır
      if (net) for (const [id, o] of ctx.others()) { const k = RING.indexOf(o.seat); if (k >= 0 && k !== g) { humans[k] = id; names[k] = o.name; } }
      if (!G || G.over) newGame(false); else { broadcast(); refresh(false); }
    }
    syncBots(); ui();
    if (!sit.shown) { sit.shown = 1; toast('🀄 ' + T('Taşa dokun: seç. Başka yere dokun: taşı oraya taşı.'), 3600); }
    return true;
  }
  function stand() {
    if (!playing) return;
    playing = false; sel = null; bar.hidden = true; info.hidden = true;
    const net = N();
    if (net && master && master !== myId()) net.room.send('okL', {});
    else if (net && isMaster()) { humans[myG] = null; names[myG] = K.BOTN[(myG * 3 + 1) % K.BOTN.length]; broadcast(); }
    myG = -1;
    if (!net) { G = null; root.visible = false; for (const m of tileMesh.values()) m.visible = false; }
    syncBots(); if (G) layoutAll(false);
  }
  function hitTargets() {
    const t = [pileHit, ...discHit];
    for (const id of slots) if (id != null) { const m = tileMesh.get(id); if (m) t.push(m); }
    return t;
  }
  const ray = new THREE.Raycaster(), v2 = new THREE.Vector2();
  function tap(cx, cy) {
    if (!playing || !G || myG < 0) return false;
    v2.set(cx / innerWidth * 2 - 1, -(cy / innerHeight) * 2 + 1); ray.setFromCamera(v2, ctx.camera);
    const hits = ray.intersectObjects(hitTargets(), false);
    const mine = G.turn === myG && !G.over;
    // taşa dokunduysa
    const ht = hits.find(h => h.object.userData.okTile != null);
    if (ht) {
      const id = ht.object.userData.okTile;
      if (sel == null) sel = id; else if (sel === id) sel = null; else { moveTo(sel, slots.indexOf(id)); sel = null; }
      layoutMine(true); ui(); return true;
    }
    const hp = hits.find(h => h.object.userData.okPile);
    if (hp) { if (mine && G.need === 'draw') act({ t: 'draw' }); else toast(T(mine ? 'Önce bir taş at' : 'Sıra sende değil')); return true; }
    const hd = hits.find(h => h.object.userData.okDisc != null);
    if (hd) {
      const g = hd.object.userData.okDisc;
      if (g === K.prevSeat(myG) && mine && G.need === 'draw') { act({ t: 'take' }); return true; }
      if (g === myG && mine && G.need === 'discard' && sel != null) { act({ t: 'disc', id: sel }); return true; }
      return true;
    }
    // ıstakanın boş yerine dokunduysa: seçili taşı oraya taşı
    if (sel != null) {
      const r = racks[myG]; const inv = new THREE.Matrix4().copy(r.matrixWorld).invert();
      // ıstaka düzlemiyle kesişim
      const pl = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, TOP + 0.05, 0).applyMatrix4(tg.matrixWorld));
      const p = new THREE.Vector3(); if (ray.ray.intersectPlane(pl, p)) {
        p.applyMatrix4(inv); if (Math.abs(p.x) < 0.47 && Math.abs(p.z) < 0.12) { const k = Math.max(0, Math.min(14, Math.round(p.x / PITCH + 7))), row = p.z < -0.003 ? 0 : 1; moveTo(sel, row * 15 + k); sel = null; layoutMine(true); ui(); return true; }
      }
    }
    return false;
  }
  function update(now, dt) {
    if (tw.size) {
      for (const [id, a] of tw) {
        const k = Math.min(1, (now - a.t0) / a.dur), e = 1 - Math.pow(1 - k, 3);
        a.m.position.lerpVectors(a.from, a.to, e); a.m.position.y += Math.sin(k * Math.PI) * 0.05; a.m.quaternion.slerpQuaternions(a.q0, a.q1, e);
        if (k >= 1) tw.delete(id);
      }
    }
    if (playing || (G && master)) botTick(now);
    if (G && !G.over) turnRing.material.opacity = 0.25 + Math.sin(now / 300) * 0.1;
  }
  return {
    sit, stand, tap, update, onMsg, onErr, onLeave, onPeers, camPose,
    get active() { return playing; }, get busy() { return tw.size > 0; },
    resize() { if (playing) { const p = camPose(); if (p) ctx.setCam(p); } },
    debug: () => ({ G, myG, slots, humans, master, names })
  };
}
