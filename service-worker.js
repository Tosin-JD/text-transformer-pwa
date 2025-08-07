const CACHE_NAME = "text-transformer-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./assets/css/style.css",
  "./assets/js/script.js",
  "./manifest.json",
  "./assets/images/icons/icon-192.png",
  "./assets/images/icons/icon-512.png"
];

// Install event - caching assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event - cleaning old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
