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
    const key = el.dataset.i18n;
    if (!key) return;

    const value = translations[lang]?.[key];
    if (value) el.textContent = value;
  });

  // Typed text
  const typedEl = document.querySelector(".typed");
  if (typedEl) {
    const typedText = translations[lang]?.["hero.roles"];
    if (typedText) {
      typedEl.setAttribute("data-typed-items", typedText);
      if (window.typedInstance) window.typedInstance.destroy();
      window.typedInstance = new Typed(".typed", {
        strings: typedText.split(","),
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  }

  document.getElementById("lang-en")?.classList.toggle("active", lang === "en");
  document.getElementById("lang-fr")?.classList.toggle("active", lang === "fr");
}

document.getElementById("lang-en")?.addEventListener("click", () => applyLanguage("en"));
document.getElementById("lang-fr")?.addEventListener("click", () => applyLanguage("fr"));
