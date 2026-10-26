/* Gönül Plak — offline önbellek.
   Kod dosyaları önce internetten (güncel sürüm hemen gelsin), internet yoksa önbellekten.
   Resimler ve kütüphaneler önce önbellekten. */
const CACHE = 'gonulplak-v17';
const CORE = ['./', 'index.html', 'app.js', 'config.js', 'stretch.js', 'dsp-worker.js', 'manifest.webmanifest', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png',
  ...['sabah', 'gunduz', 'gunbatimi', 'aksam', 'gece', 'kapali-sabah', 'kapali-gunduz', 'kapali-aksam', 'kapali-gece'].map(n => `stg-sonbahar-${n}.webp`)];
const CDN = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
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
  const isCode = same && (req.mode === 'navigate' || /\.(js|html|webmanifest)$/.test(url.pathname) || url.pathname.endsWith('/'));
  if (isCode) {
    const key = req.mode === 'navigate' ? 'index.html' : req;
    e.respondWith(
      fetch(req, { cache: 'no-cache' }).then(r => { if (r.ok) { const cp = r.clone(); e.waitUntil(caches.open(CACHE).then(c => c.put(key, cp))); } return r; })
        .catch(() => caches.match(key, { ignoreSearch: true }).then(h => h || caches.match('index.html')))
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
