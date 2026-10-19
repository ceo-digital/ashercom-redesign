(function () {
  const href = window.asherHref || {
    article: function (id) { return "article.html?id=" + id; },
    service: function (id) { return "service.html?id=" + id; },
    rewrite: function (html) { return html; }
  };
  const page = document.body.dataset.page || "";
  const id = document.body.dataset.id || "";

  function pageSlug() {
    const parts = decodeURIComponent(location.pathname.replace(/\/+$/, "")).split("/");
    const last = parts[parts.length - 1] || "";
    if (!last || last === "ashercom-redesign" || /\.html$/i.test(last)) return "";
    return last;
  }
  function absCanon(slug) {
    return slug ? "https://ashercom.com/" + slug + "/" : "https://ashercom.com/";
  }
  function setSeo(title, desc, slug) {
    const current = document.title || "";
    if (!current || current === "אשר תקשורת" || current === "מאמר — אשר תקשורת") {
      document.title = title;
    }
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    if (desc && !meta.getAttribute("content")) meta.setAttribute("content", desc);
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    if (link.getAttribute("href") && link.getAttribute("href").indexOf("https://ashercom.com") === 0) return;
    link.href = absCanon(slug);
  }
  function setJsonLd(data) {
    let el = document.getElementById("page-schema");
    if (!el) {
      el = document.createElement("script");
      el.id = "page-schema";
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }

  function renderArticle(item, relatedKind) {
    const all = relatedKind === "service" ? (window.ASHER_SERVICES || []) : (window.ASHER_ARTICLES || []);
    const related = (item.related || []).map(function (rid) { return all.find(function (x) { return x.id === rid; }); }).filter(Boolean).slice(0, 3);
    const listHref = relatedKind === "service" ? href.service : href.article;
    const metaLine = item.read ? item.read + " · אשר תקשורת" : "אשר תקשורת";
    const cover = item.img
      ? `<aside class="article-cover"><img src="${item.img}" alt="${item.title}" fetchpriority="high"></aside>`
      : "";
    const relatedHtml = related.length ? `
      <section class="related">
        <div class="wrap">
          <h2>עוד לקריאה</h2>
          <div class="related-grid">
            ${related.map(function (r) {
              return `<a class="article" href="${listHref(r.id)}">
                <img src="${r.img}" alt="" loading="lazy" decoding="async">
                <div class="article-body">
                  <span>${r.tag}</span>
                  <h3>${r.title}</h3>
                  <p>${r.dek}</p>
                </div>
              </a>`;
            }).join("")}
          </div>
        </div>
      </section>` : "";
    const crumbsMid = relatedKind === "service"
      ? '<a href="index.html#services">שירותים</a>'
      : '<a href="articles.html">מאמרים</a>';
    const title = item.title + " — אשר תקשורת";
    setSeo(title, item.dek, pageSlug());
    setJsonLd({
      "@context": "https://schema.org",
      "@type": relatedKind === "service" ? "Service" : "Article",
      "headline": item.title,
      "name": item.title,
      "description": item.dek,
      "inLanguage": "he",
      "url": absCanon(pageSlug()),
      "provider": { "@type": "LocalBusiness", "name": "אשר תקשורת", "telephone": "+972-1700-505-616" }
    });
    document.getElementById("main").innerHTML = href.rewrite(`
      <section class="article-hero">
        <div class="wrap">
          <div class="crumbs">
            <a href="index.html">בית</a>
            <span>·</span>
            ${crumbsMid}
            ${item.tag && item.tag !== "מאמרים" ? `<span>·</span><span>${item.tag}</span>` : ""}
          </div>
          <div class="article-kicker">${item.tag}</div>
          <h1>${item.title}</h1>
          <p class="meta">${metaLine}</p>
        </div>
      </section>
      <section class="article-body-band">
        <div class="wrap article-layout">
          <article class="prose">${item.body}</article>
          ${cover}
        </div>
      </section>
      ${relatedHtml}
      ${window.ASHER_CONTACT_HTML || ""}
    `);
  }

  if (page === "legacy") {
    const seed = document.querySelector(".seo-seed");
    if (!seed) return;
    const h1 = seed.querySelector("h1");
    const prose = seed.querySelector(".prose");
    const img = prose && prose.querySelector("img");
    renderArticle({
      title: h1 ? h1.textContent.trim() : document.title,
      tag: seed.getAttribute("data-tag") || "מאמר",
      read: "",
      img: img ? img.getAttribute("src") : "assets/work-datacenter.webp",
      dek: "",
      body: prose ? prose.innerHTML : "",
      related: []
    }, "article");
    return;
  }

  if (page === "article") {
    const item = (window.ASHER_ARTICLES || []).find(function (a) { return a.id === id; });
    if (item) renderArticle(item, "article");
    return;
  }
  if (page === "service") {
    const item = (window.ASHER_SERVICES || []).find(function (a) { return a.id === id; });
    if (item) renderArticle(item, "service");
    return;
  }
  if (page === "contact") {
    setSeo("צור קשר — אשר תקשורת", "צור קשר עם אשר תקשורת: 1-700-505-616, asher@ashercom.com.", "צור-קשר");
    document.getElementById("main").innerHTML = window.ASHER_CONTACT_HTML || "";
    return;
  }
  if (page === "home-alias") {
    setSeo("אשר תקשורת — תשתיות תקשורת לעסקים", "קבלן תשתיות תקשורת בפריסה ארצית. סיבים אופטיים, רשתות מחשבים, טלפוניה ומערכות מתח נמוך.", "");
    document.getElementById("main").innerHTML = `
      <section class="article-hero">
        <div class="wrap">
          <div class="article-kicker">אשר תקשורת</div>
          <h1>תשתיות תקשורת לעסקים</h1>
          <p class="meta">קבלן תשתיות בפריסה ארצית</p>
          <p><a class="btn btn-fill" href="index.html">לעמוד הבית</a></p>
        </div>
      </section>
      ${window.ASHER_CONTACT_HTML || ""}
    `;
  }
})();
