import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        terra: {
          DEFAULT: "#6B4226",
          dark: "#3E2723",
          sand: "#E8D9C5",
          gold: "#C9A227",
        },
      },
    },
  },
  plugins: [],
};

export default config;
