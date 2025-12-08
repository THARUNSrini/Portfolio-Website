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
                // Deep medical navy - trust, authority, depth
                background: "#0a1128",
                // Electric biotech teal gradient
                primary: "#00e5ff",
                "primary-dark": "#00b8d4",
                // Living green gradient
                secondary: "#00ff9f",
                "secondary-dark": "#00c853",
                // Accent colors
                navy: {
                    50: "#e6e8ed",
                    100: "#c0c5d3",
                    200: "#969fb6",
                    300: "#6c7999",
                    400: "#4d5c83",
                    500: "#2e3f6e",
                    600: "#273766",
                    700: "#1f2d5b",
                    800: "#172351",
                    900: "#0a1128",
                },
                teal: {
                    300: "#4dd0e1",
                    400: "#26c6da",
                    500: "#00e5ff",
                    600: "#00b8d4",
                },
                biogreen: {
                    300: "#69f0ae",
                    400: "#00ff9f",
                    500: "#00e676",
                    600: "#00c853",
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-teal": "linear-gradient(135deg, #00e5ff 0%, #00b8d4 100%)",
                "gradient-green": "linear-gradient(135deg, #00ff9f 0%, #00c853 100%)",
                "gradient-bio": "linear-gradient(135deg, #00e5ff 0%, #00ff9f 50%, #00c853 100%)",
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "float": "float 6s ease-in-out infinite",
                "glow-teal": "glow-teal 2s ease-in-out infinite alternate",
                "glow-green": "glow-green 2s ease-in-out infinite alternate",
                "protein-fold": "protein-fold 8s ease-in-out infinite",
                "dna-rotate": "dna-rotate 20s linear infinite",
                "particle-float": "particle-float 4s ease-in-out infinite",
                "typewriter": "typewriter 2s steps(40, end)",
                "blink": "blink 0.75s step-end infinite",
            },
            keyframes: {
                glow: {
                    "0%": { boxShadow: "0 0 5px rgba(0, 229, 255, 0.5), 0 0 10px rgba(0, 229, 255, 0.3)" },
                    "100%": { boxShadow: "0 0 20px rgba(0, 229, 255, 0.8), 0 0 30px rgba(0, 229, 255, 0.5)" },
                },
                "glow-teal": {
                    "0%": { boxShadow: "0 0 5px rgba(0, 229, 255, 0.5), 0 0 10px rgba(0, 229, 255, 0.3)" },
                    "100%": { boxShadow: "0 0 25px rgba(0, 229, 255, 0.9), 0 0 40px rgba(0, 229, 255, 0.6)" },
                },
                "glow-green": {
                    "0%": { boxShadow: "0 0 5px rgba(0, 255, 159, 0.5), 0 0 10px rgba(0, 255, 159, 0.3)" },
                    "100%": { boxShadow: "0 0 25px rgba(0, 255, 159, 0.9), 0 0 40px rgba(0, 255, 159, 0.6)" },
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
                    "50%": { borderColor: "#00e5ff" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};
export default config;
