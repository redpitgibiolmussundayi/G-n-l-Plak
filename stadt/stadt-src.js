/* Gönül Plak · Stuttgart (açık dünya)
   Gerçek Stuttgart: Google Photorealistic 3D Tiles (uçak fotoğraflarından üretilmiş şehir modeli).
   Birinci bölge: Schlossplatz. Yürüme, bakma, koşma; zemine basma ve binalara çarpma ışın testleriyle.
   ?test=1 → Google olmadan, sahte bir zeminle kontrol testi. */
import * as THREE from 'three';
import { TilesRenderer } from '3d-tiles-renderer';
import { GoogleCloudAuthPlugin, ReorientationPlugin, GLTFExtensionsPlugin, TilesFadePlugin, UpdateOnChangePlugin } from '3d-tiles-renderer/plugins';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const $ = id => document.getElementById(id);
const Q = new URLSearchParams(location.search);
const TEST = Q.get('test') === '1';
const LS = { get: (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
const toParent = m => { try { if (parent !== window) parent.postMessage(m, '*'); } catch (e) {} };
const toast = (t, ms = 2600) => { const el = $('toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), ms); };
const D2R = Math.PI / 180;

/* ---------------------------------------------------------------- bölgeler */
const ZONES = {
  schlossplatz: {
    n: 'Schlossplatz', lat: 48.77845, lon: 9.17965, h: 296,          // Jubiläumssäule; h: elipsoid yüksekliği (yaklaşık zemin)
    spawn: { x: -70, z: 25, yaw: -90 * D2R },                         // Königsbau önü, Neues Schloss'a bakış
    radius: 230                                                        // ilk bölgenin sınırı (metre)
  }
};
const zone = ZONES.schlossplatz;

/* ---------------------------------------------------------------- sahne */
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
$('stage').appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.2, 6000);
scene.add(camera);
{ // gökyüzü
  const c = document.createElement('canvas'); c.width = 2; c.height = 256; const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 0, 256); gr.addColorStop(0, '#6f9fd6'); gr.addColorStop(0.55, '#b9d2ea'); gr.addColorStop(1, '#e8eef2');
  g.fillStyle = gr; g.fillRect(0, 0, 2, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; scene.background = t;
}
scene.fog = new THREE.Fog(0xcfdde8, 900, 4500);
scene.add(new THREE.HemisphereLight(0xffffff, 0x888888, 2.2));

/* ---------------------------------------------------------------- şehir */
let tiles = null, world = null;
function startTiles(key) {
  if (TEST) { world = testWorld(); scene.add(world); return; }
  tiles = new TilesRenderer();
  tiles.registerPlugin(new GoogleCloudAuthPlugin({ apiToken: key, autoRefreshToken: true }));
  const draco = new DRACOLoader().setDecoderPath('stadt/draco/');
  tiles.registerPlugin(new GLTFExtensionsPlugin({ dracoLoader: draco }));
  tiles.registerPlugin(new ReorientationPlugin({ lat: zone.lat * D2R, lon: zone.lon * D2R, height: zone.h }));
  tiles.registerPlugin(new TilesFadePlugin());
  tiles.registerPlugin(new UpdateOnChangePlugin());
  tiles.errorTarget = phone ? 10 : 6;
  tiles.lruCache.minBytesSize = 0.18 * 2 ** 30; tiles.lruCache.maxBytesSize = (phone ? 0.3 : 0.6) * 2 ** 30;
  tiles.setCamera(camera); tiles.setResolutionFromRenderer(camera, renderer);
  tiles.addEventListener('load-error', e => { const m = String((e.error && e.error.message) || e.error || ''); console.warn('tile', m); if (/40[13]/.test(m)) keyError(m); else if (!me.settled && !keyError.shown) { $('loadtxt').innerHTML = 'Şehir yüklenemedi: ' + m.slice(0, 120) + '<br><button class="btn" id="retry">Tekrar dene</button> <button class="btn" id="rekey">Anahtarı değiştir</button>'; $('retry').onclick = () => location.reload(); $('rekey').onclick = () => { LS.set('gp-gkey', ''); location.reload(); }; } });
  tiles.addEventListener('tiles-load-end', () => { tilesReady = true; });
  scene.add(tiles.group); world = tiles.group;
}
const phone = matchMedia('(pointer:coarse)').matches;
let tilesReady = false;

// test dünyası: düz zemin + birkaç bina + basamak (Google olmadan kontrolleri denemek için)
function testWorld() {
  const g = new THREE.Group();
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(600, 600, 1, 1), new THREE.MeshStandardMaterial({ color: 0x9a9a8f }));
  ground.rotation.x = -Math.PI / 2; g.add(ground);
  const mat = new THREE.MeshStandardMaterial({ color: 0xd8c9a8 });
  [[40, 0, 30, 20, 18], [-120, 10, 20, 60, 22], [0, -90, 90, 20, 25], [-40, 60, 8, 8, 30]].forEach(([x, z, w, d, h]) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); b.position.set(x, h / 2, z); g.add(b); });
  const step = new THREE.Mesh(new THREE.BoxGeometry(20, 0.35, 20), new THREE.MeshStandardMaterial({ color: 0x777777 })); step.position.set(-60, 0.175, 25); g.add(step);
  scene.add(new THREE.DirectionalLight(0xffffff, 2).translateY(100));
  return g;
}

