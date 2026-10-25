/* Gönül Plak — offline önbellek. Sürümü değiştirince eski önbellek silinir. */
const CACHE = 'gonulplak-v9';
const CORE = ['./', 'index.html', 'app.js', 'config.js', 'stretch.js', 'dsp-worker.js', 'manifest.webmanifest', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'stg-gunduz.webp', 'stg-altin.webp', 'stg-gunbatimi.webp', 'stg-alacakaranlik.webp', 'stg-gece.webp', 'stg-dolunay.webp', 'stg-bulutlu.webp', 'stg-bulutlu-aksam.webp', 'stg-bulutlu-gece.webp'];
const CDN = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  if (!same && !CDN.includes(url.hostname)) return; // Spotify, Supabase vb. hep canlı

  if (same) {
    // Önce önbellekten anında aç, arkadan güncelle (bir sonraki açılışta yeni sürüm)
    const key = req.mode === 'navigate' ? 'index.html' : req;
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(key, { ignoreSearch: req.mode === 'navigate' });
      const net = fetch(req).then(r => { if (r.ok) c.put(key, r.clone()); return r; }).catch(() => hit);
      if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
      return net;
    }));
    return;
  }
  // CDN: sürümlü dosyalar, önbellek öncelikli
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req);
    if (hit) return hit;
    const r = await fetch(req);
    if (r.ok || r.type === 'opaque') c.put(req, r.clone());
    return r;
  }));
});
