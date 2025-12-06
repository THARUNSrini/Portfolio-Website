"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { FlaskConical, Cpu, Brain, Sparkles, Quote } from "lucide-react";

// Premium animated skill card
function SkillCard({
    skill,
    variant,
    index
}: {
    skill: string;
    variant: "cyan" | "magenta" | "purple";
    index: number;
}) {
    const variantStyles = {
        cyan: {
            bg: "bg-gradient-to-r from-primary/5 to-primary/10",
            border: "border-primary/20 hover:border-primary/60",
            text: "text-primary",
            glow: "hover:shadow-[0_0_30px_rgba(0,247,255,0.25),inset_0_0_20px_rgba(0,247,255,0.05)]",
            line: "bg-primary"
        },
        magenta: {
            bg: "bg-gradient-to-r from-secondary/5 to-secondary/10",
            border: "border-secondary/20 hover:border-secondary/60",
            text: "text-secondary",
            glow: "hover:shadow-[0_0_30px_rgba(255,0,170,0.25),inset_0_0_20px_rgba(255,0,170,0.05)]",
            line: "bg-secondary"
        },
        purple: {
            bg: "bg-gradient-to-r from-purple-500/5 to-purple-500/10",
            border: "border-purple-500/20 hover:border-purple-500/60",
            text: "text-purple-400",
            glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.25),inset_0_0_20px_rgba(168,85,247,0.05)]",
            line: "bg-purple-500"
        }
    };

    const style = variantStyles[variant];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
                delay: index * 0.05,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true, margin: "-30px" }}
            whileHover={{
                scale: 1.02,
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" }
            }}
            className={`
                relative group cursor-default
                px-4 py-3 rounded-xl
                ${style.bg} ${style.border} ${style.glow}
                border backdrop-blur-sm
                transition-all duration-300 ease-out
            `}
        >
            {/* Animated gradient line on left */}
            <div className={`
                absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 
                ${style.line} rounded-full
                group-hover:h-2/3 transition-all duration-300
            `} />

            <p className={`text-sm font-medium ${style.text} group-hover:text-white transition-colors duration-300`}>
                {skill}
            </p>
        </motion.div>
    );
}

