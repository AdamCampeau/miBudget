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

//install 
self.addEventListener('install',function(e){
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log("installing" + CACHE_NAME + "data")
            return cache.addAll(FILES_TO_CACHE)
        })
    )

});

//delete
self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function (keys) {
            let cachedList = keys.filter(function (key) {
                return key.indexOd(APP_PREFIX);
            })
            cachedList.push(CACHE_NAME)
            return Promise.all(keys).map(function (key,i) {
                if (cachedList.indesOf(key) === -1) {
                    console.log('Deleting' + keys[i])
                return caches.delete(keys[i])    
                }
            })
        })
    )
})

//fetch 
self.addEventListener('fetch',function (e) {
    e.respondingWith(
        cahces.match(e.request).then(function (request) {
            if (request) {
                console.log(e.request.url)
                return request
            } else {
                console.log( 'fetching' + e.request.url)
                return fetch(e.request)
            }
        })
    )
})
