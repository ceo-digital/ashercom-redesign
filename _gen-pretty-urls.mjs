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
  "תשתיות-תקשורת-לעסקים": { page: "service", id: "biz-infra" },
  "קבלן-סיבים-אופטיים": { page: "service", id: "fiber-contractor" },
  "פרופיל-חברה": { page: "about", id: "" },
  "צור-קשר": { page: "contact", id: "" },
  "home-page": { page: "home-alias", id: "" }
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
    lowvoltage: "מערכות-מתח-נמוך",
    "biz-infra": "תשתיות-תקשורת-לעסקים",
    "fiber-contractor": "קבלן-סיבים-אופטיים"
  }
};

const seo = {
  "מערכות-מתח-נמוך": ["מערכות מתח נמוך — אשר תקשורת", "תכנון והתקנת מערכות מתח נמוך: כריזה, מצלמות IP ובקרת כניסה. אשר תקשורת בפריסה ארצית."],
  "תשתיות-תקשורת-לעסקים": ["תשתיות תקשורת לעסקים - אשר תקשורת", "תשתיות תקשורת לעסקים: אפיון, תוואי, התקנה, בדיקה ומסירה. סיבים, רשת מחשבים, ארון תקשורת, טלפוניה ומתח נמוך, בפריסה ארצית."],
  "סיבים-אופטיים": ["סיב אופטי לעסקים | סיבים אופטיים, התקנת כבל סיב אופטי ואינטרנט לעסקים עם אשר תקשורת", "סיב אופטי לעסקים: תכנון, התקנה, היתוך ובדיקה של תשתית סיבים אופטיים ואינטרנט לעסקים. אשר תקשורת, 1-700-505-616."],
  "קבלן-סיבים-אופטיים": ["קבלן סיבים אופטיים - אשר תקשורת", "קבלן סיבים אופטיים: אפיון תוואי, השחלה, היתוך, בדיקת OTDR ומסירה. אשר תקשורת בפריסה ארצית."],
  "התקנת-סיבים-אופטיים-מדוע-זה-כדאי": ["התקנת סיבים אופטיים - אשר תקשורת", "התקנת סיבים אופטיים בעסק: אפיון תוואי, השחלה, היתוך, בדיקת OTDR ומסירה. אשר תקשורת בפריסה ארצית."],
  "תקשורת-מחשבים": ["רשתות תקשורת מחשבים - אשר תקשורת", "תשתיות ורשתות תקשורת מחשבים בהתאמה אישית לצרכי העסק. הקמת תשתית תקשורת, חדרי מחשב ומסדים."],
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
  if (info.page === "home-alias") return HOST + "/";
  return HOST + "/" + slug + "/";
}

function humanTitle(slug) {
  return slug.replace(/-/g, " ");
}

const HOME_DESC = "אשר תקשורת, קבלן תשתיות בפריסה ארצית, מספקת תשתיות תקשורת מתקדמות לעסקים, פתרונות מותאמים, ציוד איכותי וליווי מקצועי לכל פרויקט.";

function stripReadMore(s) {
  return String(s || "").replace(/\s*Read\s+More[\s\S]*$/i, "").trim();
}

