/* Gönül Plak · Stuttgart açık dünya — Bölge 1: Schlossplatz
   Meydan elle modellendi; binalar, zemin, ağaçlar ve melek heykeli Eren'in kendi Schlossplatz fotoğraflarından dokulandı.
   Işık gerçek saate göre: gündüz güneş ve gölgeler, akşam gün batımı, gece yanan fenerler.
   Koordinatlar: merkez Jubiläumssäule; +x doğu (Neues Schloss), -z kuzey (Königin-Olga-Bau, Kunstgebäude), +z güney (Altes Schloss), -x batı (Königsbau). */
import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const $ = id => document.getElementById(id);
const Q = new URLSearchParams(location.search);
const toParent = m => { try { if (parent !== window) parent.postMessage(m, '*'); } catch (e) {} };
const toast = (t, ms = 2600) => { const el = $('toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), ms); };
const D2R = Math.PI / 180;
const phone = matchMedia('(pointer:coarse)').matches;

/* ---------------------------------------------------------------- render */
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, phone ? 2 : 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.9;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
$('stage').appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(68, innerWidth / innerHeight, 0.15, 9000);
scene.fog = new THREE.Fog(0xb8c8d6, 350, 3200);

/* ---------------------------------------------------------------- dokular */
const TL = new THREE.TextureLoader(), maxAniso = renderer.capabilities.getMaxAnisotropy();
const loading = [];
function tex(name, rep) {
  const t = TL.load('stadt/tex/' + name, undefined, undefined, () => console.warn('tex', name));
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = Math.min(8, maxAniso);
  t.wrapS = t.wrapT = rep === 'mirror' ? THREE.MirroredRepeatWrapping : THREE.RepeatWrapping;
  return t;
}
const T = {
  schlossPav: tex('f-schloss-pav.webp'), schloss: tex('f-schloss.webp'), koenigsbau: tex('f-koenigsbau.webp'), nord: tex('f-nord.webp'), stadt: tex('f-stadt.webp'),
  kies: tex('g-kies.webp', 'mirror'), gras: tex('g-gras.webp', 'mirror'), blumen: tex('g-blumen.webp'), laub: tex('t-laub.webp'), engel: tex('s-engel.webp'), huegel: tex('b-huegel.webp')
};
const std = (o) => new THREE.MeshStandardMaterial(Object.assign({ roughness: 0.9, metalness: 0 }, o));
const M = {
  stone: std({ color: 0xcdbb98 }), stoneDark: std({ color: 0x9c8f7a }), slate: std({ color: 0x55585e, roughness: 0.75 }), copper: std({ color: 0x6f9c88, roughness: 0.6 }),
  bronze: std({ color: 0x2e4a40, roughness: 0.5, metalness: 0.4 }), iron: std({ color: 0x2b2d2f, roughness: 0.6, metalness: 0.5 }), wood: std({ color: 0x8a7457 }),
  pave: std({ color: 0xb9b2a6 }), red: std({ color: 0x7c4637, roughness: 0.85 }), glass: std({ color: 0x8fb0bf, roughness: 0.1, metalness: 0.7, transparent: true, opacity: 0.88 }),
  white: std({ color: 0xdfe3e4, roughness: 0.4, metalness: 0.3 }), asphalt: std({ color: 0x66676a })
};

/* ---------------------------------------------------------------- yardımcılar */
const facadeMats = [];
const colliders = []; // {type:'box',x0,x1,z0,z1} | {type:'circ',x,z,r}
const box = (x0, x1, z0, z1) => colliders.push({ t: 'b', x0, x1, z0, z1 });
const circ = (x, z, r) => colliders.push({ t: 'c', x, z, r });
function mesh(g, m, x = 0, y = 0, z = 0, cast = true, recv = true) { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = cast; o.receiveShadow = recv; scene.add(o); return o; }
// dokulu duvar: modW metrede bir doku tekrarı
function wall(w, h, t, modW, x, y, z, ry) {
  const tt = t.clone(); tt.repeat.set(w / modW, 1);
  const m = std({ map: tt, roughness: 0.92, emissive: 0xffc888, emissiveMap: tt, emissiveIntensity: 0 }); facadeMats.push(m);
  const o = mesh(new THREE.PlaneGeometry(w, h), m, x, y + h / 2, z); o.rotation.y = ry; return o;
}
// kırma / mansard çatı: alt w×d, üst w*k×d*k
function hipRoof(w, d, h, k, m, x, y, z) {
  const g = new THREE.CylinderGeometry(Math.SQRT1_2 * k, Math.SQRT1_2, h, 4, 1); g.rotateY(Math.PI / 4); g.scale(w, 1, d);
  return mesh(g, m, x, y + h / 2, z);
}
// bina: dört cephe, iç dolgu, çatı ve çarpışma kutusu
function building(o) {
  const { x, z, w, d, h } = o;
  const f = o.faces || {}, tx = o.tex, mw = o.modW || 10;
  const side = (face, def) => f[face] === false ? null : (f[face] || def);
  const e = 0.02;
  const N = side('n', tx), S = side('s', tx), E = side('e', tx), W = side('w', tx);
  if (S) wall(w, h, S, o.modWs || mw, x, 0, z + d / 2 + e, 0);
  if (N) wall(w, h, N, o.modWn || mw, x, 0, z - d / 2 - e, Math.PI);
  if (E) wall(d, h, E, o.modWe || mw, x + w / 2 + e, 0, z, Math.PI / 2);
  if (W) wall(d, h, W, o.modWw || mw, x - w / 2 - e, 0, z, -Math.PI / 2);
  mesh(new THREE.BoxGeometry(w, h, d), o.fill || M.stone, x, h / 2, z);
  if (o.roof !== false) hipRoof(w + 0.6, d + 0.6, o.roofH || 6, o.roofK == null ? 0.55 : o.roofK, o.roofM || M.slate, x, h, z);
  box(x - w / 2, x + w / 2, z - d / 2, z + d / 2);
}

/* ---------------------------------------------------------------- zemin */
{
  const big = new THREE.PlaneGeometry(1400, 1400); big.rotateX(-Math.PI / 2);
  mesh(big, M.asphalt, 0, -0.05, 0, false, true);
  const pv = T.kies.clone(); pv.repeat.set(60, 60);
  const sq = new THREE.PlaneGeometry(260, 250); sq.rotateX(-Math.PI / 2);
  mesh(sq, std({ map: pv, color: 0xe8ddd2 }), -10, 0, 0, false, true);
  // çimler: dört çeyrek, merkezde sütun meydanı, eksenlerde yollar
  const gt = T.gras.clone(); gt.repeat.set(0.09, 0.09);
  const gm = std({ map: gt, color: 0xffffff, emissive: 0x1c2a10, roughness: 1, side: THREE.DoubleSide });
  const R = 27, P = 6, X1 = 68, Z1 = 92;
  const quad = new THREE.Shape();
  const a0 = Math.asin(P / R);
  quad.moveTo(P, Math.sqrt(R * R - P * P));
  quad.absarc(0, 0, R, Math.PI / 2 - a0, a0, true);
  quad.lineTo(X1 - 4, P); quad.quadraticCurveTo(X1, P, X1, P + 4);
  quad.lineTo(X1, Z1 - 4); quad.quadraticCurveTo(X1, Z1, X1 - 4, Z1);
  quad.lineTo(P + 4, Z1); quad.quadraticCurveTo(P, Z1, P, Z1 - 4); quad.closePath();
  const qg = new THREE.ShapeGeometry(quad, 24); qg.rotateX(Math.PI / 2);
  const flip = (sx, sz) => { const g = qg.clone(); g.scale(sx, 1, sz); if (sx * sz < 0) { const idx = g.index.array; for (let i = 0; i < idx.length; i += 3) { const t = idx[i]; idx[i] = idx[i + 2]; idx[i + 2] = t; } } return g; };
  // batı tarafı Königsbau'ya kadar daha uzun
  for (const [sx, sz] of [[1, 1], [1, -1], [-1.25, 1], [-1.25, -1]]) {
    const g = flip(sx, sz); const uv = g.attributes.uv, pos = g.attributes.position;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i), pos.getZ(i));
    const o = mesh(g, gm, 0, 0.03, 0, false, true);
    // kenar taşları
    const edge = new THREE.EdgesGeometry(g); const ln = new THREE.LineSegments(edge, new THREE.LineBasicMaterial({ color: 0x8e877c })); ln.position.y = 0.05; scene.add(ln);
  }
  // sütun meydanı
  const pz = new THREE.CircleGeometry(R - 0.5, 64); pz.rotateX(-Math.PI / 2);
  mesh(pz, std({ color: 0xc7bfb1, roughness: 0.95 }), 0, 0.015, 0, false, true);
}

