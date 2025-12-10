/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9", // Sky Blue
        secondary: "#6366f1", // Indigo
        dark: "#0f172a", // Slate 900
        light: "#f8fafc", // Slate 50
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}