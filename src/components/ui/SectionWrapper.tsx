"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import LabScene from "@/components/3d/LabScene";

interface SectionWrapperProps {
    id: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    index?: number; // Used for the ghost number (e.g., 01, 02)
}

export default function SectionWrapper({ id, title, subtitle, children, className = "", index }: SectionWrapperProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(headerRef, { once: true, margin: "-100px" });

    // Scroll-driven parallax for background elements
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacityFade = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Format index as 01, 02, etc.
    const getGhostNumber = () => {
        if (index === undefined) {
            // Map common section IDs to numbers if not explicitly provided
            const sectionMap: Record<string, string> = {
                'about': '01',
                'education': '02',
                'experience': '03',
                'projects': '04',
                'publications': '05',
                'skills': '06',
                'personal': '07',
                'contact': '08'
            };
            return sectionMap[id] || '00';
        }
        return index < 10 ? `0${index}` : `${index}`;
    };

    return (
        <section
            ref={sectionRef}
            id={id}
            className={`relative py-24 md:py-32 overflow-hidden ${className}`}
        >
            {/* Ambient Background Glow */}
            <motion.div
                style={{ y: yParallax, opacity: opacityFade }}
                className="absolute top-0 right-0 w-full h-full pointer-events-none z-0 overflow-hidden"
            >
                <div className="absolute top-1/2 right-[-20%] w-[60%] h-[80%] bg-primary/3 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[60%] bg-secondary/3 rounded-full blur-[100px]" />
            </motion.div>

            {/* Cinematic 3D Lab Equipment Scene Wrapper */}
            <LabScene variant={id as any} className="z-0 opacity-30 mix-blend-screen" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                {/* Cinematic Header Engine */}
                <div ref={headerRef} className="relative mb-20">
                    {/* Ghost Numbering */}
                    <div className="absolute -top-16 -left-4 md:-top-24 md:-left-8 pointer-events-none select-none overflow-hidden">
                        <motion.span
                            initial={{ y: 100, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 0.05 } : {}}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display font-bold text-[8rem] md:text-[14rem] text-primary leading-none tracking-tighter"
                        >
                            {getGhostNumber()}
                        </motion.span>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        {/* Title area */}
                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="flex items-center gap-4 mb-4"
                            >
                                <div className="h-px bg-primary/40 w-12 md:w-24" />
                                <span className="label-mono">
                                    SECTION {getGhostNumber()}
                                </span>
                            </motion.div>

                            <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-white mb-2 overflow-hidden">
                                {title.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="inline-block"
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </motion.span>
                                ))}
                            </h2>

                            {subtitle && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="font-body text-paper-muted text-lg md:text-xl max-w-2xl"
                                >
                                    {subtitle}
                                </motion.p>
                            )}
                        </div>

                        {/* Molecular structural decoration */}
                        <div className="hidden lg:flex items-center gap-2 opacity-30 pointer-events-none">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : {}}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="w-2 h-2 rounded-full border border-primary"
                            />
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.6, duration: 0.4 }}
                                className="w-16 h-px bg-primary/50 origin-left"
                            />
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : {}}
                                transition={{ delay: 0.8, type: "spring" }}
                                className="w-3 h-3 rounded-full border-2 border-secondary"
                            />
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="relative">
                    {children}
                </div>
            </div>
        </section>
    );
}
