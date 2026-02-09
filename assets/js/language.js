/**
 * Language Switcher - Bilingual Support (EN/FR)
 * Manages language switching and CV download based on selected language
 */

(function() {
  "use strict";

  // Get current language from localStorage or default to 'en'
  let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Initialize language on page load
  document.addEventListener('DOMContentLoaded', function() {
    setLanguage(currentLanguage);
    initLanguageSwitcher();
  });

  /**
   * Initialize language switcher buttons
   */
  function initLanguageSwitcher() {
    const langEnBtn = document.getElementById('lang-en');
    const langFrBtn = document.getElementById('lang-fr');

    if (langEnBtn) {
      langEnBtn.addEventListener('click', function() {
        setLanguage('en');
        localStorage.setItem('selectedLanguage', 'en');
      });
    }

    if (langFrBtn) {
      langFrBtn.addEventListener('click', function() {
        setLanguage('fr');
        localStorage.setItem('selectedLanguage', 'fr');
      });
    }
  }

  /**
   * Set language and update all language-dependent elements
   */
  function setLanguage(lang) {
    currentLanguage = lang;

    // Update navigation links
    const navEnElements = document.querySelectorAll('.nav-en');
    const navFrElements = document.querySelectorAll('.nav-fr');

    navEnElements.forEach(el => {
      el.style.display = lang === 'en' ? 'inline' : 'none';
    });

    navFrElements.forEach(el => {
      el.style.display = lang === 'fr' ? 'inline' : 'none';
    });

    // Update CV download button
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
      if (lang === 'fr') {
        downloadBtn.href = 'assets/cv/Imen_Chabani_CV_FR.pdf';
      } else {
        downloadBtn.href = 'assets/cv/Imen_Chabani_Resume_EN.pdf';
      }
    }

    // Update CV button text
    const cvTextEn = document.querySelectorAll('.cv-text-en');
    const cvTextFr = document.querySelectorAll('.cv-text-fr');

    cvTextEn.forEach(el => {
      el.style.display = lang === 'en' ? 'inline' : 'none';
    });

    cvTextFr.forEach(el => {
      el.style.display = lang === 'fr' ? 'inline' : 'none';
    });

    // Update language button active state
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

    // Update page titles and descriptions based on language
    updatePageContent(lang);
  }

  /**
   * Update page content based on language
   */
  function updatePageContent(lang) {
    // This function can be extended to update other page content
    // For now, it serves as a placeholder for future translations
    
    // Update page title
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
      if (lang === 'fr') {
        if (pageTitle.textContent.includes('Resume')) {
          pageTitle.textContent = 'CV - Imen Chabani';
        }
      } else {
        if (pageTitle.textContent.includes('CV')) {
          pageTitle.textContent = 'Resume - Imen Chabani';
        }
      }
    }
  }

  // Expose setLanguage function globally for external use if needed
  window.setLanguage = setLanguage;

})();
