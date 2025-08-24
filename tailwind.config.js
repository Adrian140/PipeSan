/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#8AB6FF',
          DEFAULT: '#3B82F6',
          dark: '#1D4ED8',
        },
        accent: {
          light: '#FDE68A',
          DEFAULT: '#F59E0B',
          dark: '#B45309',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '2rem',
      }
    },
  },
  plugins: [],
}