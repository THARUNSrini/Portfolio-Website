import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Cinematic Bioluminescent Lab palette
                background: "#0a0d0f",
                surface: "#0f1318",
                "surface-elevated": "#141920",

                // Primary — Bioluminescent Teal
                primary: "#00e5cc",
                "primary-light": "#33ebd6",
                "primary-dark": "#00b3a0",

                // Secondary — Electric Cyan
                secondary: "#00c8ff",
                "secondary-light": "#33d3ff",
                "secondary-dark": "#00a0cc",

                // Tertiary — Warm Amber (CTAs only)
                tertiary: "#FFB800",
                "tertiary-light": "#FFCC33",
                "tertiary-dark": "#CC9200",

                // Accent
                accent: "#F472B6",

                // Graph blue
                graphBlue: "#3B82F6",

                // Text
                "paper-cream": "#e8eaec",
                "paper-muted": "#8a9099",
                "paper-dim": "#4a5260",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-primary": "linear-gradient(135deg, #00f5d4 0%, #00c4a7 100%)",
                "gradient-secondary": "linear-gradient(135deg, #39ff14 0%, #2acc10 100%)",
                "gradient-accent": "linear-gradient(135deg, #00f5d4 0%, #39ff14 50%, #3B82F6 100%)",
                "gradient-warm": "linear-gradient(135deg, #FFB800 0%, #F472B6 100%)",
            },
            fontFamily: {
                display: ["'Instrument Serif'", 'Georgia', 'serif'],
                body: ["'Satoshi'", "'Inter'", 'sans-serif'],
                mono: ["'JetBrains Mono'", "'Fira Code'", 'monospace'],
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "glow": "glow-cyan 2s ease-in-out infinite alternate",
                "float": "float 6s ease-in-out infinite",
                "glow-cyan": "glow-cyan 2s ease-in-out infinite alternate",
                "glow-green": "glow-green 2s ease-in-out infinite alternate",
                "glow-amber": "glow-amber 2s ease-in-out infinite alternate",
                "dna-rotate": "dna-rotate 20s linear infinite",
                "scanner": "scanner-ring 6s linear infinite",
                "scanline": "scanline-sweep 1s ease-in-out",
                "hex-breathe": "hex-breathe 8s ease-in-out infinite",
                "shimmer": "shimmer 2s linear infinite",
                "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "fade-in": "fade-in 0.4s ease-out forwards",
                "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "slide-in-left": "slide-in-left 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            },
            keyframes: {
                "glow-cyan": {
                    "0%": { boxShadow: "0 0 5px rgba(0,245,212,0.5), 0 0 10px rgba(0,245,212,0.3)" },
                    "100%": { boxShadow: "0 0 25px rgba(0,245,212,0.8), 0 0 40px rgba(0,245,212,0.4)" },
                },
                "glow-green": {
                    "0%": { boxShadow: "0 0 5px rgba(57,255,20,0.5), 0 0 10px rgba(57,255,20,0.3)" },
                    "100%": { boxShadow: "0 0 25px rgba(57,255,20,0.8), 0 0 40px rgba(57,255,20,0.4)" },
                },
                "glow-amber": {
                    "0%": { boxShadow: "0 0 5px rgba(255,184,0,0.5), 0 0 10px rgba(255,184,0,0.3)" },
                    "100%": { boxShadow: "0 0 25px rgba(255,184,0,0.8), 0 0 40px rgba(255,184,0,0.4)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "dna-rotate": {
                    "0%": { transform: "rotateY(0deg)" },
                    "100%": { transform: "rotateY(360deg)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "scale-in": {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                "slide-in-left": {
                    "0%": { opacity: "0", transform: "translateX(-30px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                "slide-in-right": {
                    "0%": { opacity: "0", transform: "translateX(30px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
            borderRadius: {
                'glass': '12px',
            },
            boxShadow: {
                'glow-cyan': '0 0 30px rgba(0, 245, 212, 0.3)',
                'glow-cyan-sm': '0 0 15px rgba(0, 245, 212, 0.2)',
                'glow-green': '0 0 30px rgba(57, 255, 20, 0.3)',
                'glow-amber': '0 0 30px rgba(255, 184, 0, 0.3)',
                'elevated': '0 8px 32px rgba(0, 0, 0, 0.5)',
                'glass': '0 4px 30px rgba(0, 0, 0, 0.3)',
            },
        },
    },
    plugins: [],
};
export default config;
