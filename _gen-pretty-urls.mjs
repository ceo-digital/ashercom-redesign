import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
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
    "fiber-internet": "כיצד-אינטרנט-עם-סיב-אופטי-ישפר-את-העבוד"
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

function classify(slug) {
  if (exact[slug]) return exact[slug];
  if (/מצלמ/.test(slug)) return { page: "service", id: "cameras" };
  if (/כריז|מתח-נמוך/.test(slug)) return { page: "service", id: "lowvoltage" };
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

function canonical(info) {
  if (info.page === "about") return "פרופיל-חברה/";
  if (info.page === "contact") return "צור-קשר/";
  if (info.page === "home-alias") return "index.html";
  if (info.page === "article") return canon.article[info.id] + "/";
  if (info.page === "service") return canon.service[info.id] + "/";
  return "index.html";
}

function pageHtml(info, canonicalHref) {
  const nav = info.page === "article" ? "articles" : info.page === "about" ? "about" : "";
  const extra = info.page === "service"
    ? `  <script src="js/services-data.js"></script>\n  <script src="js/pretty-page.js"></script>`
    : info.page === "article"
      ? `  <script src="js/articles-data.js"></script>\n  <script src="js/pretty-page.js"></script>`
      : `  <script src="js/pretty-page.js"></script>`;
  const idAttr = info.id ? ` data-id="${info.id}"` : "";
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>אשר תקשורת</title>
  <base href="../">
  <link rel="canonical" href="${canonicalHref}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Hebrew:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/site.css">
  <link rel="stylesheet" href="assets/article.css">
</head>
<body data-theme="server" data-nav="${nav}" data-contact="local" data-page="${info.page}"${idAttr}>
  <div id="site-header"></div>
  <main id="main" tabindex="-1"></main>
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
  .replace("<meta charset=\"UTF-8\">", "<meta charset=\"UTF-8\">\n  <base href=\"../\">\n  <link rel=\"canonical\" href=\"פרופיל-חברה/\">");

let n = 0;
for (const slug of slugs) {
  const info = classify(slug);
  const dir = path.join(root, slug);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, "index.html");
  if (info.page === "about") fs.writeFileSync(file, aboutSrc, "utf8");
  else fs.writeFileSync(file, pageHtml(info, canonical(info)), "utf8");
  n += 1;
}
console.log("generated", n, "slug pages");
