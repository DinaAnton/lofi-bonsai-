// Lofi Bonsai service worker — bump CACHE when you change assets so installed apps refresh.
const CACHE = 'lofi-bonsai-v1';
const SHELL = ['./','index.html','manifest.webmanifest','favicon.ico','assets/logo.png','assets/bg-video.mp4',
  'icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png','icons/favicon-32.png','icons/favicon-16.png'];

self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });

// Video needs HTTP range support (Safari/Chrome seeking & looping) — answer ranges from the cached full file.
async function ranged(req, res){
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range'));
  const buf = await res.arrayBuffer(), size = buf.byteLength;
  let s = m[1] ? +m[1] : 0, e = m[2] ? +m[2] : size-1;
  if(!m[1] && m[2]){ s = size - +m[2]; e = size-1; }
  e = Math.min(e, size-1);
  return new Response(buf.slice(s, e+1), { status:206, statusText:'Partial Content', headers:{
    'Content-Type': res.headers.get('Content-Type') || 'video/mp4',
    'Content-Range': `bytes ${s}-${e}/${size}`, 'Content-Length': e-s+1 }});
}

self.addEventListener('fetch', e=>{
  const req = e.request;
  if(req.method!=='GET' || new URL(req.url).origin!==location.origin) return;
  e.respondWith((async()=>{
    const cache = await caches.open(CACHE);
    if(req.mode==='navigate'){            // page: network first, cached copy when offline
      try{ const net = await fetch(req); if(net.ok) cache.put('index.html', net.clone()); return net; }
      catch(_){ return (await cache.match('index.html')) || (await cache.match('./')); }
    }
    const hit = await cache.match(req.url);   // assets: cache first
    if(hit) return req.headers.has('range') ? ranged(req, hit) : hit;
    const net = await fetch(req);
    if(net.status===200) cache.put(req.url, net.clone());
    return net;
  })());
});
