try {
//self.importScripts('data/games.js');
    self = this;

// Files to cache
    var cacheName = 'modlo-v1';
    var appShellFiles = [
        './index.html',
        './favicon.png',
        './icons/icon.png',
        './icons/icon-192x192.png',
        './icons/icon-512x512.png',
        './build/bundle.css',
        './build/bundle.css.map',
        './build/bundle.js',
        './build/bundle.js.map'
    ];
    var otherFiles = [];
    var contentToCache = appShellFiles.concat(otherFiles);

// Installing Service Worker
    self.addEventListener('install', function (e) {
        console.log('[Service Worker] Install');
        e.waitUntil(
                caches.open(cacheName).then(function (cache) {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
        })
                );
    });

// Fetching content using Service Worker
    self.addEventListener('fetch', function (e) {
        e.respondWith(
                caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
                );
    });
} catch (err) {
    console.log(err)
}