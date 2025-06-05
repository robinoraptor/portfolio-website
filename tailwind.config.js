/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Ermöglicht Dark Mode
  theme: {
    extend: {
      colors: {
        // Orange-Farbe (Hauptfarbe)
        'custom-orange': {
          500: '#ff5f00',
          600: '#e55500',
        },
        // Erweiterte Grautöne
        'gray': {
          50: '#f8f9fa',   // Sehr hell
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',  // Mittleres Grau
          600: '#868e96',
          700: '#495057',  // Dunkleres Grau
          800: '#343a40',
          900: '#212529',  // Sehr dunkel
          950: '#121416',  // Fast schwarz
        },
      },
      fontFamily: {
        'mono': ['Space Mono', 'monospace'],
      },
      // Glasmorphismus-Effekte
      backdropBlur: {
        'xs': '2px',
      },
      // Animation Einstellungen
      transitionTimingFunction: {
        'smooth-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
}