function seoFor(slug, info) {
  const wp = legacyBySlug.get(slug) || legacyPageBySlug.get(slug);
  const y = wp && wp.yoast_head_json;
  if (y && y.title && info.page === "home-alias") {
    return { title: decodeEntities(y.title), desc: HOME_DESC };
  }
  if (y && y.title) {
    const fallback = seo[slug] ? seo[slug][1] : "";
    return {
      title: decodeEntities(y.title),
      desc: stripReadMore(decodeEntities(y.description || y.og_description || "")) || fallback || decodeEntities(y.title)
    };
  }
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

const legacy = JSON.parse(fs.readFileSync(path.join(root, "_legacy-wp.json"), "utf8"));
const catById = new Map(legacy.cats.map((c) => [c.id, c]));
const legacyBySlug = new Map();
for (const post of legacy.posts) legacyBySlug.set(decodeURIComponent(post.slug), post);
const legacyPageBySlug = new Map();
for (const p of legacy.pages) legacyPageBySlug.set(decodeURIComponent(p.slug), p);

function decodeEntities(s) {
  return String(s || "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}
function plain(html) {
  return decodeEntities(String(html || "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .replace(/\s*Read\s+More[\s\S]*$/i, "")
    .trim();
}
function cleanBody(html) {
  let s = String(html || "");
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, "");
  s = s.replace(/<!--[\s\S]*?-->/g, "");
  s = s.replace(/\s(?:srcset|sizes)="[^"]*"/gi, "");
  s = s.replace(/https?:\/\/(?:www\.)?ashercom\.com\/wp-content\/uploads\/[^"'\s]+/gi, (m) => {
    const clean = m.split("?")[0];
    return decodeURIComponent(new URL(clean).pathname.replace(/^\//, ""));
  });
  s = s.replace(/https?:\/\/(?:www\.)?ashercom\.com\/[^"'\s]*/gi, (m) => {
    let u;
    try { u = new URL(m); } catch { return m; }
    if (u.pathname.includes("/wp-content/")) return m;
    const p = decodeURIComponent(u.pathname).replace(/^\/|\/$/g, "");
    if (!p) return "index.html";
    return p + "/";
  });
  return s.trim();
}
function catTag(post) {
  const id = (post.categories || [])[0];
  const cat = catById.get(id);
  return cat ? decodeEntities(cat.name) : "מאמר";
}

const ROBOTS = `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`;

function legacyDesc(y, html, titleText, tag) {
  const fromYoast = stripReadMore(decodeEntities(y.description || y.og_description || ""));
  if (fromYoast && fromYoast.length >= 50) return fromYoast;
  const text = plain(html);
  if (text.length >= 50) return text.slice(0, 158);
  return `${titleText} — ${tag}. אשר תקשורת, קבלן תשתיות תקשורת בפריסה ארצית.`;
}
function ogImage(y) {
  const u = (y.og_image || [])[0]?.url;
  if (!u) return "";
  try { return HOST + decodeURI(new URL(u).pathname); } catch { return ""; }
}

const ORG_ID = HOST + "/#organization";
const SITE_ID = HOST + "/#website";
const LOGO = HOST + "/wp-content/uploads/2019/12/logo.png";
const SITE_NAME = "אשר תקשורת";
const PHONE = "1-700-505-616";

function orgNode() {
  return {
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    "name": SITE_NAME,
    "url": HOST + "/",
    "description": "קבלן תשתיות תקשורת בפריסה ארצית: סיבים אופטיים, רשתות מחשבים, טלפוניה ומערכות מתח נמוך.",
    "telephone": PHONE,
    "email": "asher@ashercom.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "שד' ההסתדרות 158",
      "addressLocality": "חיפה",
      "addressCountry": "IL"
    },
    "areaServed": { "@type": "Country", "name": "Israel" },
    "logo": { "@type": "ImageObject", "@id": HOST + "/#logo", "url": LOGO, "contentUrl": LOGO, "caption": SITE_NAME },
    "image": { "@id": HOST + "/#logo" },
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": PHONE,
      "contactType": "customer service",
      "areaServed": "IL",
      "availableLanguage": ["he"]
    }],
    "sameAs": ["https://www.facebook.com/profile.php?id=100075842472250"]
  };
}

function siteNode() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    "url": HOST + "/",
    "name": SITE_NAME,
    "inLanguage": "he-IL",
    "publisher": { "@id": ORG_ID }
  };
}

function faqFrom(html) {
  const s = String(html || "");
  const heads = [...s.matchAll(/<h([2-4])[^>]*>([\s\S]*?)<\/h\1>/gi)];
  const out = [];
  heads.forEach((m, i) => {
    const q = plain(m[2]);
    if (!/[?؟]\s*$/.test(q)) return;
    const end = i + 1 < heads.length ? heads[i + 1].index : s.length;
    const a = plain(s.slice(m.index + m[0].length, end));
    if (a.length >= 20) out.push({ q, a });
  });
  return out.length >= 2 ? out : [];
}

function crumbFor(slug, info) {
  const post = legacyBySlug.get(slug);
  const cat = post && catById.get((post.categories || [])[0]);
  if (cat) return { name: decodeEntities(cat.name), url: HOST + "/category/" + decodeURIComponent(cat.slug) + "/" };
  if (info.page === "article") return { name: "מאמרים", url: HOST + "/articles.html" };
  if (info.page === "service") {
    const svc = legacy.cats.find((c) => decodeURIComponent(c.slug) === "שירותים");
    if (svc) return { name: decodeEntities(svc.name), url: HOST + "/category/שירותים/" };
  }
  return null;
}

function schemaGraph(o) {
  const crumbs = [{ name: "בית", url: HOST + "/" }];
  if (o.crumb) crumbs.push(o.crumb);
  if (o.url !== HOST + "/") crumbs.push({ name: o.name, url: o.url });
  const pageType = { category: "CollectionPage", about: "AboutPage", contact: "ContactPage" }[o.kind] || "WebPage";
  const graph = [
    orgNode(),
    siteNode(),
    {
      "@type": pageType,
      "@id": o.url,
      "url": o.url,
      "name": o.title,
      ...(o.desc ? { "description": o.desc } : {}),
      "inLanguage": "he-IL",
      "isPartOf": { "@id": SITE_ID },
      "about": { "@id": ORG_ID },
      "breadcrumb": { "@id": o.url + "#breadcrumb" },
      ...(o.img ? { "primaryImageOfPage": { "@id": o.url + "#primaryimage" } } : {}),
      ...(o.published ? { "datePublished": o.published } : {}),
      ...(o.modified ? { "dateModified": o.modified } : {})
    },
    {
      "@type": "BreadcrumbList",
      "@id": o.url + "#breadcrumb",
      "itemListElement": crumbs.map((c, i) => ({ "@type": "ListItem", "position": i + 1, "name": c.name, "item": c.url }))
    }
  ];
  if (o.img) graph.push({ "@type": "ImageObject", "@id": o.url + "#primaryimage", "url": o.img, "contentUrl": o.img });
  if (o.kind === "article") {
    graph.push({
      "@type": "Article",
      "@id": o.url + "#article",
      "headline": o.name,
      ...(o.desc ? { "description": o.desc } : {}),
      "inLanguage": "he-IL",
      "mainEntityOfPage": { "@id": o.url },
      "isPartOf": { "@id": o.url },
      "author": { "@id": ORG_ID },
      "publisher": { "@id": ORG_ID },
      ...(o.img ? { "image": { "@id": o.url + "#primaryimage" } } : {}),
      ...(o.published ? { "datePublished": o.published } : {}),
      ...(o.modified ? { "dateModified": o.modified } : {})
    });
  }
  if (o.kind === "service") {
    graph.push({
      "@type": "Service",
      "@id": o.url + "#service",
      "name": o.name,
      "serviceType": o.name,
      ...(o.desc ? { "description": o.desc } : {}),
      "url": o.url,
      "provider": { "@id": ORG_ID },
      "areaServed": { "@type": "Country", "name": "Israel" },
      ...(o.img ? { "image": { "@id": o.url + "#primaryimage" } } : {})
    });
  }
  if (o.faq && o.faq.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": o.url + "#faq",
      "isPartOf": { "@id": o.url },
      "mainEntity": o.faq.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    });
  }
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return `<script type="application/ld+json" id="org-schema">${json}</script>`;
}

