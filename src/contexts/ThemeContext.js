import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // Initial-Setup
  useEffect(() => {
    // Dark Mode Präferenz aus localStorage laden
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    } else {
      // Systemeinstellung prüfen
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Themenwechsel-Logik
  const applyTheme = useCallback((isDark) => {
    // Speichern in localStorage
    localStorage.setItem('darkMode', isDark.toString());

    // DOM-Manipulation
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Theme-Color für Browser
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", isDark ? '#343a40' : '#ff5f00');
    }
  }, []);

  // Effect für Themenwechsel
  useEffect(() => {
    if (isChanging) return; // Verhindere mehrfache Ausführung

    applyTheme(darkMode);
  }, [darkMode, isChanging, applyTheme]);

  // Verbesserte Toggle-Funktion
  const toggleDarkMode = useCallback(() => {
    if (isChanging) return;

    setIsChanging(true);

    // Vorläufig das Theme anwenden, ohne den State zu ändern
    const newDarkMode = !darkMode;
    applyTheme(newDarkMode);

    // Mit einer verzögerten Animation den Status ändern
    setTimeout(() => {
      setDarkMode(newDarkMode);
      // Etwas längere Zeit warten, bevor isChanging zurückgesetzt wird
      setTimeout(() => {
        setIsChanging(false);
      }, 300); // Längere Verzögerung
    }, 50);
  }, [darkMode, isChanging, applyTheme]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, isChanging }}>
      {children}
    </ThemeContext.Provider>
  );
};