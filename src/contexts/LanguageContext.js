import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('de');

  useEffect(() => {
    // Spracheinstellung aus localStorage laden
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Browser-Spracheinstellung prüfen
      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      setLanguage(['de', 'en'].includes(browserLang) ? browserLang : 'de');
    }
  }, []);

  useEffect(() => {
    // Spracheinstellung speichern
    localStorage.setItem('language', language);

    // HTML lang-Attribut aktualisieren für Barrierefreiheit und SEO
    document.documentElement.setAttribute('lang', language);

    // Meta-Description aktualisieren je nach Sprache
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      if (language === 'de') {
        metaDescription.setAttribute('content', 'Robin Mayer - Human Factors Spezialist und UX Engineer. Portfolio mit Fokus auf menschzentrierte Gestaltung.');
      } else {
        metaDescription.setAttribute('content', 'Robin Mayer - Human Factors Specialist and UX Engineer. Portfolio focused on human-centered design.');
      }
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};