import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand accent (nods to the Codobux orange) — used sparingly for emphasis.
        brand: {
          DEFAULT: "#f97316",
          dark: "#ea580c",
          light: "#fff7ed",
        },
      },
      fontFamily: {
        // Mapped to the CSS variables set in app/layout.tsx.
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
