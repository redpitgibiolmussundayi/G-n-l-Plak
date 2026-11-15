/* Gönül Plak · Stuttgart Kıraathanesi (3D)
   Gezilebilen kıraathane: yürü, sandalyeye otur, TV'de video aç, çay al, okey masasına otur.
   Pencerede ana ekrandaki piksel Stuttgart manzarası; gerçek saate ve Stuttgart havasına göre.
   Online: arkadaşların aynı kıraathanede yürür, aynı okey masasına oturur (net.js, MQTT). */
import * as THREE from './kh-three.js';
import { CSS3DRenderer, CSS3DObject } from './kh-css3d.js';

const T = s => (window.gpT ? window.gpT(s) : s);
const $ = id => document.getElementById(id);
const LS = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
const qs = new URLSearchParams(location.search);
const P = Object.assign({ time: 'auto', snow: 'auto', q: 'auto', tv: [], hint: 0 }, LS.get('gp_kh', {}));
const save = () => LS.set('gp_kh', P);
let myName = (qs.get('userName') || '').trim().slice(0, 18) || String((LS.get('gp_okey', {}) || {}).name || '').slice(0, 18);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const TEST = /[?&]khtest=1/.test(location.search);

/* ------------------------------------------------------------ zaman / hava (okey ve ana ekranla aynı) */
const LAT = 48.7758, LNG = 9.1829, RAD = Math.PI / 180, J2000 = 2451545, J0 = 0.0009;
function sunTimes(date) {
  const lw = -LNG * RAD, phi = LAT * RAD, d = date.getTime() / 864e5 - 0.5 + 2440588 - J2000;
  const n = Math.round(d - J0 - lw / (2 * Math.PI)), ds = J0 + lw / (2 * Math.PI) + n;
  const M = RAD * (357.5291 + 0.98560028 * ds), C = RAD * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  const L = M + C + RAD * 102.9372 + Math.PI, dec = Math.asin(Math.sin(L) * Math.sin(RAD * 23.4397));
  const noon = J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
  const fromJ = j => (j + 0.5 - 2440588) * 864e5;
  const at = h => { const w = Math.acos((Math.sin(h * RAD) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec))); const set = J2000 + J0 + (w + lw) / (2 * Math.PI) + n + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L); return [fromJ(noon - (set - noon)), fromJ(set)]; };
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
function viewFile(ph) {
  if (!overcast()) return `stg-sonbahar-${ph}.webp`;
  return `stg-sonbahar-${ph === 'gece' ? 'kapali-gece' : ph === 'sabah' ? 'kapali-sabah' : ph === 'gunduz' ? 'kapali-gunduz' : 'kapali-aksam'}.webp`;
}

/* ------------------------------------------------------------ renderer */
const lowQ = () => P.q === 'low';
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x000000, 1);
$('gl').appendChild(renderer.domElement);
const css = new CSS3DRenderer(); $('css').appendChild(css.domElement);
const scene = new THREE.Scene(), cssScene = new THREE.Scene();
scene.background = new THREE.Color(0x0d1220);
const camera = new THREE.PerspectiveCamera(65, 1, 0.05, 200); camera.rotation.order = 'YXZ'; scene.add(camera);
const MAXA = Math.min(4, renderer.capabilities.getMaxAnisotropy());

let seed = 11; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
function cvs(w, h, fn) { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return c; }
function mkTex(c, rx = 1, ry = 1, srgb = true) { const t = new THREE.CanvasTexture(c); if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); t.anisotropy = MAXA; return t; }
function uvScale(g, sx, sy) { const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * sx, uv.getY(i) * sy); return g; }
const loader = new THREE.TextureLoader();
function imgTex(src) { const t = loader.load(src); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = MAXA; return t; }

