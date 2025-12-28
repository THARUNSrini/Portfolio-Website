"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { FlaskConical, Cpu, Brain, Atom } from "lucide-react";

// Skill tag with mono styling
function SkillTag({
    skill,
    variant,
    index
}: {
    skill: string;
    variant: "wet_lab" | "computational" | "ai";
    index: number;
}) {
    const tagRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(tagRef, { once: true, margin: "-20px" });

    const variantStyles = {
        wet_lab: {
            border: "border-primary/40 hover:border-primary",
            text: "text-primary",
            bg: "hover:bg-primary/5"
        },
        computational: {
            border: "border-secondary/40 hover:border-secondary",
            text: "text-secondary",
            bg: "hover:bg-secondary/5"
        },
        ai: {
            border: "border-tertiary/40 hover:border-tertiary",
            text: "text-tertiary",
            bg: "hover:bg-tertiary/5"
        }
    };

    const style = variantStyles[variant];

    return (
        <motion.div
            ref={tagRef}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
                delay: index * 0.03,
                duration: 0.4,
                ease: "easeOut"
            }}
            className={`
                px-4 py-2.5 border ${style.border} ${style.bg}
                bg-surface transition-all duration-200 cursor-default
                hover:translate-x-1
            `}
        >
            <span className={`font-mono text-sm ${style.text}`}>
                {skill}
            </span>
        </motion.div>
    );
}

// Category section with header
function SkillCategory({
    icon: Icon,
    title,
    skills,
    variant,
    delay = 0
}: {
    icon: React.ElementType;
    title: string;
    skills: string[];
    variant: "wet_lab" | "computational" | "ai";
    delay?: number;
}) {
    const categoryRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(categoryRef, { once: true });

    const colors = {
        wet_lab: {
            border: "border-primary",
            iconBg: "bg-primary/10",
            iconColor: "text-primary",
            shadow: "4px 4px 0px 0px #FFB800"
        },
        computational: {
            border: "border-secondary",
            iconBg: "bg-secondary/10",
            iconColor: "text-secondary",
            shadow: "4px 4px 0px 0px #22C55E"
        },
        ai: {
            border: "border-tertiary",
            iconBg: "bg-tertiary/10",
            iconColor: "text-tertiary",
            shadow: "4px 4px 0px 0px #F472B6"
        }
    };

    const c = colors[variant];

    return (
        <motion.div
            ref={categoryRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.6 }}
            className={`bg-surface border-2 ${c.border} p-6`}
            style={{ boxShadow: c.shadow }}
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                <div className={`w-12 h-12 ${c.iconBg} border border-white/10 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${c.iconColor}`} />
                </div>
                <div>
                    <h3 className="font-display text-xl font-semibold text-paper-cream">
                        {title}
                    </h3>
                    <span className="font-mono text-xs text-paper-muted">
                        {skills.length} skills
                    </span>
                </div>
            </div>

            {/* Skills list */}
            <div className="space-y-2">
                {skills.map((skill, index) => (
                    <SkillTag key={skill} skill={skill} variant={variant} index={index} />
                ))}
            </div>
        </motion.div>
    );
}

// Quote card
function CharpentierQuote() {
    const quoteRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(quoteRef, { once: true });

    return (
        <motion.div
            ref={quoteRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-16"
        >
            <div className="bg-surface border-2 border-primary p-8 md:p-12"
                style={{ boxShadow: '6px 6px 0px 0px #FFB800' }}
            >
                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-secondary" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-secondary" />

                {/* Floating atom */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-8 -right-8 opacity-10"
                >
                    <Atom className="w-24 h-24 text-primary" />
                </motion.div>

                {/* Quote */}
                <div className="relative max-w-3xl mx-auto text-center">
                    <span className="absolute -top-4 left-0 text-5xl text-primary/30 font-display">"</span>
                    <p className="font-display text-xl md:text-2xl text-paper-cream italic leading-relaxed px-8">
                        {portfolioData.charpentierQuote.text}
                    </p>
                    <span className="absolute -bottom-4 right-0 text-5xl text-primary/30 font-display">"</span>
                </div>

                {/* Attribution */}
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="font-mono text-sm text-primary font-medium">
                        — {portfolioData.charpentierQuote.author}
                    </p>
                    <p className="font-mono text-xs text-paper-muted mt-1">
                        {portfolioData.charpentierQuote.context}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

// Stats row
function SkillStats() {
    const stats = [
        { value: portfolioData.skills.wet_lab.length, label: "Lab Techniques", color: "text-primary" },
        { value: portfolioData.skills.ai.length, label: "AI/ML Tools", color: "text-tertiary" },
        { value: portfolioData.skills.computational.length, label: "Computational", color: "text-secondary" }
    ];

    return (
        <div className="grid grid-cols-3 gap-4 mb-12">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-surface border border-white/10 p-6 text-center hover:border-primary/30 transition-colors"
                >
                    <span className={`font-display text-4xl font-bold ${stat.color}`}>
                        {stat.value}+
                    </span>
                    <p className="font-mono text-xs text-paper-muted mt-2 uppercase tracking-wider">
                        {stat.label}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <SectionWrapper
            id="skills"
            title="Skills & Expertise"
            subtitle="Bridging wet-lab biology with AI-driven computational approaches"
        >
            <div ref={containerRef} className="relative">
                {/* Stats */}
                <SkillStats />

                {/* Skills Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    <SkillCategory
                        icon={FlaskConical}
                        title="Laboratory Techniques"
                        skills={portfolioData.skills.wet_lab}
                        variant="wet_lab"
                        delay={0}
                    />
                    <SkillCategory
                        icon={Brain}
                        title="AI & Machine Learning"
                        skills={portfolioData.skills.ai}
                        variant="ai"
                        delay={0.15}
                    />
                    <SkillCategory
                        icon={Cpu}
                        title="Computational & Analytical"
                        skills={portfolioData.skills.computational}
                        variant="computational"
                        delay={0.3}
                    />
                </div>

                {/* Charpentier Quote */}
                <CharpentierQuote />

                {/* Bottom decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                />
            </div>
        </SectionWrapper>
    );
}
