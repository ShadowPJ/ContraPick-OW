/* Contrapick — helpers compartidos por index.html y biblioteca.html (única fuente de verdad).
   Script clásico (sin módulos): expone window.CP. Todo texto que viene de los datos debe pasar por esc(). */
(function () {
  "use strict";

  const ROLE_NAME = { tank: "Tanque", dmg: "Daño", sup: "Apoyo" };
  const PX = { xs: 26, s: 44, m: 52, l: 60, xl: 104 }; // tamaño en px por variante de retrato (coincide con .pt-* en styles.css)

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Minúsculas y sin acentos, para búsquedas.
  const norm = (s) => String(s == null ? "" : s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const initials = (n) => { const w = String(n).replace(/[^\p{L}\p{N} .]/gu, "").split(/[ .]+/).filter(Boolean); return (w.length > 1 ? w[0][0] + w[1][0] : String(n).slice(0, 2)).toUpperCase(); };

  // Retrato = marco con color de rol + <img> con dimensiones explícitas (sin saltos de layout).
  // Si la imagen falla se sustituye por el badge de iniciales; el id se recuerda para no
  // volver a pedir un 404 en cada re-render.
  const failed = new Set();
  const iniEl = (txt) => `<span class="ini" aria-hidden="true">${esc(txt)}</span>`;
  const portrait = (h, size, eager) => {
    const n = PX[size], ini = initials(h.name);
    const inner = failed.has(h.id)
      ? iniEl(ini)
      : `<img src="img/${encodeURIComponent(h.id)}.webp" width="${n}" height="${n}" alt="" ${eager ? "" : 'loading="lazy" '}decoding="async" data-id="${esc(h.id)}" data-ini="${esc(ini)}">`;
    return `<span class="pt pt-${size} r-${esc(h.role)}">${inner}</span>`;
  };
  // 'error' no burbujea: se escucha en captura (sin atributos onerror inline, por CSP).
  document.addEventListener("error", (ev) => {
    const t = ev.target;
    if (!t || t.tagName !== "IMG" || t.dataset.ini === undefined) return;
    if (t.dataset.id) failed.add(t.dataset.id);
    const s = document.createElement("span");
    s.className = "ini"; s.setAttribute("aria-hidden", "true"); s.textContent = t.dataset.ini;
    t.replaceWith(s);
  }, true);

  window.CP = Object.freeze({ ROLE_NAME, PX, $, esc, norm, initials, portrait });
})();
