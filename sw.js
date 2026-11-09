/* Gönül Plak — offline önbellek.
   Kod dosyaları önce internetten (güncel sürüm hemen gelsin), internet yoksa önbellekten.
   Resimler ve kütüphaneler önce önbellekten. */
const CACHE = 'gonulplak-v39';
const CORE = ['./', 'index.html', 'app.js', 'config.js', 'stretch.js', 'dsp-worker.js', 'manifest.webmanifest', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png',
  ...['sabah', 'gunduz', 'gunbatimi', 'aksam', 'gece', 'kapali-sabah', 'kapali-gunduz', 'kapali-aksam', 'kapali-gece'].map(n => `stg-sonbahar-${n}.webp`)];
const POOL = ['bilardo.html', 'bl-game.js', 'bl-bg-classic.webp', 'bl-bg-la.webp', 'bl-bg-stg.webp', 'bl-th-classic.webp', 'bl-th-la.webp', 'bl-th-stg.webp', 'bl-av-eren.webp', 'bl-av-mira.webp', 'bl-ballcollision.m4a', 'bl-cue.m4a', 'bl-cushion.m4a', 'bl-pot.m4a', 'bl-success.m4a'];
const isPool = p => /\/(bilardo\.html|bl-[^/]+)$/.test(p);
const CDN = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })))
    .then(() => Promise.allSettled(POOL.map(u => fetch(new Request(u, { cache: 'reload' })).then(r => r.ok && c.put(new URL(u, self.location).href, r)))))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  if (!same && !CDN.includes(url.hostname)) return;
  if (same && url.pathname.endsWith('version.json')) return; // hep canlı
  // bilardo dosyaları: önce önbellek (sürüm değişince önbellek yenilenir) → anında açılır
  if (same && isPool(url.pathname)) {
    const key = url.origin + url.pathname;
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(key);
      if (hit) return hit;
      const r = await fetch(req);
      if (r.ok) c.put(key, r.clone());
      return r;
    }));
    return;
  }
  const isCode = same && (req.mode === 'navigate' || /\.(js|html|webmanifest)$/.test(url.pathname) || url.pathname.endsWith('/'));
  if (isCode) {
    const top = req.mode === 'navigate' && !url.pathname.endsWith('/bilardo.html');
    const key = top ? 'index.html' : url.origin + url.pathname; // bilardo iframe'i ana sayfanın yerine geçmesin
    e.respondWith(
      fetch(req, { cache: 'no-cache' }).then(r => { if (r.ok) { const cp = r.clone(); e.waitUntil(caches.open(CACHE).then(c => c.put(key, cp))); } return r; })
        .catch(() => caches.match(key, { ignoreSearch: true }).then(h => h || (top ? caches.match('index.html') : Response.error())))
    );
    return;
  }
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req);
    if (hit) return hit;
    const r = await fetch(req);
    if (r.ok || r.type === 'opaque') { const cp = r.clone(); c.put(req, cp); }
    return r;
  }));
});
