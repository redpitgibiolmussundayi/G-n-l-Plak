/* Gönül Plak · Stuttgart Kıraathanesi (3D)
   Yürü, otur, çay söyle, TV'de YouTube aç, plak çalarda müzik çal, yan odada bilardo ve nargile, okey masasında 3D okey.
   Pencerede gerçek Stuttgart manzarası (mevsime ve saate göre; olmayan mevsimde piksel resim).
   Online: arkadaşların aynı kıraathanede yürür, aynı masaya oturur, aynı TV'yi ve plağı dinler (net.js, MQTT). */
import * as THREE from './kh-three.js';
import { CSS3DRenderer, CSS3DObject } from './kh-css3d.js';
import { createOkey } from './kh-okey.js';
import { EffectComposer } from './kh-x-EffectComposer.js';
import { RenderPass } from './kh-x-RenderPass.js';
import { UnrealBloomPass } from './kh-x-UnrealBloomPass.js';
import { OutputPass } from './kh-x-OutputPass.js';

const T = s => (window.gpT ? window.gpT(s) : s);
const $ = id => document.getElementById(id);
const LS = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
const SS = { get(k) { try { return JSON.parse(sessionStorage.getItem(k) || 'null'); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
const qs = new URLSearchParams(location.search);
const DEF_AV = { skin: 0xc99a78, hair: 0x17100b, hairStyle: 0, mustache: 1, beard: 0, shirt: 0x2a5a8a, vest: 0, pants: 0x23232a, cap: 0, glasses: 0 };
const P = Object.assign({ time: 'auto', snow: 'auto', season: 'auto', q: 'auto', tv: [], hint: 0, cam: 1, av: null }, LS.get('gp_kh', {}));
if (!P.av) P.av = Object.assign({}, DEF_AV);
const save = () => LS.set('gp_kh', P);
let myName = (qs.get('userName') || '').trim().slice(0, 18) || String((LS.get('gp_okey', {}) || {}).name || '').slice(0, 18);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const TEST = /[?&]khtest=1/.test(location.search);
const setLoad = (p, txt) => { const b = $('loadbar'); if (b) b.style.width = Math.round(p * 100) + '%'; const t = $('loadtxt'); if (t && txt) t.textContent = txt; };
setLoad(0.15, T('Çay demleniyor…'));
const toParent = m => { try { if (parent !== window) parent.postMessage(m, '*'); } catch (e) {} };

/* ============================================================ zaman / hava / mevsim */
const LAT = 48.7758, LNG = 9.1829, RAD = Math.PI / 180, J2000 = 2451545, J0 = 0.0009;
function sunTimes(date) {
  const lw = -LNG * RAD, phi = LAT * RAD, d = date.getTime() / 864e5 - 0.5 + 2440588 - J2000;
  const n = Math.round(d - J0 - lw / (2 * Math.PI)), ds = J0 + lw / (2 * Math.PI) + n;
  const M_ = RAD * (357.5291 + 0.98560028 * ds), C = RAD * (1.9148 * Math.sin(M_) + 0.02 * Math.sin(2 * M_) + 0.0003 * Math.sin(3 * M_));
  const L = M_ + C + RAD * 102.9372 + Math.PI, dec = Math.asin(Math.sin(L) * Math.sin(RAD * 23.4397));
  const noon = J2000 + ds + 0.0053 * Math.sin(M_) - 0.0069 * Math.sin(2 * L);
  const fromJ = j => (j + 0.5 - 2440588) * 864e5;
  const at = h => { const w = Math.acos((Math.sin(h * RAD) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec))); const set = J2000 + J0 + (w + lw) / (2 * Math.PI) + n + 0.0053 * Math.sin(M_) - 0.0069 * Math.sin(2 * L); return [fromJ(noon - (set - noon)), fromJ(set)]; };
  const [rise, set] = at(-0.833), [dawn, dusk] = at(-6); return { rise, set, dawn, dusk };
}
function autoPhase(now = new Date()) {
  const t = now.getTime(), s = sunTimes(now), m = 60000;
  if (t < s.dawn || t > s.dusk + 25 * m) return 'gece';
  if (t < s.rise) return 'aksam';
  if (t < s.rise + 75 * m) return 'sabah';
  if (t < s.set - 100 * m) return 'gunduz';
  if (t < s.set + 10 * m) return 'gunbatimi';
  return 'aksam';
}
let wx = LS.get('gp-wx', null);
async function fetchWx() {
  if (wx && Date.now() - wx.at < 30 * 60000) return;
  try {
    const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=48.7758&longitude=9.1829&current=temperature_2m,weather_code&timezone=Europe%2FBerlin');
    const c = (await r.json()).current; wx = { t: Math.round(c.temperature_2m), code: c.weather_code, at: Date.now() }; LS.set('gp-wx', wx); applyEnv();
  } catch (e) {}
}
const wxCode = () => wx && Date.now() - wx.at < 3 * 3600000 ? wx.code : -1;
const snowing = () => P.snow === 'on' || (P.snow === 'auto' && [71, 73, 75, 77, 85, 86].includes(wxCode()));
const overcast = () => snowing() || (P.snow === 'auto' && (wxCode() === 3 || (wxCode() >= 45 && wxCode() <= 67) || wxCode() >= 80));
const phaseNow = () => (P.time === 'auto' ? autoPhase() : P.time);
const SEASONS = ['ilkbahar', 'yaz', 'sonbahar', 'kis'];
const seasonNow = () => { if (P.season !== 'auto') return P.season; const m = new Date().getMonth(); return m <= 1 || m === 11 ? 'kis' : m <= 4 ? 'ilkbahar' : m <= 7 ? 'yaz' : 'sonbahar'; };
// gerçek manzara fotoğrafları (mevsim-saat). Olmayan mevsimde sırayla diğerleri denenir.
const PANOS = new Set(['ilkbahar-gunduz', 'ilkbahar-sabah', 'ilkbahar-gunbatimi', 'ilkbahar-aksam', 'ilkbahar-gece', 'yaz-gunduz', 'yaz-sabah', 'yaz-gunbatimi', 'yaz-aksam', 'yaz-gece', 'sonbahar-gunduz', 'sonbahar-sabah', 'sonbahar-gunbatimi', 'sonbahar-aksam', 'sonbahar-gece', 'kis-gunduz', 'kis-sabah', 'kis-gunbatimi', 'kis-aksam', 'kis-gece']);
const SEASON_FALLBACK = { ilkbahar: ['ilkbahar', 'yaz'], yaz: ['yaz', 'ilkbahar'], sonbahar: ['sonbahar', 'yaz', 'ilkbahar'], kis: ['kis', 'sonbahar', 'ilkbahar', 'yaz'] };
function viewFile(ph) {
  for (const s of SEASON_FALLBACK[seasonNow()]) if (PANOS.has(s + '-' + ph)) return { photo: true, f: `pano-${s}-${ph}.webp`, season: s };
  if (!overcast()) return { photo: false, f: `stg-sonbahar-${ph}.webp` };
  return { photo: false, f: `stg-sonbahar-${ph === 'gece' ? 'kapali-gece' : ph === 'sabah' ? 'kapali-sabah' : ph === 'gunduz' ? 'kapali-gunduz' : 'kapali-aksam'}.webp` };
}

/* ============================================================ renderer (boyutları her iki katmanda da aynı: TV görüntüsü tam oturur) */
const lowQ = () => P.q === 'low';
const BLOOM = !(matchMedia('(pointer:coarse)').matches && Math.min(screen.width, screen.height) < 900); // telefonda parlama kapalı (kasma olmasın)
const renderer = new THREE.WebGLRenderer({ antialias: !lowQ(), alpha: true, powerPreference: 'high-performance' });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; renderer.shadowMap.autoUpdate = false;
renderer.setClearColor(0x000000, 1);
$('gl').appendChild(renderer.domElement);
const css = new CSS3DRenderer(); $('css').appendChild(css.domElement);
const scene = new THREE.Scene(), cssScene = new THREE.Scene();
scene.background = new THREE.Color(0x0d1220);
const camera = new THREE.PerspectiveCamera(65, 1, 0.04, 200); camera.rotation.order = 'YXZ'; scene.add(camera);
const MAXA = Math.min(4, renderer.capabilities.getMaxAnisotropy());
let VW = 1, VH = 1; // görünür alan (CSS px)

let seed = 11; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
function cvs(w, h, fn) { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return c; }
function mkTex(c, rx = 1, ry = 1, srgb = true) { const t = new THREE.CanvasTexture(c); if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); t.anisotropy = MAXA; return t; }
function uvScale(g, sx, sy) { const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * sx, uv.getY(i) * sy); return g; }
const loader = new THREE.TextureLoader();
function imgTex(src) { const t = loader.load(src); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = MAXA; return t; }

