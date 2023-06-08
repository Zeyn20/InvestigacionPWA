const staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  "https://zeyn20.github.io"
//   "/",
//   "/investigacionPWA",
//   "/investigacionPWA/index.html",
//   "/investigacionPWA/css/style.css",
//   "/investigacionPWA/js/app.js" ,
//   "/investigacionPWA/icon.ico",
//   "/investigacionPWA/images/coffee1.jpg",
//   "/investigacionPWA/images/coffee2.jpg",
//   "/investigacionPWA/images/coffee3.jpg",
//   "/investigacionPWA/images/coffee4.jpg",
//   "/investigacionPWA/images/coffee5.jpg",
//   "/investigacionPWA/images/coffee6.jpg",
//   "/investigacionPWA/images/coffee7.jpg",
//   "/investigacionPWA/images/coffee8.jpg",
//   "/investigacionPWA/images/coffee9.jpg"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", activateEvent => {
  activateEvent.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== staticDevCoffee)
                  .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(cachedResponse => {
      return cachedResponse || fetch(fetchEvent.request);
    })
  );
});
