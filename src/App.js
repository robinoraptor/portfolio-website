import React, { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ProjectGrid from './components/ProjectGrid';
import Timeline from './components/Timeline';
import ContactSection from './components/ContactSection';
import RetroGame from './components/RetroGame';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  // Alle Komponenten beim Scrollen animieren
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-fade-in');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isInViewport = (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
          rect.bottom >= 0
        );

        if (isInViewport) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Globale Styles und Verhalten
  useEffect(() => {
    // Theme-Color für Browser dynamisch setzen
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#ff5f00"); // Orange
    }

    // Smooth Scroll Behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Event-Listener für smoother Scroll mit verzögertem Easing
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    smoothScrollLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      smoothScrollLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* Custom Cursor (für PNG-Cursor) */}
        <CustomCursor />

        {/* Navbar */}
        <Navbar />

        {/* Hauptinhalt */}
        <main>
          {/* Hero Section */}
          <section id="home">
            <Hero />
          </section>

          {/* About Section */}
          <section id="about">
            <AboutSection />
          </section>

          {/* Projects Section */}
          <section id="projects">
            <ProjectGrid />
          </section>

          {/* Timeline Section */}
          <section id="timeline">
            <Timeline />
          </section>

          {/* Contact Section */}
          <section id="contact">
            <ContactSection />
          </section>

          {/* Easter Egg (optional, kann im Footer oder anderswo eingeblendet werden) */}
          <div className="hidden">
            <RetroGame />
          </div>
        </main>

        {/* Footer mit Theme und Sprach-Toggles */}
        <Footer />

        {/* Globale Styles */}
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
          
          * {
            font-family: 'Space Mono', monospace;
            cursor: none !important; /* Versteckt den nativen Cursor */
          }
          
          /* Sanftere Scrollanimation mit Easing */
          html {
            scroll-behavior: smooth;
            --scroll-behavior: smooth;
          }
          
          @media (prefers-reduced-motion: no-preference) {
            :root {
              scroll-behavior: smooth;
            }
          }
          
          /* Custom Scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #f1f3f5;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #ff5f00;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #e55500;
          }
          
          /* Dark Mode Scrollbar */
          .dark ::-webkit-scrollbar-track {
            background: #343a40;
          }
          
          .dark ::-webkit-scrollbar-thumb {
            background: #ff5f00;
          }
          
          .dark ::-webkit-scrollbar-thumb:hover {
            background: #e55500;
          }
          
          /* Animation für Elemente */
          .animate-fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }
          
          .animate-fade-in.active {
            opacity: 1;
            transform: translateY(0);
          }
          
          /* Überschriften linksbündig */
          h1, h2, h3, h4, h5, h6 {
            text-align: left;
          }
        `}</style>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;