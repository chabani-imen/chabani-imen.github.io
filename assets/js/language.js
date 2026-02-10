document.addEventListener("DOMContentLoaded", () => {
  let translations = {};
  let currentLang = "en";

  fetch("assets/lang/lang.json")
    .then(res => res.json())
    .then(data => translations = data)
    .catch(() => console.warn("Translation file not loaded"));

  function applyLanguage(lang) {
    if (!translations[lang]) return;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n").split(".");
      let value = translations[lang];

      for (let k of key) {
        if (!value[k]) return;
        value = value[k];
      }

      el.textContent = value;
    });

    document.documentElement.lang = lang;
  }

  document.getElementById("lang-en")?.addEventListener("click", () => applyLanguage("en"));
  document.getElementById("lang-fr")?.addEventListener("click", () => applyLanguage("fr"));
});
