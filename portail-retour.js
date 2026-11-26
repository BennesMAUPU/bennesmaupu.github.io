/* =====================================================================
   PORTAIL BENNES MAUPU — Bouton « Retour portail »
   Fichier hébergé à la racine du portail : https://bennesmaupu.github.io/portail-retour.js
   Dans chaque app, ajouter juste avant la balise de fermeture du body :
     <script src="/portail-retour.js" defer></script>
   - Onglet discret sur le bord gauche de l'écran (ne gêne ni les en-têtes ni les boutons du bas)
   - Affiché uniquement sur bennesmaupu.github.io, et pas quand l'app est dans une iframe (site Drupal)
===================================================================== */
(function () {
  "use strict";
  if (location.hostname !== "bennesmaupu.github.io") return;
  if (window.top !== window.self) return;              // app intégrée dans une autre page
  if (location.pathname === "/" || location.pathname === "/index.html") return;   // déjà sur le portail
  if (document.getElementById("bm-portail-retour")) return;

  var css =
    "#bm-portail-retour{position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:2147483000;" +
    "display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 6px 10px 5px;" +
    "background:linear-gradient(180deg,#e0213f,#9b0c23);color:#fff;text-decoration:none;" +
    "border-radius:0 12px 12px 0;box-shadow:2px 3px 10px rgba(0,0,0,.28);" +
    "font:700 11px 'Barlow Condensed','Barlow',Arial,sans-serif;letter-spacing:.6px;opacity:.88;" +
    "transition:opacity .15s,padding .15s;-webkit-tap-highlight-color:transparent;}" +
    "#bm-portail-retour:hover,#bm-portail-retour:focus{opacity:1;padding-left:9px;outline:none;}" +
    "#bm-portail-retour:active{transform:translateY(-50%) scale(.95);}" +
    "#bm-portail-retour svg{width:18px;height:18px;display:block;}" +
    "#bm-portail-retour span{writing-mode:vertical-rl;transform:rotate(180deg);text-transform:uppercase;}" +
    "@media print{#bm-portail-retour{display:none!important;}}";

  function add() {
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);

    var a = document.createElement("a");
    a.id = "bm-portail-retour";
    a.href = "/";
    a.title = "Retour au portail";
    a.setAttribute("aria-label", "Retour au portail");
    a.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg><span>Portail</span>';
    document.body.appendChild(a);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", add);
  else add();
})();
