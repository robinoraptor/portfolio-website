import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';

const Hero = () => {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  // Übersetzungen
  const content = {
    de: {
      greeting: "Hallo, ich bin",
      name: "Robin Mayer",
      slogan: "Kreativität trifft Technologie",
      description: "Ich entwickle menschzentrierte digitale und physische Produkte, die innovativ und benutzerfreundlich sind.",
      projectsButton: "Meine Projekte ansehen",
      contactButton: "Kontakt"
    },
    en: {
      greeting: "Hi, I'm",
      name: "Robin Mayer",
      slogan: "Where Creativity Meets Technology",
      description: "I develop human-centered digital and physical products that are innovative and user-friendly.",
      projectsButton: "View My Projects",
      contactButton: "Contact"
    }
  };

  // Retro Klick-Sound abspielen
  const playClickSound = () => {
    const audio = new Audio('/assets/sounds/retro-click.mp3');
    audio.volume = 0.2;
    audio.play();
  };

  // Smooth Scroll zu Projekten
  const scrollToProjects = (e) => {
    e.preventDefault();
    playClickSound();

    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const offset = 80; // Abstand vom oberen Rand
      const targetPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Smooth Scroll zu Kontakt
  const scrollToContact = (e) => {
    e.preventDefault();
    playClickSound();

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80;
      const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Animation für geometrische Formen
  useEffect(() => {
    // Funktion für die Animation der Formen
    const animateShapes = () => {
      const shapes = document.querySelectorAll('.shape');
      shapes.forEach((shape, index) => {
        const randomX = Math.random() * 10 - 5;
        const randomY = Math.random() * 10 - 5;
        const randomDelay = index * 0.2;

        shape.style.transition = `transform 6s ease-in-out ${randomDelay}s`;
        shape.style.transform = `translate(${randomX}px, ${randomY}px)`;

        setInterval(() => {
          const newRandomX = Math.random() * 10 - 5;
          const newRandomY = Math.random() * 10 - 5;
          shape.style.transform = `translate(${newRandomX}px, ${newRandomY}px)`;
        }, 6000);
      });

      const circles = document.querySelectorAll('.futuristic-circle');
      circles.forEach((circle) => {
        circle.classList.add('animate-pulse');
      });
    };

    // Animation starten
    animateShapes();
  }, []);

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen transition-colors duration-500 relative overflow-hidden`}>
      {/* Geometrische Formen und Dekorationen */}
      <div className="geometric-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="grid-bg"></div>
        <div className="futuristic-circle large circle-1"></div>
        <div className="futuristic-circle small circle-2"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 flex items-center min-h-screen relative z-10 py-32">
        <div className="max-w-xl animate-fade-in">
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-xl md:text-2xl font-light mb-2`}>
            {content[language].greeting}
          </p>
          <h1 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-5xl md:text-7xl font-bold mb-4`}>
            {content[language].name}
          </h1>
          <h2 className="text-orange-500 text-3xl md:text-4xl font-bold mb-6">
            {content[language].slogan}
          </h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-xl max-w-md mb-10 leading-relaxed`}>
            {content[language].description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="button-primary flex items-center"
            >
              {content[language].projectsButton}
            </a>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="button-secondary flex items-center"
            >
              {content[language].contactButton}
            </a>
          </div>
        </div>
      </div>

      {/* CSS für die Formen */}
      <style jsx>{`
        .geometric-shapes {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
        }
        
        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
        }
        
        .shape-1 {
          width: 400px;
          height: 400px;
          background: var(--orange);
          top: -100px;
          right: -100px;
        }
        
        .shape-2 {
          width: 200px;
          height: 200px;
          background: var(--mid-gray);
          bottom: 100px;
          right: 200px;
        }
        
        .shape-3 {
          width: 300px;
          height: 300px;
          border: 20px solid var(--dark-gray);
          bottom: -150px;
          right: 40%;
        }
        
        .futuristic-circle.circle-1 {
          right: 10%;
          top: 20%;
        }
        
        .futuristic-circle.circle-2 {
          left: 5%;
          bottom: 10%;
          border-color: var(--mid-gray);
        }
      `}</style>
    </div>
  );
};

export default Hero;