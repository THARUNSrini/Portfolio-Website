import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/utils/cn";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap"
});

export const metadata: Metadata = {
    title: "Tharun Srinivasan Sudha | Biotech & AI Researcher",
    description: "Portfolio of Tharun Srinivasan Sudha - MSc Pharmaceutical & Industrial Biotechnology student at Martin Luther University Halle-Wittenberg. Bridging wet-lab biology with AI-driven protein engineering, CRISPR therapeutics, and machine learning in biotech.",
    keywords: [
        "Tharun Srinivasan Sudha",
        "Biotechnology",
        "CRISPR",
        "Protein AI",
        "Machine Learning",
        "Bioinformatics",
        "Computational Biology",
        "Pharmaceutical Biotechnology",
        "Martin Luther University",
        "Portfolio"
    ],
    authors: [{ name: "Tharun Srinivasan Sudha" }],
    creator: "Tharun Srinivasan Sudha",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://tharun-portfolio.vercel.app",
        siteName: "Tharun Srinivasan Sudha Portfolio",
        title: "Tharun Srinivasan Sudha | Biotech & AI Researcher",
        description: "Turning mutations into predictions, genes into therapies, and data into discoveries.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Tharun Srinivasan Sudha Portfolio"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Tharun Srinivasan Sudha | Biotech & AI Researcher",
        description: "MSc Pharmaceutical & Industrial Biotechnology | CRISPR & Protein AI Researcher",
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
                <Navbar />
                {children}
            </body>
        </html>
    );
}

