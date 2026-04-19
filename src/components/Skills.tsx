"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Microscope, Code2, BrainCircuit, Quote } from "lucide-react";
import gsap from "gsap";

// Oscillating Orb Skill Badge
function SkillBadge({
    skill,
    index,
    accent = "cyan"
}: {
    skill: string;
    index: number;
    accent?: "cyan" | "green" | "amber";
}) {
    const badgeRef = useRef<HTMLDivElement>(null);
    const orbRef = useRef<HTMLDivElement>(null);
    
    // GSAP Ticker for smooth sine wave oscillation
    useEffect(() => {
        if (!orbRef.current) return;
        
        let phase = index * 0.5; // Offset phase per item
        const speed = 0.05 + (Math.random() * 0.02);
        const amplitude = 3 + (Math.random() * 2);
        
        const tick = () => {
            phase += speed;
            const yOffset = Math.sin(phase) * amplitude;
            if (orbRef.current) {
                gsap.set(orbRef.current, { y: yOffset });
            }
        };
        
        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
    }, [index]);

    const borderConfig = {
        cyan: "border-primary/30 group-hover:border-primary/80 glow-cyan-sm",
        green: "border-secondary/30 group-hover:border-secondary/80 glow-green-sm",
        amber: "border-tertiary/30 group-hover:border-tertiary/80 glow-amber-sm",
    };

    const bgConfig = {
        cyan: "bg-primary text-primary",
        green: "bg-secondary text-secondary",
        amber: "bg-tertiary text-tertiary",
    };

    return (
        <div 
            ref={badgeRef}
            className="group flex flex-col items-center gap-2 p-2 hover:-translate-y-1 transition-transform duration-300"
        >
            <div 
                ref={orbRef}
                className={`w-10 h-10 rounded-full border glass-panel flex items-center justify-center transition-all duration-300 ${borderConfig[accent]}`}
            >
                <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor] animate-pulse ${bgConfig[accent]}`} />
            </div>
            <span className="font-mono text-[10px] sm:text-xs text-paper-muted text-center leading-tight group-hover:text-white transition-colors">
                {skill}
            </span>
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

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
                    {skills.map((skill, i) => (
                        <SkillBadge key={i} skill={skill} index={i} accent={accent} />
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
            <div className="flex flex-col lg:flex-row gap-6 mb-16 relative z-10">
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
