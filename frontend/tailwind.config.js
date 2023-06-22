/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#20BDFF",
        secondary: "#5433FF",
        accent: "#A5FECB",

        "light-text": "#333333",
        "light-text-hover": "#666666",

        "dark-background": "#333",
        "dark-text": "#FFFFFF",
        "dark-text-hover": "#cccccc",

        "header-footer-text": "#FFFFFF",
        "header-footer-text-hover": "#CCCCCC",
      },
    },
  },
  plugins: [],
};
