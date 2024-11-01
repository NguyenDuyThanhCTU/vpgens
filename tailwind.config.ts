import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        p: "240px",
        d: "1024px",
        lg: "1650px",
      },
      fontFamily: {
        LexendDeca: ["Lexend Deca", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"],
        Oswald: ["Oswald", "sans-serif"],
      },

      colors: {
        main: "#008001",
        mainRed: "#e2231b",
        mainOrange: "#ff5d22",
        mainBG: "#f0f1f2",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
