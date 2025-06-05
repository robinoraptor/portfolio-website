import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children, className = '' }) => {
  const modalRef = useRef(null);

  // Body Scroll verhindern, wenn Modal geöffnet ist
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }

    // Cleanup beim Unmount
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  // Beim ESC-Taste drücken schließen
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Klick auf Backdrop (außerhalb des Modals) schließt Modal
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 dark:bg-black/80 backdrop-blur-md transition-all duration-300"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-h-[90vh] overflow-auto relative w-full max-w-4xl transform transition-all duration-300 ${className}`}
        style={{ animation: 'modalFadeIn 0.3s ease-out forwards' }}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 hover:bg-orange-500 dark:hover:bg-orange-500 text-gray-800 dark:text-gray-200 hover:text-white dark:hover:text-white transition-colors z-10"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {children}
      </div>

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

export default Modal;