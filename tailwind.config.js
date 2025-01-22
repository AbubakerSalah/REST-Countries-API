/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        semibold: '600',
        extrabold: '800',
      }
    },
  },
  plugins: [],
}

