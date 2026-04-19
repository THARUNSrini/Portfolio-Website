"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Building2, Calendar, FlaskConical, Dna, ArrowRight, Activity, Percent, MapPin } from "lucide-react";

// Counter animation component for research metrics
function AnimatedCounter({ value, label, suffix = "%" }: { value: number, label: string, suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;
        
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            setCount(Math.floor(ease * value));
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }, [isInView, value]);

    return (
        <div ref={ref} className="text-center p-4 glass-panel border-primary/20">
            <div className="font-display text-4xl text-primary font-bold mb-1 drop-shadow-[0_0_10px_rgba(0,245,212,0.5)]">
                {count}{suffix}
            </div>
            <div className="font-mono text-xs text-paper-muted uppercase tracking-wider">{label}</div>
        </div>
    );
}

// Master's Thesis Card - Cinematic Rewrite
function ThesisCard({
    experience,
    index
}: {
    experience: typeof portfolioData.experience[0];
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mb-12 relative"
        >
            <div className="glass-panel-glow p-8 md:p-10 border-primary/30 relative overflow-hidden group">
                {/* Background animated hexagon grid specific to this card */}
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #00f5d4 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                    animation: 'hex-breathe 8s ease-in-out infinite'
                }} />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary font-mono text-xs uppercase tracking-widest mb-4 glow-cyan-sm">
                                <FlaskConical className="w-4 h-4" />
                                Master's Thesis Project
                            </div>
                            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-3">
                                <span className="text-gradient">γδ T Cell</span> & BTN/BTNL<br className="hidden md:block"/> Research
                            </h3>
                            <p className="font-body text-paper-muted max-w-2xl text-lg">
                                {experience.organization}
                            </p>
                        </div>
                        
                        {/* Status Badge */}
                        <div className="flex items-center gap-2 px-4 py-2 glass-panel-strong border-amber-warm/30 animate-pulse-glow-amber self-start whitespace-nowrap">
                            <Activity className="w-4 h-4 text-tertiary" />
                            <span className="font-mono text-sm text-tertiary uppercase tracking-wider font-bold">
                                {experience.status}
                            </span>
                        </div>
                    </div>

                    <p className="font-body text-white/90 text-lg mb-8 leading-relaxed max-w-4xl border-l-2 border-primary/50 pl-4 py-1">
                        {experience.description}
                    </p>

                    {/* Stats counters row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <AnimatedCounter value={1.6} label="Million Cells" suffix="M" />
                        <AnimatedCounter value={2} label="Study Arms" suffix="" />
                        <AnimatedCounter value={98} label="Sort Purity" />
                        <AnimatedCounter value={100} label="Passion" />
                    </div>

                    {/* Research Arms - Horizontal flex container */}
                    {experience.arms && (
                        <div className="flex flex-col lg:flex-row gap-6">
                            {experience.arms.map((arm, armIdx) => (
                                <motion.div 
                                    key={armIdx}
                                    initial={{ opacity: 0, x: armIdx === 0 ? -20 : 20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.4 + (armIdx * 0.2), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex-1 glass-panel p-6 border-white/5 hover:border-primary/20 transition-colors"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center bg-primary/10">
                                            {armIdx === 0 ? <Dna className="w-4 h-4 text-primary" /> : <FlaskConical className="w-4 h-4 text-primary" />}
                                        </div>
                                        <h4 className="font-display text-2xl text-white">{arm.title.split('—')[1]?.trim() || arm.title}</h4>
                                    </div>
                                    <p className="font-mono text-xs text-primary mb-5 uppercase tracking-widest">{arm.subtitle}</p>
                                    
                                    <ul className="space-y-3">
                                        {arm.bullets?.map((bullet, i) => (
                                            <li key={i} className="flex items-start gap-2 text-paper-muted font-body text-sm">
                                                <ArrowRight className="w-4 h-4 text-primary/50 flex-shrink-0 mt-0.5" />
                                                <span className="leading-relaxed">{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* Visual separator line below the major thesis */}
            <div className="mt-16 mb-8 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>
    );
}

// Standard Experience Item
function ExperienceItem({
    experience,
    index
}: {
    experience: typeof portfolioData.experience[0];
    index: number;
}) {
    const itemRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(itemRef, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + (index * 0.1), duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4 md:gap-8 group relative"
        >
            {/* Vertical timeline line */}
            <div className="relative flex flex-col items-center">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center z-10 border-white/10 group-hover:border-primary/50 transition-colors">
                    <Building2 className="w-5 h-5 text-paper-muted group-hover:text-primary transition-colors" />
                </div>
                <div className="absolute top-12 bottom-[-2rem] w-px bg-white/5 group-hover:bg-primary/20 transition-colors" />
            </div>

            <div className="flex-1 pb-10">
                <div className="glass-panel p-6 group-hover:border-primary/20 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h3 className="font-display text-xl text-white font-medium group-hover:text-primary transition-colors">
                            {experience.title}
                        </h3>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 glass-panel-strong border-secondary/20">
                            <Calendar className="w-3.5 h-3.5 text-secondary" />
                            <span className="font-mono text-xs text-secondary uppercase tracking-widest font-bold">
                                {experience.status}
                            </span>
                        </div>
                    </div>
                    <p className="font-body text-paper-muted mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 opacity-50" />
                        {experience.organization}
                    </p>
                    {experience.description && (
                        <p className="font-body text-sm text-paper-muted/80 leading-relaxed border-l-2 border-white/5 pl-3 group-hover:border-primary/30 transition-colors">
                            {experience.description}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function Experience() {
    return (
        <SectionWrapper
            id="experience"
            title="Experience"
            subtitle="Research and professional roles driving innovations in genomic medicine"
        >
            <div className="max-w-5xl mx-auto">
                {/* 1. Featured Master's Thesis Card */}
                {portfolioData.experience.length > 0 && (
                    <ThesisCard experience={portfolioData.experience[0]} index={0} />
                )}

                {/* 2. Standard Timeline for other experiences */}
                <div className="pl-2 md:pl-0">
                    {portfolioData.experience.slice(1).map((exp, index) => (
                        <ExperienceItem key={index + 1} experience={exp} index={index} />
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
