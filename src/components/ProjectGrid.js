import React, { useState, useContext, useRef } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import Modal from './Modal';

import projectsDataImport from '../data/projects.json';

const ProjectGrid = () => {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const secondaryProjectsRef = useRef(null);

  // Animationsreferenz für das Einblenden der sekundären Projekte
  const secondaryAnimationRef = useRef(null);

  // Skills Data von JSON - File
  const projectsData = projectsDataImport;

  // Spracheinstellungen
  const content = {
    de: {
      title: "Meine Projekte",
      filterAll: "Alle",
      filterSoftware: "Software",
      filterHardware: "Hardware",
      filterDesign: "Design",
      mainProjects: "Hauptprojekte",
      secondaryProjects: "Weitere Projekte",
      technologies: "Technologien",
      closeButton: "Schließen",
      year: "Jahr",
      viewProject: "Mehr erfahren",
      showMore: "Mehr anzeigen",
      showLess: "Weniger anzeigen"
    },
    en: {
      title: "My Projects",
      filterAll: "All",
      filterSoftware: "Software",
      filterHardware: "Hardware",
      filterDesign: "Design",
      mainProjects: "Main Projects",
      secondaryProjects: "Other Projects",
      technologies: "Technologies",
      closeButton: "Close",
      year: "Year",
      viewProject: "Learn more",
      showMore: "Show more",
      showLess: "Show less"
    }
  };

  // Filtern der Projekte basierend auf der ausgewählten Kategorie
  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === selectedCategory);

  // Sortieren der Projekte nach Wichtigkeit
  const mainProjects = filteredProjects.filter(project => project.importance === 'main');
  const secondaryProjects = filteredProjects.filter(project => project.importance === 'secondary');

  // Retro Klick-Sound abspielen
  const playClickSound = () => {
    const audio = new Audio('/assets/sounds/retro-click.mp3');
    audio.volume = 0.2;
    audio.play();
  };

  // Projekt-Details öffnen
  const openProjectDetails = (project) => {
    playClickSound();
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Mehr/Weniger anzeigen Toggle
  const toggleSecondaryProjects = () => {
    playClickSound();

    if (showSecondary) {
      // Wenn die sekundären Projekte bereits angezeigt werden, ausblenden
      secondaryAnimationRef.current = secondaryProjectsRef.current;

      // Animation zum Ausblenden
      if (secondaryAnimationRef.current) {
        secondaryAnimationRef.current.style.maxHeight = secondaryAnimationRef.current.scrollHeight + 'px';
        // Force reflow
        void secondaryAnimationRef.current.offsetHeight;

        // Animation starten
        secondaryAnimationRef.current.style.maxHeight = '0px';
        secondaryAnimationRef.current.style.opacity = '0';

        // Nach der Animation Status aktualisieren
        setTimeout(() => {
          setShowSecondary(false);
        }, 500); // Muss mit der CSS-Transition-Zeit übereinstimmen
      } else {
        setShowSecondary(false);
      }
    } else {
      // Wenn die sekundären Projekte ausgeblendet sind, einblenden
      setShowSecondary(true);

      // Nach dem Rendern Animation starten
      setTimeout(() => {
        if (secondaryProjectsRef.current) {
          secondaryProjectsRef.current.style.maxHeight = secondaryProjectsRef.current.scrollHeight + 'px';
          secondaryProjectsRef.current.style.opacity = '1';
        }
      }, 50);
    }
  };

  // Dynamische Stile basierend auf Dark/Light Mode
  const theme = {
    bg: darkMode ? 'bg-gray-900' : 'bg-gray-100',
    text: darkMode ? 'text-gray-50' : 'text-gray-900',
    cardBg: darkMode ? 'bg-gray-800' : 'bg-white',
    highlight: 'text-orange-500',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    buttonBg: darkMode ? 'bg-gray-800' : 'bg-gray-200',
    buttonActive: 'bg-orange-500 text-white',
    buttonHover: darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300',
    modalBg: darkMode ? 'bg-gray-800' : 'bg-white',
  };

  return (
    <div className={`${theme.bg} py-20 transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <h2 className={`${theme.text} text-4xl md:text-5xl font-bold mb-4 text-center`}>
          {content[language].title}
        </h2>

        {/* Dekorative Linie unter dem Titel */}
        <div className="flex justify-center mb-12">
          <div className="w-20 h-1 bg-orange-500"></div>
        </div>

        {/* Filter-Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            className={`py-2 px-6 rounded-full transition-all transform hover:scale-105 ${selectedCategory === 'all'
              ? theme.buttonActive
              : `${theme.buttonBg} ${theme.text} ${theme.buttonHover}`
              }`}
            onClick={() => {
              playClickSound();
              setSelectedCategory('all');
            }}
          >
            {content[language].filterAll}
          </button>
          <button
            className={`py-2 px-6 rounded-full transition-all transform hover:scale-105 ${selectedCategory === 'software'
              ? theme.buttonActive
              : `${theme.buttonBg} ${theme.text} ${theme.buttonHover}`
              }`}
            onClick={() => {
              playClickSound();
              setSelectedCategory('software');
            }}
          >
            {content[language].filterSoftware}
          </button>
          <button
            className={`py-2 px-6 rounded-full transition-all transform hover:scale-105 ${selectedCategory === 'hardware'
              ? theme.buttonActive
              : `${theme.buttonBg} ${theme.text} ${theme.buttonHover}`
              }`}
            onClick={() => {
              playClickSound();
              setSelectedCategory('hardware');
            }}
          >
            {content[language].filterHardware}
          </button>
          <button
            className={`py-2 px-6 rounded-full transition-all transform hover:scale-105 ${selectedCategory === 'design'
              ? theme.buttonActive
              : `${theme.buttonBg} ${theme.text} ${theme.buttonHover}`
              }`}
            onClick={() => {
              playClickSound();
              setSelectedCategory('design');
            }}
          >
            {content[language].filterDesign}
          </button>
        </div>

        {/* Hauptprojekte */}
        {mainProjects.length > 0 && (
          <div className="mb-16">
            <h3 className={`${theme.text} text-2xl font-bold mb-6 relative`}>
              {content[language].mainProjects}
              <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-orange-500 mt-2 -mb-3"></span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {mainProjects.map(project => (
                <div
                  key={project.id}
                  className={`${theme.cardBg} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:translate-y-[-10px] cursor-pointer border ${theme.border} group`}
                  onClick={() => openProjectDetails(project)}
                >
                  <div className="h-48 bg-gray-300 overflow-hidden relative">
                    <img
                      src={project.images[0] || "/assets/images/placeholder.jpg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Jahr-Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-orange-500 text-white text-sm font-medium">
                      {project.year}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className={`${theme.text} text-xl font-bold mb-2`}>{project.title}</h4>
                    <p className={`${theme.text} opacity-80 mb-4 text-sm`}>{project.shortDesc}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className={`${theme.buttonBg} ${theme.text} text-xs py-1 px-2 rounded-full`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProjectDetails(project);
                      }}
                      className="text-orange-500 hover:text-orange-600 inline-flex items-center text-sm font-medium"
                    >
                      {content[language].viewProject}
                      <ExternalLink size={14} className="ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nebenprojekte mit Animation */}
        {secondaryProjects.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`${theme.text} text-2xl font-bold relative`}>
                {content[language].secondaryProjects}
                <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-orange-500 mt-2 -mb-3"></span>
              </h3>

              {/* Mehr/Weniger anzeigen Button */}
              <button
                onClick={toggleSecondaryProjects}
                className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors"
              >
                <span>{showSecondary ? content[language].showLess : content[language].showMore}</span>
                {showSecondary ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Container für sekundäre Projekte mit Animation */}
            <div
              ref={secondaryProjectsRef}
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500 ease-in-out overflow-hidden ${showSecondary ? 'opacity-100' : 'opacity-0 max-h-0'
                }`}
              style={{ maxHeight: showSecondary ? '2000px' : '0' }}
            >
              {secondaryProjects.map(project => (
                <div
                  key={project.id}
                  className={`${theme.cardBg} rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:translate-y-[-10px] cursor-pointer border ${theme.border} group`}
                  onClick={() => openProjectDetails(project)}
                >
                  <div className="h-40 bg-gray-300 overflow-hidden relative">
                    <img
                      src={project.images[0] || "/assets/images/placeholder.jpg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Jahr-Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-orange-500 text-white text-sm font-medium">
                      {project.year}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className={`${theme.text} text-lg font-bold mb-2`}>{project.title}</h4>
                    <p className={`${theme.text} opacity-80 text-sm mb-3`}>{project.shortDesc}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 2).map((tech, index) => (
                        <span
                          key={index}
                          className={`${theme.buttonBg} ${theme.text} text-xs py-1 px-2 rounded-full`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProjectDetails(project);
                      }}
                      className="text-orange-500 hover:text-orange-600 inline-flex items-center text-sm font-medium"
                    >
                      {content[language].viewProject}
                      <ExternalLink size={14} className="ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projekt-Detail-Modal */}
        <Modal
          isOpen={isModalOpen && selectedProject !== null}
          onClose={() => setIsModalOpen(false)}
        >
          {selectedProject && (
            <>
              <div className="h-64 md:h-80 bg-gray-300 overflow-hidden">
                <img
                  src={selectedProject.images[0] || "/assets/images/placeholder.jpg"}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`${theme.text} text-3xl font-bold`}>
                    {selectedProject.title}
                  </h3>
                  <span className={`text-orange-500 text-lg`}>
                    {selectedProject.year}
                  </span>
                </div>

                <p className={`${theme.text} text-lg mb-6`}>
                  {selectedProject.longDesc}
                </p>

                <div className="mb-6">
                  <h4 className={`${theme.text} text-lg font-semibold mb-2`}>
                    {content[language].technologies}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className={`${theme.buttonBg} ${theme.text} py-1 px-3 rounded-full`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </Modal>
      </div>

      {/* Animationen für Modals und Transitions */}
      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectGrid;