import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0b",
        surface: "#111113",
        glass: "rgba(255,255,255,0.04)",
        border: "rgba(255,255,255,0.08)",
        accent: "#e8e6e1",       // off-white / silver
        muted: "#8a8a92",
        indigo: {
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
        },
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      backdropBlur: { xs: "2px" },
      keyframes: {
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "bar-fill": {
          "0%": { width: "0%" },
          "100%": { width: "var(--bar-width)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "flip-in": {
          "0%": { transform: "rotateY(90deg)", opacity: "0" },
          "100%": { transform: "rotateY(0deg)", opacity: "1" },
        },
      },
      animation: {
        "cursor-blink": "cursor-blink 1s step-end infinite",
        "bar-fill": "bar-fill 1.2s ease-out forwards",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "spin-slow": "spin-slow 8s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
