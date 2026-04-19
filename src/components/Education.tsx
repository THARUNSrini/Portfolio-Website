"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { GraduationCap, MapPin, Calendar, BookOpen, FlaskConical } from "lucide-react";

function EducationCard({
    education,
    index,
    isLast
}: {
    education: typeof portfolioData.education[0];
    index: number;
    isLast: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    // SVG Beaker Draw effect + Liquid Fill
    const BeakerIcon = () => (
        <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
            {/* Outline draw */}
            <svg viewBox="0 0 24 24" fill="none" className="absolute inset-0 w-full h-full text-primary drop-shadow-[0_0_8px_rgba(0,245,212,0.5)]">
                <motion.path
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: index * 0.2 }}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a2 2 0 0 0 1.79 2.95h11.98a2 2 0 0 0 1.79-2.95l-5.068-10.127A2 2 0 0 1 14 9.527V2h-4Z"
                />
                <motion.path
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.2 }}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    d="M8.5 2h7"
                />
            </svg>
            
            {/* Liquid Fill animation */}
            <div className="absolute inset-x-[20%] bottom-[15%] top-[45%] overflow-hidden" 
                 style={{ clipPath: 'polygon(0 100%, 100% 100%, 80% 0, 20% 0)' }}>
                <motion.div
                    initial={{ height: "0%" }}
                    animate={isInView ? { height: "100%" } : {}}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 + index * 0.2 }}
                    className="absolute bottom-0 inset-x-0 bg-primary/40"
                />
            </div>
        </div>
    );

    return (
        <div className="relative" ref={cardRef}>
            {/* Timeline connection line - drawn downward */}
            {!isLast && (
                <div className="absolute left-6 top-16 bottom-[-2rem] w-px overflow-hidden">
                     <motion.div
                        initial={{ height: 0 }}
                        animate={isInView ? { height: "100%" } : {}}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
                        className="w-full h-full bg-gradient-to-b from-primary/50 via-primary/20 to-transparent"
                    />
                </div>
            )}

            <div className="flex gap-6 md:gap-8 relative z-10 w-full">
                <BeakerIcon />

                <motion.div
                    initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                    animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 glass-panel p-6 md:p-8"
                >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div>
                            <h3 className="font-display text-2xl font-semibold text-white mb-2">
                                {education.degree}
                            </h3>
                            <div className="flex items-center gap-2 text-paper-muted font-mono text-sm">
                                <MapPin className="w-4 h-4 text-primary" />
                                {education.school}
                            </div>
                        </div>

                        {/* Animated amber badge for dates */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 glass-panel-strong border-amber-warm/30 animate-pulse-glow-amber self-start whitespace-nowrap">
                            <Calendar className="w-4 h-4 text-tertiary" />
                            <span className="font-mono text-xs text-tertiary">
                                {education.year}
                            </span>
                        </div>
                    </div>

                    {education.highlight && (
                        <div className="mt-6 pt-4 border-t border-white/5">
                            <div className="flex items-start gap-3">
                                <BookOpen className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                                <p className="font-body text-paper-muted text-sm leading-relaxed">
                                    <span className="text-secondary font-medium tracking-wide">Focus:</span> {education.highlight}
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default function Education() {
    return (
        <SectionWrapper
            id="education"
            title="Education"
            subtitle="Academic foundation in biotechnology and computational biology"
        >
            <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
                {portfolioData.education.map((edu, index) => (
                    <EducationCard
                        key={index}
                        education={edu}
                        index={index}
                        isLast={index === portfolioData.education.length - 1}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
}
