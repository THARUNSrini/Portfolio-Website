"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { FlaskConical, Cpu, Brain, Quote, Sparkles, Dna } from "lucide-react";

// Skill pill with animated fill effect
function SkillPill({
    skill,
    variant,
    index
}: {
    skill: string;
    variant: "wet_lab" | "computational" | "ai";
    index: number;
}) {
    const pillRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(pillRef, { once: true, margin: "-20px" });
    const [isHovered, setIsHovered] = useState(false);

    const variantStyles = {
        wet_lab: {
            bg: "bg-gradient-to-r from-primary/5 to-primary/10",
            border: "border-primary/20 hover:border-primary/60",
            text: "text-primary",
            glow: "hover:shadow-[0_0_25px_rgba(0,229,255,0.2)]",
            fill: "bg-primary/30"
        },
        computational: {
            bg: "bg-gradient-to-r from-secondary/5 to-secondary/10",
            border: "border-secondary/20 hover:border-secondary/60",
            text: "text-secondary",
            glow: "hover:shadow-[0_0_25px_rgba(0,255,159,0.2)]",
            fill: "bg-secondary/30"
        },
        ai: {
            bg: "bg-gradient-to-r from-teal-400/5 to-secondary/10",
            border: "border-teal-400/20 hover:border-teal-400/60",
            text: "text-teal-300",
            glow: "hover:shadow-[0_0_25px_rgba(0,229,255,0.2)]",
            fill: "bg-teal-400/30"
        }
    };

    const style = variantStyles[variant];

    return (
        <motion.div
            ref={pillRef}
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{
                delay: index * 0.04,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{
                scale: 1.03,
                y: -3,
                transition: { duration: 0.2 }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                relative group cursor-default overflow-hidden
                px-4 py-2.5 rounded-xl
                ${style.bg} ${style.border} ${style.glow}
                border backdrop-blur-sm
                transition-all duration-300
            `}
        >
            {/* Animated fill on scroll */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: index * 0.04 + 0.2, duration: 0.6 }}
                className={`absolute inset-y-0 left-0 ${style.fill} origin-left`}
                style={{ width: '100%', opacity: 0.3 }}
            />

            {/* Shine effect on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: isHovered ? ["100%", "-100%"] : "-100%" }}
                transition={{ duration: 0.6 }}
            />

            {/* Left accent */}
            <motion.div
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full ${style.fill.replace('/30', '')}`}
                animate={{ height: isHovered ? "60%" : "0%" }}
                transition={{ duration: 0.3 }}
            />

            <p className={`relative text-sm font-medium ${style.text} group-hover:text-white transition-colors z-10`}>
                {skill}
            </p>
        </motion.div>
    );
}

// Category section with animated header
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
    const [isHovered, setIsHovered] = useState(false);

    const colors = {
        wet_lab: {
            bg: "bg-primary/20",
            text: "text-primary",
            glow: "shadow-[0_0_40px_rgba(0,229,255,0.3)]",
            border: "border-primary/30 hover:border-primary/50",
            gradient: "from-primary/10 to-transparent"
        },
        computational: {
            bg: "bg-secondary/20",
            text: "text-secondary",
            glow: "shadow-[0_0_40px_rgba(0,255,159,0.3)]",
            border: "border-secondary/30 hover:border-secondary/50",
            gradient: "from-secondary/10 to-transparent"
        },
        ai: {
            bg: "bg-teal-400/20",
            text: "text-teal-300",
            glow: "shadow-[0_0_40px_rgba(0,229,255,0.3)]",
            border: "border-teal-400/30 hover:border-teal-400/50",
            gradient: "from-teal-400/10 to-transparent"
        }
    };

    const color = colors[variant];

    return (
        <motion.div
            ref={categoryRef}
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ delay, duration: 0.7, ease: "easeOut" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`glass-card rounded-2xl p-6 border ${color.border} transition-all duration-500 relative overflow-hidden`}
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Animated background gradient */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${color.gradient} opacity-0`}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Header */}
            <div className="relative flex items-center gap-4 mb-6">
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    animate={{
                        boxShadow: isHovered ? color.glow.replace("shadow-", "") : "none"
                    }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color.bg} transition-all duration-500`}
                >
                    <Icon className={`w-7 h-7 ${color.text}`} />
                </motion.div>
                <div>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <motion.span
                        className="text-xs text-gray-500"
                        animate={{ opacity: isHovered ? 1 : 0.7 }}
                    >
                        {skills.length} skills
                    </motion.span>
                </div>
            </div>

            {/* Skills grid */}
            <div className="relative space-y-2">
                {skills.map((skill, index) => (
                    <SkillPill key={skill} skill={skill} variant={variant} index={index} />
                ))}
            </div>

            {/* Corner decoration */}
            <motion.div
                className="absolute top-0 right-0 w-20 h-20"
                animate={{ opacity: isHovered ? 0.5 : 0.2 }}
            >
                <div className={`absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 ${color.border} rounded-tr-lg`} />
            </motion.div>
        </motion.div>
    );
}

