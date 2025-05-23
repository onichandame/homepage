import type { Config } from "tailwindcss";
import typo from '@tailwindcss/typography'

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      }, textColor: { primary: "#333333" },
      backgroundColor: {
        primary: "#FFFFFF",
        secondary: "#eadcf2",
        tertiary: "#f0fcff",
        button: "#007bff",
        "button-hover": "#0069d9",
      },

    },
  },
  plugins: [
    typo
  ],
} satisfies Config;
