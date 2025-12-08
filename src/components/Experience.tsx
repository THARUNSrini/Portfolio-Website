"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Briefcase, Building2, Clock, ChevronRight, Sparkles, Zap } from "lucide-react";

// Animated floating particle
function FloatingParticle({ delay = 0, className }: { delay?: number; className: string }) {
    return (
        <motion.div
            className={`absolute w-1 h-1 rounded-full bg-primary/30 ${className}`}
            animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
            }}
            transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
            }}
        />
    );
}

// Experience card with enhanced animations
function ExperienceCard({
    experience,
    index
}: {
    experience: typeof portfolioData.experience[0];
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-30px" });
    const isOngoing = experience.status === "ongoing";
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50, rotateX: -15, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
            transition={{ delay: index * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group perspective-1000"
            style={{ transformStyle: "preserve-3d" }}
        >
            <motion.div
                className={`relative glass-card rounded-2xl p-6 border ${isOngoing ? 'border-primary/50' : 'border-white/10'} transition-all duration-500 h-full overflow-hidden`}
                animate={{
                    rotateY: isHovered ? 5 : 0,
                    scale: isHovered ? 1.02 : 1,
                    boxShadow: isHovered
                        ? isOngoing
                            ? "0 25px 50px -12px rgba(0, 229, 255, 0.25)"
                            : "0 25px 50px -12px rgba(0, 255, 159, 0.15)"
                        : "0 0 0 0 rgba(0, 0, 0, 0)"
                }}
            >
                {/* Animated gradient background */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${isOngoing ? 'from-primary/10 via-transparent to-secondary/5' : 'from-secondary/5 via-transparent to-primary/5'}`}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Floating particles for ongoing */}
                {isOngoing && (
                    <>
                        <FloatingParticle delay={0} className="top-4 right-4" />
                        <FloatingParticle delay={0.5} className="top-8 right-8" />
                        <FloatingParticle delay={1} className="top-12 right-6" />
                    </>
                )}

                {/* Header with status */}
                <div className="relative flex items-start justify-between mb-4">
                    <motion.div
                        className={`w-14 h-14 rounded-xl ${isOngoing ? 'bg-gradient-to-br from-primary/30 to-secondary/20' : 'bg-secondary/20'} flex items-center justify-center`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Briefcase className={`w-7 h-7 ${isOngoing ? 'text-white' : 'text-secondary'}`} />
                    </motion.div>

                    <motion.div
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${isOngoing ? 'bg-primary/30 text-primary' : 'bg-white/10 text-gray-400'}`}
                        animate={isOngoing ? {
                            boxShadow: [
                                "0 0 0 0 rgba(0, 229, 255, 0.4)",
                                "0 0 0 6px rgba(0, 229, 255, 0)",
                                "0 0 0 0 rgba(0, 229, 255, 0)"
                            ]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Clock className="w-3 h-3" />
                        {experience.status}
                        {isOngoing && (
                            <motion.span
                                className="w-2 h-2 bg-primary rounded-full"
                                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        )}
                    </motion.div>
                </div>

                {/* Title with animated underline */}
                <motion.h3
                    className="relative text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all"
                    animate={{ x: isHovered ? 3 : 0 }}
                >
                    {experience.title}
                    {isOngoing && (
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: isHovered ? "100%" : "0%" }}
                            className="h-0.5 bg-gradient-to-r from-primary to-secondary mt-1"
                        />
                    )}
                </motion.h3>

                {/* Organization with animation */}
                <motion.div
                    className="flex items-center gap-2 text-gray-400 mb-3"
                    animate={{ x: isHovered ? 2 : 0 }}
                >
                    <Building2 className="w-4 h-4 text-primary/70" />
                    <span className="text-sm">{experience.organization}</span>
                </motion.div>

                {/* Description */}
                {experience.description && (
                    <motion.p
                        className="text-gray-400 text-sm mt-3 pt-3 border-t border-white/5"
                        animate={{ opacity: isHovered ? 1 : 0.8 }}
                    >
                        {experience.description}
                    </motion.p>
                )}

                {/* Hover indicator */}
                <motion.div
                    className="mt-4 flex items-center gap-1 text-primary text-sm"
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : -10
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <Zap className="w-4 h-4" />
                    <span>View details</span>
                    <ChevronRight className="w-4 h-4" />
                </motion.div>

                {/* Corner decoration */}
                <motion.div
                    className="absolute bottom-0 right-0 w-16 h-16"
                    animate={{ opacity: isHovered ? 0.4 : 0.1 }}
                >
                    <div className={`absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 ${isOngoing ? 'border-primary/30' : 'border-secondary/30'} rounded-br-lg`} />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default function Experience() {
    return (
        <SectionWrapper
            id="experience"
            title="Experience"
            subtitle="Research positions and industry exposure"
        >
            <div className="relative">
                {/* Background decoration */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.05, 0.1, 0.05]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {portfolioData.experience.map((exp, index) => (
                        <ExperienceCard key={index} experience={exp} index={index} />
                    ))}
                </div>

                {/* Animated tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-10 flex items-center justify-center gap-3"
                >
                    <Sparkles className="w-4 h-4 text-primary/50" />
                    <span className="text-gray-500 text-sm">
                        Learning by doing · Growing through challenges
                    </span>
                    <Sparkles className="w-4 h-4 text-secondary/50" />
                </motion.div>

                {/* Decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                />
            </div>
        </SectionWrapper>
    );
}
