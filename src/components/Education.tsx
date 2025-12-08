"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { GraduationCap, MapPin, Sparkles, BookOpen, Award } from "lucide-react";

// Animated DNA-style timeline connector
function DNAConnector() {
    return (
        <div className="relative w-0.5 h-full min-h-[120px]">
            {/* Main line */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary opacity-50" />

            {/* Animated helix dots */}
            <motion.div
                animate={{ y: [0, 100, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-1 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(0,229,255,0.8)]"
            />
            <motion.div
                animate={{ y: [100, 0, 100] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-1 w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(0,255,159,0.8)]"
            />
        </div>
    );
}

// Timeline dot with advanced animation
function TimelineDot({ isActive = false }: { isActive?: boolean }) {
    return (
        <motion.div
            className="relative"
            whileHover={{ scale: 1.2 }}
        >
            <motion.div
                className={`w-5 h-5 rounded-full ${isActive ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-secondary/70'} shadow-lg`}
                animate={isActive ? {
                    boxShadow: [
                        "0 0 0 0 rgba(0, 229, 255, 0.4)",
                        "0 0 0 10px rgba(0, 229, 255, 0)",
                        "0 0 0 0 rgba(0, 229, 255, 0)"
                    ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            />
            {isActive && (
                <>
                    <motion.div
                        className="absolute inset-0 w-5 h-5 rounded-full bg-primary/30"
                        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute -inset-1 rounded-full border border-primary/50"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    />
                </>
            )}
        </motion.div>
    );
}

// Education card with 3D flip and advanced animations
function EducationCard({
    education,
    index,
    isLast = false
}: {
    education: typeof portfolioData.education[0];
    index: number;
    isLast?: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });
    const isActive = education.year.includes("Present");

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80, rotateY: index % 2 === 0 ? -20 : 20 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ delay: index * 0.25, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex items-start gap-6"
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Timeline */}
            <div className="flex flex-col items-center">
                <TimelineDot isActive={isActive} />
                {!isLast && <DNAConnector />}
            </div>

            {/* Card content with 3D hover */}
            <motion.div
                className={`flex-1 glass-card rounded-2xl p-6 border ${isActive ? 'border-primary/50' : 'border-white/10'} transition-all duration-500 group mb-6 overflow-hidden`}
                whileHover={{
                    scale: 1.02,
                    rotateY: 3,
                    boxShadow: isActive
                        ? "0 0 40px rgba(0, 229, 255, 0.2)"
                        : "0 0 30px rgba(0, 255, 159, 0.1)"
                }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Animated background gradient */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${isActive ? 'from-primary/10 via-transparent to-secondary/5' : 'from-secondary/5 via-transparent to-primary/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Year badge with animation */}
                <motion.div
                    className={`relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 ${isActive ? 'bg-gradient-to-r from-primary/30 to-secondary/30 text-white' : 'bg-secondary/20 text-secondary'}`}
                    whileHover={{ scale: 1.05 }}
                >
                    {isActive && (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-3 h-3" />
                        </motion.div>
                    )}
                    {education.year}
                    {isActive && (
                        <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-2 bg-primary rounded-full"
                        />
                    )}
                </motion.div>

                {/* Degree with hover effect */}
                <motion.h3
                    className="relative text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                >
                    <BookOpen className="inline w-5 h-5 mr-2 text-primary/70" />
                    {education.degree}
                </motion.h3>

                {/* School with location */}
                <motion.div
                    className="flex items-center gap-2 text-gray-400 mb-4"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, x: 3 }}
                >
                    <MapPin className="w-4 h-4 text-primary/70" />
                    <span className="text-sm">{education.school}</span>
                </motion.div>

                {/* Highlight with animated reveal */}
                {education.highlight && (
                    <motion.div
                        className="relative mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 border border-primary/20 overflow-hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={isInView ? { opacity: 1, height: "auto" } : {}}
                        transition={{ delay: index * 0.25 + 0.4, duration: 0.5 }}
                    >
                        {/* Animated shine effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                        />

                        <div className="relative flex items-start gap-3">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            </motion.div>
                            <p className="text-sm text-gray-300">{education.highlight}</p>
                        </div>
                    </motion.div>
                )}

                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <motion.div
                        className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-lg"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Education() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);

    return (
        <SectionWrapper
            id="education"
            title="Education"
            subtitle="Academic journey through biotechnology and computational biology"
        >
            <motion.div ref={containerRef} style={{ opacity }} className="relative">
                {/* Background decoration */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
                        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]"
                    />
                </div>

                {/* Timeline */}
                <div className="max-w-2xl mx-auto">
                    {portfolioData.education.map((edu, index) => (
                        <EducationCard
                            key={index}
                            education={edu}
                            index={index}
                            isLast={index === portfolioData.education.length - 1}
                        />
                    ))}
                </div>

                {/* Journey line */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-10 text-center"
                >
                    <motion.p
                        className="text-gray-500 text-sm italic"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        ✨ From Chennai to Halle · Building the future of protein engineering ✨
                    </motion.p>
                </motion.div>
            </motion.div>
        </SectionWrapper>
    );
}