/* ---------------------------------------------------------------- Jubiläumssäule */
{
  const g = new THREE.Group(); scene.add(g);
  const add = (geo, m, y) => { const o = new THREE.Mesh(geo, m); o.position.y = y; o.castShadow = o.receiveShadow = true; g.add(o); return o; };
  [[15, 0.35], [13.6, 0.35], [12.2, 0.35]].forEach(([s, h], i) => add(new THREE.BoxGeometry(s, h, s), M.stoneDark, h / 2 + i * h));
  add(new THREE.BoxGeometry(7.4, 1.6, 7.4), M.stoneDark, 1.05 + 0.8);
  const relief = std({ color: 0x3d4a44, roughness: 0.6, metalness: 0.3 });
  add(new THREE.BoxGeometry(7.0, 1.2, 7.0), relief, 2.65 + 0.6);
  add(new THREE.BoxGeometry(6.2, 3.6, 6.2), M.stone, 3.85 + 1.8);
  add(new THREE.BoxGeometry(6.8, 0.4, 6.8), M.stoneDark, 7.65);
  add(new THREE.CylinderGeometry(2.1, 2.4, 1.2, 24), M.stone, 8.45);
  add(new THREE.TorusGeometry(1.25, 0.28, 10, 32).rotateX(Math.PI / 2), M.bronze, 9.15);
  add(new THREE.CylinderGeometry(0.95, 1.1, 19.5, 32), std({ color: 0xc9b9a0 }), 9.0 + 9.75);
  const cap = new THREE.LatheGeometry([[0.9, 0], [1.0, 0.6], [1.35, 1.4], [1.7, 1.9], [1.7, 2.2], [1.2, 2.3], [0, 2.3]].map(p => new THREE.Vector2(p[0], p[1])), 24);
  add(cap, M.bronze, 28.5);
  // dört köşe heykeli
  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
    const f = new THREE.Group(); f.position.set(sx * 3.1, 7.85, sz * 3.1);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.6, 2.2, 10), M.bronze); body.position.y = 1.1; body.castShadow = true; f.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10), M.bronze); head.position.y = 2.45; f.add(head);
    g.add(f);
  }
  // Concordia (fotoğraftan kesilmiş)
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: T.engel, alphaTest: 0.35, fog: true }));
  sp.scale.set(3.6, 5.4, 1); sp.position.y = 30.8 + 2.4; g.add(sp);
  // zincirli küçük direkler
  for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2; const p = mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.9, 8), M.stoneDark, Math.cos(a) * 10.5, 0.45, Math.sin(a) * 10.5); }
  box(-7.5, 7.5, -7.5, 7.5);
}

