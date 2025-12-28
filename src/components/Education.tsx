"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { GraduationCap, MapPin, Award, ArrowRight } from "lucide-react";

// Timeline connector with measurement marks
function TimelineConnector() {
    return (
        <div className="relative w-0.5 h-full min-h-[100px] bg-white/10">
            {/* Measurement marks */}
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-px bg-primary/30"
                    style={{ top: `${(i + 1) * 20}%`, left: '-3px' }}
                />
            ))}

            {/* Animated pulse */}
            <motion.div
                animate={{
                    top: ["0%", "100%", "0%"],
                    opacity: [0, 1, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 -translate-x-1/2 w-1.5 h-4 bg-primary/50"
            />
        </div>
    );
}

// Timeline node
function TimelineNode({ isActive = false }: { isActive?: boolean }) {
    return (
        <div className="relative">
            <div className={`w-4 h-4 border-2 ${isActive ? 'border-primary bg-primary/20' : 'border-secondary bg-secondary/20'}`} />
            {isActive && (
                <motion.div
                    className="absolute inset-0 border-2 border-primary"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}
        </div>
    );
}

// Education card
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

    const borderColor = isActive ? "border-primary" : "border-secondary";
    const shadowColor = isActive ? "4px 4px 0px 0px #FFB800" : "4px 4px 0px 0px #22C55E";
    const hoverShadow = isActive ? "6px 6px 0px 0px #FFB800" : "6px 6px 0px 0px #22C55E";

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative flex items-start gap-6 mb-8"
        >
            {/* Timeline */}
            <div className="flex flex-col items-center pt-1">
                <TimelineNode isActive={isActive} />
                {!isLast && <TimelineConnector />}
            </div>

            {/* Card */}
            <motion.div
                className={`flex-1 bg-surface border-2 ${borderColor} p-6 transition-all duration-200 group`}
                style={{ boxShadow: shadowColor }}
                whileHover={{ x: -2, y: -2 }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = hoverShadow)}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = shadowColor)}
            >
                {/* Year badge */}
                <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 border ${isActive ? 'border-primary text-primary' : 'border-secondary text-secondary'}`}>
                        <span className="font-mono text-xs uppercase tracking-wider">
                            {education.year}
                        </span>
                        {isActive && (
                            <motion.div
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-1.5 h-1.5 bg-primary"
                            />
                        )}
                    </div>
                    <GraduationCap className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-secondary'}`} />
                </div>

                {/* Degree */}
                <h3 className="font-display text-xl font-semibold text-paper-cream mb-3">
                    {education.degree}
                </h3>

                {/* School */}
                <div className="flex items-center gap-2 text-paper-muted mb-4">
                    <MapPin className="w-4 h-4 text-primary/50" />
                    <span className="font-body text-sm">{education.school}</span>
                </div>

                {/* Highlight */}
                {education.highlight && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-start gap-3">
                            <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <p className="font-body text-sm text-paper-muted leading-relaxed">
                                {education.highlight}
                            </p>
                        </div>
                    </div>
                )}

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8">
                    <div className={`absolute top-2 right-2 w-4 h-4 border-t border-r ${borderColor} opacity-50`} />
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

                {/* Journey indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-12 flex items-center justify-center gap-4"
                >
                    <div className="w-12 h-px bg-primary/30" />
                    <span className="font-mono text-xs text-paper-muted uppercase tracking-wider">
                        Chennai → Halle
                    </span>
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <span className="font-mono text-xs text-primary uppercase tracking-wider">
                        Future
                    </span>
                    <div className="w-12 h-px bg-primary/30" />
                </motion.div>
            </motion.div>
        </SectionWrapper>
    );
}