/* ============================================================ dokular (hepsi kodla çizilir) */
function woodCanvas(base, W = 512, H = 512, plank = 64, gaps = true) {
  return cvs(W, H, x => {
    for (let px = 0; px < W; px += plank) {
      const v = 0.78 + rnd() * 0.4; x.fillStyle = `rgb(${base[0] * v | 0},${base[1] * v | 0},${base[2] * v | 0})`; x.fillRect(px, 0, plank, H);
      for (let i = 0; i < 46; i++) {
        x.strokeStyle = rnd() < 0.55 ? `rgba(25,12,4,${0.07 + rnd() * 0.14})` : `rgba(190,130,80,${0.05 + rnd() * 0.08})`;
        x.lineWidth = 0.6 + rnd() * 1.8; x.beginPath(); let gx = px + rnd() * plank; x.moveTo(gx, 0);
        for (let y = 0; y <= H; y += 24) { gx += (rnd() - 0.5) * 2.6; gx = Math.max(px + 1, Math.min(px + plank - 1, gx)); x.lineTo(gx, y); }
        x.stroke();
      }
      if (rnd() < 0.3) { const ky = rnd() * H, kx = px + plank * (0.3 + rnd() * 0.4); x.fillStyle = 'rgba(30,14,5,.45)'; x.beginPath(); x.ellipse(kx, ky, 4 + rnd() * 4, 9 + rnd() * 8, 0, 0, 7); x.fill(); }
      if (gaps) { x.fillStyle = 'rgba(12,6,2,.9)'; x.fillRect(px, 0, 2, H); x.fillStyle = 'rgba(255,210,160,.07)'; x.fillRect(px + 2, 0, 1, H); }
    }
  });
}
const texWall = mkTex(woodCanvas([118, 66, 34]));
const texDark = mkTex(woodCanvas([70, 38, 20], 512, 512, 128, false));
const texCeil = mkTex(woodCanvas([84, 48, 26], 512, 512, 85));
const texFloor = mkTex(cvs(512, 512, (x) => {
  x.fillStyle = '#4a3f36'; x.fillRect(0, 0, 512, 512);
  const pal = [[136, 124, 108], [128, 116, 102], [142, 128, 110], [122, 110, 98], [132, 120, 104], [118, 108, 96]];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    const c = pal[(rnd() * pal.length) | 0], X = i * 128 + 2, Y = j * 128 + 2, v = 0.9 + rnd() * 0.2;
    x.fillStyle = `rgb(${c[0] * v | 0},${c[1] * v | 0},${c[2] * v | 0})`; x.fillRect(X, Y, 124, 124);
    for (let k = 0; k < 520; k++) { const a = rnd(); x.fillStyle = a < 0.5 ? `rgba(40,30,20,${rnd() * 0.18})` : `rgba(255,245,230,${rnd() * 0.12})`; x.fillRect(X + rnd() * 124, Y + rnd() * 124, 1 + rnd() * 3, 1 + rnd() * 3); }
    const g = x.createLinearGradient(X, Y, X + 124, Y + 124); g.addColorStop(0, 'rgba(255,240,220,.10)'); g.addColorStop(0.5, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.16)');
    x.fillStyle = g; x.fillRect(X, Y, 124, 124);
  }
}));
const texPlank = mkTex(woodCanvas([96, 58, 32], 512, 512, 64)); // yan oda tahta zemin
function motif(x, cx, cy, r, gold, cream, dark) {
  x.save(); x.translate(cx, cy);
  x.fillStyle = gold; x.beginPath(); x.moveTo(0, -r); x.lineTo(r * 0.75, 0); x.lineTo(0, r); x.lineTo(-r * 0.75, 0); x.closePath(); x.fill();
  x.fillStyle = dark; x.beginPath(); x.moveTo(0, -r * 0.62); x.lineTo(r * 0.45, 0); x.lineTo(0, r * 0.62); x.lineTo(-r * 0.45, 0); x.closePath(); x.fill();
  x.fillStyle = cream; x.beginPath(); x.arc(0, 0, r * 0.2, 0, 7); x.fill();
  for (let a = 0; a < 4; a++) { x.rotate(Math.PI / 2); x.beginPath(); x.ellipse(0, -r * 1.12, r * 0.12, r * 0.22, 0, 0, 7); x.fill(); }
  x.restore();
}
function clothCanvas(field, gold, cream, dark, W = 512) {
  return cvs(W, W, x => {
    x.fillStyle = field; x.fillRect(0, 0, W, W);
    for (let i = 0; i < 9000; i++) { x.fillStyle = `rgba(0,0,0,${rnd() * 0.12})`; x.fillRect(rnd() * W, rnd() * W, 1, 1); }
    const b = W * 0.11;
    x.strokeStyle = gold; x.lineWidth = 4; x.strokeRect(b * 0.25, b * 0.25, W - b * 0.5, W - b * 0.5); x.lineWidth = 2; x.strokeRect(b, b, W - 2 * b, W - 2 * b);
    for (let i = 0; i < 12; i++) { const t = (i + 0.5) / 12 * W; motif(x, t, b * 0.62, b * 0.28, gold, cream, dark); motif(x, t, W - b * 0.62, b * 0.28, gold, cream, dark); motif(x, b * 0.62, t, b * 0.28, gold, cream, dark); motif(x, W - b * 0.62, t, b * 0.28, gold, cream, dark); }
    for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) { const cx = b + (i + 0.5) * (W - 2 * b) / 9, cy = b + (j + 0.5) * (W - 2 * b) / 9; if (Math.abs(i - 4) + Math.abs(j - 4) <= 2) continue; motif(x, cx, cy, W * 0.018, (i + j) % 2 ? gold : cream, dark, dark); }
    x.save(); x.translate(W / 2, W / 2);
    for (let k = 0; k < 16; k++) { x.rotate(Math.PI / 8); x.fillStyle = k % 2 ? gold : cream; x.beginPath(); x.ellipse(0, -W * 0.085, W * 0.012, W * 0.045, 0, 0, 7); x.fill(); }
    x.fillStyle = dark; x.beginPath(); x.arc(0, 0, W * 0.045, 0, 7); x.fill(); x.fillStyle = gold; x.beginPath(); x.arc(0, 0, W * 0.022, 0, 7); x.fill();
    x.restore();
  });
}
const texCloth = mkTex(clothCanvas('#7b121a', '#cfa75a', '#ead7a8', '#3a070c'));
const texCloth2 = mkTex(clothCanvas('#8a6a2a', '#e8cc88', '#f4e6c0', '#4a2a10'));
const texClothSide = mkTex(cvs(256, 64, x => {
  x.fillStyle = '#7b121a'; x.fillRect(0, 0, 256, 64);
  x.fillStyle = '#cfa75a'; x.fillRect(0, 4, 256, 3); x.fillRect(0, 50, 256, 2);
  for (let i = 0; i < 6; i++) motif(x, (i + 0.5) * 256 / 6, 28, 13, '#cfa75a', '#ead7a8', '#3a070c');
  for (let i = 0; i < 2600; i++) { x.fillStyle = `rgba(0,0,0,${rnd() * 0.12})`; x.fillRect(rnd() * 256, rnd() * 64, 1, 1); }
}), 4, 1);
function rugCanvas(field, border, gold, cream) {
  return cvs(256, 640, x => {
    x.fillStyle = border; x.fillRect(0, 0, 256, 640);
    x.fillStyle = field; x.fillRect(30, 40, 196, 560);
    x.strokeStyle = gold; x.lineWidth = 3; x.strokeRect(22, 32, 212, 576); x.strokeRect(34, 44, 188, 552);
    for (let i = 0; i < 18; i++) { motif(x, 13, 50 + i * 30, 7, gold, cream, field); motif(x, 243, 50 + i * 30, 7, gold, cream, field); }
    for (let i = 0; i < 7; i++) { motif(x, 30 + i * 33, 18, 7, gold, cream, field); motif(x, 30 + i * 33, 622, 7, gold, cream, field); }
    for (let j = 0; j < 9; j++) for (let i = 0; i < 3; i++) if (!(i === 1 && j >= 3 && j <= 5)) motif(x, 70 + i * 58, 80 + j * 60, 13, gold, cream, border);
    x.save(); x.translate(128, 320); x.fillStyle = border; x.beginPath(); x.moveTo(0, -120); x.lineTo(70, 0); x.lineTo(0, 120); x.lineTo(-70, 0); x.closePath(); x.fill();
    x.fillStyle = gold; x.beginPath(); x.moveTo(0, -90); x.lineTo(50, 0); x.lineTo(0, 90); x.lineTo(-50, 0); x.closePath(); x.fill();
    motif(x, 0, 0, 34, field, cream, border); x.restore();
    for (let i = 0; i < 12000; i++) { x.fillStyle = `rgba(0,0,0,${rnd() * 0.15})`; x.fillRect(rnd() * 256, rnd() * 640, 1, 1); }
    x.fillStyle = cream; for (let i = 0; i < 256; i += 5) { x.fillRect(i, 0, 2, 6); x.fillRect(i, 634, 2, 6); }
  });
}
const texRugs = [mkTex(rugCanvas('#6e1018', '#1f2238', '#c79a52', '#e6d2a4')), mkTex(rugCanvas('#7d1a14', '#3a0f12', '#d0a75c', '#ecdcb0')), mkTex(rugCanvas('#5a1420', '#24324a', '#b98c4a', '#e0cfa0'))];
const texLeaf = mkTex(cvs(256, 512, x => {
  for (let i = 0; i < 260; i++) {
    const cx = 128 + (rnd() - 0.5) * 200 * Math.min(1, 0.4 + i / 260), cy = rnd() * 500 + 6, a = rnd() * 6.28, s = 7 + rnd() * 9;
    const g = 70 + rnd() * 80; x.fillStyle = `rgb(${30 + rnd() * 30 | 0},${g | 0},${25 + rnd() * 25 | 0})`;
    x.save(); x.translate(cx, cy); x.rotate(a); x.beginPath(); x.ellipse(0, 0, s * 0.55, s, 0, 0, 7); x.fill();
    x.strokeStyle = 'rgba(10,30,8,.5)'; x.lineWidth = 1; x.beginPath(); x.moveTo(0, -s); x.lineTo(0, s); x.stroke(); x.restore();
  }
  x.strokeStyle = 'rgba(40,60,20,.8)'; x.lineWidth = 2; for (let i = 0; i < 7; i++) { x.beginPath(); let px = 50 + i * 26; x.moveTo(px, 0); for (let y = 0; y < 512; y += 30) { px += (rnd() - 0.5) * 18; x.lineTo(px, y); } x.stroke(); }
}));
const texSign = mkTex(cvs(1024, 420, x => {
  x.fillStyle = '#141110'; x.fillRect(0, 0, 1024, 420);
  const g = x.createLinearGradient(0, 0, 0, 420); g.addColorStop(0, '#f6dc9c'); g.addColorStop(0.5, '#cf9f4e'); g.addColorStop(1, '#f1d08a');
  x.strokeStyle = g; x.lineWidth = 8; x.strokeRect(14, 14, 996, 392); x.lineWidth = 2; x.strokeRect(30, 30, 964, 360);
  x.fillStyle = g; x.textAlign = 'center'; x.font = '600 92px Georgia,"Times New Roman",serif';
  x.fillText('Stuttgart', 470, 160); x.fillText('Kıraathanesi', 470, 265);
  x.strokeStyle = g; x.lineWidth = 4; x.beginPath();
  x.moveTo(880, 330); x.lineTo(880, 120); x.moveTo(872, 330); x.lineTo(876, 140); x.moveTo(888, 330); x.lineTo(884, 140);
  x.rect(866, 112, 28, 22); x.moveTo(880, 112); x.lineTo(880, 60); x.stroke();
  x.lineWidth = 3; x.beginPath(); x.moveTo(60, 340);
  [[60, 340], [110, 340], [110, 318], [140, 318], [140, 300], [150, 290], [160, 300], [160, 318], [220, 318], [220, 296], [250, 296], [250, 270], [262, 250], [274, 270], [274, 296], [330, 296], [330, 322], [400, 322], [400, 306], [440, 290], [480, 306], [480, 322], [560, 322], [560, 300], [600, 300], [600, 280], [640, 280], [640, 312], [720, 312], [720, 296], [760, 296], [760, 330], [960, 330]].forEach(p => x.lineTo(p[0], p[1])); x.stroke();
}));
function nameTex(name, color = '#ffd894') {
  return mkTex(cvs(512, 128, x => {
    x.font = '600 54px -apple-system,Segoe UI,Roboto,sans-serif'; const w = Math.min(480, x.measureText(name).width + 50);
    x.fillStyle = 'rgba(14,10,8,.72)'; x.beginPath(); x.roundRect((512 - w) / 2, 22, w, 84, 30); x.fill();
    x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 256, 66);
  }));
}
const texGlow = mkTex(cvs(128, 128, x => { const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(255,220,160,1)'); g.addColorStop(0.25, 'rgba(255,190,110,.45)'); g.addColorStop(1, 'rgba(255,160,80,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); }));
const texBlob = mkTex(cvs(128, 128, x => { const g = x.createRadialGradient(64, 64, 6, 64, 64, 64); g.addColorStop(0, 'rgba(0,0,0,.55)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); }));
const texSmoke = mkTex(cvs(128, 128, x => { const g = x.createRadialGradient(64, 64, 4, 64, 64, 62); g.addColorStop(0, 'rgba(255,255,255,.55)'); g.addColorStop(0.5, 'rgba(255,255,255,.22)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); }));
const texTvIdle = mkTex(cvs(640, 360, x => {
  const g = x.createLinearGradient(0, 0, 640, 360); g.addColorStop(0, '#1b2440'); g.addColorStop(1, '#3a1420'); x.fillStyle = g; x.fillRect(0, 0, 640, 360);
  x.fillStyle = '#ffd894'; x.textAlign = 'center'; x.font = '700 52px Georgia,serif'; x.fillText('Gönül TV', 320, 160);
  x.fillStyle = 'rgba(255,255,255,.85)'; x.font = '500 30px -apple-system,Segoe UI,Roboto,sans-serif'; x.fillText('▶  ' + T('Dokun, video aç'), 320, 225);
}));
const texFelt = mkTex(cvs(256, 256, x => { x.fillStyle = '#0f6a43'; x.fillRect(0, 0, 256, 256); for (let i = 0; i < 9000; i++) { x.fillStyle = `rgba(${rnd() < 0.5 ? '0,0,0' : '255,255,255'},${rnd() * 0.05})`; x.fillRect(rnd() * 256, rnd() * 256, 1, 1); } }), 3, 5);
const texPoster = mkTex(cvs(512, 720, x => {
  const g = x.createLinearGradient(0, 0, 0, 720); g.addColorStop(0, '#f2a23a'); g.addColorStop(0.55, '#c8432c'); g.addColorStop(1, '#3a1322'); x.fillStyle = g; x.fillRect(0, 0, 512, 720);
  x.fillStyle = '#ffe7b0'; x.beginPath(); x.arc(256, 300, 110, 0, 7); x.fill();
  x.fillStyle = '#2a0f18'; x.beginPath(); x.moveTo(0, 520); [[60, 470], [110, 490], [150, 430], [200, 470], [250, 400], [300, 460], [350, 420], [400, 480], [460, 450], [512, 500], [512, 720], [0, 720]].forEach(p => x.lineTo(p[0], p[1])); x.fill();
  x.fillRect(318, 180, 8, 260); x.fillRect(310, 200, 24, 20); x.fillRect(150, 290, 6, 150);
  x.fillStyle = '#ffe7b0'; x.textAlign = 'center'; x.font = '700 64px Georgia,serif'; x.fillText('STUTTGART', 256, 100); x.font = 'italic 34px Georgia,serif'; x.fillText('gönlümün şehri', 256, 650);
}));

/* ============================================================ malzemeler */
const std = (o) => new THREE.MeshStandardMaterial(o);
const M = {
  wall: std({ map: texWall, roughness: 0.78, shadowSide: THREE.DoubleSide }),
  dark: std({ map: texDark, roughness: 0.7 }),
  ceil: std({ map: texCeil, roughness: 0.85, shadowSide: THREE.DoubleSide }),
  floor: std({ map: texFloor, roughness: 0.5 }), plank: std({ map: texPlank, roughness: 0.6 }),
  cloth: std({ map: texCloth, roughness: 0.92 }), cloth2: std({ map: texCloth2, roughness: 0.92 }),
  clothSide: std({ map: texClothSide, roughness: 0.92, side: THREE.DoubleSide }),
  chair: std({ color: 0x2c231c, roughness: 0.5 }), leather: std({ color: 0x141011, roughness: 0.38 }),
  brass: std({ color: 0xb48443, metalness: 0.85, roughness: 0.32 }), lampOut: std({ color: 0x2c2620, metalness: 0.6, roughness: 0.4, side: THREE.DoubleSide }),
  steel: std({ color: 0xe2e2e6, metalness: 1, roughness: 0.16 }), iron: std({ color: 0x1a1a1c, metalness: 0.7, roughness: 0.45 }),
  black: std({ color: 0x0b0b0c, roughness: 0.4 }), white: std({ color: 0xf2efe8, roughness: 0.6 }),
  glass: std({ color: 0xffffff, roughness: 0.04, metalness: 0.1, transparent: true, opacity: 0.32, depthWrite: false, side: THREE.DoubleSide }),
  tea: std({ color: 0x6e2208, roughness: 0.12, transparent: true, opacity: 0.86 }),
  leaf: std({ map: texLeaf, alphaTest: 0.45, side: THREE.DoubleSide, roughness: 0.8, transparent: false }),
  terra: std({ color: 0x8b4a2b, roughness: 0.9 }), tile: std({ color: 0xf1e8d2, roughness: 0.5 }),
  felt: std({ map: texFelt, roughness: 0.95 }), rail: std({ color: 0x3a1c0c, roughness: 0.42 }), pocket: std({ color: 0x050505, roughness: 0.9 }),
  kilim: std({ map: texRugs[1], roughness: 0.95 }), vinyl: std({ color: 0x0a0a0a, roughness: 0.25, metalness: 0.2 }),
  win: new THREE.MeshBasicMaterial({ color: 0xa8c4d8, transparent: true, opacity: 0.05, depthWrite: false })
};
M.bulb = new THREE.MeshStandardMaterial({ color: 0xffe0a8, emissive: 0xffc770, emissiveIntensity: 3 });
M.lampIn = new THREE.MeshStandardMaterial({ color: 0x3a2a1a, emissive: 0xffb860, emissiveIntensity: 0.7, side: THREE.BackSide });
M.ember = new THREE.MeshStandardMaterial({ color: 0x2a1006, emissive: 0xff5a14, emissiveIntensity: 2.2, roughness: 0.9 });

/* ============================================================ yardımcılar */
function box(w, h, d, mat, x, y, z, parent = scene, cast = true) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); m.castShadow = cast; m.receiveShadow = true; parent.add(m); return m; }
function mergeGeos(list) {
  const pos = [], nor = [], uv = [];
  for (const [g, mat4] of list) { const n = g.index ? g.toNonIndexed() : g; n.applyMatrix4(mat4); pos.push(...n.attributes.position.array); nor.push(...n.attributes.normal.array); uv.push(...n.attributes.uv.array); }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); out.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return out;
}
const mtx = (x, y, z, rx = 0, ry = 0, rz = 0) => new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(1, 1, 1));
function lathe(pts, seg = 20) { return new THREE.LatheGeometry(pts.map(p => new THREE.Vector2(p[0], p[1])), seg); }
const dyn = o => { o.userData.dyn = 1; return o; }; // birleştirilmeyecek (hareketli/etkileşimli)

/* ============================================================ oda A (ana salon) 17 × 15 m + oda B (yan oda) */
const XL = -8.5, XR = 8.5, ZB = -7.5, ZF = 7.5, H = 3.5, WIN0 = 0.95, WIN1 = 3.05, BWX = -3.2, RWZ = 4.5;
const DX0 = 4.9, DX1 = 6.7, DH = 2.6;               // iki oda arası kapı
const BX0 = 0.6, BX1 = 8.5, BZ0 = ZF, BZ1 = 15.0, H2 = 3.3; // yan oda
const W = 1.28;
function wallPlane(w, h, x, y, z, ry, mat = M.wall) {
  const g = uvScale(new THREE.PlaneGeometry(w, h), w / W, h / W); const m = new THREE.Mesh(g, mat);
  m.position.set(x, y, z); m.rotation.y = ry; m.receiveShadow = true; m.castShadow = true; scene.add(m); return m;
}
function floorPlane(x0, z0, x1, z1, y, mat, rep, ceil) {
  const w = x1 - x0, d = z1 - z0, g = uvScale(new THREE.PlaneGeometry(w, d), w / rep, d / rep), m = new THREE.Mesh(g, mat);
  m.rotation.x = ceil ? Math.PI / 2 : -Math.PI / 2; m.position.set((x0 + x1) / 2, y, (z0 + z1) / 2); m.receiveShadow = true; m.castShadow = !!ceil; scene.add(m); return m;
}
floorPlane(XL, ZB, XR, ZF, 0, M.floor, 2.2); floorPlane(XL, ZB, XR, ZF, H, M.ceil, 1.4, true);
floorPlane(BX0, BZ0, BX1, BZ1, 0.001, M.plank, 1.6); floorPlane(BX0, BZ0, BX1, BZ1, H2, M.ceil, 1.4, true);
floorPlane(DX0, ZF - 0.02, DX1, ZF + 0.02, 0.002, M.plank, 1.6);
// A duvarları
wallPlane(ZF - ZB, H, XL, H / 2, 0, Math.PI / 2);                                  // sol
wallPlane(DX0 - XL, H, (XL + DX0) / 2, H / 2, ZF, Math.PI);                        // ön, kapının solu
wallPlane(XR - DX1, H, (DX1 + XR) / 2, H / 2, ZF, Math.PI);                        // ön, kapının sağı
wallPlane(DX1 - DX0, H - DH, (DX0 + DX1) / 2, (H + DH) / 2, ZF, Math.PI);          // kapı üstü
wallPlane(BWX - XL, H, (XL + BWX) / 2, H / 2, ZB, 0);                              // arka sol (portre duvarı)
wallPlane(ZF - RWZ, H, XR, H / 2, (RWZ + ZF) / 2, -Math.PI / 2);                   // sağ ön
wallPlane(XR - BWX, WIN0, (BWX + XR) / 2, WIN0 / 2, ZB, 0); wallPlane(XR - BWX, H - WIN1, (BWX + XR) / 2, (H + WIN1) / 2, ZB, 0);
wallPlane(RWZ - ZB, WIN0, XR, WIN0 / 2, (ZB + RWZ) / 2, -Math.PI / 2); wallPlane(RWZ - ZB, H - WIN1, XR, (H + WIN1) / 2, (ZB + RWZ) / 2, -Math.PI / 2);
// B duvarları
wallPlane(BZ1 - BZ0, H2, BX0, H2 / 2, (BZ0 + BZ1) / 2, Math.PI / 2);
wallPlane(BZ1 - BZ0, H2, BX1, H2 / 2, (BZ0 + BZ1) / 2, -Math.PI / 2);
wallPlane(BX1 - BX0, H2, (BX0 + BX1) / 2, H2 / 2, BZ1, Math.PI);
wallPlane(DX0 - BX0, H2, (BX0 + DX0) / 2, H2 / 2, ZF, 0);
wallPlane(BX1 - DX1, H2, (DX1 + BX1) / 2, H2 / 2, ZF, 0);
wallPlane(DX1 - DX0, H2 - DH, (DX0 + DX1) / 2, (H2 + DH) / 2, ZF, 0);
// kapı kasası
for (const s of [DX0, DX1]) box(0.12, DH, 0.2, M.dark, s, DH / 2, ZF);
box(DX1 - DX0 + 0.24, 0.12, 0.2, M.dark, (DX0 + DX1) / 2, DH + 0.06, ZF);
// süpürgelik + çıta
for (const [w, x, z, ry] of [[ZF - ZB, XL + 0.02, 0, Math.PI / 2], [DX0 - XL, (XL + DX0) / 2, ZF - 0.02, 0], [XR - DX1, (DX1 + XR) / 2, ZF - 0.02, 0], [BWX - XL, (XL + BWX) / 2, ZB + 0.02, 0], [XR - BWX, (BWX + XR) / 2, ZB + 0.02, 0], [RWZ - ZB, XR - 0.02, (ZB + RWZ) / 2, Math.PI / 2], [ZF - RWZ, XR - 0.02, (RWZ + ZF) / 2, Math.PI / 2],
  [BZ1 - BZ0, BX0 + 0.02, (BZ0 + BZ1) / 2, Math.PI / 2], [BZ1 - BZ0, BX1 - 0.02, (BZ0 + BZ1) / 2, Math.PI / 2], [BX1 - BX0, (BX0 + BX1) / 2, BZ1 - 0.02, 0]]) {
  const b = box(w, 0.12, 0.03, M.dark, x, 0.06, z, scene, false); b.rotation.y = ry;
}
for (const [w, x, z, ry] of [[ZF - ZB, XL + 0.025, 0, Math.PI / 2], [DX0 - XL, (XL + DX0) / 2, ZF - 0.025, 0], [XR - DX1, (DX1 + XR) / 2, ZF - 0.025, 0], [BWX - XL, (XL + BWX) / 2, ZB + 0.025, 0], [ZF - RWZ, XR - 0.025, (RWZ + ZF) / 2, Math.PI / 2],
  [BZ1 - BZ0, BX0 + 0.025, (BZ0 + BZ1) / 2, Math.PI / 2], [BZ1 - BZ0, BX1 - 0.025, (BZ0 + BZ1) / 2, Math.PI / 2], [BX1 - BX0, (BX0 + BX1) / 2, BZ1 - 0.025, 0]]) {
  const b = box(w, 0.05, 0.05, M.dark, x, 1.02, z, scene, false); b.rotation.y = ry;
}
// pencereler
{
  box(XR - BWX, 0.05, 0.3, M.dark, (BWX + XR) / 2, WIN0, ZB + 0.12); box(0.3, 0.05, RWZ - ZB, M.dark, XR - 0.12, WIN0, (ZB + RWZ) / 2);
  for (let i = 0; i <= 6; i++) { const x = BWX + (XR - BWX) * i / 6; box(i === 0 || i === 6 ? 0.22 : 0.12, WIN1 - WIN0, 0.16, M.dark, x, (WIN0 + WIN1) / 2, ZB + 0.06); }
  for (let i = 0; i <= 6; i++) { const z = ZB + (RWZ - ZB) * i / 6; box(0.16, WIN1 - WIN0, i === 0 || i === 6 ? 0.22 : 0.12, M.dark, XR - 0.06, (WIN0 + WIN1) / 2, z); }
  box(XR - BWX, 0.08, 0.12, M.dark, (BWX + XR) / 2, 2.62, ZB + 0.06); box(0.12, 0.08, RWZ - ZB, M.dark, XR - 0.06, 2.62, (ZB + RWZ) / 2);
  box(XR - BWX, 0.1, 0.16, M.dark, (BWX + XR) / 2, WIN1, ZB + 0.06); box(0.16, 0.1, RWZ - ZB, M.dark, XR - 0.06, WIN1, (ZB + RWZ) / 2);
  const g1 = new THREE.Mesh(new THREE.PlaneGeometry(XR - BWX, WIN1 - WIN0), M.win); g1.position.set((BWX + XR) / 2, (WIN0 + WIN1) / 2, ZB + 0.02); scene.add(dyn(g1));
  const g2 = new THREE.Mesh(new THREE.PlaneGeometry(RWZ - ZB, WIN1 - WIN0), M.win); g2.position.set(XR - 0.02, (WIN0 + WIN1) / 2, (ZB + RWZ) / 2); g2.rotation.y = -Math.PI / 2; scene.add(dyn(g2));
}
// tavan kirişleri
for (let x = -7.2; x <= 7.3; x += 2.4) box(0.2, 0.26, ZF - ZB, M.dark, x, H - 0.13, 0, scene, false);
for (const z of [-5, -1.6, 1.8, 5.2]) box(XR - XL, 0.2, 0.18, M.dark, 0, H - 0.36, z, scene, false);
for (const z of [9.5, 12.5]) box(BX1 - BX0, 0.2, 0.18, M.dark, (BX0 + BX1) / 2, H2 - 0.1, z, scene, false);

/* ============================================================ manzara: gerçek fotoğraf (mevsim/saat) ya da piksel resim, silindir panorama */
const PR = 40;
const panoCanvas = document.createElement('canvas'); panoCanvas.width = 4096; panoCanvas.height = 820;
const panoTex = new THREE.CanvasTexture(panoCanvas); panoTex.colorSpace = THREE.SRGBColorSpace; panoTex.minFilter = THREE.LinearFilter; panoTex.generateMipmaps = false;
panoTex.wrapS = THREE.RepeatWrapping; panoTex.repeat.x = -1; panoTex.offset.x = 1;
const pano = new THREE.Mesh(new THREE.CylinderGeometry(PR, PR, 1, 96, 1, true, -0.15, 4.0), new THREE.MeshBasicMaterial({ map: panoTex, side: THREE.BackSide, toneMapped: false, fog: false }));
scene.add(dyn(pano));
const ground = new THREE.Mesh(new THREE.CircleGeometry(PR + 5, 48), new THREE.MeshBasicMaterial({ color: 0x1a1612, toneMapped: false })); ground.rotation.x = -Math.PI / 2; scene.add(dyn(ground));
let panoKey = '', skyCol = new THREE.Color(0x0d1220), panoGrade = '';
function avgColor(x, sx, sy, w, h) { const d = x.getImageData(sx, sy, w, h).data; let r = 0, g = 0, b = 0; for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; } const n = d.length / 4; return [r / n / 255, g / n / 255, b / n / 255]; }
function gradeCanvas(x, w, h, kind) { // kapalı hava: solgun, gri gökyüzü
  if (!kind) return;
  const im = x.getImageData(0, 0, w, h), d = im.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2], l = 0.3 * r + 0.59 * g + 0.11 * b, sky = (i / 4 / w) < h * 0.45 ? 1 : 0;
    const s = kind === 'snow' ? 0.35 : 0.55, k = kind === 'snow' ? 0.92 : 0.82;
    let nr = (l + (r - l) * s) * k, ng = (l + (g - l) * s) * k, nb = (l + (b - l) * s) * k;
    if (sky) { const t = 0.55; nr = nr * (1 - t) + (l * 0.9 + 70) * t; ng = ng * (1 - t) + (l * 0.9 + 72) * t; nb = nb * (1 - t) + (l * 0.9 + 78) * t; }
    d[i] = nr; d[i + 1] = ng; d[i + 2] = nb;
  }
  x.putImageData(im, 0, 0);
}
function buildPano(img, info) {
  const x = panoCanvas.getContext('2d'); x.clearRect(0, 0, 4096, 820);
  let H_, Y0, T0, TL;
  if (info.photo) {
    // [ayna][foto][ayna]: kuleler ortadaki kopyada, arka-sağ pencerelerden görünür
    // [ayna][foto][ayna][foto] = tam 360°; aynalı geçişler dikişsiz. Üst ve alt kenar yumuşakça uzatılır (pencereden bakınca kenar görünmez)
    const cw = 1280, ch = Math.round(cw * img.naturalHeight / img.naturalWidth), pt = 140, pb = 220, CH = ch + pt + pb;
    panoCanvas.width = cw * 4; panoCanvas.height = CH; x.imageSmoothingEnabled = true;
    for (let i = 0; i < 4; i++) { x.save(); if (i % 2 === 0) { x.translate(cw * (i + 1), 0); x.scale(-1, 1); x.drawImage(img, 0, pt, cw, ch); } else x.drawImage(img, cw * i, pt, cw, ch); x.restore(); }
    // aynalı kopyalarda kuleleri gökyüzüyle ört
    for (const fx_ of [0.357, 0.546]) for (const base of [cw - fx_ * cw, cw * 3 - fx_ * cw]) {
      const w_ = cw * 0.03, x0_ = base - w_ / 2, y0_ = pt + ch * 0.3, h_ = ch * 0.19;
      x.drawImage(panoCanvas, x0_ - w_ * 1.2, y0_, w_ * 0.5, h_, x0_, y0_, w_, h_);
    }
    // uzatmalar: kenar satırları küçültülüp yumuşakça büyütülür (çizgi çizgi olmaz)
    const sm = document.createElement('canvas'); sm.width = 96; sm.height = 2; const sx = sm.getContext('2d'); sx.imageSmoothingEnabled = true;
    sx.drawImage(panoCanvas, 0, pt + 2, cw * 4, 6, 0, 0, 96, 2); x.drawImage(sm, 0, 0, 96, 2, 0, 0, cw * 4, pt + 2);
    sx.clearRect(0, 0, 96, 2); sx.drawImage(panoCanvas, 0, pt + ch - 30, cw * 4, 28, 0, 0, 96, 2); x.drawImage(sm, 0, 0, 96, 2, 0, pt + ch - 2, cw * 4, pb + 2);
    const g_ = x.createLinearGradient(0, pt + ch, 0, CH); g_.addColorStop(0, 'rgba(0,0,0,0)'); g_.addColorStop(1, 'rgba(0,0,0,.45)'); x.fillStyle = g_; x.fillRect(0, pt + ch, cw * 4, pb);
    TL = Math.PI * 2; H_ = PR * (TL / 4) * CH / cw;
    const ridgePx = pt + 0.47 * ch, Ytop = 3.6 + ridgePx / CH * H_; Y0 = Ytop - H_; T0 = 2.75 - Math.PI / 4;
  } else {
    panoCanvas.height = 630; x.imageSmoothingEnabled = false;
    const sw = img.naturalWidth, sh = img.naturalHeight, chh = Math.round(sh * 630 / 941), cut = Math.round(sw * 0.742), rw = sw - cut;
    x.drawImage(img, 0, 0, sw, chh, 0, 0, 1672, 630);
    const k = 1672 / sw, seg = Math.round(rw * k);
    for (let i = 0; i < 3; i++) { const dx = 1672 + i * seg; x.save(); if (i % 2 === 0) { x.translate(dx + seg, 0); x.scale(-1, 1); x.drawImage(img, cut, 0, rw, chh, 0, 0, seg, 630); } else x.drawImage(img, cut, 0, rw, chh, dx, 0, seg, 630); x.restore(); }
    const used = 1672 + 3 * seg; TL = 4.0 * used / 2968; H_ = PR * TL * 630 / used; Y0 = -4.0; T0 = -0.15;
  }
  gradeCanvas(x, panoCanvas.width, panoCanvas.height, info.photo ? panoGrade : '');
  panoTex.dispose(); panoTex.image = panoCanvas; panoTex.magFilter = info.photo ? THREE.LinearFilter : THREE.NearestFilter; panoTex.needsUpdate = true;
  pano.geometry.dispose(); pano.geometry = new THREE.CylinderGeometry(PR, PR, H_, 96, 1, true, T0, TL);
  if (info.photo) { panoTex.repeat.x = -1; panoTex.offset.x = 1; } else { panoTex.repeat.x = -(1672 + 3 * Math.round((img.naturalWidth - Math.round(img.naturalWidth * 0.742)) * 1672 / img.naturalWidth)) / panoCanvas.width; panoTex.offset.x = -panoTex.repeat.x; }
  pano.position.y = Y0 + H_ / 2;
  const sc = avgColor(x, Math.round(panoCanvas.width * 0.3), 2, Math.round(panoCanvas.width * 0.4), 4); skyCol.setRGB(...sc, THREE.SRGBColorSpace); scene.background = skyCol;
  const gc = avgColor(x, Math.round(panoCanvas.width * 0.2), panoCanvas.height - 4, Math.round(panoCanvas.width * 0.6), 3); ground.material.color.setRGB(...gc, THREE.SRGBColorSpace);
  ground.position.y = Y0 + 0.05;
}
function loadPano(ph) {
  const info = viewFile(ph); panoGrade = info.photo && overcast() ? (snowing() ? 'snow' : 'grey') : '';
  const key = info.f + panoGrade; if (key === panoKey) return; panoKey = key;
  const im = new Image(); im.onload = () => { if (panoKey === key) buildPano(im, info); };
  im.onerror = () => { if (info.photo) { PANOS.delete(info.f.replace(/^pano-|\.webp$/g, '')); panoKey = ''; loadPano(ph); } };
  im.src = info.f;
}

/* ============================================================ masalar, sandalyeler */
const TABLES = [[-6.2, -5.3], [-2.4, -5.3], [1.0, -5.3], [4.3, -5.3], [7.2, -5.2], [-6.0, -2.0], [1.3, -2.3], [4.6, -2.1], [7.2, -1.8], [-5.6, 1.4], [7.2, 1.6], [-3.4, 4.9], [1.2, 4.6], [4.4, 4.0]];
const OKEY_T = 13;
const colliders = [];
const seats = [];
const chairMats = [];
const clothMeshes = [];
const chairFrame = mergeGeos([
  ...[[-0.19, -0.19], [0.19, -0.19], [-0.19, 0.19], [0.19, 0.19]].map(([x, z]) => [new THREE.BoxGeometry(0.036, 0.46, 0.036), mtx(x, 0.23, z)]),
  [new THREE.BoxGeometry(0.44, 0.035, 0.44), mtx(0, 0.47, 0)],
  [new THREE.BoxGeometry(0.036, 0.5, 0.036), mtx(-0.19, 0.72, -0.2, -0.08)], [new THREE.BoxGeometry(0.036, 0.5, 0.036), mtx(0.19, 0.72, -0.2, -0.08)],
  [new THREE.BoxGeometry(0.4, 0.02, 0.02), mtx(0, 0.14, -0.19)], [new THREE.BoxGeometry(0.4, 0.02, 0.02), mtx(0, 0.14, 0.19)], [new THREE.BoxGeometry(0.02, 0.02, 0.4), mtx(-0.19, 0.14, 0)], [new THREE.BoxGeometry(0.02, 0.02, 0.4), mtx(0.19, 0.14, 0)]
]);
const chairPad = mergeGeos([[new THREE.BoxGeometry(0.42, 0.05, 0.42), mtx(0, 0.51, 0.005)], [new THREE.BoxGeometry(0.38, 0.2, 0.04), mtx(0, 0.86, -0.215, -0.08)]]);
const clothTopG = new THREE.PlaneGeometry(1.24, 1.24).rotateX(-Math.PI / 2);
const clothSideG = new THREE.CylinderGeometry(0.877, 0.94, 0.3, 4, 1, true).rotateY(Math.PI / 4);
const tableGroups = [];
function teaGlass(parent, x, y, z, full = true) {
  const g = new THREE.Group(); g.position.set(x, y, z); dyn(g);
  const sau = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.045, 0.01, 20), M.white); sau.position.y = 0.005; g.add(sau);
  const gl = new THREE.Mesh(lathe([[0.001, 0.01], [0.026, 0.01], [0.03, 0.03], [0.022, 0.05], [0.024, 0.07], [0.033, 0.095], [0.034, 0.1]], 16), M.glass); g.add(gl);
  if (full) { const t = new THREE.Mesh(lathe([[0.001, 0.012], [0.024, 0.012], [0.028, 0.03], [0.02, 0.05], [0.022, 0.07], [0.029, 0.088], [0.001, 0.088]], 14), M.tea); g.add(t); g.userData.tea = t; }
  parent.add(g); return g;
}
TABLES.forEach(([tx, tz], ti) => {
  const g = new THREE.Group(); g.position.set(tx, 0, tz); g.rotation.y = ti === OKEY_T ? 0 : (rnd() - 0.5) * 0.08; scene.add(g); tableGroups.push(g);
  const top = new THREE.Mesh(clothTopG, ti === 6 || ti === 2 ? M.cloth2 : M.cloth); top.position.y = 0.785; top.receiveShadow = true; top.castShadow = true; g.add(dyn(top)); top.userData.table = ti; clothMeshes.push(top);
  const side = new THREE.Mesh(clothSideG, M.clothSide); side.position.y = 0.635; side.castShadow = true; side.receiveShadow = true; g.add(dyn(side)); side.userData.table = ti; clothMeshes.push(side);
  box(0.09, 0.48, 0.09, M.iron, 0, 0.24, 0, g); box(0.6, 0.03, 0.07, M.iron, 0, 0.015, 0, g, false); box(0.07, 0.03, 0.6, M.iron, 0, 0.015, 0, g, false);
  if (ti !== OKEY_T) { const ash = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.028, 18), M.steel); ash.position.set(0.12, 0.8, -0.1); g.add(ash); }
  const bl = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6), new THREE.MeshBasicMaterial({ map: texBlob, transparent: true, depthWrite: false })); bl.rotation.x = -Math.PI / 2; bl.position.y = 0.004; g.add(dyn(bl));
  colliders.push({ c: [tx, tz, 1.08] });
  [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(([dx, dz]) => {
    const ok = ti === OKEY_T, j = ok ? 0 : (rnd() - 0.5) * 0.12, d = ok ? 0.84 : 0.8 + rnd() * 0.08, ry = Math.atan2(-dx, -dz) + (ok ? 0 : (rnd() - 0.5) * 0.22);
    const lx = dx * d + j * dz, lz = dz * d + j * dx, wpos = new THREE.Vector3(lx, 0, lz).applyAxisAngle(new THREE.Vector3(0, 1, 0), g.rotation.y).add(g.position);
    const yaw = ry + g.rotation.y;
    seats.push({ id: seats.length, t: ti, x: wpos.x, z: wpos.z, yaw, okey: ok, npc: false, by: null, h: 0.5 });
    chairMats.push(mtx(wpos.x, 0, wpos.z, 0, yaw));
  });
  if (rnd() < 0.55 && ti !== OKEY_T) { const n = 1 + (rnd() * 2 | 0); for (let i = 0; i < n; i++) teaGlass(g, (rnd() - 0.5) * 0.7, 0.79, (rnd() - 0.5) * 0.7); }
});
// okey masasının küçük işareti (yaklaşınca parlar)
const okeyRing = new THREE.Mesh(new THREE.RingGeometry(1.35, 1.5, 48), new THREE.MeshBasicMaterial({ color: 0xffc56a, transparent: true, opacity: 0, depthWrite: false }));
okeyRing.rotation.x = -Math.PI / 2; okeyRing.position.y = 0.01; tableGroups[OKEY_T].add(dyn(okeyRing));
// bilardo odası taburesi/sedir koltukları (oturulabilir) sonradan eklenir
const chairIM = new THREE.InstancedMesh(chairFrame, M.chair, chairMats.length), padIM = new THREE.InstancedMesh(chairPad, M.leather, chairMats.length);
chairMats.forEach((m, i) => { chairIM.setMatrixAt(i, m); padIM.setMatrixAt(i, m); });
chairIM.castShadow = padIM.castShadow = true; chairIM.receiveShadow = padIM.receiveShadow = true; scene.add(dyn(chairIM), dyn(padIM));

