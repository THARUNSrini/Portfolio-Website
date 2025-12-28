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
                // NEW: "Lab Precision" palette - sophisticated & distinctive
                background: "#0D0D0D",      // Deep obsidian ink
                surface: "#161616",          // Elevated surface
                "surface-elevated": "#1F1F1F", // Cards and modals

                // Primary accent - Acid Amber (chemical indicator inspired)
                primary: "#FFB800",
                "primary-light": "#FFCC33",
                "primary-dark": "#CC9200",

                // Secondary - Specimen Green (vivid chlorophyll)
                secondary: "#22C55E",
                "secondary-light": "#4ADE80",
                "secondary-dark": "#16A34A",

                // Tertiary - Reagent Rose (unexpected accent)
                tertiary: "#F472B6",
                "tertiary-light": "#F9A8D4",
                "tertiary-dark": "#DB2777",

                // Utility - Graph Blue (data visualization)
                graphBlue: "#3B82F6",

                // Text colors
                "paper-cream": "#F5F2EB",
                "paper-muted": "#A8A29E",

                // Legacy support (mapped to new palette)
                navy: {
                    50: "#fafafa",
                    100: "#f5f5f5",
                    200: "#e5e5e5",
                    300: "#d4d4d4",
                    400: "#a3a3a3",
                    500: "#737373",
                    600: "#525252",
                    700: "#404040",
                    800: "#262626",
                    900: "#171717",
                },
                teal: {
                    300: "#FFCC33",
                    400: "#FFB800",
                    500: "#F59E0B",
                    600: "#D97706",
                },
                biogreen: {
                    300: "#4ADE80",
                    400: "#22C55E",
                    500: "#16A34A",
                    600: "#15803D",
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-primary": "linear-gradient(135deg, #FFB800 0%, #F59E0B 100%)",
                "gradient-secondary": "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
                "gradient-accent": "linear-gradient(135deg, #FFB800 0%, #22C55E 50%, #3B82F6 100%)",
                "gradient-warm": "linear-gradient(135deg, #FFB800 0%, #F472B6 100%)",
                // Paper texture gradient
                "paper-gradient": "linear-gradient(180deg, rgba(245,242,235,0.02) 0%, rgba(13,13,13,0) 100%)",
            },
            fontFamily: {
                display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
                body: ['var(--font-body)', 'Outfit', 'system-ui', 'sans-serif'],
                mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "float": "float 6s ease-in-out infinite",
                "glow-amber": "glow-amber 2s ease-in-out infinite alternate",
                "glow-green": "glow-green 2s ease-in-out infinite alternate",
                "protein-fold": "protein-fold 8s ease-in-out infinite",
                "dna-rotate": "dna-rotate 20s linear infinite",
                "particle-float": "particle-float 4s ease-in-out infinite",
                "typewriter": "typewriter 2s steps(40, end)",
                "blink": "blink 0.75s step-end infinite",
                "shimmer": "shimmer 2s linear infinite",
                "fade-up": "fade-up 0.6s ease-out forwards",
                "fade-in": "fade-in 0.4s ease-out forwards",
                "scale-in": "scale-in 0.5s ease-out forwards",
                "slide-in-left": "slide-in-left 0.5s ease-out forwards",
                "slide-in-right": "slide-in-right 0.5s ease-out forwards",
            },
            keyframes: {
                glow: {
                    "0%": { boxShadow: "0 0 5px rgba(255, 184, 0, 0.5), 0 0 10px rgba(255, 184, 0, 0.3)" },
                    "100%": { boxShadow: "0 0 20px rgba(255, 184, 0, 0.8), 0 0 30px rgba(255, 184, 0, 0.5)" },
                },
                "glow-amber": {
                    "0%": { boxShadow: "0 0 5px rgba(255, 184, 0, 0.5), 0 0 10px rgba(255, 184, 0, 0.3)" },
                    "100%": { boxShadow: "0 0 25px rgba(255, 184, 0, 0.9), 0 0 40px rgba(255, 184, 0, 0.6)" },
                },
                "glow-green": {
                    "0%": { boxShadow: "0 0 5px rgba(34, 197, 94, 0.5), 0 0 10px rgba(34, 197, 94, 0.3)" },
                    "100%": { boxShadow: "0 0 25px rgba(34, 197, 94, 0.9), 0 0 40px rgba(34, 197, 94, 0.6)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "protein-fold": {
                    "0%, 100%": { transform: "rotateY(0deg) rotateX(0deg)" },
                    "25%": { transform: "rotateY(90deg) rotateX(10deg)" },
                    "50%": { transform: "rotateY(180deg) rotateX(0deg)" },
                    "75%": { transform: "rotateY(270deg) rotateX(-10deg)" },
                },
                "dna-rotate": {
                    "0%": { transform: "rotateY(0deg)" },
                    "100%": { transform: "rotateY(360deg)" },
                },
                "particle-float": {
                    "0%, 100%": { transform: "translateY(0) translateX(0)", opacity: "1" },
                    "50%": { transform: "translateY(-30px) translateX(10px)", opacity: "0.7" },
                },
                typewriter: {
                    "from": { width: "0" },
                    "to": { width: "100%" },
                },
                blink: {
                    "from, to": { borderColor: "transparent" },
                    "50%": { borderColor: "#FFB800" },
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
                'brutal': '2px',
            },
            boxShadow: {
                'brutal': '4px 4px 0px 0px rgba(255, 184, 0, 1)',
                'brutal-sm': '2px 2px 0px 0px rgba(255, 184, 0, 1)',
                'brutal-green': '4px 4px 0px 0px rgba(34, 197, 94, 1)',
                'elevated': '0 8px 32px rgba(0, 0, 0, 0.4)',
                'glow-amber': '0 0 30px rgba(255, 184, 0, 0.3)',
                'glow-green': '0 0 30px rgba(34, 197, 94, 0.3)',
            },
        },
    },
    plugins: [],
};
export default config;
