import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const HOST = "https://ashercom.com";
const slugs = fs.readFileSync(path.join(root, "_old-slugs.txt"), "utf8")
  .split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

const exact = {
  "התקנת-תשתית-אינטרנט": { page: "article", id: "internet-infra" },
  "הטיפול-בבעיות-מחשבים": { page: "article", id: "computer-issues" },
  "המדריך-לשיפור-ה-wifi-בבית": { page: "article", id: "wifi-guide" },
  "התקנת-מצלמות-אבטחה": { page: "article", id: "security-cameras" },
  "חידוש-תשתיות-אופטיות": { page: "article", id: "optical-renewal" },
  "מערכות-תקשורת-ובקרה": { page: "article", id: "comm-control" },
  "סידור-וחידוש-ארונות-תקשורת": { page: "article", id: "cabinet-renewal" },
  "ציוד-לסיבים-אופטיים": { page: "article", id: "fiber-equipment" },
  "שדרוג-תשתיות-תקשורת": { page: "article", id: "infra-upgrade" },
  "אינטרנט-לעסקים": { page: "article", id: "internet-business" },
  "תכנון-חדרי-מחשב": { page: "article", id: "computer-rooms" },
  "תיקון-תקלות-תקשורת": { page: "article", id: "comm-faults" },
  "טכנאי-סיבים-אופטיים": { page: "article", id: "fiber-tech" },
  "תשתית-תקשורת-טלפונים-לעסקים-גדולים": { page: "article", id: "telephony-infra" },
  "אביזרי-תקשורת": { page: "article", id: "comm-accessories" },
  "אחזקת-תשתיות-תקשורת": { page: "article", id: "infra-maintenance" },
  "כיצד-אינטרנט-עם-סיב-אופטי-ישפר-את-העבוד": { page: "article", id: "fiber-internet" },
  "שאלות-נפוצות-על-סיבים-אופטיים": { page: "article", id: "fiber-faq" },
  "פתרונות-תקשורת-לעסקים-על-גבי-האינטרנט": { page: "article", id: "biz-solutions" },
  "טכנאי-רשתות-תקשורת": { page: "article", id: "comm-tech" },
  "מערכות-כריזה": { page: "article", id: "pa-systems" },
  "מצלמות-אבטחה-לעסקים": { page: "article", id: "cameras-business" },
  "ארונות-תקשורת": { page: "service", id: "servers" },
  "מערכת-מצלמות-אבטחה": { page: "service", id: "cameras" },
  "סיבים-אופטיים": { page: "service", id: "fiber" },
  "תקשורת-אופטית": { page: "service", id: "optical" },
  "רשת-מחשבים-לחברות-ועסקים": { page: "service", id: "network" },
  "תקשורת-מחשבים": { page: "service", id: "computers" },
  "תקשורת-טלפוניה": { page: "service", id: "telephony" },
  "מערכות-מתח-נמוך": { page: "service", id: "lowvoltage" },
  "פרופיל-חברה": { page: "about", id: "" },
  "צור-קשר": { page: "contact", id: "" },
  "home-page": { page: "home-alias", id: "" },
  "קבלן-תשתיות-תקשורת": { page: "home-alias", id: "" }
};