/* ============================================================ halılar */
for (const [x, z, w, d, r, k] of [[-1.6, 0.9, 1.9, 4.4, 0.12, 0], [3.0, 1.2, 1.7, 4.6, -0.45, 1], [-3.6, 2.4, 1.6, 3.0, 0.95, 2], [2.6, 11.4, 2.2, 4.4, 0, 0]]) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), std({ map: texRugs[k], roughness: 0.97 })); m.rotation.x = -Math.PI / 2; m.rotation.z = r; m.position.set(x, 0.006 + k * 0.001, z); m.receiveShadow = true; scene.add(m);
}

/* ============================================================ lambalar + ışıklar (performans için az nokta ışık, çoğu sadece parlıyor) */
const lampPos = TABLES.map(([x, z]) => [x, z]).concat([[-1.6, 0.9], [3.0, 1.0], [-6.6, 5.5]]);
const lights = [], glows = [];
const domeG = new THREE.SphereGeometry(0.25, 20, 8, 0, Math.PI * 2, 0, Math.PI * 0.47), inG = new THREE.SphereGeometry(0.235, 16, 6, 0, Math.PI * 2, 0, Math.PI * 0.47);
function hangLamp(x, z, y = 2.6, top = H) {
  const g = new THREE.Group(); g.position.set(x, y, z); scene.add(g);
  const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, top - y - 0.15, 5), M.black); cord.position.y = (top - y) / 2 + 0.1; g.add(cord);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.045, 0.1, 10), M.brass); cap.position.y = 0.27; g.add(cap);
  const dome = new THREE.Mesh(domeG, M.lampOut); dome.position.y = 0.02; g.add(dome);
  const inn = new THREE.Mesh(inG, M.lampIn); inn.position.y = 0.02; g.add(inn);
  const b = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 8), M.bulb); g.add(b);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: texGlow, color: 0xffc070, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.7 })); sp.scale.set(0.9, 0.9, 1); sp.position.y = -0.04; g.add(dyn(sp)); glows.push(sp);
  return g;
}
lampPos.forEach(([x, z]) => hangLamp(x, z));
const LIGHT_AT = [1, 5, 6, 10, 12, 16];
for (const i of LIGHT_AT) { const [x, z] = lampPos[i]; const l = new THREE.PointLight(0xffb867, 7, 10, 1.3); l.position.set(x, 2.45, z); scene.add(l); lights.push(l); }
const hemi = new THREE.HemisphereLight(0x8a90b0, 0x2a160a, 0.35); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff0dc, 0); sun.position.set(14, 8, -12); sun.target.position.set(0, 0, 0); scene.add(sun, sun.target);
sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 1, far: 50 }); sun.shadow.bias = -0.0008; sun.shadow.normalBias = 0.03;
{
  const es = new THREE.Scene(); es.background = new THREE.Color(0x2a1a10);
  es.add(new THREE.Mesh(new THREE.BoxGeometry(20, 8, 20), new THREE.MeshBasicMaterial({ color: 0x3a2414, side: THREE.BackSide })));
  for (let i = 0; i < 6; i++) { const l = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffd9a0 })); l.position.set(-6 + i * 2.4, 3, (i % 2 ? -3 : 3)); es.add(l); }
  const w = new THREE.Mesh(new THREE.PlaneGeometry(16, 3), new THREE.MeshBasicMaterial({ color: 0x8090b0 })); w.position.set(0, 2, -9.9); es.add(w);
  const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(es, 0.04).texture; pm.dispose();
}
scene.environmentIntensity = 0.35;

/* ============================================================ çay ocağı + çaycı */
const COUNTER = [-7.6, 3.3, -6.55, 7.45];
const teaSpot = new THREE.Vector3(-6.9, 1.0, 5.2);
const teaObjs = [];
{
  const [x0, z0, x1, z1] = COUNTER, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  box(x1 - x0, 1.0, z1 - z0, M.wall, cx, 0.5, cz); box(x1 - x0 + 0.08, 0.05, z1 - z0 + 0.06, M.dark, cx, 1.025, cz);
  const run = new THREE.Mesh(uvScale(new THREE.PlaneGeometry(0.8, z1 - z0 - 0.2), 1, 3), std({ map: texCloth, roughness: 0.92 })); run.rotation.x = -Math.PI / 2; run.position.set(cx + 0.05, 1.052, cz); run.receiveShadow = true; scene.add(run);
  box(0.01, 0.22, z1 - z0 - 0.2, std({ map: texClothSide, roughness: 0.92 }), x1 + 0.045, 0.95, cz, scene, false);
  colliders.push({ b: [x0 - 0.2, z0, x1, z1] });
  const kettle = [[0.001, 0], [0.12, 0], [0.145, 0.03], [0.15, 0.12], [0.13, 0.2], [0.07, 0.235], [0.06, 0.25], [0.001, 0.25]];
  const pot = [[0.001, 0], [0.07, 0], [0.09, 0.04], [0.088, 0.1], [0.05, 0.13], [0.04, 0.14], [0.03, 0.15], [0.001, 0.16]];
  for (const [x, z] of [[-7.05, 6.6], [-7.05, 5.5], [-7.05, 4.3]]) {
    const g = new THREE.Group(); g.position.set(x, 1.055, z); scene.add(dyn(g));
    const k = new THREE.Mesh(lathe(kettle), M.steel); k.castShadow = true; g.add(k);
    const p = new THREE.Mesh(lathe(pot), M.steel); p.position.y = 0.25; p.castShadow = true; g.add(p);
    const h1 = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.01, 8, 20, Math.PI), M.steel); h1.position.y = 0.22; h1.rotation.y = Math.PI / 2; g.add(h1);
    const sp = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.016, 0.16, 8), M.steel); sp.position.set(0.12, 0.33, 0); sp.rotation.z = -0.9; g.add(sp);
    const h2 = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.008, 8, 16, Math.PI * 1.2), M.steel); h2.position.set(-0.09, 0.32, 0); h2.rotation.z = Math.PI / 2; g.add(h2);
    g.userData.tea = 1; teaObjs.push(g);
  }
  const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.015, 28), M.steel); tray.position.set(-6.95, 1.06, 3.8); scene.add(tray);
  for (let i = 0; i < 6; i++) teaGlass(scene, -6.95 + Math.cos(i) * 0.12, 1.068, 3.8 + Math.sin(i) * 0.12, false);
}

/* ============================================================ duvar süsleri */
function pframe(w, h, mat, pic, x, y, z, ry, depth = 0.05, matte = 0) {
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry; scene.add(g);
  const t = 0.07;
  box(w + 2 * t, t, depth, mat, 0, h / 2 + t / 2, 0, g, false); box(w + 2 * t, t, depth, mat, 0, -h / 2 - t / 2, 0, g, false);
  box(t, h, depth, mat, -w / 2 - t / 2, 0, 0, g, false); box(t, h, depth, mat, w / 2 + t / 2, 0, 0, g, false);
  if (matte) { const mt = new THREE.Mesh(new THREE.PlaneGeometry(w, h), M.white); mt.position.z = -0.005; g.add(mt); }
  const p = new THREE.Mesh(new THREE.PlaneGeometry(w - matte * 2, h - matte * 2), pic); p.position.z = 0.002; g.add(p);
  return g;
}
const texFoto = imgTex('kh-foto.webp'), texPortre = imgTex('kh-portre.webp');
pframe(1.45, 1.8, M.dark, std({ map: texFoto, roughness: 0.6 }), XL + 0.04, 2.3, 5.3, Math.PI / 2, 0.05, 0.08);
const portrait = pframe(1.0, 1.86, M.brass, std({ map: texPortre, roughness: 0.55 }), -5.9, 1.95, ZB + 0.04, 0, 0.06);
dyn(portrait).userData.portre = 1;
box(0.5, 0.025, 0.06, M.brass, -5.9, 3.05, ZB + 0.12, scene, false);
const fotoMat = std({ map: texFoto, roughness: 0.6, color: 0xe8dcc8 });
for (let c = 0; c < 2; c++) for (let r = 0; r < 5; r++) pframe(0.34, 0.26, M.black, fotoMat, -4.5 + c * 0.55, 2.75 - r * 0.42, ZB + 0.03, 0, 0.03, 0.03);
for (let c = 0; c < 2; c++) for (let r = 0; r < 3; r++) pframe(0.34, 0.26, M.black, fotoMat, -7.75 + c * 0.55, 2.55 - r * 0.42, ZB + 0.03, 0, 0.03, 0.03);
// kitaplık + sarmaşık
{
  const x0 = XL, x1 = XL + 0.4, z0 = -6.9, z1 = -4.2, h = 2.5, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  box(0.03, h, z1 - z0, M.dark, x0 + 0.015, h / 2, cz, scene, false);
  box(x1 - x0, h, 0.04, M.dark, cx, h / 2, z0); box(x1 - x0, h, 0.04, M.dark, cx, h / 2, z1);
  box(x1 - x0, 0.04, z1 - z0, M.dark, cx, h, cz);
  const books = [], cols = [0x6b1a1a, 0x1f3a2a, 0x22314f, 0x5a3a1a, 0xc9b88a, 0x7a2a12, 0x2a2a2a, 0x8a6a2a, 0x3a1a2a];
  [0.05, 0.5, 0.95, 1.4, 1.85].forEach((ly, li) => {
    box(x1 - x0, 0.03, z1 - z0, M.dark, cx, ly, cz, scene, false);
    if (li === 0) { box(0.02, 0.48, z1 - z0, M.dark, x1 - 0.01, 0.26, cz, scene, false); return; }
    let z = z0 + 0.05; while (z < z1 - 0.08) { const w = 0.025 + rnd() * 0.035, hh = 0.2 + rnd() * 0.12, d = 0.18 + rnd() * 0.08; books.push([cx + 0.04 - (0.24 - d) / 2, ly + 0.015 + hh / 2, z + w / 2, w, hh, d, cols[(rnd() * cols.length) | 0], rnd() < 0.08 ? 0.25 : 0]); z += w + 0.003; if (rnd() < 0.05) z += 0.12; }
  });
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), std({ roughness: 0.75 }), books.length), c = new THREE.Color();
  books.forEach(([x, y, z, w, hh, d, col, tilt], i) => { im.setMatrixAt(i, new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(tilt, 0, 0)), new THREE.Vector3(d, hh, w))); im.setColorAt(i, c.set(col).multiplyScalar(0.8 + rnd() * 0.4)); });
  im.castShadow = true; scene.add(dyn(im));
  colliders.push({ b: [x0, z0, x1 + 0.05, z1] });
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.16, 0.26, 16), M.terra); pot.position.set(XL + 0.3, 2.68, -3.85); scene.add(pot);
  for (const [z, y, h2, w2, ry] of [[-3.85, 1.8, 1.9, 0.75, Math.PI / 2], [-3.85, 1.85, 1.8, 0.6, Math.PI / 2 + 0.9], [-4.4, 2.6, 0.7, 1.2, Math.PI / 2], [-3.3, 2.0, 1.4, 0.5, 0.4]]) { const l = new THREE.Mesh(new THREE.PlaneGeometry(w2, h2), M.leaf); l.position.set(XL + 0.3, y, z); l.rotation.y = ry; scene.add(l); }
  for (const [z, ry] of [[-2.0, 0.3], [-1.2, -0.4]]) { const l = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 2.2), M.leaf); l.position.set(XL + 0.12, 2.3, z); l.rotation.y = Math.PI / 2 + ry; scene.add(l); }
  for (const [x, z, ry] of [[BWX + 0.35, ZB + 0.35, 0], [XR - 0.3, -1.5, Math.PI / 2], [XR - 0.3, 3.2, Math.PI / 2], [4.6, ZB + 0.3, 0]]) {
    const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.11, 0.18, 14), M.terra); p2.position.set(x, 3.1, z); scene.add(p2);
    const l = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 1.1), M.leaf); l.position.set(x, 2.6, z); l.rotation.y = ry; scene.add(l);
    const l2 = l.clone(); l2.rotation.y = ry + Math.PI / 2; scene.add(l2);
  }
}
// tabela
{
  const g = new THREE.Group(); g.position.set(1.4, 2.55, -1.6); scene.add(g);
  g.add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.66, 0.04), [M.dark, M.dark, M.dark, M.dark, std({ map: texSign, roughness: 0.5, metalness: 0.2 }), std({ map: texSign, roughness: 0.5, metalness: 0.2 })]));
  for (const s of [-0.6, 0.6]) { const ch = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, H - 2.55 - 0.33 - 0.35, 6), M.iron); ch.position.set(s, 0.33 + (H - 2.55 - 0.33 - 0.35) / 2, 0); g.add(ch); }
}

/* ============================================================ TV (ön duvar) */
const TV = { x: 0.9, y: 2.15, z: ZF - 0.05, w: 1.8, h: 1.0125 };
let tvHole, tvIdle, tvObj, tvEl;
{
  box(TV.w + 0.08, TV.h + 0.08, 0.05, M.black, TV.x, TV.y, ZF - 0.035);
  tvIdle = new THREE.Mesh(new THREE.PlaneGeometry(TV.w, TV.h), new THREE.MeshBasicMaterial({ map: texTvIdle, toneMapped: false })); tvIdle.position.set(TV.x, TV.y, TV.z - 0.012); tvIdle.rotation.y = Math.PI; scene.add(dyn(tvIdle));
  tvHole = new THREE.Mesh(new THREE.PlaneGeometry(TV.w, TV.h), new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: false, blending: THREE.NoBlending })); tvHole.position.copy(tvIdle.position); tvHole.rotation.y = Math.PI; tvHole.visible = false; scene.add(dyn(tvHole));
  tvIdle.userData.tv = tvHole.userData.tv = 1;
  box(0.2, 0.06, 0.25, M.iron, TV.x, TV.y - TV.h / 2 - 0.1, ZF - 0.13, scene, false);
  box(2.2, 0.5, 0.45, M.dark, TV.x, 0.25, ZF - 0.23); colliders.push({ b: [TV.x - 1.1, ZF - 0.46, TV.x + 1.1, ZF] });
  tvEl = document.createElement('div'); tvEl.style.cssText = 'width:1280px;height:720px;background:#000;overflow:hidden';
  tvObj = new CSS3DObject(tvEl); tvObj.position.copy(tvIdle.position); tvObj.rotation.y = Math.PI; tvObj.scale.setScalar(TV.w / 1280); cssScene.add(tvObj); tvObj.visible = false;
}

/* ============================================================ plak çalar (TV'nin solunda, dolap üstünde) */
const PLAK = { x: -2.2, z: ZF - 0.32 };
let plakDisc, plakArm, plakLabelTex, plakLabelCtx;
{
  const [px, pz] = [PLAK.x, PLAK.z];
  box(1.3, 0.78, 0.5, M.dark, px, 0.39, pz);                               // dolap
  for (let i = 0; i < 9; i++) box(0.012, 0.31, 0.3, std({ color: [0x7a1a1a, 0x1a3a5a, 0xc9a24a, 0x222222, 0x5a2a6a][i % 5], roughness: 0.6 }), px - 0.5 + i * 0.03, 0.24, pz + 0.02, scene, false); // plak kılıfları
  const base = box(0.48, 0.07, 0.38, std({ color: 0x3a2516, roughness: 0.45 }), px + 0.25, 0.815, pz, scene, true);
  box(0.46, 0.012, 0.36, M.iron, px + 0.25, 0.854, pz, scene, false);
  const plat = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.02, 40), M.iron); plat.position.set(px + 0.21, 0.865, pz); scene.add(plat);
  plakLabelCtx = document.createElement('canvas'); plakLabelCtx.width = plakLabelCtx.height = 256;
  plakLabelTex = new THREE.CanvasTexture(plakLabelCtx); plakLabelTex.colorSpace = THREE.SRGBColorSpace;
  const groove = mkTex(cvs(256, 256, x => { x.fillStyle = '#0b0b0b'; x.fillRect(0, 0, 256, 256); for (let r = 40; r < 126; r += 2) { x.strokeStyle = `rgba(255,255,255,${0.03 + (r % 6 === 0 ? 0.04 : 0)})`; x.beginPath(); x.arc(128, 128, r, 0, 7); x.stroke(); } }));
  plakDisc = new THREE.Group(); plakDisc.position.set(px + 0.21, 0.878, pz); scene.add(dyn(plakDisc));
  const vin = new THREE.Mesh(new THREE.CircleGeometry(0.15, 48), std({ map: groove, roughness: 0.25, metalness: 0.2 })); vin.rotation.x = -Math.PI / 2; plakDisc.add(vin);
  const lab = new THREE.Mesh(new THREE.CircleGeometry(0.05, 32), new THREE.MeshStandardMaterial({ map: plakLabelTex, roughness: 0.6 })); lab.rotation.x = -Math.PI / 2; lab.position.y = 0.001; plakDisc.add(lab);
  plakArm = new THREE.Group(); plakArm.position.set(px + 0.42, 0.88, pz - 0.13); scene.add(dyn(plakArm));
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.015, 0.04, 10), M.steel); plakArm.add(post);
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.22, 6), M.steel); arm.rotation.z = Math.PI / 2; arm.rotation.y = -0.6; arm.position.set(-0.09, 0.02, 0.06); plakArm.add(arm);
  [base, plat].forEach(m => dyn(m)); base.userData.plak = plat.userData.plak = vin.userData.plak = 1;
  colliders.push({ b: [px - 0.65, pz - 0.25, px + 0.65, ZF] });
  drawPlakLabel('Gönül Plak', '');
}
function drawPlakLabel(t, a) {
  const x = plakLabelCtx.getContext('2d'); x.fillStyle = '#b8282f'; x.fillRect(0, 0, 256, 256);
  x.fillStyle = '#f6e3b0'; x.textAlign = 'center'; x.font = '700 30px Georgia,serif'; x.fillText(String(t).slice(0, 16), 128, 110); x.font = '22px Georgia,serif'; x.fillText(String(a).slice(0, 20), 128, 150);
  x.fillStyle = '#111'; x.beginPath(); x.arc(128, 128, 8, 0, 7); x.fill(); plakLabelTex.needsUpdate = true;
}

