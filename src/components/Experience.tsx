"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Briefcase, Building2, Clock, ArrowUpRight } from "lucide-react";

// Experience card with brutalist styling
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

    const borderColor = isOngoing ? "border-primary" : "border-secondary";
    const shadowColor = isOngoing ? "4px 4px 0px 0px #FFB800" : "4px 4px 0px 0px #22C55E";
    const hoverShadow = isOngoing ? "6px 6px 0px 0px #FFB800" : "6px 6px 0px 0px #22C55E";

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            className="group h-full"
        >
            <motion.div
                className={`relative bg-surface border-2 ${borderColor} p-6 h-full flex flex-col transition-all duration-200`}
                style={{ boxShadow: shadowColor }}
                whileHover={{ x: -2, y: -2 }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = hoverShadow)}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = shadowColor)}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 border ${borderColor} bg-surface flex items-center justify-center`}>
                        <Briefcase className={`w-5 h-5 ${isOngoing ? 'text-primary' : 'text-secondary'}`} />
                    </div>

                    <div className={`flex items-center gap-2 px-3 py-1 border ${isOngoing ? 'border-primary text-primary' : 'border-white/20 text-paper-muted'}`}>
                        <Clock className="w-3 h-3" />
                        <span className="font-mono text-xs uppercase">
                            {experience.status}
                        </span>
                        {isOngoing && (
                            <motion.div
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-1.5 h-1.5 bg-primary"
                            />
                        )}
                    </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-paper-cream mb-3">
                    {experience.title}
                </h3>

                {/* Organization */}
                <div className="flex items-start gap-2 text-paper-muted mb-4">
                    <Building2 className="w-4 h-4 text-primary/50 mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm leading-relaxed">
                        {experience.organization}
                    </span>
                </div>

                {/* Description */}
                {experience.description && (
                    <p className="font-body text-sm text-paper-muted mt-auto pt-4 border-t border-white/10">
                        {experience.description}
                    </p>
                )}

                {/* Corner accent + hover indicator */}
                <div className="absolute top-0 right-0 w-8 h-8">
                    <div className={`absolute top-2 right-2 w-4 h-4 border-t border-r ${borderColor} opacity-50`} />
                </div>

                <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ArrowUpRight className={`w-5 h-5 ${isOngoing ? 'text-primary' : 'text-secondary'}`} />
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
                {/* Cards grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {portfolioData.experience.map((exp, index) => (
                        <ExperienceCard key={index} experience={exp} index={index} />
                    ))}
                </div>

                {/* Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-12 flex items-center gap-4"
                >
                    <div className="w-12 h-px bg-secondary/30" />
                    <span className="font-mono text-xs text-paper-muted uppercase tracking-wider">
                        Learning by doing · Growing through challenges
                    </span>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
