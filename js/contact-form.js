(function () {
  const TO = "asher@ashercom.com";
  // Public FormSubmit alias. Submissions still arrive at TO after the inbox confirms the form.
  const FORM_ALIAS = "efb447a68420899a7777bccd3c283558";
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
      const res = await fetch("https://formsubmit.co/ajax/" + FORM_ALIAS, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("send failed");
      form.classList.add("is-sent");
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