/* ============================================================ yan oda: bilardo masası + nargile köşesi */
const POOL = { x: 4.7, z: 11.4, w: 1.42, l: 2.62 };
{
  const g = new THREE.Group(); g.position.set(POOL.x, 0, POOL.z); scene.add(g);
  const felt = new THREE.Mesh(new THREE.BoxGeometry(POOL.w - 0.2, 0.04, POOL.l - 0.2), M.felt); felt.position.y = 0.78; felt.receiveShadow = true; g.add(felt);
  for (const s of [-1, 1]) { box(0.12, 0.1, POOL.l, M.rail, s * (POOL.w / 2 - 0.06), 0.81, 0, g); box(POOL.w, 0.1, 0.12, M.rail, 0, 0.81, s * (POOL.l / 2 - 0.06), g); }
  box(POOL.w - 0.04, 0.2, POOL.l - 0.04, M.rail, 0, 0.66, 0, g);
  for (const sx of [-1, 1]) for (const sz of [-1, 0, 1]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.05, 16), M.pocket); p.position.set(sx * (POOL.w / 2 - 0.1), 0.8, sz * (POOL.l / 2 - 0.1)); g.add(p); }
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(0.14, 0.58, 0.14, M.rail, sx * (POOL.w / 2 - 0.16), 0.29, sz * (POOL.l / 2 - 0.2), g);
  const bc = [0xf2c014, 0x1a4fc8, 0xd2232c, 0x5a2a8a, 0xf07a14, 0x1a8a3a, 0x8a1a1a, 0x0a0a0a, 0xf2f2f2];
  bc.forEach((c, i) => { const b = new THREE.Mesh(new THREE.SphereGeometry(0.028, 16, 12), std({ color: c, roughness: 0.15 })); const row = i < 1 ? 0 : i < 3 ? 1 : i < 6 ? 2 : 3; b.position.set(((i < 1 ? 0 : i < 3 ? i - 1.5 : i < 6 ? i - 4 : i - 7) * 0.058) + (i === 8 ? 0 : 0), 0.828, -0.55 - row * 0.05 + (i === 8 ? 1.2 : 0)); b.castShadow = true; g.add(b); });
  const cue = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.014, 1.45, 8), std({ color: 0xc89a5a, roughness: 0.5 })); cue.rotation.z = Math.PI / 2; cue.rotation.y = 0.3; cue.position.set(0.1, 0.88, 0.75); g.add(cue);
  g.traverse(o => { if (o.isMesh) o.userData.pool = 1; }); dyn(g); g.userData.pool = 1;
  colliders.push({ b: [POOL.x - POOL.w / 2 - 0.05, POOL.z - POOL.l / 2 - 0.05, POOL.x + POOL.w / 2 + 0.05, POOL.z + POOL.l / 2 + 0.05] });
  // bilardo lambası
  const lg = new THREE.Group(); lg.position.set(POOL.x, 1.95, POOL.z); scene.add(lg);
  box(0.36, 0.14, 1.9, std({ color: 0x0f3b26, roughness: 0.5, metalness: 0.3 }), 0, 0, 0, lg, false);
  for (const z of [-0.6, 0, 0.6]) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 0.4), M.bulb); b.position.set(0, -0.075, z); lg.add(b); }
  for (const z of [-0.8, 0.8]) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, H2 - 1.95, 5), M.black); c.position.set(0, (H2 - 1.95) / 2, z); lg.add(c); }
  const pl = new THREE.PointLight(0xfff0d8, 6, 7, 1.3); pl.position.set(POOL.x, 1.8, POOL.z); scene.add(pl); lights.push(pl);
  // ıstaka rafı + afiş
  box(0.06, 1.2, 0.5, M.dark, BX1 - 0.05, 1.3, 9.0); for (let i = 0; i < 5; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.012, 1.45, 6), std({ color: 0xc89a5a, roughness: 0.5 })); c.position.set(BX1 - 0.09, 0.95, 8.8 + i * 0.1); c.rotation.z = 0.05; scene.add(c); }
  pframe(0.7, 0.98, M.black, std({ map: texPoster, roughness: 0.7 }), BX1 - 0.04, 1.8, 13.4, -Math.PI / 2, 0.03);
  // dart tahtası
  const dt = mkTex(cvs(256, 256, x => { for (let r = 120; r > 0; r -= 12) { for (let a = 0; a < 20; a++) { x.fillStyle = (a + r / 12) % 2 ? (r % 24 ? '#1a1a1a' : '#b52222') : (r % 24 ? '#efe2c0' : '#1f7a3a'); x.beginPath(); x.moveTo(128, 128); x.arc(128, 128, r, a / 20 * 6.283, (a + 1) / 20 * 6.283); x.fill(); } } x.fillStyle = '#b52222'; x.beginPath(); x.arc(128, 128, 8, 0, 7); x.fill(); }));
  const dart = new THREE.Mesh(new THREE.CircleGeometry(0.22, 40), std({ map: dt, roughness: 0.8 })); dart.position.set(2.4, 1.7, BZ1 - 0.03); dart.rotation.y = Math.PI; scene.add(dart);
}
// nargile köşesi: sedir + sini + nargileler
const SEDIR = { x0: BX0, x1: BX0 + 0.75, z0: 8.6, z1: 14.4 };
const NARG = [];
{
  const { x0, x1, z0, z1 } = SEDIR, cz = (z0 + z1) / 2;
  box(x1 - x0, 0.38, z1 - z0, M.dark, (x0 + x1) / 2, 0.19, cz);
  const cush = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0 - 0.04, 0.1, z1 - z0 - 0.04), M.kilim); cush.position.set((x0 + x1) / 2, 0.43, cz); cush.receiveShadow = true; scene.add(cush);
  for (let i = 0; i < 5; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.3, 0.95), M.kilim); b.position.set(x0 + 0.08, 0.62, z0 + 0.62 + i * 1.15); b.rotation.z = -0.22; scene.add(b); }
  const wk = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 1.3), M.kilim); wk.position.set(x0 + 0.02, 1.65, cz); wk.rotation.y = Math.PI / 2; scene.add(wk);
  hangLamp(x1 + 0.75, cz, 2.3, H2); const sl = new THREE.PointLight(0xffb867, 5, 6, 1.4); sl.position.set(x1 + 0.75, 2.1, cz); scene.add(sl); lights.push(sl);
  colliders.push({ b: [x0, z0, x1, z1] });
  // sini (alçak yuvarlak masa)
  const sini = new THREE.Group(); sini.position.set(x1 + 0.75, 0, cz); scene.add(sini);
  const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.03, 40), M.brass); tr.position.y = 0.42; sini.add(tr);
  const st = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.4, 8), M.dark); st.position.y = 0.2; sini.add(st);
  colliders.push({ c: [x1 + 0.75, cz, 0.7] });
  // oturma yerleri (sedire)
  for (const z of [cz - 1.4, cz, cz + 1.4]) seats.push({ id: seats.length, t: -1, x: x0 + 0.42, z, yaw: Math.PI / 2, okey: false, npc: false, by: null, h: 0.44, sedir: true });
  // nargileler
  for (const [dz, col] of [[-0.55, 0x2a7a5a], [0.55, 0x7a2a4a]]) NARG.push(makeNargile(x1 + 0.75, cz + dz, col));
}
function makeNargile(x, z, col) {
  const g = new THREE.Group(); g.position.set(x, 0.435, z); scene.add(dyn(g));
  const glassM = std({ color: col, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.55 });
  const vase = new THREE.Mesh(lathe([[0.001, 0], [0.07, 0], [0.11, 0.05], [0.12, 0.12], [0.09, 0.2], [0.035, 0.26], [0.03, 0.3]], 24), glassM); g.add(vase);
  const water = new THREE.Mesh(lathe([[0.001, 0.005], [0.07, 0.005], [0.105, 0.05], [0.11, 0.1], [0.001, 0.1]], 20), std({ color: 0x9ad0e8, transparent: true, opacity: 0.45, roughness: 0.1 })); g.add(water);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.02, 0.4, 10), M.brass); stem.position.y = 0.48; g.add(stem);
  for (const y of [0.36, 0.52, 0.62]) { const r = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.008, 6, 16), M.brass); r.rotation.x = Math.PI / 2; r.position.y = y; g.add(r); }
  const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.008, 24), M.brass); tray.position.y = 0.66; g.add(tray);
  const bowl = new THREE.Mesh(lathe([[0.001, 0], [0.03, 0], [0.045, 0.04], [0.05, 0.07], [0.001, 0.07]], 18), M.terra); bowl.position.y = 0.67; g.add(bowl);
  const foilC = document.createElement('canvas'); foilC.width = foilC.height = 128; const foilT = new THREE.CanvasTexture(foilC);
  const foil = new THREE.Mesh(new THREE.CircleGeometry(0.05, 24), std({ map: foilT, metalness: 0.9, roughness: 0.35 })); foil.rotation.x = -Math.PI / 2; foil.position.y = 0.741; g.add(foil);
  const coals = [];
  for (let i = 0; i < 3; i++) { const c = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.016, 0.022), M.ember); c.position.set(Math.cos(i * 2.1) * 0.024, 0.75, Math.sin(i * 2.1) * 0.024); c.visible = false; g.add(c); coals.push(c); }
  // hortum (eğri boru) + ağızlık
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0.02, 0.32, 0), new THREE.Vector3(0.18, 0.2, 0.05), new THREE.Vector3(0.3, 0.02, 0.15), new THREE.Vector3(0.25, 0.04, 0.3), new THREE.Vector3(0.12, 0.06, 0.32)]);
  const hose = new THREE.Mesh(new THREE.TubeGeometry(curve, 30, 0.011, 6), std({ color: 0x5a2a1a, roughness: 0.6 })); g.add(hose);
  const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.012, 0.1, 8), M.brass); tip.position.set(0.08, 0.06, 0.32); tip.rotation.z = Math.PI / 2; g.add(tip);
  g.traverse(o => { if (o.isMesh) o.userData.narg = NARG.length; });
  const n = { g, foil, foilC, foilT, coals, water, holes: [], flavor: null, lit: 0, holdT: 0 };
  drawFoil(n); return n;
}
function drawFoil(n) {
  const x = n.foilC.getContext('2d'); const g = x.createRadialGradient(54, 50, 4, 64, 64, 64); g.addColorStop(0, '#f4f4f6'); g.addColorStop(1, '#a8acb2'); x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 40; i++) { x.strokeStyle = `rgba(90,90,100,${Math.random() * 0.25})`; x.beginPath(); x.moveTo(Math.random() * 128, Math.random() * 128); x.lineTo(Math.random() * 128, Math.random() * 128); x.stroke(); }
  x.fillStyle = '#222'; for (const [u, v] of n.holes) { x.beginPath(); x.arc(u * 128, v * 128, 2.6, 0, 7); x.fill(); }
  n.foilT.needsUpdate = true;
}

/* ============================================================ kar */
const SNOW_N = 600;
const snowGeo = new THREE.BufferGeometry(), snowPos = new Float32Array(SNOW_N * 3);
function snowSpot(i, y) {
  if (rnd() < 0.55) { snowPos[i * 3] = -4 + rnd() * 24; snowPos[i * 3 + 2] = ZB - 0.6 - rnd() * 12; } else { snowPos[i * 3] = XR + 0.6 + rnd() * 12; snowPos[i * 3 + 2] = ZB - 0.6 + rnd() * (RWZ - ZB + 2); }
  snowPos[i * 3 + 1] = y == null ? -4 + rnd() * 12 : y;
}
for (let i = 0; i < SNOW_N; i++) snowSpot(i);
snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));
const snowTex = mkTex(cvs(32, 32, x => { const g = x.createRadialGradient(16, 16, 0, 16, 16, 16); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 32, 32); }));
const snow = new THREE.Points(snowGeo, new THREE.PointsMaterial({ size: 0.07, map: snowTex, transparent: true, depthWrite: false, color: 0xffffff, toneMapped: false }));
snow.visible = false; scene.add(dyn(snow));

/* ============================================================ duman (nargile) */
const smoke = [];
for (let i = 0; i < 110; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: texSmoke, transparent: true, depthWrite: false, opacity: 0 })); s.visible = false; scene.add(dyn(s)); smoke.push({ s, life: 0, v: new THREE.Vector3() }); }
let smokeI = 0;
function puff(x, y, z, dirx = 0, dirz = 0, n = 9, tint = 0xffffff, big = 1) {
  for (let i = 0; i < n; i++) {
    const p = smoke[smokeI++ % smoke.length]; p.life = 1; p.s.visible = true; p.s.position.set(x + (Math.random() - 0.5) * 0.03, y, z + (Math.random() - 0.5) * 0.03);
    p.v.set(dirx * (0.25 + Math.random() * 0.2) + (Math.random() - 0.5) * 0.08, 0.06 + Math.random() * 0.12, dirz * (0.25 + Math.random() * 0.2) + (Math.random() - 0.5) * 0.08);
    p.s.material.color.set(tint); p.delay = i * 0.045; p.big = big;
  }
}
function updateSmoke(dt) {
  for (const p of smoke) {
    if (p.life <= 0) continue;
    if (p.delay > 0) { p.delay -= dt; p.s.material.opacity = 0; continue; }
    p.life -= dt / 3.2; p.v.multiplyScalar(1 - dt * 0.9); p.v.y += dt * 0.03;
    p.s.position.addScaledVector(p.v, dt); const k = 1 - p.life, sc = (0.05 + k * 0.9) * (p.big || 1); p.s.scale.set(sc, sc, 1);
    p.s.material.opacity = Math.max(0, Math.min(0.48, p.life * 0.7) * (k < 0.08 ? k * 12 : 1));
    if (p.life <= 0) p.s.visible = false;
  }
}

/* ============================================================ insanlar: riglı 3D modeller (kh-av.js) */
const AVS = new Set();
setLoad(0.6, T('Kıraathane kuruluyor…'));
const matCache = new Map();
const pm = c => { let m = matCache.get(c); if (!m) { m = std({ color: c, roughness: 0.82 }); matCache.set(c, m); } return m; };
const BG = { torso: new THREE.BoxGeometry(0.4, 0.56, 0.22), vest: new THREE.BoxGeometry(0.42, 0.42, 0.24), thigh: new THREE.BoxGeometry(0.15, 0.46, 0.17), shin: new THREE.BoxGeometry(0.13, 0.42, 0.14), foot: new THREE.BoxGeometry(0.12, 0.06, 0.24), arm1: new THREE.BoxGeometry(0.1, 0.3, 0.11), arm2: new THREE.BoxGeometry(0.09, 0.27, 0.1), hand: new THREE.BoxGeometry(0.08, 0.09, 0.09), neck: new THREE.CylinderGeometry(0.05, 0.055, 0.08, 10), head: new THREE.SphereGeometry(0.12, 18, 14), hair: new THREE.SphereGeometry(0.126, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.45), hairLong: new THREE.SphereGeometry(0.13, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.7), eye: new THREE.SphereGeometry(0.014, 8, 6), must: new THREE.BoxGeometry(0.1, 0.025, 0.03), beard: new THREE.SphereGeometry(0.11, 14, 8, 0, Math.PI * 2, Math.PI * 0.55, Math.PI * 0.45), cap: new THREE.CylinderGeometry(0.125, 0.13, 0.07, 18), visor: new THREE.BoxGeometry(0.2, 0.012, 0.09), lens: new THREE.TorusGeometry(0.026, 0.005, 6, 16), curl: new THREE.SphereGeometry(0.04, 8, 6) };
function makePerson(o) {
  o = Object.assign({}, DEF_AV, o);
  const g = new THREE.Group(), skin = pm(o.skin);
  const hip = new THREE.Group(); hip.position.y = 0.92; g.add(hip);
  const torso = new THREE.Mesh(BG.torso, pm(o.shirt)); torso.position.y = 0.3; torso.castShadow = true; hip.add(torso);
  if (o.vest) { const v = new THREE.Mesh(BG.vest, pm(o.vest)); v.position.y = 0.33; hip.add(v); }
  const legs = [], arms = [];
  for (const s of [-1, 1]) {
    const th = new THREE.Group(); th.position.set(s * 0.1, 0, 0); hip.add(th);
    const t1 = new THREE.Mesh(BG.thigh, pm(o.pants)); t1.position.y = -0.23; t1.castShadow = true; th.add(t1);
    const kn = new THREE.Group(); kn.position.y = -0.46; th.add(kn);
    const s1 = new THREE.Mesh(BG.shin, pm(o.pants)); s1.position.y = -0.21; kn.add(s1);
    const ft = new THREE.Mesh(BG.foot, pm(0x15100c)); ft.position.set(0, -0.43, 0.05); kn.add(ft);
    legs.push({ th, kn });
    const sh = new THREE.Group(); sh.position.set(s * 0.26, 0.54, 0); hip.add(sh);
    const a1 = new THREE.Mesh(BG.arm1, pm(o.shirt)); a1.position.y = -0.15; sh.add(a1);
    const el = new THREE.Group(); el.position.y = -0.3; sh.add(el);
    const a2 = new THREE.Mesh(BG.arm2, pm(o.shirt)); a2.position.y = -0.13; el.add(a2);
    const hd = new THREE.Mesh(BG.hand, skin); hd.position.y = -0.3; el.add(hd);
    arms.push({ sh, el, hand: hd });
  }
  const head = new THREE.Group(); head.position.y = 0.6; hip.add(head);
  const nk = new THREE.Mesh(BG.neck, skin); nk.position.y = 0.03; head.add(nk);
  const hh = new THREE.Mesh(BG.head, skin); hh.scale.set(0.95, 1.12, 1); hh.position.y = 0.17; hh.castShadow = true; head.add(hh);
  if (o.hairStyle !== 1) {
    const hair = new THREE.Mesh(o.hairStyle === 2 ? BG.hairLong : BG.hair, pm(o.hair)); hair.scale.set(0.95, 1.12, 1.02); hair.position.set(0, o.hairStyle === 2 ? 0.16 : 0.18, -0.008); hair.rotation.x = o.hairStyle === 2 ? -0.35 : 0; head.add(hair);
    if (o.hairStyle === 3) for (let i = 0; i < 9; i++) { const c = new THREE.Mesh(BG.curl, pm(o.hair)); const a = i / 9 * Math.PI * 2; c.position.set(Math.cos(a) * 0.1, 0.26 + Math.sin(i * 1.7) * 0.02, Math.sin(a) * 0.1 - 0.01); head.add(c); }
  }
  if (o.cap) { const c = new THREE.Mesh(BG.cap, pm(o.cap)); c.position.y = 0.29; head.add(c); const v = new THREE.Mesh(BG.visor, pm(o.cap)); v.position.set(0, 0.26, 0.13); head.add(v); }
  if (o.mustache) { const mu = new THREE.Mesh(BG.must, pm(o.hair === 0x9a9a9a || o.hair === 0xb0b0b0 ? o.hair : 0x1a120c)); mu.position.set(0, 0.12, 0.115); head.add(mu); }
  if (o.beard) { const b = new THREE.Mesh(BG.beard, pm(o.hair)); b.scale.set(0.98, 1.05, 1.05); b.position.set(0, 0.17, 0.008); head.add(b); }
  for (const s of [-1, 1]) { const e = new THREE.Mesh(BG.eye, pm(0x120c08)); e.position.set(s * 0.04, 0.19, 0.11); head.add(e); if (o.glasses) { const l = new THREE.Mesh(BG.lens, pm(0x111111)); l.position.set(s * 0.042, 0.19, 0.118); head.add(l); } }
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8), new THREE.MeshBasicMaterial({ map: texBlob, transparent: true, depthWrite: false })); shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.005; g.add(shadow);
  // eldeki çay bardağı
  const cup = teaGlass(arms[1].hand, 0, -0.03, 0.05); cup.rotation.x = Math.PI / 2; cup.scale.setScalar(0.9); cup.visible = false;
  g.userData = { hip, legs, arms, head, shadow, cup, av: o, act: null, actT: 0 };
  // hafif animasyon kontrolü (yürüme / oturma / yudum / baş çevirme)
  let mode = 'idle', speed = 0, sitH = 0.5, ph = Math.random() * 6, act = null, actT = 0, actDur = 1400, yaw = 0;
  const u = g.userData;
  function apply(dt) {
    if (mode === 'sit') {
      u.hip.position.y = sitH; u.legs.forEach(l => { l.th.rotation.x = -Math.PI / 2 + 0.05; l.kn.rotation.x = Math.PI / 2 - 0.1; });
      u.arms.forEach(a => { a.sh.rotation.x = -0.55; a.sh.rotation.z = 0; a.el.rotation.x = -0.9; }); u.shadow.visible = false;
    } else {
      const amt = mode === 'walk' ? Math.min(1.3, speed / 1.45) : 0; if (amt) ph += dt * speed * 4.6;
      u.hip.position.y = 0.92 + Math.abs(Math.sin(ph)) * 0.025 * amt; u.shadow.visible = true;
      u.legs.forEach((l, i) => { const s = Math.sin(ph + i * Math.PI); l.th.rotation.x = s * 0.5 * amt; l.kn.rotation.x = Math.max(0, -Math.sin(ph + i * Math.PI + 1.2)) * 0.7 * amt; });
      u.arms.forEach((a, i) => { a.sh.rotation.x = -Math.sin(ph + i * Math.PI) * 0.4 * amt; a.sh.rotation.z = 0; a.el.rotation.x = -0.15 - 0.2 * amt; });
      if (u.cup.visible) { u.arms[1].sh.rotation.x = -0.35; u.arms[1].el.rotation.x = -1.2; }
      if (u.tray && u.tray.visible) { u.arms[1].sh.rotation.x = -0.5; u.arms[1].el.rotation.x = -1.3; }
    }
    u.head.rotation.y = yaw; u.head.rotation.x = 0;
    if (act) {
      const k = (performance.now() - actT) / actDur;
      if (k >= 1) act = null;
      else {
        const e = Math.sin(Math.min(1, k) * Math.PI);
        if (act === 'wave') { u.arms[1].sh.rotation.z = e * 2.4; u.arms[1].el.rotation.z = Math.sin(k * 22) * 0.35 * e; }
        else if (act === 'nod') u.head.rotation.x = Math.sin(k * Math.PI * 4) * 0.18 * e;
        else { u.arms[1].sh.rotation.x = -0.6 - e * 1.1; u.arms[1].el.rotation.x = -1.0 - e * 0.9; u.arms[1].sh.rotation.z = e * 0.25; u.head.rotation.x = act === 'sip' ? -e * 0.25 : -e * 0.1; }
      }
    }
  }
  const a = {
    cup: u.cup, look: o,
    get mode() { return mode; }, set headYaw(v) { yaw = v; }, get acting() { return !!act; },
    setMode(m, sp = 0, h = 0.5) { mode = m; speed = sp; sitH = h; apply(0); },
    act(name, dur) { act = name; actT = performance.now(); actDur = dur || (name === 'pull' ? 1800 : name === 'nod' ? 1200 : name === 'wave' ? 1600 : 1400); },
    update: apply, dispose() {}
  };
  u.a = a; u.look = o; apply(0);
  dyn(g); scene.add(g); AVS.add(g); return g;
}
function disposePerson(p) { scene.remove(p); AVS.delete(p); p.traverse(o => { if (o.material && o.material.map && o.material.map !== texBlob) o.material.map.dispose(); }); }
function pose(p, mode, t = 0, amt = 0, sitH = 0.5) {
  const a = p.userData.a; if (!a) return;
  if (mode === 'sit') { if (a.mode !== 'sit') a.setMode('sit', 0, sitH); }
  else if (amt > 0.12) { if (a.mode !== 'walk') a.setMode('walk', 1.45 * amt); else a.setMode('walk', 1.45 * amt + (amt > 1.6 ? 1 : 0)); }
  else if (a.mode !== 'idle') a.setMode('idle');
}
const avAct = (p, name) => { if (p && p.userData.a) p.userData.a.act(name); };
function nameSprite(p, name, color) {
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: nameTex(name, color), transparent: true, depthWrite: false, depthTest: false }));
  sp.scale.set(0.9, 0.225, 1); sp.position.y = 2.05; sp.renderOrder = 10; p.add(sp); p.userData.label = sp; return sp;
}
function bubble(p, text) {
  const u = p.userData; if (u.bub) { p.remove(u.bub); u.bub.material.map.dispose(); }
  const c = cvs(640, 150, x => { x.font = '600 46px -apple-system,Segoe UI,Roboto,sans-serif'; const w = Math.min(620, x.measureText(text).width + 60); x.fillStyle = '#fff'; x.beginPath(); x.roundRect((640 - w) / 2, 10, w, 100, 34); x.fill(); x.beginPath(); x.moveTo(300, 108); x.lineTo(320, 140); x.lineTo(340, 108); x.fill(); x.fillStyle = '#2a1810'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 320, 62); });
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: mkTex(c), transparent: true, depthWrite: false, depthTest: false })); sp.scale.set(1.2, 0.28, 1); sp.position.y = 2.35; sp.renderOrder = 11; p.add(sp); u.bub = sp; u.bubT = performance.now() + 4500;
}
function sitAt(p, seat) { p.position.set(seat.x, 0, seat.z); p.rotation.y = seat.yaw; pose(p, 'sit', 0, 0, seat.h || 0.5); }
// müdavimler
const NPCS = [];
function npc(o, seatIdx, extra) { const s = seats[seatIdx]; s.npc = true; const p = makePerson(o); sitAt(p, s); p.userData.npc = { ph: rnd() * 6, next: 4000 + rnd() * 9000 }; NPCS.push(p); if (extra) extra(p, s); return p; }
const seatOf = (t, k) => t * 4 + k;
npc({ shirt: 0x5a4a3a, vest: 0x2a2018, pants: 0x3a3028, mustache: 1, cap: 0x2a2a2a, hair: 0x9a9a9a }, seatOf(5, 2));
npc({ shirt: 0x8a8a90, pants: 0x2a2a30, mustache: 1, hair: 0xb0b0b0, glasses: 1 }, seatOf(5, 3));
{
  const g = tableGroups[5], tb = new THREE.Group(); tb.position.set(0, 0.8, 0); g.add(tb);
  box(0.36, 0.025, 0.5, M.dark, 0, 0.012, 0, tb, false); box(0.34, 0.006, 0.22, std({ color: 0xd9c08a, roughness: 0.7 }), 0, 0.027, -0.12, tb, false); box(0.34, 0.006, 0.22, std({ color: 0xd9c08a, roughness: 0.7 }), 0, 0.027, 0.12, tb, false);
  for (let i = 0; i < 14; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.008, 12), i % 2 ? M.white : M.black); c.position.set(-0.14 + (i % 7) * 0.045, 0.034, i < 7 ? -0.2 : 0.2); tb.add(c); }
}
npc({ shirt: 0x2a3a5a, pants: 0x222226, mustache: 1, hair: 0x2a1a10 }, seatOf(1, 1), (p) => {
  const cv = document.createElement('canvas'); cv.width = 256; cv.height = 184; const c = cv.getContext('2d');
  c.fillStyle = '#e4dccb'; c.fillRect(0, 0, 256, 184); c.fillStyle = '#1b1712'; c.font = 'bold 26px Georgia,serif'; c.textAlign = 'center'; c.fillText('GURBET POSTASI', 128, 30);
  c.fillRect(10, 38, 236, 2); c.font = 'bold 15px Georgia,serif'; c.fillText('Stuttgart\'ta kıraathane gecesi', 128, 58);
  c.fillStyle = '#7a7266'; c.fillRect(12, 68, 110, 64); c.fillStyle = '#4a443a';
  for (let y = 70; y < 178; y += 6) { if (y < 134) c.fillRect(130, y, 114, 2); else { c.fillRect(12, y, 110, 2); c.fillRect(130, y, 114, 2); } }
  const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 4;
  const np = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.32), std({ map: tx, roughness: 0.92, side: THREE.DoubleSide })); np.position.set(0, 1.0, 0.36); np.rotation.set(-0.35, 0, 0); p.add(np);
  teaGlass(tableGroups[1], 0.15, 0.79, -0.25);
});
npc({ shirt: 0x6a2020, vest: 0x1a1a1a, pants: 0x2a2a30, mustache: 1, hair: 0x6a6a6a }, seatOf(10, 2), p => { p.userData.cup.visible = true; });
npc({ shirt: 0x3a5a3a, pants: 0x30302a, hair: 0x1a120c, beard: 1 }, seatOf(8, 0), p => { p.userData.cup.visible = true; });
// çaycı
const CAYCI_HOME = { x: -8.05, z: 5.4 };
const cayci = makePerson({ shirt: 0xf2efe8, vest: 0x2a1a12, pants: 0x1a1a1e, mustache: 1, hair: 0x1a120c });
cayci.position.set(CAYCI_HOME.x, 0, CAYCI_HOME.z); cayci.rotation.y = Math.PI / 2; pose(cayci, 'walk', 0, 0);
const cayTray = new THREE.Group(); { const t = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.01, 20), M.steel); cayTray.add(t); const gl = teaGlass(cayTray, 0, 0.005, 0); gl.scale.setScalar(1.2); }
cayTray.position.set(0, -0.32, 0.18); cayci.userData.arms[1].el.add(cayTray); cayci.userData.tray = cayTray; cayTray.visible = false;
const orders = []; let cayJob = null;

