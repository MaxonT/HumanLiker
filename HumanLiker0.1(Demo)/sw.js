// Simple offline cache for Humanzier v0.1
const CACHE = 'humanzier-cache-v0-1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.webmanifest',
  './assets/favicon.svg',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k!==CACHE ? caches.delete(k) : null))));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).then(resp => {
      // Optionally: runtime cache non-opaque GETs
      return resp;
    }).catch(()=> caches.match('./index.html')))
  );
});
