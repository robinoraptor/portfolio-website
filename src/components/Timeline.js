import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import Modal from './Modal';
import '../styles/Timeline.css';

// Direkter Import der JSON-Daten
import timelineDataImport from '../data/experience.json';

const Timeline = () => {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const sectionRef = useRef(null);
  const timelineContainerRef = useRef(null);
  const timelineProgressRef = useRef(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Timeline Data von JSON - File
  const timelineData = timelineDataImport;

  // Mobile-Erkennung
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile(); // Initialer Check
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Übersetzungen
  const content = {
    de: {
      title: "Meine Karriere-Timeline",
      subtitle: "Klicke auf einen Zeitpunkt, um mehr zu erfahren",
      closeButton: "Schließen",
      education: "Bildung",
      experience: "Erfahrung"
    },
    en: {
      title: "My Career Timeline",
      subtitle: "Click on a point to learn more",
      closeButton: "Close",
      education: "Education",
      experience: "Experience"
    }
  };

  // Retro Klick-Sound abspielen
  const playClickSound = () => {
    try {
      const audio = new Audio('/assets/sounds/retro-click.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => console.log('Sound konnte nicht abgespielt werden:', e));
    } catch (error) {
      console.log('Fehler beim Abspielen des Sounds:', error);
    }
  };

  // Scroll-Animation
  useEffect(() => {
    const handleScroll = () => {
      // Scroll-Handler-Logik bleibt gleich
      // ...

      const section = sectionRef.current;
      if (!section) return;

      // Animation für Fade-In Elemente
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

      // Timeline Progress berechnen basierend auf Scroll-Position
      if (timelineContainerRef.current && timelineProgressRef.current) {
        const container = timelineContainerRef.current;
        const progress = timelineProgressRef.current;

        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const windowHeight = window.innerHeight;

        // Liste der Timeline-Items
        const timelineItems = container.querySelectorAll('.timeline-item');
        const itemCount = timelineItems.length;

        if (itemCount === 0) return;

        // Navbar-Höhe berücksichtigen (Vorsprung)
        const navbarHeight = 80; // ungefähre Höhe der Navbar

        // Berechne, welches Item gerade im Viewport ist
        let activeIndex = -1;

        timelineItems.forEach((item, index) => {
          const itemRect = item.getBoundingClientRect();
          const itemTop = itemRect.top;

          // Ein Item ist aktiv, wenn es im oberen Drittel des Viewports ist
          // und unterhalb der Navbar
          if (itemTop <= windowHeight * 0.4 && itemTop >= navbarHeight) {
            activeIndex = index;
          }
        });

        // Wenn kein Item aktiv ist, aber wir sind im Container-Bereich
        if (activeIndex === -1 && containerTop <= navbarHeight) {
          // Finde das nächste sichtbare Item unterhalb der Navbar
          for (let i = 0; i < itemCount; i++) {
            const itemRect = timelineItems[i].getBoundingClientRect();
            if (itemRect.top >= navbarHeight) {
              // Setze das vorherige Item als aktiv, wenn verfügbar
              activeIndex = Math.max(0, i - 1);
              break;
            }
          }

          // Wenn wir am Ende des Containers sind, setze das letzte Item als aktiv
          if (activeIndex === -1 && containerTop + containerHeight <= windowHeight) {
            activeIndex = itemCount - 1;
          }
        }

        // Wenn ein aktives Item gefunden wurde, setze den Progress entsprechend
        if (activeIndex >= 0) {
          const progressValue = (activeIndex + 1) / itemCount;
          progress.style.transform = `translateX(-50%) scaleY(${progressValue})`;

          // Timeline Items aktivieren bis zum aktiven Index
          timelineItems.forEach((item, index) => {
            if (index <= activeIndex) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        } else {
          // Standardwert, wenn kein aktives Item gefunden wurde
          // Wenn wir oberhalb des Containers sind, setze auf 0
          if (containerTop > windowHeight) {
            progress.style.transform = `translateX(-50%) scaleY(0)`;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Detail-Ansicht öffnen
  const openDetailView = (item) => {
    playClickSound();
    setSelectedItem(item);
    setShowDetailView(true);
  };

  // Initiale Animation
  useEffect(() => {
    setTimeout(() => {
      const elements = document.querySelectorAll('.timeline-item, .timeline-line, .timeline-progress');
      elements.forEach(el => {
        el.style.opacity = '1';
      });
    }, 500);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} relative overflow-hidden`}
    >
      {/* Dekorative Elemente */}
      <div className={`grid-bg ${darkMode ? 'opacity-5' : 'opacity-10'}`}></div>
      <div className="dot-pattern"></div>
      <div className={`futuristic-circle large circle-1 ${darkMode ? 'border-orange-500/20' : 'border-orange-500/10'}`}></div>
      <div className={`futuristic-circle small circle-2 ${darkMode ? 'border-gray-500/20' : 'border-gray-500/10'}`}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="title animate-fade-in text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {content[language].title}
          </h2>
          <div className="w-20 h-1 bg-orange-500 mb-6 mx-auto"></div>
          <p className={`text-lg mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {content[language].subtitle}
          </p>
        </div>

        <div className="timeline-container" ref={timelineContainerRef}>
          {/* Zentrale Linie */}
          <div className={`timeline-line ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

          {/* Timeline Fortschrittsanzeige */}
          <div className="timeline-progress bg-orange-500" ref={timelineProgressRef}></div>

          {/* Timeline Items - vereinfachte Struktur und bedingte Ausgabe für Dots */}
          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className={`timeline-item`}
              data-id={item.id}
              onClick={() => openDetailView(item)}
            >
              {/* Timeline Content */}
              <div className={`timeline-content ${darkMode ? 'bg-gray-900 border-orange-500' : 'bg-white border-orange-500'} ${item.type === 'education' ? 'education' : 'experience'}`}>
                <span className="timeline-date text-orange-500">{item.date}</span>
                <h3 className={`timeline-title ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`timeline-description ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.description}</p>
                <div className="timeline-tags">
                  {item.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className={`timeline-tag ${darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-orange-500 hover:text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-orange-500 hover:text-white'
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline Dot - nur auf Mobile rendern */}
              {isMobile && (
                <div
                  className={`timeline-dot ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                >
                  <span className={`dot-inner ${darkMode ? 'bg-gray-200' : 'bg-white'}`}></span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail View mit Modal-Komponente */}
      <Modal
        isOpen={showDetailView && selectedItem !== null}
        onClose={() => setShowDetailView(false)}
        className="max-w-3xl w-[90%]"
      >
        {selectedItem && (
          <>
            {/* Modalinhalt bleibt unverändert */}
            {/* ... */}
            <div className="mb-6 p-8 pb-0">
              <span className="inline-block px-4 py-1 rounded-full text-sm bg-orange-500/10 text-orange-500">
                {selectedItem.date}
              </span>

              <span className={`ml-3 inline-block px-4 py-1 rounded-full text-sm ${selectedItem.type === 'education'
                ? 'bg-blue-500/10 text-blue-500'
                : 'bg-green-500/10 text-green-500'
                }`}>
                {selectedItem.type === 'education' ? content[language].education : content[language].experience}
              </span>
            </div>

            <h2 className={`text-3xl font-bold mb-6 px-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {selectedItem.title}
            </h2>

            <div className="detail-image h-64 bg-gray-300 mb-8 overflow-hidden">
              <img
                src={`/api/placeholder/800/300?text=${encodeURIComponent(selectedItem.title)}`}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="px-8">
              {selectedItem.detailedDescription.map((paragraph, index) => (
                <p
                  key={index}
                  className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  {paragraph}
                </p>
              ))}

              <div className="detail-tags flex flex-wrap gap-2 mt-8 mb-8">
                {selectedItem.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm transition-all transform hover:scale-105 ${darkMode
                      ? 'bg-gray-800 text-gray-200 hover:bg-orange-500 hover:text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-orange-500 hover:text-white'
                      }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
};

export default Timeline;