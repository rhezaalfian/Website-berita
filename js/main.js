// ===== Logika utama website berita =====
(function () {
  "use strict";

  const data = window.NEWS_DATA || [];
  const categories = window.CATEGORIES || [];

  // ---- Utilitas ----
  function formatDate(iso) {
    const bulan = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const d = new Date(iso);
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function articleUrl(id) {
    return `article.html?id=${id}`;
  }

  function categoryUrl(cat) {
    return `category.html?cat=${encodeURIComponent(cat)}`;
  }

  // ---- Komponen ----
  function cardHtml(item) {
    return `
      <article class="card">
        <div class="card-img">
          <a href="${articleUrl(item.id)}">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
          </a>
          <a href="${categoryUrl(item.category)}" class="badge">${item.category}</a>
        </div>
        <div class="card-body">
          <h3><a href="${articleUrl(item.id)}">${item.title}</a></h3>
          <p>${item.excerpt}</p>
          <div class="card-meta">
            <span>✍ ${item.author}</span>
            <span>📅 ${formatDate(item.date)}</span>
          </div>
        </div>
      </article>`;
  }

  // ---- Header dinamis: tanggal & tahun ----
  function renderDateAndYear() {
    const dateEl = document.getElementById("current-date");
    if (dateEl) {
      const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const now = new Date();
      dateEl.textContent = `${hari[now.getDay()]}, ${formatDate(now.toISOString())}`;
    }
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // ---- Navigasi kategori (dibangun dari data) ----
  function renderNav() {
    const nav = document.getElementById("nav-links");
    if (!nav) return;
    const activeCat = getParam("cat");
    const isHome = /index\.html$/.test(location.pathname) || location.pathname.endsWith("/");
    let html = `<li><a href="index.html" class="${isHome && !activeCat ? "active" : ""}">Beranda</a></li>`;
    categories.forEach(function (cat) {
      html += `<li><a href="${categoryUrl(cat)}" class="${activeCat === cat ? "active" : ""}">${cat}</a></li>`;
    });
    nav.innerHTML = html;

    const toggle = document.getElementById("nav-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        nav.classList.toggle("open");
      });
    }
  }

  // ---- Breaking news ticker ----
  function renderTicker() {
    const ticker = document.getElementById("ticker");
    if (!ticker) return;
    const items = data.slice(0, 5).map(function (n) { return n.title; });
    ticker.textContent = items.join("  •  ");
  }

  // ---- Sidebar: populer, tag, newsletter ----
  function renderSidebar() {
    const popular = document.getElementById("popular-list");
    if (popular) {
      // Ambil "terpopuler" sebagai artikel terbaru selain featured (contoh sederhana)
      const items = [...data].slice(0, 5);
      popular.innerHTML = items.map(function (item, i) {
        return `
          <li class="popular-item">
            <span class="popular-num">${i + 1}</span>
            <a href="${articleUrl(item.id)}"><h5>${item.title}</h5></a>
          </li>`;
      }).join("");
    }

    const tags = document.getElementById("tag-cloud");
    if (tags) {
      tags.innerHTML = categories.map(function (cat) {
        return `<a href="${categoryUrl(cat)}">#${cat}</a>`;
      }).join("");
    }

    const nlForm = document.getElementById("newsletter-form");
    if (nlForm) {
      nlForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const input = nlForm.querySelector("input");
        alert("Terima kasih telah berlangganan, " + (input.value || "pembaca") + "!");
        nlForm.reset();
      });
    }
  }

  // ---- Pencarian ----
  function setupSearch() {
    const form = document.getElementById("search-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const q = form.querySelector("input").value.trim();
      if (q) window.location.href = `category.html?q=${encodeURIComponent(q)}`;
    });
  }

  // ---- Halaman Beranda ----
  function renderHome() {
    const heroEl = document.getElementById("hero");
    const gridEl = document.getElementById("news-grid");
    if (!gridEl) return;

    const featured = data.filter(function (n) { return n.featured; }).slice(0, 3);
    const rest = data.filter(function (n) { return !featured.includes(n); });

    if (heroEl && featured.length) {
      const main = featured[0];
      const sides = featured.slice(1, 3);
      heroEl.innerHTML = `
        <a class="hero-main" href="${articleUrl(main.id)}">
          <img src="${main.image}" alt="${main.title}">
          <div class="overlay"></div>
          <div class="caption">
            <span class="badge">${main.category}</span>
            <h2>${main.title}</h2>
          </div>
        </a>
        <div class="hero-side">
          ${sides.map(function (s) {
            return `
              <a class="hero-side-item" href="${articleUrl(s.id)}">
                <img src="${s.image}" alt="${s.title}">
                <div class="overlay"></div>
                <div class="caption">
                  <span class="badge">${s.category}</span>
                  <h3>${s.title}</h3>
                </div>
              </a>`;
          }).join("")}
        </div>`;
    }

    gridEl.innerHTML = rest.map(cardHtml).join("");
  }

  // ---- Halaman Kategori / Pencarian ----
  function renderCategory() {
    const gridEl = document.getElementById("category-grid");
    if (!gridEl) return;

    const cat = getParam("cat");
    const q = getParam("q");
    const titleEl = document.getElementById("category-title");
    let results = data;

    if (q) {
      const query = q.toLowerCase();
      results = data.filter(function (n) {
        return n.title.toLowerCase().includes(query) ||
               n.excerpt.toLowerCase().includes(query) ||
               n.category.toLowerCase().includes(query);
      });
      if (titleEl) titleEl.textContent = `Hasil pencarian: "${q}"`;
      document.title = `Pencarian: ${q} — BeritaKini`;
    } else if (cat) {
      results = data.filter(function (n) { return n.category === cat; });
      if (titleEl) titleEl.textContent = `Kategori: ${cat}`;
      document.title = `${cat} — BeritaKini`;
    } else {
      if (titleEl) titleEl.textContent = "Semua Berita";
    }

    if (results.length) {
      gridEl.innerHTML = results.map(cardHtml).join("");
    } else {
      gridEl.innerHTML = `<div class="empty-state">
        <h3>Tidak ada berita ditemukan</h3>
        <p>Coba kata kunci atau kategori lain.</p>
      </div>`;
    }
  }

  // ---- Halaman Artikel ----
  function renderArticle() {
    const el = document.getElementById("article");
    if (!el) return;

    const id = parseInt(getParam("id"), 10);
    const item = data.find(function (n) { return n.id === id; });

    if (!item) {
      el.innerHTML = `<div class="empty-state">
        <h3>Artikel tidak ditemukan</h3>
        <p><a href="index.html" style="color:var(--primary)">Kembali ke beranda</a></p>
      </div>`;
      return;
    }

    document.title = `${item.title} — BeritaKini`;
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(item.title);

    const bc = document.getElementById("breadcrumb");
    if (bc) {
      bc.innerHTML = `<a href="index.html">Beranda</a> /
        <a href="${categoryUrl(item.category)}">${item.category}</a> /
        <span>${item.title}</span>`;
    }

    el.innerHTML = `
      <span class="badge">${item.category}</span>
      <h1>${item.title}</h1>
      <div class="article-meta">
        <span>✍ ${item.author}</span>
        <span>📅 ${formatDate(item.date)}</span>
        <span>🕐 ${Math.max(1, Math.round(item.content.join(" ").split(" ").length / 200))} menit baca</span>
      </div>
      <figure class="article-figure">
        <img src="${item.image}" alt="${item.title}">
      </figure>
      <div class="article-body">
        ${item.content.map(function (p) { return `<p>${p}</p>`; }).join("")}
      </div>
      <div class="share-bar">
        <span>Bagikan:</span>
        <a class="share-fb" href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" rel="noopener">Facebook</a>
        <a class="share-tw" href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}" target="_blank" rel="noopener">X / Twitter</a>
        <a class="share-wa" href="https://wa.me/?text=${shareText}%20${shareUrl}" target="_blank" rel="noopener">WhatsApp</a>
      </div>`;

    // Berita terkait (kategori sama)
    const related = document.getElementById("related-grid");
    if (related) {
      const rel = data.filter(function (n) {
        return n.category === item.category && n.id !== item.id;
      }).slice(0, 2);
      related.innerHTML = rel.length ? rel.map(cardHtml).join("")
        : `<p style="color:var(--gray)">Belum ada berita terkait.</p>`;
    }
  }

  // ---- Inisialisasi ----
  document.addEventListener("DOMContentLoaded", function () {
    renderDateAndYear();
    renderNav();
    renderTicker();
    renderSidebar();
    setupSearch();
    renderHome();
    renderCategory();
    renderArticle();
  });
})();