/* ------------------------------------------------------------ dokular (hepsi kodla çizilir; küçük ve hızlı) */
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
  const sky = [[60, 340], [110, 340], [110, 318], [140, 318], [140, 300], [150, 290], [160, 300], [160, 318], [220, 318], [220, 296], [250, 296], [250, 270], [262, 250], [274, 270], [274, 296], [330, 296], [330, 322], [400, 322], [400, 306], [440, 290], [480, 306], [480, 322], [560, 322], [560, 300], [600, 300], [600, 280], [640, 280], [640, 312], [720, 312], [720, 296], [760, 296], [760, 330], [960, 330]];
  sky.forEach(p => x.lineTo(p[0], p[1])); x.stroke();
}));
function nameTex(name, color = '#ffd894') {
  return mkTex(cvs(512, 128, x => {
    x.font = '600 54px -apple-system,Segoe UI,Roboto,sans-serif'; const w = Math.min(480, x.measureText(name).width + 50);
    x.fillStyle = 'rgba(14,10,8,.72)'; x.beginPath(); x.roundRect((512 - w) / 2, 22, w, 84, 30); x.fill();
    x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 256, 66);
  }));
}
function glowTex() { return mkTex(cvs(128, 128, x => { const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(255,220,160,1)'); g.addColorStop(0.25, 'rgba(255,190,110,.45)'); g.addColorStop(1, 'rgba(255,160,80,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); })); }
const texGlow = glowTex();
const texBlob = mkTex(cvs(128, 128, x => { const g = x.createRadialGradient(64, 64, 6, 64, 64, 64); g.addColorStop(0, 'rgba(0,0,0,.55)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); }));
const texTvIdle = mkTex(cvs(640, 360, x => {
  const g = x.createLinearGradient(0, 0, 640, 360); g.addColorStop(0, '#1b2440'); g.addColorStop(1, '#3a1420'); x.fillStyle = g; x.fillRect(0, 0, 640, 360);
  x.fillStyle = '#ffd894'; x.textAlign = 'center'; x.font = '700 52px Georgia,serif'; x.fillText('Gönül TV', 320, 160);
  x.fillStyle = 'rgba(255,255,255,.85)'; x.font = '500 30px -apple-system,Segoe UI,Roboto,sans-serif'; x.fillText('▶  ' + T('Dokun, video aç'), 320, 225);
}));

/* ------------------------------------------------------------ malzemeler */
const std = (o) => new THREE.MeshStandardMaterial(o);
const M = {
  wall: std({ map: texWall, roughness: 0.78, shadowSide: THREE.DoubleSide }),
  dark: std({ map: texDark, roughness: 0.7 }),
  ceil: std({ map: texCeil, roughness: 0.85, shadowSide: THREE.DoubleSide }),
  floor: std({ map: texFloor, roughness: 0.5 }),
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
  win: new THREE.MeshBasicMaterial({ color: 0xa8c4d8, transparent: true, opacity: 0.05, depthWrite: false })
};
M.bulb = new THREE.MeshStandardMaterial({ color: 0xffe0a8, emissive: 0xffc770, emissiveIntensity: 3 });
M.lampIn = new THREE.MeshStandardMaterial({ color: 0x3a2a1a, emissive: 0xffb860, emissiveIntensity: 0.7, side: THREE.BackSide });

/* ------------------------------------------------------------ yardımcılar */
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

/* ------------------------------------------------------------ oda: 17 m × 15 m, tavan 3.5 m */
const XL = -8.5, XR = 8.5, ZB = -7.5, ZF = 7.5, H = 3.5, WIN0 = 0.95, WIN1 = 3.05, BWX = -3.2, RWZ = 4.5;
const W = 1.28; // ahşap doku tekrar boyu (m)
function wallPlane(w, h, x, y, z, ry, mat = M.wall) {
  const g = uvScale(new THREE.PlaneGeometry(w, h), w / W, h / W); const m = new THREE.Mesh(g, mat);
  m.position.set(x, y, z); m.rotation.y = ry; m.receiveShadow = true; m.castShadow = true; scene.add(m); return m;
}
// zemin
{ const g = uvScale(new THREE.PlaneGeometry(XR - XL, ZF - ZB), (XR - XL) / 2.2, (ZF - ZB) / 2.2); const f = new THREE.Mesh(g, M.floor); f.rotation.x = -Math.PI / 2; f.receiveShadow = true; scene.add(f); }
// tavan
{ const g = uvScale(new THREE.PlaneGeometry(XR - XL, ZF - ZB), (XR - XL) / 1.4, (ZF - ZB) / 1.4); const c = new THREE.Mesh(g, M.ceil); c.rotation.x = Math.PI / 2; c.position.y = H; c.castShadow = true; scene.add(c); }
// duvarlar
wallPlane(ZF - ZB, H, XL, H / 2, 0, Math.PI / 2);              // sol
wallPlane(XR - XL, H, 0, H / 2, ZF, Math.PI);                    // ön (TV duvarı)
wallPlane(BWX - XL, H, (XL + BWX) / 2, H / 2, ZB, 0);            // arka sol (portre duvarı)
wallPlane(ZF - RWZ, H, XR, H / 2, (RWZ + ZF) / 2, -Math.PI / 2); // sağ ön
// pencere altı / üstü
wallPlane(XR - BWX, WIN0, (BWX + XR) / 2, WIN0 / 2, ZB, 0); wallPlane(XR - BWX, H - WIN1, (BWX + XR) / 2, (H + WIN1) / 2, ZB, 0);
wallPlane(RWZ - ZB, WIN0, XR, WIN0 / 2, (ZB + RWZ) / 2, -Math.PI / 2); wallPlane(RWZ - ZB, H - WIN1, XR, (H + WIN1) / 2, (ZB + RWZ) / 2, -Math.PI / 2);
// süpürgelik + duvar ortası çıta
for (const [w, x, z, ry] of [[ZF - ZB, XL + 0.02, 0, Math.PI / 2], [XR - XL, 0, ZF - 0.02, 0], [BWX - XL, (XL + BWX) / 2, ZB + 0.02, 0], [XR - BWX, (BWX + XR) / 2, ZB + 0.02, 0], [RWZ - ZB, XR - 0.02, (ZB + RWZ) / 2, Math.PI / 2], [ZF - RWZ, XR - 0.02, (RWZ + ZF) / 2, Math.PI / 2]]) {
  const b = box(w, 0.12, 0.03, M.dark, x, 0.06, z, scene, false); b.rotation.y = ry;
}
for (const [w, x, z, ry] of [[ZF - ZB, XL + 0.025, 0, Math.PI / 2], [XR - XL, 0, ZF - 0.025, 0], [BWX - XL, (XL + BWX) / 2, ZB + 0.025, 0], [ZF - RWZ, XR - 0.025, (RWZ + ZF) / 2, Math.PI / 2]]) {
  const b = box(w, 0.05, 0.05, M.dark, x, 1.02, z, scene, false); b.rotation.y = ry;
}
// pencere pervazları, kayıtlar
const winParts = [];
{
  box(XR - BWX, 0.05, 0.3, M.dark, (BWX + XR) / 2, WIN0, ZB + 0.12); box(0.3, 0.05, RWZ - ZB, M.dark, XR - 0.12, WIN0, (ZB + RWZ) / 2);
  const nb = 6; for (let i = 0; i <= nb; i++) { const x = BWX + (XR - BWX) * i / nb; winParts.push(box(i === 0 || i === nb ? 0.22 : 0.12, WIN1 - WIN0, 0.16, M.dark, x, (WIN0 + WIN1) / 2, ZB + 0.06)); }
  const nr = 6; for (let i = 0; i <= nr; i++) { const z = ZB + (RWZ - ZB) * i / nr; winParts.push(box(0.16, WIN1 - WIN0, i === 0 || i === nr ? 0.22 : 0.12, M.dark, XR - 0.06, (WIN0 + WIN1) / 2, z)); }
  winParts.push(box(XR - BWX, 0.08, 0.12, M.dark, (BWX + XR) / 2, 2.62, ZB + 0.06), box(0.12, 0.08, RWZ - ZB, M.dark, XR - 0.06, 2.62, (ZB + RWZ) / 2));
  winParts.push(box(XR - BWX, 0.1, 0.16, M.dark, (BWX + XR) / 2, WIN1, ZB + 0.06), box(0.16, 0.1, RWZ - ZB, M.dark, XR - 0.06, WIN1, (ZB + RWZ) / 2));
  const g1 = new THREE.Mesh(new THREE.PlaneGeometry(XR - BWX, WIN1 - WIN0), M.win); g1.position.set((BWX + XR) / 2, (WIN0 + WIN1) / 2, ZB + 0.02); scene.add(g1);
  const g2 = new THREE.Mesh(new THREE.PlaneGeometry(RWZ - ZB, WIN1 - WIN0), M.win); g2.position.set(XR - 0.02, (WIN0 + WIN1) / 2, (ZB + RWZ) / 2); g2.rotation.y = -Math.PI / 2; scene.add(g2);
}
// tavan kirişleri
for (let x = -7.2; x <= 7.3; x += 2.4) box(0.2, 0.26, ZF - ZB, M.dark, x, H - 0.13, 0, scene, false);
for (const z of [-5, -1.6, 1.8, 5.2]) box(XR - XL, 0.2, 0.18, M.dark, 0, H - 0.36, z, scene, false);
// pencere dışı ağaç gölgeleri gibi dallar (hafif): yok — manzara resminde zaten ağaç var

/* ------------------------------------------------------------ manzara (piksel Stuttgart, panorama) */
const PR = 40;
const panoCanvas = document.createElement('canvas'); panoCanvas.width = 2968; panoCanvas.height = 630;
const panoTex = new THREE.CanvasTexture(panoCanvas); panoTex.colorSpace = THREE.SRGBColorSpace; panoTex.magFilter = THREE.NearestFilter; panoTex.minFilter = THREE.LinearFilter; panoTex.generateMipmaps = false;
panoTex.wrapS = THREE.RepeatWrapping; panoTex.repeat.x = -1; panoTex.offset.x = 1;
const PANO_T0 = -0.15, PANO_TL = 4.0, PANO_H = PR * PANO_TL * 630 / 2968, PANO_Y0 = -4.0;
const pano = new THREE.Mesh(new THREE.CylinderGeometry(PR, PR, PANO_H, 96, 1, true, PANO_T0, PANO_TL), new THREE.MeshBasicMaterial({ map: panoTex, side: THREE.BackSide, toneMapped: false, fog: false }));
pano.position.y = PANO_Y0 + PANO_H / 2; scene.add(pano);
const ground = new THREE.Mesh(new THREE.CircleGeometry(PR + 5, 48), new THREE.MeshBasicMaterial({ color: 0x1a1612, toneMapped: false })); ground.rotation.x = -Math.PI / 2; ground.position.y = PANO_Y0 + 0.3; scene.add(ground);
let panoKey = '', skyCol = new THREE.Color(0x0d1220);
function buildPano(img) {
  const x = panoCanvas.getContext('2d'), sw = img.naturalWidth, sh = img.naturalHeight, ch = Math.round(sh * 630 / 941), cut = Math.round(sw * 0.742), rw = sw - cut;
  x.imageSmoothingEnabled = false; x.clearRect(0, 0, 2968, 630);
  x.drawImage(img, 0, 0, sw, ch, 0, 0, 1672, 630);
  const k = 1672 / sw, seg = Math.round(rw * k);
  for (let i = 0; i < 3; i++) {
    const dx = 1672 + i * seg; x.save();
    if (i % 2 === 0) { x.translate(dx + seg, 0); x.scale(-1, 1); x.drawImage(img, cut, 0, rw, ch, 0, 0, seg, 630); } else x.drawImage(img, cut, 0, rw, ch, dx, 0, seg, 630);
    x.restore();
  }
  panoTex.needsUpdate = true;
  const d = x.getImageData(700, 2, 300, 4).data; let r = 0, g = 0, b = 0; for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; } const n = d.length / 4;
  skyCol.setRGB(r / n / 255, g / n / 255, b / n / 255, THREE.SRGBColorSpace); scene.background = skyCol;
  const e = x.getImageData(800, 620, 400, 6).data; r = g = b = 0; for (let i = 0; i < e.length; i += 4) { r += e[i]; g += e[i + 1]; b += e[i + 2]; }
  ground.material.color.setRGB(r / (e.length / 4) / 255, g / (e.length / 4) / 255, b / (e.length / 4) / 255, THREE.SRGBColorSpace);
}
function loadPano(ph) {
  const f = viewFile(ph); if (f === panoKey) return; panoKey = f;
  const im = new Image(); im.onload = () => { if (panoKey === f) buildPano(im); }; im.src = f;
}

/* ------------------------------------------------------------ masalar, sandalyeler */
const TABLES = [[-6.2, -5.3], [-2.4, -5.3], [1.0, -5.3], [4.3, -5.3], [7.2, -5.2], [-6.0, -2.0], [1.3, -2.3], [4.6, -2.1], [7.2, -1.8], [-5.6, 1.4], [7.2, 1.6], [-3.4, 4.9], [1.2, 5.0], [5.0, 4.7]];
const OKEY_T = 13;
const colliders = []; // {c:[x,z,r]} | {b:[x0,z0,x1,z1]}
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
TABLES.forEach(([tx, tz], ti) => {
  const g = new THREE.Group(); g.position.set(tx, 0, tz); g.rotation.y = (rnd() - 0.5) * 0.08; scene.add(g); tableGroups.push(g);
  const top = new THREE.Mesh(clothTopG, ti === 6 || ti === 2 ? M.cloth2 : M.cloth); top.position.y = 0.785; top.receiveShadow = true; top.castShadow = true; g.add(top); top.userData.table = ti; clothMeshes.push(top);
  const side = new THREE.Mesh(clothSideG, M.clothSide); side.position.y = 0.635; side.castShadow = true; side.receiveShadow = true; g.add(side); side.userData.table = ti; clothMeshes.push(side);
  box(0.09, 0.48, 0.09, M.iron, 0, 0.24, 0, g); box(0.6, 0.03, 0.07, M.iron, 0, 0.015, 0, g, false); box(0.07, 0.03, 0.6, M.iron, 0, 0.015, 0, g, false);
  const ash = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.065, 0.028, 18), M.steel); ash.position.set(0.12, 0.8, -0.1); g.add(ash);
  const bl = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6), new THREE.MeshBasicMaterial({ map: texBlob, transparent: true, depthWrite: false })); bl.rotation.x = -Math.PI / 2; bl.position.y = 0.004; g.add(bl);
  colliders.push({ c: [tx, tz, 1.08] });
  [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(([dx, dz], si) => {
    const j = (rnd() - 0.5) * 0.12, d = 0.8 + rnd() * 0.08, ry = Math.atan2(-dx, -dz) + (rnd() - 0.5) * 0.22;
    const lx = dx * d + j * dz, lz = dz * d + j * dx, wpos = new THREE.Vector3(lx, 0, lz).applyAxisAngle(new THREE.Vector3(0, 1, 0), g.rotation.y).add(g.position);
    const yaw = ry + g.rotation.y;
    seats.push({ id: seats.length, t: ti, x: wpos.x, z: wpos.z, yaw, okey: ti === OKEY_T, npc: false, by: null });
    chairMats.push(mtx(wpos.x, 0, wpos.z, 0, yaw));
  });
  if (ti === OKEY_T) okeyProps(g);
  if (rnd() < 0.55 && ti !== OKEY_T) { const n = 1 + (rnd() * 2 | 0); for (let i = 0; i < n; i++) teaGlass(g, (rnd() - 0.5) * 0.7, 0.79, (rnd() - 0.5) * 0.7); }
});
const chairIM = new THREE.InstancedMesh(chairFrame, M.chair, seats.length), padIM = new THREE.InstancedMesh(chairPad, M.leather, seats.length);
chairMats.forEach((m, i) => { chairIM.setMatrixAt(i, m); padIM.setMatrixAt(i, m); });
chairIM.castShadow = padIM.castShadow = true; chairIM.receiveShadow = padIM.receiveShadow = true; scene.add(chairIM, padIM);

