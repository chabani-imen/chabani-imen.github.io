let translations = {};
let currentLang = "en";

fetch("assets/lang/lang.json")
  .then(res => res.json())
  .then(data => {
    translations = data;
    applyLanguage(currentLang);
  });

function applyLanguage(lang) {
  currentLang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const keys = el.dataset.i18n.split(".");
    let value = translations[lang];
    keys.forEach(k => value = value[k]);
    el.textContent = value;
  });

  // Typed text
  const typedEl = document.querySelector(".typed");
  if (typedEl) {
    typedEl.setAttribute(
      "data-typed-items",
      translations[lang].hero.typed
    );
  }

  document.getElementById("lang-en").classList.toggle("active", lang === "en");
  document.getElementById("lang-fr").classList.toggle("active", lang === "fr");
}

document.getElementById("lang-en")?.addEventListener("click", () => applyLanguage("en"));
document.getElementById("lang-fr")?.addEventListener("click", () => applyLanguage("fr"));
