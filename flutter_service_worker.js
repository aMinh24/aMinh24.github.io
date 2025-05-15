'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "fa8486627ddab1600d63a6b9b37f6873",
"assets/AssetManifest.bin.json": "be766c598bfe2bae64dacadcfcf89f33",
"assets/AssetManifest.json": "c4e476fac5becb8894c701b7e9cbe7a0",
"assets/assets/banner.jpg": "c4409e756c11d259048d26eaaa81cc39",
"assets/assets/banner2.jpg": "9e0e86ad1d3db82c5fc17e0e4d9618fd",
"assets/assets/banner3.jpg": "bad07f956b8355bf49f979e18517c1ed",
"assets/assets/banner4.jpg": "4b52c578b4f4d84332e8834da9f72ca8",
"assets/assets/banner5.jpg": "6772675563b6f3c037b50f24d0abe45a",
"assets/assets/banner5N.jpg": "4e7368d3c56b5766c64daf838ed1571a",
"assets/assets/banner6.jpg": "4d63f85d239b9b2f88e43e8227cba9b4",
"assets/assets/banner7.jpg": "d23a3f5d4d1c90138d4747a4e015a176",
"assets/assets/bannerMain.jpg": "d625ff23d9c32d6e25c9fcdca81b4429",
"assets/assets/logoS-removebg-preview.png": "d6899e067059c09a85d3673948481010",
"assets/assets/logoS.jpg": "0b4647ba41a687b3da990a19b8d22479",
"assets/assets/logoSNew.png": "378398d7450eea0b5d5e3130b52b2c52",
"assets/assets/mouseBanner.jpg": "e729c88efbeb96fd7735dc7751b88985",
"assets/assets/p4.jpg": "f0aaf0f2dd92b91be64d4930e6e907d6",
"assets/assets/poster1.jpg": "6d03b375e039975b1f91c3d695b75dbe",
"assets/assets/poster10.png": "6bda677e25cf1dd04a7fdc087eb1f27b",
"assets/assets/poster2.jpg": "472adbf09d963be3d0655f5424d563f8",
"assets/assets/poster3.png": "90076bf532cf423adb465fba88bcd394",
"assets/assets/poster4.jpg": "5c26e2ec9aa82503a8b7f7b33fd5e199",
"assets/assets/poster5.jpg": "189a6d6654132438f0aa8551a7ab8bc9",
"assets/assets/poster6.jpg": "bd14724facf94f5e3c4c20b130137401",
"assets/assets/poster7.png": "03011b1bbd07d9b3ab4d7220290d316c",
"assets/assets/poster8.png": "12abee79a5dc1acd5dc29a96146ec82b",
"assets/assets/poster9.png": "9ecbe9593c21d46b4289b0a1d672e96e",
"assets/assets/product1.jpg": "d549506c55bba620267a0840d9669316",
"assets/assets/product2.jpg": "c94bfd736def638171bb0afb78d81d4e",
"assets/assets/product3.jpg": "21bfe4abc8dcf51769c26cba77a079b0",
"assets/assets/vietnam_locations.json": "e2c98776bbe99c295ba125b17ae542fe",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "a777283902241005fc0e503fea6581ae",
"assets/NOTICES": "f4f9e94a57b07aa9c1c703352e121ef6",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "86e461cf471c1640fd2b461ece4589df",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "34beda9f39eb7d992d46125ca868dc61",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "143755ad3e4d93ec750c32a2ae73edf1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "d33c82970412a94d01b3938129dbca1d",
"/": "d33c82970412a94d01b3938129dbca1d",
"main.dart.js": "bb05bb6a220b9d539ac5bc45e132f2ad",
"manifest.json": "d3339c8ce753afc5d4316a2f2b2f8ae1",
"version.json": "bb48639530ec1774b95af86a32b39efe"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