function teaGlass(parent, x, y, z, full = true) {
  const g = new THREE.Group(); g.position.set(x, y, z);
  const sau = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.045, 0.01, 20), M.white); sau.position.y = 0.005; g.add(sau);
  const prof = [[0.001, 0.01], [0.026, 0.01], [0.03, 0.03], [0.022, 0.05], [0.024, 0.07], [0.033, 0.095], [0.034, 0.1]];
  const gl = new THREE.Mesh(lathe(prof, 16), M.glass); g.add(gl);
  if (full) { const t = new THREE.Mesh(lathe([[0.001, 0.012], [0.024, 0.012], [0.028, 0.03], [0.02, 0.05], [0.022, 0.07], [0.029, 0.088], [0.001, 0.088]], 14), M.tea); g.add(t); g.userData.tea = t; }
  parent.add(g); return g;
}
function okeyProps(g) {
  const tiles = [];
  [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(([dx, dz]) => {
    const r = new THREE.Group(); r.position.set(dx * 0.42, 0.79, dz * 0.42); r.rotation.y = Math.atan2(dx, dz); g.add(r);
    box(0.62, 0.025, 0.09, M.dark, 0, 0.012, 0, r, false); const back = box(0.62, 0.07, 0.015, M.dark, 0, 0.05, 0.04, r, false); back.rotation.x = -0.25;
    for (let i = 0; i < 13; i++) tiles.push(mtx(dx * 0.42 + Math.cos(r.rotation.y) * (-0.28 + i * 0.045) + Math.sin(r.rotation.y) * 0.02, 0.85, dz * 0.42 - Math.sin(r.rotation.y) * (-0.28 + i * 0.045) + Math.cos(r.rotation.y) * 0.02, -0.25, r.rotation.y));
  });
  for (let i = 0; i < 18; i++) tiles.push(mtx((rnd() - 0.5) * 0.25, 0.8 + (i % 3) * 0.012, (rnd() - 0.5) * 0.18, -Math.PI / 2, rnd() * 3, 0));
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(0.038, 0.052, 0.012), M.tile, tiles.length); tiles.forEach((m, i) => im.setMatrixAt(i, m)); g.add(im);
  const ring = new THREE.Mesh(new THREE.RingGeometry(1.35, 1.5, 48), new THREE.MeshBasicMaterial({ color: 0xffc56a, transparent: true, opacity: 0.0, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.01; g.add(ring); g.userData.ring = ring;
}

/* ------------------------------------------------------------ halılar */
for (const [x, z, w, d, r, k] of [[-1.6, 0.9, 1.9, 4.4, 0.12, 0], [3.0, 1.2, 1.7, 4.6, -0.45, 1], [-3.6, 2.4, 1.6, 3.0, 0.95, 2]]) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), std({ map: texRugs[k], roughness: 0.97 })); m.rotation.x = -Math.PI / 2; m.rotation.z = r; m.position.set(x, 0.006 + k * 0.001, z); m.receiveShadow = true; scene.add(m);
}

/* ------------------------------------------------------------ lambalar + ışıklar */
const lampPos = TABLES.map(([x, z]) => [x, z]).concat([[-1.6, 0.9], [3.0, 1.0], [-6.6, 5.5]]);
const lights = [], bulbs = [], glows = [];
const domeG = new THREE.SphereGeometry(0.25, 24, 10, 0, Math.PI * 2, 0, Math.PI * 0.47), inG = new THREE.SphereGeometry(0.235, 20, 8, 0, Math.PI * 2, 0, Math.PI * 0.47);
lampPos.forEach(([x, z], i) => {
  const y = 2.6, g = new THREE.Group(); g.position.set(x, y, z); scene.add(g);
  const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, H - y - 0.15, 6), M.black); cord.position.y = (H - y) / 2 + 0.1; g.add(cord);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.045, 0.1, 12), M.brass); cap.position.y = 0.27; g.add(cap);
  const dome = new THREE.Mesh(domeG, M.lampOut); dome.position.y = 0.02; g.add(dome);
  const inn = new THREE.Mesh(inG, M.lampIn); inn.position.y = 0.02; g.add(inn);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.008, 6, 32), M.brass); rim.rotation.x = Math.PI / 2; rim.position.y = 0.04; g.add(rim);
  const b = new THREE.Mesh(new THREE.SphereGeometry(0.05, 14, 10), M.bulb); b.position.y = 0.0; g.add(b); bulbs.push(b);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: texGlow, color: 0xffc070, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.7 })); sp.scale.set(0.9, 0.9, 1); sp.position.y = -0.04; g.add(sp); glows.push(sp);
});
const LIGHT_AT = [1, 3, 5, 6, 9, 10, 12, 13, 15, 16];
for (const i of LIGHT_AT) { const [x, z] = lampPos[i]; const l = new THREE.PointLight(0xffb867, 6, 9, 1.4); l.position.set(x, 2.45, z); scene.add(l); lights.push(l); }
const hemi = new THREE.HemisphereLight(0x8a90b0, 0x2a160a, 0.35); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff0dc, 0); sun.position.set(14, 8, -12); sun.target.position.set(0, 0, 0); scene.add(sun, sun.target);
sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 1, far: 50 }); sun.shadow.bias = -0.0008; sun.shadow.normalBias = 0.03;
// ortam yansıması (metaller için): sıcak bir oda
{
  const es = new THREE.Scene(); es.background = new THREE.Color(0x2a1a10);
  const bx = new THREE.Mesh(new THREE.BoxGeometry(20, 8, 20), new THREE.MeshBasicMaterial({ color: 0x3a2414, side: THREE.BackSide })); es.add(bx);
  for (let i = 0; i < 6; i++) { const l = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffd9a0 })); l.position.set(-6 + i * 2.4, 3, (i % 2 ? -3 : 3)); es.add(l); }
  const w = new THREE.Mesh(new THREE.PlaneGeometry(16, 3), new THREE.MeshBasicMaterial({ color: 0x8090b0 })); w.position.set(0, 2, -9.9); es.add(w);
  const pm = new THREE.PMREMGenerator(renderer); scene.environment = pm.fromScene(es, 0.04).texture; pm.dispose();
}
scene.environmentIntensity = 0.35;

/* ------------------------------------------------------------ çay ocağı (sol ön) */
const COUNTER = [-7.6, 3.3, -6.55, 7.45];
const teaSpot = new THREE.Vector3(-6.9, 1.0, 5.2);
{
  const [x0, z0, x1, z1] = COUNTER, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  box(x1 - x0, 1.0, z1 - z0, M.wall, cx, 0.5, cz); box(x1 - x0 + 0.08, 0.05, z1 - z0 + 0.06, M.dark, cx, 1.025, cz);
  const run = new THREE.Mesh(uvScale(new THREE.PlaneGeometry(0.8, z1 - z0 - 0.2), 1, 3), std({ map: texCloth, roughness: 0.92 })); run.rotation.x = -Math.PI / 2; run.position.set(cx + 0.05, 1.052, cz); run.receiveShadow = true; scene.add(run);
  const runSide = box(0.01, 0.22, z1 - z0 - 0.2, std({ map: texClothSide, roughness: 0.92 }), x1 + 0.045, 0.95, cz, scene, false);
  colliders.push({ b: [x0 - 0.2, z0, x1, z1] });
  const kettle = [[0.001, 0], [0.12, 0], [0.145, 0.03], [0.15, 0.12], [0.13, 0.2], [0.07, 0.235], [0.06, 0.25], [0.001, 0.25]];
  const pot = [[0.001, 0], [0.07, 0], [0.09, 0.04], [0.088, 0.1], [0.05, 0.13], [0.04, 0.14], [0.03, 0.15], [0.001, 0.16]];
  const sets = [[-7.05, 6.6], [-7.05, 5.5], [-7.05, 4.3]];
  sets.forEach(([x, z], i) => {
    const g = new THREE.Group(); g.position.set(x, 1.055, z); scene.add(g);
    const k = new THREE.Mesh(lathe(kettle), M.steel); k.castShadow = true; g.add(k);
    const p = new THREE.Mesh(lathe(pot), M.steel); p.position.y = 0.25; p.castShadow = true; g.add(p);
    const h1 = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.01, 8, 20, Math.PI), M.steel); h1.position.y = 0.22; h1.rotation.y = Math.PI / 2; g.add(h1);
    const sp = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.016, 0.16, 8), M.steel); sp.position.set(0.12, 0.33, 0); sp.rotation.z = -0.9; g.add(sp);
    const h2 = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.008, 8, 16, Math.PI * 1.2), M.steel); h2.position.set(-0.09, 0.32, 0); h2.rotation.z = Math.PI / 2; g.add(h2);
    g.userData.tea = 1;
  });
  const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.015, 28), M.steel); tray.position.set(-6.95, 1.06, 3.8); scene.add(tray);
  for (let i = 0; i < 6; i++) teaGlass(scene, -6.95 + Math.cos(i) * 0.12, 1.068, 3.8 + Math.sin(i) * 0.12, false);
  const bx = box(0.5, 0.32, 0.5, M.dark, -7.15, 1.21, 7.0); bx.userData.tea = 1;
}

