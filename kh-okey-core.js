/* Gönül Plak · okey kuralları (okey.js ile aynı; 3D kıraathane okeyi bunu kullanır). Otomatik çıkarıldı. */
let G = null;
export function setG(g) { G = g; }
export function getG() { return G; }
const COL = ['#d99a12', '#1a5cc8', '#202020', '#d2232c'], CNAME = ['Sarı', 'Mavi', 'Siyah', 'Kırmızı'];
const raw = id => id >= 104 ? { fake: true } : { c: (id / 26) | 0, n: (((id % 26) / 2) | 0) + 1 };
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


export { COL, raw, val, okeyOf, solve, melds, pairsWin, isWin, finishTile, handScore, BOTN, deal, nextSeat, prevSeat, apply, botMove, bestDiscard };
