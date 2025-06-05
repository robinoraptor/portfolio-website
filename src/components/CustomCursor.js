import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * Benutzerdefinierte Cursor-Komponente mit PNG-Bildern
 * Unterstützt verschiedene Cursor-Zustände: normal, hover, click, text
 */
const CustomCursor = () => {
  const { darkMode } = useContext(ThemeContext);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [cursorLoaded, setCursorLoaded] = useState(false);
  const [isTextCursor, setIsTextCursor] = useState(false);

  // Benutzerdefinierte Cursor-Bilder
  const cursors = {
    light: {
      default: '/assets/cursors/cursor-light.png',
      hover: '/assets/cursors/cursor-hover-light.png',
      click: '/assets/cursors/cursor-click-light.png',
      text: '/assets/cursors/cursor-text-light.png'
    },
    dark: {
      default: '/assets/cursors/cursor-dark.png',
      hover: '/assets/cursors/cursor-hover-dark.png',
      click: '/assets/cursors/cursor-click-dark.png',
      text: '/assets/cursors/cursor-text-dark.png'
    }
  };

  // Aktuellen Cursor basierend auf Zustand auswählen
  const getCurrentCursor = () => {
    const mode = darkMode ? 'dark' : 'light';

    if (isTextCursor) return cursors[mode].text;
    if (isClicking) return cursors[mode].click;
    if (isHovering) return cursors[mode].hover;
    return cursors[mode].default;
  };

  // Prüfen, ob die Cursor-Bilder geladen werden können
  useEffect(() => {
    const preloadImages = () => {
      const mode = darkMode ? 'dark' : 'light';
      const images = [
        cursors[mode].default,
        cursors[mode].hover,
        cursors[mode].click,
        cursors[mode].text
      ];

      const promises = images.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      // Wenn alle Bilder geladen wurden oder ein Fehler auftritt,
      // setze einen Fallback-Cursor
      Promise.all(promises)
        .then(() => setCursorLoaded(true))
        .catch(() => {
          console.warn('Konnte benutzerdefinierte Cursor-Bilder nicht laden, verwende Fallback');
          setCursorLoaded(false);
        });
    };

    preloadImages();
  }, [darkMode]);

  useEffect(() => {
    // Standardcursor im Dokument ausblenden
    document.body.style.cursor = 'none';

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Event Listener für interaktive Elemente
    const addHoverListeners = () => {
      // Interaktive Elemente (Links, Buttons, etc.)
      const interactiveElements = document.querySelectorAll('a, button, select, .interactive');
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setIsTextCursor(false);
        });
        element.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setIsTextCursor(false);
        });
      });

      // Texteingabe-Elemente (Inputs, Textareas)
      const textElements = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="search"], textarea');
      textElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          setIsTextCursor(true);
          setIsHovering(false);
        });
        element.addEventListener('mouseleave', () => {
          setIsTextCursor(false);
          setIsHovering(false);
        });
      });
    };

    // Event Listener hinzufügen
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Interaktive Elemente erkennen und Listener hinzufügen
    addHoverListeners();

    // MutationObserver für dynamisch hinzugefügte Elemente
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup-Funktion
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = 'auto';
      observer.disconnect();
    };
  }, []);

  // Wenn die Cursor-Bilder nicht geladen werden konnten,
  // verwende einen einfachen CSS-Cursor
  if (!cursorLoaded) {
    return (
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-100 will-change-transform"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0
        }}
      >
        <div
          className={`w-6 h-6 rounded-full ${isHovering ? 'scale-150' : ''} ${isClicking ? 'scale-75' : ''} ${isTextCursor ? 'w-1 h-5' : ''} transition-all duration-150`}
          style={{
            backgroundColor: darkMode ? '#ff5f00' : '#ff5f00',
            opacity: isHovering ? 0.7 : 0.5,
            mixBlendMode: 'difference'
          }}
        />
      </div>
    );
  }

  // Standard-Cursor mit PNG-Bildern
  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-100 will-change-transform"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0
      }}
    >
      <img
        src={getCurrentCursor()}
        alt=""
        className={`select-none ${isTextCursor ? 'w-4 h-5' : 'w-10 h-10'}`}
        style={{
          transform: isClicking ? 'scale(0.9)' : 'scale(1)',
          transition: 'transform 0.1s ease-out'
        }}
        onError={(e) => {
          console.warn('Fehler beim Laden des Cursor-Bildes, verwende Fallback');
          setCursorLoaded(false);
        }}
      />
    </div>
  );
};

export default CustomCursor;