/* ---------------------------------------------------------------- oyuncu */
const EYE = 1.68, R = 0.35, STEP = 0.55, WALK = 1.6, RUN = 4.2;
const me = { p: new THREE.Vector3(zone.spawn.x, 60, zone.spawn.z), yaw: zone.spawn.yaw, pitch: -0.03, vy: 0, ground: null, run: false, settled: false };
const ray = new THREE.Raycaster(); ray.firstHitOnly = true;
const DOWN = new THREE.Vector3(0, -1, 0), _v = new THREE.Vector3(), _o = new THREE.Vector3();
function hit(from, dir, far) {
  if (!world) return null;
  ray.set(from, dir); ray.far = far; ray.near = 0;
  const h = ray.intersectObject(world, true);
  return h.length ? h[0] : null;
}
// zemin yüksekliği: oyuncunun biraz üstünden aşağı
function groundAt(x, z, fromY) { const h = hit(_o.set(x, fromY, z), DOWN, 400); return h ? h.point.y : null; }

/* ---------------------------------------------------------------- kontroller */
const keys = {};
addEventListener('keydown', e => { keys[e.code] = true; if (e.code === 'ShiftLeft') me.run = true; });
addEventListener('keyup', e => { keys[e.code] = false; if (e.code === 'ShiftLeft') me.run = false; });
const joy = { id: null, x: 0, y: 0, cx: 0, cy: 0 }, look = { id: null, x: 0, y: 0 };
const stick = $('stick'), knob = $('knob');
const cv = renderer.domElement;
cv.addEventListener('pointerdown', e => {
  if (e.clientX < innerWidth * 0.45 && joy.id == null && e.pointerType !== 'mouse') {
    joy.id = e.pointerId; joy.cx = e.clientX; joy.cy = e.clientY; joy.x = joy.y = 0;
    stick.style.left = e.clientX + 'px'; stick.style.top = e.clientY + 'px'; stick.classList.add('on');
  } else if (look.id == null) { look.id = e.pointerId; look.x = e.clientX; look.y = e.clientY; }
  cv.setPointerCapture(e.pointerId);
});
cv.addEventListener('pointermove', e => {
  if (e.pointerId === joy.id) {
    let dx = e.clientX - joy.cx, dy = e.clientY - joy.cy; const L = Math.hypot(dx, dy), M = 55;
    if (L > M) { dx *= M / L; dy *= M / L; }
    joy.x = dx / M; joy.y = dy / M; knob.style.transform = `translate(${dx}px,${dy}px)`;
    me.run = L > M * 1.35 || $('run').classList.contains('on');
  } else if (e.pointerId === look.id) {
    const s = phone ? 0.0055 : 0.0035;
    me.yaw -= (e.clientX - look.x) * s; me.pitch = Math.max(-1.25, Math.min(1.25, me.pitch - (e.clientY - look.y) * s));
    look.x = e.clientX; look.y = e.clientY;
  }
});
const endP = e => {
  if (e.pointerId === joy.id) { joy.id = null; joy.x = joy.y = 0; knob.style.transform = ''; stick.classList.remove('on'); me.run = $('run').classList.contains('on'); }
  if (e.pointerId === look.id) look.id = null;
};
cv.addEventListener('pointerup', endP); cv.addEventListener('pointercancel', endP);
$('run').onclick = () => { $('run').classList.toggle('on'); me.run = $('run').classList.contains('on'); };