/* ============================================================ yürünebilir alan + yol bulma */
const AREAS = [[XL, ZB, XR, ZF], [DX0 + 0.05, ZF - 0.5, DX1 - 0.05, ZF + 0.5], [BX0, BZ0, BX1, BZ1]];
const R_ME = 0.28;
function inside(x, z, r = R_ME) {
  return AREAS.some(([x0, z0, x1, z1], i) => i === 1 ? (x >= x0 + r && x <= x1 - r && z >= z0 && z <= z1) : (x >= x0 + r && x <= x1 - r && z >= z0 + r && z <= z1 - r));
}
function pushOut(p, r = R_ME) {
  for (const c of colliders) {
    if (c.c) { const dx = p.x - c.c[0], dz = p.z - c.c[1], d = Math.hypot(dx, dz), m = c.c[2] * 0.62 + r; if (d < m && d > 1e-4) { p.x = c.c[0] + dx / d * m; p.z = c.c[1] + dz / d * m; } }
    else { const [x0, z0, x1, z1] = c.b, cx = Math.max(x0, Math.min(x1, p.x)), cz = Math.max(z0, Math.min(z1, p.z)), dx = p.x - cx, dz = p.z - cz, d = Math.hypot(dx, dz); if (d < r) { if (d > 1e-4) { p.x = cx + dx / d * r; p.z = cz + dz / d * r; } else { p.x = x1 + r; } } }
  }
}
function moveWith(from, to) {   // duvardan kayarak hareket
  const p = { x: to.x, z: to.z }; pushOut(p);
  if (inside(p.x, p.z)) return p;
  const a = { x: to.x, z: from.z }; pushOut(a); if (inside(a.x, a.z)) return a;
  const b = { x: from.x, z: to.z }; pushOut(b); if (inside(b.x, b.z)) return b;
  return { x: from.x, z: from.z };
}
// A* ızgarası (çaycı ve dokun-git için)
const GS = 0.3, GX0 = XL, GZ0 = ZB, GW = Math.ceil((XR - XL) / GS), GH = Math.ceil((BZ1 - ZB) / GS);
let grid = null;
function buildGrid() {
  grid = new Uint8Array(GW * GH);
  for (let j = 0; j < GH; j++) for (let i = 0; i < GW; i++) {
    const x = GX0 + (i + 0.5) * GS, z = GZ0 + (j + 0.5) * GS, p = { x, z }; pushOut(p, 0.3);
    grid[j * GW + i] = inside(x, z, 0.3) && Math.hypot(p.x - x, p.z - z) < 0.01 ? 1 : 0;
  }
}
function findPath(fx, fz, tx, tz) {
  if (!grid) buildGrid();
  const cell = (x, z) => [Math.max(0, Math.min(GW - 1, ((x - GX0) / GS) | 0)), Math.max(0, Math.min(GH - 1, ((z - GZ0) / GS) | 0))];
  const near = (i, j) => { if (grid[j * GW + i]) return [i, j]; for (let r = 1; r < 6; r++) for (let dj = -r; dj <= r; dj++) for (let di = -r; di <= r; di++) { const a = i + di, b = j + dj; if (a >= 0 && b >= 0 && a < GW && b < GH && grid[b * GW + a]) return [a, b]; } return [i, j]; };
  const [si, sj] = near(...cell(fx, fz)), [ti, tj] = near(...cell(tx, tz));
  const N = GW * GH, gS = new Float32Array(N).fill(1e9), came = new Int32Array(N).fill(-1), open = [[0, si, sj]], closed = new Uint8Array(N);
  gS[sj * GW + si] = 0; let it = 0;
  while (open.length && it++ < 6000) {
    let bi = 0; for (let k = 1; k < open.length; k++) if (open[k][0] < open[bi][0]) bi = k;
    const [, i, j] = open.splice(bi, 1)[0], id = j * GW + i; if (closed[id]) continue; closed[id] = 1;
    if (i === ti && j === tj) break;
    for (const [di, dj, c] of [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, 1.41], [1, -1, 1.41], [-1, 1, 1.41], [-1, -1, 1.41]]) {
      const a = i + di, b = j + dj; if (a < 0 || b < 0 || a >= GW || b >= GH) continue; const nid = b * GW + a; if (!grid[nid] || closed[nid]) continue;
      if (di && dj && (!grid[j * GW + a] || !grid[b * GW + i])) continue;
      const ng = gS[id] + c; if (ng < gS[nid]) { gS[nid] = ng; came[nid] = id; open.push([ng + Math.hypot(a - ti, b - tj), a, b]); }
    }
  }
  const out = []; let id = tj * GW + ti; if (came[id] < 0 && id !== sj * GW + si) return [{ x: tx, z: tz }];
  while (id >= 0 && id !== sj * GW + si) { out.unshift({ x: GX0 + ((id % GW) + 0.5) * GS, z: GZ0 + (((id / GW) | 0) + 0.5) * GS }); id = came[id]; }
  // sadeleştir
  const sm = []; for (let k = 0; k < out.length; k++) if (k % 2 === 1 || k === out.length - 1) sm.push(out[k]);
  sm.push({ x: tx, z: tz }); return sm;
}

/* ============================================================ oyuncu */
const me = { x: -5.2, z: 6.0, yaw: 0, pitch: -0.06, seat: -1, eye: 1.62, tea: null, sips: 0, auto: null, path: null, watch: false, narg: -1, dj: false };
{ const dx = 3 - me.x, dz = -6.5 - me.z; me.yaw = Math.atan2(-dx, -dz); }
let meAv = null; function rebuildMe() { if (meAv) disposePerson(meAv); meAv = makePerson(P.av); meAv.visible = false; }
rebuildMe();
const handTea = (() => { const g = new THREE.Group(); teaGlass(g, 0, 0, 0); g.children[0].children[0].visible = false; g.position.set(0.24, -0.27, -0.5); g.scale.setScalar(1.05); g.visible = false; camera.add(g); return g; })();

/* ============================================================ okey */
const RING = [seatOf(OKEY_T, 0), seatOf(OKEY_T, 2), seatOf(OKEY_T, 1), seatOf(OKEY_T, 3)];
let NET = null; const others = new Map();
const okey = createOkey({
  THREE, scene, M, T, toast, esc, camera, seats, ring: RING, table: tableGroups[OKEY_T], makePerson, sitAt,
  standUp: () => standUp(), disposePerson, net: () => NET, netId: () => (NET ? NET.room.id : 'me'), myName: () => myName || T('Sen'), others: () => others,
  setCam: p => { me.x = p.x; me.eye = p.y; me.z = p.z; me.yaw = p.yaw; me.pitch = p.pitch; }
});

/* ============================================================ ortam: saat + hava → ışık */
const PH = {
  gece: { hemi: [0x5a6080, 0x2a160a, 0.32], sun: [0x8090c0, 0], env: 0.3, lamp: 1, exp: 1.05 },
  aksam: { hemi: [0x6a6a98, 0x2a160a, 0.4], sun: [0x9aa0d0, 0.15], env: 0.35, lamp: 1, exp: 1.05 },
  gunbatimi: { hemi: [0xffa070, 0x3a1e10, 0.55], sun: [0xff8a45, 2.6], env: 0.55, lamp: 0.85, exp: 1.0, pos: [16, 5, -11] },
  sabah: { hemi: [0xdfe2f4, 0x6a4a36, 1.2], sun: [0xffd2a0, 2.4], env: 0.9, lamp: 0.55, exp: 1.08, pos: [14, 9, -13] },
  gunduz: { hemi: [0xeaf0ff, 0x7a5a44, 1.6], sun: [0xfff2dc, 3.4], env: 1.3, lamp: 0.45, exp: 1.22, pos: [9, 13, -12] }
};
let curPh = '';
function applyEnv() {
  const ph = phaseNow(), o = PH[ph], oc = overcast();
  curPh = ph; loadPano(ph);
  hemi.color.set(o.hemi[0]); hemi.groundColor.set(o.hemi[1]); hemi.intensity = o.hemi[2] * (oc ? 0.85 : 1);
  sun.color.set(o.sun[0]); sun.intensity = o.sun[1] * (oc ? 0.2 : 1); if (o.pos) sun.position.set(...o.pos);
  sun.castShadow = !lowQ() && sun.intensity > 0.5;
  renderer.shadowMap.needsUpdate = true;
  scene.environmentIntensity = o.env * (oc ? 0.8 : 1);
  renderer.toneMappingExposure = o.exp;
  lights.forEach(l => { l.intensity = 7 * o.lamp; });
  M.bulb.emissiveIntensity = 3 * o.lamp; M.lampIn.emissiveIntensity = 0.7 * o.lamp; glows.forEach(g => g.material.opacity = 0.75 * o.lamp);
  M.win.opacity = ph === 'gece' || ph === 'aksam' ? 0.07 : 0.03;
  snow.visible = snowing();
  $('sub').textContent = subText();
}
setInterval(applyEnv, 60000);
const PH_N = { sabah: 'Sabah', gunduz: 'Gündüz', gunbatimi: 'Gün batımı', aksam: 'Akşam', gece: 'Gece' };
function subText() {
  const n = NET ? NET.room.peers.length : 0;
  return NET ? `${T('Online')} · ${NET.room.code} · ${n} ${T('kişi')}` : `${T(PH_N[curPh] || '')}${wx && wxCode() >= 0 ? ' · ' + wx.t + '°' : ''}${snowing() ? ' · ❄' : ''}`;
}

/* ============================================================ ekran boyutu (WebGL ve TV katmanı aynı ölçüde) */
let prCap = 1.5, prNow = 1.5, composer = null, bloom = null;
function makeComposer() {
  try {
    composer = new EffectComposer(renderer); composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(VW / 2, VH / 2), 0.32, 0.55, 0.82); composer.addPass(bloom);
    composer.addPass(new OutputPass());
  } catch (e) { composer = null; }
}
function resize() {
  const r = document.documentElement; VW = r.clientWidth || innerWidth; VH = r.clientHeight || innerHeight;
  prCap = Math.min(window.devicePixelRatio || 1, lowQ() ? 1 : 1.6); prNow = Math.min(prNow, prCap) || prCap;
  renderer.setPixelRatio(prNow); renderer.setSize(VW, VH, true); css.setSize(VW, VH);
  if (!composer && BLOOM && !lowQ()) makeComposer(); if (composer) { composer.setPixelRatio(prNow); composer.setSize(VW, VH); if (bloom) bloom.resolution.set(VW * prNow / 2, VH * prNow / 2); }
  camera.aspect = VW / VH; camera.fov = VW < VH ? 76 : 60; camera.updateProjectionMatrix();
  handTea.userData.x = Math.min(0.24, 0.5 * Math.tan(camera.fov * Math.PI / 360) * camera.aspect * 0.62); handTea.position.x = handTea.userData.x;
  okey.resize();
}
addEventListener('resize', resize);
if (window.visualViewport) visualViewport.addEventListener('resize', resize);

/* ============================================================ dokunma: sol joystick, sağ bakış, dokun-etkileş */
const tl = $('tl'), joyEl = $('joy'), knob = joyEl.firstElementChild;
const joy = { id: null, ox: 0, oy: 0, x: 0, y: 0 }, looks = new Map(), keys = {};
let lastInput = performance.now();
const freeWalk = () => me.seat < 0 && !me.watch && me.narg < 0;
tl.addEventListener('pointerdown', e => {
  lastInput = performance.now(); tvUnmuteOnTap(); audioUnlockTap();
  tl.setPointerCapture(e.pointerId);
  const leftSide = e.clientX < VW * 0.42 && e.clientY > VH * 0.3;
  if (leftSide && joy.id == null && freeWalk() && !okey.active) { joy.id = e.pointerId; joy.ox = e.clientX; joy.oy = e.clientY; joy.x = joy.y = 0; joyEl.hidden = false; joyEl.style.left = e.clientX + 'px'; joyEl.style.top = e.clientY + 'px'; knob.style.transform = ''; me.auto = null; me.path = null; hideHint(); return; }
  looks.set(e.pointerId, { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: performance.now() });
});
tl.addEventListener('pointermove', e => {
  lastInput = performance.now();
  if (e.pointerId === joy.id) {
    let dx = e.clientX - joy.ox, dy = e.clientY - joy.oy; const d = Math.hypot(dx, dy), R = 46; if (d > R) { dx *= R / d; dy *= R / d; }
    joy.x = dx / R; joy.y = dy / R; knob.style.transform = `translate(${dx}px,${dy}px)`; return;
  }
  const l = looks.get(e.pointerId); if (!l) return;
  if (okey.active || anim.on) { l.x = e.clientX; l.y = e.clientY; return; }
  const k = 0.0052 * (62 / camera.fov) ** 0.3;
  me.yaw -= (e.clientX - l.x) * k; me.pitch = Math.max(-1.25, Math.min(1.1, me.pitch - (e.clientY - l.y) * k)); l.x = e.clientX; l.y = e.clientY;
  if (Math.hypot(e.clientX - l.sx, e.clientY - l.sy) > 10) hideHint();
});
function endPtr(e) {
  if (e.pointerId === joy.id) { joy.id = null; joy.x = joy.y = 0; joyEl.hidden = true; return; }
  const l = looks.get(e.pointerId); looks.delete(e.pointerId);
  if (l && e.type === 'pointerup' && Math.hypot(e.clientX - l.sx, e.clientY - l.sy) < 10 && performance.now() - l.t < 450) tapAt(e.clientX, e.clientY);
}
tl.addEventListener('pointerup', endPtr); tl.addEventListener('pointercancel', endPtr);
addEventListener('keydown', e => { keys[e.code] = true; lastInput = performance.now(); if (e.code === 'KeyE' || e.code === 'Enter') doAct(); });
addEventListener('keyup', e => { keys[e.code] = false; });

const ray = new THREE.Raycaster(), v2 = new THREE.Vector2();
let tapList = null;
function tapTargets() {
  if (!tapList) { tapList = [chairIM, ...clothMeshes, tvIdle, tvHole, portrait, ...teaObjs]; scene.traverse(o => { if (o.isMesh && (o.userData.plak || o.userData.pool || o.userData.narg != null)) tapList.push(o); }); }
  return tapList;
}
function pick(cx, cy) {
  v2.set(cx / VW * 2 - 1, -(cy / VH) * 2 + 1); ray.setFromCamera(v2, camera); ray.far = 14;
  const hit = ray.intersectObjects(tapTargets(), true)[0]; if (!hit) return null;
  if (hit.object === chairIM) return { k: 'seat', s: seats[hit.instanceId], d: hit.distance };
  let o = hit.object; while (o && !(o.userData && (o.userData.tv || o.userData.tea || o.userData.portre || o.userData.table != null || o.userData.plak || o.userData.pool || o.userData.narg != null))) o = o.parent;
  if (!o) return null;
  const ud = o.userData;
  if (ud.tv) return { k: 'tv', d: hit.distance };
  if (ud.tea) return { k: 'tea', d: hit.distance };
  if (ud.portre) return { k: 'portre', d: hit.distance };
  if (ud.plak) return { k: 'plak', d: hit.distance };
  if (ud.pool) return { k: 'pool', d: hit.distance };
  if (ud.narg != null) return { k: 'narg', n: ud.narg, d: hit.distance, point: hit.point, obj: hit.object };
  if (ud.table != null) { const t = ud.table, free = seats.filter(s => s.t === t && !s.npc && !s.by && !s.bot).sort((a, b) => Math.hypot(a.x - me.x, a.z - me.z) - Math.hypot(b.x - me.x, b.z - me.z))[0]; return free ? { k: 'seat', s: free, d: hit.distance } : { k: 'full', d: hit.distance }; }
  return null;
}
function tapAt(cx, cy) {
  if (me.watch) return;
  if (okey.active) { okey.tap(cx, cy); return; }
  if (me.narg >= 0) { nargTap(cx, cy); return; }
  const h = pick(cx, cy); if (!h) return;
  if (h.k === 'portre') return toast('🖤 ' + T('Müslüm Baba bakıyor… Kader bu.'));
  if (h.k === 'full') return toast(T('Bu masa dolu'));
  if (h.k === 'seat') { if (h.s.npc || h.s.by || h.s.bot) return toast(T('Burası dolu')); if (me.seat >= 0) standUp(); return goTo(h.s.x, h.s.z, 1.0, () => sitDown(h.s)); }
  if (h.k === 'tv') { if (h.d > 5.5 && me.seat < 0) return goTo(TV.x, ZF - 2.4, 0.4, () => openTvPick()); return openTvPick(); }
  if (h.k === 'tea') { if (me.seat >= 0) return orderTea(); return goTo(teaSpot.x + 0.75, teaSpot.z, 0.7, takeTea); }
  if (h.k === 'plak') { if (h.d > 4 && me.seat < 0) return goTo(PLAK.x, ZF - 1.5, 0.5, openPlak); return openPlak(); }
  if (h.k === 'pool') { if (me.seat >= 0) standUp(); return goTo(POOL.x - 1.1, POOL.z + 0.6, 0.6, openPool); }
  if (h.k === 'narg') { const s = seats.find(s => s.sedir && !s.by && Math.abs(s.z - NARG[h.n].g.position.z) < 1.0) || seats.find(s => s.sedir && !s.by); if (!s) return toast(T('Sedir dolu')); if (me.seat >= 0) standUp(); return goTo(s.x + 0.6, s.z, 0.8, () => { sitDown(s); setTimeout(() => startNarg(h.n), 700); }); }
}
function goTo(x, z, r, done) { me.path = findPath(me.x, me.z, x, z); me.auto = { x, z, r, done, t0: performance.now() }; }

/* ============================================================ kamera: 1./3. şahıs */
const anim = { on: false };
function camTo(x, y, z, yaw, pitch, dur, done) { Object.assign(anim, { on: true, t0: performance.now(), dur, f: { x: me.x, y: me.eye, z: me.z, yaw: me.yaw, pitch: me.pitch }, to: { x, y, z, yaw, pitch }, done }); }
function clearSeg(x0, z0, x1, z1) {
  for (let i = 1; i <= 12; i++) { const t = i / 12, x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t; if (!inside(x, z, 0.12)) return false; }
  if ((z0 - ZF) * (z1 - ZF) < 0) { const t = (ZF - z0) / (z1 - z0), x = x0 + (x1 - x0) * t; if (x < DX0 + 0.1 || x > DX1 - 0.1) return false; }
  return true;
}
const third = () => P.cam === 3 && !okey.active && !me.watch && me.narg < 0;
const camPos = new THREE.Vector3();
function placeCamera(by) {
  let tp = false;
  if (third()) {
    const seated = me.seat >= 0, s = seated ? seats[me.seat] : null;
    const hx = seated ? s.x : me.x, hz = seated ? s.z : me.z, hy = seated ? 1.12 : 1.5;
    const orb = Math.max(0.08, Math.min(1.1, 0.32 - me.pitch)), want = seated ? 1.75 : 2.15;
    const fx = -Math.sin(me.yaw), fz = -Math.cos(me.yaw), rx = -fz, rz = fx, sh = 0.28; // omuz kayması (sağ)
    let d = want;
    const dMin = seated ? 1.25 : 1.3;
    for (; d >= dMin; d -= 0.1) { const h_ = d * Math.cos(orb); if (clearSeg(hx, hz, hx - fx * h_ + rx * sh, hz - fz * h_ + rz * sh)) break; }
    if (d >= dMin) {
      tp = true; const h_ = d * Math.cos(orb);
      camPos.set(hx - fx * h_ + rx * sh, hy + d * Math.sin(orb), hz - fz * h_ + rz * sh);
      camPos.y = Math.min(camPos.y, (me.z > ZF ? H2 : H) - 0.25);
      camera.position.lerp(camPos, camera.userData.tpOn ? 0.35 : 1); camera.userData.tpOn = 1;
      camera.lookAt(hx + rx * sh * 0.6 + fx * 0.6, hy + 0.05 - (orb - 0.32) * 0.4, hz + rz * sh * 0.6 + fz * 0.6);
      handTea.visible = false;
    }
  }
  if (!tp) {
    camera.userData.tpOn = 0;
    camera.position.set(me.x, me.eye + by, me.z); camera.rotation.set(me.pitch, me.yaw, 0);
    handTea.visible = me.tea === 1;
  }
  if (meAv) {
    meAv.visible = tp;
    if (meAv.visible) {
      if (me.seat >= 0) sitAt(meAv, seats[me.seat]); else { meAv.position.set(me.x, 0, me.z); meAv.rotation.y = me.yaw + Math.PI; }
      meAv.userData.cup.visible = me.tea === 1;
    }
  }
}

