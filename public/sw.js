let cacheData = "appV1";

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                "/",
                "/index.html",
                "/static/js/bundle.js",
                "/static/js/main.chunk.js",
                "/static/js/0.chunk.js",
                "/favicon.ico",
                "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css",
                "/static/media/CGPLogo.036d3198e1ff32b21024.png",
                "/buildingAlerts",
                "/users/",
                "/alerts/buildings",
                "/serviceCheck",
                "/addRecord",
                "/login/auth",
                "/buildingAlerts/detailedAlerts",
                "https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap",
                "/static/media/safety.452d51316b418c6a23ed1a41f2a3d044.svg",
                "/static/media/bell.1a9e3ba8438619bf458691d6f04df0b2.svg",
                "/static/media/service.8559aef1c673bf38e524c6e8f7b151ac.svg",
                "/static/media/thermal.7ddc13e2c632961de33a4df44dec6aab.svg",
                "/static/media/energy.16abbdc0c52a60525e7d5c3e2c21eaf6.svg",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",




                ]);
        })
    )
});

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl)
            })
        )
    }
})