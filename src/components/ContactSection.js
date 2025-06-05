import React, { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';

const ContactSection = () => {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  // Übersetzungen
  const content = {
    de: {
      title: "Kontakt",
      subtitle: "Lass uns zusammenarbeiten",
      namePlaceholder: "Dein Name",
      emailPlaceholder: "Deine E-Mail",
      subjectPlaceholder: "Betreff",
      messagePlaceholder: "Deine Nachricht...",
      submitButton: "Nachricht senden",
      successMessage: "Vielen Dank! Deine Nachricht wurde erfolgreich gesendet.",
      errorMessage: "Entschuldigung, es gab einen Fehler. Bitte versuche es später noch einmal."
    },
    en: {
      title: "Contact",
      subtitle: "Let's work together",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      subjectPlaceholder: "Subject",
      messagePlaceholder: "Your Message...",
      submitButton: "Send Message",
      successMessage: "Thank you! Your message has been successfully sent.",
      errorMessage: "Sorry, there was an error. Please try again later."
    }
  };

  // Retro Klick-Sound abspielen
  const playClickSound = () => {
    const audio = new Audio('/assets/sounds/retro-click.mp3');
    audio.volume = 0.2;
    audio.play();
  };

  // Form Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    playClickSound();

    // Hier würde normalerweise der API-Call zum Senden der Email stattfinden
    // Simuliere erfolgreichen Submit für Demo-Zwecke
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: content[language].successMessage
      });

      // Form zurücksetzen
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Status nach einigen Sekunden zurücksetzen
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }, 1000);
  };

  return (
    <section className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} py-20`} id="contact">
      <div className="container mx-auto px-6 text-center">
        <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} text-center`}>
          {content[language].title}
        </h2>

        <div className="w-20 h-1 bg-orange-500 mb-12 mx-auto"></div>

        <p className={`text-xl max-w-xl mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-700'} mx-auto`}>
          {content[language].subtitle}
        </p>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={content[language].namePlaceholder}
                  className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={content[language].emailPlaceholder}
                  className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="mb-6">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={content[language].subjectPlaceholder}
                className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="mb-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={content[language].messagePlaceholder}
                rows="5"
                className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500 transition-colors resize-vertical"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all transform hover:translate-y-[-3px] hover:shadow-lg"
              >
                {content[language].submitButton}
              </button>
            </div>

            {formStatus.submitted && (
              <div className={`mt-6 p-4 rounded-md ${formStatus.success
                  ? 'bg-green-100 border border-green-200 text-green-800'
                  : 'bg-red-100 border border-red-200 text-red-800'
                }`}>
                {formStatus.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;