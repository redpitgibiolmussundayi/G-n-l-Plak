/* Gönül Plak · Okey — dışarıda kar, içeride çay. 4 kişilik klasik okey (106 taş), robotlar ve arkadaşlarla online.
   Kurallar: 4 renk × 1-13 × 2 + 2 sahte okey. Gösterge çevrilir; göstergenin bir fazlası (aynı renk) okeydir (13'ten sonra 1).
   Dağıtan 15 taşla başlar ve ilk taşı atar; diğerleri 14. Sırası gelen ya ortadan çeker ya da solundakinin attığını alır, sonra sağına bir taş atar.
   14 taşın tamamı per olunca (aynı sayı farklı renk 3-4 taş / aynı renk sıralı en az 3 taş, 12-13-1 olur) ya da 7 çift olunca 15. taşı ortaya atıp biter. */
(() => {
'use strict';
const FW = 1672, FH = 941, EX = 420, EY = 200;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const qs = new URLSearchParams(location.search);
const LS = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
const P = Object.assign({ name: '', wins: 0, hands: 0, sound: 1 }, LS.get('gp_okey', {}));
{ const q = (qs.get('userName') || '').trim(); if (q) P.name = q.slice(0, 18); }
const save = () => LS.set('gp_okey', P);
const T = s => (window.gpT ? window.gpT(s) : s);

/* ------------------------------------------------------------ taşlar */
const COL = ['#d99a12', '#1a5cc8', '#202020', '#d2232c'], CNAME = ['Sarı', 'Mavi', 'Siyah', 'Kırmızı'];
const raw = id => id >= 104 ? { fake: true } : { c: (id / 26) | 0, n: (((id % 26) / 2) | 0) + 1 };
let G = null;           // oyun durumu (ev sahibi hakem)
const okeyOf = g => { const r = raw(g.gost); return { c: r.c, n: r.n % 13 + 1 }; };
function val(id, g = G) {   // oyundaki anlamı: { c, n, j (okey) }
  const ok = okeyOf(g), r = raw(id);
  if (r.fake) return { c: ok.c, n: ok.n, j: false, fake: true };
  return { c: r.c, n: r.n, j: r.c === ok.c && r.n === ok.n };
}

/* ------------------------------------------------------------ el çözücü: en çok kaç taş per olur + perler */
function solve(ids, g = G) {
  const cnt = [0, 1, 2, 3].map(() => new Array(15).fill(0)); let J = 0, real = 0;
  for (const id of ids) { const v = val(id, g); if (v.j) J++; else { cnt[v.c][v.n]++; real++; } }
  const memo = new Map(); let budget = 60000;
  const key = j => { let s = '' + j; for (let c = 0; c < 4; c++) for (let n = 1; n <= 13; n++) s += cnt[c][n]; return s; };
  function first() { for (let n = 1; n <= 13; n++) for (let c = 0; c < 4; c++) if (cnt[c][n]) return [c, n]; return null; }
  function rec(j) {
    const f = first(); if (!f) return 0;
    const k = key(j), m = memo.get(k); if (m) return m.v;
    if (--budget < 0) return 0;
    const [c, n] = f; let best = -1, ch = null, r;
    cnt[c][n]--; r = rec(j); cnt[c][n]++; if (r > best) { best = r; ch = { t: 's', c, n }; }
    // per: aynı sayı farklı renk
    const oth = [0, 1, 2, 3].filter(x => x !== c && cnt[x][n] > 0);
    for (let mask = 0; mask < (1 << oth.length); mask++) {
      const S = oth.filter((_, i) => mask >> i & 1);
      for (let u = 0; u <= j; u++) {
        const tot = 1 + S.length + u; if (tot < 3 || tot > 4) continue;
        cnt[c][n]--; S.forEach(x => cnt[x][n]--); r = 1 + S.length + rec(j - u); cnt[c][n]++; S.forEach(x => cnt[x][n]++);
        if (r > best) { best = r; ch = { t: 'g', n, cols: [c, ...S], u }; }
      }
    }
    // seri: aynı renk sıralı (n en küçük gerçek taş; öncesinde okey olabilir)
    for (let pre = 0; pre <= Math.min(j, n - 1); pre++) {
      const start = n - pre; cnt[c][n]--; const used = [n]; let u = pre, len = 1 + pre;
      const evalNow = () => { if (len >= 3) { const rr = used.length + rec(j - u); if (rr > best) { best = rr; ch = { t: 'r', c, start, vals: used.slice(), u }; } } };
      evalNow();
      for (let v = n + 1; v <= 14; v++) {
        if (v === 14 && start < 2) break;
        const vv = v === 14 ? 1 : v;
        if (cnt[c][vv] > 0) { cnt[c][vv]--; used.push(v); } else if (u < j) u++; else break;
        len++; evalNow();
      }
      cnt[c][n]++; for (let i = 1; i < used.length; i++) cnt[c][used[i] === 14 ? 1 : used[i]]++;
    }
    // 12-13-1 gibi: 1 en üstte
    if (n === 1) {
      cnt[c][1]--; const used = [14]; let u = 0, len = 1;
      for (let v = 13; v >= 2 && len < 13; v--) {
        if (cnt[c][v] > 0) { cnt[c][v]--; used.push(v); } else if (u < j) u++; else break;
        len++;
        if (len >= 3) { const rr = used.length + rec(j - u); if (rr > best) { best = rr; ch = { t: 'h', c, vals: used.slice(), u }; } }
      }
      cnt[c][1]++; for (let i = 1; i < used.length; i++) cnt[c][used[i]]++;
    }
    memo.set(k, { v: best, ch });
    return best;
  }
  const cov = rec(J);
  return { cov, real, J, win: real > 0 && cov === real, memo, cnt, key };
}
// perleri taş kimlikleriyle çıkar (akıllı diz için)
function melds(ids, g = G) {
  const S = solve(ids, g), out = [], left = [];
  const pool = {}; const jok = [];
  for (const id of ids) { const v = val(id, g); if (v.j) jok.push(id); else (pool[v.c + ':' + v.n] = pool[v.c + ':' + v.n] || []).push(id); }
  const take = (c, n) => { const a = pool[c + ':' + n]; return a && a.length ? a.pop() : null; };
  const cnt = S.cnt; let j = S.J, guard = 0;
  const first = () => { for (let n = 1; n <= 13; n++) for (let c = 0; c < 4; c++) if (cnt[c][n]) return true; return false; };
  while (first() && guard++ < 40) {
    const m = S.memo.get(S.key(j)); if (!m || !m.ch) break;
    const ch = m.ch;
    if (ch.t === 's') { cnt[ch.c][ch.n]--; left.push(take(ch.c, ch.n)); }
    else if (ch.t === 'g') { const grp = ch.cols.map(c => { cnt[c][ch.n]--; return take(c, ch.n); }); for (let i = 0; i < ch.u; i++) grp.push(jok.pop()); j -= ch.u; out.push(grp); }
    else if (ch.t === 'r') {
      const grp = []; const pre = ch.vals[0] - ch.start; for (let i = 0; i < pre; i++) grp.push(jok.pop());
      let need = ch.u - pre, prev = ch.vals[0] - 1;
      for (const v of ch.vals) { while (v > prev + 1 && need > 0) { grp.push(jok.pop()); need--; prev++; } const vv = v === 14 ? 1 : v; cnt[ch.c][vv]--; grp.push(take(ch.c, vv)); prev = v; }
      while (need-- > 0) grp.push(jok.pop());
      j -= ch.u; out.push(grp);
    } else if (ch.t === 'h') {
      const grp = []; let need = ch.u, prev = 15;
      for (const v of ch.vals) { while (v < prev - 1 && need > 0) { grp.unshift(jok.pop()); need--; prev--; } const vv = v === 14 ? 1 : v; cnt[ch.c][vv]--; grp.unshift(take(ch.c, vv)); prev = v; }
      while (need-- > 0) grp.unshift(jok.pop());
      j -= ch.u; out.push(grp);
    }
  }
  for (const k in pool) left.push(...pool[k]);
  left.push(...jok);
  return { melds: out.map(m => m.filter(x => x != null)), left: left.filter(x => x != null) };
}
function pairsWin(ids, g = G) {
  const m = {}; let J = 0;
  for (const id of ids) { const v = val(id, g); if (v.j) J++; else { const k = v.c + ':' + v.n; m[k] = (m[k] || 0) + 1; } }
  let single = 0; for (const k in m) { if (m[k] > 2) return false; if (m[k] === 1) single++; }
  return single <= J;
}
const isWin = (ids, g = G) => ids.length === 14 && (solve(ids, g).win || pairsWin(ids, g));
function finishTile(hand, g = G) {   // 15 taştan hangisi atılınca biter?
  if (hand.length !== 15) return null;
  const seen = new Set(); let best = null;
  for (const id of hand) {
    const v = val(id, g), k = v.j ? 'J' : v.c + ':' + v.n; if (seen.has(k)) continue; seen.add(k);
    const rest = hand.filter(x => x !== id);
    if (isWin(rest, g)) { if (!best || val(best, g).j === false && v.j) best = id; if (!v.j) return id; }
  }
  return best;
}
// robot için elin değeri: per olan taşlar + birbirine yakın taşlar
function handScore(ids, g = G) {
  const s = solve(ids, g); let near = 0;
  const vs = ids.map(id => val(id, g)).filter(v => !v.j);
  for (let i = 0; i < vs.length; i++) for (let k = i + 1; k < vs.length; k++) {
    const a = vs[i], b = vs[k];
    if (a.c === b.c && a.n !== b.n && Math.abs(a.n - b.n) <= 2) near++;
    else if (a.n === b.n && a.c !== b.c) near++;
  }
  return s.cov * 10 + Math.min(near, 14) + s.J * 6 + (pairsWin(ids, g) ? 200 : 0);
}

/* ------------------------------------------------------------ oyun kuralları (ev sahibinde çalışır) */
const BOTN = ['Rıza Amca', 'Nermin Abla', 'Cemal', 'Ayşe Teyze', 'Hüseyin', 'Kemal Abi', 'Gülizar', 'Necati'];
function newSeats() {
  const n = BOTN.slice().sort(() => Math.random() - 0.5);
  return [{ name: P.name || 'Sen', bot: false, id: 'me' }, { name: n[0], bot: true }, { name: n[1], bot: true }, { name: n[2], bot: true }];
}
function deal(seats, dealer, score, handNo) {
  const deck = []; for (let i = 0; i < 106; i++) deck.push(i);
  for (let i = deck.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [deck[i], deck[j]] = [deck[j], deck[i]]; }
  let gi = deck.findIndex(id => id < 104); const gost = deck.splice(gi, 1)[0];
  const hands = [[], [], [], []];
  for (let s = 0; s < 4; s++) { const k = s === dealer ? 15 : 14; for (let i = 0; i < k; i++) hands[s].push(deck.pop()); }
  return { n: handNo || 1, seats, hands, pile: deck, disc: [[], [], [], []], gost, dealer, turn: dealer, need: 'discard', over: null, score: score || [0, 0, 0, 0], ev: { a: 'deal' }, seq: 1 };
}
const nextSeat = s => (s + 1) % 4, prevSeat = s => (s + 3) % 4;
function apply(seat, a) {   // geçerliyse durumu değiştirir; değilse hata metni döner
  const g = G; if (!g || g.over) return 'Oyun bitti';
  if (g.turn !== seat) return 'Sıra sende değil';
  const h = g.hands[seat];
  if (a.t === 'draw') {
    if (g.need !== 'draw') return 'Önce bir taş at';
    if (!g.pile.length) { g.over = { w: -1, how: 'pile' }; g.ev = { a: 'end' }; g.seq++; return null; }
    const id = g.pile.pop(); h.push(id); g.need = 'discard'; g.ev = { a: 'draw', s: seat, id }; g.seq++; return null;
  }
  if (a.t === 'take') {
    if (g.need !== 'draw') return 'Önce bir taş at';
    const d = g.disc[prevSeat(seat)]; if (!d.length) return 'Alınacak taş yok';
    const id = d.pop(); h.push(id); g.need = 'discard'; g.ev = { a: 'take', s: seat, id, from: prevSeat(seat) }; g.seq++; return null;
  }
  if (a.t === 'disc' || a.t === 'fin') {
    if (g.need !== 'discard') return 'Önce taş çek';
    const i = h.indexOf(a.id); if (i < 0) return 'Bu taş sende değil';
    if (a.t === 'fin') {
      const rest = h.filter(x => x !== a.id);
      if (!isWin(rest)) return 'Elin henüz bitmiyor';
      h.splice(i, 1);
      const pairs = !solve(rest).win && pairsWin(rest), okey = val(a.id).j;
      g.over = { w: seat, how: okey ? 'okey' : pairs ? 'cift' : 'normal', id: a.id };
      g.score[seat] += okey || pairs ? 2 : 1;
      g.ev = { a: 'fin', s: seat, id: a.id }; g.seq++; return null;
    }
    h.splice(i, 1); g.disc[seat].push(a.id);
    g.turn = nextSeat(seat); g.need = 'draw'; g.ev = { a: 'disc', s: seat, id: a.id }; g.seq++;
    if (!g.pile.length) { g.over = { w: -1, how: 'pile' }; g.ev = { a: 'end' }; }
    return null;
  }
  return 'Bilinmeyen hamle';
}
// robot hamlesi
function botMove(seat) {
  const g = G, h = g.hands[seat];
  if (g.need === 'draw') {
    const d = g.disc[prevSeat(seat)], top = d[d.length - 1];
    if (top != null) {
      const withTop = h.concat([top]);
      if (finishTile(withTop)) return { t: 'take' };
      const base = handScore(h), best = bestDiscard(withTop, top);
      if (best.score >= base + 9) return { t: 'take' };
    }
    return { t: 'draw' };
  }
  const f = finishTile(h); if (f != null) return { t: 'fin', id: f };
  return { t: 'disc', id: bestDiscard(h).id };
}
function bestDiscard(h, keep) {
  let best = null; const seen = new Set();
  for (const id of h) {
    if (id === keep) continue;
    const v = val(id); if (v.j) continue;
    const k = v.c + ':' + v.n; if (seen.has(k)) continue; seen.add(k);
    const sc = handScore(h.filter(x => x !== id)) + Math.random() * 0.5 - (v.n >= 12 ? 0 : 0.2);
    if (!best || sc > best.score) best = { id, score: sc };
  }
  if (!best) best = { id: h.find(x => x !== keep), score: 0 };
  return best;
}

/* ------------------------------------------------------------ mekanlar: oda resmi (camlar şeffaf) + arkada Stuttgart manzarası (ana ekrandaki piksel resimler, gerçek saate göre) */
const GEO = {
  k1: { img: 'ok-k1.webp', name: 'Stuttgart Kıraathanesi', view: { s: 0.95, ox: 165, oy: -211 }, glass: [555, 0, 1672, 350],
    rowY: [684, 775], rowX: [338, 328], pile: [650, 530], gost: [898, 546],
    disc: [[1190, 595], [1130, 515], [540, 515], [480, 595]], opp: [null, [1420, 550], [836, 420], [250, 550]],
    cards: [[833, 879], [1592, 437], [1090, 388], [85, 437]], acts: [701, 778, 864], chat: 879,
    tea: [[225, 775, 1], [1250, 505, 0.62], [625, 462, 0.55], [420, 505, 0.62]], toast: [836, 150] },
  k2: { img: 'ok-k2.webp', name: 'Müslüm Baba Köşesi', view: { s: 0.95, ox: 185, oy: -161 }, glass: [595, 0, 1672, 410],
    rowY: [711, 800], rowX: [338, 328], pile: [655, 570], gost: [900, 583],
    disc: [[1190, 624], [1130, 552], [540, 552], [480, 624]], opp: [null, [1420, 585], [836, 470], [250, 585]],
    cards: [[834, 890], [1592, 439], [1090, 428], [85, 439]], acts: [721, 797, 879], chat: 889,
    tea: [[225, 800, 1], [1250, 545, 0.62], [625, 512, 0.55], [420, 545, 0.62]], toast: [836, 160] }
};
const SCN_N = { k1: 'Kıraathane · Manzara', k2: 'Müslüm Baba Köşesi · Kış' };
if (!GEO[P.scene]) P.scene = 'k2';
if (!P.time) P.time = 'auto';
if (!P.snow) P.snow = 'auto';
let S = GEO[P.scene];

/* güneş (Stuttgart) — ana ekrandaki hesapla aynı */
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
/* hava: ana uygulamanın kaydettiği Stuttgart havası (aynı site), yoksa Open-Meteo'dan */
let wx = LS.get('gp-wx', null);
async function fetchWx() {
  if (wx && Date.now() - wx.at < 30 * 60000) return;
  try {
    const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=48.7758&longitude=9.1829&current=temperature_2m,weather_code&timezone=Europe%2FBerlin');
    const c = (await r.json()).current; wx = { t: Math.round(c.temperature_2m), code: c.weather_code, at: Date.now() }; LS.set('gp-wx', wx); loadView();
  } catch (e) {}
}
const wxCode = () => wx && Date.now() - wx.at < 3 * 3600000 ? wx.code : -1;
const snowing = () => P.snow === 'on' || (P.snow === 'auto' && [71, 73, 75, 77, 85, 86].includes(wxCode()));
const overcast = () => snowing() || (P.snow === 'auto' && (wxCode() === 3 || (wxCode() >= 45 && wxCode() <= 67) || wxCode() >= 80));
function viewFile() {
  const ph = P.time === 'auto' ? autoPhase() : P.time;
  if (!overcast()) return { ph, f: `stg-sonbahar-${ph}.webp` };
  const k = ph === 'gece' ? 'kapali-gece' : ph === 'sabah' ? 'kapali-sabah' : ph === 'gunduz' ? 'kapali-gunduz' : 'kapali-aksam';
  return { ph, f: `stg-sonbahar-${k}.webp` };
}

/* ------------------------------------------------------------ sahne / ölçek (bilardodaki gibi) */
let W = 0, H = 0, port = false, sc = 1, VW = FW, VH = FH, fx = 0, fy = 0, dpr = 1, lastSize = '';
const stage = document.createElement('div'); stage.id = 'ok';
const vcv = document.createElement('canvas'), vctx = vcv.getContext('2d');
const bgc = document.createElement('canvas'), cv = document.createElement('canvas'), ctx = cv.getContext('2d');
const touch = document.createElement('div'); touch.className = 'okt';
const fr = document.createElement('div'); fr.className = 'fr';
const toV = (cx, cy) => port ? [cy / sc, (W - cx) / sc] : [cx / sc, cy / sc];
const toF = (cx, cy) => { const [x, y] = toV(cx, cy); return [x - fx, y - fy]; };
function layout() {
  W = innerWidth; H = innerHeight; lastSize = W + 'x' + H; if (!W || !H) return;
  port = H > W; const SW = port ? H : W, SH = port ? W : H;
  sc = Math.min(SW / FW, SH / FH); VW = SW / sc; VH = SH / sc; fx = (VW - FW) / 2; fy = (VH - FH) / 2;
  stage.style.width = VW + 'px'; stage.style.height = VH + 'px';
  stage.style.transform = port ? `translate(${W}px,0) rotate(90deg) scale(${sc})` : `scale(${sc})`;
  dpr = Math.min(2, window.devicePixelRatio || 1);
  for (const c of [vcv, bgc, cv]) { c.width = Math.round(VW * sc * dpr); c.height = Math.round(VH * sc * dpr); c.style.width = VW + 'px'; c.style.height = VH + 'px'; }
  fr.style.left = fx + 'px'; fr.style.top = fy + 'px';
  tileCache.clear(); drawBg(); dirty = true;
}
const roomImg = new Image(); roomImg.onload = () => { drawBg(); document.documentElement.classList.add('ready'); };
const viewImg = new Image(); let viewKey = '', viewPh = 'gece';
function loadView() {
  const v = viewFile(); viewPh = v.ph;
  bgc.style.filter = v.ph === 'gunduz' ? 'brightness(1.07) saturate(.96)' : v.ph === 'sabah' ? 'brightness(1.04)' : '';
  if (v.f === viewKey) return; viewKey = v.f;
  const im = new Image(); im.onload = () => { viewImg.src = im.src; }; im.src = v.f;
}
viewImg.onload = () => { dirty = true; };
setInterval(loadView, 60000);
function drawBg() {
  const x = bgc.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, bgc.width, bgc.height);
  x.setTransform(sc * dpr, 0, 0, sc * dpr, 0, 0);
  if (roomImg.complete && roomImg.naturalWidth) x.drawImage(roomImg, fx - EX, fy - EY, FW + 2 * EX, FH + 2 * EY);
}
function setScene(k) {
  P.scene = k; save(); S = GEO[k]; roomImg.src = S.img; placeUI(); dirty = true; ui();
}

/* ------------------------------------------------------------ taş çizimi (önbellekli) */
const tileCache = new Map();
function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
function tileImg(id, w, h, back, hl) {
  const k = (back ? 'b' : id) + ':' + w + ':' + h + ':' + (hl || '') + ':' + (G ? G.gost : '');
  let c = tileCache.get(k); if (c) return c;
  const s = sc * dpr, pad = Math.ceil(7 * s);
  c = document.createElement('canvas'); c.width = Math.ceil(w * s) + pad * 2; c.height = Math.ceil(h * s) + pad * 2;
  const x = c.getContext('2d'); x.translate(pad, pad); x.scale(s, s);
  const r = Math.min(w, h) * 0.12, th = Math.max(3, h * 0.065);
  x.shadowColor = 'rgba(0,0,0,.55)'; x.shadowBlur = 6; x.shadowOffsetY = 3;
  x.fillStyle = '#b9a888'; rr(x, 0, 0, w, h, r); x.fill();
  x.shadowColor = 'transparent';
  const gr = x.createLinearGradient(0, 0, 0, h - th);
  if (back) { gr.addColorStop(0, '#f3ead6'); gr.addColorStop(1, '#ddd0b2'); }
  else { gr.addColorStop(0, '#fffbf2'); gr.addColorStop(0.55, '#f7efde'); gr.addColorStop(1, '#ebe0c8'); }
  x.fillStyle = gr; rr(x, 0, 0, w, h - th, r); x.fill();
  x.strokeStyle = 'rgba(255,255,255,.85)'; x.lineWidth = 1; rr(x, 1, 1, w - 2, h - th - 2, r * 0.9); x.stroke();
  if (back) {
    x.strokeStyle = 'rgba(150,120,80,.3)'; x.lineWidth = Math.max(1, w * 0.04); rr(x, w * 0.18, h * 0.16, w * 0.64, h * 0.6, r * 0.6); x.stroke();
  } else if (id != null) {
    const r0 = raw(id);
    if (r0.fake) {
      x.fillStyle = '#1d7a46'; x.font = `700 ${h * 0.5}px -apple-system,system-ui,sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♣', w / 2, h * 0.42);
    } else {
      x.fillStyle = COL[r0.c]; x.font = `800 ${h * (r0.n > 9 ? 0.44 : 0.5)}px -apple-system,"SF Pro Display",system-ui,sans-serif`;
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(r0.n), w / 2, h * 0.37);
      x.beginPath(); x.arc(w / 2, h * 0.71, Math.max(2.5, w * 0.1), 0, 7); x.fill();
      x.fillStyle = 'rgba(255,255,255,.35)'; x.beginPath(); x.arc(w / 2 - w * 0.03, h * 0.7, Math.max(1, w * 0.035), 0, 7); x.fill();
    }
    if (hl === 'okey') { x.fillStyle = '#e8a21c'; x.font = `700 ${h * 0.2}px system-ui`; x.textAlign = 'right'; x.textBaseline = 'top'; x.fillText('★', w - w * 0.08, h * 0.04); }
  }
  if (hl === 'sel') { x.strokeStyle = '#ffb631'; x.lineWidth = 3; rr(x, 1.5, 1.5, w - 3, h - th - 1, r); x.stroke(); }
  if (hl === 'meld') { x.fillStyle = 'rgba(40,180,90,.9)'; x.fillRect(w * 0.2, h - th - 4, w * 0.6, 3); }
  c.pad = pad / s; tileCache.set(k, c); return c;
}
function drawTile(id, cx, cy, w, h, back, hl, rot) {
  const im = tileImg(id, w, h, back, hl), p = im.pad;
  if (rot) { ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); ctx.drawImage(im, -w / 2 - p, -h / 2 - p, w + 2 * p, h + 2 * p); ctx.restore(); }
  else ctx.drawImage(im, cx - w / 2 - p, cy - h / 2 - p, w + 2 * p, h + 2 * p);
}

/* ------------------------------------------------------------ yerleşim */
const TW = 64, TH = 86, PITCH = 67, DW = 56, DH = 76;
const slotXY = i => { const row = (i / 15) | 0; return [S.rowX[row] + (i % 15) * PITCH + PITCH / 2, S.rowY[row]]; };
let mySeat = 0;
const rel = s => (s - mySeat + 4) % 4, abs = r => (r + mySeat) % 4;

/* ------------------------------------------------------------ ıstaka (yerel düzen) */
let slots = new Array(30).fill(null), sel = null, arrMode = 0;
const ARR = ['akilli', 'seri', 'cift'];
function syncRack(auto) {
  const hand = G ? G.hands[mySeat] : [];
  const set = new Set(hand);
  for (let i = 0; i < 30; i++) if (slots[i] != null && !set.has(slots[i])) slots[i] = null;
  const have = new Set(slots.filter(x => x != null));
  const add = hand.filter(id => !have.has(id));
  if (auto || have.size === 0) { arrange('akilli'); return; }
  for (const id of add) { let i = 29; while (i >= 0 && slots[i] != null) i--; if (i < 0) i = slots.indexOf(null); slots[i] = id; }
}
function arrange(kind) {
  const hand = G ? G.hands[mySeat].slice() : []; slots.fill(null);
  let seq = [];
  if (kind === 'seri' || kind === 'cift') {
    const vs = hand.map(id => ({ id, v: val(id) }));
    const jok = vs.filter(o => o.v.j).map(o => o.id), rest = vs.filter(o => !o.v.j);
    if (kind === 'seri') rest.sort((a, b) => a.v.c - b.v.c || a.v.n - b.v.n);
    else rest.sort((a, b) => a.v.n - b.v.n || a.v.c - b.v.c);
    let prev = null;
    for (const o of rest) {
      if (prev && (kind === 'seri' ? (o.v.c !== prev.c || o.v.n > prev.n + 1) : o.v.n !== prev.n)) seq.push(null);
      seq.push(o.id); prev = o.v;
    }
    seq.push(null, ...jok);
  } else {
    const m = melds(hand);
    for (const grp of m.melds) seq.push(...grp, null);
    const left = m.left.slice().sort((a, b) => { const x = val(a), y = val(b); return (x.j - y.j) || x.c - y.c || x.n - y.n; });
    seq.push(...left);
  }
  let i = 0; const groups = []; let cur = [];
  for (const id of seq) { if (id == null) { if (cur.length) groups.push(cur); cur = []; } else cur.push(id); }
  if (cur.length) groups.push(cur);
  for (const grp of groups) {
    if ((i % 15) + grp.length > 15 && i < 15) i = 15;
    for (const id of grp) { if (i >= 30) i = slots.indexOf(null); slots[i++] = id; }
    if (i % 15 !== 0) i++;
  }
  for (const id of hand) if (!slots.includes(id)) slots[slots.indexOf(null)] = id;
  dirty = true;
}
function moveTo(id, from, t) {
  if (from != null) slots[from] = null;
  if (slots[t] == null) { slots[t] = id; return; }
  let best = -1, bd = 99;
  for (let e = 0; e < 30; e++) if (slots[e] == null && Math.abs(e - t) < bd && ((e / 15) | 0) === ((t / 15) | 0)) { bd = Math.abs(e - t); best = e; }
  if (best < 0) for (let e = 0; e < 30; e++) if (slots[e] == null && Math.abs(e - t) < bd) { bd = Math.abs(e - t); best = e; }
  if (best > t) for (let k = best; k > t; k--) slots[k] = slots[k - 1];
  else for (let k = best; k < t; k++) slots[k] = slots[k + 1];
  slots[t] = id;
}
const meldSet = () => { if (!G) return new Set(); const m = melds(G.hands[mySeat]); return new Set(m.melds.flat()); };
let meldCache = { seq: -1, set: new Set() };

/* ------------------------------------------------------------ ses (sentez) */
let AC = null;
function audio() { if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (AC && AC.state !== 'running') AC.resume().catch(() => {}); return AC; }
['pointerdown', 'touchend'].forEach(e => document.addEventListener(e, audio, { capture: true, passive: true }));
function noise(dur, f, q, vol, type) {
  if (!P.sound || !AC || AC.state !== 'running') return;
  const n = Math.floor(AC.sampleRate * dur), b = AC.createBuffer(1, n, AC.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, type === 'sip' ? 1.2 : 6);
  const s = AC.createBufferSource(); s.buffer = b;
  const bp = AC.createBiquadFilter(); bp.type = type === 'pour' ? 'lowpass' : 'bandpass'; bp.frequency.value = f; bp.Q.value = q;
  const g = AC.createGain(); g.gain.value = vol;
  s.connect(bp); bp.connect(g); g.connect(AC.destination); s.start();
  if (type === 'pour') bp.frequency.linearRampToValueAtTime(f * 2.5, AC.currentTime + dur);
}
const clack = (v = 1) => { noise(0.07, 2600 + Math.random() * 600, 2.2, 0.55 * v); noise(0.05, 900, 3, 0.25 * v); };
const sipS = () => noise(0.45, 700, 1.2, 0.25, 'sip');
const pourS = () => noise(1.4, 500, 0.8, 0.18, 'pour');
function chime() { if (!P.sound || !AC || AC.state !== 'running') return; [523, 659, 784, 1046].forEach((f, i) => { const o = AC.createOscillator(), g = AC.createGain(); o.frequency.value = f; o.type = 'triangle'; g.gain.setValueAtTime(0, AC.currentTime + i * 0.12); g.gain.linearRampToValueAtTime(0.18, AC.currentTime + i * 0.12 + 0.02); g.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + i * 0.12 + 0.6); o.connect(g); g.connect(AC.destination); o.start(AC.currentTime + i * 0.12); o.stop(AC.currentTime + i * 0.12 + 0.7); }); }

/* ------------------------------------------------------------ çay */
const tea = [0, 1, 2, 3].map(() => ({ lvl: 0.9, sip: 0, fill: 0 }));
function teaSip(seat, net) {
  const t = tea[seat]; if (t.lvl < 0.05 || t.sip) return;
  t.sip = performance.now(); if (rel(seat) === 0) sipS();
  setTimeout(() => { t.lvl = Math.max(0, t.lvl - 0.3); dirty = true; ui(); }, 650);
  if (NET && !net) NET.room.send('tea', { s: seat, a: 'sip' });
}
function teaFill(seat, net) {
  const t = tea[seat]; if (t.fill) return;
  t.fill = performance.now(); if (rel(seat) === 0) { pourS(); toast(T('Çaycı geliyor… ☕'), 1600); }
  setTimeout(() => { t.lvl = 0.92; t.fill = 0; dirty = true; ui(); }, 1600);
  if (NET && !net) NET.room.send('tea', { s: seat, a: 'fill' });
}
function drawGlass(cx, cy, k, t, now) {
  let lift = 0, tilt = 0;
  if (t.sip) { const p = (now - t.sip) / 1300; if (p >= 1) t.sip = 0; else { const e = Math.sin(Math.PI * p); lift = e * 34 * k; tilt = e * -0.5; } }
  ctx.save(); ctx.translate(cx, cy);
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.ellipse(4 * k, 6 * k, 46 * k, 15 * k, 0, 0, 7); ctx.fill();
  const sg = ctx.createRadialGradient(-10 * k, -3 * k, 2, 0, 0, 44 * k); sg.addColorStop(0, '#ffffff'); sg.addColorStop(0.7, '#d9d4cf'); sg.addColorStop(1, '#a69f99');
  ctx.fillStyle = sg; ctx.beginPath(); ctx.ellipse(0, 0, 42 * k, 13 * k, 0, 0, 7); ctx.fill();
  ctx.strokeStyle = '#b22d2d'; ctx.lineWidth = 2 * k; ctx.beginPath(); ctx.ellipse(0, 0, 35 * k, 10 * k, 0, 0, 7); ctx.stroke();
  ctx.translate(0, -lift); ctx.rotate(tilt);
  const gw = 22 * k, gh = 64 * k;
  const glassPath = () => { ctx.beginPath(); ctx.moveTo(-gw, -gh); ctx.bezierCurveTo(-gw * 0.95, -gh * 0.55, -gw * 0.42, -gh * 0.5, -gw * 0.5, -gh * 0.34); ctx.bezierCurveTo(-gw * 0.62, -gh * 0.18, -gw * 0.85, -gh * 0.06, -gw * 0.8, 0); ctx.lineTo(gw * 0.8, 0); ctx.bezierCurveTo(gw * 0.85, -gh * 0.06, gw * 0.62, -gh * 0.18, gw * 0.5, -gh * 0.34); ctx.bezierCurveTo(gw * 0.42, -gh * 0.5, gw * 0.95, -gh * 0.55, gw, -gh); ctx.closePath(); };
  glassPath(); ctx.save(); ctx.clip();
  ctx.fillStyle = 'rgba(255,255,255,.1)'; ctx.fillRect(-gw, -gh, gw * 2, gh);
  const lv = clamp(t.lvl, 0, 1) * gh * 0.92;
  if (lv > 1) {
    const tg = ctx.createLinearGradient(0, -lv, 0, 0); tg.addColorStop(0, '#c23c0e'); tg.addColorStop(0.4, '#952508'); tg.addColorStop(1, '#5a1404');
    ctx.fillStyle = tg; ctx.fillRect(-gw, -lv, gw * 2, lv);
    ctx.fillStyle = 'rgba(255,170,90,.6)'; ctx.fillRect(-gw, -lv, gw * 2, 2 * k);
  }
  ctx.restore();
  glassPath(); ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 1.6 * k; ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.38)'; ctx.fillRect(-gw * 0.7, -gh * 0.95, 3 * k, gh * 0.4);
  ctx.strokeStyle = '#d9d9d9'; ctx.lineWidth = 2 * k; ctx.beginPath(); ctx.moveTo(gw * 0.2, -gh * 0.2); ctx.lineTo(gw * 1.3, -gh * 1.15); ctx.stroke();
  if (t.lvl > 0.1) {
    ctx.globalAlpha = 0.18 + 0.12 * Math.sin(now / 700);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 3 * k; ctx.lineCap = 'round';
    for (let i = 0; i < 2; i++) { ctx.beginPath(); const ph = now / 900 + i * 2; for (let s = 0; s <= 10; s++) { const yy = -gh - 6 * k - s * 5 * k, xx = Math.sin(ph + s * 0.6) * 6 * k + (i - 0.5) * 12 * k; s ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}

/* ------------------------------------------------------------ manzara + kar (odanın arkasında) */
const flakes = Array.from({ length: 190 }, () => ({ x: Math.random(), y: Math.random(), r: 0.7 + Math.random() * 2.6, s: 0.25 + Math.random() * 0.7, w: Math.random() * 6 }));
let lastView = 0;
function drawView(now, dt) {
  const snow = snowing();
  if (!snow && now - lastView < 1000 && !dirty) return;
  lastView = now;
  vctx.setTransform(sc * dpr, 0, 0, sc * dpr, 0, 0);
  const [gx0, gy0, gx1, gy1] = S.glass, x0 = fx + gx0, y0 = Math.max(0, fy + gy0 - (fy > 0 ? fy : 0)), w = gx1 - gx0, h = fy + gy1 - y0;
  vctx.fillStyle = '#0d0f1a'; vctx.fillRect(x0, 0, VW - x0, fy + gy1);
  if (viewImg.complete && viewImg.naturalWidth) {
    const v = S.view; vctx.drawImage(viewImg, fx + v.ox, fy + v.oy, viewImg.naturalWidth * v.s, viewImg.naturalHeight * v.s);
  }
  if (snow) {
    vctx.fillStyle = 'rgba(210,215,230,.07)'; vctx.fillRect(x0, 0, VW - x0, fy + gy1);
    vctx.fillStyle = '#fff';
    for (const f of flakes) {
      f.y += f.s * dt * 0.00012; f.x += Math.sin(now / 1300 + f.w) * 0.00002 * dt;
      if (f.y > 1) { f.y = -0.02; f.x = Math.random(); }
      vctx.globalAlpha = 0.4 + f.r / 5;
      vctx.beginPath(); vctx.arc(x0 + f.x * (VW - x0), f.y * (fy + gy1), f.r, 0, 7); vctx.fill();
    }
    vctx.globalAlpha = 1;
  }
  if (viewPh === 'gece' || viewPh === 'aksam') { vctx.fillStyle = 'rgba(8,10,25,.12)'; vctx.fillRect(x0, 0, VW - x0, fy + gy1); }
}

/* ------------------------------------------------------------ uçan taşlar */
const flights = [];
function fly(id, from, to, ms, back, w0, h0, w1, h1, done) { flights.push({ id, from, to, t0: performance.now(), ms, back, w0, h0, w1, h1, done }); }
const hidden = new Set();

/* ------------------------------------------------------------ çizim */
let dirty = true, lastT = 0, drag = null;
function frame(ts) {
  requestAnimationFrame(frame);
  if (innerWidth + 'x' + innerHeight !== lastSize) layout();
  if (!W) return;
  const dt = Math.min(60, ts - (lastT || ts)); if (ts - lastT < 30) return; lastT = ts;
  drawView(ts, dt); draw(ts);
}
function draw(now) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
  ctx.setTransform(sc * dpr, 0, 0, sc * dpr, 0, 0);
  ctx.save(); ctx.translate(fx, fy);
  const D = S.disc;
  if (G) {
    // atılan taşlar
    for (let s = 0; s < 4; s++) {
      const [dx, dy] = D[rel(s)], d = G.disc[s];
      ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); rr(ctx, dx - DW / 2 - 6, dy - DH / 2 - 6, DW + 12, DH + 12, 10); ctx.stroke(); ctx.setLineDash([]);
      const shown = d.filter(id => !hidden.has(id));
      for (let i = Math.max(0, shown.length - 3); i < shown.length; i++) {
        const k = shown.length - 1 - i;
        if (drag && drag.from === 'left' && drag.moved && i === shown.length - 1 && rel(s) === 3) continue;
        drawTile(shown[i], dx - k * 5, dy - k * 3, DW, DH, false, val(shown[i]).j ? 'okey' : '');
      }
    }
    // orta: deste + gösterge
    const pn = G.pile.length, [px, py] = S.pile, [gx, gy] = S.gost;
    for (let i = Math.min(6, Math.ceil(pn / 8)) - 1; i >= 0; i--) drawTile(null, px - i * 1.5, py - i * 3.2, DW, DH, true);
    ctx.font = '700 17px -apple-system,system-ui'; ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(0,0,0,.5)'; rr(ctx, px - 22, py + 44, 44, 24, 12); ctx.fill();
    ctx.fillStyle = '#f6e3bf'; ctx.fillText(pn + '', px, py + 62);
    drawTile(G.gost, gx, gy, DW, DH, false, '', 0.1);
    ctx.fillStyle = 'rgba(0,0,0,.5)'; rr(ctx, gx - 46, gy + 44, 92, 24, 12); ctx.fill();
    ctx.fillStyle = 'rgba(246,227,191,.9)'; ctx.font = '600 15px -apple-system,system-ui'; ctx.fillText(T('gösterge'), gx, gy + 61);
    const p = 0.5 + 0.5 * Math.sin(now / 260);
    ctx.strokeStyle = `rgba(255,200,100,${0.35 + 0.45 * p})`; ctx.lineWidth = 3;
    if (myTurn() && G.need === 'draw') {
      rr(ctx, px - DW / 2 - 8, py - DH / 2 - 14, DW + 16, DH + 22, 10); ctx.stroke();
      if (G.disc[abs(3)].length) { const [dx, dy] = D[3]; rr(ctx, dx - DW / 2 - 8, dy - DH / 2 - 8, DW + 16, DH + 16, 10); ctx.stroke(); }
    }
    if (myTurn() && G.need === 'discard') { const [dx, dy] = D[0]; rr(ctx, dx - DW / 2 - 8, dy - DH / 2 - 8, DW + 16, DH + 16, 10); ctx.stroke(); }
    // benim taşlarım
    if (meldCache.seq !== G.seq + ':' + slots.join()) meldCache = { seq: G.seq + ':' + slots.join(), set: meldSet() };
    for (let i = 0; i < 30; i++) {
      const id = slots[i]; if (id == null || hidden.has(id) || (drag && drag.id === id && drag.moved)) continue;
      const [x, y] = slotXY(i), up = sel === id ? -12 : 0;
      drawTile(id, x, y + up, TW, TH, false, sel === id ? 'sel' : val(id).j ? 'okey' : meldCache.set.has(id) ? 'meld' : '');
    }
  }
  for (let i = flights.length - 1; i >= 0; i--) {
    const f = flights[i], k = Math.min(1, (now - f.t0) / f.ms), e = 1 - Math.pow(1 - k, 3);
    const x = f.from[0] + (f.to[0] - f.from[0]) * e, y = f.from[1] + (f.to[1] - f.from[1]) * e - Math.sin(Math.PI * k) * 40;
    drawTile(f.back ? null : f.id, x, y, f.w0 + (f.w1 - f.w0) * e, f.h0 + (f.h1 - f.h0) * e, f.back);
    if (k >= 1) { flights.splice(i, 1); if (f.done) f.done(); }
  }
  if (drag && drag.moved && drag.id != null) drawTile(drag.id, drag.x, drag.y, TW * 1.06, TH * 1.06, false, 'sel');
  for (let s = 0; s < 4; s++) { const [gx, gy, k] = S.tea[rel(s)]; drawGlass(gx, gy, k, tea[s], now); }
  ctx.restore();
  dirty = false;
}

/* ------------------------------------------------------------ arayüz */
const SV = inner => `<svg viewBox="0 0 48 48">${inner}</svg>`;
const IC = {
  back: SV('<path class="ln" d="M30 10 16 24l14 14"/>'),
  ppl: SV('<circle cx="24" cy="17" r="7" class="fl"/><path class="fl" d="M11 38c0-8 6-12 13-12s13 4 13 12z"/><circle cx="11" cy="20" r="5" class="fl" opacity=".75"/><circle cx="37" cy="20" r="5" class="fl" opacity=".75"/><path class="fl" opacity=".75" d="M2 36c0-6 4-9 9-9 2 0 4 .5 5 1.5-3 2-5 5-5 8.5zM46 36c0-6-4-9-9-9-2 0-4 .5-5 1.5 3 2 5 5 5 8.5z"/>'),
  help: SV('<circle cx="24" cy="24" r="17" class="ln"/><path class="ln" d="M18.5 19a5.5 5.5 0 1 1 8 5c-2 1-2.5 2.2-2.5 4"/><circle cx="24" cy="34.5" r="2.2" class="fl"/>'),
  gear: SV('<path class="fl" fill-rule="evenodd" d="M21 4h6l1 5.2 3.6 1.5 4.4-3 4.2 4.2-3 4.4 1.5 3.6L44 21v6l-5.2 1-1.5 3.6 3 4.4-4.2 4.2-4.4-3-3.6 1.5L27 44h-6l-1-5.2-3.6-1.5-4.4 3-4.2-4.2 3-4.4-1.5-3.6L4 27v-6l5.2-1 1.5-3.6-3-4.4 4.2-4.2 4.4 3 3.6-1.5zM24 17a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>'),
  drop: SV('<path class="ln" d="M24 8v24M14 23l10 10 10-10M10 40h28"/>'),
  swap: SV('<path class="ln" d="M8 16h30l-7-7M40 32H10l7 7"/>'),
  win: SV('<path class="ln" d="M15 8h18v9a9 9 0 0 1-18 0zM15 11H8c0 6 3 9 7 9M33 11h7c0 6-3 9-7 9M24 26v8M16 40h16M18 34h12"/>'),
  chat: SV('<path class="fl" d="M24 7C13 7 5 14 5 22.5c0 4.6 2.4 8.7 6.2 11.5L9.5 41l8-4.2c2 .5 4.2.8 6.5.8 11 0 19-7 19-15.5S35 7 24 7z"/><circle cx="16" cy="22.5" r="2.6" fill="#1a1412"/><circle cx="24" cy="22.5" r="2.6" fill="#1a1412"/><circle cx="32" cy="22.5" r="2.6" fill="#1a1412"/>')
};
fr.innerHTML = `
<button class="ib" data-a="exit" style="left:22px;top:14px" aria-label="Çık">${IC.back}</button>
<div class="glass title" style="left:106px;top:14px"><i></i><span><b id="ttl"></b><small id="sub"></small></span></div>
<button class="ib" data-a="online" style="left:1440px;top:14px" aria-label="Online">${IC.ppl}</button>
<button class="ib" data-a="rules" style="left:1516px;top:14px" aria-label="Kurallar">${IC.help}</button>
<button class="ib" data-a="menu" style="left:1592px;top:14px" aria-label="Ayarlar">${IC.gear}</button>
<div class="pc me" data-rel="0"><i></i><span><b></b><small></small></span><div class="bub"></div></div>
${[1, 2, 3].map(r => `<div class="pc op" data-rel="${r}"><i><em></em></i><span><b></b><small></small></span><div class="bub"></div></div>`).join('')}
<button class="act" data-a="drop">${IC.drop}<span>${T('Taş At')}</span></button>
<button class="act" data-a="swap">${IC.swap}<span>${T('Dizileri Değiştir')}</span></button>
<button class="act fin" data-a="fin">${IC.win}<span>${T('Bitir')}</span></button>
<button class="act chat" data-a="chat">${IC.chat}<span>${T('Sohbet')}</span></button>
<button class="teab" data-a="teafill">${T('Çay söyle')}</button>
<div class="toast"></div>
<div class="modal" hidden><div class="card"><button class="x" data-a="close">✕</button><div class="mc"></div></div></div>`;
const $ = s => fr.querySelector(s);
const pos = (el, x, y) => { el.style.left = x + 'px'; el.style.top = y + 'px'; };
function placeUI() {
  fr.querySelectorAll('.pc').forEach(el => { const r = +el.dataset.rel; pos(el, ...S.cards[r]); });
  fr.querySelectorAll('.act:not(.chat)').forEach((el, i) => pos(el, 1446, S.acts[i] - 34));
  pos($('.act.chat'), 22, S.chat - 32);
  pos($('.teab'), S.tea[0][0] - 70, S.tea[0][1] + 30);
  pos($('.toast'), ...S.toast);
  $('#ttl').textContent = T(S.name);
}
const hueOf = n => { let h = 0; for (const ch of String(n)) h = (h * 31 + ch.charCodeAt(0)) % 360; return h; };
const avCache = {};
function avatar(name) {
  if (avCache[name]) return avCache[name];
  const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'), h = hueOf(name);
  const g = x.createLinearGradient(0, 0, 0, 128); g.addColorStop(0, `hsl(${h},45%,28%)`); g.addColorStop(1, `hsl(${(h + 40) % 360},60%,52%)`);
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  x.fillStyle = 'rgba(255,255,255,.93)'; x.font = '700 58px -apple-system,system-ui'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText((String(name).trim()[0] || '?').toLocaleUpperCase('tr'), 64, 68);
  return (avCache[name] = c.toDataURL());
}
const myTurn = () => G && !G.over && G.turn === mySeat;
let toastUntil = 0;
function toast(t, ms, warn) { const m = $('.toast'); m.textContent = t; m.classList.add('on'); m.classList.toggle('warn', !!warn); toastUntil = performance.now() + (ms || 2000); }
function ui() {
  if (!G) return;
  for (let r = 0; r < 4; r++) {
    const s = abs(r), el = $(`.pc[data-rel="${r}"]`), seat = G.seats[s];
    el.querySelector('i').style.backgroundImage = `url(${avatar(r === 0 ? (P.name || 'Sen') : seat.name)})`;
    el.querySelector('b').textContent = r === 0 ? (P.name || T('Sen')) : seat.name.replace(' 🤖', '');
    el.querySelector('small').textContent = G.score[s] + ' ' + T('puan');
    el.classList.toggle('turn', !G.over && G.turn === s);
    el.classList.toggle('bot', !!seat.bot && !!NET);
    el.classList.toggle('net', !!NET && !seat.bot);
  }
  $('#sub').textContent = `${T('El')} ${G.n} · ${NET ? T('Online') + ' · ' + NET.room.code : T('Robotlarla')}`;
  const canFin = myTurn() && G.need === 'discard' && finishTile(G.hands[mySeat]) != null;
  $('.act.fin').classList.toggle('on', canFin);
  $('.act[data-a="drop"]').classList.toggle('dim', !(myTurn() && G.need === 'discard' && sel != null));
  $('.teab').classList.toggle('on', tea[mySeat].lvl < 0.05 && !tea[mySeat].fill);
  if (performance.now() > toastUntil) {
    const m = $('.toast'); let t = '';
    if (G.over) t = '';
    else if (myTurn()) t = G.need === 'draw' ? T('Sıra sende: ortadan çek ya da soldakinin attığını al') : T('Bir taş at: sağdaki boş yere sürükle');
    else t = `${G.seats[G.turn].name} ${T('düşünüyor…')}`;
    m.textContent = t; m.classList.toggle('on', !!t); m.classList.remove('warn');
  }
}
setInterval(ui, 400);
function bubble(seat, t) {
  const el = $(`.pc[data-rel="${rel(seat)}"] .bub`); el.textContent = t; el.classList.add('on');
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 2800);
}
const modal = $('.modal'), mc = $('.mc');
function openModal(html, on) { mc.innerHTML = html; modal.hidden = false; modal._on = on || null; }
function closeModal() { modal.hidden = true; mc.innerHTML = ''; modal._on = null; }
modal.addEventListener('click', e => {
  if (e.target === modal) { closeModal(); return; }
  const b = e.target.closest('[data-a],[data-v]'); if (!b) return;
  if (b.dataset.a === 'close') { closeModal(); return; }
  modal._on && modal._on(b, e);
});

/* ------------------------------------------------------------ hamleler */
let botT = 0;
function act(a) {
  if (!G) return;
  if (NET && NET.seat !== 0) { NET.room.send('act', a); return; }
  const err = apply(mySeat, a);
  if (err) { toast(T(err), 1600, true); return; }
  after();
}
function after() {
  animate(G.ev); syncRack(); dirty = true; ui();
  if (NET && NET.seat === 0) NET.room.send('state', G);
  if (G.over) { setTimeout(showEnd, 900); return; }
  clearTimeout(botT);
  const s = G.seats[G.turn];
  if (s.bot) botT = setTimeout(() => { if (!G || G.over || !G.seats[G.turn].bot) return; const t = G.turn, mv = botMove(t); const err = apply(t, mv); if (!err) after(); if (Math.random() < 0.08) teaSip(t); if (Math.random() < 0.05) botChat(t); }, 650 + Math.random() * 900);
}
function seatXY(s) { const r = rel(s); return r === 0 ? slotXY(29) : S.opp[r]; }
let lastEv = '', lastDrop = null;
function animate(ev) {
  if (!ev) return; const k = JSON.stringify(ev) + G.seq; if (k === lastEv) return; lastEv = k;
  const mine = s => rel(s) === 0;
  if (ev.a === 'draw') { hidden.add(ev.id); clack(0.6); fly(ev.id, S.pile, mine(ev.s) ? slotXY(Math.max(0, slots.indexOf(ev.id))) : seatXY(ev.s), 380, !mine(ev.s), DW, DH, mine(ev.s) ? TW : 30, mine(ev.s) ? TH : 40, () => { hidden.delete(ev.id); dirty = true; }); }
  else if (ev.a === 'take') { hidden.add(ev.id); clack(0.6); fly(ev.id, S.disc[rel(ev.from)], mine(ev.s) ? slotXY(Math.max(0, slots.indexOf(ev.id))) : seatXY(ev.s), 380, false, DW, DH, mine(ev.s) ? TW : 30, mine(ev.s) ? TH : 40, () => { hidden.delete(ev.id); dirty = true; }); }
  else if (ev.a === 'disc' || ev.a === 'fin') {
    const from = mine(ev.s) ? (lastDrop || [836, 760]) : seatXY(ev.s), to = ev.a === 'fin' ? S.gost : S.disc[rel(ev.s)];
    hidden.add(ev.id); lastDrop = null;
    fly(ev.id, from, to, 330, false, mine(ev.s) ? TW : 40, mine(ev.s) ? TH : 54, DW, DH, () => { hidden.delete(ev.id); clack(1); dirty = true; });
  } else if (ev.a === 'deal') clack(0.8);
}
function botChat(s) { const L = ['Okey kimde ya?', 'Çaylar tazelensin!', 'Hadi bakalım…', 'Bu el benim 😎', 'Taş gelmiyor ya', 'Ooo güzel', 'Soğuk bugün dışarısı', 'Bi çay daha?']; bubble(s, T(L[(Math.random() * L.length) | 0])); }
function showEnd() {
  if (!G || !G.over) return;
  const o = G.over, w = o.w, me = w === mySeat;
  let title, sub;
  if (w < 0) { title = T('Berabere'); sub = T('Ortada taş kalmadı.'); }
  else {
    title = me ? T('Elini bitirdin!') : `${G.seats[w].name} ${T('bitirdi')}`;
    sub = o.how === 'okey' ? T('Okey atarak bitti · 2 puan') : o.how === 'cift' ? T('Çiftten bitti · 2 puan') : T('1 puan');
  }
  if (me) { P.wins++; chime(); }
  P.hands++; save();
  let hand = '';
  if (w >= 0) {
    const m = melds(G.hands[w]);
    hand = `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:10px 0 6px">${m.melds.concat(m.left.length ? [m.left] : []).map(grp => `<span style="display:flex;gap:3px">${grp.map(id => `<img src="${tileImg(id, 44, 60, false, val(id).j ? 'okey' : '').toDataURL()}" style="width:44px;height:60px">`).join('')}</span>`).join('')}</div>`;
  }
  const canNew = !NET || NET.seat === 0;
  openModal(`<h2>${esc(title)}</h2><div class="ovs">${esc(sub)}</div>${hand}
    <div class="ovs">${G.seats.map((s, i) => `${esc(i === mySeat ? (P.name || T('Sen')) : s.name)}: <b>${G.score[i]}</b>`).join(' · ')}</div>
    ${canNew ? `<button class="btn" data-v="next">${T('Yeni el')}</button>` : `<div class="ovs">${T('Oda sahibi yeni eli başlatacak')}</div>`}`, b => { if (b.dataset.v === 'next') { closeModal(); nextHand(); } });
}
function nextHand() {
  if (NET && NET.seat !== 0) return;
  const d = G ? (G.dealer + 1) % 4 : (Math.random() * 4) | 0;
  G = deal(G ? G.seats : newSeats(), d, G ? G.score : null, G ? G.n + 1 : 1);
  slots.fill(null); sel = null; arrMode = 0; syncRack(true);
  for (const t of tea) if (t.lvl < 0.3 && Math.random() < 0.5) t.lvl = 0.9;
  after();
  toast(G.turn === mySeat ? T('Dağıtan sensin: 15 taşın var, ilk taşı at') : `${G.seats[G.turn].name} ${T('dağıttı')}`, 2400);
}

/* ------------------------------------------------------------ dokunma */
const hitTile = (x, y) => { for (let i = 0; i < 30; i++) { const id = slots[i]; if (id == null) continue; const [sx, sy] = slotXY(i), up = sel === id ? -12 : 0; if (Math.abs(x - sx) < PITCH / 2 && Math.abs(y - sy - up) < TH / 2 + 3) return i; } return -1; };
const near = (x, y, p, r) => Math.abs(x - p[0]) < r && Math.abs(y - p[1]) < r * 1.3;
function slotAt(x, y) {
  const [y0, y1] = S.rowY;
  if (y < y0 - TH / 2 - 30 || y > y1 + TH / 2 + 25) return -1;
  const row = y < (y0 + y1) / 2 ? 0 : 1, x0 = S.rowX[row];
  if (x < x0 - 40 || x > x0 + 15 * PITCH + 40) return -1;
  return row * 15 + clamp(Math.floor((x - x0) / PITCH), 0, 14);
}
const dropSel = () => { if (sel == null || !myTurn() || G.need !== 'discard') return false; lastDrop = slotXY(slots.indexOf(sel)); const id = sel; sel = null; act({ t: 'disc', id }); return true; };
touch.addEventListener('pointerdown', e => {
  audio(); if (!G) return;
  const [x, y] = toF(e.clientX, e.clientY);
  try { touch.setPointerCapture(e.pointerId); } catch (er) {}
  const i = hitTile(x, y);
  if (i >= 0) { drag = { id: slots[i], from: i, sx: x, sy: y, x, y, moved: false }; return; }
  if (myTurn() && G.need === 'draw') {
    const ld = G.disc[abs(3)];
    if (ld.length && near(x, y, S.disc[3], 46)) { drag = { id: ld[ld.length - 1], from: 'left', sx: x, sy: y, x, y, moved: false }; return; }
    if (near(x, y, S.pile, 50)) { act({ t: 'draw' }); return; }
  }
  if (sel != null && myTurn() && G.need === 'discard') {
    if (near(x, y, S.disc[0], 52)) { dropSel(); return; }
    if (near(x, y, S.gost, 50) || near(x, y, S.pile, 50)) { lastDrop = slotXY(slots.indexOf(sel)); const id = sel; sel = null; act({ t: 'fin', id }); return; }
  }
  if (near(x, y, [S.tea[0][0], S.tea[0][1] - 30], 50)) { tapTea(); return; }
});
touch.addEventListener('pointermove', e => {
  if (!drag) return; const [x, y] = toF(e.clientX, e.clientY);
  drag.x = x; drag.y = y; if (Math.hypot(x - drag.sx, y - drag.sy) > 10) drag.moved = true;
});
touch.addEventListener('pointerup', e => {
  if (!drag) return; const d = drag; drag = null; const [x, y] = toF(e.clientX, e.clientY);
  if (d.from === 'left') {
    if (!myTurn() || G.need !== 'draw') return;
    const t = d.moved ? slotAt(x, y) : -1;
    act({ t: 'take' });
    if (t >= 0 && (!NET || NET.seat === 0)) { const id = d.id, cur = slots.indexOf(id); if (cur >= 0) moveTo(id, cur, t); }
    return;
  }
  if (!d.moved) { sel = sel === d.id ? null : d.id; dirty = true; ui(); return; }
  if (myTurn() && G.need === 'discard') {
    if (near(x, y, S.disc[0], 70)) { lastDrop = [x, y]; sel = null; act({ t: 'disc', id: d.id }); return; }
    if (near(x, y, S.gost, 60) || near(x, y, S.pile, 55)) { lastDrop = [x, y]; sel = null; act({ t: 'fin', id: d.id }); return; }
  }
  const t = slotAt(x, y); if (t >= 0) { moveTo(d.id, d.from, t); clack(0.35); }
  dirty = true;
});
touch.addEventListener('pointercancel', () => { drag = null; });
function tapTea() { if (tea[mySeat].lvl < 0.05) teaFill(mySeat); else teaSip(mySeat); }

const PHR = ['Hadi oyna!', 'Okey bende 😎', 'Çaylar benden ☕', 'Güzel taş attın', 'Bu el bitiyor', 'Ooo şanslısın', 'Biraz hızlı ol 😄', 'Kar yağıyor dışarıda ❄️'];
const ARR_N = { akilli: 'Akıllı diz', seri: 'Seri diz', cift: 'Çift diz' };
fr.addEventListener('click', e => {
  const b = e.target.closest('[data-a]'); if (!b || modal.contains(b)) return;
  const a = b.dataset.a;
  if (a === 'menu') showMenu();
  else if (a === 'online') showOnline();
  else if (a === 'rules') showRules();
  else if (a === 'exit') { netLeave(); try { parent.postMessage('game-exit', '*'); } catch (er) {} }
  else if (a === 'chat') openModal(`<h2>${T('Hızlı mesaj')}</h2><div class="phr">${PHR.map((p, i) => `<button data-v="${i}">${esc(T(p))}</button>`).join('')}</div>`, x => { const p = T(PHR[+x.dataset.v]); closeModal(); bubble(mySeat, p); if (NET) NET.room.send('chat', { s: mySeat, t: p }); else if (Math.random() < 0.6) setTimeout(() => botChat(abs(1 + ((Math.random() * 3) | 0))), 1200); });
  else if (a === 'swap') { arrMode = (arrMode + 1) % 3; arrange(ARR[arrMode]); clack(0.5); toast(T(ARR_N[ARR[arrMode]]), 1100); }
  else if (a === 'drop') { if (!dropSel()) toast(myTurn() && G.need === 'discard' ? T('Önce atacağın taşa dokun') : T('Şu an taş atamazsın'), 1500, true); }
  else if (a === 'fin') { const f = G && myTurn() && G.need === 'discard' && finishTile(G.hands[mySeat]); if (f != null && f !== false) { lastDrop = slotXY(slots.indexOf(f)); act({ t: 'fin', id: f }); } else toast(T('Elin henüz bitmiyor'), 1500, true); }
  else if (a === 'teafill') teaFill(mySeat);
});
const TIMES = [['auto', 'Gerçek saat'], ['sabah', 'Sabah'], ['gunduz', 'Gündüz'], ['gunbatimi', 'Gün batımı'], ['aksam', 'Akşam'], ['gece', 'Gece']];
const SNOWS = [['auto', 'Gerçek Stuttgart havası'], ['on', 'Hep kar yağsın'], ['off', 'Açık hava']];
const seg = (key, list, cur) => `<div class="segs">${list.map(([v, n]) => `<button data-v="${key}:${v}" class="${cur === v ? 'on' : ''}">${T(n)}</button>`).join('')}</div>`;
function showMenu() {
  openModal(`<h2>${T('Ayarlar')}</h2>
    <div class="lbl2">${T('Mekan')}</div>${seg('scene', Object.entries(SCN_N), P.scene)}
    <div class="lbl2">${T('Manzara saati')}</div>${seg('time', TIMES, P.time)}
    <div class="lbl2">${T('Hava')}</div>${seg('snow', SNOWS, P.snow)}
    <div class="tog" style="margin-top:10px"><span>${T('Ses efektleri')}</span><button class="sw ${P.sound ? 'on' : ''}" data-v="snd"></button></div>
    <div class="tog"><span>${T('Adın')}: <b>${esc(P.name || '—')}</b></span><button class="btn ghost sm" data-v="name">${T('Değiştir')}</button></div>
    ${!NET || NET.seat === 0 ? `<button class="btn" data-v="new">${T('Yeni el')}</button>` : ''}`, b => {
    const v = b.dataset.v;
    if (v === 'new') { closeModal(); nextHand(); }
    else if (v === 'snd') { P.sound = P.sound ? 0 : 1; save(); b.classList.toggle('on', !!P.sound); }
    else if (v === 'name') askName();
    else if (v && v.includes(':')) {
      const [k, x] = v.split(':');
      if (k === 'scene') setScene(x); else { P[k] = x; save(); loadView(); dirty = true; }
      b.parentNode.querySelectorAll('button').forEach(o => o.classList.toggle('on', o === b));
    }
  });
}
function showRules() { openModal(`<h2>${T('Kurallar')}</h2><div class="rules">${T('OKEY_RULES') === 'OKEY_RULES' ? RULES_TR : T('OKEY_RULES')}</div>`); }
const RULES_TR = `<p><b>Amaç:</b> 14 taşının hepsini per yapıp 15. taşı ortaya atmak.</p>
<p><b>Per:</b> aynı sayının farklı renkleri (3-4 taş: 7 sarı · 7 mavi · 7 siyah) ya da aynı rengin sıralı sayıları (en az 3: 4-5-6 · 12-13-1 olur).</p>
<p><b>Okey:</b> göstergenin bir fazlası, aynı renk. Joker gibi her taşın yerine geçer (köşesinde ★ var). Sahte okey (♣) okeyin yerini tutar.</p>
<p><b>Sıra:</b> ortadan bir taş çek ya da solundakinin attığını al; sonra bir taş at (sağdaki boş yere sürükle ya da taşa dokunup <b>Taş At</b>). Dağıtan 15 taşla başlar, ilk taşı o atar.</p>
<p><b>Bitirmek:</b> elin bitince <b>Bitir</b> düğmesi parlar. 7 çiftle de bitebilirsin. Okeyi atarak ya da çiftten bitirmek 2 puan.</p>
<p><b>Kolaylık:</b> <b>Dizileri Değiştir</b> taşları akıllı / seri / çift diye dizer; per olan taşların altında yeşil çizgi çıkar. Çay bardağına dokun, bir yudum al ☕</p>`;

/* ------------------------------------------------------------ online */
let NET = null, pending = null;
function netOpts() {
  return {
    name: P.name || 'Oyuncu', max: 4,
    onMsg: onNet,
    onPeers: list => { const el = document.getElementById('lobby'); if (el) el.innerHTML = lobbyHTML(list); },
    onLeave: (p) => {
      if (!NET || NET.seat !== 0 || !G) return;
      const s = G.seats.findIndex(x => x.id === p.id); if (s < 0) return;
      G.seats[s] = { name: p.name, bot: true }; toast(`${p.name} ${T('ayrıldı · yerine robot oynuyor')}`, 2600); after();
    },
    onClose: why => { if (NET) { toast(T(why), 3000, true); NET = null; mySeat = 0; nextHandLocal(); } }
  };
}
function nextHandLocal() { G = null; slots.fill(null); nextHand(); }
function lobbyHTML(list) {
  const seats = [0, 1, 2, 3].map(s => { const p = list.find(q => q.seat === s); return `<div>${p ? '🌐 ' + esc(p.name) : '🤖 ' + T('Robot')}<small>${s === 0 ? T('Oda sahibi') : T('Koltuk') + ' ' + (s + 1)}</small></div>`; }).join('');
  return `<div class="seats">${seats}</div>`;
}
function showOnline() {
  if (NET) {
    openModal(`<h2>🌐 ${T('Online oda')}</h2><div class="big">${NET.room.code}</div><div id="lobby">${lobbyHTML(NET.room.peers)}</div>
      <div class="row2"><button class="btn" data-v="share">${T('Linki gönder')}</button><button class="btn ghost" data-v="leave">${T('Odadan çık')}</button></div>`, b => {
      if (b.dataset.v === 'share') share(NET.room);
      else if (b.dataset.v === 'leave') { closeModal(); netLeave(); nextHandLocal(); }
    });
    return;
  }
  openModal(`<h2>🌐 ${T('Arkadaşlarla oyna')}</h2><div class="ovs">${T('Oda kur, kodu ya da linki gönder. 4 kişiye kadar; boş koltuklarda robot oynar.')}</div>
    <div class="row2"><button class="btn" data-v="host">${T('Oda kur')}</button><button class="btn ghost" data-v="join">${T('Odaya katıl')}</button></div>`, b => {
    if (b.dataset.v === 'host') netHost(); else if (b.dataset.v === 'join') joinAsk();
  });
}
function share(room) {
  const url = room.link(), text = `${T('Gönül Plak\'ta okey oynayalım! Oda kodu:')} ${room.code}`;
  if (navigator.share) navigator.share({ title: 'Gönül Plak · Okey', text, url }).catch(() => {});
  else if (navigator.clipboard) navigator.clipboard.writeText(text + ' ' + url).then(() => toast(T('Link kopyalandı'), 1500)).catch(() => {});
}
async function netHost() {
  if (!window.GPNet) return toast(T('Online modül yüklenemedi'), 2000, true);
  openModal(`<h2>${T('Oda kuruluyor…')}</h2>`);
  try {
    const room = await window.GPNet.host('okey', netOpts()); pending = room;
    openModal(`<h2>🌐 ${T('Oda kuruldu')}</h2><div class="big">${room.code}</div><div class="ovs">${T('Arkadaşların Oyunlar › Okey › 🌐 › Odaya katıl\'a girip bu kodu yazsın ya da linke dokunsun.')}</div>
      <div id="lobby">${lobbyHTML(room.peers)}</div>
      <div class="row2"><button class="btn ghost" data-v="share">${T('Linki gönder')}</button><button class="btn" data-v="start">${T('Başlat')}</button></div>
      <button class="btn ghost" data-v="cancel">${T('Vazgeç')}</button>`, b => {
      if (b.dataset.v === 'share') share(room);
      else if (b.dataset.v === 'cancel') { room.close(); pending = null; closeModal(); }
      else if (b.dataset.v === 'start') startOnline(room);
    });
  } catch (e) { openModal(`<h2>${T('Bağlanamadı')}</h2><div class="ovs">${esc(T(e.message || 'İnternet bağlantını kontrol et'))}</div>`); }
}
function startOnline(room) {
  pending = null; room.lock();
  NET = { room, seat: 0 }; mySeat = 0;
  const bots = BOTN.slice().sort(() => Math.random() - 0.5);
  const seats = [0, 1, 2, 3].map(s => { const p = room.peers.find(q => q.seat === s); return p ? { name: p.name, bot: false, id: s === 0 ? 'me' : p.id } : { name: bots[s], bot: true }; });
  G = deal(seats, (Math.random() * 4) | 0, null, 1);
  closeModal(); slots.fill(null); syncRack(true); after();
  toast(T('Online oyun başladı'), 2000);
}
function joinAsk(pre) {
  openModal(`<h2>${T('Odaya katıl')}</h2><div class="lbl2">${T('Oda kodu')}</div><input class="inp" id="code" maxlength="6" value="${esc(pre || '')}" style="text-transform:uppercase;letter-spacing:6px;font-size:34px;text-align:center" autocomplete="off" autocapitalize="characters"><button class="btn" data-v="go">${T('Katıl')}</button>`,
    b => { if (b.dataset.v === 'go') netJoin(document.getElementById('code').value); });
}
async function netJoin(code) {
  if (!window.GPNet) return toast(T('Online modül yüklenemedi'), 2000, true);
  openModal(`<h2>${T('Bağlanılıyor…')}</h2>`);
  try {
    const room = await window.GPNet.join('okey', code, netOpts());
    NET = { room, seat: room.seat }; mySeat = room.seat;
    openModal(`<h2>🌐 ${T('Odadasın')}</h2><div class="big">${room.code}</div><div id="lobby">${lobbyHTML(room.peers)}</div><div class="ovs">${T('Oda sahibi oyunu başlatınca masaya oturacaksın.')}</div>`);
  } catch (e) { openModal(`<h2>${T('Katılamadın')}</h2><div class="ovs">${esc(T(e.message || 'Bağlantı hatası'))}</div><button class="btn" data-v="retry">${T('Tekrar dene')}</button>`, b => { if (b.dataset.v === 'retry') joinAsk(code); }); }
}
function netLeave() { if (NET) { const r = NET.room; NET = null; r.close(); } if (pending) { pending.close(); pending = null; } mySeat = 0; }
function onNet(type, d, from) {
  if (!NET) return;
  if (type === 'state' && NET.seat !== 0) {
    const first = !NET.started || !G || G.n !== d.n; NET.started = true;
    G = d; if (first) { closeModal(); slots.fill(null); }
    animate(G.ev); syncRack(first); dirty = true; ui();
    if (G.over) setTimeout(showEnd, 900);
    return;
  }
  if (type === 'act' && NET.seat === 0 && G) {
    const s = G.seats.findIndex(x => x.id === from.id); if (s < 0) return;
    const err = apply(s, d); if (!err) after(); else NET.room.send('err', { m: err }, from.id);
    return;
  }
  if (type === 'err') { toast(T(d.m), 1600, true); return; }
  if (type === 'chat') { bubble(d.s, String(d.t || '').slice(0, 40)); return; }
  if (type === 'tea') { if (d.a === 'sip') teaSip(d.s, true); else teaFill(d.s, true); return; }
}
window.addEventListener('pagehide', () => netLeave());

/* ------------------------------------------------------------ açılış */
function askName(then) {
  openModal(`<h2>${T('Adın ne?')}</h2><div class="ovs">${T('Masadakiler seni bu isimle görecek.')}</div><input class="inp" id="nm" maxlength="18" value="${esc(P.name || '')}"><button class="btn" data-v="ok">${T('Tamam')}</button>`, b => {
    if (b.dataset.v !== 'ok') return; const n = (document.getElementById('nm').value || '').trim(); if (!n) return;
    P.name = n.slice(0, 18); save(); closeModal(); try { parent.postMessage({ type: 'gp-name', name: P.name }, '*'); } catch (e) {} if (G) { G.seats[mySeat].name = P.name; ui(); } then && then();
  });
}
function boot() {
  stage.append(vcv, bgc, cv, touch, fr); document.body.append(stage);
  roomImg.src = S.img; loadView(); fetchWx(); setInterval(fetchWx, 15 * 60000); placeUI();
  layout(); nextHand();
  setTimeout(() => document.documentElement.classList.add('ready'), 2500);
  if (!P.name) setTimeout(() => askName(() => { if (qs.get('oda')) netJoin(qs.get('oda')); }), 300);
  else if (qs.get('oda')) setTimeout(() => netJoin(qs.get('oda')), 300);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) loadView(); });
  requestAnimationFrame(frame);
  window.__okey = { state: () => G, slots: () => slots, act, apply, solve, isWin, finishTile, melds, mySeat: () => mySeat, netHost, netJoin, setScene, setTime: t => { P.time = t; loadView(); }, startOnline: () => pending && startOnline(pending), pending: () => pending && pending.code, net: () => NET && { seat: NET.seat, code: NET.room.code } };
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