/* ============================================================ oturma / kalkma / çay */
function sitDown(s) {
  if (s.npc || s.by || s.bot) return toast(T('Burası dolu'));
  me.seat = s.id; s.by = 'me'; joy.id = null; joyEl.hidden = true;
  if (s.okey && okey.sit(s.id)) { const p = okey.camPose(); camTo(p.x, p.y, p.z, p.yaw, p.pitch, 700); sendState(true); ui(); return; }
  const yaw = s.yaw - Math.PI, fx = Math.sin(s.yaw) * 0.05, fz = Math.cos(s.yaw) * 0.05;
  let dy = yaw - me.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
  camTo(s.x + fx, s.sedir ? 1.12 : 1.2, s.z + fz, me.yaw + dy, -0.3, 600);
  if (me.tea && !s.sedir) placeTea(s);
  sendState(true); ui();
}
function standUp() {
  if (me.seat < 0) return;
  if (me.narg >= 0) endNarg();
  const s = seats[me.seat]; s.by = null; me.seat = -1;
  if (okey.active) okey.stand();
  const p = { x: s.x - Math.sin(s.yaw) * 0.6, z: s.z - Math.cos(s.yaw) * 0.6 }; pushOut(p); if (!inside(p.x, p.z)) { p.x = s.x; p.z = s.z; }
  camTo(p.x, 1.62, p.z, s.yaw - Math.PI, -0.06, 450);
  sendState(true); ui();
}
let tableTea = null;
function takeTea() {
  if (me.tea) return toast(T('Çayın zaten elinde'));
  me.tea = 1; me.sips = 0; const t = handTea.children[0].userData.tea; if (t) { t.visible = true; t.scale.y = 1; }
  toast('🍵 ' + T('Çayın taze, buyur')); sendState(true); ui();
}
function placeTea(s) {
  if (tableTea) tableTea.parent.remove(tableTea);
  if (s.t < 0) return;
  const g = tableGroups[s.t], local = new THREE.Vector3(s.x, 0.79, s.z).sub(g.position).applyAxisAngle(new THREE.Vector3(0, 1, 0), -g.rotation.y).multiplyScalar(0.52);
  tableTea = teaGlass(g, local.x + 0.12, 0.79, local.z); if (me.sips >= 3) tableTea.userData.tea.visible = false; me.tea = 2; sendState(true);
}
let sipAnim = 0;
function sip() {
  if (!me.tea) return; me.sips++;
  const t = me.tea === 2 && tableTea ? tableTea : handTea.children[0];
  if (me.sips >= 3) { toast('🍵 ' + T('Çay bitti. Bir tane daha?')); if (t.userData.tea) t.userData.tea.visible = false; setTimeout(() => { if (tableTea) { tableTea.parent.remove(tableTea); tableTea = null; } me.tea = null; sendState(true); ui(); }, 1500); }
  else { if (t.userData.tea) t.userData.tea.scale.y = 1 - me.sips * 0.3; toast(me.sips === 1 ? T('Oh, tavşan kanı…') : T('Bir yudum daha')); }
  sipAnim = performance.now(); avAct(meAv, 'sip');
  if (NET) NET.room.send('x', { a: 'sip' }); ui();
}
// çaycı: oturduğun masaya çay getirir
function orderTea(seatId = me.seat, broadcast = true) {
  if (seatId < 0) return;
  if (seatId === me.seat) { if (me.tea === 2 && me.sips < 3) return toast(T('Çayın masada duruyor')); toast('🧑‍🍳 ' + T('Çaycı: Hemen geliyor abi!')); }
  orders.push(seatId); if (broadcast && NET) NET.room.send('x', { a: 'order', s: seatId });
}
function cayciUpdate(now, dt) {
  if (!cayJob && orders.length) {
    const s = seats[orders.shift()]; if (!s) return;
    const tx = s.x - Math.sin(s.yaw + 0.9) * 0.55, tz = s.z - Math.cos(s.yaw + 0.9) * 0.55;
    cayJob = { s, path: findPath(cayci.position.x, cayci.position.z, tx, tz), phase: 'go', ph: 0 }; cayTray.visible = true;
  }
  if (!cayJob) { cayci.userData.a.headYaw = Math.sin(now / 2600) * 0.4; return; }
  const j = cayJob, wp = j.path[0];
  if (j.phase === 'serve') {
    if (now > j.until) { j.phase = 'back'; j.path = findPath(cayci.position.x, cayci.position.z, CAYCI_HOME.x, CAYCI_HOME.z); cayTray.visible = false; }
    return;
  }
  if (!wp) {
    if (j.phase === 'go') {
      j.phase = 'serve'; j.until = now + 900;
      const s = j.s; cayci.rotation.y = Math.atan2(s.x - cayci.position.x, s.z - cayci.position.z);
      if (s.id === me.seat) { me.tea = 1; me.sips = 0; placeTea(s); toast('🍵 ' + T('Afiyet olsun!')); ui(); }
      else if (s.t >= 0) { const g = tableGroups[s.t]; const l = new THREE.Vector3(s.x, 0.79, s.z).sub(g.position).multiplyScalar(0.52); teaGlass(g, l.x + 0.1, 0.79, l.z); }
      pose(cayci, 'walk', 0, 0); return;
    }
    cayJob = null; cayci.rotation.y = Math.PI / 2; pose(cayci, 'walk', 0, 0); return;
  }
  const dx = wp.x - cayci.position.x, dz = wp.z - cayci.position.z, d = Math.hypot(dx, dz), sp = 1.5 * dt;
  if (d < 0.08) { j.path.shift(); return; }
  cayci.position.x += dx / d * Math.min(sp, d); cayci.position.z += dz / d * Math.min(sp, d);
  const ty = Math.atan2(dx, dz); let dy = ty - cayci.rotation.y; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); cayci.rotation.y += dy * Math.min(1, dt * 8);
  j.ph += sp * 4.2; pose(cayci, 'walk', j.ph, 1);
}

/* ============================================================ bağlam düğmesi */
let ctx = null;
function nearestCtx() {
  if (me.watch || okey.active || me.narg >= 0) return null;
  if (me.seat >= 0) { const s = seats[me.seat]; if (s.sedir) return { k: 'narg', l: '💨 ' + T('Nargile') }; return { k: 'order', l: '🍵 ' + T('Çay söyle') }; }
  const fx = -Math.sin(me.yaw), fz = -Math.cos(me.yaw);
  let best = null, bs = 0;
  for (const s of seats) {
    if (s.npc || s.by || s.bot) continue; const dx = s.x - me.x, dz = s.z - me.z, d = Math.hypot(dx, dz); if (d > 1.35) continue;
    const dot = (dx * fx + dz * fz) / (d || 1), sc = (1.4 - d) + dot * 0.5; if (dot > -0.2 && sc > bs) { bs = sc; best = { k: 'seat', s, p: [s.x, 1.05, s.z], l: s.okey ? '🀄 ' + T('Okey oyna') : s.sedir ? '💨 ' + T('Sedire otur') : '🪑 ' + T('Otur') }; }
  }
  let y_ = 1.2; const look = (x, z, maxD, minDot, k, l, base) => { const dx = x - me.x, dz = z - me.z, d = Math.hypot(dx, dz), dot = (dx * fx + dz * fz) / (d || 1); if (d < maxD && dot > minDot) { const sc = base + dot; if (sc > bs) { bs = sc; best = { k, l, p: [x, y_, z] }; } } };
  y_ = TV.y + 0.62; look(TV.x, TV.z, 5, 0.8, 'tv', '📺 ' + T('TV'), 1); y_ = 1.5;
  if (!me.tea) look(teaSpot.x, teaSpot.z, 2.1, 0.3, 'tea', '🍵 ' + T('Çay al'), 1.6);
  y_ = 1.1; look(PLAK.x, PLAK.z, 2.4, 0.5, 'plak', '🎵 ' + T('Plak çalar'), 1.5);
  y_ = 1.15; look(POOL.x, POOL.z, 2.4, 0.3, 'pool', '🎱 ' + T('Bilardo oyna'), 1.7);
  return best;
}
const actEl = $('act'), act2 = $('act2'), sipBtn = $('sip');
function ui() {
  ctx = nearestCtx();
  const l = ctx ? ctx.l : '', sp_ = l.indexOf(' '), ico = sp_ > 0 ? l.slice(0, sp_) : '●', txt = sp_ > 0 ? l.slice(sp_ + 1) : l;
  const ah = `<i>${ico}</i><span>${esc(txt)}</span>`;
  if (actEl.innerHTML !== ah) actEl.innerHTML = ah; actEl.hidden = !ctx; actEl.classList.toggle('pulse', !!ctx && ctx.k === 'seat' && !!ctx.s.okey);
  const wpEl = $('wp'); wpEl.hidden = !(ctx && ctx.p); if (ctx && ctx.p) { wpEl.querySelector('i').textContent = ico; const s_ = wpEl.querySelector('span'); if (s_.textContent !== txt) s_.textContent = txt; wpPos = ctx.p; }
  const a2 = me.watch || okey.active || me.narg >= 0 ? '' : me.seat >= 0 ? '<i>⬆</i><span>' + esc(T('Kalk')) + '</span>' : me.tea ? '<i>🍵</i><span>' + esc(T('Yudumla')) + '</span>' : '';
  if (act2.innerHTML !== a2) act2.innerHTML = a2;
  act2.hidden = !act2.innerHTML;
  sipBtn.hidden = !(me.tea && me.seat >= 0 && !me.watch && !okey.active);
  $('say').hidden = !NET || me.watch;
  $('bnet').classList.toggle('on', !!NET);
  $('bcam').classList.toggle('on', P.cam === 3);
  $('sub').textContent = subText();
  document.body.classList.toggle('okey', okey.active);
  document.body.classList.toggle('tp', !!camera.userData.tpOn);
}
let wpPos = null; const _wv = new THREE.Vector3();
function placeWp() { const el = $('wp'); if (el.hidden || !wpPos) return; _wv.set(...wpPos).project(camera); if (_wv.z > 1 || Math.abs(_wv.x) > 1.1 || Math.abs(_wv.y) > 1.1) { el.style.opacity = 0; return; } el.style.opacity = 1; el.style.transform = `translate(${(_wv.x + 1) / 2 * VW}px,${(1 - _wv.y) / 2 * VH - 8}px) translate(-50%,-100%)`; }
function doAct() {
  if (!ctx) return;
  if (ctx.k === 'seat') sitDown(ctx.s);
  else if (ctx.k === 'tv') openTvPick();
  else if (ctx.k === 'tea') takeTea();
  else if (ctx.k === 'order') orderTea();
  else if (ctx.k === 'plak') openPlak();
  else if (ctx.k === 'pool') openPool();
  else if (ctx.k === 'narg') { const s = seats[me.seat]; const n = NARG.reduce((b, n, i) => Math.abs(n.g.position.z - s.z) < Math.abs(NARG[b].g.position.z - s.z) ? i : b, 0); startNarg(n); }
}
actEl.onclick = doAct;
act2.onclick = () => { if (me.seat >= 0) standUp(); else if (me.tea) sip(); };
sipBtn.onclick = () => sip();
$('bcam').onclick = () => { P.cam = P.cam === 3 ? 1 : 3; save(); ui(); toast(P.cam === 3 ? T('3. şahıs kamera') : T('1. şahıs kamera')); };
$('bav').onclick = () => openAvatar();

/* ============================================================ TV: YouTube arama + oynatma (3D ekranda) */
let tvId = '', tvTitle = '';
function ytId(s) {
  s = String(s || '').trim(); if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/); return m ? m[1] : '';
}
// YouTube oynatıcı API'si: odadaki herkes aynı saniyede izler. Son dokunan (aç/durdur/sar) TV'nin sahibidir, 4 sn'de bir zamanı yayar.
let ytApi = null, ytP = null, tvOwner = null, tvSup = 0, tvWant = null, tvMuted = false;
function loadYtApi() {
  if (ytApi) return ytApi;
  ytApi = new Promise(res => { if (window.YT && window.YT.Player) return res(window.YT); window.onYouTubeIframeAPIReady = () => res(window.YT); const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; s.onerror = () => res(null); document.head.appendChild(s); });
  return ytApi;
}
const ytTime = () => { try { return ytP && ytP.getCurrentTime ? ytP.getCurrentTime() || 0 : 0; } catch (e) { return 0; } };
const ytPlaying = () => { try { return ytP && ytP.getPlayerState && ytP.getPlayerState() === 1; } catch (e) { return false; } };
const myNetId = () => (NET ? NET.room.id : 'me');
function tvState() { return { id: tvId, n: tvTitle, t: +ytTime().toFixed(2), p: ytPlaying() || (tvWant ? tvWant.p : true), o: myNetId() }; }
function tvBroadcast(force) { if (!NET || !tvId) return; if (!force && tvOwner !== myNetId()) return; NET.room.send('tv', tvState()); }
async function setVideo(id, share = true, title = '', start = 0, playing = true) {
  const changed = id !== tvId; tvId = id || ''; tvTitle = title || tvTitle || '';
  if (!tvId) { try { ytP && ytP.destroy(); } catch (e) {} ytP = null; tvEl.innerHTML = ''; tvObj.visible = false; tvHole.visible = false; tvIdle.visible = true; if (share && NET) NET.room.send('tv', { id: '', o: myNetId() }); exitWatch(); return; }
  if (share) tvOwner = myNetId();
  tvWant = { t: start, p: playing, at: performance.now() };
  tvObj.visible = true; tvHole.visible = true; tvIdle.visible = false;
  if (changed || !ytP) {
    try { ytP && ytP.destroy(); } catch (e) {} ytP = null;
    tvEl.innerHTML = '<div id="ytbox" style="width:1280px;height:720px"></div>';
    const YT = await loadYtApi();
    if (!YT) { tvEl.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${tvId}?autoplay=1&playsinline=1&rel=0&start=${Math.floor(start)}" style="width:1280px;height:720px;border:0" allow="autoplay; encrypted-media"></iframe>`; }
    else {
      tvSup = performance.now() + 2500;
      ytP = new YT.Player('ytbox', { width: 1280, height: 720, videoId: tvId, host: 'https://www.youtube-nocookie.com',
        playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1, iv_load_policy: 3, start: Math.floor(start) },
        events: {
          onReady: e => { tvSup = performance.now() + 1500; const w = tvWant; if (w) { const t = w.t + (w.p ? (performance.now() - w.at) / 1000 : 0); if (t > 1) e.target.seekTo(t, true); w.p ? e.target.playVideo() : e.target.pauseVideo(); }
            setTimeout(() => { if (tvWant && tvWant.p && !ytPlaying() && ytP) { try { ytP.mute(); ytP.playVideo(); tvMuted = true; toast('🔇 ' + T('TV sessiz başladı. Sesi açmak için ekrana dokun')); } catch (er) {} } }, 1800); },
          onStateChange: e => {
            if (performance.now() < tvSup) return;
            if (e.data === 1 || e.data === 2) { tvOwner = myNetId(); tvWant = { t: ytTime(), p: e.data === 1, at: performance.now() }; tvBroadcast(true); }
          }
        } });
    }
  } else if (ytP && ytP.seekTo) {
    tvSup = performance.now() + 1500;
    if (Math.abs(ytTime() - start) > 1.5) ytP.seekTo(start, true);
    playing ? ytP.playVideo() : ytP.pauseVideo();
  }
  if (share && NET) NET.room.send('tv', { id: tvId, n: tvTitle, t: start, p: playing, o: myNetId() });
  if (changed) { P.tv = [{ id: tvId, n: tvTitle || tvId }].concat((P.tv || []).filter(h => h.id !== tvId)).slice(0, 12); save(); }
}
function onTvMsg(d, from) {
  if (!d.id) { if (tvId) { setVideo('', false); toast(`📺 ${from.name} ${T('TV\'yi kapattı')}`); } return; }
  tvOwner = d.o || from.id;
  const t = (d.t || 0) + (d.p ? 0.35 : 0);
  if (d.id !== tvId) { setVideo(d.id, false, d.n, t, d.p !== false); toast(`📺 ${from.name} ${T('TV\'de video açtı')}`); return; }
  tvWant = { t, p: d.p !== false, at: performance.now() };
  if (!ytP || !ytP.getPlayerState) return;
  const drift = Math.abs(ytTime() - t);
  tvSup = performance.now() + 1500;
  if (drift > 1.2) ytP.seekTo(t, true);
  if (d.p !== false && !ytPlaying()) ytP.playVideo(); else if (d.p === false && ytPlaying()) ytP.pauseVideo();
}
// sahip her 4 sn'de zamanı yayar; kendi oynatıcısı elle sarıldıysa da yayar
let tvLastT = 0, tvLastAt = 0;
setInterval(() => {
  if (!tvId || !ytP || !ytP.getCurrentTime) return;
  const t = ytTime(), now = performance.now(), exp = tvLastT + (ytPlaying() ? (now - tvLastAt) / 1000 : 0);
  if (tvLastAt && Math.abs(t - exp) > 2.5 && now > tvSup) tvOwner = myNetId();
  tvLastT = t; tvLastAt = now;
  tvBroadcast(false);
}, 4000);
// iOS: ses ancak dokununca açılır
function tvUnmuteOnTap() { if (tvMuted && ytP && ytP.unMute) { try { ytP.unMute(); ytP.playVideo(); } catch (e) {} tvMuted = false; } }
function enterWatch() {
  if (!tvId) return;
  me.watch = true; me.preWatch = { x: me.x, z: me.z, eye: me.eye, yaw: me.yaw, pitch: me.pitch };
  const dist = (TV.h / 2) / Math.tan(camera.fov * Math.PI / 360) * 1.18 * Math.max(1, (TV.w / TV.h) / camera.aspect);
  camTo(TV.x, TV.y, ZF - 0.012 - Math.min(3.2, dist), Math.PI, 0, 550, () => { $('css').classList.add('watch'); tl.classList.add('off'); });
  $('tvbar').hidden = false; $('cross').style.display = 'none'; ui();
}
function exitWatch() {
  if (!me.watch) return; me.watch = false;
  $('css').classList.remove('watch'); tl.classList.remove('off'); $('tvbar').hidden = true; $('cross').style.display = '';
  const p = me.preWatch; if (p) camTo(p.x, p.eye, p.z, p.yaw, p.pitch, 450);
  ui();
}
$('tvbar').addEventListener('click', e => {
  const b = e.target.closest('[data-tv]'); if (!b) return;
  if (b.dataset.tv === 'pick') openTvPick(); else if (b.dataset.tv === 'sync') { tvUnmuteOnTap(); if (NET && tvOwner && tvOwner !== myNetId()) NET.room.send('tvq', {}, tvOwner); else tvBroadcast(true); toast(T('TV eşitlendi')); } else if (b.dataset.tv === 'off') setVideo(''); else if (b.dataset.tv === 'up') exitWatch();
});
// arama: YouTube Data API anahtarı varsa onu, yoksa herkese açık arama sunucularını dener
const CFG = window.GP_CONFIG || {};
const PIPED = ['https://pipedapi.kavin.rocks', 'https://pipedapi.adminforge.de', 'https://api.piped.private.coffee', 'https://pipedapi.r4fo.com'];
const INV = ['https://inv.nadeko.net', 'https://invidious.nerdvpn.de', 'https://yewtu.be', 'https://iv.ggtyler.dev'];
const withTO = (p, ms) => Promise.race([p, new Promise((_, r) => setTimeout(() => r(new Error('to')), ms))]);
let goodSrc = LS.get('gp_kh_src', null);
async function ytSearch(q) {
  const key = CFG.YT_API_KEY || CFG.YOUTUBE_API_KEY;
  if (key) {
    const r = await withTO(fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=18&regionCode=DE&relevanceLanguage=tr&q=${encodeURIComponent(q)}&key=${key}`), 7000);
    const j = await r.json(); if (j.items) return j.items.map(i => ({ id: i.id.videoId, title: i.snippet.title, by: i.snippet.channelTitle }));
  }
  const tries = [];
  const piped = b => async () => { const r = await withTO(fetch(`${b}/search?q=${encodeURIComponent(q)}&filter=videos`), 5000); const j = await r.json(); return (j.items || []).filter(i => i.url).slice(0, 18).map(i => ({ id: ytId(i.url), title: i.title, by: i.uploaderName })); };
  const inv = b => async () => { const r = await withTO(fetch(`${b}/api/v1/search?q=${encodeURIComponent(q)}&type=video`), 5000); const j = await r.json(); return (j || []).slice(0, 18).map(i => ({ id: i.videoId, title: i.title, by: i.author })); };
  PIPED.forEach(b => tries.push([b, piped(b)])); INV.forEach(b => tries.push([b, inv(b)]));
  if (goodSrc) tries.sort((a, b) => (b[0] === goodSrc) - (a[0] === goodSrc));
  for (const [b, fn] of tries) { try { const res = (await fn()).filter(x => x.id); if (res.length) { goodSrc = b; LS.set('gp_kh_src', b); return res; } } catch (e) {} }
  throw new Error('nosearch');
}
const TV_TOPICS = ['Müslüm Gürses', 'Ferdi Tayfur', 'Orhan Gencebay', 'Bergen', 'İbo Show', 'Arabesk damar', 'Türkü', 'Maç özeti', 'Haberler', 'Kemal Sunal filmi'];
const thumb = id => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
function tvGrid(list) { return `<div class="vgrid">${list.map((v, i) => `<button data-r="${i}"><img src="${thumb(v.id)}" loading="lazy" alt=""><b>${esc(v.title || '')}</b>${v.by ? `<small>${esc(v.by)}</small>` : ''}</button>`).join('')}</div>`; }
let tvResults = [];
function openTvPick(q = '') {
  const hist = (P.tv || []).slice(0, 8);
  openModal(`<h2>📺 Gönül TV</h2>
    <form class="srch" id="tvf"><input class="inp" id="tvq" placeholder="${esc(T('YouTube\'da ara…'))}" value="${esc(q)}" autocomplete="off" enterkeyhint="search"><button class="btn sm" type="submit">${T('Ara')}</button></form>
    <div class="chips">${TV_TOPICS.map(t => `<button data-q="${esc(t)}">${esc(T(t))}</button>`).join('')}</div>
    <div id="tvres">${hist.length ? `<div class="lbl">${T('Son izlenenler')}</div>${tvGrid(hist)}` : ''}</div>
    ${tvId ? `<div class="row2"><button class="btn sec sm" data-v="watch">👀 ${T('Yakından izle')}</button><button class="btn sec sm" data-v="off">${T('TV\'yi kapat')}</button></div>` : ''}
    <details class="lnk"><summary>${T('Link ile aç')}</summary><input class="inp" id="yt" placeholder="https://youtu.be/…" autocomplete="off" autocapitalize="off"><button class="btn sm" data-v="go">▶ ${T('Aç')}</button></details>
    ${NET ? `<div class="ovs">${T('Açtığın video odadaki herkesin TV\'sinde açılır.')}</div>` : ''}`, async b => {
    if (b.dataset.v === 'off') { closeModal(); setVideo(''); return; }
    if (b.dataset.v === 'watch') { closeModal(); enterWatch(); return; }
    if (b.dataset.q) { $('tvq').value = b.dataset.q; doSearch(b.dataset.q); return; }
    let v = null;
    if (b.dataset.r != null) v = (tvResults.length ? tvResults : hist)[+b.dataset.r];
    else if (b.dataset.v === 'go') { const id = ytId($('yt').value); if (!id) { toast(T('Bu bir YouTube linki değil')); return; } v = { id, title: '' }; }
    if (!v) return;
    closeModal(); setVideo(v.id, true, v.title); enterWatch();
  });
  tvResults = [];
  $('tvf').onsubmit = e => { e.preventDefault(); const q2 = $('tvq').value.trim(); if (q2) doSearch(q2); };
  if (q) doSearch(q);
}
async function doSearch(q) {
  const box_ = $('tvres'); if (!box_) return; box_.innerHTML = `<div class="ovs">🔎 ${T('Aranıyor…')}</div>`;
  try { tvResults = await ytSearch(q); if ($('tvres')) $('tvres').innerHTML = tvGrid(tvResults); }
  catch (e) {
    if ($('tvres')) $('tvres').innerHTML = `<div class="ovs">${T('Arama şu an çalışmadı.')} <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(q)}" target="_blank" rel="noopener">${T('YouTube\'da aç')}</a> · ${T('beğendiğin videonun linkini "Link ile aç"a yapıştır.')}</div>`;
  }
}

/* ============================================================ plak çalar: şarkı dosyası arkadaşlara gönderilir, herkes aynı anda dinler
   DJ (çalan kişi) dosyayı uygulamadan alır, her arkadaşa WebRTC ile doğrudan yollar (olmazsa oda sunucusu üzerinden parça parça).
   Arkadaşın telefonunda dosya hazır olunca DJ'in zamanına göre çalar; 4 sn'de bir eşitlenir. */
