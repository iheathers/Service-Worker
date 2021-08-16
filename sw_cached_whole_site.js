const cacheVersion = 'v2';

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
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
    fetch(event.request)
      .then((response) => {
        const clonedResponse = response.clone();

        caches.open(cacheVersion).then((cache) => {
          console.log({ clonedResponse });
          console.log({ cache });
          cache.put(event.request, clonedResponse);
        });
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cachedResponse) => cachedResponse)
      )
  );
});
