// خدمة العمل دون إنترنت: تجلب النسخة الأحدث دائماً وترجع للكاش عند انقطاع الإنترنت. غيّر C عند التحديث
const C = 'aj-v4', F = ['./', './index.html', './manifest.json', './bara-salfa.js', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(F.map(u => new Request(u, {cache: 'reload'}))))); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request, {cache: 'no-cache'}).then(res => {
    if (res.ok) { const cp = res.clone(); caches.open(C).then(c => c.put(e.request, cp)); }
    return res;
  }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
});
