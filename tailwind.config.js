/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        yellow: "var(--color-yellow)",
      },

      screens: {
        xxsm: "320px",
        xsm: "460px",
      },
      backgroundColor: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
      },

      boxShadow: {
        "custom-shadow": "0 10px 20px rgba(0, 0, 0, 0.5)",
      },

      fontFamily: {
        doto: ["Doto"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
