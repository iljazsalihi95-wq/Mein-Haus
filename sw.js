const CACHE='mein-haus-20261019-repair1';
const CORE=['./','./index.html','./style.css?v=build1','./app.js?v=20261019-repair1','./manifest.json','./logo.jpg','./icon-128.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mein-haus-')&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=='GET'||u.origin!==self.location.origin)return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html')));return}
 if(!CORE.some(p=>new URL(p,self.registration.scope).href===u.href))return;
 e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
