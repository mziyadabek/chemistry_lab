/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a73e8',
          dark: '#1557b0',
          light: '#e8f0fe',
        },
        secondary: {
          DEFAULT: '#2d9e44',
          light: '#e6f4ea',
        },
        accent: '#ff6d00',
        surface: '#f7f8fc',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        drip: 'drip 1s ease-in infinite',
        rise: 'rise 2s ease-in infinite',
        flicker: 'flicker 0.1s ease-in-out infinite alternate',
      },
      keyframes: {
        drip: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(40px)', opacity: '0' },
        },
        rise: {
          '0%': { transform: 'translateY(0)', opacity: '0.8' },
          '100%': { transform: 'translateY(-80px)', opacity: '0' },
        },
        flicker: {
          '0%': { transform: 'scaleY(1) scaleX(1)' },
          '100%': { transform: 'scaleY(1.05) scaleX(0.97)' },
        },
      },
    },
  },
  plugins: [],
}
