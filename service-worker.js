const CACHE_NAME = 'entomoffauna-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/favicon.ico',  // Adicionei outros recursos estáticos como imagens, fontes etc.
];

self.addEventListener('install', (event) => {
    // Instalei o Service Worker e fazer cache dos arquivos
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    // Tentar servir os recursos do cache quando estiver offline
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    // Ativar o Service Worker e limpar caches antigos
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