const canon = {
  article: {
    "internet-infra": "התקנת-תשתית-אינטרנט",
    "computer-issues": "הטיפול-בבעיות-מחשבים",
    "wifi-guide": "המדריך-לשיפור-ה-wifi-בבית",
    "security-cameras": "התקנת-מצלמות-אבטחה",
    "optical-renewal": "חידוש-תשתיות-אופטיות",
    "comm-control": "מערכות-תקשורת-ובקרה",
    "cabinet-renewal": "סידור-וחידוש-ארונות-תקשורת",
    "fiber-equipment": "ציוד-לסיבים-אופטיים",
    "infra-upgrade": "שדרוג-תשתיות-תקשורת",
    "internet-business": "אינטרנט-לעסקים",
    "computer-rooms": "תכנון-חדרי-מחשב",
    "comm-faults": "תיקון-תקלות-תקשורת",
    "fiber-tech": "טכנאי-סיבים-אופטיים",
    "telephony-infra": "תשתית-תקשורת-טלפונים-לעסקים-גדולים",
    "comm-accessories": "אביזרי-תקשורת",
    "infra-maintenance": "אחזקת-תשתיות-תקשורת",
    "fiber-internet": "כיצד-אינטרנט-עם-סיב-אופטי-ישפר-את-העבוד",
    "fiber-faq": "שאלות-נפוצות-על-סיבים-אופטיים",
    "biz-solutions": "פתרונות-תקשורת-לעסקים-על-גבי-האינטרנט",
    "comm-tech": "טכנאי-רשתות-תקשורת",
    "pa-systems": "מערכות-כריזה",
    "cameras-business": "מצלמות-אבטחה-לעסקים"
  },
  service: {
    servers: "ארונות-תקשורת",
    cameras: "מערכת-מצלמות-אבטחה",
    fiber: "סיבים-אופטיים",
    optical: "תקשורת-אופטית",
    network: "רשת-מחשבים-לחברות-ועסקים",
    computers: "תקשורת-מחשבים",
    telephony: "תקשורת-טלפוניה",
    lowvoltage: "מערכות-מתח-נמוך"
  }
};

const seo = {
  "מערכות-מתח-נמוך": ["מערכות מתח נמוך — אשר תקשורת", "תכנון והתקנת מערכות מתח נמוך: כריזה, מצלמות IP ובקרת כניסה. אשר תקשורת בפריסה ארצית."],
  "סיבים-אופטיים": ["סיבים אופטיים — התקנת כבל סיב אופטי וקבלן סיבים", "התקנת סיבים אופטיים וקבלן סיבים אופטיים: כבל סיב אופטי, תשתית סיבים אופטיים ומדידות OTDR."],
  "תקשורת-מחשבים": ["תקשורת מחשבים — תשתיות ורשתות תקשורת מחשבים", "תשתיות תקשורת מחשבים, רשתות תקשורת מחשבים והקמת תשתית תקשורת: CAT6A, חדרי מחשב ומסדים."],
  "תקשורת-אופטית": ["תקשורת אופטית — אשר תקשורת", "תקשורת אופטית לעסקים: משדר, תווך ומקלט על בסיס אור. תכנון והתקנה בפריסה ארצית."],
  "התקנת-תשתית-אינטרנט": ["התקנת תשתית אינטרנט — אשר תקשורת", "התקנת תשתית אינטרנט לעסק ולבית: נתב, מתג, נקודות קצה וליווי מקצועי."],
  "אינטרנט-לעסקים": ["אינטרנט לעסקים — אינטרנט עסקי", "אינטרנט לעסקים ואינטרנט עסקי: אפיון תשתית, חיבור יציב, אבטחה ותחזוקה."],
  "שאלות-נפוצות-על-סיבים-אופטיים": ["שאלות נפוצות על סיבים אופטיים — חיבור סיב אופטי", "חיבור סיב אופטי לעסק: מה כולל החיבור, כמה זמן זה לוקח ומה ההבדל מכבל נחושת."],
  "פתרונות-תקשורת-לעסקים-על-גבי-האינטרנט": ["פתרונות תקשורת לעסקים — תשתיות תקשורת לעסקים קטנים", "פתרונות תקשורת לעסקים קטנים וגדולים: תשתית, אינטרנט, טלפוניה ורשת פנימית."],
  "טכנאי-רשתות-תקשורת": ["טכנאי תקשורת ורשתות — אשר תקשורת", "טכנאי תקשורת וטכנאי רשתות תקשורת בשטח: אפיון תקלה, תיקון תשתית ומדידות."],
  "מערכת-מצלמות-אבטחה": ["מערכת מצלמות אבטחה — אשר תקשורת", "מערכת מצלמות אבטחה לבית ולעסק: תכנון, התקנה, גישה מרחוק ותחזוקה."],
  "התקנת-מצלמות-אבטחה": ["התקנת מצלמות אבטחה — אשר תקשורת", "התקנת מצלמות אבטחה: מיפוי נקודות, חיבור לרשת ותיעוד. אשר תקשורת בפריסה ארצית."],
  "מצלמות-אבטחה-לעסקים": ["מצלמות אבטחה לעסקים — אשר תקשורת", "מצלמות אבטחה לעסקים: קופות, מחסן, כניסות וגישה מרחוק. תכנון והתקנה מקצועית."],
  "מערכות-כריזה": ["מערכות כריזה — אשר תקשורת", "מערכות כריזה למוסדות, בתי ספר ועסקים — תכנון, התקנה ותחזוקה."],
  "רשת-מחשבים-לחברות-ועסקים": ["רשת מחשבים לחברות ועסקים — אשר תקשורת", "הקמת רשת מחשבים לחברות ועסקים: תשתית, חדרי תקשורת וליווי שוטף."],
  "ארונות-תקשורת": ["ארונות תקשורת — אשר תקשורת", "ארונות תקשורת ושרתים: בחירה, סידור, קירור וחיווט מסודר."],
  "תקשורת-טלפוניה": ["תקשורת טלפוניה — אשר תקשורת", "תקשורת טלפוניה לעסקים: מרכזיות IP, מוקדים ותשתית טלפונים."],
  "פרופיל-חברה": ["פרופיל החברה — אשר תקשורת", "אשר תקשורת — שירותים בפריסה ארצית בסיבים אופטיים, תקשורת מחשבים ומערכות מתח נמוך."],
  "צור-קשר": ["צור קשר — אשר תקשורת", "צור קשר עם אשר תקשורת: 1-700-505-616, asher@ashercom.com."],
  "קבלן-תשתיות-תקשורת": ["קבלן תשתיות תקשורת — אשר תקשורת", "קבלן תשתיות תקשורת בפריסה ארצית. סיבים אופטיים, רשתות מחשבים, טלפוניה ומערכות מתח נמוך."]
};

