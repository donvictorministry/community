var V='dvc-4',A=['./','index.html','styles.css','chat.css','app.js','api.js','audio.js','store.js','stat.js','page-view.js','page-likes.js','page-share.js','active-users.js','manifest.json'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(A);}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V;}).map(function(x){return caches.delete(x);}));}));});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET'||e.request.url.indexOf('script.google')>-1||e.request.url.indexOf('drive.google')>-1)return;e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request);}));});
