"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Target, Zap, Atom, FlaskConical } from "lucide-react";

// Highlight Card with brutalist styling
function HighlightCard({
    icon: Icon,
    title,
    description,
    variant = "primary",
    delay = 0
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    variant?: "primary" | "secondary";
    delay?: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true });

    const colors = {
        primary: {
            border: "border-primary",
            shadow: "4px 4px 0px 0px #FFB800",
            hoverShadow: "6px 6px 0px 0px #FFB800",
            iconBg: "bg-primary/10 border-primary/30",
            iconColor: "text-primary"
        },
        secondary: {
            border: "border-secondary",
            shadow: "4px 4px 0px 0px #22C55E",
            hoverShadow: "6px 6px 0px 0px #22C55E",
            iconBg: "bg-secondary/10 border-secondary/30",
            iconColor: "text-secondary"
        }
    };

    const c = colors[variant];

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.6 }}
            className={`relative bg-surface border-2 ${c.border} p-6 transition-all duration-200 group cursor-default`}
            style={{ boxShadow: c.shadow }}
            whileHover={{ x: -2, y: -2 }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = c.hoverShadow)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = c.shadow)}
        >
            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${c.iconBg} border flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${c.iconColor}`} />
                </div>
                <div>
                    <h4 className="font-display text-xl font-semibold text-paper-cream mb-2">
                        {title}
                    </h4>
                    <p className="text-paper-muted text-sm font-body leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-8 h-8">
                <div className={`absolute top-2 right-2 w-4 h-4 border-t border-r ${c.border} opacity-50`} />
            </div>
        </motion.div>
    );
}

export default function About() {
    const contentRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(contentRef, { once: true, margin: "-100px" });

    return (
        <SectionWrapper
            id="about"
            title="About Me"
            subtitle="Where wet-lab meets machine learning"
        >
            <div ref={contentRef} className="relative">
                {/* Floating decorative elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.1 } : {}}
                    className="absolute -top-10 -right-10 pointer-events-none"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        <Atom className="w-32 h-32 text-primary" />
                    </motion.div>
                </motion.div>

                {/* Main content card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="relative bg-surface border-2 border-white/10 p-8 md:p-12 mb-8"
                >
                    {/* Corner brackets */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-secondary" />

                    {/* Summary text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="font-body text-lg md:text-xl text-paper-cream leading-relaxed"
                    >
                        {portfolioData.summary}
                    </motion.p>

                    {/* Decorative line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="my-10 h-px bg-gradient-to-r from-primary/40 via-secondary/20 to-transparent origin-left"
                    />

                    {/* Highlight cards grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <HighlightCard
                            icon={Target}
                            title="Current Focus"
                            description="Building protein mutation prediction pipelines with ESM-3 + AlphaFold at Leibniz Institute for Plant Biochemistry"
                            variant="primary"
                            delay={0.4}
                        />
                        <HighlightCard
                            icon={Zap}
                            title="My Mission"
                            description="Leveraging AI to decode the molecular language of life and engineer solutions that matter"
                            variant="secondary"
                            delay={0.5}
                        />
                    </div>
                </motion.div>

                {/* Bottom tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="flex items-center gap-4"
                >
                    <FlaskConical className="w-5 h-5 text-primary" />
                    <span className="font-mono text-sm text-paper-muted">
                        Passionate about transforming biological data into actionable insights
                    </span>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
