import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import Modal from './Modal';

// Direkter Import der JSON-Daten
import skillsDataImport from '../data/skills.json';

const AboutSection = () => {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const sectionRef = useRef(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showSkillModal, setShowSkillModal] = useState(false);

  // Skills Data von JSON - File
  const skills = skillsDataImport;

  // Übersetzungen
  const content = {
    de: {
      title: "Über mich",
      description1: "Ich bin ein Human Factors Spezialist und UX Engineer mit mehr als 5 Jahren Erfahrung in der interdisziplinären Gestaltung digitaler und physischer Produkte. Mein Fokus liegt auf der menschzentrierten Gestaltung, die sowohl funktional als auch ästhetisch ansprechend ist.",
      description2: "Mit einem Hintergrund in Ingenieurpsychologie und Human Factors verstehe ich die Balance zwischen technischen Anforderungen, menschlichen Bedürfnissen und Gestaltungsprinzipien. Jedes Projekt ist eine Gelegenheit, innovative Lösungen zu entwickeln und die Benutzerfreundlichkeit zu verbessern."
    },
    en: {
      title: "About me",
      description1: "I am a Human Factors Specialist and UX Engineer with more than 5 years of experience in interdisciplinary design of digital and physical products. My focus is on human-centered design that is both functional and aesthetically pleasing.",
      description2: "With a background in Engineering Psychology and Human Factors, I understand the balance between technical requirements, human needs, and design principles. Each project is an opportunity to develop innovative solutions and improve usability."
    }
  };

  // Retro Klick-Sound abspielen
  const playClickSound = () => {
    const audio = new Audio('/assets/sounds/retro-click.mp3');
    audio.volume = 0.2;
    audio.play();
  };

  // Skill-Modal öffnen
  const openSkillModal = (skill) => {
    playClickSound();
    setSelectedSkill(skill);
    setShowSkillModal(true);
  };

  // Scroll-Animation
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const elements = section.querySelectorAll('.animate-fade-in');
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Bild-Container */}
          <div className="md:w-1/2 animate-fade-in">
            <div className="relative max-w-md mx-auto">
              {/* Hauptbild */}
              <div className="relative z-10 overflow-hidden rounded-lg shadow-xl bg-gray-300 h-[500px]">
                <img
                  src="/assets/images/profile.jpg"
                  alt="Robin Mayer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/api/placeholder/400/500?text=Robin+Mayer';
                  }}
                />
              </div>

              {/* Dekorative Elemente */}
              <div className="absolute top-8 -left-8 w-full h-full border-4 border-orange-500 rounded-lg z-0"></div>
              <div className="absolute -bottom-8 -right-8 w-60 h-60 bg-gray-200 dark:bg-gray-800 rounded-lg z-0"></div>
            </div>
          </div>

          {/* Content */}
          <div className="md:w-1/2">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-left ${darkMode ? 'text-white' : 'text-gray-900'} animate-fade-in`}>
              {content[language].title}
            </h2>

            <div className="w-20 h-1 bg-orange-500 mb-8 animate-fade-in"></div>

            <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'} animate-fade-in`}>
              {content[language].description1}
            </p>

            <p className={`text-lg mb-10 ${darkMode ? 'text-gray-300' : 'text-gray-700'} animate-fade-in`}>
              {content[language].description2}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 animate-fade-in">
              {skills.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => openSkillModal(skill)}
                  className={`px-4 py-2 rounded-full text-sm ${darkMode
                    ? 'bg-gray-800 text-gray-200 hover:bg-orange-500 hover:text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-orange-500 hover:text-white'
                    } transition-all duration-300 transform hover:scale-105`}
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skill Modal */}
      <Modal
        isOpen={showSkillModal && selectedSkill !== null}
        onClose={() => setShowSkillModal(false)}
        className="max-w-md"
      >
        {selectedSkill && (
          <div className="p-6">
            <div className="flex items-center mb-6">
              {/* Skill Icon */}
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 mr-4 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedSkill.icon}
                  alt={selectedSkill.name}
                  className="w-10 h-10"
                  onError={(e) => {
                    e.target.onerror = null;
                    // Fallback zu einem generischen Icon
                    e.target.src = `https://ui-avatars.com/api/?name=${selectedSkill.name.split(' ').join('+')}&background=ff5f00&color=fff`;
                  }}
                />
              </div>

              {/* Skill Name */}
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {selectedSkill.name}
              </h3>
            </div>

            {/* Skill Description */}
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {selectedSkill.description}
            </p>

            {/* Tools & Technologies */}
            <div>
              <h4 className={`text-md font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Tools & Technologien:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedSkill.tools.map((tool, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs ${darkMode
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-700'
                      }`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default AboutSection;