function absImg(src) {
  if (!src) return "";
  if (/^https?:/i.test(src)) return src;
  return HOST + "/" + String(src).replace(/^\.?\//, "");
}

function legacyHtml(slug, post) {
  const y = post.yoast_head_json || {};
  const titleText = decodeEntities(post.title?.rendered || humanTitle(slug));
  const title = decodeEntities(y.title || "") || titleText + " - אשר תקשורת";
  const tag = catTag(post);
  const desc = legacyDesc(y, post.excerpt?.rendered || post.content?.rendered, titleText, tag);
  const body = cleanBody(post.content?.rendered || "");
  const img = ogImage(y);
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const canonicalHref = HOST + "/" + slug + "/";
  const schema = schemaGraph({
    kind: "article",
    url: canonicalHref,
    title,
    name: titleText,
    desc,
    img,
    published: post.date,
    modified: post.modified || post.date,
    crumb: crumbFor(slug, { page: "article" }),
    faq: faqFrom(body)
  });
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3X0DSFYW2Q"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3X0DSFYW2Q');
</script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script>document.documentElement.classList.add("has-js")</script>
  <style>.has-js .seo-seed{display:none}</style>
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  ${ROBOTS}
  <base href="../">
  <link rel="canonical" href="${canonicalHref}">
  <meta property="og:locale" content="he_IL">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${canonicalHref}">
  <meta property="og:site_name" content="אשר תקשורת">
  ${img ? `<meta property="og:image" content="${esc(img)}">` : ""}
  <meta property="article:published_time" content="${esc(post.date)}">
  <meta property="article:modified_time" content="${esc(post.modified || post.date)}">
  ${schema}
  <link rel="preload" href="assets/fonts/plex-hebrew-hebrew-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="assets/fonts.css">
  <link rel="stylesheet" href="assets/site.css">
  <link rel="stylesheet" href="assets/article.css">
</head>
<body data-theme="server" data-nav="articles" data-page="legacy">
  <div id="site-header"></div>
  <main id="main" tabindex="-1">
    <div class="seo-seed" data-tag="${esc(tag)}"><h1>${esc(titleText)}</h1><article class="prose">${body}</article></div>
  </main>
  <div id="site-footer"></div>
  <script src="js/urls.js"></script>
  <script src="js/chrome.js"></script>
  <script src="js/contact-form.js"></script>
  <script src="js/privacy-consent.js"></script>
  <script src="js/a11y.js"></script>
  <script src="js/pretty-page.js"></script>
</body>
</html>
`;
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
  const post = legacyBySlug.get(slug) || legacyPageBySlug.get(slug);
  const isHome = canonicalHref === HOST + "/";
  const schema = schemaGraph({
    kind: isHome ? "page" : info.page,
    url: canonicalHref,
    title,
    name: item ? item.title : title.replace(/\s+[-—]\s+אשר תקשורת$/, ""),
    desc,
    img: item ? absImg(item.img) : "",
    published: post ? post.date : "",
    modified: post ? (post.modified || post.date) : "",
    crumb: isHome ? null : crumbFor(slug, info),
    faq: item ? faqFrom(item.body) : []
  });
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3X0DSFYW2Q"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3X0DSFYW2Q');
</script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script>document.documentElement.classList.add("has-js")</script>
  <style>.has-js .seo-seed{display:none}</style>
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  ${ROBOTS}
  <base href="../">
  <link rel="canonical" href="${canonicalHref}">
  <meta property="og:locale" content="he_IL">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${canonicalHref}">
  <meta property="og:site_name" content="אשר תקשורת">
  ${schema}
  <link rel="preload" href="assets/fonts/plex-hebrew-hebrew-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="assets/fonts.css">
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

const aboutSeo = seoFor("פרופיל-חברה", { page: "about" });
const escAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const aboutSrc = fs.readFileSync(path.join(root, "about.html"), "utf8")
  .replace("<meta charset=\"UTF-8\">", "<meta charset=\"UTF-8\">\n  <base href=\"../\">")
  .replace(/<link rel="canonical"[^>]*>/, "")
  .replace(/<title>[^<]*<\/title>/, `<title>${escAttr(aboutSeo.title)}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escAttr(aboutSeo.desc)}">`)
  .replace("<title>", `<link rel="canonical" href="${HOST}/פרופיל-חברה/">\n  <title>`)
  .replace(/\s*<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, "")
  .replace("</head>", `  ${schemaGraph({
    kind: "about",
    url: HOST + "/פרופיל-חברה/",
    title: aboutSeo.title,
    name: "פרופיל חברה",
    desc: aboutSeo.desc,
    published: legacyPageBySlug.get("פרופיל-חברה")?.date || "",
    modified: legacyPageBySlug.get("פרופיל-חברה")?.modified || ""
  })}\n</head>`);

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
  const post = legacyBySlug.get(slug);
  const keepCurated = Boolean(exact[slug]);
  if (exact[slug] && info.page === "about") {
    const about = aboutSrc.includes(`rel="canonical"`)
      ? aboutSrc
      : aboutSrc.replace("<title>", `<link rel="canonical" href="${HOST}/פרופיל-חברה/">\n  <title>`);
    fs.writeFileSync(file, about, "utf8");
  } else if (!keepCurated && post) {
    fs.writeFileSync(file, legacyHtml(slug, post), "utf8");
  } else {
    fs.writeFileSync(file, pageHtml(slug, info, canonicalHref, title, desc), "utf8");
  }
  n += 1;
}

