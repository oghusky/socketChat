const FILES_TO_CACHE = [
  '/',
  '/login',
  '/register',
  '../views/layout.ejs',
  '../views/auth/welcome.ejs',
  '../views/auth/login.ejs',
  '../views/auth/register.ejs',
  '../views/partials/navbar.ejs',
  '../views/partials/footer.ejs',
  './build/app.bundle.js',
  './build/manifest.json',
  './build/images/apple-touch-icon180x180.png',
  './build/images/blurb_be-logo128X128.png',
  './build/images/blurb_be-logo144X144.png',
  './build/images/blurb_be-logo152x152.png',
  './build/images/blurb_be-logo192x192.png',
  './build/images/blurb_be-logo384x384.png',
  './build/images/blurb_be-logo512x512.png',
  './build/images/blurb_be-logo72x72.png',
  './build/images/blurb_be-logo96X96.png',
  './build/images/icon_128x128.png',
  './build/images/icon_192x192.png',
  './build/images/icon_256x256.png',
  './build/images/icon_512x512.png',
  './build/images/icon_384x384.png',
  './build/images/icon_96x96.png',
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
const fetchEvents = []
//fetch
self.addEventListener("fetch", evt => {
  console.log(evt)
});