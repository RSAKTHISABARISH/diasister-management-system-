const CACHE_NAME = 'rescueguard-v1';
const ASSETS = [
    './',
    './index.html',
    './user-dashboard.html',
    './admin-dashboard.html',
    './css/styles.css',
    './css/components.css',
    './js/app.js',
    './js/login.js',
    './js/user-dashboard.js',
    './js/admin-dashboard.js',
    './js/map.js',
    './manifest.json',
    './assets/hero.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
