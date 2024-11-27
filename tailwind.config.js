/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        main: "var(--color-main)",
        light_1: '#fafafa',
        dark_0: "#0d0f18",
        dark_1: "#0d0e0f",
        dark_2: "#111621",
        dark_3: "#181c2e",
        dark_4: "#1f2439",
        dark_5: "#87909f",
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ["dark"],
    },
  },
  plugins: [],
};
