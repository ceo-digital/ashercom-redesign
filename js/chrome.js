(function () {
  const active = document.body.dataset.nav || "";
  const contactHref = document.body.dataset.contact === "local" ? "#contact" : "index.html#contact";
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  window.ASHER_CONTACT_HTML = `
    <section id="contact" class="contact-band">
      <div class="wrap">
        <div class="contact">
          <div class="contact-side">
            <div class="sec-kicker" style="color:var(--accent)">צור קשר</div>
            <h2>מוכנים לשדרג את תשתית התקשורת והמחשוב?</h2>
            <p class="why">30 שנות מומחיות בתשתיות תקשורת לחברות וארגונים. תכנון וביצוע בסטנדרט הגבוה ביותר, עם שקט תעשייתי ורציפות תפקודית מלאה.</p>
            <a class="phone-xl" href="tel:1700505616" aria-label="חייגו עכשיו 1-700-505-616">
              <span class="phone-num">1-700-505-616</span>
              <span class="phone-dial" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6.7 3.4c.5-.5 1.3-.6 1.9-.3l2.4 1.1c.6.3 1 .9.9 1.6l-.3 2.4c0 .5-.3.9-.8 1.1l-1.8 1a13.2 13.2 0 0 0 6.2 6.2l1-1.8c.3-.4.7-.7 1.2-.8l2.4-.3c.7-.1 1.3.3 1.6.9l1.1 2.4c.3.6.2 1.4-.3 1.9l-1.4 1.4c-.5.5-1.2.8-1.9.7C10.4 20.2 3.8 13.6 3 6.7c-.1-.7.2-1.4.7-1.9L6.7 3.4z"/></svg>
              </span>
              <span class="phone-cta">חייגו עכשיו</span>
            </a>
          </div>
          <form onsubmit="event.preventDefault(); this.querySelector('[type=submit]').textContent='נשלח — נחזור אליכם';">
            <div class="row-2">
              <div>
                <label for="c-name">שם</label>
                <input id="c-name" name="name" required autocomplete="name">
              </div>
              <div>
                <label for="c-phone">טלפון</label>
                <input id="c-phone" name="phone" type="tel" required autocomplete="tel">
              </div>
            </div>
            <button class="btn btn-fill" type="submit" style="width:max-content">שליחת פנייה</button>
            <div class="contact-visual" aria-hidden="true">
              <img class="contact-visual-bg" src="assets/contact-infra.png" alt="">
              <img class="contact-visual-logo" src="assets/logo-asher.png" alt="">
            </div>
          </form>
        </div>
      </div>
    </section>`;
  if (header) header.innerHTML = `
  <a class="skip" href="#main">דלג לתוכן</a>
  <header class="site">
    <div class="wrap mast">
      <a class="brand" href="index.html" aria-label="אשר תקשורת — דף הבית">
        <img src="assets/logo-asher.png" alt="אשר תקשורת — שירותי אינטגרציה מתקדמים">
      </a>
      <a class="mast-call" href="tel:1700505616" aria-label="חייגו 1-700-505-616">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.7 3.4c.5-.5 1.3-.6 1.9-.3l2.4 1.1c.6.3 1 .9.9 1.6l-.3 2.4c0 .5-.3.9-.8 1.1l-1.8 1a13.2 13.2 0 0 0 6.2 6.2l1-1.8c.3-.4.7-.7 1.2-.8l2.4-.3c.7-.1 1.3.3 1.6.9l1.1 2.4c.3.6.2 1.4-.3 1.9l-1.4 1.4c-.5.5-1.2.8-1.9.7C10.4 20.2 3.8 13.6 3 6.7c-.1-.7.2-1.4.7-1.9L6.7 3.4z"/></svg>
      </a>
      <button class="nav-toggle" type="button" aria-label="תפריט" aria-expanded="false" aria-controls="site-nav">
        <span></span><span></span><span></span>
      </button>
      <nav class="links" id="site-nav" aria-label="ניווט ראשי">
        <a href="index.html#services">השירותים שלנו</a>
        <a class="${active === "about" ? "is-active" : ""}" href="about.html">אודות</a>
        <a class="${active === "articles" ? "is-active" : ""}" href="articles.html">מאמרים</a>
        <a href="${contactHref}">צור קשר</a>
      </nav>
      <div class="mast-end">
        <a class="mast-phone" href="tel:1700505616">1-700-505-616</a>
        <div class="socials">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="אינסטגרם">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.8"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/></svg>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="פייסבוק">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4V10c0-.6.4-1 1-1z"/></svg>
          </a>
        </div>
      </div>
    </div>
    <div class="word-rail" aria-hidden="true">
      <div class="track">
        <span>30 שנות שטח</span><span>קבלן תשתיות</span><span>פריסה ארצית</span><span>סיבים אופטיים</span><span>רשתות מחשבים</span><span>טלפוניה</span><span>מתח נמוך</span><span>חוות שרתים</span><span>תכנון</span><span>ביצוע</span><span>פיקוח</span>
        <span>30 שנות שטח</span><span>קבלן תשתיות</span><span>פריסה ארצית</span><span>סיבים אופטיים</span><span>רשתות מחשבים</span><span>טלפוניה</span><span>מתח נמוך</span><span>חוות שרתים</span><span>תכנון</span><span>ביצוע</span><span>פיקוח</span>
      </div>
    </div>
  </header>`;
  if (footer) footer.innerHTML = `
  <footer class="site-end">
    <img class="bg" src="assets/footer-innovation.png" alt="">
    <div class="foot-inner wrap">
      <nav class="foot-cols" aria-label="ניווט תחתון">
        <details open>
          <summary>תפריט ראשי</summary>
          <ul>
            <li><a href="index.html">עמוד הבית</a></li>
            <li><a href="about.html">פרופיל החברה</a></li>
            <li><a href="index.html#services">שירותי החברה</a></li>
            <li><a href="articles.html">מאמרים</a></li>
            <li><a href="${contactHref}">צור קשר</a></li>
          </ul>
        </details>
        <details open>
          <summary>השירותים שלנו</summary>
          <ul>
            <li><a href="service.html?id=cameras">מערכת מצלמות אבטחה</a></li>
            <li><a href="service.html?id=servers">ארונות תקשורת</a></li>
            <li><a href="article.html?id=wifi-guide">אינטרנט אלחוטי ביתי</a></li>
            <li><a href="service.html?id=lowvoltage">מערכות מתח נמוך</a></li>
            <li><a href="service.html?id=network">רשת מחשבים לחברות ועסקים</a></li>
            <li><a href="service.html?id=fiber">סיבים אופטיים</a></li>
            <li><a href="service.html?id=optical">תקשורת אופטית</a></li>
            <li><a href="service.html?id=computers">תקשורת מחשבים</a></li>
            <li><a href="service.html?id=telephony">תקשורת טלפוניה</a></li>
            <li><a href="service.html?id=telephony">תשתית תקשורת טלפוניה</a></li>
          </ul>
        </details>
        <details open>
          <summary>קטגוריות ראשיות</summary>
          <ul>
            <li><a href="article.html?id=internet-business">אינטרנט לעסקים</a></li>
            <li><a href="article.html?id=computer-rooms">תכנון חדרי מחשב</a></li>
            <li><a href="article.html?id=comm-faults">תיקון תקלות תקשורת</a></li>
            <li><a href="article.html?id=fiber-tech">טכנאי סיבים אופטיים</a></li>
            <li><a href="article.html?id=telephony-infra">תשתית תקשורת טלפונית למוסדות</a></li>
            <li><a href="article.html?id=comm-accessories">אביזרי תקשורת</a></li>
            <li><a href="article.html?id=infra-maintenance">אחזקת תשתיות תקשורת</a></li>
            <li><a href="article.html?id=fiber-internet">אינטרנט סיבים</a></li>
          </ul>
        </details>
        <details open>
          <summary>מאמרים רלוונטיים</summary>
          <ul>
            <li><a href="article.html?id=internet-infra">התקנת תשתית אינטרנט</a></li>
            <li><a href="article.html?id=computer-issues">הטיפול בבעיות מחשבים</a></li>
            <li><a href="article.html?id=wifi-guide">המדריך לשיפור ה-WIFI בבית</a></li>
            <li><a href="article.html?id=security-cameras">התקנת מצלמות אבטחה</a></li>
            <li><a href="article.html?id=optical-renewal">חידוש תשתיות אופטיות</a></li>
            <li><a href="article.html?id=comm-control">מערכות תקשורת ובקרה</a></li>
            <li><a href="article.html?id=cabinet-renewal">סידור וחידוש ארונות תקשורת</a></li>
            <li><a href="article.html?id=fiber-equipment">ציוד לסיבים אופטיים</a></li>
            <li><a href="article.html?id=infra-upgrade">שדרוג תשתיות תקשורת</a></li>
          </ul>
        </details>
        <div class="foot-contact">
          <h3>פרטי התקשרות</h3>
          <ul>
            <li class="foot-meta">טלפון: <a href="tel:1700505616">1700-505-616</a></li>
            <li class="foot-email">
              <span>דוא״ל:</span>
              <a href="mailto:office@ashercom.com">office@ashercom.com</a>
            </li>
          </ul>
        </div>
      </nav>
      <div class="foot-brand">
        <a class="foot-logo" href="index.html" aria-label="אשר תקשורת — דף הבית">
          <span class="foot-logo-aura" aria-hidden="true"></span>
          <svg class="foot-logo-orbit" viewBox="0 0 200 56" preserveAspectRatio="none" aria-hidden="true">
            <rect class="orbit-track" x="2" y="2" width="196" height="52" rx="12"/>
            <circle class="orbit-spark" r="2.3" fill="#3DB4E6">
              <animateMotion dur="5.2s" repeatCount="indefinite" path="M14 2 H186 A12 12 0 0 1 198 14 V42 A12 12 0 0 1 186 54 H14 A12 12 0 0 1 2 42 V14 A12 12 0 0 1 14 2 Z"/>
            </circle>
            <circle class="orbit-spark" r="2" fill="#F0C419">
              <animateMotion dur="5.2s" begin="-2.6s" repeatCount="indefinite" path="M14 2 H186 A12 12 0 0 1 198 14 V42 A12 12 0 0 1 186 54 H14 A12 12 0 0 1 2 42 V14 A12 12 0 0 1 14 2 Z"/>
            </circle>
          </svg>
          <img class="brand-end" src="assets/logo-asher.png" alt="אשר תקשורת">
        </a>
      </div>
    </div>
  </footer>
  <aside class="palette-switch" aria-label="השוואת פלטות">
    <span>פלטה — נסו</span>
    <button class="is-on" type="button" onclick="setPalette('server', this)">נייבי · מהתמונה</button>
    <button type="button" onclick="setPalette('signal', this)">סיגנל · בהיר</button>
  </aside>
  <div class="float-btns">
    <div style="position:relative">
      <div class="a11y-panel" id="a11y">
        <h4>נגישות</h4>
        <button type="button" onclick="document.body.classList.toggle('a11y-lg')">הגדלת גופן</button>
        <button type="button" onclick="document.body.classList.toggle('a11y-contrast')">ניגודיות גבוהה</button>
        <button type="button" onclick="document.body.classList.toggle('a11y-links')">הדגשת קישורים</button>
        <button type="button" onclick="document.body.className='';">איפוס</button>
      </div>
      <button class="a11y-btn" type="button" aria-label="תפריט נגישות" onclick="document.getElementById('a11y').classList.toggle('is-open')">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="5" r="2.2" fill="currentColor"/>
          <path d="M4 9h16M12 9v11M8 21V13.5M16 21V13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    <a class="wa" href="https://wa.me/972507228900" target="_blank" rel="noopener" aria-label="וואטסאפ">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.3-1.1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5zM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.1.7.7-3-.2-.3A9 9 0 1 1 12 21zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.2a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4.1 5.3 5.3 0 0 0 3 .8 2.6 2.6 0 0 0 1.7-.8 2.1 2.1 0 0 0 .5-1.5c0-.2 0-.3-.2-.4z"/></svg>
    </a>
  </div>`;
  window.setPalette = function (theme, btn) {
    document.body.setAttribute("data-theme", theme);
    document.querySelectorAll(".palette-switch button").forEach(b => b.classList.toggle("is-on", b === btn));
  };
  document.querySelectorAll(".foot-logo").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });
  (function bindNav() {
    const siteHeader = document.querySelector("header.site");
    const btn = document.querySelector(".nav-toggle");
    if (!btn || !siteHeader) return;
    btn.addEventListener("click", () => {
      const open = siteHeader.classList.toggle("is-nav-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    siteHeader.querySelectorAll("nav.links a").forEach((a) => {
      a.addEventListener("click", () => {
        siteHeader.classList.remove("is-nav-open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  })();
  (function bindFooter() {
    const details = [...document.querySelectorAll(".foot-cols details")];
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => {
      details.forEach((d) => { d.open = !mq.matches; });
    };
    sync();
    mq.addEventListener("change", sync);
    details.forEach((d) => {
      d.addEventListener("toggle", () => {
        if (!mq.matches || !d.open) return;
        details.forEach((other) => { if (other !== d) other.open = false; });
      });
    });
  })();
})();
