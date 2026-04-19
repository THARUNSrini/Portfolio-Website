import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LenisProvider from "@/components/LenisProvider";
import { cn } from "@/utils/cn";

export const metadata: Metadata = {
    title: "Tharun Srinivasan Sudha | Immunology × Single-Cell Genomics × AI",
    description: "Decoding intestinal immunity through single-cell genomics · Master's thesis at University Hospital Freiburg — γδ T cell analysis & BTN/BTNL regulation. MSc Pharmaceutical & Industrial Biotechnology, building protein mutation prediction pipelines with ESM-3 + AlphaFold at Leibniz Institute.",
    keywords: [
        "Tharun Srinivasan Sudha",
        "γδ T cells",
        "scRNA-seq",
        "Single-Cell RNA Sequencing",
        "TCR Profiling",
        "BTN/BTNL",
        "Intestinal Immunology",
        "IBD",
        "Crohn's Disease",
        "University Hospital Freiburg",
        "Organoid Culture",
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
        "Leibniz Institute"
    ],
    authors: [{ name: "Tharun Srinivasan Sudha" }],
    creator: "Tharun Srinivasan Sudha",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://tharun-portfolio.vercel.app",
        siteName: "Tharun Srinivasan Sudha Portfolio",
        title: "Tharun Srinivasan Sudha | Immunology × scRNA-seq × AI",
        description: "Decoding intestinal immunity through single-cell genomics · One cell at a time.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Tharun Srinivasan Sudha - Immunology × scRNA-seq × AI Researcher"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Tharun Srinivasan Sudha | Immunology × scRNA-seq × AI",
        description: "Decoding intestinal immunity through single-cell genomics · One cell at a time.",
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
            <head>
                <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />
            </head>
            <body className={cn(
                "font-body min-h-screen text-white antialiased"
            )}>
                <LenisProvider>
                    <Navbar />
                    {children}
                </LenisProvider>
            </body>
        </html>
    );
}
