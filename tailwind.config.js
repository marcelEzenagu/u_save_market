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
        'tabs-header-text': 'clamp(1rem, 5vw, 3rem)',
      },
      colors: {
        
        'body-color-gray' :'rgba(243, 242, 242, 0.363)',
        'regal-light-blue' : 'rgba(206, 214, 240, 1)',
        'regal-light-item-color' : 'rgba(206, 214, 240, 1)',
        'regal-secondary-light' :'rgba(225, 244, 250, 1)',
        'regal-sky-blue' : 'rgba(2, 152, 202, 1)',
        'regal-blue': 'rgba(33, 54, 127, 1)',
        'regal-gray-active': 'rgb(139 151 189)',
        'regal-black': 'rgba(0, 0, 0, 1)',
        'regal-border-bottom' : 'rgba(255, 255, 255, 1)',
        'active-gray' : 'rgba(232, 233, 237, 1)',
        'regal-dark' :'rgba(50, 55, 67, 1)',
        'regal-light-gray': 'rgba(104, 107, 117, 1)',
        'regal-wishlist-gray' : 'rgba(15, 15, 15, 0.3)',
        'regal-crum-gray': 'rgba(138, 140, 148, 1)',
        'grid-card-color-1' : 'rgba(255, 226, 211, 1)',
        'grid-card-color-2' : 'rgba(240, 245, 234, 1)',
        'grid-card-color-3' : 'rgba(216, 245, 244, 1)',
        'grid-card-color-4' : 'rgba(255, 245, 214, 1)',
        'grid-card-color-5' : 'rgba(255, 241, 227, 1)',
        'grid-card-color-6' : 'rgba(251, 226, 239, 1)',
        'regal-auth-bg-color': 'rgba(245, 247, 255, 1)',
        'regal-disable-red' :'rgba(254, 247, 246, 1)',
        'regal-paginate-color' : 'rgba(68, 70, 77, 1)',
        'regal-dashboard-active-tab-gray':'rgba(250, 250, 252, 1)',
        'regal-track-gray' : 'rgba(201, 203, 209, 1)',
        'regal-light-green' : 'rgba(5, 205, 153, 1)',
        'regal-price-dark' : 'rgba(66, 84, 102, 1)'


      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        bar1: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-50%)" },
        },
        bar2: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-75%)" },
        },
        bar3: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-50%)" },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        "bar-1": "bar1 1s ease-in-out infinite",
        "bar-2": "bar2 1s ease-in-out infinite",
        "bar-3": "bar3 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