/* ---------------------------------------------------------------- hareket */
const fwd = new THREE.Vector3(), right = new THREE.Vector3(), mv = new THREE.Vector3();
let gTimer = 0;
function update(dt) {
  // yön
  let ix = joy.x, iz = joy.y;
  if (keys.KeyW || keys.ArrowUp) iz -= 1; if (keys.KeyS || keys.ArrowDown) iz += 1;
  if (keys.KeyA || keys.ArrowLeft) ix -= 1; if (keys.KeyD || keys.ArrowRight) ix += 1;
  const mag = Math.min(1, Math.hypot(ix, iz));
  fwd.set(-Math.sin(me.yaw), 0, -Math.cos(me.yaw)); right.set(Math.cos(me.yaw), 0, -Math.sin(me.yaw));
  mv.set(0, 0, 0).addScaledVector(fwd, -iz).addScaledVector(right, ix);
  if (mv.lengthSq() > 0) mv.normalize().multiplyScalar((me.run ? RUN : WALK) * mag * dt);

  // zemin bulunana kadar bekle (şehir yükleniyor)
  if (!me.settled) {
    gTimer -= dt; if (gTimer > 0) return;
    gTimer = 0.25;
    const g = groundAt(me.p.x, me.p.z, 300);
    if (g != null) { me.p.y = g; me.ground = g; me.settled = true; hideLoad(); }
    return;
  }
  // duvarlar: göğüs ve diz hizasında ileri ışın
  if (mv.lengthSq() > 0) {
    const dist = mv.length(), dir = _v.copy(mv).normalize();
    for (const hgt of [0.6, 1.3]) {
      const h = hit(_o.set(me.p.x, me.p.y + hgt, me.p.z), dir, dist + R);
      if (h) {
        // duvar boyunca kay
        const n = h.face ? h.face.normal.clone().transformDirection(h.object.matrixWorld) : dir.clone().negate();
        n.y = 0; if (n.lengthSq() < 1e-4) n.copy(dir).negate(); n.normalize();
        mv.addScaledVector(n, -mv.dot(n));
        break;
      }
    }
  }
  const nx = me.p.x + mv.x, nz = me.p.z + mv.z;
  // bölge sınırı
  if (Math.hypot(nx, nz) > zone.radius) { if (!update.warned) { toast('Bu bölgenin sonu. Sıradaki bölgeler yakında açılacak.'); update.warned = true; setTimeout(() => update.warned = false, 6000); } }
  else {
    const g = groundAt(nx, nz, me.p.y + STEP + 1.2);
    if (g != null && g - me.p.y <= STEP) { me.p.x = nx; me.p.z = nz; me.ground = g; }
    else if (g == null) { me.p.x = nx; me.p.z = nz; }             // zemin henüz yüklenmedi: yürümeye devam
  }
  // yerçekimi / basamak inme
  if (me.ground != null) {
    if (me.p.y > me.ground + 0.02) { me.vy -= 9.8 * dt; me.p.y = Math.max(me.ground, me.p.y + me.vy * dt); }
    else { me.vy = 0; me.p.y += (me.ground - me.p.y) * Math.min(1, dt * 14); }
  }
}
// yürürken hafif baş sallanması
let bob = 0;
function placeCam(dt) {
  const sp = Math.hypot(joy.x, joy.y) || ((keys.KeyW || keys.KeyS || keys.KeyA || keys.KeyD) ? 1 : 0);
  bob += dt * sp * (me.run ? 11 : 7.5);
  const by = sp ? Math.sin(bob) * (me.run ? 0.045 : 0.025) : 0;
  camera.position.set(me.p.x, me.p.y + EYE + by, me.p.z);
  camera.rotation.set(me.pitch, me.yaw, 0, 'YXZ');
}

/* ---------------------------------------------------------------- arayüz */
function hideLoad() { $('load').classList.add('out'); setTimeout(() => toast(zone.n + ' · Stuttgart'), 400); }
function compass() { const deg = ((-me.yaw / D2R) % 360 + 360) % 360; $('needle').style.transform = `rotate(${-deg}deg)`; }
function attributions() {
  if (!tiles) { $('attr').textContent = TEST ? 'TEST · Google yok' : ''; return; }
  const a = tiles.getAttributions(); const txt = a.filter(x => x.type === 'string').map(x => x.value).join(' · ');
  $('attr').textContent = 'Google' + (txt ? ' · ' + txt : '');
}
function keyError(m) { if (keyError.shown) return; keyError.shown = true; $('load').classList.remove('out'); $('loadtxt').innerHTML = 'Google anahtarı kabul edilmedi. Anahtarı ve kısıtlamalarını kontrol et.<br><button class="btn" id="rekey">Anahtarı değiştir</button>'; $('rekey').onclick = () => { LS.set('gp-gkey', ''); location.reload(); }; }
$('back').onclick = () => toParent('game-exit');
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); if (tiles) tiles.setResolutionFromRenderer(camera, renderer); });

/* ---------------------------------------------------------------- döngü */
let last = performance.now(), aT = 0;
function loop(t) {
  requestAnimationFrame(loop);
  const dt = Math.min(0.05, (t - last) / 1000); last = t;
  update(dt); placeCam(dt); compass();
  if (tiles) { camera.updateMatrixWorld(); tiles.update(); }
  renderer.render(scene, camera);
  if ((aT += dt) > 2) { aT = 0; attributions(); }
}

/* ---------------------------------------------------------------- başlat */
function begin(key) {
  $('keybox').hidden = true; $('loadtxt').textContent = 'Stuttgart yükleniyor… ' + zone.n;
  startTiles(key); requestAnimationFrame(loop);
  setTimeout(() => { if (!me.settled && !keyError.shown) $('loadtxt').textContent = 'Şehir geliyor, internet yavaşsa biraz sürebilir…'; }, 12000);
}
const key = LS.get('gp-gkey', '');
if (TEST || key) begin(key);
else {
  $('keybox').hidden = false; $('loadtxt').textContent = '';
  $('keyok').onclick = () => { const k = $('keyin').value.trim(); if (!/^AIza[0-9A-Za-z_\-]{20,}$/.test(k)) { toast('Bu bir Google API anahtarına benzemiyor (AIza… ile başlar)'); return; } LS.set('gp-gkey', k); begin(k); };
}
window.__st = { me, get tiles() { return tiles; } };