/* ---------------------------------------------------------------- çeşmeler */
const fountains = [];
function fountain(x, z) {
  const g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g);
  const rim = new THREE.LatheGeometry([[8.4, 0], [9.2, 0], [9.3, 0.55], [9.0, 0.65], [8.5, 0.6], [8.4, 0]].map(p => new THREE.Vector2(p[0], p[1])), 64);
  const r = new THREE.Mesh(rim, M.stoneDark); r.castShadow = r.receiveShadow = true; g.add(r);
  const wat = new THREE.Mesh(new THREE.CircleGeometry(8.45, 48).rotateX(-Math.PI / 2), std({ color: 0x4f7f86, roughness: 0.08, metalness: 0.6, transparent: true, opacity: 0.85 }));
  wat.position.y = 0.4; g.add(wat);
  const ped = new THREE.LatheGeometry([[0, 0], [2.2, 0], [2.0, 0.6], [1.2, 1.0], [0.9, 2.0], [0.7, 3.2], [3.4, 3.4], [3.6, 3.7], [0.6, 3.6], [0.45, 4.6], [1.5, 4.9], [1.6, 5.1], [0.3, 5.0], [0.25, 6.0], [0, 6.0]].map(p => new THREE.Vector2(p[0], p[1])), 40);
  const pm = new THREE.Mesh(ped, std({ color: 0x3e433f, roughness: 0.55, metalness: 0.35 })); pm.castShadow = true; g.add(pm);
  for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + 0.4, c = new THREE.Mesh(new THREE.SphereGeometry(0.55, 10, 8), pm.material); c.position.set(Math.cos(a) * 1.6, 1.0, Math.sin(a) * 1.6); c.scale.y = 1.4; g.add(c); }
  // su damlaları (parçacık)
  const n = phone ? 420 : 700, pos = new Float32Array(n * 3), st = [];
  for (let i = 0; i < n; i++) st.push({ t: Math.random(), k: Math.random() });
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xe8f4ff, size: 0.12, transparent: true, opacity: 0.75, depthWrite: false }));
  g.add(pts);
  fountains.push({ pos, st, pg, n });
  circ(x, z, 9.4);
}
fountain(0, -58); fountain(0, 58);
function updFountains(dt) {
  for (const f of fountains) {
    for (let i = 0; i < f.n; i++) {
      const s = f.st[i]; s.t += dt * (0.55 + s.k * 0.2); if (s.t > 1) { s.t = 0; s.k = Math.random(); }
      const a = i * 2.399, kind = i % 5;
      let x, y, z, t = s.t;
      if (kind === 0) { y = 6 + 1.6 * Math.sin(t * Math.PI); x = Math.cos(a) * t * 0.5; z = Math.sin(a) * t * 0.5; }             // tepe fıskiyesi
      else if (kind < 3) { const r = 1.6 + t * 0.6; x = Math.cos(a) * r; z = Math.sin(a) * r; y = 5.0 - t * t * 1.4; }          // üst kâse taşması
      else { const r = 3.6 + t * 2.4; x = Math.cos(a) * r; z = Math.sin(a) * r; y = 3.6 + 0.6 * t - 3.8 * t * t; if (y < 0.45) y = 0.45; } // alt kâseden dökülen
      f.pos[i * 3] = x; f.pos[i * 3 + 1] = y; f.pos[i * 3 + 2] = z;
    }
    f.pg.attributes.position.needsUpdate = true;
  }
}

