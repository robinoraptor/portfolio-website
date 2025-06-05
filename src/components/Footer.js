import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  // Übersetzungen
  const content = {
    de: {
      title: "Robin Mayer",
      tagline: "Kreativität trifft Technologie",
      description: "Human Factors Spezialist und UX Engineer mit Fokus auf menschzentrierte Gestaltung digitaler und physischer Produkte.",
      links: "Links",
      contact: "Kontakt",
      home: "Home",
      projects: "Projekte",
      about: "Über mich",
      timeline: "Werdegang",
      contactLink: "Kontakt",
      email: "E-Mail",
      location: "Standort",
      locationValue: "Blumberg, Baden-Württemberg",
      copyright: "© 2025 Robin Mayer. Alle Rechte vorbehalten."
    },
    en: {
      title: "Robin Mayer",
      tagline: "Where Creativity Meets Technology",
      description: "Human Factors Specialist and UX Engineer focusing on human-centered design of digital and physical products.",
      links: "Links",
      contact: "Contact",
      home: "Home",
      projects: "Projects",
      about: "About",
      timeline: "Career",
      contactLink: "Contact",
      email: "Email",
      location: "Location",
      locationValue: "Blumberg, Baden-Württemberg",
      copyright: "© 2025 Robin Mayer. All rights reserved."
    }
  };

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

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Abstand vom oberen Rand
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
        // Easing-Funktion wird über CSS gesteuert (scroll-behavior)
      });
    }
  };

  return (
    <footer className={`${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-gray-300 py-12`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Spalte 1: Logo und Beschreibung */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold mb-4">
              {content[language].title}<span className="text-orange-500">.</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              {content[language].description}
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-3 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 hover:bg-orange-500 transition-colors duration-300"
                onClick={playClickSound}
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                </svg>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 hover:bg-orange-500 transition-colors duration-300"
                onClick={playClickSound}
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 hover:bg-orange-500 transition-colors duration-300"
                onClick={playClickSound}
                aria-label="Twitter/X"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Spalte 2: Links */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-6 relative">
              {content[language].links}
              <span className="absolute left-0 bottom-0 w-12 h-1 bg-orange-500 mt-2 -mb-3"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  onClick={(e) => scrollToSection(e, 'home')}
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300 hover:translate-x-1 inline-block transform"
                >
                  {content[language].home}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, 'about')}
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300 hover:translate-x-1 inline-block transform"
                >
                  {content[language].about}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, 'projects')}
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300 hover:translate-x-1 inline-block transform"
                >
                  {content[language].projects}
                </a>
              </li>
              <li>
                <a
                  href="#timeline"
                  onClick={(e) => scrollToSection(e, 'timeline')}
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300 hover:translate-x-1 inline-block transform"
                >
                  {content[language].timeline}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300 hover:translate-x-1 inline-block transform"
                >
                  {content[language].contactLink}
                </a>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Kontakt */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-6 relative">
              {content[language].contact}
              <span className="absolute left-0 bottom-0 w-12 h-1 bg-orange-500 mt-2 -mb-3"></span>
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-400">
                <span className="block text-sm font-medium text-gray-300 mb-1">
                  {content[language].email}
                </span>
                <a
                  href="mailto:contact@robin-mayer.de"
                  className="hover:text-orange-500 transition-colors duration-300"
                >
                  contact@robin-mayer.de
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block text-sm font-medium text-gray-300 mb-1">
                  {content[language].location}
                </span>
                {content[language].locationValue}
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          {content[language].copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;