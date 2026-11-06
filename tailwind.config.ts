import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d0716",
        panel: "#170d26",
        panelAlt: "#24113f",
        line: "#2d1b4a",
        brand: {
          DEFAULT: "#8b4dff",
          light: "#a97dff",
          deep: "#5b21b6",
          dim: "#3a1f63",
        },
        lavender: "#d9ccff",
        muted: "#9a8bb8",
        gold: "#f5b942",
        win: "#5ee19a",
        loss: "#ff6b7a",
      },
      fontFamily: {
        display: ["var(--font-rajdhani)", "Impact", "sans-serif"],
        body: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.22em",
        kicker: "0.3em",
      },
      maxWidth: {
        shell: "1180px",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(139,77,255,0.55)",
        "glow-lg": "0 0 120px -20px rgba(139,77,255,0.65)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.85)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "40%": { opacity: "0.85" },
          "42%": { opacity: "0.4" },
          "44%": { opacity: "0.9" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(400%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
        flicker: "flicker 5s linear infinite",
        scan: "scan 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
