/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', "sans-serif"],
      },
      fontWeight: {
        light: "300",
        semibold: "600",
        extrabold: "800",
      },
      boxShadow: {
        even: "0 0 10px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
