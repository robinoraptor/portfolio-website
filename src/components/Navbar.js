import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { Moon, Sun, Globe } from 'lucide-react';

const Navbar = () => {
  const { darkMode, toggleDarkMode, isChanging } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Übersetzungen
  const content = {
    de: {
      home: "Home",
      projects: "Projekte",
      about: "Über mich",
      timeline: "Werdegang",
      contact: "Kontakt",
      themeDark: "Dark Mode",
      themeLight: "Light Mode",
      languageDe: "Deutsch",
      languageEn: "English"
    },
    en: {
      home: "Home",
      projects: "Projects",
      about: "About",
      timeline: "Career",
      contact: "Contact",
      themeDark: "Dark Mode",
      themeLight: "Light Mode",
      languageDe: "German",
      languageEn: "English"
    }
  };

  // Event-Listener für das Scrollen
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Retro Klick-Sound abspielen
  const playClickSound = () => {
    const audio = new Audio('/assets/sounds/retro-click.mp3');
    audio.volume = 0.2;
    audio.play();
  };

  // Smooth Scroll zu Ankerpunkten
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    playClickSound();

    // Mobile Menu schließen, wenn geöffnet
    setMobileMenuOpen(false);

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Abstand vom oberen Rand
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
        // Sicherstellen, dass das Scrollen nicht zu schnell ist
        // und eine sanfte Ease-in-out-Funktion verwendet
      });
    }
  };

  // Theme umschalten
  const handleToggleDarkMode = () => {
    if (!isChanging) {
      playClickSound();
      toggleDarkMode();
    }
  };

  // Sprache umschalten
  const toggleLanguage = () => {
    playClickSound();
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full glass-navbar ${scrolled ? 'py-2 shadow-md' : 'py-5'
        } ${darkMode ? 'dark:bg-gray-900/80 dark:border-gray-800' : 'bg-gray-50/80 border-gray-200'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className={`text-2xl font-bold ${darkMode ? 'text-gray-50' : 'text-gray-900'}`}>
          Robin Mayer<span className="text-orange-500">.</span>
        </div>

        <div className="flex items-center">
          {/* Navigation Links - Desktop */}
          <ul className="hidden md:flex space-x-10 mr-6">
            <li>
              <a
                href="#home"
                onClick={(e) => scrollToSection(e, 'home')}
                className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} relative py-2 hover:text-orange-500 transition-colors duration-300 group`}
              >
                {content[language].home}
                <span className="absolute w-0 h-0.5 bg-orange-500 bottom-0 left-0 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, 'about')}
                className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} relative py-2 hover:text-orange-500 transition-colors duration-300 group`}
              >
                {content[language].about}
                <span className="absolute w-0 h-0.5 bg-orange-500 bottom-0 left-0 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, 'projects')}
                className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} relative py-2 hover:text-orange-500 transition-colors duration-300 group`}
              >
                {content[language].projects}
                <span className="absolute w-0 h-0.5 bg-orange-500 bottom-0 left-0 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="#timeline"
                onClick={(e) => scrollToSection(e, 'timeline')}
                className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} relative py-2 hover:text-orange-500 transition-colors duration-300 group`}
              >
                {content[language].timeline}
                <span className="absolute w-0 h-0.5 bg-orange-500 bottom-0 left-0 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} relative py-2 hover:text-orange-500 transition-colors duration-300 group`}
              >
                {content[language].contact}
                <span className="absolute w-0 h-0.5 bg-orange-500 bottom-0 left-0 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>

          {/* Theme & Language Toggles */}
          <div className="flex space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={handleToggleDarkMode}
              disabled={isChanging}
              className={`p-2 rounded-full transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-orange-500' : 'bg-gray-200 text-gray-900'} hover:bg-orange-500 hover:text-white ${isChanging ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'}`}
              aria-label={darkMode ? content[language].themeLight : content[language].themeDark}
              title={darkMode ? content[language].themeLight : content[language].themeDark}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-full ${darkMode
                ? 'bg-gray-800 text-orange-500'
                : 'bg-gray-200 text-gray-900'
                } hover:bg-orange-500 hover:text-white transition-colors`}
              aria-label={language === 'de' ? content[language].languageEn : content[language].languageDe}
              title={language === 'de' ? content[language].languageEn : content[language].languageDe}
            >
              <Globe size={18} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500 hover:text-orange-500 focus:outline-none z-50 ml-3"
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            {mobileMenuOpen ? (
              // X icon when menu is open
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon when menu is closed
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm flex flex-col items-center justify-center z-40 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'
          }`}
      >
        <ul className="flex flex-col items-center space-y-8 text-xl">
          <li>
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, 'home')}
              className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} relative py-2 hover:text-orange-500 transition-colors duration-300`}
            >
              {content[language].home}
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} relative py-2 hover:text-orange-500 transition-colors duration-300`}
            >
              {content[language].about}
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
              className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} relative py-2 hover:text-orange-500 transition-colors duration-300`}
            >
              {content[language].projects}
            </a>
          </li>
          <li>
            <a
              href="#timeline"
              onClick={(e) => scrollToSection(e, 'timeline')}
              className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} relative py-2 hover:text-orange-500 transition-colors duration-300`}
            >
              {content[language].timeline}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} relative py-2 hover:text-orange-500 transition-colors duration-300`}
            >
              {content[language].contact}
            </a>
          </li>

          {/* Mobile Menu - Theme & Language Toggles */}
          <li className="flex space-x-4 mt-6">
            <button
              onClick={handleToggleDarkMode}
              disabled={isChanging}
              className={`p-2 rounded-full transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-orange-500' : 'bg-gray-200 text-gray-900'} hover:bg-orange-500 hover:text-white ${isChanging ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'}`}
              aria-label={darkMode ? content[language].themeLight : content[language].themeDark}
              title={darkMode ? content[language].themeLight : content[language].themeDark}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={toggleLanguage}
              className={`p-3 rounded-full ${darkMode
                ? 'bg-gray-800 text-orange-500'
                : 'bg-gray-200 text-gray-900'
                } hover:bg-orange-500 hover:text-white transition-colors`}
              aria-label={language === 'de' ? content[language].languageEn : content[language].languageDe}
            >
              <Globe size={20} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;