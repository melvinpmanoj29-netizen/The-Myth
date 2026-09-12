import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070A",
        charcoal: {
          950: "#05070A",
          900: "#0B0B0D",
          850: "#111318",
          800: "#171A1F",
          700: "#22262E",
          600: "#2D323D",
          500: "#3E4554",
        },
        myth: {
          red: "#C1121F",
          "red-bright": "#FF1F2D",
          "red-crimson": "#E50920",
          "red-dark": "#780A12",
          cyan: "#00D9FF",
          "cyan-bright": "#00E5FF",
          "cyan-glow": "#36F5FF",
          "cyan-dark": "#00838F",
        },
        primary: {
          DEFAULT: "#C1121F",
          foreground: "#F2F2F2",
        },
        text: {
          primary: "#F2F2F2",
          muted: "#96969E",
          subtle: "#62626B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "hair-glow": "hairGlow 3s ease-in-out infinite alternate",
        "red-surge": "redSurge 2.5s ease-in-out infinite",
        "scan-line": "scanline 8s linear infinite",
        "float": "floating 6s ease-in-out infinite",
      },
      keyframes: {
        hairGlow: {
          "0%": { filter: "drop-shadow(0 0 15px rgba(0, 229, 255, 0.35)) drop-shadow(0 0 40px rgba(0, 229, 255, 0.15))" },
          "100%": { filter: "drop-shadow(0 0 30px rgba(54, 245, 255, 0.6)) drop-shadow(0 0 70px rgba(0, 229, 255, 0.3))" },
        },
        redSurge: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(193, 18, 31, 0.25)" },
          "50%": { boxShadow: "0 0 45px rgba(255, 38, 53, 0.55)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        floating: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "myth-grid": "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
