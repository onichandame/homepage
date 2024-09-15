import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: { primary: "#333333" },
      backgroundColor: {
        primary: "#FFFFFF",
        secondary: "#eadcf2",
        tertiary: "#f0fcff",
        button: "#007bff",
        "button-hover": "#0069d9",
      },
      transitionProperty: {
        "width": "width",
        "height": "height",
      },
      padding: { page: defaultTheme.spacing["8"] },
    },
  },
  plugins: [],
};
export default config;
