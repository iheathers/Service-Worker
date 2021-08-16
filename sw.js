const cacheVersion = 'v1';

const cacheAssets = [
  'index.html',
  'about.html',
  '/css/style.css',
  '/js/main.js',
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');

  event.waitUntil(
    caches
      .open(cacheVersion)
      .then((cache) => {
        console.log('Service Worker: Caching Files ');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheVersion) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetcing');

  event.respondWith(
    // (async () => {
    //   console.log('request', event.request);
    //   const cachedResponse = await caches.match(event.request);

    //   if (cachedResponse) return cachedResponse;

    //   return fetch(event.request);
    // })()

    fetch(event.request).catch(() => caches.match(event.request))
  );
});