/* ------------------------------------------------------------ sol duvar: fotoğraf, kitaplık, sarmaşık · arka duvar: portre */
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
portrait.userData.portre = 1;
box(0.5, 0.025, 0.06, M.brass, -5.9, 3.05, ZB + 0.12, scene, false);
for (let c = 0; c < 2; c++) for (let r = 0; r < 5; r++) {
  const t = texFoto.clone(); t.repeat.set(0.35, 0.3); t.offset.set(rnd() * 0.6, rnd() * 0.65); t.needsUpdate = true;
  pframe(0.34, 0.26, M.black, std({ map: t, roughness: 0.6, color: 0xe8dcc8 }), -4.5 + c * 0.55, 2.75 - r * 0.42, ZB + 0.03, 0, 0.03, 0.03);
}
for (let c = 0; c < 2; c++) for (let r = 0; r < 3; r++) {
  const t = texFoto.clone(); t.repeat.set(0.3, 0.3); t.offset.set(rnd() * 0.65, rnd() * 0.65); t.needsUpdate = true;
  pframe(0.34, 0.26, M.black, std({ map: t, roughness: 0.6, color: 0xe8dcc8 }), -7.75 + c * 0.55, 2.55 - r * 0.42, ZB + 0.03, 0, 0.03, 0.03);
}
// kitaplık (sol duvar, arkaya yakın)
{
  const x0 = XL, x1 = XL + 0.4, z0 = -6.9, z1 = -4.2, h = 2.5, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  box(0.03, h, z1 - z0, M.dark, x0 + 0.015, h / 2, cz, scene, false);
  box(x1 - x0, h, 0.04, M.dark, cx, h / 2, z0); box(x1 - x0, h, 0.04, M.dark, cx, h / 2, z1);
  box(x1 - x0, 0.04, z1 - z0, M.dark, cx, h, cz);
  const books = [], cols = [0x6b1a1a, 0x1f3a2a, 0x22314f, 0x5a3a1a, 0xc9b88a, 0x7a2a12, 0x2a2a2a, 0x8a6a2a, 0x3a1a2a];
  const levels = [0.05, 0.5, 0.95, 1.4, 1.85];
  levels.forEach((ly, li) => {
    box(x1 - x0, 0.03, z1 - z0, M.dark, cx, ly, cz, scene, false);
    if (li === 0) box(0.02, 0.48, z1 - z0, M.dark, x1 - 0.01, 0.26, cz, scene, false);
    if (li === 0) return;
    let z = z0 + 0.05; while (z < z1 - 0.08) { const w = 0.025 + rnd() * 0.035, hh = 0.2 + rnd() * 0.12, d = 0.18 + rnd() * 0.08; books.push([cx + 0.04 - (0.24 - d) / 2, ly + 0.015 + hh / 2, z + w / 2, w, hh, d, cols[(rnd() * cols.length) | 0], rnd() < 0.08 ? 0.25 : 0]); z += w + 0.003; if (rnd() < 0.05) z += 0.12; }
  });
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), std({ roughness: 0.75 }), books.length), c = new THREE.Color();
  books.forEach(([x, y, z, w, hh, d, col, tilt], i) => { im.setMatrixAt(i, new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(tilt, 0, 0)), new THREE.Vector3(d, hh, w))); im.setColorAt(i, c.set(col).multiplyScalar(0.8 + rnd() * 0.4)); });
  im.castShadow = true; scene.add(im);
  colliders.push({ b: [x0, z0, x1 + 0.05, z1] });
  // sarmaşık
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.16, 0.26, 16), M.terra); pot.position.set(XL + 0.3, 2.68, -3.85); scene.add(pot);
  for (const [z, y, h2, w2, ry] of [[-3.85, 1.8, 1.9, 0.75, Math.PI / 2], [-3.85, 1.85, 1.8, 0.6, Math.PI / 2 + 0.9], [-4.4, 2.6, 0.7, 1.2, Math.PI / 2], [-3.3, 2.0, 1.4, 0.5, 0.4]]) {
    const l = new THREE.Mesh(new THREE.PlaneGeometry(w2, h2), M.leaf); l.position.set(XL + 0.3, y, z); l.rotation.y = ry; scene.add(l);
  }
  for (const [z, ry] of [[-2.0, 0.3], [-1.2, -0.4]]) { const l = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 2.2), M.leaf); l.position.set(XL + 0.12, 2.3, z); l.rotation.y = Math.PI / 2 + ry; scene.add(l); }
  // pencerelerde sarkan bitkiler
  for (const [x, z, ry] of [[BWX + 0.35, ZB + 0.35, 0], [XR - 0.3, -1.5, Math.PI / 2], [XR - 0.3, 3.2, Math.PI / 2], [4.6, ZB + 0.3, 0]]) {
    const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.11, 0.18, 14), M.terra); p2.position.set(x, 3.1, z); scene.add(p2);
    const l = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 1.1), M.leaf); l.position.set(x, 2.6, z); l.rotation.y = ry; scene.add(l);
    const l2 = l.clone(); l2.rotation.y = ry + Math.PI / 2; scene.add(l2);
  }
}
// tabela
{
  const g = new THREE.Group(); g.position.set(1.4, 2.55, -1.6); scene.add(g);
  const sb = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.66, 0.04), [M.dark, M.dark, M.dark, M.dark, std({ map: texSign, roughness: 0.5, metalness: 0.2 }), std({ map: texSign, roughness: 0.5, metalness: 0.2 })]);
  g.add(sb);
  for (const s of [-0.6, 0.6]) { const ch = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, H - 2.55 - 0.33 - 0.35, 6), M.iron); ch.position.set(s, 0.33 + (H - 2.55 - 0.33 - 0.35) / 2, 0); g.add(ch); }
}
// TV (ön duvar)
const TV = { x: 0.9, y: 2.15, z: ZF - 0.05, w: 1.8, h: 1.012 };
let tvHole, tvIdle, tvObj, tvEl;
{
  box(TV.w + 0.08, TV.h + 0.08, 0.06, M.black, TV.x, TV.y, ZF - 0.03);
  tvIdle = new THREE.Mesh(new THREE.PlaneGeometry(TV.w, TV.h), new THREE.MeshBasicMaterial({ map: texTvIdle, toneMapped: false })); tvIdle.position.set(TV.x, TV.y, TV.z - 0.012); tvIdle.rotation.y = Math.PI; scene.add(tvIdle);
  tvHole = new THREE.Mesh(new THREE.PlaneGeometry(TV.w, TV.h), new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: false, blending: THREE.NoBlending })); tvHole.position.copy(tvIdle.position); tvHole.rotation.y = Math.PI; tvHole.visible = false; scene.add(tvHole);
  tvIdle.userData.tv = tvHole.userData.tv = 1;
  box(0.2, 0.06, 0.25, M.iron, TV.x, TV.y - TV.h / 2 - 0.1, ZF - 0.13, scene, false);
  box(2.2, 0.5, 0.45, M.dark, TV.x, 0.25, ZF - 0.23); colliders.push({ b: [TV.x - 1.1, ZF - 0.46, TV.x + 1.1, ZF] });
  tvEl = document.createElement('div'); tvEl.style.cssText = 'width:960px;height:540px;background:#000';
  tvObj = new CSS3DObject(tvEl); tvObj.position.copy(tvIdle.position); tvObj.rotation.y = Math.PI; tvObj.scale.setScalar(TV.w / 960); cssScene.add(tvObj); tvObj.visible = false;
}
// kapı (ön sağ)
{
  box(1.1, 2.3, 0.06, M.dark, 6.8, 1.15, ZF - 0.03);
  const gw = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.9), new THREE.MeshBasicMaterial({ color: 0x1a2030 })); gw.position.set(6.8, 1.65, ZF - 0.065); gw.rotation.y = Math.PI; scene.add(gw);
  const hd = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.25, 8), M.brass); hd.position.set(6.4, 1.1, ZF - 0.09); scene.add(hd);
}

/* ------------------------------------------------------------ kar (pencere dışında) */
const SNOW_N = 700;
const snowGeo = new THREE.BufferGeometry(), snowPos = new Float32Array(SNOW_N * 3);
function snowSpot(i, y) {
  if (rnd() < 0.55) { snowPos[i * 3] = -4 + rnd() * 24; snowPos[i * 3 + 2] = ZB - 0.6 - rnd() * 12; } else { snowPos[i * 3] = XR + 0.6 + rnd() * 12; snowPos[i * 3 + 2] = ZB - 0.6 + rnd() * (RWZ - ZB + 2); }
  snowPos[i * 3 + 1] = y == null ? -4 + rnd() * 12 : y;
}
for (let i = 0; i < SNOW_N; i++) snowSpot(i);
snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));
const snowTex = mkTex(cvs(32, 32, x => { const g = x.createRadialGradient(16, 16, 0, 16, 16, 16); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 32, 32); }));
const snow = new THREE.Points(snowGeo, new THREE.PointsMaterial({ size: 0.07, map: snowTex, transparent: true, depthWrite: false, color: 0xffffff, toneMapped: false }));
snow.visible = false; scene.add(snow);

