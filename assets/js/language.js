let translations = {};
let currentLang = "en";

// تحميل JSON
fetch("assets/lang/lang.json")
  .then(res => res.json())
  .then(data => {
    translations = data;
    applyLanguage(currentLang);
  })
  .catch(err => console.error("Lang load error:", err));

function applyLanguage(lang) {
  currentLang = lang;

  // تغيير كل النصوص
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (!key) return;

    const keys = key.split(".");
    let value = translations[lang];
    for (let k of keys) {
      if (!value) return;
      value = value[k];
    }

    if (value) el.textContent = value;
  });

  // تغيير النص المتحرك (Typed.js)
  const typedEl = document.querySelector(".typed");
  if (typedEl && translations[lang]?.hero?.roles) {
    // إذا كانت هناك نسخة مسبقة من Typed، نحذفها
    if (window.typedInstance) window.typedInstance.destroy();

    window.typedInstance = new Typed(".typed", {
      strings: translations[lang].hero.roles.split(","),
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // تغيير تفعيل الأزرار
  document.getElementById("lang-en").classList.toggle("active", lang === "en");
  document.getElementById("lang-fr").classList.toggle("active", lang === "fr");
}

// أحداث الأزرار
document.getElementById("lang-en").addEventListener("click", () => applyLanguage("en"));
document.getElementById("lang-fr").addEventListener("click", () => applyLanguage("fr"));
