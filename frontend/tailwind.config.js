/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#005a8d",
        secondary: "#7dd3fc",
        accent: "#00bfa5",

        "light-text": "#333333",
        "light-text-hover": "#666666",

        "dark-background": "#121212",
        "dark-text": "#FFFFFF",
        "dark-text-hover": "#cccccc",

        "header-footer-text": "#FFFFFF",
        "header-footer-text-hover": "#CCCCCC",
      },
    },
  },
  plugins: [],
};
