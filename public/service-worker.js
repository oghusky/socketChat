const FILES_TO_CACHE = [
  '/',
  '../../views/layout.ejs',
  '../../views/partials/navbar.ejs',
  '../../views/partials/footer.ejs',
  './build/app.bundle.js',
  './css/main.css',
  './html/cookie-policy.html',
  './js/cookie.js',
  './images/avatar.png',
  'https://use.fontawesome.com/releases/v5.6.3/css/all.css',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

self.addEventListener("install", evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Your files were pre-cached successfully!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// activate service worker eventlistener
self.addEventListener("activate", evt => {
  evt.waitUntil(
    caches.keys().then(keylist => {
      return Promise.all(
        keylist.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data: ", key);
            return caches.delete(key);
          }
        })
      )
    })
  );
  self.clients.claim();
});

//fetch
self.addEventListener("fetch", evt => {
  console.log("FETCH EVENT:", evt);
});