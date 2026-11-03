/* Versión publicada (cifrada) de Inglés TDIE. Generado por fuentes/cifrar.js */
const VERSION = 'tdie-1.7-cifrada';
const ARCHIVOS = ['./', 'index.html', 'paquete.cifrado', 'manifest.webmanifest', 'iconos/icono-180.png', 'iconos/icono-192.png', 'iconos/icono-512.png', 'iconos/icono.svg'];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ARCHIVOS))); self.skipWaiting(); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e=>{
  const u = new URL(e.request.url);
  if(e.request.method!=='GET' || u.origin!==location.origin) return;
  e.respondWith(fetch(new Request(e.request, {cache:'no-cache'})).then(r=>{ if(r.ok){ const c = r.clone(); caches.open(VERSION).then(k=>k.put(e.request, c)); } return r; })
    .catch(()=>caches.match(e.request, {ignoreSearch:true}).then(r=>r || caches.match('index.html'))));
});
