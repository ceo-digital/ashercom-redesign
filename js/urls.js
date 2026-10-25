(function () {
  const articles = {
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
  };
  const services = {
    servers: "ארונות-תקשורת",
    cameras: "מערכת-מצלמות-אבטחה",
    fiber: "סיבים-אופטיים",
    optical: "תקשורת-אופטית",
    network: "רשת-מחשבים-לחברות-ועסקים",
    computers: "תקשורת-מחשבים",
    "biz-infra": "תשתיות-תקשורת-לעסקים",
    "fiber-contractor": "קבלן-סיבים-אופטיים",
    telephony: "תקשורת-טלפוניה",
    lowvoltage: "מערכות-מתח-נמוך"
  };

  function article(id) {
    return articles[id] ? articles[id] + "/" : "article.html?id=" + id;
  }
  function service(id) {
    return services[id] ? services[id] + "/" : "service.html?id=" + id;
  }

  window.ASHER_URLS = { articles: articles, services: services };
  window.asherHref = {
    article: article,
    service: service,
    about: function () { return "פרופיל-חברה/"; },
    contact: function () { return "צור-קשר/"; },
    home: function () { return "index.html"; },
    rewrite: function (html) {
      return String(html || "")
        .replace(/article\.html\?id=([a-z0-9-]+)/g, function (_, id) { return article(id); })
        .replace(/service\.html\?id=([a-z0-9-]+)/g, function (_, id) { return service(id); })
        .replace(/href="about\.html"/g, "href=\"פרופיל-חברה/\"");
    }
  };
})();
