"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Microscope, Code2, BrainCircuit, Quote, Wrench } from "lucide-react";
import gsap from "gsap";

// Pill Tag Skill Badge
function SkillBadge({
    skill,
    accent = "cyan"
}: {
    skill: string;
    accent?: "cyan" | "green" | "amber";
}) {
    const borderConfig = {
        cyan: "border-primary/20 hover:border-primary/50 glow-cyan-sm bg-primary/5 hover:bg-primary/10 text-primary",
        green: "border-secondary/20 hover:border-secondary/50 glow-green-sm bg-secondary/5 hover:bg-secondary/10 text-secondary",
        amber: "border-tertiary/20 hover:border-tertiary/50 glow-amber-sm bg-tertiary/5 hover:bg-tertiary/10 text-tertiary",
    };

    return (
        <div className={`px-3 py-1.5 rounded-full border transition-all duration-300 text-xs sm:text-sm font-mono text-center cursor-default ${borderConfig[accent]}`}>
            {skill}
        </div>
    );
}

// Category Glass Panel
function SkillCategory({
    title,
    skills,
    icon: Icon,
    index,
    accent = "cyan"
}: {
    title: string;
    skills: string[];
    icon: React.ElementType;
    index: number;
    accent?: "cyan" | "green" | "amber";
}) {
    const categoryRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(categoryRef, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={categoryRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full"
        >
             <div className="glass-panel p-6 sm:p-8 h-full relative overflow-hidden group hover:border-primary/30 transition-colors duration-500">
                {/* Decorative background icon */}
                <Icon className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 pointer-events-none group-hover:text-primary/5 transition-colors duration-500" />
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 relative z-10 border-b border-white/5 pb-6">
                    <div className="w-12 h-12 rounded-lg border border-primary/20 flex items-center justify-center bg-primary/10 flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl text-white font-medium">{title}</h3>
                </div>

                <div className="flex flex-wrap gap-2 relative z-10">
                    {skills.map((skill, i) => (
                        <SkillBadge key={i} skill={skill} accent={accent} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const quoteRef = useRef<HTMLDivElement>(null);
    const isQuoteInView = useInView(quoteRef, { once: true, margin: "-50px" });

    return (
        <SectionWrapper
            id="skills"
            title="Skills & Toolkit"
            subtitle="Bridging wet-lab precision with computational biology and AI"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 relative z-10">
                <SkillCategory
                    title="Wet-Lab & Genomics"
                    skills={portfolioData.skills.wet_lab}
                    icon={Microscope}
                    index={0}
                    accent="cyan"
                />
                <SkillCategory
                    title="Computational Bio"
                    skills={portfolioData.skills.computational}
                    icon={Code2}
                    index={1}
                    accent="green"
                />
                <SkillCategory
                    title="AI & Modeling"
                    skills={portfolioData.skills.ai}
                    icon={BrainCircuit}
                    index={2}
                    accent="cyan"
                />
                <SkillCategory
                    title="Tools & Technologies"
                    skills={portfolioData.skills.tools}
                    icon={Wrench}
                    index={3}
                    accent="amber"
                />
            </div>

            {/* Quote Card */}
            <motion.div
                ref={quoteRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isQuoteInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl mx-auto"
            >
                <div className="relative glass-panel-strong p-8 md:p-10 border-tertiary/20 text-center overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-tertiary/5 rounded-full blur-[50px] pointer-events-none" />

                    <Quote className="w-12 h-12 text-tertiary/30 mx-auto mb-6" />
                    
                    <p className="font-display text-xl md:text-2xl text-paper-cream italic leading-relaxed mb-6 block relative z-10">
                        {portfolioData.charpentierQuote.text}
                    </p>
                    
                    <div className="relative z-10">
                        <p className="font-mono text-sm text-tertiary font-medium">
                            — {portfolioData.charpentierQuote.author}
                        </p>
                        <p className="font-mono text-xs text-paper-muted mt-1">
                            {portfolioData.charpentierQuote.context}
                        </p>
                    </div>
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
