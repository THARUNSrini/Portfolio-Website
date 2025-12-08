import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LenisProvider from "@/components/LenisProvider";
import { cn } from "@/utils/cn";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap"
});

export const metadata: Metadata = {
    title: "Tharun Srinivasan Sudha | Biotech Enthusiast × AI Freak",
    description: "Where molecules meet machine learning · Engineering life, one algorithm at a time. MSc Pharmaceutical & Industrial Biotechnology at Martin Luther University, building protein mutation prediction pipelines with ESM-3 + AlphaFold at Leibniz Institute.",
    keywords: [
        "Tharun Srinivasan Sudha",
        "Protein AI",
        "CRISPR",
        "AlphaFold",
        "ESM-3",
        "Biotechnology",
        "Machine Learning",
        "Bioinformatics",
        "Computational Biology",
        "Pharmaceutical Biotechnology",
        "Martin Luther University",
        "Leibniz Institute",
        "Mutation Prediction",
        "Protein Engineering"
    ],
    authors: [{ name: "Tharun Srinivasan Sudha" }],
    creator: "Tharun Srinivasan Sudha",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://tharun-portfolio.vercel.app",
        siteName: "Tharun Srinivasan Sudha Portfolio",
        title: "Tharun Srinivasan Sudha | Protein AI × CRISPR Researcher",
        description: "Predicting how mutations rewire life · One amino acid at a time.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Tharun Srinivasan Sudha - Protein AI × CRISPR Researcher"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Tharun Srinivasan Sudha | Protein AI × CRISPR Researcher",
        description: "Predicting how mutations rewire life · One amino acid at a time.",
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: "/favicon.ico",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={cn(
                inter.variable,
                "font-sans min-h-screen bg-background text-white antialiased"
            )}>
                <LenisProvider>
                    <Navbar />
                    {children}
                </LenisProvider>
            </body>
        </html>
    );
}
