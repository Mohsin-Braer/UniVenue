/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a" }
      },

      animationDelay: {
        100: "100ms",
        200: "200ms",
        300: "300ms",
        400: "400ms",
        500: "500ms",
        600: "600ms",
        700: "700ms",
        800: "800ms",
        900: "900ms",
        1000: "1000ms",
      },

      animation: {
        fadeOne: 'fade-in-down 2.5s ease-out',
        fadeTwo: 'fade-in-down 3s ease-out',
        hbounce: 'horizontal-bounce 1.5s infinite',
      },

      //actual animation
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
              opacity: '1',
              transform: 'translateY(0)'
          },
        },
        'horizontal-bounce': {
          '0%, 100%': {
            transform: 'translateX(-15%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        }
      },
    },
  },
  variants: {
    extend: {},
 },
  plugins: [
    require("tailwindcss-animation-delay"),
  ],
 

}

