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
                background: "#0a0e17",
                primary: "#00f7ff",
                secondary: "#ff00aa",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-neon": "linear-gradient(135deg, #00f7ff 0%, #ff00aa 100%)",
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "float": "float 6s ease-in-out infinite",
            },
            keyframes: {
                glow: {
                    "0%": { boxShadow: "0 0 5px rgba(0, 247, 255, 0.5), 0 0 10px rgba(0, 247, 255, 0.3)" },
                    "100%": { boxShadow: "0 0 20px rgba(0, 247, 255, 0.8), 0 0 30px rgba(0, 247, 255, 0.5)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
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