/* ------------------------------------------------------------ insanlar (oyuncular + müdavimler) */
function makePerson(o) {
  const g = new THREE.Group(), m = c => std({ color: c, roughness: 0.82 }), skin = m(o.skin || 0xc99a78);
  const hip = new THREE.Group(); hip.position.y = 0.92; g.add(hip);
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.56, 0.22), m(o.shirt)); torso.position.y = 0.3; torso.castShadow = true; hip.add(torso);
  if (o.vest) { const v = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.24), m(o.vest)); v.position.y = 0.33; hip.add(v); }
  const legs = [], arms = [];
  for (const s of [-1, 1]) {
    const th = new THREE.Group(); th.position.set(s * 0.1, 0, 0); hip.add(th);
    const t1 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.46, 0.17), m(o.pants || 0x2a2a30)); t1.position.y = -0.23; t1.castShadow = true; th.add(t1);
    const kn = new THREE.Group(); kn.position.y = -0.46; th.add(kn);
    const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.42, 0.14), m(o.pants || 0x2a2a30)); s1.position.y = -0.21; kn.add(s1);
    const ft = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.24), m(0x15100c)); ft.position.set(0, -0.43, 0.05); kn.add(ft);
    legs.push({ th, kn });
    const sh = new THREE.Group(); sh.position.set(s * 0.26, 0.54, 0); hip.add(sh);
    const a1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 0.11), m(o.vest && o.sleeve ? o.sleeve : o.shirt)); a1.position.y = -0.15; sh.add(a1);
    const el = new THREE.Group(); el.position.y = -0.3; sh.add(el);
    const a2 = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.27, 0.1), m(o.vest && o.sleeve ? o.sleeve : o.shirt)); a2.position.y = -0.13; el.add(a2);
    const hd = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.09, 0.09), skin); hd.position.y = -0.3; el.add(hd);
    arms.push({ sh, el });
  }
  const head = new THREE.Group(); head.position.y = 0.6; hip.add(head);
  const nk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.08, 10), skin); nk.position.y = 0.03; head.add(nk);
  const hh = new THREE.Mesh(new THREE.SphereGeometry(0.12, 18, 14), skin); hh.scale.set(0.95, 1.12, 1); hh.position.y = 0.17; hh.castShadow = true; head.add(hh);
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.126, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.45), m(o.hair || 0x17100b)); hair.scale.set(0.95, 1.12, 1.02); hair.position.set(0, 0.18, -0.008); head.add(hair);
  if (o.cap) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.13, 0.07, 18), m(o.cap)); c.position.y = 0.29; head.add(c); const v = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.012, 0.09), m(o.cap)); v.position.set(0, 0.26, 0.13); head.add(v); }
  if (o.mustache) { const mu = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.025, 0.03), m(0x1a120c)); mu.position.set(0, 0.12, 0.115); head.add(mu); }
  for (const s of [-1, 1]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 6), m(0x120c08)); e.position.set(s * 0.04, 0.19, 0.11); head.add(e); }
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8), new THREE.MeshBasicMaterial({ map: texBlob, transparent: true, depthWrite: false })); shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.005; g.add(shadow);
  g.userData = { hip, legs, arms, head, shadow, walk: 0 };
  scene.add(g); return g;
}
function pose(p, mode, t = 0, amt = 0) {
  const u = p.userData;
  if (mode === 'sit') {
    u.hip.position.y = 0.5; u.legs.forEach(l => { l.th.rotation.x = -Math.PI / 2 + 0.05; l.kn.rotation.x = Math.PI / 2 - 0.1; });
    u.arms.forEach(a => { a.sh.rotation.x = -0.55; a.el.rotation.x = -0.9; }); u.shadow.visible = false;
  } else {
    u.hip.position.y = 0.92 + Math.abs(Math.sin(t)) * 0.025 * amt; u.shadow.visible = true;
    u.legs.forEach((l, i) => { const s = Math.sin(t + i * Math.PI); l.th.rotation.x = s * 0.5 * amt; l.kn.rotation.x = Math.max(0, -Math.sin(t + i * Math.PI + 1.2)) * 0.7 * amt; });
    u.arms.forEach((a, i) => { a.sh.rotation.x = -Math.sin(t + i * Math.PI) * 0.4 * amt; a.el.rotation.x = -0.15 - 0.2 * amt; });
  }
}
function nameSprite(p, name, color) {
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: nameTex(name, color), transparent: true, depthWrite: false, depthTest: false }));
  sp.scale.set(0.9, 0.225, 1); sp.position.y = 2.05; sp.renderOrder = 10; p.add(sp); p.userData.label = sp; return sp;
}
function bubble(p, text) {
  const u = p.userData; if (u.bub) { p.remove(u.bub); u.bub.material.map.dispose(); }
  const c = cvs(640, 150, x => { x.font = '600 46px -apple-system,Segoe UI,Roboto,sans-serif'; const w = Math.min(620, x.measureText(text).width + 60); x.fillStyle = '#fff'; x.beginPath(); x.roundRect((640 - w) / 2, 10, w, 100, 34); x.fill(); x.beginPath(); x.moveTo(300, 108); x.lineTo(320, 140); x.lineTo(340, 108); x.fill(); x.fillStyle = '#2a1810'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 320, 62); });
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: mkTex(c), transparent: true, depthWrite: false, depthTest: false })); sp.scale.set(1.2, 0.28, 1); sp.position.y = 2.35; sp.renderOrder = 11; p.add(sp); u.bub = sp; u.bubT = performance.now() + 4500;
}
function sitAt(p, seat) { p.position.set(seat.x, 0, seat.z); p.rotation.y = seat.yaw; pose(p, 'sit'); }
// müdavimler
const NPCS = [];
function npc(o, seatIdx, extra) { const s = seats[seatIdx]; s.npc = true; const p = makePerson(o); sitAt(p, s); p.userData.npc = { base: s.yaw, ph: rnd() * 6 }; NPCS.push(p); if (extra) extra(p, s); return p; }
const seatOf = (t, k) => t * 4 + k; // k: 0 +z, 1 -z, 2 +x, 3 -x
npc({ shirt: 0x5a4a3a, vest: 0x2a2018, sleeve: 0x5a4a3a, pants: 0x3a3028, mustache: true, cap: 0x2a2a2a, hair: 0x9a9a9a }, seatOf(5, 2));
npc({ shirt: 0x8a8a90, pants: 0x2a2a30, mustache: true, hair: 0xb0b0b0 }, seatOf(5, 3));
{ // tavla
  const g = tableGroups[5], tb = new THREE.Group(); tb.position.set(0, 0.8, 0); g.add(tb);
  box(0.36, 0.025, 0.5, M.dark, 0, 0.012, 0, tb, false); box(0.34, 0.006, 0.22, std({ color: 0xd9c08a, roughness: 0.7 }), 0, 0.027, -0.12, tb, false); box(0.34, 0.006, 0.22, std({ color: 0xd9c08a, roughness: 0.7 }), 0, 0.027, 0.12, tb, false);
  for (let i = 0; i < 14; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.008, 12), i % 2 ? M.white : M.black); c.position.set(-0.14 + (i % 7) * 0.045, 0.034, i < 7 ? -0.2 : 0.2); tb.add(c); }
}
npc({ shirt: 0x2a3a5a, pants: 0x222226, mustache: true, hair: 0x2a1a10 }, seatOf(1, 1), (p) => {
  const np = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.3), std({ color: 0xd8d2c4, roughness: 0.9, side: THREE.DoubleSide })); np.position.set(0, 1.05, 0.32); np.rotation.x = -0.5; p.add(np);
  teaGlass(tableGroups[1], 0.15, 0.79, -0.25);
});
npc({ shirt: 0x6a2020, vest: 0x1a1a1a, sleeve: 0x6a2020, pants: 0x2a2a30, mustache: true, hair: 0x6a6a6a }, seatOf(10, 2));
npc({ shirt: 0x3a5a3a, pants: 0x30302a, hair: 0x1a120c }, seatOf(8, 0));

/* ------------------------------------------------------------ oyuncu (birinci şahıs) */
const me = { x: -5.2, z: 6.0, yaw: Math.atan2(5.2 + 2, 6.0 + 6.5), pitch: -0.06, seat: -1, eye: 1.62, tea: null, sips: 0, auto: null, watch: false };
{ const dx = 3 - me.x, dz = -6.5 - me.z; me.yaw = Math.atan2(-dx, -dz); }
const handTea = (() => { const g = new THREE.Group(); teaGlass(g, 0, 0, 0); g.children[0].children[0].visible = false; g.position.set(0.24, -0.27, -0.5); g.scale.setScalar(1.05); g.visible = false; camera.add(g); return g; })();
function collide(p) {
  const r = 0.28;
  p.x = Math.max(XL + r + 0.05, Math.min(XR - r - 0.05, p.x)); p.z = Math.max(ZB + r + 0.05, Math.min(ZF - r - 0.05, p.z));
  for (const c of colliders) {
    if (c.c) { const dx = p.x - c.c[0], dz = p.z - c.c[1], d = Math.hypot(dx, dz), m = c.c[2] * 0.62 + r; if (d < m && d > 1e-4) { p.x = c.c[0] + dx / d * m; p.z = c.c[1] + dz / d * m; } }
    else { const [x0, z0, x1, z1] = c.b, cx = Math.max(x0, Math.min(x1, p.x)), cz = Math.max(z0, Math.min(z1, p.z)), dx = p.x - cx, dz = p.z - cz, d = Math.hypot(dx, dz); if (d < r) { if (d > 1e-4) { p.x = cx + dx / d * r; p.z = cz + dz / d * r; } else { p.x = x1 + r; } } }
  }
}

/* ------------------------------------------------------------ ortam: saat + hava → ışık */
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
  scene.environmentIntensity = o.env * (oc ? 0.8 : 1);
  renderer.toneMappingExposure = o.exp;
  lights.forEach(l => { l.intensity = 6 * o.lamp; });
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

/* ------------------------------------------------------------ ekran boyutu */
function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowQ() ? 1 : 1.5));
  renderer.setSize(w, h, false); css.setSize(w, h);
  camera.aspect = w / h; camera.fov = w < h ? 78 : 62; camera.updateProjectionMatrix();
  handTea.userData.x = Math.min(0.24, 0.5 * Math.tan(camera.fov * Math.PI / 360) * camera.aspect * 0.62); handTea.position.x = handTea.userData.x;
}
addEventListener('resize', resize);