/* ---------------------------------------------------------------- binalar */
// Neues Schloss (U şeklinde, avlusu meydana açılıyor)
building({ x: 158, z: 0, w: 24, d: 176, h: 18, tex: T.schlossPav, modW: 31, roofH: 8, roofK: 0.45 });
building({ x: 124, z: -76, w: 46, d: 24, h: 18, tex: T.schlossPav, modW: 31, roofH: 8, roofK: 0.45, faces: { w: T.schlossPav } });
building({ x: 124, z: 76, w: 46, d: 24, h: 18, tex: T.schlossPav, modW: 31, roofH: 8, roofK: 0.45 });
// avlu çiti ve kapı direkleri
for (let z = -62; z <= 62; z += 4) mesh(new THREE.BoxGeometry(0.15, 1.6, 4), M.iron, 100, 0.8, z, false, false);
box(99.6, 100.4, -64, 64);
// Königsbau (batı, sütunlu)
building({ x: -126, z: 0, w: 26, d: 140, h: 20, tex: T.stadt, modW: 9, faces: { e: T.koenigsbau }, modWe: 34, roofH: 3, roofK: 0.85, roofM: M.slate });
// kuzey: Königin-Olga-Bau (yeşil bakır çatı) ve Kunstgebäude (kubbe)
building({ x: -62, z: -124, w: 96, d: 24, h: 21, tex: T.nord, modW: 9, roofH: 6, roofK: 0.6, roofM: M.copper });
{ // köşe kulesi
  mesh(new THREE.BoxGeometry(9, 6, 9), M.stone, -102, 24, -118);
  mesh(new THREE.CylinderGeometry(2.4, 2.6, 4, 16), M.copper, -102, 29, -118);
  mesh(new THREE.SphereGeometry(2.4, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), M.copper, -102, 31, -118);
}
building({ x: 28, z: -126, w: 64, d: 26, h: 15, tex: T.stadt, modW: 9, roofH: 3, roofK: 0.8 });
{ // Kunstgebäude kubbesi
  const x = 22, z = -122;
  mesh(new THREE.CylinderGeometry(9.5, 9.5, 8, 32), M.stone, x, 19, z);
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; mesh(new THREE.CylinderGeometry(0.45, 0.5, 6.4, 10), std({ color: 0xe7dcc4 }), x + Math.cos(a) * 10.1, 18.6, z + Math.sin(a) * 10.1); }
  mesh(new THREE.SphereGeometry(10.4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), M.copper, x, 23, z);
  const deer = mesh(new THREE.ConeGeometry(0.7, 2.2, 6), std({ color: 0xc9a243, metalness: 0.8, roughness: 0.3 }), x, 34.6, z);
}
// güney: Altes Schloss (yuvarlak kule, kırmızı çatı)
building({ x: 92, z: 132, w: 74, d: 34, h: 20, tex: T.nord, modW: 9, roofH: 12, roofK: 0.2, roofM: M.red, fill: std({ color: 0xcbb99a }) });
{ mesh(new THREE.CylinderGeometry(8, 8.5, 24, 24), std({ color: 0xc9b896 }), 52, 12, 112); mesh(new THREE.ConeGeometry(9.2, 10, 24), M.red, 52, 29, 112); circ(52, 112, 8.6); }
// güneybatı: Kunstmuseum küpü
{ mesh(new THREE.BoxGeometry(30, 30, 30), M.glass, -86, 15, 118); mesh(new THREE.BoxGeometry(24, 29, 24), std({ color: 0xb8b0a2 }), -86, 14.5, 118, false); box(-101, -71, 103, 133); }
// çevre: Königstraße ve diğer bloklar (meydanı kapatan şehir dokusu)
const fill = [
  [-170, -10, 40, 160, 22, T.stadt], [-120, -170, 60, 40, 24, T.stadt], [-40, -175, 80, 36, 20, T.nord], [60, -170, 70, 40, 18, T.stadt],
  [-150, 120, 40, 60, 22, T.stadt], [-60, 165, 60, 40, 20, T.stadt], [10, 170, 50, 40, 16, T.nord], [210, -80, 40, 120, 20, T.stadt], [210, 80, 40, 120, 18, T.nord],
  [-165, -110, 30, 50, 26, T.stadt], [160, -150, 60, 40, 22, T.stadt], [160, 160, 50, 40, 20, T.stadt]
];
for (const [x, z, w, d, h, t] of fill) building({ x, z, w, d, h, tex: t, modW: t === T.nord ? 9 : 9, roofH: 5, roofK: 0.5, roofM: t === T.nord ? M.copper : M.red });

/* ---------------------------------------------------------------- Musikpavillon */
{
  const x = -88, z = -34, g = new THREE.Group(); g.position.set(x, 0, z); scene.add(g);
  const plat = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 7.8, 1.2, 8), M.stoneDark); plat.position.y = 0.6; plat.castShadow = plat.receiveShadow = true; g.add(plat);
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + Math.PI / 8; const p = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 5, 8), M.iron); p.position.set(Math.cos(a) * 6.8, 3.7, Math.sin(a) * 6.8); p.castShadow = true; g.add(p); }
  const roof = new THREE.LatheGeometry([[8.2, 0], [7.6, 0.6], [6.2, 1.6], [3.0, 3.2], [1.2, 4.2], [0.6, 5.0], [0.0, 5.3]].map(p => new THREE.Vector2(p[0], p[1])), 8);
  const rf = new THREE.Mesh(roof, M.white); rf.position.y = 6.2; rf.castShadow = true; g.add(rf);
  const rail = new THREE.Mesh(new THREE.CylinderGeometry(7.3, 7.3, 0.9, 8, 1, true), new THREE.MeshStandardMaterial({ color: 0x2b2d2f, side: THREE.DoubleSide, transparent: true, opacity: 0.6 })); rail.position.y = 1.65; g.add(rail);
  circ(x, z, 8);
}

