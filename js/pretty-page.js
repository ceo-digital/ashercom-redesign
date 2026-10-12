(function () {
  const href = window.asherHref || {
    article: function (id) { return "article.html?id=" + id; },
    service: function (id) { return "service.html?id=" + id; },
    rewrite: function (html) { return html; }
  };
  const page = document.body.dataset.page || "";
  const id = document.body.dataset.id || "";

  function renderArticle(item, relatedKind) {
    const all = relatedKind === "service" ? (window.ASHER_SERVICES || []) : (window.ASHER_ARTICLES || []);
    const related = (item.related || []).map(function (rid) { return all.find(function (x) { return x.id === rid; }); }).filter(Boolean).slice(0, 3);
    const listHref = relatedKind === "service" ? href.service : href.article;
    const crumbsMid = relatedKind === "service"
      ? '<a href="index.html#services">שירותים</a>'
      : '<a href="articles.html">מאמרים</a>';
    document.title = item.title + " — אשר תקשורת";
    document.getElementById("main").innerHTML = href.rewrite(`
      <section class="article-hero">
        <div class="wrap">
          <div class="crumbs">
            <a href="index.html">בית</a>
            <span>·</span>
            ${crumbsMid}
            <span>·</span>
            <span>${item.tag}</span>
          </div>
          <div class="article-kicker">${item.tag}</div>
          <h1>${item.title}</h1>
          <p class="meta">${item.read} · אשר תקשורת</p>
        </div>
      </section>
      <section class="article-body-band">
        <div class="wrap article-layout">
          <article class="prose">${item.body}</article>
          <aside class="article-cover">
            <img src="${item.img}" alt="${item.title}">
          </aside>
        </div>
      </section>
      <section class="related">
        <div class="wrap">
          <h2>עוד לקריאה</h2>
          <div class="related-grid">
            ${related.map(function (r) {
              return `<a class="article" href="${listHref(r.id)}">
                <img src="${r.img}" alt="">
                <div class="article-body">
                  <span>${r.tag}</span>
                  <h3>${r.title}</h3>
                  <p>${r.dek}</p>
                </div>
              </a>`;
            }).join("")}
          </div>
        </div>
      </section>
      ${window.ASHER_CONTACT_HTML || ""}
    `);
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
    document.title = "צור קשר — אשר תקשורת";
    document.getElementById("main").innerHTML = window.ASHER_CONTACT_HTML || "";
    return;
  }
  if (page === "home-alias") {
    document.title = "אשר תקשורת — תשתיות תקשורת לעסקים";
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
