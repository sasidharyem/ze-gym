/* Network first, so a new version shows up the next time the app opens online; the cache is only for offline use. */
const C='zegym-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','manifest.webmanifest','icon-192.png','icon-512.png'])).catch(()=>{}));});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque')){const k=r.clone();caches.open(C).then(c=>c.put(e.request,k)).catch(()=>{});}return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./'))));
});