/* ------------------------------------------------------------ dokunma: sol joystick, sağ bakış, dokun-etkileş */
const tl = $('tl'), joyEl = $('joy'), knob = joyEl.firstElementChild;
const joy = { id: null, ox: 0, oy: 0, x: 0, y: 0 }, looks = new Map(), keys = {};
tl.addEventListener('pointerdown', e => {
  tl.setPointerCapture(e.pointerId);
  const leftSide = e.clientX < innerWidth * 0.42 && e.clientY > innerHeight * 0.3;
  if (leftSide && joy.id == null && me.seat < 0 && !me.watch) { joy.id = e.pointerId; joy.ox = e.clientX; joy.oy = e.clientY; joy.x = joy.y = 0; joyEl.hidden = false; joyEl.style.left = e.clientX + 'px'; joyEl.style.top = e.clientY + 'px'; knob.style.transform = ''; me.auto = null; hideHint(); return; }
  looks.set(e.pointerId, { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: performance.now() });
});
tl.addEventListener('pointermove', e => {
  if (e.pointerId === joy.id) {
    let dx = e.clientX - joy.ox, dy = e.clientY - joy.oy; const d = Math.hypot(dx, dy), R = 50; if (d > R) { dx *= R / d; dy *= R / d; }
    joy.x = dx / R; joy.y = dy / R; knob.style.transform = `translate(${dx}px,${dy}px)`; return;
  }
  const l = looks.get(e.pointerId); if (!l) return;
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
addEventListener('keydown', e => { keys[e.code] = true; if (e.code === 'KeyE' || e.code === 'Enter') doAct(); });
addEventListener('keyup', e => { keys[e.code] = false; });

const ray = new THREE.Raycaster(), v2 = new THREE.Vector2();
const tapTargets = () => [chairIM, ...clothMeshes, tvIdle, tvHole, portrait, ...scene.children.filter(o => o.userData && o.userData.tea)];
function pick(cx, cy) {
  v2.set(cx / innerWidth * 2 - 1, -(cy / innerHeight) * 2 + 1); ray.setFromCamera(v2, camera); ray.far = 14;
  const hit = ray.intersectObjects(tapTargets(), true)[0]; if (!hit) return null;
  let o = hit.object; while (o && !(o.userData && (o.userData.tv || o.userData.tea || o.userData.portre || o.userData.table != null)) && o !== chairIM) o = o.parent;
  if (hit.object === chairIM) return { k: 'seat', s: seats[hit.instanceId], d: hit.distance };
  if (!o) return null;
  if (o.userData.tv) return { k: 'tv', d: hit.distance };
  if (o.userData.tea) return { k: 'tea', d: hit.distance };
  if (o.userData.portre) return { k: 'portre', d: hit.distance };
  if (o.userData.table != null) { const t = o.userData.table, free = seats.filter(s => s.t === t && !s.npc && !s.by).sort((a, b) => Math.hypot(a.x - me.x, a.z - me.z) - Math.hypot(b.x - me.x, b.z - me.z))[0]; return free ? { k: 'seat', s: free, d: hit.distance } : { k: 'full', d: hit.distance }; }
  return null;
}
function tapAt(cx, cy) {
  if (me.watch) return;
  const h = pick(cx, cy); if (!h) return;
  if (h.k === 'portre') return toast('🖤 ' + T('Müslüm Baba bakıyor… Kader bu.'));
  if (h.k === 'full') return toast(T('Bu masa dolu'));
  if (h.k === 'seat') { if (h.s.npc || h.s.by) return toast(T('Burası dolu')); if (me.seat >= 0) standUp(); return goTo({ x: h.s.x, z: h.s.z, r: 1.0 }, () => sitDown(h.s)); }
  if (h.k === 'tv') { if (h.d > 5.5 && me.seat < 0) return goTo({ x: TV.x, z: ZF - 2.4, r: 0.4 }, () => openTvPick()); return openTvPick(); }
  if (h.k === 'tea') { if (me.seat >= 0) standUp(); return goTo({ x: teaSpot.x + 0.75, z: teaSpot.z, r: 0.7 }, takeTea); }
}
function goTo(t, done) { me.auto = { ...t, done, t0: performance.now() }; }

/* ------------------------------------------------------------ oturma / kalkma */
const anim = { on: false };
function camTo(x, y, z, yaw, pitch, dur, done) { Object.assign(anim, { on: true, t0: performance.now(), dur, f: { x: me.x, y: me.eye, z: me.z, yaw: me.yaw, pitch: me.pitch }, to: { x, y, z, yaw, pitch }, done }); }
function sitDown(s) {
  if (s.npc || s.by) return toast(T('Burası dolu'));
  me.seat = s.id; s.by = 'me'; joy.id = null; joyEl.hidden = true;
  const yaw = s.yaw - Math.PI, fx = Math.sin(s.yaw) * 0.05, fz = Math.cos(s.yaw) * 0.05;
  let dy = yaw - me.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
  camTo(s.x + fx, 1.2, s.z + fz, me.yaw + dy, -0.35, 600, () => { if (s.okey) openOkey(); });
  if (me.tea) { placeTea(s); }
  sendState(true); ui();
}
function standUp() {
  if (me.seat < 0) return;
  const s = seats[me.seat]; s.by = null; me.seat = -1;
  const bx = s.x - Math.sin(s.yaw) * 0.55, bz = s.z - Math.cos(s.yaw) * 0.55, p = { x: bx, z: bz }; collide(p);
  camTo(p.x, 1.62, p.z, me.yaw, -0.06, 450);
  sendState(true); ui();
}
let tableTea = null;
function takeTea() {
  if (me.tea) return toast(T('Çayın zaten elinde'));
  me.tea = 1; me.sips = 0; handTea.visible = true; handTea.children[0].userData.tea && (handTea.children[0].userData.tea.visible = true);
  toast('🍵 ' + T('Çayın taze, buyur')); ui();
}
function placeTea(s) {
  handTea.visible = false; if (tableTea) tableTea.parent.remove(tableTea);
  const g = tableGroups[s.t], local = new THREE.Vector3(s.x, 0.79, s.z).sub(g.position).applyAxisAngle(new THREE.Vector3(0, 1, 0), -g.rotation.y).multiplyScalar(0.55);
  tableTea = teaGlass(g, local.x + 0.12, 0.79, local.z); if (me.sips >= 3) tableTea.userData.tea.visible = false; me.tea = 2;
}
function sip() {
  if (!me.tea) return; me.sips++;
  const t = tableTea && me.tea === 2 ? tableTea : handTea.children[0];
  if (me.sips >= 3) { toast('🍵 ' + T('Çay bitti. Bir tane daha?')); if (t.userData.tea) t.userData.tea.visible = false; setTimeout(() => { if (me.tea === 1) handTea.visible = false; if (tableTea) { tableTea.parent.remove(tableTea); tableTea = null; } me.tea = null; ui(); }, 1500); }
  else { if (t.userData.tea) t.userData.tea.scale.y = 1 - me.sips * 0.3; toast(me.sips === 1 ? T('Oh, tavşan kanı…') : T('Bir yudum daha')); }
  sipAnim = performance.now(); ui();
}
let sipAnim = 0;

/* ------------------------------------------------------------ bağlam düğmesi */
let ctx = null;
function nearestCtx() {
  if (me.watch) return null;
  if (me.seat >= 0) return seats[me.seat].okey ? { k: 'okey', l: '🀄 ' + T('Okey\'i aç') } : null;
  const fx = -Math.sin(me.yaw), fz = -Math.cos(me.yaw);
  let best = null, bs = 0;
  for (const s of seats) {
    if (s.npc || s.by) continue; const dx = s.x - me.x, dz = s.z - me.z, d = Math.hypot(dx, dz); if (d > 1.35) continue;
    const dot = (dx * fx + dz * fz) / (d || 1), sc = (1.4 - d) + dot * 0.5; if (dot > -0.2 && sc > bs) { bs = sc; best = { k: 'seat', s, l: s.okey ? '🀄 ' + T('Okey masasına otur') : '🪑 ' + T('Otur') }; }
  }
  { const dx = TV.x - me.x, dz = TV.z - me.z, d = Math.hypot(dx, dz), dot = (dx * fx + dz * fz) / d; if (d < 5 && dot > 0.8) { const sc = 1 + dot; if (sc > bs) { bs = sc; best = { k: 'tv', l: '📺 ' + T('TV') }; } } }
  { const dx = teaSpot.x - me.x, dz = teaSpot.z - me.z, d = Math.hypot(dx, dz), dot = (dx * fx + dz * fz) / d; if (d < 2.1 && dot > 0.3 && !me.tea) { const sc = 1.6 + dot; if (sc > bs) { bs = sc; best = { k: 'tea', l: '🍵 ' + T('Çay al') }; } } }
  return best;
}
const actEl = $('act'), act2 = $('act2');
function ui() {
  ctx = nearestCtx();
  const l = ctx ? ctx.l : '';
  if (actEl.textContent !== l) actEl.textContent = l; actEl.hidden = !ctx;
  const a2 = me.watch ? '' : me.seat >= 0 ? '⬆ ' + esc(T('Kalk')) : me.tea ? '🍵 ' + esc(T('Yudumla')) : '';
  if (act2.innerHTML !== a2) act2.innerHTML = a2;
  act2.hidden = !act2.innerHTML;
  sipBtn.hidden = !(me.tea && me.seat >= 0 && !me.watch);
  $('say').hidden = !NET || me.watch;
  $('bnet').classList.toggle('on', !!NET);
  $('sub').textContent = subText();
}
const sipBtn = document.createElement('button'); sipBtn.className = 'ui gl'; sipBtn.id = 'sip'; sipBtn.hidden = true; sipBtn.textContent = '🍵 ' + T('Yudumla');
sipBtn.style.cssText = 'right:calc(22px + env(safe-area-inset-right));bottom:calc(150px + env(safe-area-inset-bottom));height:48px;border-radius:15px;padding:0 16px;font-size:15px;font-weight:600';
document.body.appendChild(sipBtn); sipBtn.onclick = () => sip();
function doAct() {
  if (!ctx) return;
  if (ctx.k === 'seat') sitDown(ctx.s);
  else if (ctx.k === 'tv') openTvPick();
  else if (ctx.k === 'tea') takeTea();
  else if (ctx.k === 'okey') openOkey();
}
actEl.onclick = doAct;
act2.onclick = () => { if (me.seat >= 0) standUp(); else if (me.tea) sip(); };

/* ------------------------------------------------------------ TV (YouTube, 3D içinde) */
let tvId = '';
function ytId(s) {
  s = String(s || '').trim(); if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/); return m ? m[1] : '';
}
function setVideo(id, share = true) {
  tvId = id || '';
  if (!tvId) { tvEl.innerHTML = ''; tvObj.visible = false; tvHole.visible = false; tvIdle.visible = true; if (share && NET) NET.room.send('tv', { id: '' }); exitWatch(); return; }
  tvEl.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${tvId}?autoplay=1&playsinline=1&rel=0&modestbranding=1" style="width:960px;height:540px;border:0;display:block" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  tvObj.visible = true; tvHole.visible = true; tvIdle.visible = false;
  if (share && NET) NET.room.send('tv', { id: tvId });
}
function enterWatch() {
  if (!tvId) return;
  me.watch = true; me.preWatch = { x: me.x, z: me.z, eye: me.eye, yaw: me.yaw, pitch: me.pitch, seat: me.seat };
  camTo(TV.x, TV.y - 0.05, ZF - 1.75, Math.PI, 0, 550, () => { $('css').classList.add('watch'); tl.classList.add('off'); });
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
  if (b.dataset.tv === 'pick') openTvPick(); else if (b.dataset.tv === 'off') setVideo(''); else if (b.dataset.tv === 'up') exitWatch();
});
function openTvPick() {
  const hist = (P.tv || []).slice(0, 6);
  openModal(`<h2>📺 Gönül TV</h2>
    <div class="ovs">${T('YouTube\'da videoyu bul, Paylaş › Kopyala de, buraya yapıştır.')}</div>
    <div class="lbl">${T('YouTube linki')}</div><input class="inp" id="yt" placeholder="https://youtu.be/…" autocomplete="off" autocapitalize="off">
    ${navigator.clipboard && navigator.clipboard.readText ? `<button class="btn sec" data-v="paste">📋 ${T('Yapıştır')}</button>` : ''}
    <button class="btn" data-v="go">▶ ${T('TV\'de aç')}</button>
    ${tvId ? `<button class="btn sec" data-v="watch">👀 ${T('Yakından izle')}</button><button class="btn sec" data-v="off">${T('TV\'yi kapat')}</button>` : ''}
    ${hist.length ? `<div class="lbl">${T('Son açılanlar')}</div><div class="list">${hist.map((h, i) => `<button data-h="${i}">▶ ${esc(h.n || h.id)}</button>`).join('')}</div>` : ''}
    ${NET ? `<div class="ovs">${T('Açtığın video odadaki herkesin TV\'sinde açılır.')}</div>` : ''}`, async b => {
    if (b.dataset.v === 'paste') { try { $('yt').value = await navigator.clipboard.readText(); } catch (e) {} return; }
    if (b.dataset.v === 'off') { closeModal(); setVideo(''); return; }
    if (b.dataset.v === 'watch') { closeModal(); enterWatch(); return; }
    let id = '';
    if (b.dataset.h != null) id = hist[+b.dataset.h].id;
    else if (b.dataset.v === 'go') { id = ytId($('yt').value); if (!id) { toast(T('Bu bir YouTube linki değil')); return; } P.tv = [{ id, n: $('yt').value.trim().slice(0, 60) }].concat((P.tv || []).filter(h => h.id !== id)).slice(0, 8); save(); }
    if (!id) return;
    closeModal(); setVideo(id); enterWatch();
  });
}