let np = null, npAt = 0, plakSpin = 0, roomSong = null, shareAudio = null;
const songCache = new Map();   // id → { url, size }
let myBlob = null;             // DJ: şu an çalan şarkının dosyası
function openPlak() {
  const n = np, rs = roomSong && roomSong.by !== myNetId() ? roomSong : null;
  const playing = (n && n.playing) || (rs && rs.playing);
  openModal(`<h2>🎵 ${T('Plak çalar')}</h2>
    <div class="nowp ${playing ? 'on' : ''}"><i class="disc"></i><div>${rs ? `<b>${esc(rs.title)}</b><small>${esc(rs.artist || '')}</small><span>🎧 ${esc(rs.name)} ${T('çalıyor')} · ${rs.ready ? T('sende de çalıyor') : rs.prog != null ? T('iniyor') + ' %' + Math.round(rs.prog * 100) : T('bekleniyor')}</span>` : n ? `<b>${esc(n.title || T('Şarkı'))}</b><small>${esc(n.artist || '')}</small><span>${n.playing ? '▶ ' + T('çalıyor') : '⏸ ' + T('duraklatıldı')}</span>` : `<small>${T('Şu an bir şey çalmıyor')}</small>`}</div></div>
    <button class="btn" data-v="pick">🎶 ${T('Şarkı seç (Gönül Plak)')}</button>
    ${n ? `<button class="btn sec" data-v="${n.playing ? 'pause' : 'resume'}">${n.playing ? '⏸ ' + T('Duraklat') : '▶ ' + T('Devam et')}</button>` : ''}
    ${NET ? `<button class="btn sec" data-v="dj">${me.dj ? '📡 ' + T('Odaya çalıyorsun (kapat)') : '📡 ' + T('Odadaki herkese çal')}</button><div class="ovs">${T('Açıkken çaldığın şarkı arkadaşlarının telefonuna gönderilir ve herkeste aynı anda çalar. Arkadaşlarında şarkının olması gerekmez.')}</div>` : ''}
    ${rs ? `<button class="btn sec" data-v="leave">🔇 ${T('Bu şarkıyı dinleme')}</button>` : ''}`, b => {
    const v = b.dataset.v;
    if (v === 'pick') { closeModal(); if (NET) me.dj = true; toParent({ type: 'gp-open', view: 'now' }); if (parent === window) toast(T('Müzik çalar sadece uygulamanın içinde açılır')); return; }
    if (v === 'pause') { toParent({ type: 'gp-pause' }); closeModal(); return; }
    if (v === 'resume') { toParent({ type: 'gp-resume' }); closeModal(); return; }
    if (v === 'leave') { if (shareAudio) shareAudio.pause(); roomSong = null; closeModal(); return; }
    if (v === 'dj') { me.dj = !me.dj; if (me.dj) djStart(); else if (NET) NET.room.send('pk', { stop: 1 }); openPlak(); }
  });
}
const npPos = () => np ? np.pos + (np.playing ? (Date.now() - npAt) / 1000 : 0) : 0;
function djStart() { if (!np) return; myBlob = null; toParent({ type: 'gp-blob', id: np.id }); djBeat(); }
function djBeat() { if (!NET || !me.dj || !np) return; NET.room.send('pk', { id: np.id, title: np.title, artist: np.artist, playing: np.playing, pos: +npPos().toFixed(2), size: myBlob && myBlob.id === np.id ? myBlob.blob.size : 0 }); }
// ---- WebRTC aktarım
const ICE = { iceServers: [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] }] };
const rtc = new Map(); // peerId → { pc, dc, sending }
const CH = 16 * 1024;
function rtcPeer(pid, initiator) {
  let r = rtc.get(pid); if (r) return r;
  const pc = new RTCPeerConnection(ICE); r = { pc, dc: null, q: [] }; rtc.set(pid, r);
  pc.onicecandidate = e => { if (e.candidate) NET.room.send('rtc', { c: e.candidate.toJSON() }, pid); };
  pc.onconnectionstatechange = () => { if (/failed|closed/.test(pc.connectionState)) { rtc.delete(pid); } };
  const setup = dc => { r.dc = dc; dc.binaryType = 'arraybuffer'; dc.onmessage = e => onChunk(pid, e.data); dc.onopen = () => { const f = r.q.splice(0); f.forEach(fn => fn()); }; };
  if (initiator) { setup(pc.createDataChannel('plak', { ordered: true })); pc.createOffer().then(o => pc.setLocalDescription(o)).then(() => NET.room.send('rtc', { sdp: pc.localDescription.toJSON() }, pid)); }
  else pc.ondatachannel = e => setup(e.channel);
  return r;
}
async function onRtc(d, from) {
  if (!NET || typeof RTCPeerConnection === 'undefined') return;
  const r = rtcPeer(from.id, false), pc = r.pc;
  try {
    if (d.sdp) { await pc.setRemoteDescription(d.sdp); if (d.sdp.type === 'offer') { await pc.setLocalDescription(await pc.createAnswer()); NET.room.send('rtc', { sdp: pc.localDescription.toJSON() }, from.id); } }
    else if (d.c) await pc.addIceCandidate(d.c);
  } catch (e) {}
}
// DJ: arkadaş dosyayı istedi → gönder
async function sendSong(pid, via) {
  if (!myBlob) return;
  const { id, blob } = myBlob, buf = new Uint8Array(await blob.arrayBuffer()), total = buf.length;
  const head = JSON.stringify({ id, size: total, mime: blob.type || 'audio/mpeg' });
  if (via !== 'mq' && typeof RTCPeerConnection !== 'undefined') {
    const r = rtcPeer(pid, true);
    const go = async () => {
      const dc = r.dc; dc.send(head);
      for (let o = 0; o < total; o += CH) {
        while (dc.bufferedAmount > 1 << 20) await new Promise(res => setTimeout(res, 30));
        if (dc.readyState !== 'open') return; dc.send(buf.subarray(o, Math.min(total, o + CH)));
      }
    };
    if (r.dc && r.dc.readyState === 'open') go(); else r.q.push(go);
    return;
  }
  // yedek yol: oda sunucusu üzerinden base64 parçalar
  const MQ = 24 * 1024; let i = 0;
  NET.room.send('pkh', { id, size: total, mime: blob.type || 'audio/mpeg' }, pid);
  for (let o = 0; o < total; o += MQ, i++) {
    let s = ''; const part = buf.subarray(o, Math.min(total, o + MQ)); for (let j = 0; j < part.length; j++) s += String.fromCharCode(part[j]);
    NET.room.send('pkc', { id, i, b: btoa(s) }, pid);
    await new Promise(res => setTimeout(res, 70));
  }
}
// dinleyen: gelen parçaları birleştir
const incoming = new Map(); // id → { size, mime, parts:[], got }
function onChunk(pid, data) {
  if (typeof data === 'string') { try { const h = JSON.parse(data); incoming.set(h.id, { size: h.size, mime: h.mime, parts: [], got: 0, from: pid }); cur_in = h.id; } catch (e) {} return; }
  const inc = incoming.get(cur_in); if (!inc) return;
  inc.parts.push(new Uint8Array(data)); inc.got += data.byteLength; progress(cur_in, inc);
}
let cur_in = null;
function onMqHead(d) { incoming.set(d.id, { size: d.size, mime: d.mime, parts: [], got: 0, mq: [] }); }
function onMqChunk(d) {
  const inc = incoming.get(d.id); if (!inc) return;
  const bin = atob(d.b), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  inc.mq[d.i] = u; inc.got += u.length; progress(d.id, inc);
}
function progress(id, inc) {
  if (roomSong && roomSong.id === id) roomSong.prog = inc.got / inc.size;
  if (inc.got >= inc.size) {
    const parts = inc.mq ? inc.mq : inc.parts, blob = new Blob(parts, { type: inc.mime });
    incoming.delete(id);
    if (songCache.size > 4) { const [k0, v0] = songCache.entries().next().value; URL.revokeObjectURL(v0.url); songCache.delete(k0); }
    songCache.set(id, { url: URL.createObjectURL(blob), size: blob.size });
    if (roomSong && roomSong.id === id) { roomSong.ready = true; playRoomSong(); }
  }
}
function requestSong(d, from) {
  if (songCache.has(d.id) || incoming.has(d.id)) return;
  incoming.set(d.id, { size: d.size, mime: '', parts: [], got: 0, from: from.id });
  const hasRtc = typeof RTCPeerConnection !== 'undefined';
  NET.room.send('pkr', { id: d.id, via: hasRtc ? 'rtc' : 'mq' }, from.id);
  // 9 sn içinde hiç parça gelmezse yedek yola geç
  setTimeout(() => { const inc = incoming.get(d.id); if (inc && inc.got === 0 && NET) { incoming.delete(d.id); NET.room.send('pkr', { id: d.id, via: 'mq' }, from.id); } }, 9000);
}
function onRoomSong(d, from) {
  if (d.stop) { if (roomSong && roomSong.by === from.id) { roomSong = null; if (shareAudio) shareAudio.pause(); } return; }
  const prev = roomSong; me.dj = false;
  roomSong = Object.assign(prev && prev.id === d.id ? prev : {}, { by: from.id, name: from.name, id: d.id, title: d.title, artist: d.artist, playing: d.playing, pos: d.pos, at: performance.now() });
  if (!prev || prev.id !== d.id) { toast(`🎵 ${from.name}: ${d.title}${d.artist ? ' · ' + d.artist : ''}`, 3200); toParent({ type: 'gp-pause' }); }
  if (songCache.has(d.id)) { roomSong.ready = true; playRoomSong(); }
  else if (d.size) requestSong(d, from);
}
let audioLocked = false;
function playRoomSong() {
  const rs = roomSong; if (!rs || !songCache.has(rs.id)) return;
  if (!shareAudio) { shareAudio = new Audio(); shareAudio.setAttribute('playsinline', ''); }
  const c = songCache.get(rs.id); if (shareAudio.src !== c.url) shareAudio.src = c.url;
  const want = rs.pos + (rs.playing ? (performance.now() - rs.at) / 1000 + 0.25 : 0);
  try { if (Math.abs(shareAudio.currentTime - want) > 1.0) shareAudio.currentTime = want; } catch (e) {}
  if (rs.playing) shareAudio.play().then(() => { audioLocked = false; }).catch(() => { if (!audioLocked) toast('🔊 ' + T('Şarkıyı duymak için ekrana bir kez dokun')); audioLocked = true; });
  else shareAudio.pause();
}
function audioUnlockTap() { if (audioLocked && roomSong) playRoomSong(); }
addEventListener('message', e => {
  if (e.source !== parent) return;
  const d = e.data; if (!d || !d.type) return;
  if (d.type === 'gp-np') {
    const was = np; np = d.np; npAt = Date.now();
    if (np) drawPlakLabel(np.title || 'Gönül Plak', np.artist || ''); else drawPlakLabel('Gönül Plak', '');
    if (me.dj && np && (!was || was.id !== np.id)) djStart();
    else if (me.dj && np && (was.playing !== np.playing || Math.abs((was.pos || 0) - np.pos) > 3)) djBeat();
  } else if (d.type === 'gp-blob') { if (np && d.id === np.id && d.blob) { myBlob = { id: d.id, blob: d.blob }; djBeat(); } }
});
setInterval(() => { if (me.dj && np) djBeat(); if (roomSong && roomSong.ready && shareAudio && !audioLocked) playRoomSong(); }, 4000);
const plakPlaying = () => (np && np.playing) || (shareAudio && !shareAudio.paused);

/* ============================================================ bilardo (yan oda): bizim bilardo, kıraathane temasıyla */
let subFrame = null;
function openPool() {
  if (subFrame) return;
  const src = 'bilardo.html?theme=kh&userName=' + encodeURIComponent(myName || '') + '&t=' + Date.now();
  subFrame = document.createElement('iframe'); subFrame.src = src; subFrame.allow = 'autoplay; clipboard-write; web-share';
  const box_ = $('okf'); box_.innerHTML = ''; box_.appendChild(subFrame); box_.hidden = false;
  if (NET) NET.room.send('x', { a: 'pool' });
}
function closeSub() { if (!subFrame) return; try { subFrame.src = 'about:blank'; } catch (e) {} subFrame.remove(); subFrame = null; $('okf').hidden = true; }
addEventListener('message', e => {
  if (!subFrame || e.source !== subFrame.contentWindow) return;
  const d = e.data;
  if (d === 'game-exit' || d === 'pool-exit') closeSub();
  else if (d && d.type === 'gp-name' && d.name) { myName = d.name; toParent(d); }
});

/* ============================================================ nargile */
const FLAVORS = [['elma', 'Elma', 0xfff6e8], ['nane', 'Nane', 0xe8fbff], ['elmanane', 'Elma-Nane', 0xf0fff6], ['uzum', 'Üzüm', 0xf4ecff], ['seftali', 'Şeftali', 0xfff0e6], ['karpuz', 'Karpuz', 0xffecf0], ['limon', 'Limon', 0xfffbe0]];
let nargStep = '', nargHold = 0, nargHoldStart = 0, bubAudio = null;
function startNarg(i) {
  const n = NARG[i]; if (!n) return; me.narg = i;
  const s = seats[me.seat]; const bowl = new THREE.Vector3(0, 0.74, 0).add(n.g.position);
  nargStep = n.lit > performance.now() ? 'smoke' : n.flavor ? (n.holes.length < 12 ? 'foil' : 'coal') : 'flavor';
  nargCam(600); nargUI(); ui();
}
function nargCam(dur = 500) {
  const n = NARG[me.narg]; if (!n) return; const bowl = new THREE.Vector3(0, 0.74, 0).add(n.g.position), s = seats[me.seat];
  if (nargStep === 'smoke') { const dx = bowl.x - s.x, dz = bowl.z - s.z; camTo(s.x + 0.1, 1.16, s.z, Math.atan2(-dx, -dz), -0.16, dur); }
  else camTo(bowl.x - 0.42, bowl.y + 0.5, bowl.z, -Math.PI / 2, -0.95, dur);
}
function endNarg() { me.narg = -1; $('ngbar').hidden = true; stopBubble(); if (me.seat >= 0) { const s = seats[me.seat]; camTo(s.x + 0.05, 1.12, s.z, s.yaw - Math.PI, -0.3, 450); } ui(); }
function nargUI() {
  const n = NARG[me.narg], bar = $('ngbar'); bar.hidden = false;
  const step = nargStep;
  let h = '';
  if (step === 'flavor') h = `<div class="ngt">${T('Aroma seç')}</div><div class="chips">${FLAVORS.map(f => `<button data-f="${f[0]}">${T(f[1])}</button>`).join('')}</div>`;
  else if (step === 'foil') h = `<div class="ngt">${T('Folyoyu del')}: ${n.holes.length}/12 · ${T('folyoya dokun')}</div>`;
  else if (step === 'coal') h = `<div class="ngt">${T('Kömürleri koy')}</div><button class="gl" data-n="coal">🔥 ${T('Kömür koy')}</button>`;
  else h = `<div class="ngt">${T(FLAVORS.find(f => f[0] === n.flavor)[1])} · ${T('basılı tut, çek')}</div><button class="gl hold" data-n="pull">💨 ${T('Çek')}</button>`;
  bar.innerHTML = h + `<button class="gl" data-n="x">${T('Bırak')}</button>`;
}
$('ngbar').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return; const n = NARG[me.narg]; if (!n) return;
  if (b.dataset.f) { n.flavor = b.dataset.f; n.holes = []; drawFoil(n); n.coals.forEach(c => c.visible = false); nargStep = 'foil'; nargUI(); return; }
  if (b.dataset.n === 'coal') { n.coals.forEach((c, i) => setTimeout(() => { c.visible = true; }, i * 250)); n.lit = performance.now() + 8 * 60000; nargStep = 'smoke'; setTimeout(() => { nargUI(); nargCam(700); }, 800); if (NET) NET.room.send('x', { a: 'narg', n: me.narg, f: n.flavor }); return; }
  if (b.dataset.n === 'x') endNarg();
});
$('ngbar').addEventListener('pointerdown', e => { const b = e.target.closest('[data-n=pull]'); if (!b) return; nargHold = 1; nargHoldStart = performance.now(); startBubble(); });
const endHold = () => { if (!nargHold) return; nargHold = 0; stopBubble(); const dur = Math.min(3, (performance.now() - nargHoldStart) / 1000); if (dur > 0.35) exhale(dur); };
addEventListener('pointerup', endHold); addEventListener('pointercancel', endHold);
function nargTap(cx, cy) {
  const n = NARG[me.narg]; if (nargStep !== 'foil') return;
  v2.set(cx / VW * 2 - 1, -(cy / VH) * 2 + 1); ray.setFromCamera(v2, camera);
  const c = n.foil.getWorldPosition(new THREE.Vector3()), pt = new THREE.Vector3();
  if (!ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -c.y), pt)) return;
  let dx = pt.x - c.x, dz = pt.z - c.z; const d = Math.hypot(dx, dz); if (d > 0.11) return;
  if (d > 0.045) { dx *= 0.045 / d; dz *= 0.045 / d; }
  {
    const u = 0.5 + dx / 0.1, v = 0.5 + dz / 0.1;
    n.holes.push([u, v]); drawFoil(n); if (n.holes.length >= 12) { nargStep = 'coal'; toast(T('Tamam, folyo hazır')); } nargUI();
  }
}
function exhale(dur) {
  const n = NARG[me.narg]; const fl = FLAVORS.find(f => f[0] === n.flavor) || FLAVORS[0];
  const fx = -Math.sin(me.yaw), fz = -Math.cos(me.yaw), s = seats[me.seat];
  const hx = s.x + Math.sin(s.yaw) * 0.08, hz = s.z + Math.cos(s.yaw) * 0.08;
  const dir = camera.getWorldDirection(new THREE.Vector3()); dir.y = 0; dir.normalize();
  puff(camera.position.x + dir.x * 0.55, camera.position.y - 0.1, camera.position.z + dir.z * 0.55, dir.x, dir.z, Math.round(10 + dur * 6), fl[2], 1.1);
  avAct(meAv, 'pull');
  if (NET) NET.room.send('x', { a: 'puff', x: +hx.toFixed(2), z: +hz.toFixed(2), d: +dur.toFixed(1), c: fl[2], dx: +Math.sin(s.yaw).toFixed(2), dz: +Math.cos(s.yaw).toFixed(2) });
}
function startBubble() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; if (!bubAudio) bubAudio = new AC();
    const ac = bubAudio; ac.resume();
    const len = ac.sampleRate * 2, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) { const t = i / ac.sampleRate; d[i] = (Math.random() * 2 - 1) * 0.08 * (0.5 + 0.5 * Math.sin(t * 2 * Math.PI * (7 + Math.sin(t * 3) * 3))) * Math.max(0, Math.sin(t * 61) * Math.sin(t * 23)); }
    const src = ac.createBufferSource(); src.buffer = buf; src.loop = true; const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900; const g = ac.createGain(); g.gain.value = 0.9;
    src.connect(f).connect(g).connect(ac.destination); src.start(); bubAudio._src = src;
  } catch (e) {}
}
function stopBubble() { try { if (bubAudio && bubAudio._src) { bubAudio._src.stop(); bubAudio._src = null; } } catch (e) {} }

/* ============================================================ karakter (görünüm) düzenleyici */
const SKINS = [0xf1c9a5, 0xe0ac86, 0xc99a78, 0xa8754f, 0x7a5236, 0x4e3322];
const HAIRC = [0x0c0806, 0x2a1a10, 0x5a3a1e, 0x9a6a3a, 0xc9a26a, 0x9a9a9a, 0xd8d8d8];
const CLOTH = [0x2a5a8a, 0x8a2a2a, 0x2a7a4a, 0x7a5a1a, 0x5a2a7a, 0x1a6a6a, 0xf2efe8, 0x1a1a1e, 0x6a6a5a, 0xc8432c, 0xe8b84a, 0x3a3a3a];
const PANTS = [0x23232a, 0x1a1a1e, 0x3a3028, 0x2a3a5a, 0x5a4a3a, 0x6a6a6a];
const HAIRS = ['Kısa', 'Kel', 'Uzun', 'Kıvırcık'];
function openAvatar() {
  const a = P.av;
  const sw = (k, list, cur) => `<div class="sws">${list.map(c => `<button data-k="${k}" data-c="${c}" class="${cur === c ? 'on' : ''}" style="background:#${c.toString(16).padStart(6, '0')}"></button>`).join('')}</div>`;
  const tg_ = (k, n, cur) => `<button data-t="${k}" class="${cur ? 'on' : ''}">${T(n)}</button>`;
  openModal(`<h2>🧍 ${T('Karakterin')}</h2>
    <div class="lbl">${T('Ten')}</div>${sw('skin', SKINS, a.skin)}
    <div class="lbl">${T('Saç')}</div><div class="segs">${HAIRS.map((h, i) => `<button data-hs="${i}" class="${a.hairStyle === i ? 'on' : ''}">${T(h)}</button>`).join('')}</div>${sw('hair', HAIRC, a.hair)}
    <div class="lbl">${T('Yüz')}</div><div class="segs">${tg_('mustache', 'Bıyık', a.mustache)}${tg_('beard', 'Sakal', a.beard)}${tg_('glasses', 'Gözlük', a.glasses)}</div>
    <div class="lbl">${T('Gömlek')}</div>${sw('shirt', CLOTH, a.shirt)}
    <div class="lbl">${T('Yelek')}</div>${sw('vest', [0].concat(CLOTH.slice(0, 8)), a.vest)}
    <div class="lbl">${T('Pantolon')}</div>${sw('pants', PANTS, a.pants)}
    <div class="lbl">${T('Kasket')}</div>${sw('cap', [0, 0x2a2a2a, 0x5a4a3a, 0x7a1a1a, 0x1a2a4a], a.cap)}
    <div class="ovs">${T('Kendini görmek için üstteki göz düğmesiyle 3. şahıs kameraya geç.')}</div>`, b => {
    if (b.dataset.k) { a[b.dataset.k] = +b.dataset.c; }
    else if (b.dataset.hs) a.hairStyle = +b.dataset.hs;
    else if (b.dataset.t) a[b.dataset.t] = a[b.dataset.t] ? 0 : 1;
    else return;
    save(); rebuildMe(); if (NET) NET.room.send('av', { av: a }); openAvatar();
  });
  if (P.cam !== 3) { P.cam = 3; save(); ui(); }
}

