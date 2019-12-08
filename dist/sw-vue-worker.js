const CACHE_NAME = 'vue-worker'

const onInstall = e => {
    console.warn('[SW] install => ', e)
    self.skipWaiting(); // обновить SW, недожидаясь след захода на сайт
}

const onFetch = event => {
    const req = event.request
        //console.warn('[SW] fetch => ')
    if (req.cache === 'no-cache' ||
        req.referrer === 'http://localhost:8080/') return;

    debugger
    event.respondWith(
        caches.match(req)
        .then(res => res ||
            fetch(req)
            .then(response => caches.open(CACHE_NAME)
                .then(cache => {
                    cache.put(req, response.clone());
                    return response;
                })
            )
        )
    )
}

const onPush = e => {
    console.warn('[SW] ПУШШШШШШШШ => ', e.data.text(), e)
}

self.addEventListener('install', onInstall)

self.addEventListener('fetch', onFetch)

self.addEventListener('push', onPush)