/* ------------------------------------------------------------ okey (masaya oturunca) */
const okf = $('okf'); let okFrame = null, okeyCode = '';
function openOkey() {
  if (okFrame) return;
  let src = 'okey.html?kh=1&userName=' + encodeURIComponent(myName || '');
  if (NET) src += okeyCode ? '&oda=' + okeyCode : '&autohost=1';
  okFrame = document.createElement('iframe'); okFrame.src = src; okFrame.allow = 'autoplay; clipboard-write; web-share';
  okf.innerHTML = ''; okf.appendChild(okFrame); okf.hidden = false;
}
function closeOkey() { if (!okFrame) return; try { okFrame.src = 'about:blank'; } catch (e) {} okFrame.remove(); okFrame = null; okf.hidden = true; standUp(); }
addEventListener('message', e => {
  if (!okFrame || e.source !== okFrame.contentWindow) return;
  const d = e.data;
  if (d === 'game-exit' || d === 'pool-exit') closeOkey();
  else if (d && d.type === 'okey-room' && d.code) { okeyCode = d.code; if (NET) NET.room.send('ok', { c: okeyCode }); }
  else if (d && d.type === 'gp-name' && d.name) { myName = d.name; try { parent.postMessage(d, '*'); } catch (er) {} }
});

/* ------------------------------------------------------------ online: aynı kıraathanede yürümek */
let NET = null; const others = new Map(); let lastSend = 0, lastSig = '';
const COLORS = [0x2a5a8a, 0x8a2a2a, 0x2a7a4a, 0x7a5a1a, 0x5a2a7a, 0x1a6a6a, 0x8a4a2a, 0x3a3a3a];
function hashc(s) { let h = 0; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) | 0; return Math.abs(h); }
function addOther(p) {
  if (others.has(p.id) || (NET && p.id === NET.room.id)) return;
  const h = hashc(p.name + p.id), av = makePerson({ shirt: COLORS[h % COLORS.length], pants: 0x23232a, hair: [0x17100b, 0x3a2414, 0x0c0c0c][h % 3], mustache: h % 4 === 0 });
  nameSprite(av, p.name, '#bfe8ff'); av.position.set(-5, 0, 6.2); av.visible = false;
  others.set(p.id, { av, name: p.name, x: -5, z: 6.2, yaw: 0, tx: -5, tz: 6.2, tyaw: 0, seat: -1, ph: 0, seen: false });
}
function removeOther(id) { const o = others.get(id); if (!o) return; if (o.seat >= 0 && seats[o.seat] && seats[o.seat].by === id) seats[o.seat].by = null; scene.remove(o.av); others.delete(id); }
function netOpts() {
  return {
    name: myName || T('Misafir'), max: 8,
    onPeers: list => {
      const ids = new Set(list.map(p => p.id)); for (const id of [...others.keys()]) if (!ids.has(id)) removeOther(id);
      let neu = false; list.forEach(p => { if (!others.has(p.id) && p.id !== NET?.room?.id) { addOther(p); neu = true; } });
      if (neu) { sendState(true); if (tvId) NET && NET.room.send('tv', { id: tvId }); if (okeyCode) NET && NET.room.send('ok', { c: okeyCode }); }
      ui();
    },
    onMsg: (t, d, from) => {
      if (!from) return; if (!others.has(from.id)) addOther(from);
      const o = others.get(from.id);
      if (t === 'p') {
        o.tx = d.x; o.tz = d.z; o.tyaw = d.y; if (!o.seen) { o.x = d.x; o.z = d.z; o.yaw = d.y; o.seen = true; o.av.visible = true; }
        if (d.s !== o.seat) { if (o.seat >= 0 && seats[o.seat] && seats[o.seat].by === from.id) seats[o.seat].by = null; o.seat = d.s; if (d.s >= 0 && seats[d.s]) { if (me.seat === d.s) { /* ikimiz aynı anda oturduk: sonra gelen kalksın */ } seats[d.s].by = from.id; } }
      } else if (t === 'tv') { if (d.id !== tvId) { setVideo(d.id, false); if (d.id) toast(`📺 ${from.name} ${T('TV\'de video açtı')}`); } }
      else if (t === 'say') { bubble(o.av, d.t); }
      else if (t === 'ok') { okeyCode = d.c; }
    },
    onLeave: p => { removeOther(p.id); toast(`${p.name} ${T('kıraathaneden çıktı')}`); ui(); },
    onClose: r => { netEnd(); toast(T(r)); }
  };
}
function netEnd() { for (const id of [...others.keys()]) removeOther(id); NET = null; okeyCode = ''; ui(); }
function sendState(force) {
  if (!NET) return; const now = performance.now();
  const sig = [me.x.toFixed(2), me.z.toFixed(2), me.yaw.toFixed(2), me.seat].join();
  if (!force && (sig === lastSig ? now - lastSend < 2500 : now - lastSend < 120)) return;
  lastSig = sig; lastSend = now; NET.room.send('p', { x: +me.x.toFixed(2), z: +me.z.toFixed(2), y: +me.yaw.toFixed(2), s: me.seat });
}
async function netHost() {
  if (!window.GPNet) return toast(T('Online modül yüklenemedi'));
  openModal(`<h2>${T('Oda kuruluyor…')}</h2>`);
  try { const room = await window.GPNet.host('kiraathane', netOpts()); NET = { room }; removeOther(room.id); sendState(true); showNet(); }
  catch (e) { openModal(`<h2>${T('Bağlanamadı')}</h2><div class="ovs">${esc(T(e.message || 'İnternet bağlantını kontrol et'))}</div>`); }
}
async function netJoin(code) {
  if (!window.GPNet) return toast(T('Online modül yüklenemedi'));
  openModal(`<h2>${T('Kıraathaneye bağlanılıyor…')}</h2>`);
  try { const room = await window.GPNet.join('kiraathane', code, netOpts()); NET = { room }; removeOther(room.id); room.peers.forEach(p => addOther(p)); sendState(true); closeModal(); toast('🌐 ' + T('Arkadaşının kıraathanesindesin')); ui(); }
  catch (e) { openModal(`<h2>${T('Katılamadın')}</h2><div class="ovs">${esc(T(e.message || 'Bağlantı hatası'))}</div><button class="btn" data-v="retry">${T('Tekrar dene')}</button>`, b => { if (b.dataset.v === 'retry') joinAsk(code); }); }
}
function share() {
  if (!NET) return; const url = NET.room.link(), text = `${T('Gönül Plak kıraathanesine gel, çay benden! Oda kodu:')} ${NET.room.code}`;
  if (navigator.share) navigator.share({ title: 'Gönül Plak · Kıraathane', text, url }).catch(() => {});
  else if (navigator.clipboard) navigator.clipboard.writeText(text + ' ' + url).then(() => toast(T('Link kopyalandı'))).catch(() => {});
}
function showNet() {
  if (!NET) {
    return openModal(`<h2>🌐 ${T('Arkadaşlarınla kıraathane')}</h2><div class="ovs">${T('Oda kur, linki gönder. Arkadaşların gelince burada yürür, aynı masaya oturur, aynı TV\'yi izlersiniz.')}</div>
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
  openModal(`<h2>${T('Odaya katıl')}</h2><div class="lbl">${T('Oda kodu')}</div><input class="inp" id="code" maxlength="6" value="${esc(pre || '')}" style="text-transform:uppercase;letter-spacing:6px;font-size:26px;text-align:center" autocomplete="off" autocapitalize="characters"><button class="btn" data-v="go">${T('Katıl')}</button>`,
    b => { if (b.dataset.v === 'go') netJoin($('code').value); });
}
const PHR = ['Selamünaleyküm!', 'Çaylar benden 🍵', 'Bir el okey?', 'Ooo, hoş geldin!', 'Müslüm Baba açalım mı?', 'Kalk gidelim', 'Hadi eyvallah 👋'];
$('say').onclick = () => openModal(`<h2>${T('Hızlı mesaj')}</h2><div class="phr">${PHR.map((p, i) => `<button data-v="${i}">${esc(T(p))}</button>`).join('')}</div>`, b => {
  const t = T(PHR[+b.dataset.v]); if (!t) return; closeModal(); if (NET) NET.room.send('say', { t }); toast('💬 ' + t);
});
$('bnet').onclick = () => showNet();

/* ------------------------------------------------------------ ayarlar, modal, toast, ipucu */
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
const SNOWS = [['auto', 'Gerçek Stuttgart havası'], ['on', 'Hep kar yağsın'], ['off', 'Açık hava']];
const QS = [['auto', 'Güzel görüntü'], ['low', 'Pil dostu']];
const seg = (k, list, cur) => `<div class="segs">${list.map(([v, n]) => `<button data-v="${k}:${v}" class="${cur === v ? 'on' : ''}">${T(n)}</button>`).join('')}</div>`;
function showSettings() {
  openModal(`<h2>${T('Ayarlar')}</h2><div class="lbl">${T('Manzara saati')}</div>${seg('time', TIMES, P.time)}<div class="lbl">${T('Hava')}</div>${seg('snow', SNOWS, P.snow)}<div class="lbl">${T('Görüntü')}</div>${seg('q', QS, P.q)}
    <div class="ovs">${T('Sol tarafta parmağını kaydır: yürü. Sağ tarafta kaydır: etrafa bak. Sandalyeye, TV\'ye ya da çay ocağına dokun: oraya gider.')}</div>`, b => {
    const v = b.dataset.v; if (!v) return; const [k, val] = v.split(':'); P[k] = val; save();
    if (k === 'q') resize(); applyEnv(); showSettings();
  });
}
$('bset').onclick = showSettings;
$('back').onclick = () => { if (okFrame) return closeOkey(); if (me.watch) return exitWatch(); if (NET) { NET.room.close(); netEnd(); } try { parent.postMessage('game-exit', '*'); } catch (e) {} };
const hint = $('hint');
function showHint() { if (P.hint >= 3 || TEST) return; P.hint++; save(); hint.innerHTML = T('👈 Solda kaydır: yürü · Sağda kaydır: bak 👉') + '<br><small style="opacity:.8">' + T('Sandalyeye, TV\'ye, çay ocağına dokun') + '</small>'; hint.hidden = false; setTimeout(hideHint, 9000); }
function hideHint() { hint.hidden = true; }

/* ------------------------------------------------------------ döngü */
let last = performance.now(), walkPh = 0, bob = 0, running = true, fN = 0;
const cross = $('cross');
function frame(now) {
  requestAnimationFrame(frame);
  tick(now);
}
function tick(now) {
  if (!running || document.hidden || okFrame) { last = now; return; }
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  // kamera animasyonu
  if (anim.on) {
    const k = Math.max(0, Math.min(1, (now - anim.t0) / anim.dur)), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2, f = anim.f, t = anim.to;
    me.x = f.x + (t.x - f.x) * e; me.z = f.z + (t.z - f.z) * e; me.eye = f.y + (t.y - f.y) * e; me.yaw = f.yaw + (t.yaw - f.yaw) * e; me.pitch = f.pitch + (t.pitch - f.pitch) * e;
    if (k >= 1) { anim.on = false; const d = anim.done; anim.done = null; d && d(); }
  } else if (me.seat < 0 && !me.watch) {
    let mx = joy.x, mz = joy.y;
    if (keys.KeyW || keys.ArrowUp) mz -= 1; if (keys.KeyS || keys.ArrowDown) mz += 1; if (keys.KeyA) mx -= 1; if (keys.KeyD) mx += 1;
    if (keys.ArrowLeft) me.yaw += dt * 1.8; if (keys.ArrowRight) me.yaw -= dt * 1.8;
    if (me.auto) {
      const a = me.auto, dx = a.x - me.x, dz = a.z - me.z, d = Math.hypot(dx, dz);
      if (d <= a.r || now - a.t0 > 9000) { const done = a.done; me.auto = null; if (d <= a.r + 0.6) done && done(); }
      else { const ty = Math.atan2(-dx, -dz); let dy = ty - me.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); me.yaw += dy * Math.min(1, dt * 6); const sp = Math.min(1, d); mz = -sp * Math.max(0.2, Math.cos(dy)); mx = 0; }
    }
    const l = Math.hypot(mx, mz); if (l > 1) { mx /= l; mz /= l; }
    const spd = 2.5 * (l > 0.85 ? 1.15 : 1), sy = Math.sin(me.yaw), cy = Math.cos(me.yaw);
    const vx = (mx * cy + mz * sy) * spd * dt, vz = (-mx * sy + mz * cy) * spd * dt;
    if (vx || vz) {
      const p = { x: me.x + vx, z: me.z + vz }; collide(p);
      if (me.auto && Math.hypot(p.x - me.x, p.z - me.z) < Math.hypot(vx, vz) * 0.2) { me.auto.stuck = (me.auto.stuck || 0) + dt; if (me.auto.stuck > 0.6) me.auto = null; }
      me.x = p.x; me.z = p.z; walkPh += Math.hypot(vx, vz) * 4.2; bob = Math.min(1, bob + dt * 4);
    } else bob = Math.max(0, bob - dt * 4);
  }
  const by = me.seat < 0 && !me.watch && !anim.on ? Math.sin(walkPh) * 0.025 * bob : 0;
  camera.position.set(me.x, me.eye + by, me.z); camera.rotation.set(me.pitch, me.yaw, 0);
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
    }
    const u = o.av.userData; if (u.bub && now > u.bubT) { o.av.remove(u.bub); u.bub = null; }
  }
  // müdavimler: hafif kıpırtı
  for (const p of NPCS) { const n = p.userData.npc; p.userData.head.rotation.y = Math.sin(now / 2300 + n.ph) * 0.35; p.userData.arms[0].el.rotation.x = -0.9 + Math.sin(now / 1500 + n.ph) * 0.12; }
  // okey masası halkası
  { const g = tableGroups[OKEY_T], d = Math.hypot(g.position.x - me.x, g.position.z - me.z); g.userData.ring.material.opacity = me.seat < 0 && d < 4 ? (0.25 + Math.sin(now / 400) * 0.12) * Math.min(1, (4 - d)) : 0; }
  // kar
  if (snow.visible) { const a = snowGeo.attributes.position.array; for (let i = 0; i < SNOW_N; i++) { a[i * 3 + 1] -= dt * (0.6 + (i % 7) * 0.08); a[i * 3] += Math.sin(now / 900 + i) * dt * 0.15; if (a[i * 3 + 1] < -4) snowSpot(i, 8); } snowGeo.attributes.position.needsUpdate = true; }
  // bağlam + nişangâh
  if ((fN++ % 6) === 0) { ui(); const h = me.watch ? null : pick(innerWidth / 2, innerHeight / 2); cross.classList.toggle('hot', !!h && h.k !== 'full' && h.d < 6); }
  sendState(false);
  renderer.render(scene, camera);
  if (tvObj.visible) css.render(cssScene, camera);
}

/* ------------------------------------------------------------ başlangıç */
function boot() {
  resize(); applyEnv(); fetchWx(); setInterval(fetchWx, 15 * 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) applyEnv(); });
  if (!TEST) requestAnimationFrame(t => { last = t; requestAnimationFrame(frame); });
  setTimeout(() => { $('load').classList.add('out'); showHint(); }, 350);
  ui();
  if (qs.get('oda')) setTimeout(() => netJoin(qs.get('oda')), 500);
  window.__kh = { me, seats, sitDown: i => sitDown(seats[i]), standUp, setVideo, enterWatch, exitWatch, takeTea, sip, setTime: t => { P.time = t; applyEnv(); }, setSnow: v => { P.snow = v; applyEnv(); }, tp: (x, z, yaw, pitch = -0.06) => { me.x = x; me.z = z; me.yaw = yaw; me.pitch = pitch; }, renderer, scene, net: () => NET, others, openOkey, tapAt, tick: (n = 1, ms = 33) => { for (let i = 0; i < n; i++) { const t = Math.max(last + ms, performance.now()); tick(t); } } };
}
boot();
