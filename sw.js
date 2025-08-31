const CACHE_NAME = 'josh-app-' + new Date().getTime();
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://i.ibb.co/2Y0TgqYr/file-00000000a56462468cec427eb252720e.png'
];

// نصب Service Worker
self.addEventListener('install', function(event) {
  self.skipWaiting(); // نسخه جدید فوراً فعال شود
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch رویدادها
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request) // همیشه از شبکه دریافت کن
      .catch(function() {
        return caches.match(event.request); // فقط اگر آنلاین نبودی از کش استفاده کن
      })
  );
});

// به‌روزرسانی Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});