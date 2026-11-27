/* =====================================================================
   PORTAIL BENNES MAUPU — Service worker (notifications)
   Fichier à la racine du dépôt bennesmaupu.github.io : /sw.js
===================================================================== */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

// Réception d'une notification envoyée par le portail
self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { title: "Portail Maupu", body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "Portail Maupu", {
    body: d.body || "",
    icon: "/icon-512.png",
    badge: "/icon-180.png",
    tag: d.tag || undefined,
    renotify: !!d.tag,
    data: { url: d.url || "/" },
  }));
});

// Clic sur la notification : ouvre (ou remet au premier plan) la bonne app
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || "/", self.location.origin).href;
  e.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const w of wins) {
      if (w.url.startsWith(self.location.origin) && "focus" in w) {
        await w.focus();
        if ("navigate" in w) { try { await w.navigate(url); } catch (x) {} }
        return;
      }
    }
    await self.clients.openWindow(url);
  })());
});
