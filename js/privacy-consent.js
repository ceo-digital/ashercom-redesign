(function () {
  const VERSION = "2027-1";
  const KEY = "asher-privacy-consent";
  const DEFAULTS = { necessary: true, functional: false, analytics: false, marketing: false };

  function read() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!data || data.version !== VERSION || !data.prefs) return null;
      return data;
    } catch (err) {
      return null;
    }
  }

  function apply(prefs) {
    const p = { ...DEFAULTS, ...prefs, necessary: true };
    document.documentElement.dataset.consentFunctional = p.functional ? "1" : "0";
    document.documentElement.dataset.consentAnalytics = p.analytics ? "1" : "0";
    document.documentElement.dataset.consentMarketing = p.marketing ? "1" : "0";
    window.ASHER_CONSENT = p;
    document.dispatchEvent(new CustomEvent("asher-consent", { detail: p }));
  }

  function save(prefs, method) {
    const record = {
      version: VERSION,
      ts: new Date().toISOString(),
      method: method,
      prefs: { ...DEFAULTS, ...prefs, necessary: true }
    };
    localStorage.setItem(KEY, JSON.stringify(record));
    apply(record.prefs);
    closeGate();
    return record;
  }

  function fromForm(root) {
    return {
      necessary: true,
      functional: !!(root.querySelector('[name="pref-functional"]') || {}).checked,
      analytics: !!(root.querySelector('[name="pref-analytics"]') || {}).checked,
      marketing: !!(root.querySelector('[name="pref-marketing"]') || {}).checked
    };
  }

  function fillForm(root, prefs) {
    const f = root.querySelector('[name="pref-functional"]');
    const a = root.querySelector('[name="pref-analytics"]');
    const m = root.querySelector('[name="pref-marketing"]');
    if (f) f.checked = !!prefs.functional;
    if (a) a.checked = !!prefs.analytics;
    if (m) m.checked = !!prefs.marketing;
  }

  function closeGate() {
    const gate = document.getElementById("privacy-gate");
    if (!gate) return;
    gate.hidden = true;
    gate.setAttribute("aria-hidden", "true");
    document.body.classList.remove("privacy-locked");
  }

  function openGate(panel) {
    const gate = document.getElementById("privacy-gate");
    if (!gate) return;
    gate.hidden = false;
    gate.setAttribute("aria-hidden", "false");
    gate.classList.toggle("is-prefs", panel === "prefs");
    const current = (read() || {}).prefs || DEFAULTS;
    fillForm(gate, current);
    const title = gate.querySelector("#privacy-title");
    if (title) title.focus();
  }

  function html() {
    return `
<div id="privacy-gate" class="privacy-gate" hidden aria-hidden="true">
  <div class="privacy-card" role="dialog" aria-labelledby="privacy-title">
    <div class="privacy-bar">
      <div class="privacy-copy">
        <h2 id="privacy-title" tabindex="-1">עוגיות והעדפות</h2>
        <p class="privacy-lead privacy-home">עיבוד שאינו הכרחי רק בהסכמה מפורשת. גלילה אינה הסכמה. <a href="privacy.html">מדיניות פרטיות</a>.</p>
      </div>
      <div class="privacy-actions privacy-home">
        <button type="button" class="btn btn-ghost privacy-essential">הכרחיים בלבד</button>
        <button type="button" class="btn btn-ghost privacy-customize">התאמת העדפות</button>
        <button type="button" class="btn btn-fill privacy-accept">אישור הכל</button>
      </div>
    </div>

    <div class="privacy-panel">
      <fieldset>
        <legend>בחירת קטגוריות</legend>
        <label class="privacy-row is-locked">
          <input type="checkbox" checked disabled>
          <span>
            <b>הכרחיים</b>
            הפעלת האתר, אבטחה ושמירת רשומת ההסכמה. לא ניתן לכבות בעת שימוש באתר.
          </span>
        </label>
        <label class="privacy-row">
          <input type="checkbox" name="pref-functional">
          <span>
            <b>העדפות</b>
            שמירת בחירות תצוגה שאינן הכרחיות להפעלה הבסיסית.
          </span>
        </label>
        <label class="privacy-row">
          <input type="checkbox" name="pref-analytics">
          <span>
            <b>מדידה</b>
            ניתוח שימוש. כבוי כברירת מחדל, ואינו פעיל באתר כיום.
          </span>
        </label>
        <label class="privacy-row">
          <input type="checkbox" name="pref-marketing">
          <span>
            <b>שיווק</b>
            פרסום או רימרקטינג. כבוי כברירת מחדל, ואינו פעיל באתר כיום.
          </span>
        </label>
      </fieldset>
      <div class="privacy-actions">
        <button type="button" class="btn btn-ghost privacy-essential">הכרחיים בלבד</button>
        <button type="button" class="btn btn-fill privacy-save">שמירת הבחירה</button>
      </div>
    </div>
  </div>
</div>`;
  }

  function bind() {
    if (document.getElementById("privacy-gate")) return;
    document.body.insertAdjacentHTML("beforeend", html());
    const gate = document.getElementById("privacy-gate");

    gate.addEventListener("click", (e) => {
      if (e.target.closest(".privacy-essential")) {
        save({ functional: false, analytics: false, marketing: false }, "essential");
      } else if (e.target.closest(".privacy-accept")) {
        save({ functional: true, analytics: true, marketing: true }, "accept-all");
      } else if (e.target.closest(".privacy-save")) {
        save(fromForm(gate), "custom");
      } else if (e.target.closest(".privacy-customize")) {
        gate.classList.add("is-prefs");
      }
    });

    document.addEventListener("click", (e) => {
      const open = e.target.closest(".privacy-open");
      if (!open) return;
      e.preventDefault();
      openGate("prefs");
    });
  }

  bind();
  const existing = read();
  if (existing) apply(existing.prefs);
  else openGate("home");
})();
