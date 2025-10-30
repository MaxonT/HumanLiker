const CACHE = 'humanzier-cache-v0-2';
const ASSETS = [
  './','./index.html','./styles.css','./script.js','./i18n.js',
  './manifest.webmanifest','./assets/favicon.svg','./assets/icon-192.png','./assets/icon-512.png',
  './privacy.html','./terms.html'
];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k!==CACHE ? caches.delete(k) : null)))); });
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request).catch(()=> caches.match('./index.html'))));
});
