const CACHE = 'danskpath-v4-full-education';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png'
];

self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', e=>{
  const req = e.request;
  const url = new URL(req.url);
  
  // Skip API calls - always network
  if (url.pathname.startsWith('/api/')) {
    return;
  }
  
  // For navigation requests, try network first, fallback to cache + index.html
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res=>{
        // Cache successful navigation
        const clone = res.clone();
        caches.open(CACHE).then(c=>c.put(req, clone));
        return res;
      }).catch(()=>caches.match(req).then(r=>r || caches.match('/index.html')))
    );
    return;
  }
  
  // For other assets, cache first, then network
  e.respondWith(
    caches.match(req).then(cached=>{
      if (cached) return cached;
      return fetch(req).then(res=>{
        // Cache new assets
        if (res.ok && req.method === 'GET' && !url.searchParams.has('nocache')) {
          const clone = res.clone();
          caches.open(CACHE).then(c=>c.put(req, clone));
        }
        return res;
      }).catch(()=>cached)
    })
  );
});

// Handle messages from client
self.addEventListener('message', e=>{
  if (e.data === 'skipWaiting') self.skipWaiting();
});
