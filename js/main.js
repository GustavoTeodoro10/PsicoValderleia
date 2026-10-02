(function () {
  "use strict";
  var S = window.SITE || {};
  var R = window.REVIEWS || { items: [] };

  /* ---------- WhatsApp CTAs contextuais ---------- */
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    var key = el.getAttribute("data-wa");
    var msg = (S.messages && S.messages[key]) || S.messages.hero;
    el.href = "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(msg);
    el.target = "_blank";
    el.rel = "noopener";
    el.addEventListener("click", function () {
      track("whatsapp_click", { section: key });
    });
  });

  /* ---------- Analytics (só carrega se houver ID) ---------- */
  function track(name, params) {
    try {
      if (window.gtag) window.gtag("event", name, params || {});
      if (window.fbq) window.fbq("trackCustom", name, params || {});
    } catch (e) {}
  }
  if (S.gaId) {
    var g = document.createElement("script");
    g.async = true;
    g.src = "https://www.googletagmanager.com/gtag/js?id=" + S.gaId;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", S.gaId);
  }
  if (S.metaPixelId) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", S.metaPixelId);
    window.fbq("track", "PageView");
  }

  /* ---------- Header ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var menuBtn = document.getElementById("menu-btn");
  var menu = document.getElementById("mobile-menu");
  function setMenu(open) {
    menu.classList.toggle("hidden", !open);
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn.addEventListener("click", function () {
    setMenu(menu.classList.contains("hidden"));
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Scroll reveal ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Avaliações Google ---------- */
  var STAR = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="#FBBC04" d="M12 17.3l-6.2 3.7 1.6-7L2 9.3l7.2-.6L12 2l2.8 6.7 7.2.6-5.4 4.7 1.6 7z"/></svg>';
  var GLOGO = '<svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.2 5.5-4.7 7.2l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.6z"/><path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 010-9.4l-7.9-6.1a24 24 0 000 21.6l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.100 1.400-4.900 2.300-8.300 2.300-6.300 0-11.600-4.100-13.500-9.800l-7.900 6.100C6.500 42.600 14.600 48 24 48z"/></svg>';
  function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

  var list = document.getElementById("reviews-list");
  var items5 = (R.items || []).slice(0, 6);
  if (list && items5.length) {
    list.innerHTML = items5.map(function (r) {
      var stars = "";
      for (var i = 0; i < (r.stars || 5); i++) stars += STAR;
      return '<figure class="review" data-reveal>' +
        '<div class="flex items-center justify-between"><div class="flex gap-0.5" role="img" aria-label="' + (r.stars || 5) + ' de 5 estrelas">' + stars + "</div>" + GLOGO + "</div>" +
        '<blockquote class="mt-4 text-[15.5px] leading-relaxed text-ink/80">' + esc(r.text) + "</blockquote>" +
        '<figcaption class="mt-5 flex items-baseline justify-between gap-3 text-sm"><span class="font-semibold text-ink">' + esc(r.author) + '</span><span class="text-ink/55">' + esc(r.date || "") + "</span></figcaption></figure>";
    }).join("");
    list.querySelectorAll("[data-reveal]").forEach(function (el) { el.classList.add("is-in"); });
    document.getElementById("reviews-empty").classList.add("hidden");
  }
  document.querySelectorAll("[data-google]").forEach(function (a) {
    a.href = R.googleUrl;
    a.addEventListener("click", function () { track("google_reviews_click"); });
  });
  document.getElementById("year").textContent = "2026";
})();
