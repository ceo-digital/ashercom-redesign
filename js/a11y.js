(function () {
  const KEY = "asher-a11y-prefs";
  const VERSION = "2026-1";
  const DEFAULTS = {
    font: "",
    contrast: false,
    links: false,
    spacing: false,
    motion: false,
    readable: false
  };

  function read() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!data || !data.prefs) return { ...DEFAULTS };
      return { ...DEFAULTS, ...data.prefs };
    } catch (err) {
      return { ...DEFAULTS };
    }
  }

  function save(prefs) {
    const record = {
      version: VERSION,
      ts: new Date().toISOString(),
      prefs: { ...DEFAULTS, ...prefs }
    };
    localStorage.setItem(KEY, JSON.stringify(record));
    apply(record.prefs);
    syncButtons();
  }

  function apply(prefs) {
    const p = { ...DEFAULTS, ...prefs };
    const root = document.documentElement;
    const body = document.body;
    const flags = {
      "a11y-lg": p.font === "lg",
      "a11y-xl": p.font === "xl",
      "a11y-contrast": !!p.contrast,
      "a11y-links": !!p.links,
      "a11y-spacing": !!p.spacing,
      "a11y-motion": !!p.motion,
      "a11y-readable": !!p.readable
    };
    Object.keys(flags).forEach((cls) => {
      root.classList.toggle(cls, flags[cls]);
      if (body) body.classList.toggle(cls, flags[cls]);
    });
    window.ASHER_A11Y = p;
  }

  function panelHtml() {
    return `
      <h2 id="a11y-title" data-i18n="a11y.title">התאמות נגישות</h2>
      <p class="a11y-note" data-i18n="a11y.note">הבחירות נשמרות במכשיר זה בלבד.</p>
      <button type="button" data-a11y="font-lg" aria-pressed="false" data-i18n="a11y.font">הגדלת גופן</button>
      <button type="button" data-a11y="font-xl" aria-pressed="false" data-i18n="a11y.fontxl">גופן גדול מאוד</button>
      <button type="button" data-a11y="contrast" aria-pressed="false" data-i18n="a11y.contrast">ניגודיות גבוהה</button>
      <button type="button" data-a11y="links" aria-pressed="false" data-i18n="a11y.links">הדגשת קישורים</button>
      <button type="button" data-a11y="spacing" aria-pressed="false" data-i18n="a11y.spacing">ריווח טקסט</button>
      <button type="button" data-a11y="motion" aria-pressed="false" data-i18n="a11y.motion">עצירת תנועה</button>
      <button type="button" data-a11y="readable" aria-pressed="false" data-i18n="a11y.readable">תצוגה קריאה</button>
      <button type="button" data-a11y="reset" data-i18n="a11y.reset">איפוס</button>
      <a class="a11y-statement" href="accessibility.html" data-i18n="a11y.statement">הצהרת נגישות</a>
    `;
  }

  function syncButtons() {
    const panel = document.getElementById("a11y");
    if (!panel) return;
    const p = window.ASHER_A11Y || read();
    panel.querySelectorAll("[data-a11y][aria-pressed]").forEach((btn) => {
      const key = btn.getAttribute("data-a11y");
      let on = false;
      if (key === "font-lg") on = p.font === "lg";
      else if (key === "font-xl") on = p.font === "xl";
      else on = !!p[key];
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.classList.toggle("is-on", on);
    });
  }

  function setOpen(open, opts) {
    const panel = document.getElementById("a11y");
    const btn = document.querySelector(".a11y-btn");
    if (!panel || !btn) return;
    panel.classList.toggle("is-open", open);
    panel.hidden = !open;
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      const first = panel.querySelector("button, a");
      if (first) first.focus();
    } else if (opts && opts.focusButton) {
      btn.focus();
    }
  }

  function bind() {
    const main = document.getElementById("main");
    if (main && !main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");

    const panel = document.getElementById("a11y");
    const btn = document.querySelector(".a11y-btn");
    if (!panel || !btn) return;

    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "a11y-title");
    panel.innerHTML = panelHtml();
    panel.hidden = !panel.classList.contains("is-open");

    btn.setAttribute("aria-controls", "a11y");
    btn.setAttribute("aria-expanded", panel.classList.contains("is-open") ? "true" : "false");
    btn.removeAttribute("onclick");

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpen(!panel.classList.contains("is-open"));
    });

    panel.addEventListener("click", (e) => {
      const target = e.target.closest("[data-a11y]");
      if (!target) return;
      const key = target.getAttribute("data-a11y");
      const current = { ...DEFAULTS, ...(window.ASHER_A11Y || read()) };
      if (key === "reset") {
        save({ ...DEFAULTS });
        return;
      }
      if (key === "font-lg") current.font = current.font === "lg" ? "" : "lg";
      else if (key === "font-xl") current.font = current.font === "xl" ? "" : "xl";
      else current[key] = !current[key];
      save(current);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("is-open")) {
        e.preventDefault();
        setOpen(false, { focusButton: true });
      }
    });

    document.addEventListener("click", (e) => {
      if (!panel.classList.contains("is-open")) return;
      if (e.target.closest("#a11y") || e.target.closest(".a11y-btn")) return;
      setOpen(false);
    });

    syncButtons();
    if (typeof window.asherSetLang === "function") {
      window.asherSetLang(localStorage.getItem("asher-home-lang") === "en" ? "en" : "he");
    }
  }

  apply(read());
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
