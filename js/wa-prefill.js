(function () {
  function topic() {
    const h1 = document.querySelector("#main h1") || document.querySelector("h1");
    const text = h1 ? h1.textContent.replace(/\s+/g, " ").trim() : "";
    if (text) return text;
    return (document.title || "אשר תקשורת").replace(/\s*[|\-–—].*$/, "").trim() || "אשר תקשורת";
  }

  function source() {
    const canon = document.querySelector('link[rel="canonical"]');
    let raw = canon && canon.href ? canon.href : "";
    if (!raw) {
      const url = new URL(location.href);
      url.hash = "";
      raw = url.href;
    }
    try { return decodeURI(raw); } catch (e) { return raw; }
  }

  function message() {
    const subject = topic();
    const from = source();
    if (document.documentElement.lang === "en") {
      return "Hi, I reached you through the website about \"" + subject + "\".\n" + from;
    }
    return "היי, פניתי דרך האתר בנושא «" + subject + "».\n" + from;
  }

  function apply() {
    const href = "https://wa.me/972507228900?text=" + encodeURIComponent(message());
    document.querySelectorAll("a.wa").forEach(function (a) {
      a.href = href;
    });
  }

  apply();
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("a.wa")) apply();
  }, true);
  window.addEventListener("load", apply);
})();