// Motivating Life Quote component
function MotivatingQuote() {
    const quoteRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(quoteRef, { once: true });

    return (
        <motion.div
            ref={quoteRef}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative mt-16"
        >
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl blur-xl" />

            <div className="relative glass-card rounded-3xl p-8 md:p-12 border border-white/10 overflow-hidden">
                {/* Animated rocket decoration */}
                <motion.div
                    animate={{ rotate: 360, y: [0, -10, 0] }}
                    transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 3, repeat: Infinity } }}
                    className="absolute -top-10 -right-10 opacity-10"
                >
                    <Dna className="w-32 h-32 text-primary" />
                </motion.div>

                {/* Quote marks */}
                <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20" />
                <Quote className="absolute bottom-6 right-6 w-12 h-12 text-secondary/20 rotate-180" />

                <div className="relative z-10 text-center max-w-3xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xl md:text-2xl font-light text-white italic mb-8 leading-relaxed"
                    >
                        &ldquo;The only way to do great work is to love what you do. Stay foolish, stay hungry, and never stop exploring the mysteries of science. Every experiment is a step closer to changing the world!&rdquo;
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-secondary" />
                            <span className="text-gradient font-bold text-lg">
                                — Passion Fuels Discovery
                            </span>
                            <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-gray-500 text-sm">
                            🧬 Science is the poetry of reality 🚀
                        </span>
                    </motion.div>
                </div>

                {/* Animated border glow */}
                <motion.div
                    animate={{
                        background: [
                            "linear-gradient(90deg, rgba(0,229,255,0.3), rgba(0,255,159,0.3), rgba(0,229,255,0.3))",
                            "linear-gradient(180deg, rgba(0,255,159,0.3), rgba(0,229,255,0.3), rgba(0,255,159,0.3))",
                            "linear-gradient(270deg, rgba(0,229,255,0.3), rgba(0,255,159,0.3), rgba(0,229,255,0.3))",
                            "linear-gradient(360deg, rgba(0,255,159,0.3), rgba(0,229,255,0.3), rgba(0,255,159,0.3))"
                        ]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute inset-0 rounded-3xl opacity-30 -z-10 blur-sm"
                />
            </div>
        </motion.div>
    );
}

// Stats row
function SkillStats() {
    const stats = [
        { value: portfolioData.skills.wet_lab.length, label: "Lab Techniques" },
        { value: portfolioData.skills.ai.length, label: "AI/ML Tools" },
        { value: portfolioData.skills.computational.length, label: "Computational" }
    ];

    return (
        <div className="grid grid-cols-3 gap-4 mb-10">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass-card rounded-xl p-5 text-center border border-white/10 hover:border-primary/30 transition-all cursor-default"
                >
                    <motion.span
                        className="text-4xl font-bold text-gradient"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                    >
                        {stat.value}+
                    </motion.span>
                    <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
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
                {/* Animated background blobs */}
                <motion.div
                    className="absolute inset-0 -z-10 opacity-30 pointer-events-none"
                    style={{ y: backgroundY }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
                        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
                        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-[100px]"
                    />
                </motion.div>

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

                {/* Motivating Life Quote */}
                <MotivatingQuote />

                {/* Bottom decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                />
            </div>
        </SectionWrapper>
    );
}
