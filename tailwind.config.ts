import type { Config } from "tailwindcss";

/**
 * Wearflora design tokens.
 * Existing class names (bg-bg, text-text, bg-brand-500, text-solar-500 ...) are kept so every
 * page and the admin area inherit the new look; only the values behind them changed.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        // Pink / berry scale. 400 = primary pink, 700 = deep berry.
        brand: {
          50: "#FFF6F8",
          100: "#F8DDE2", // blush
          200: "#EFB7C3", // rose
          300: "#E08CA1",
          400: "#C65D79", // primary pink
          500: "#B04A68",
          600: "#9A3558",
          700: "#7D1838", // deep berry
          800: "#651330",
          900: "#4D0F26",
          950: "#340A19",
        },
        // Gold accent (kept under the old "solar" key so existing classes keep working).
        solar: {
          400: "#DDBE8E",
          500: "#C9A46A",
          600: "#A8854D",
        },
        ivory: "#FFF9F6",
        blush: "#F8DDE2",
        rose: "#EFB7C3",
        berry: "#7D1838",
        gold: "#C9A46A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 10px 28px -12px rgb(var(--glow) / 0.55)",
        "glow-lg": "0 18px 44px -16px rgb(var(--glow) / 0.6)",
        card: "0 1px 2px rgb(125 24 56 / 0.05), 0 10px 28px -14px rgb(125 24 56 / 0.18)",
      },
      keyframes: {
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "80%,100%": { transform: "scale(1.6)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "hero-in": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 14s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.2,0.6,0.4,1) infinite",
        shimmer: "shimmer 2.2s linear infinite",
        "hero-in": "hero-in 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