function classify(slug) {
  if (exact[slug]) return exact[slug];
  if (/מצלמ/.test(slug)) return { page: "article", id: "security-cameras" };
  if (/כריז/.test(slug)) return { page: "article", id: "pa-systems" };
  if (/מתח-נמוך/.test(slug)) return { page: "service", id: "lowvoltage" };
  if (/wifi|אלחוט|נתב|ראוטר|access-point|נקודת-גישה/.test(slug)) return { page: "article", id: "wifi-guide" };
  if (/תקלות/.test(slug)) return { page: "article", id: "comm-faults" };
  if (/טלפונ|מרכזי/.test(slug)) return { page: "service", id: "telephony" };
  if (/ארון|ארונות/.test(slug)) return { page: "service", id: "servers" };
  if (/חדרי-מחשב/.test(slug)) return { page: "article", id: "computer-rooms" };
  if (/סיב|אופטי/.test(slug)) return { page: "service", id: "fiber" };
  if (/אינטרנט-לעסק|לעסקים|פתרונות-תקשורת/.test(slug)) return { page: "article", id: "internet-business" };
  if (/תשתית-אינטרנט/.test(slug)) return { page: "article", id: "internet-infra" };
  if (/רשת-מחשב|תקשורת-מחשב/.test(slug)) return { page: "service", id: "network" };
  if (/מחשב/.test(slug)) return { page: "article", id: "computer-issues" };
  if (/לקוחות|פרופיל|גלריה/.test(slug)) return { page: "about", id: "" };
  if (/קבלן|תשתיות-תקשורת/.test(slug)) return { page: "article", id: "infra-upgrade" };
  return { page: "article", id: "internet-business" };
}

function primarySlug(info) {
  if (info.page === "about") return "פרופיל-חברה";
  if (info.page === "contact") return "צור-קשר";
  if (info.page === "home-alias") return "";
  if (info.page === "article") return canon.article[info.id] || "";
  if (info.page === "service") return canon.service[info.id] || "";
  return "";
}

function absCanon(slug, info) {
  if (exact[slug] && info.page !== "home-alias") return HOST + "/" + slug + "/";
  const primary = primarySlug(info);
  if (!primary) return HOST + "/";
  return HOST + "/" + primary + "/";
}

function humanTitle(slug) {
  return slug.replace(/-/g, " ");
}

function seoFor(slug, info) {
  if (seo[slug]) return { title: seo[slug][0], desc: seo[slug][1] };
  const primary = primarySlug(info);
  if (primary && seo[primary]) return { title: seo[primary][0], desc: seo[primary][1] };
  const label = humanTitle(slug);
  return {
    title: label + " — אשר תקשורת",
    desc: label + ". אשר תקשורת — קבלן תשתיות תקשורת בפריסה ארצית."
  };
}

