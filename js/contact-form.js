(function () {
  const TO = "asher@ashercom.com";
  const CONSENT_KEY = "asher-privacy-consent";
  const CONSENT_VERSION = "2027-1";

  function analyticsDenied() {
    const live = window.ASHER_CONSENT;
    if (live && typeof live.analytics === "boolean") return live.analytics === false;
    try {
      const data = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
      if (!data || data.version !== CONSENT_VERSION || !data.prefs) return false;
      return data.prefs.analytics === false;
    } catch (err) {
      return false;
    }
  }

  function track(name, params) {
    if (analyticsDenied()) return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, params);
  }

  document.addEventListener("click", (e) => {
    const link = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (href.slice(0, 4).toLowerCase() === "tel:") {
      track("phone_click", {
        method: "phone",
        link_url: href,
        phone_number: href.replace(/\D/g, "")
      });
      return;
    }
    if (link.classList.contains("wa") || href.indexOf("wa.me") !== -1) {
      track("whatsapp_click", {
        method: "whatsapp",
        link_url: href
      });
    }
  });

  document.addEventListener("submit", async (e) => {
    const form = e.target.closest("form.contact-form");
    if (!form || form.classList.contains("is-sending") || form.classList.contains("is-sent")) return;
    e.preventDefault();
    if (typeof form.reportValidity === "function" && !form.reportValidity()) return;

    const data = {
      name: (form.querySelector("[name=name]") || {}).value || "",
      phone: (form.querySelector("[name=phone]") || {}).value || "",
      reason: (form.querySelector("[name=reason]") || {}).value || "",
      privacy_consent: (form.querySelector("[name=privacy_consent]") || {}).checked ? "yes" : "no",
      _subject: "פנייה חדשה מהאתר — אשר תקשורת"
    };

    const btn = form.querySelector("[type=submit]");
    const heSending = "שולח…";
    const enSending = window.ASHER_EN && window.ASHER_EN["form.sending"];
    const prev = btn ? btn.textContent : "";
    form.classList.add("is-sending");
    if (btn) {
      btn.disabled = true;
      btn.textContent = (document.documentElement.lang === "en" && enSending) ? enSending : heSending;
    }

    try {
      const res = await fetch("https://formsubmit.co/ajax/" + TO, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("send failed");
      form.classList.add("is-sent");
      track("form_submit", { method: "form", form_name: "contact" });
    } catch (err) {
      const body = "שם: " + data.name + "\nטלפון: " + data.phone + "\nסיבת הפנייה: " + data.reason;
      window.location.href = "mailto:" + TO +
        "?subject=" + encodeURIComponent("פנייה מהאתר — אשר תקשורת") +
        "&body=" + encodeURIComponent(body);
      form.classList.add("is-sent");
    } finally {
      form.classList.remove("is-sending");
      if (btn) {
        btn.disabled = false;
        btn.textContent = prev;
      }
    }
  });
})();