function categoryHtml(cat, posts) {
  const name = decodeEntities(cat.name);
  const slug = decodeURIComponent(cat.slug);
  const canonicalHref = HOST + "/category/" + slug + "/";
  const y = cat.yoast_head_json || {};
  const pageTitle = decodeEntities(y.title || "") || name + " - אשר תקשורת";
  const desc = decodeEntities(y.description || "") || plain(cat.description)
    || `${name} — כל המאמרים בקטגוריה באתר אשר תקשורת, קבלן תשתיות תקשורת בפריסה ארצית.`;
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const items = posts.map((p) => {
    const t = decodeEntities(p.title?.rendered || "");
    const s = decodeURIComponent(p.slug);
    return `<li><a href="${esc(s)}/">${esc(t)}</a></li>`;
  }).join("\n");
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3X0DSFYW2Q"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3X0DSFYW2Q');
</script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(pageTitle)}</title>
  <meta name="description" content="${esc(desc)}">
  ${ROBOTS}
  <base href="../../">
  <link rel="canonical" href="${canonicalHref}">
  <meta property="og:locale" content="he_IL">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(pageTitle)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${canonicalHref}">
  <meta property="og:site_name" content="אשר תקשורת">
  ${schemaGraph({ kind: "category", url: canonicalHref, title: pageTitle, name, desc })}
  <link rel="preload" href="assets/fonts/plex-hebrew-hebrew-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="assets/fonts.css">
  <link rel="stylesheet" href="assets/site.css">
  <link rel="stylesheet" href="assets/article.css">