function loadWindowArray(file, globalName) {
  const src = fs.readFileSync(path.join(root, file), "utf8");
  return new Function(`${src.replace("window." + globalName, "const " + globalName)}; return ${globalName};`)();
}
const articles = loadWindowArray("js/articles-data.js", "ASHER_ARTICLES");
const services = loadWindowArray("js/services-data.js", "ASHER_SERVICES");
function itemFor(info) {
  if (info.page === "article") return articles.find((a) => a.id === info.id);
  if (info.page === "service") return services.find((a) => a.id === info.id);
  return null;
}

function pageHtml(slug, info, canonicalHref, title, desc) {
  const nav = info.page === "article" ? "articles" : info.page === "about" ? "about" : "";
  const extra = info.page === "service"
    ? `  <script src="js/services-data.js"></script>\n  <script src="js/pretty-page.js"></script>`
    : info.page === "article"
      ? `  <script src="js/articles-data.js"></script>\n  <script src="js/pretty-page.js"></script>`
      : `  <script src="js/pretty-page.js"></script>`;
  const idAttr = info.id ? ` data-id="${info.id}"` : "";
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const item = itemFor(info);
  const selfCanon = canonicalHref === HOST + "/" + slug + "/";
  const crawlBody = (selfCanon && item)
    ? `<div class="seo-seed"><h1>${esc(item.title)}</h1><article class="prose">${item.body}</article></div>`
    : `<noscript><h1>${esc(title)}</h1><p>${esc(desc)}</p></noscript>`;
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script>document.documentElement.classList.add("has-js")</script>
  <style>.has-js .seo-seed{display:none}</style>
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <base href="../">
  <link rel="canonical" href="${canonicalHref}">
  <meta property="og:locale" content="he_IL">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${canonicalHref}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Hebrew:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/site.css">
  <link rel="stylesheet" href="assets/article.css">
</head>
<body data-theme="server" data-nav="${nav}" data-contact="local" data-page="${info.page}"${idAttr}>
  <div id="site-header"></div>
  <main id="main" tabindex="-1">
    ${crawlBody}
  </main>
  <div id="site-footer"></div>
  <script src="js/urls.js"></script>
  <script src="js/chrome.js"></script>
  <script src="js/contact-form.js"></script>
  <script src="js/privacy-consent.js"></script>
  <script src="js/a11y.js"></script>
${extra}
</body>
</html>
`;
}

const aboutSrc = fs.readFileSync(path.join(root, "about.html"), "utf8")
  .replace("<meta charset=\"UTF-8\">", "<meta charset=\"UTF-8\">\n  <base href=\"../\">")
  .replace(/<link rel="canonical"[^>]*>/, "")
  .replace("<title>", `<link rel="canonical" href="${HOST}/פרופיל-חברה/">\n  <title>`);

const sitemapUrls = new Set([HOST + "/"]);
const extraPages = ["articles.html", "privacy.html", "accessibility.html"];
extraPages.forEach((p) => sitemapUrls.add(HOST + "/" + p));

let n = 0;
for (const slug of slugs) {
  const info = classify(slug);
  const dir = path.join(root, slug);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, "index.html");
  const { title, desc } = seoFor(slug, info);
  const canonicalHref = absCanon(slug, info);
  sitemapUrls.add(canonicalHref);
  if (info.page === "about") {
    const about = aboutSrc.includes(`rel="canonical"`)
      ? aboutSrc
      : aboutSrc.replace("<title>", `<link rel="canonical" href="${HOST}/פרופיל-חברה/">\n  <title>`);
    fs.writeFileSync(file, about, "utf8");
  } else {
    fs.writeFileSync(file, pageHtml(slug, info, canonicalHref, title, desc), "utf8");
  }
  n += 1;
}

const locs = [...sitemapUrls].sort();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs.map((loc) => `  <url><loc>${loc}</loc></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(root, "robots.txt"), `User-agent: *
Allow: /

Sitemap: ${HOST}/sitemap.xml
`, "utf8");

console.log("generated", n, "slug pages;", locs.length, "sitemap urls");
