const path = require("path");
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit", "serif"],
      },
    },
  },
  content: [
    // Your default paths
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    // Add markdown files
    path.join(__dirname, "./content/**/*.md"),
  ],
  plugins: [require("@tailwindcss/typography")],
};