/* ============================================================ online */
let lastSend = 0, lastSig = '';
const COLORS = [0x2a5a8a, 0x8a2a2a, 0x2a7a4a, 0x7a5a1a, 0x5a2a7a, 0x1a6a6a, 0x8a4a2a, 0x3a3a3a];
function hashc(s) { let h = 0; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) | 0; return Math.abs(h); }
function addOther(p, av) {
  if ((NET && p.id === NET.room.id)) return;
  let o = others.get(p.id);
  if (o && !av) return;
  const h = hashc(p.name + p.id), look = av || (o && o.avc) || { shirt: COLORS[h % COLORS.length], hair: [0x17100b, 0x3a2414, 0x0c0c0c][h % 3], mustache: h % 4 === 0 ? 1 : 0 };
  const person = makePerson(look); nameSprite(person, p.name, '#bfe8ff');
  if (o) { disposePerson(o.av); o.av = person; o.avc = look; person.visible = o.seen; if (o.seat >= 0 && seats[o.seat]) sitAt(person, seats[o.seat]); else person.position.set(o.x, 0, o.z); return; }
  person.position.set(-5, 0, 6.2); person.visible = false;
  others.set(p.id, { av: person, avc: look, name: p.name, x: -5, z: 6.2, yaw: 0, tx: -5, tz: 6.2, tyaw: 0, seat: -1, ph: 0, seen: false, tea: 0 });
}
function removeOther(id) { const o = others.get(id); if (!o) return; if (o.seat >= 0 && seats[o.seat] && seats[o.seat].by === id) seats[o.seat].by = null; disposePerson(o.av); others.delete(id); okey.onLeave(id); if (roomSong && roomSong.by === id) { roomSong = null; if (shareAudio) shareAudio.pause(); } }
function netOpts(code) {
  return {
    name: myName || T('Misafir'), max: 8, code,
    onPeers: list => {
      const ids = new Set(list.map(p => p.id)); for (const id of [...others.keys()]) if (!ids.has(id)) removeOther(id);
      let neu = false; list.forEach(p => { if (!others.has(p.id) && p.id !== NET?.room?.id) { addOther(p); neu = true; } });
      if (neu && NET) { sendState(true); NET.room.send('av', { av: P.av }); if (tvId && (tvOwner === myNetId() || !tvOwner)) tvBroadcast(true); if (me.dj) djBeat(); okey.onPeers(list); }
      ui(); saveSession();
    },
    onMsg: (t, d, from) => {
      if (!from) return; if (!others.has(from.id)) addOther(from);
      const o = others.get(from.id);
      if (t === 'p') {
        o.tx = d.x; o.tz = d.z; o.tyaw = d.y; o.tea = d.c || 0; if (!o.seen) { o.x = d.x; o.z = d.z; o.yaw = d.y; o.seen = true; o.av.visible = true; }
        if (d.s !== o.seat) { if (o.seat >= 0 && seats[o.seat] && seats[o.seat].by === from.id) seats[o.seat].by = null; o.seat = d.s; if (d.s >= 0 && seats[d.s]) seats[d.s].by = from.id; }
        o.av.userData.cup.visible = o.tea === 1;
      } else if (t === 'av') { addOther(from, d.av); }
      else if (t === 'tv') onTvMsg(d, from);
      else if (t === 'tvq') tvBroadcast(true);
      else if (t === 'say') { bubble(o.av, d.t); }
      else if (t === 'pk') onRoomSong(d, from);
      else if (t === 'pkr') sendSong(from.id, d.via);
      else if (t === 'pkh') onMqHead(d);
      else if (t === 'pkc') onMqChunk(d);
      else if (t === 'rtc') onRtc(d, from);
      else if (t === 'x') {
        if (d.a === 'sip') avAct(o.av, 'sip');
        else if (d.a === 'order') orderTea(d.s, false);
        else if (d.a === 'puff') { avAct(o.av, 'pull'); setTimeout(() => puff(d.x, 1.25, d.z, d.dx || 0, d.dz || 0, Math.round(6 + d.d * 4), d.c || 0xffffff), 900); }
        else if (d.a === 'narg') { const n = NARG[d.n]; if (n) { n.flavor = d.f; n.coals.forEach(c => c.visible = true); n.lit = performance.now() + 8 * 60000; } }
        else if (d.a === 'pool') toast(`🎱 ${from.name} ${T('bilardo oynuyor')}`);
      }
      else if (t.startsWith('ok')) { if (t === 'okE') okey.onErr(d); else okey.onMsg(t, d, from); }
    },
    onLeave: p => { removeOther(p.id); toast(`${p.name} ${T('kıraathaneden çıktı')}`); ui(); },
    onClose: r => { netEnd(); toast(T(r)); }
  };
}
function netEnd() { for (const id of [...others.keys()]) removeOther(id); NET = null; me.dj = false; roomSong = null; if (shareAudio) shareAudio.pause(); ui(); saveSession(); }
function sendState(force) {
  if (!NET) return; const now = performance.now();
  const sig = [me.x.toFixed(2), me.z.toFixed(2), me.yaw.toFixed(2), me.seat, me.tea].join();
  if (!force && (sig === lastSig ? now - lastSend < 2500 : now - lastSend < 120)) return;
  lastSig = sig; lastSend = now; NET.room.send('p', { x: +me.x.toFixed(2), z: +me.z.toFixed(2), y: +me.yaw.toFixed(2), s: me.seat, c: me.tea || 0 });
}
async function netHost(code) {
  if (!window.GPNet) return toast(T('Online modül yüklenemedi'));
  if (!code) openModal(`<h2>${T('Oda kuruluyor…')}</h2>`);
  try { const room = await window.GPNet.host('kiraathane', netOpts(code)); NET = { room, host: true }; removeOther(room.id); sendState(true); room.send('av', { av: P.av }); if (!code) showNet(); else toast('🌐 ' + T('Odan yeniden açıldı') + ' · ' + room.code); saveSession(); ui(); }
  catch (e) { if (!code) openModal(`<h2>${T('Bağlanamadı')}</h2><div class="ovs">${esc(T(e.message || 'İnternet bağlantını kontrol et'))}</div>`); }
}
async function netJoin(code, quiet) {
  if (!window.GPNet) return toast(T('Online modül yüklenemedi'));
  if (!quiet) openModal(`<h2>${T('Kıraathaneye bağlanılıyor…')}</h2>`);
  try { const room = await window.GPNet.join('kiraathane', code, netOpts()); NET = { room, host: false }; removeOther(room.id); room.peers.forEach(p => addOther(p)); sendState(true); room.send('av', { av: P.av }); closeModal(); toast('🌐 ' + T('Arkadaşının kıraathanesindesin')); ui(); saveSession(); }
  catch (e) { if (!quiet) openModal(`<h2>${T('Katılamadın')}</h2><div class="ovs">${esc(T(e.message || 'Bağlantı hatası'))}</div><button class="btn" data-v="retry">${T('Tekrar dene')}</button>`, b => { if (b.dataset.v === 'retry') joinAsk(code); }); }
}
function share() {
  if (!NET) return; const url = NET.room.link(), text = `${T('Gönül Plak kıraathanesine gel, çay benden! Oda kodu:')} ${NET.room.code}`;
  if (navigator.share) navigator.share({ title: 'Gönül Plak · Kıraathane', text, url }).catch(() => {});
  else if (navigator.clipboard) navigator.clipboard.writeText(text + ' ' + url).then(() => toast(T('Link kopyalandı'))).catch(() => {});
}
function showNet() {
  if (!NET) {
    return openModal(`<h2>🌐 ${T('Arkadaşlarınla kıraathane')}</h2><div class="ovs">${T('Oda kur, linki gönder. Arkadaşların gelince burada yürür, aynı masada okey oynar, aynı TV\'yi izler, aynı plağı dinlersiniz.')}</div>
      <button class="btn" data-v="host">${T('Oda kur')}</button><button class="btn sec" data-v="join">${T('Odaya katıl')}</button>`, b => { if (b.dataset.v === 'host') netHost(); else if (b.dataset.v === 'join') joinAsk(''); });
  }
  const r = NET.room;
  openModal(`<h2>🌐 ${T('Online kıraathane')}</h2><div class="big">${r.code}</div>
    <div class="list">${r.peers.map(p => `<button>${p.seat === 0 ? '👑 ' : '☕ '}${esc(p.name)}${p.id === r.id ? ' (' + T('sen') + ')' : ''}</button>`).join('')}</div>
    <button class="btn" data-v="share">${T('Linki gönder')}</button><button class="btn sec" data-v="leave">${T('Odadan çık')}</button>`, b => {
    if (b.dataset.v === 'share') share(); else if (b.dataset.v === 'leave') { r.close(); netEnd(); closeModal(); }
  });
}
function joinAsk(pre) {
  openModal(`<h2>${T('Odaya katıl')}</h2><div class="lbl">${T('Oda kodu')}</div><input class="inp" id="code" maxlength="6" value="${esc(pre || '')}" style="text-transform:uppercase;letter-spacing:6px;font-size:24px;text-align:center" autocomplete="off" autocapitalize="characters"><button class="btn" data-v="go">${T('Katıl')}</button>`,
    b => { if (b.dataset.v === 'go') netJoin($('code').value); });
}
const PHR = ['Selamünaleyküm!', 'Çaylar benden 🍵', 'Bir el okey?', 'Ooo, hoş geldin!', 'Müslüm Baba açalım mı?', 'Bir bilardo?', 'Nargile tazeleyelim', 'Kalk gidelim', 'Hadi eyvallah 👋'];
$('say').onclick = () => openModal(`<h2>${T('Hızlı mesaj')}</h2><div class="phr">${PHR.map((p, i) => `<button data-v="${i}">${esc(T(p))}</button>`).join('')}</div>`, b => {
  const t = T(PHR[+b.dataset.v]); if (!t) return; closeModal(); if (NET) NET.room.send('say', { t }); toast('💬 ' + t); if (meAv) bubble(meAv, t);
});
$('bnet').onclick = () => showNet();
// sayfa kapanıp yeniden açılırsa (iPhone hafızası) kaldığın yerden devam
function saveSession() { SS.set('kh-ss', { x: +me.x.toFixed(2), z: +me.z.toFixed(2), yaw: +me.yaw.toFixed(2), code: NET ? NET.room.code : null, host: NET ? !!NET.host : false, tv: tvId, at: Date.now() }); }
setInterval(() => { if (!me.watch && !anim.on && me.seat < 0 && !okey.active) saveSession(); }, 3000);

/* ============================================================ ayarlar, modal, toast, ipucu */
const modal = $('modal'), mc = $('mc');
function openModal(html, on) { mc.innerHTML = html; modal.hidden = false; modal._on = on || null; }
function closeModal() { modal.hidden = true; mc.innerHTML = ''; modal._on = null; }
modal.addEventListener('click', e => {
  if (e.target === modal) return closeModal();
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.a === 'close') return closeModal();
  modal._on && modal._on(b, e);
});
let toastT = 0; function toast(s, ms = 2200) { const t = $('toast'); t.textContent = s; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), ms); }
const TIMES = [['auto', 'Gerçek saat'], ['sabah', 'Sabah'], ['gunduz', 'Gündüz'], ['gunbatimi', 'Gün batımı'], ['aksam', 'Akşam'], ['gece', 'Gece']];
const SEAS = [['auto', 'Gerçek mevsim'], ['ilkbahar', 'İlkbahar'], ['yaz', 'Yaz'], ['sonbahar', 'Sonbahar'], ['kis', 'Kış']];
const SNOWS = [['auto', 'Gerçek Stuttgart havası'], ['on', 'Hep kar yağsın'], ['off', 'Açık hava']];
const QS_ = [['auto', 'Güzel görüntü'], ['low', 'Pil dostu']];
const seg = (k, list, cur) => `<div class="segs">${list.map(([v, n]) => `<button data-v="${k}:${v}" class="${cur === v ? 'on' : ''}">${T(n)}</button>`).join('')}</div>`;
function showSettings() {
  openModal(`<h2>${T('Ayarlar')}</h2><div class="lbl">${T('Manzara saati')}</div>${seg('time', TIMES, P.time)}<div class="lbl">${T('Mevsim')}</div>${seg('season', SEAS, P.season)}<div class="lbl">${T('Hava')}</div>${seg('snow', SNOWS, P.snow)}<div class="lbl">${T('Görüntü')}</div>${seg('q', QS_, P.q)}
    <div class="ovs">${T('Sol tarafta parmağını kaydır: yürü. Sağ tarafta kaydır: etrafa bak. Bir şeye dokun: oraya gider.')}</div>`, b => {
    const v = b.dataset.v; if (!v) return; const [k, val] = v.split(':'); P[k] = val; save();
    if (k === 'q') { prNow = 9; resize(); }
    applyEnv(); showSettings();
  });
}
$('bset').onclick = showSettings;
$('back').onclick = () => { if (subFrame) return closeSub(); if (me.watch) return exitWatch(); if (me.narg >= 0) return endNarg(); if (me.seat >= 0) return standUp(); if (NET) { NET.room.close(); netEnd(); } SS.set('kh-ss', null); toParent('game-exit'); };
const hint = $('hint');
function showHint() { if (P.hint >= 3 || TEST) return; P.hint++; save(); hint.innerHTML = T('👈 Solda kaydır: yürü · Sağda kaydır: bak 👉') + '<br><small style="opacity:.8">' + T('Masaya, TV\'ye, plağa, çay ocağına dokun') + '</small>'; hint.hidden = false; setTimeout(hideHint, 9000); }
function hideHint() { hint.hidden = true; }

/* ============================================================ sabit nesneleri birleştir (çizim sayısını ciddi düşürür) */
function bakeStatic() {
  scene.updateMatrixWorld(true);
  const groups = new Map(), victims = [];
  const skip = o => { for (let p = o; p && p !== scene; p = p.parent) if (p.userData && (p.userData.dyn || p.userData.npc || p.userData.okTile != null)) return true; return false; };
  scene.traverse(o => {
    if (!o.isMesh || o.isInstancedMesh || Array.isArray(o.material) || o.material.transparent || skip(o)) return;
    if (o.parent && o.parent !== scene && o.parent.parent && o.parent.parent.isCamera) return;
    const key = o.material.uuid + (o.castShadow ? 'c' : '') + (o.receiveShadow ? 'r' : '');
    let g = groups.get(key); if (!g) { g = { mat: o.material, cast: o.castShadow, recv: o.receiveShadow, list: [] }; groups.set(key, g); }
    g.list.push(o);
  });
  let n0 = 0, n1 = 0;
  for (const g of groups.values()) {
    if (g.list.length < 2) continue;
    const pos = [], nor = [], uv = [];
    for (const o of g.list) {
      let geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone(); geo.applyMatrix4(o.matrixWorld);
      if (!geo.attributes.uv) continue;
      pos.push(geo.attributes.position.array); nor.push(geo.attributes.normal.array); uv.push(geo.attributes.uv.array); victims.push(o); n0++;
    }
    const cat = arrs => { const L = arrs.reduce((a, b) => a + b.length, 0), out = new Float32Array(L); let k = 0; for (const a of arrs) { out.set(a, k); k += a.length; } return out; };
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(cat(pos), 3)); geo.setAttribute('normal', new THREE.BufferAttribute(cat(nor), 3)); geo.setAttribute('uv', new THREE.BufferAttribute(cat(uv), 2));
    geo.computeBoundingSphere();
    const m = new THREE.Mesh(geo, g.mat); m.castShadow = g.cast; m.receiveShadow = g.recv; m.matrixAutoUpdate = false; scene.add(m); n1++;
  }
  for (const o of victims) { o.parent && o.parent.remove(o); }
  return { n0, n1 };
}

/* ============================================================ döngü (kare hızına göre çözünürlük ayarı + boşta yavaşlama) */
let avTick = 0, last = performance.now(), walkPh = 0, bob = 0, fN = 0, ftAvg = 16, ftN = 0, skip = 0;
const cross = $('cross');
function frame(now) { requestAnimationFrame(frame); tick(now); }
function tick(now) {
  if (document.hidden || subFrame) { last = now; return; }
  const raw = now - last;
  // boştayken (dokunma yok, hareket yok) saniyede ~30 kare yeter
  const idle = now - lastInput > 4000 && !anim.on && !me.auto && !okey.busy && joy.id == null && !nargHold;
  if (idle && (skip++ % 2)) return;
  const dt = Math.min(0.05, raw / 1000); last = now;
  if (!idle && !TEST) { ftAvg = ftAvg * 0.95 + raw * 0.05; if (++ftN > 90) { ftN = 0; if (ftAvg > 24 && prNow > 0.75) { prNow = Math.max(0.75, prNow - 0.2); renderer.setPixelRatio(prNow); if (composer) composer.setPixelRatio(prNow); } else if (ftAvg < 15 && prNow < prCap) { prNow = Math.min(prCap, prNow + 0.1); renderer.setPixelRatio(prNow); if (composer) composer.setPixelRatio(prNow); } } }
  if (anim.on) {
    const k = Math.max(0, Math.min(1, (now - anim.t0) / anim.dur)), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2, f = anim.f, t = anim.to;
    let dyaw = t.yaw - f.yaw; dyaw = Math.atan2(Math.sin(dyaw), Math.cos(dyaw));
    me.x = f.x + (t.x - f.x) * e; me.z = f.z + (t.z - f.z) * e; me.eye = f.y + (t.y - f.y) * e; me.yaw = f.yaw + dyaw * e; me.pitch = f.pitch + (t.pitch - f.pitch) * e;
    if (k >= 1) { anim.on = false; const d = anim.done; anim.done = null; d && d(); }
  } else if (freeWalk() && !okey.active) {
    let mx = joy.x, mz = joy.y;
    if (keys.KeyW || keys.ArrowUp) mz -= 1; if (keys.KeyS || keys.ArrowDown) mz += 1; if (keys.KeyA) mx -= 1; if (keys.KeyD) mx += 1;
    if (keys.ArrowLeft) me.yaw += dt * 1.8; if (keys.ArrowRight) me.yaw -= dt * 1.8;
    if (me.auto) {
      const a = me.auto, wp = me.path && me.path.length > 1 ? me.path[0] : a, dx = wp.x - me.x, dz = wp.z - me.z, d = Math.hypot(dx, dz), dl = Math.hypot(a.x - me.x, a.z - me.z);
      if (dl <= a.r || now - a.t0 > 15000) { const done = a.done; me.auto = null; me.path = null; if (dl <= a.r + 0.6) done && done(); }
      else if (wp !== a && d < 0.35) me.path.shift();
      else { const ty = Math.atan2(-dx, -dz); let dy = ty - me.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); me.yaw += dy * Math.min(1, dt * 7); mz = -Math.min(1, dl) * Math.max(0.25, Math.cos(dy)); mx = 0; }
      lastInput = now;
    }
    const l = Math.hypot(mx, mz); if (l > 1) { mx /= l; mz /= l; }
    const spd = 2.5 * (l > 0.85 ? 1.15 : 1), sy = Math.sin(me.yaw), cy = Math.cos(me.yaw);
    const vx = (mx * cy + mz * sy) * spd * dt, vz = (-mx * sy + mz * cy) * spd * dt;
    if (vx || vz) {
      const p = moveWith(me, { x: me.x + vx, z: me.z + vz });
      if (me.auto && Math.hypot(p.x - me.x, p.z - me.z) < Math.hypot(vx, vz) * 0.2) { me.auto.stuck = (me.auto.stuck || 0) + dt; if (me.auto.stuck > 0.8) { me.auto = null; me.path = null; } }
      me.x = p.x; me.z = p.z; walkPh += Math.hypot(vx, vz) * 4.2; bob = Math.min(1, bob + dt * 4);
    } else bob = Math.max(0, bob - dt * 4);
    if (meAv && meAv.visible && me.seat < 0) pose(meAv, 'walk', walkPh, bob);
  }
  const by = freeWalk() && !anim.on && !third() ? Math.sin(walkPh) * 0.025 * bob : 0;
  placeCamera(by);
  if (sipAnim) { const k = (now - sipAnim) / 900; handTea.position.set(handTea.userData.x - Math.sin(Math.min(1, k) * Math.PI) * 0.17, -0.27 + Math.sin(Math.min(1, k) * Math.PI) * 0.15, -0.5); handTea.rotation.z = Math.sin(Math.min(1, k) * Math.PI) * 0.6; if (k >= 1) sipAnim = 0; }
  // diğer oyuncular
  for (const o of others.values()) {
    if (!o.seen) continue;
    if (o.seat >= 0 && seats[o.seat]) { sitAt(o.av, seats[o.seat]); o.x = o.tx; o.z = o.tz; }
    else {
      const k = Math.min(1, dt * 8), px = o.x, pz = o.z; o.x += (o.tx - o.x) * k; o.z += (o.tz - o.z) * k;
      let dy = o.tyaw - o.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); o.yaw += dy * k;
      const sp = Math.hypot(o.x - px, o.z - pz) / Math.max(dt, 1e-3); o.ph += sp * dt * 4.2;
      o.av.position.set(o.x, 0, o.z); o.av.rotation.y = o.yaw + Math.PI; pose(o.av, 'walk', o.ph, Math.min(1, sp / 1.5));
      if (sp > 0.05) lastInput = now;
    }
    const u = o.av.userData; if (u.bub && now > u.bubT) { o.av.remove(u.bub); u.bub = null; }
  }
  if (meAv && meAv.userData.bub && now > meAv.userData.bubT) { meAv.remove(meAv.userData.bub); meAv.userData.bub = null; }
  // müdavimler: kıpırtı, arada çay yudumu
  for (const p of NPCS) {
    const n = p.userData.npc; p.userData.a.headYaw = Math.sin(now / 2300 + n.ph) * 0.35;
    if (now > n.next) { avAct(p, p.userData.cup.visible ? 'sip' : 'nod'); n.next = now + 7000 + Math.random() * 12000; }
  }
  avTick = (avTick + 1) % 2;
  for (const g of AVS) { if (!g.visible) continue; const far = Math.hypot(g.position.x - camera.position.x, g.position.z - camera.position.z) > 9; if (far && avTick) continue; g.userData.a.update(far ? dt * 2 : dt); }
  cayciUpdate(now, dt);
  okey.update(now, dt);
  { const g = tableGroups[OKEY_T], d = Math.hypot(g.position.x - me.x, g.position.z - me.z); okeyRing.material.opacity = me.seat < 0 && d < 4 ? (0.25 + Math.sin(now / 400) * 0.12) * Math.min(1, (4 - d)) : 0; }
  if (snow.visible) { const a = snowGeo.attributes.position.array; for (let i = 0; i < SNOW_N; i++) { a[i * 3 + 1] -= dt * (0.6 + (i % 7) * 0.08); a[i * 3] += Math.sin(now / 900 + i) * dt * 0.15; if (a[i * 3 + 1] < -4) snowSpot(i, 8); } snowGeo.attributes.position.needsUpdate = true; }
  // plak dönüyor, nargile köpürüyor, kömür parlıyor
  const spinning = plakPlaying(); plakSpin += ((spinning ? 3.5 : 0) - plakSpin) * Math.min(1, dt * 2); plakDisc.rotation.y -= plakSpin * dt; plakArm.rotation.y += ((spinning ? 0.42 : 0) - plakArm.rotation.y) * Math.min(1, dt * 3);
  if (nargHold && me.narg >= 0) { const w = NARG[me.narg].water; w.scale.y = 1 + Math.sin(now / 40) * 0.08; w.position.y = Math.abs(Math.sin(now / 55)) * 0.004; }
  for (const n of NARG) if (n.lit > now) { const f = 1.8 + Math.sin(now / 300 + n.g.position.z) * 0.5; n.coals.forEach(c => { c.material = M.ember; }); M.ember.emissiveIntensity = f; } else if (n.lit && n.lit <= now) { n.lit = 0; n.coals.forEach(c => c.visible = false); n.flavor = null; n.holes = []; drawFoil(n); if (me.narg >= 0 && NARG[me.narg] === n) { toast(T('Kömür söndü, nargileyi tazele')); nargStep = 'flavor'; nargUI(); } }
  if (fN % 40 === 0) for (const n of NARG) if (n.lit > now) { const p = n.g.position; puff(p.x, p.y + 0.78, p.z, 0, 0, 1, 0xdddddd, 0.35); }
  updateSmoke(dt);
  if ((fN++ % 6) === 0) { ui(); const h = me.watch || okey.active ? null : pick(VW / 2, VH / 2); cross.classList.toggle('hot', !!h && h.k !== 'full' && h.d < 6); }
  sendState(false);
  placeWp();
  if (composer && BLOOM && !lowQ() && !tvObj.visible) composer.render(); else renderer.render(scene, camera);
  if (tvObj.visible) css.render(cssScene, camera);
}

/* ============================================================ başlangıç */
function boot() {
  resize(); applyEnv(); fetchWx(); setInterval(fetchWx, 15 * 60000);
  const st = bakeStatic(); if (TEST) console.log('bake', st.n0, '→', st.n1);
  renderer.shadowMap.needsUpdate = true;
  buildGrid();
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { applyEnv(); lastInput = performance.now(); } else saveSession(); });
  addEventListener('pagehide', saveSession);
  if (!TEST) requestAnimationFrame(t => { last = t; requestAnimationFrame(frame); });
  setTimeout(() => { $('load').classList.add('out'); showHint(); }, 350);
  ui();
  toParent({ type: 'gp-np?' });
  // kurtarma: sayfa yeniden açıldıysa
  const ss = SS.get('kh-ss');
  if (qs.get('oda')) setTimeout(() => netJoin(qs.get('oda')), 500);
  else if (ss && Date.now() - ss.at < 20 * 60000) {
    me.x = ss.x; me.z = ss.z; me.yaw = ss.yaw; if (!inside(me.x, me.z)) { me.x = -5.2; me.z = 6; }
    if (ss.code) setTimeout(() => (ss.host ? netHost(ss.code) : netJoin(ss.code, true)), 600);
    if (ss.tv) setTimeout(() => setVideo(ss.tv, false), 900);
  }
  window.__kh = { tvSt: () => ({ tvId, tvOwner }), netHost, netJoin, rs: () => roomSong, sa: () => shareAudio, cache: songCache, me, seats, okey, sitDown: i => sitDown(seats[i]), standUp, setVideo, enterWatch, exitWatch, takeTea, sip, orderTea, startNarg, setTime: t => { P.time = t; applyEnv(); }, setSnow: v => { P.snow = v; applyEnv(); }, setSeason: v => { P.season = v; applyEnv(); }, setCam: v => { P.cam = v; }, tp: (x, z, yaw, pitch = -0.06) => { me.x = x; me.z = z; me.yaw = yaw; me.pitch = pitch; }, renderer, scene, camera, net: () => NET, others, tapAt, openAvatar, openTvPick, openPlak, NARG, puff, gp: msg => window.postMessage(msg, '*'), tick: (n = 1, ms = 33) => { for (let i = 0; i < n; i++) { lastInput = performance.now(); const t = Math.max(last + ms, performance.now()); tick(t); } } };
}
boot();
