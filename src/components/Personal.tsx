"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Globe, Microscope, Heart } from "lucide-react";

// Info card with glass styling
function InfoCard({
    icon: Icon,
    title,
    content,
    delay = 0,
    accent = "cyan"
}: {
    icon: React.ElementType;
    title: string;
    content: string;
    delay?: number;
    accent?: "cyan" | "green" | "amber";
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    const styles = {
        cyan: {
            border: "border-primary/20 hover:border-primary/50 text-primary glow-cyan",
            bg: "bg-primary/10",
        },
        green: {
            border: "border-secondary/20 hover:border-secondary/50 text-secondary glow-green",
            bg: "bg-secondary/10",
        },
        amber: {
            border: "border-tertiary/20 hover:border-tertiary/50 text-tertiary glow-amber",
            bg: "bg-tertiary/10",
        }
    };

    const s = styles[accent];

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
            animate={isInView ? { opacity: 1, clipPath: 'inset(0% 0 0 0)' } : {}}
            transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group h-full"
        >
            <div className={`relative glass-panel p-6 md:p-8 h-full transition-all duration-300 overflow-hidden ${s.border}`}>
                {/* Subtle gradient hover effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${s.bg.replace('/10', '/5')}`} />
                
                {/* Header */}
                <div className="flex flex-col mb-4">
                    <div className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4 transition-colors group-hover:border-current group-hover:shadow-[0_0_15px_currentColor] ${s.bg}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-2xl font-medium text-white">
                        {title}
                    </h3>
                </div>

                {/* Content */}
                <p className="font-body text-paper-muted text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                    {content}
                </p>
            </div>
        </motion.div>
    );
}

export default function Personal() {
    return (
        <SectionWrapper
            id="personal"
            title="Beyond Research"
            subtitle="The person behind the pipette and the code"
        >
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <InfoCard
                    icon={Globe}
                    title="Languages"
                    content={portfolioData.languages}
                    delay={0}
                    accent="cyan"
                />
                <InfoCard
                    icon={Microscope}
                    title="Research Interests"
                    content={portfolioData.interests}
                    delay={0.15}
                    accent="green"
                />
                <InfoCard
                    icon={Heart}
                    title="Beyond the Lab"
                    content={portfolioData.hobbies}
                    delay={0.3}
                    accent="amber"
                />
            </div>

            {/* Decorative line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            />
        </SectionWrapper>
    );
}