let globeMat, poolMat, haloMat;
/* ---------------------------------------------------------------- ağaçlar (kestane), banklar, fenerler */
{
  // ağaç: gövde + çapraz yaprak düzlemleri (fotoğraftan kesilmiş kestane yaprakları)
  const parts = [];
  for (let i = 0; i < 7; i++) {
    const s = 7 + (i % 3) * 1.6, p = new THREE.PlaneGeometry(s, s);
    p.rotateY(i / 7 * Math.PI); p.translate(Math.cos(i * 2.1) * 1.4, 7.5 + (i % 4) * 1.3, Math.sin(i * 2.1) * 1.4); parts.push(p);
  }
  const crown = mergeGeometries(parts);
  const fc = document.createElement('canvas'); fc.width = fc.height = 512; const fx = fc.getContext('2d');
  // kestane yaprağı kümeleri: yuvarlak, kenarları dağınık bir taç
  for (let i = 0; i < 2600; i++) {
    const a = Math.random() * Math.PI * 2, r = Math.pow(Math.random(), 0.6) * 236, x = 256 + Math.cos(a) * r, y = 256 + Math.sin(a) * r * 0.9;
    const sh = 1 - r / 260, l = 18 + sh * 26 + Math.random() * 14, h = 95 + Math.random() * 25;
    fx.fillStyle = `hsl(${h},${38 + Math.random() * 18}%,${l}%)`;
    fx.save(); fx.translate(x, y); fx.rotate(Math.random() * Math.PI); fx.beginPath(); fx.ellipse(0, 0, 9 + Math.random() * 8, 4 + Math.random() * 3, 0, 0, Math.PI * 2); fx.fill(); fx.restore();
  }
  const ft = new THREE.CanvasTexture(fc); ft.colorSpace = THREE.SRGBColorSpace;
  const lm = new THREE.MeshStandardMaterial({ map: ft, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.95 });
  const trunkG = new THREE.CylinderGeometry(0.28, 0.42, 7, 8); trunkG.translate(0, 3.5, 0);
  const tm = std({ color: 0x4d3f33 });
  const spots = [];
  for (let x = -95; x <= 70; x += 13) { spots.push([x, -100]); spots.push([x, 100]); }
  for (let z = -80; z <= 80; z += 16) spots.push([-104, z + 8]);
  [[40, -20], [52, 34], [-40, 40], [-52, -48], [60, -45], [-30, -80], [35, 80]].forEach(p => spots.push(p));
  const ic = new THREE.InstancedMesh(crown, lm, spots.length), it = new THREE.InstancedMesh(trunkG, tm, spots.length);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), ps = new THREE.Vector3();
  spots.forEach(([x, z], i) => {
    const s = 0.85 + ((i * 37) % 10) / 25;
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), i * 1.7); sc.set(s, s, s); ps.set(x, 0, z);
    m4.compose(ps, q, sc); ic.setMatrixAt(i, m4); it.setMatrixAt(i, m4); circ(x, z, 0.6);
  });
  ic.castShadow = true; it.castShadow = true; ic.receiveShadow = true; scene.add(ic, it);

  // banklar
  const seat = new THREE.BoxGeometry(2.0, 0.08, 0.5).translate(0, 0.45, 0), back = new THREE.BoxGeometry(2.0, 0.45, 0.06).translate(0, 0.75, -0.25);
  const legs = mergeGeometries([new THREE.BoxGeometry(0.08, 0.45, 0.5).translate(-0.85, 0.22, 0), new THREE.BoxGeometry(0.08, 0.45, 0.5).translate(0.85, 0.22, 0)]);
  const benches = [];
  for (let z = -86; z <= 86; z += 14) if (Math.abs(z) > 30) { benches.push([-8, z, Math.PI / 2]); benches.push([8, z, -Math.PI / 2]); }
  for (let x = -80; x <= 62; x += 14) if (Math.abs(x) > 30) { benches.push([x, -8, 0]); benches.push([x, 8, Math.PI]); }
  for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + 0.3; benches.push([Math.cos(a) * 22, Math.sin(a) * 22, -a - Math.PI / 2]); }
  const bs = new THREE.InstancedMesh(mergeGeometries([seat, back]), M.wood, benches.length), bl = new THREE.InstancedMesh(legs, M.iron, benches.length);
  benches.forEach(([x, z, r], i) => { q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), r); m4.compose(ps.set(x, 0, z), q, sc.set(1, 1, 1)); bs.setMatrixAt(i, m4); bl.setMatrixAt(i, m4); });
  bs.castShadow = bl.castShadow = true; scene.add(bs, bl);

  // fenerler (gece yanar)
  const lampPos = [];
  for (let z = -90; z <= 90; z += 22) if (Math.abs(z) > 28) { lampPos.push([-7.5, z]); lampPos.push([7.5, z]); }
  for (let x = -90; x <= 66; x += 22) if (Math.abs(x) > 28) { lampPos.push([x, -7.5]); lampPos.push([x, 7.5]); }
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; lampPos.push([Math.cos(a) * 26, Math.sin(a) * 26]); }
  const pole = new THREE.CylinderGeometry(0.07, 0.11, 4, 8).translate(0, 2, 0);
  const lp = new THREE.InstancedMesh(pole, M.iron, lampPos.length);
  globeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffe2b0, emissiveIntensity: 0.0, roughness: 0.3 });
  const gl = new THREE.InstancedMesh(new THREE.SphereGeometry(0.26, 16, 12).translate(0, 4.2, 0), globeMat, lampPos.length);
  lampPos.forEach(([x, z], i) => { m4.makeTranslation(x, 0, z); lp.setMatrixAt(i, m4); gl.setMatrixAt(i, m4); });
  lp.castShadow = true; scene.add(lp, gl);
  // gece ışık halkaları (zemine düşen sıcak ışık)
  const cv = document.createElement('canvas'); cv.width = cv.height = 128; const c2 = cv.getContext('2d');
  const rg = c2.createRadialGradient(64, 64, 0, 64, 64, 64); rg.addColorStop(0, 'rgba(255,214,150,.9)'); rg.addColorStop(1, 'rgba(255,214,150,0)'); c2.fillStyle = rg; c2.fillRect(0, 0, 128, 128);
  const glowT = new THREE.CanvasTexture(cv);
  poolMat = new THREE.MeshBasicMaterial({ map: glowT, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 });
  const pool = new THREE.InstancedMesh(new THREE.PlaneGeometry(11, 11).rotateX(-Math.PI / 2).translate(0, 0.07, 0), poolMat, lampPos.length);
  haloMat = new THREE.SpriteMaterial({ map: glowT, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 });
  lampPos.forEach(([x, z], i) => { m4.makeTranslation(x, 0, z); pool.setMatrixAt(i, m4); const s = new THREE.Sprite(haloMat); s.position.set(x, 4.2, z); s.scale.set(1.6, 1.6, 1); scene.add(s); });
  scene.add(pool);
  // çiçek tarhları (fotoğraftan)
  const fb = std({ map: T.blumen, roughness: 1 });
  const beds = [];
  for (const sx of [1, -1]) for (const sz of [1, -1]) { beds.push([sx * 40, sz * 9.5, 22, 2.2, 0]); beds.push([sx * 9.5, sz * 50, 22, 2.2, Math.PI / 2]); }
  for (const [x, z, w, d, r] of beds) { const o = mesh(new THREE.BoxGeometry(w, 0.5, d), fb, x, 0.25, z); o.rotation.y = r; }
}