// Animated section header with icon
function CategoryHeader({
    icon: Icon,
    title,
    count,
    variant
}: {
    icon: React.ElementType;
    title: string;
    count: number;
    variant: "cyan" | "magenta" | "purple";
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const colors = {
        cyan: { bg: "bg-primary/20", text: "text-primary", glow: "shadow-[0_0_30px_rgba(0,247,255,0.3)]" },
        magenta: { bg: "bg-secondary/20", text: "text-secondary", glow: "shadow-[0_0_30px_rgba(255,0,170,0.3)]" },
        purple: { bg: "bg-purple-500/20", text: "text-purple-400", glow: "shadow-[0_0_30px_rgba(168,85,247,0.3)]" }
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-4 mb-6"
        >
            <motion.div
                className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center
                    ${colors[variant].bg} ${colors[variant].glow}
                    transition-all duration-500
                `}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <Icon className={`w-6 h-6 ${colors[variant].text}`} />
            </motion.div>
            <div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <span className="text-xs text-gray-500">{count} skills</span>
            </div>
        </motion.div>
    );
}

// Animated counter
function AnimatedStat({ value, label, delay = 0 }: { value: number; label: string; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                let start = 0;
                const end = value;
                const duration = 1500;
                const increment = end / (duration / 16);

                const counter = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        setCount(end);
                        clearInterval(counter);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, 16);

                return () => clearInterval(counter);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [isInView, value, delay]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: delay / 1000 }}
            className="text-center"
        >
            <div className="glass-card rounded-2xl p-4 md:p-6 border border-white/10 hover:border-primary/30 transition-all duration-300">
                <span className="text-3xl md:text-4xl font-bold text-gradient">
                    {count}+
                </span>
                <p className="text-gray-400 text-xs md:text-sm mt-1">{label}</p>
            </div>
        </motion.div>
    );
}

// Quote component
function InspiringQuote() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-16"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 rounded-3xl blur-xl" />
            <div className="relative glass-card rounded-3xl p-8 md:p-10 border border-white/10 overflow-hidden">
                {/* Decorative quote marks */}
                <Quote className="absolute top-4 left-4 w-12 h-12 text-primary/20" />
                <Quote className="absolute bottom-4 right-4 w-12 h-12 text-secondary/20 rotate-180" />

                {/* Quote content */}
                <div className="relative z-10 text-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-2xl md:text-3xl font-light text-white italic mb-6"
                    >
                        &ldquo;{portfolioData.quote.text}&rdquo;
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="flex flex-col items-center gap-1"
                    >
                        <span className="text-gradient font-semibold text-lg">
                            — {portfolioData.quote.author}
                        </span>
                        <span className="text-gray-500 text-sm">
                            {portfolioData.quote.context}
                        </span>
                    </motion.div>
                </div>

                {/* Animated border gradient */}
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-[1px] bg-gradient-conic from-primary via-purple-500 to-secondary rounded-3xl opacity-20 -z-10"
                    style={{ padding: "1px" }}
                />
            </div>
        </motion.div>
    );
}

export default function Skills() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    const totalSkills =
        portfolioData.skills.laboratory.length +
        portfolioData.skills.computational.length +
        portfolioData.skills.aiExpertise.length;

    return (
        <SectionWrapper id="skills" title="Skills & Expertise" subtitle="Bridging wet-lab biology with AI-driven computational approaches">
            <div ref={containerRef} className="relative">
                {/* Animated background gradient */}
                <motion.div
                    className="absolute inset-0 -z-10 opacity-30"
                    style={{ y: backgroundY }}
                >
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-[100px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px]" />
                </motion.div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 md:gap-6 mb-12">
                    <AnimatedStat value={portfolioData.skills.laboratory.length} label="Lab Techniques" delay={0} />
                    <AnimatedStat value={portfolioData.skills.aiExpertise.length} label="AI Expertise" delay={150} />
                    <AnimatedStat value={portfolioData.skills.computational.length} label="Computational" delay={300} />
                </div>

                {/* Skills Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Laboratory Techniques */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="glass-card rounded-2xl p-5 border border-primary/20 hover:border-primary/40 transition-all duration-500"
                    >
                        <CategoryHeader
                            icon={FlaskConical}
                            title="Laboratory Techniques"
                            count={portfolioData.skills.laboratory.length}
                            variant="cyan"
                        />
                        <div className="space-y-2">
                            {portfolioData.skills.laboratory.map((skill, index) => (
                                <SkillCard key={skill} skill={skill} variant="cyan" index={index} />
                            ))}
                        </div>
                    </motion.div>

                    {/* AI Expertise */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="glass-card rounded-2xl p-5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500"
                    >
                        <CategoryHeader
                            icon={Brain}
                            title="AI Expertise"
                            count={portfolioData.skills.aiExpertise.length}
                            variant="purple"
                        />
                        <div className="space-y-2">
                            {portfolioData.skills.aiExpertise.map((skill, index) => (
                                <SkillCard key={skill} skill={skill} variant="purple" index={index} />
                            ))}
                        </div>

                        {/* Special AI badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                            viewport={{ once: true }}
                            className="mt-4 flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-primary/20 border border-purple-500/30"
                        >
                            <Sparkles className="w-3 h-3 text-purple-400" />
                            <span className="text-xs font-medium text-purple-300">Cutting-Edge AI</span>
                        </motion.div>
                    </motion.div>

                    {/* Computational & Analytical */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="glass-card rounded-2xl p-5 border border-secondary/20 hover:border-secondary/40 transition-all duration-500"
                    >
                        <CategoryHeader
                            icon={Cpu}
                            title="Computational & Analytical"
                            count={portfolioData.skills.computational.length}
                            variant="magenta"
                        />
                        <div className="space-y-2">
                            {portfolioData.skills.computational.map((skill, index) => (
                                <SkillCard key={skill} skill={skill} variant="magenta" index={index} />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Inspiring Quote */}
                <InspiringQuote />

                {/* Bottom decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                />
            </div>
        </SectionWrapper>
    );
}
