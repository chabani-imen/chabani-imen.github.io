let translations = {};
let currentLang = "en";

fetch("assets/lang/lang.json")
  .then(res => res.json())
  .then(data => {
    translations = data;
    applyLanguage(currentLang);
  })
  .catch(err => console.error("Lang load error:", err));

function applyLanguage(lang) {
  currentLang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    if (!el.dataset.i18n) return;

    const keys = el.dataset.i18n.split(".");
    let value = translations[lang];

    for (let k of keys) {
      if (!value || !value[k]) return;
      value = value[k];
    }

    if (value) el.textContent = value;
  });

  // Typed text
  const typedEl = document.querySelector(".typed");
  if (typedEl && translations[lang]?.hero?.typed) {
    typedEl.setAttribute("data-typed-items", translations[lang].hero.typed);

    if (window.typedInstance) window.typedInstance.destroy();
    window.typedInstance = new Typed(".typed", {
      strings: translations[lang].hero.typed.split(","),
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  document.getElementById("lang-en")?.classList.toggle("active", lang === "en");
  document.getElementById("lang-fr")?.classList.toggle("active", lang === "fr");
}

document.getElementById("lang-en")?.addEventListener("click", () => applyLanguage("en"));
document.getElementById("lang-fr")?.addEventListener("click", () => applyLanguage("fr"));