/* ---------------------------------------------------------------- uzak manzara: Stuttgart'ın tepeleri ve Fernsehturm */
{
  // tepe halkası (çanak şehir)
  const seg = 128, g = new THREE.CylinderGeometry(2400, 2400, 1, seg, 1, true), pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) { if (pos.getY(i) > 0) { const a = Math.atan2(pos.getZ(i), pos.getX(i)); pos.setY(i, 120 + 90 * Math.sin(a * 3 + 1) + 40 * Math.sin(a * 7) + 25 * Math.sin(a * 13 + 2)); } else pos.setY(i, -30); }
  g.computeVertexNormals();
  const hm = new THREE.MeshStandardMaterial({ color: 0x4e6a45, roughness: 1, side: THREE.BackSide });
  mesh(g, hm, 0, 0, 0, false, false);
  // fotoğraftaki evli tepeler (yakın şerit)
  const hb = T.huegel.clone(); hb.repeat.set(10, 1);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(1500, 1500, 150, 96, 1, true), new THREE.MeshBasicMaterial({ map: hb, transparent: true, alphaTest: 0.2, side: THREE.BackSide, fog: true }));
  band.position.y = 55; scene.add(band);
  // Fernsehturm (güneydoğu, tepede)
  const tw = new THREE.Group(); tw.position.set(1500, 140, 980); scene.add(tw);
  const sh = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 7, 150, 16), std({ color: 0xb8bcbf })); sh.position.y = 75; tw.add(sh);
  const bk = new THREE.Mesh(new THREE.CylinderGeometry(8, 7, 15, 20), std({ color: 0x9aa0a4 })); bk.position.y = 158; tw.add(bk);
  const an = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.6, 50, 8), std({ color: 0xd84f3a })); an.position.y = 190; tw.add(an);
}

