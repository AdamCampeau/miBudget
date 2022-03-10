const APP_PREFIX = "miBudget"
const VERSION = "0.9"
const CACHE_NAME = APP_PREFIX + VERSION

const FILES_TO_CACHE = [
    './index.html',
    './css/styles.css',
    './js/index.js',
    './js/idb.js',
    './manifest.json',
    './icons/icon-72x72.png',
    './icons/icon-96x96.png',
    './icons/icon-128x128.png',
    './icons/icon-144x144.png',
    './icons/icon-152x152.png',
    './icons/icon-192x192.png',
    './icons/icon-384x384.png',
    './icons/icon-512x512.png',
];

//install cache
self.addEventListener('install',function(e){
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log("installing" + CACHE_NAME + "data")
            return cache.addAll(FILES_TO_CACHE)
        })
    )

});

//activate cache
self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then()
    )
})

//fetch with cache response
