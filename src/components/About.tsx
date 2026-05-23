"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Target, Zap, FlaskConical, Microscope } from "lucide-react";
import { AboutDecorations } from "@/components/SectionDecorations";

// Highlight Card with Frosted Glass
function HighlightCard({
    icon: Icon,
    title,
    description,
    delay = 0,
    accent = "cyan"
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    delay?: number;
    accent?: "cyan" | "green";
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }} // Kept translateY on section entry, but NOT on scroll progress
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group glass-panel-glow p-6 h-full cursor-default"
        >
            <div className="flex items-start gap-4 relative z-10">
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg border flex-shrink-0 transition-colors ${
                    accent === "cyan" 
                        ? "bg-primary/5 border-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,245,212,0.2)]" 
                        : "bg-secondary/5 border-secondary/20 group-hover:border-secondary/50 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]"
                }`}>
                    <Icon className={`w-6 h-6 transition-colors ${
                        accent === "cyan" ? "text-primary" : "text-secondary"
                    }`} />
                </div>
                <div>
                    <h4 className="font-display text-xl font-medium text-white mb-2 tracking-wide">
                        {title}
                    </h4>
                    <p className="text-paper-muted text-sm font-body leading-relaxed group-hover:text-white transition-colors duration-300">
                        {description}
                    </p>
                </div>
            </div>
            
            {/* Scanline Sweep internal to the card */}
            <div className="scanline-overlay" />
        </motion.div>
    );
}

// Cinematic Clip-Path Text Reveal
function CinematicText({ text }: { text: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="font-body text-lg md:text-xl text-paper-cream leading-relaxed font-light">
           <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
                {text}
            </motion.div>
        </div>
    );
}

export default function About() {
    const contentRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(contentRef, { once: true, margin: "-100px" });

    return (
        <SectionWrapper
            id="about"
            title="About Me"
            subtitle="Where single-cell genomics meets computational immunology"
        >
            <AboutDecorations />
            <div ref={contentRef} className="relative z-10 w-full max-w-5xl mx-auto">
                {/* Main content glass panel */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative glass-panel-strong p-8 md:p-12 mb-8 overflow-hidden"
                >
                    {/* Background SVG Grid Pattern inside the panel */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l20 10v20L20 40 0 30V10z' fill-rule='evenodd' stroke='%2300e5cc' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px'
                    }} />

                    {/* Animated Microscope SVG (Draw SVG simulation) */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 0.05 } : {}}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="absolute -right-10 -bottom-10 pointer-events-none"
                    >
                         <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#00e5cc" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                            <motion.path 
                                initial={{ pathLength: 0 }}
                                animate={isInView ? { pathLength: 1 } : {}}
                                transition={{ duration: 3, ease: "easeInOut" }}
                                d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1M9 14h2M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" 
                            />
                        </svg>
                    </motion.div>

                    {/* Summary text with cinematic reveal */}
                    <div className="relative z-10">
                        <CinematicText text={portfolioData.summary} />
                    </div>

                    {/* Scientific line divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="my-10 h-[1px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 origin-center"
                    />

                    {/* Highlight cards grid */}
                    <div className="grid md:grid-cols-2 gap-6 relative z-10">
                        <HighlightCard
                            icon={Microscope}
                            title="Current Focus"
                            description={portfolioData.highlights.currentFocus}
                            accent="cyan"
                            delay={0.4}
                        />
                        <HighlightCard
                            icon={Target}
                            title="My Mission"
                            description={portfolioData.highlights.mission}
                            accent="green"
                            delay={0.6}
                        />
                    </div>
                </motion.div>

                {/* Bottom tagline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 px-4"
                >
                    <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5">
                        <FlaskConical className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-mono text-xs text-paper-muted uppercase tracking-widest text-center sm:text-left">
                        Bridging intestinal immunology with AI-driven discovery
                    </span>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