/* ---------------------------------------------------------------- gökyüzü, güneş, gece */
const sky = new Sky(); sky.scale.setScalar(8000); scene.add(sky);
const SU = sky.material.uniforms; SU.turbidity.value = 4; SU.rayleigh.value = 1.4; SU.mieCoefficient.value = 0.004; SU.mieDirectionalG.value = 0.82;
const sun = new THREE.DirectionalLight(0xffffff, 3);
sun.castShadow = true; const SS = phone ? 2048 : 4096; sun.shadow.mapSize.set(SS, SS);
Object.assign(sun.shadow.camera, { left: -170, right: 170, top: 170, bottom: -170, near: 10, far: 900 }); sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.4;
scene.add(sun, sun.target);
const hemi = new THREE.HemisphereLight(0xcfe0ff, 0x6b604f, 1.1); scene.add(hemi);
const stars = (() => { const n = 1500, p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const u = Math.random(), v = Math.random() * 0.45 + 0.05, a = u * Math.PI * 2, e = Math.asin(v); p.set([Math.cos(a) * Math.cos(e) * 6000, Math.sin(e) * 6000, Math.sin(a) * Math.cos(e) * 6000], i * 3); } const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3)); const s = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 2.2, sizeAttenuation: false, transparent: true, opacity: 0, fog: false })); scene.add(s); return s; })();
// güneşin konumu (Stuttgart, gerçek saat) — basit astronomik hesap
function sunPos(d) {
  const lat = 48.78 * D2R, lon = 9.18;
  const doy = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5);
  const decl = -23.44 * D2R * Math.cos(2 * Math.PI / 365 * (doy + 10));
  const utcH = d.getUTCHours() + d.getUTCMinutes() / 60;
  const ha = ((utcH + lon / 15) - 12) * 15 * D2R;
  const el = Math.asin(Math.sin(lat) * Math.sin(decl) + Math.cos(lat) * Math.cos(decl) * Math.cos(ha));
  const az = Math.atan2(-Math.sin(ha), Math.tan(decl) * Math.cos(lat) - Math.sin(lat) * Math.cos(ha)); // 0=kuzey, doğuya doğru artar
  return { el, az };
}
const fakeHour = Q.get('saat');
function lighting() {
  let d = new Date();
  if (fakeHour != null) { d = new Date(); d.setHours(+fakeHour, 0, 0, 0); }
  const { el, az } = sunPos(d);
  const v = new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), -Math.cos(az) * Math.cos(el));
  SU.sunPosition.value.copy(v);
  const day = THREE.MathUtils.smoothstep(el / D2R, -6, 8), night = 1 - day, dusk = 1 - Math.abs(THREE.MathUtils.clamp((el / D2R - 3) / 10, -1, 1));
  sun.position.copy(v).multiplyScalar(400); sun.target.position.set(0, 0, 0);
  sun.intensity = 3.2 * THREE.MathUtils.smoothstep(el / D2R, -2, 12);
  sun.color.setHSL(0.09, 0.6 * dusk + 0.1, 0.62 + 0.3 * (1 - dusk));
  hemi.intensity = 0.55 + 1.25 * day;
  hemi.color.setHSL(0.6, 0.45 - 0.1 * day, 0.45 + 0.35 * day); hemi.groundColor.setHSL(0.08, 0.25, 0.18 + 0.22 * day);
  renderer.toneMappingExposure = 0.85 + 0.15 * day;
  for (const m of facadeMats) m.emissiveIntensity = night * 0.55;
  scene.fog.color.setRGB(0.72 * day + 0.04, 0.78 * day + 0.05, 0.84 * day + 0.09);
  stars.material.opacity = night * 0.9;
  if (globeMat) { globeMat.emissiveIntensity = night * 3.0; poolMat.opacity = night * 0.55; haloMat.opacity = night * 0.9; }
  return { day };
}

/* ---------------------------------------------------------------- oyuncu */
const EYE = 1.68, RAD = 0.35, WALK = 1.7, RUN = 4.6;
const me = { p: new THREE.Vector3(-72, 0, 14), yaw: -90 * D2R, pitch: 0.02, run: false };
function collide(p) {
  for (const c of colliders) {
    if (c.t === 'b') {
      if (p.x > c.x0 - RAD && p.x < c.x1 + RAD && p.z > c.z0 - RAD && p.z < c.z1 + RAD) {
        const dx0 = p.x - (c.x0 - RAD), dx1 = (c.x1 + RAD) - p.x, dz0 = p.z - (c.z0 - RAD), dz1 = (c.z1 + RAD) - p.z, m = Math.min(dx0, dx1, dz0, dz1);
        if (m === dx0) p.x = c.x0 - RAD; else if (m === dx1) p.x = c.x1 + RAD; else if (m === dz0) p.z = c.z0 - RAD; else p.z = c.z1 + RAD;
      }
    } else {
      const dx = p.x - c.x, dz = p.z - c.z, d = Math.hypot(dx, dz), r = c.r + RAD;
      if (d < r && d > 1e-4) { p.x = c.x + dx / d * r; p.z = c.z + dz / d * r; }
    }
  }
  const lim = 300; p.x = THREE.MathUtils.clamp(p.x, -lim, lim); p.z = THREE.MathUtils.clamp(p.z, -lim, lim);
}

