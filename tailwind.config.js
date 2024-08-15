/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'responsive': 'clamp(1rem, 5vw, 2.3rem)',
      },
      colors: {
        'regal-light-blue' : 'rgba(206, 214, 240, 1)',
        'regal-light-item-color' : 'rgba(206, 214, 240, 1)',
        'regal-secondary-light' :'rgba(225, 244, 250, 1)',
        'regal-sky-blue' : 'rgba(2, 152, 202, 1)',
        'regal-blue': 'rgba(33, 54, 127, 1)',
        'regal-gray-active': 'rgb(139 151 189)',
        'regal-black': 'rgba(0, 0, 0, 1)',
        'regal-border-bottom' : 'rgba(255, 255, 255, 1)',
        'active-gray' : 'rgba(232, 233, 237, 1)',
        'regal-footer-gray': 'rgba(104, 107, 117, 1)',
        'regal-wishlist-gray' : 'rgba(15, 15, 15, 0.3)',
        'regal-crum-gray': 'rgba(138, 140, 148, 1)',
        'grid-card-color-1' : 'rgba(255, 226, 211, 1)',
        'grid-card-color-2' : 'rgba(240, 245, 234, 1)',
        'grid-card-color-3' : 'rgba(216, 245, 244, 1)',
        'grid-card-color-4' : 'rgba(255, 245, 214, 1)',
        'grid-card-color-5' : 'rgba(255, 241, 227, 1)',
        'grid-card-color-6' : 'rgba(251, 226, 239, 1)',
        'regal-auth-bg-color': 'rgba(245, 247, 255, 1)',

      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
      },
    },
  },
  plugins: [],
}

