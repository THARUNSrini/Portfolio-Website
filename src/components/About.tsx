"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Dna, Sparkles, Zap, Rocket, Brain, FlaskConical, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Animated floating icon
function FloatingIcon({ icon: Icon, className, delay = 0 }: { icon: React.ElementType; className: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            className={`absolute ${className}`}
        >
            <motion.div
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay }}
            >
                <Icon className="w-8 h-8 text-primary/50" />
            </motion.div>
        </motion.div>
    );
}

// Animated text reveal with highlighting
function AnimatedParagraph({ text, delay = 0 }: { text: string; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.8, ease: "easeOut" }}
            className="relative"
        >
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                {text}
            </p>
        </motion.div>
    );
}

// Highlight Card
function HighlightCard({
    icon: Icon,
    title,
    description,
    variant = "teal",
    delay = 0
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    variant?: "teal" | "green";
    delay?: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true });

    const colors = {
        teal: {
            bg: "from-primary/10 to-primary/5",
            border: "border-primary/30 hover:border-primary/60",
            icon: "bg-primary/20 text-primary",
            glow: "hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]"
        },
        green: {
            bg: "from-secondary/10 to-secondary/5",
            border: "border-secondary/30 hover:border-secondary/60",
            icon: "bg-secondary/20 text-secondary",
            glow: "hover:shadow-[0_0_30px_rgba(0,255,159,0.15)]"
        }
    };

    const color = colors[variant];

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`
                glass-card rounded-xl p-5 border ${color.border} ${color.glow}
                bg-gradient-to-br ${color.bg}
                transition-all duration-300
            `}
        >
            <div className="flex items-start gap-4">
                <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-12 h-12 rounded-xl ${color.icon} flex items-center justify-center flex-shrink-0`}
                >
                    <Icon className="w-6 h-6" />
                </motion.div>
                <div>
                    <h4 className="font-semibold text-white mb-1">{title}</h4>
                    <p className="text-gray-400 text-sm">{description}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function About() {
    return (
        <SectionWrapper
            id="about"
            title="About Me"
            subtitle="Where wet-lab meets machine learning"
        >
            <div className="relative max-w-4xl mx-auto">
                {/* Floating decorative icons */}
                <FloatingIcon icon={Dna} className="top-0 left-0 -translate-x-12" delay={0} />
                <FloatingIcon icon={Brain} className="top-1/4 right-0 translate-x-12" delay={0.2} />
                <FloatingIcon icon={FlaskConical} className="bottom-1/4 left-0 -translate-x-12" delay={0.4} />
                <FloatingIcon icon={Rocket} className="bottom-0 right-0 translate-x-12" delay={0.6} />

                {/* Main summary - full width */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Glowing background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-3xl blur-xl" />

                    <div className="relative glass-card rounded-3xl p-8 md:p-10 border border-white/10 overflow-hidden">
                        {/* Animated corner decorations */}
                        <motion.div
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-0 left-0 w-20 h-20"
                        >
                            <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
                        </motion.div>
                        <motion.div
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                            className="absolute bottom-0 right-0 w-20 h-20"
                        >
                            <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-secondary/40 rounded-br-lg" />
                        </motion.div>

                        {/* Summary text */}
                        <AnimatedParagraph text={portfolioData.summary} delay={0.2} />

                        {/* Animated line separator */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="my-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                        />

                        {/* Highlight cards */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <HighlightCard
                                icon={Target}
                                title="Current Focus"
                                description="Building protein mutation prediction pipelines with ESM-3 + AlphaFold at Leibniz Institute for Plant Biochemistry"
                                variant="teal"
                                delay={0.3}
                            />
                            <HighlightCard
                                icon={Zap}
                                title="My Mission"
                                description="Leveraging AI to decode the molecular language of life and engineer solutions that matter"
                                variant="green"
                                delay={0.4}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Animated tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-8 flex items-center justify-center gap-3"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        <Dna className="w-5 h-5 text-primary/50" />
                    </motion.div>
                    <span className="text-gray-500 text-sm italic">
                        Passionate about transforming biological data into actionable insights
                    </span>
                    <Sparkles className="w-4 h-4 text-secondary/50" />
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