/* ---------------------------------------------------------------- kontroller */
const keys = {};
addEventListener('keydown', e => { keys[e.code] = true; if (e.code === 'ShiftLeft') me.run = true; });
addEventListener('keyup', e => { keys[e.code] = false; if (e.code === 'ShiftLeft') me.run = $('run').classList.contains('on'); });
const joy = { id: null, x: 0, y: 0, cx: 0, cy: 0 }, look = { id: null, x: 0, y: 0 };
const stick = $('stick'), knob = $('knob'), cv = renderer.domElement;
cv.addEventListener('pointerdown', e => {
  if (e.clientX < innerWidth * 0.45 && joy.id == null && e.pointerType !== 'mouse') {
    joy.id = e.pointerId; joy.cx = e.clientX; joy.cy = e.clientY; joy.x = joy.y = 0;
    stick.style.left = e.clientX + 'px'; stick.style.top = e.clientY + 'px'; stick.classList.add('on');
  } else if (look.id == null) { look.id = e.pointerId; look.x = e.clientX; look.y = e.clientY; }
  try { cv.setPointerCapture(e.pointerId); } catch (x) {}
  $('hint').style.opacity = 0;
});
cv.addEventListener('pointermove', e => {
  if (e.pointerId === joy.id) {
    let dx = e.clientX - joy.cx, dy = e.clientY - joy.cy; const L = Math.hypot(dx, dy), Mx = 55;
    if (L > Mx) { dx *= Mx / L; dy *= Mx / L; }
    joy.x = dx / Mx; joy.y = dy / Mx; knob.style.transform = `translate(${dx}px,${dy}px)`;
  } else if (e.pointerId === look.id) {
    const s = phone ? 0.0055 : 0.0035;
    me.yaw -= (e.clientX - look.x) * s; me.pitch = Math.max(-1.25, Math.min(1.25, me.pitch - (e.clientY - look.y) * s));
    look.x = e.clientX; look.y = e.clientY;
  }
});
const endP = e => {
  if (e.pointerId === joy.id) { joy.id = null; joy.x = joy.y = 0; knob.style.transform = ''; stick.classList.remove('on'); }
  if (e.pointerId === look.id) look.id = null;
};
cv.addEventListener('pointerup', endP); cv.addEventListener('pointercancel', endP);
$('run').onclick = () => { $('run').classList.toggle('on'); me.run = $('run').classList.contains('on'); };
$('back').onclick = () => toParent('game-exit');

/* ---------------------------------------------------------------- döngü */
const fwd = new THREE.Vector3(), right = new THREE.Vector3();
let bob = 0, last = performance.now(), lT = 0;
function update(dt) {
  let ix = joy.x, iz = joy.y;
  if (keys.KeyW || keys.ArrowUp) iz -= 1; if (keys.KeyS || keys.ArrowDown) iz += 1;
  if (keys.KeyA || keys.ArrowLeft) ix -= 1; if (keys.KeyD || keys.ArrowRight) ix += 1;
  const mag = Math.min(1, Math.hypot(ix, iz));
  fwd.set(-Math.sin(me.yaw), 0, -Math.cos(me.yaw)); right.set(Math.cos(me.yaw), 0, -Math.sin(me.yaw));
  const sp = (me.run ? RUN : WALK) * mag;
  if (mag > 0.01) {
    const len = Math.hypot(ix, iz);
    me.p.addScaledVector(fwd, -iz / len * sp * dt).addScaledVector(right, ix / len * sp * dt);
    collide(me.p);
  }
  // sütun basamakları
  const ax = Math.abs(me.p.x), az = Math.abs(me.p.z), m = Math.max(ax, az);
  me.p.y += ((m < 6.8 ? 0.7 : m < 7.5 ? 0.35 : 0) - me.p.y) * Math.min(1, dt * 12);
  bob += dt * sp * 4.2;
  const by = mag > 0.01 ? Math.sin(bob) * (me.run ? 0.05 : 0.028) : 0;
  camera.position.set(me.p.x, me.p.y + EYE + by, me.p.z);
  camera.rotation.set(me.pitch, me.yaw, 0, 'YXZ');
  const deg = ((-me.yaw / D2R) % 360 + 360) % 360; $('needle').style.transform = `rotate(${-deg}deg)`;
}
function loop(t) {
  requestAnimationFrame(loop);
  const dt = Math.min(0.05, (t - last) / 1000); last = t;
  update(dt); updFountains(dt);
  if ((lT -= dt) <= 0) { lT = 20; lighting(); }
  renderer.render(scene, camera);
}
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });

// başlat: dokular yüklenince perde açılır
THREE.DefaultLoadingManager.onLoad = () => { $('load').classList.add('out'); setTimeout(() => toast('Schlossplatz · Stuttgart'), 500); };
setTimeout(() => $('load').classList.add('out'), 8000);
$('loadtxt').textContent = 'Schlossplatz kuruluyor…';
lighting();
requestAnimationFrame(loop);
window.__st = { me, scene, camera, lighting };
