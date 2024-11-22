/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxsm: "320px",
        xsm: "460px",
      },
      backgroundColor: {
        primary: "#2a2a2a",
        secondary: "#ffc800",
      },

      boxShadow: {
        "custom-shadow": "0 10px 20px rgba(0, 0, 0, 0.5)",
      },

      fontFamily: {
        doto: ["Doto"],
      },
    },
  },
  plugins: [],
};
