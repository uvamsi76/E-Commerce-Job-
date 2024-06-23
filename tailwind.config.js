/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'flipkart':'#f0f2f5',
        'dark-color':'#1e293b',
        primary: {
          500: '#faf5cf',
          700: '#a37d54',
        },
        secondary: {
          500: '#e6ecf2',
        },
        grayscale: {
          200: '#e6e6e6',
          400: '#c4c4c4',
          700: '#2b2b2b',
          800: '#1a1a1a',
          900: '#000',
        },
      },
    },
  },
  plugins: [
    function({addUtilities}){
      const newUtilities={
        '.no-scrollbar::-webkit-scrollbar':{
          display:'none'
        },
        '.no-scrollbar':{
          '-ms-overflow-stryle':'none',
          'scrollbar-width':'none',
        }

      }
      addUtilities(newUtilities)
    }
  ],
};