</head>
<body data-theme="server" data-nav="articles">
  <div id="site-header"></div>
  <main id="main" tabindex="-1">
    <section class="article-hero">
      <div class="wrap">
        <div class="crumbs"><a href="index.html">בית</a><span>·</span><span>${esc(name)}</span></div>
        <h1>${esc(name)}</h1>
      </div>
    </section>
    <section class="article-body-band">
      <div class="wrap article-layout">
        <article class="prose"><ul>
${items}
        </ul></article>
      </div>
    </section>
  </main>
  <div id="site-footer"></div>
  <script src="js/urls.js"></script>
  <script src="js/chrome.js"></script>
  <script src="js/contact-form.js"></script>
  <script src="js/privacy-consent.js"></script>
  <script src="js/a11y.js"></script>
</body>
</html>
`;
}

for (const cat of legacy.cats) {
  const slug = decodeURIComponent(cat.slug);
  const posts = legacy.posts
    .filter((p) => (p.categories || []).includes(cat.id))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const dir = path.join(root, "category", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), categoryHtml(cat, posts), "utf8");
  sitemapUrls.add(HOST + "/category/" + slug + "/");
}

const lastmod = new Map();
for (const post of legacy.posts) {
  lastmod.set(HOST + "/" + decodeURIComponent(post.slug) + "/", String(post.modified || post.date).slice(0, 10));
}
const locs = [...sitemapUrls].sort();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs.map((loc) => lastmod.has(loc)
    ? `  <url><loc>${loc}</loc><lastmod>${lastmod.get(loc)}</lastmod></url>`
    : `  <url><loc>${loc}</loc></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
const aiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended"];
fs.writeFileSync(path.join(root, "robots.txt"), `User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join("\n\n")}

Sitemap: ${HOST}/sitemap.xml
`, "utf8");

const homeFile = path.join(root, "index.html");
const homeSrc = fs.readFileSync(homeFile, "utf8");
const homeSchema = schemaGraph({
  kind: "page",
  url: HOST + "/",
  title: "קבלן תשתיות תקשורת לעסקים המציע פתרונות תקשורת - אשר תקשורת",
  name: SITE_NAME,
  desc: HOME_DESC
});
const homeOut = homeSrc.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/, homeSchema);
if (homeOut !== homeSrc) fs.writeFileSync(homeFile, homeOut, "utf8");

const linkLine = (t, slug, d) => `- [${t}](${HOST}/${slug}/)${d ? ": " + d : ""}`;
const llms = `# אשר תקשורת

> אשר תקשורת – קבלן תשתיות תקשורת ואינטגרציה, עם 30 שנות ניסיון ופריסה ארצית. תכנון, ביצוע ופיקוח של סיבים אופטיים, רשתות מחשבים, טלפוניה ומערכות מתח נמוך לעסקים וארגונים.

## פרופיל החברה

- שם: אשר תקשורת (Asher Communications)
- תחום: קבלן תשתיות תקשורת ואינטגרציה
- ניסיון: 30 שנות ניסיון בשטח
- אזור שירות: פריסה ארצית בישראל
- כתובת: שד' ההסתדרות 158, חיפה
- אתר: ${HOST}/
- פרופיל מלא: ${HOST}/פרופיל-חברה/

## פרטי קשר

- טלפון: ${PHONE}
- וואטסאפ: 050-722-8900
- דוא"ל: asher@ashercom.com
- טופס יצירת קשר: ${HOST}/צור-קשר/

## שירותי ליבה

${services.map((s) => linkLine(s.title, canon.service[s.id], plain(s.dek))).join("\n")}

## מאמרים ומדריכים מרכזיים

${articles.map((a) => linkLine(a.title, canon.article[a.id], plain(a.dek))).join("\n")}

## קטגוריות

${legacy.cats.map((c) => `- [${decodeEntities(c.name)}](${HOST}/category/${decodeURIComponent(c.slug)}/)`).join("\n")}

## מפת אתר

- ${HOST}/sitemap.xml
`;
fs.writeFileSync(path.join(root, "llms.txt"), llms, "utf8");

console.log("generated", n, "slug pages;", locs.length, "sitemap urls");
