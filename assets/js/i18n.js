/**
 * i18n - Internationalization System
 * Manages multi-language support (EN/FR) with dynamic switching
 */

class I18n {
  constructor() {
    this.currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
    this.translations = {};
    this.init();
  }

  async init() {
    try {
      // Load translations from JSON file
      const response = await fetch('assets/i18n/translations.json');
      this.translations = await response.json();
      
      // Apply initial language
      this.setLanguage(this.currentLanguage);
      
      // Setup language switcher buttons
      this.setupLanguageSwitcher();
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }

  setupLanguageSwitcher() {
    const langEnBtn = document.getElementById('lang-en');
    const langFrBtn = document.getElementById('lang-fr');

    if (langEnBtn) {
      langEnBtn.addEventListener('click', () => {
        this.setLanguage('en');
      });
    }

    if (langFrBtn) {
      langFrBtn.addEventListener('click', () => {
        this.setLanguage('fr');
      });
    }
  }

  setLanguage(lang) {
    if (!this.translations[lang]) {
      console.warn(`Language ${lang} not found`);
      return;
    }

    this.currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);

    // Update all elements with data-i18n attribute
    this.updatePageContent(lang);

    // Update language button states
    this.updateLanguageButtons(lang);

    // Update CV download button
    this.updateCVButton(lang);
  }

  updatePageContent(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const text = this.getTranslation(key, lang);
      
      if (text) {
        // Check if element is input/textarea
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = text;
        } else {
          element.textContent = text;
        }
      }
    });

    // Update page title
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
      const titleKey = pageTitle.getAttribute('data-i18n');
      if (titleKey) {
        pageTitle.textContent = this.getTranslation(titleKey, lang);
      }
    }
  }

  updateLanguageButtons(lang) {
    const langEnBtn = document.getElementById('lang-en');
    const langFrBtn = document.getElementById('lang-fr');

    if (langEnBtn && langFrBtn) {
      if (lang === 'en') {
        langEnBtn.classList.add('active');
        langFrBtn.classList.remove('active');
      } else {
        langFrBtn.classList.add('active');
        langEnBtn.classList.remove('active');
      }
    }
  }

  updateCVButton(lang) {
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
      if (lang === 'fr') {
        downloadBtn.href = 'assets/cv/Imen_Chabani_CV_FR.pdf';
        downloadBtn.innerHTML = '<i class="bi bi-download"></i> ' + this.getTranslation('resume.download_resume', lang);
      } else {
        downloadBtn.href = 'assets/cv/Imen_Chabani_Resume_EN.pdf';
        downloadBtn.innerHTML = '<i class="bi bi-download"></i> ' + this.getTranslation('resume.download_resume', lang);
      }
    }
  }

  getTranslation(key, lang) {
    const keys = key.split('.');
    let value = this.translations[lang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return null;
      }
    }

    return value;
  }

  t(key, lang = null) {
    return this.getTranslation(key, lang || this.currentLanguage);
  }
}

// Initialize i18n when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new I18n();
});
