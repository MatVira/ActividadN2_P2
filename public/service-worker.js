const CACHE_NAME = "facturacion-cache-v1";
const archivosParaCachear = [
  "/index.html",
  "/clientes.html",
  "/facturacion.html",
  "/facturas.html",
  "/productos.html",
  "./pubblic/css/style.css",
  "./pubblic/js/app.js",
  "./public/manifest.json",
];

// Instala y cachea archivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(archivosParaCachear);
    })
  );
});

// Limpieza de cachés antiguas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Manejo de peticiones
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((respuestaCache) => {
      return respuestaCache || fetch(event.request);
    })
  );
});
