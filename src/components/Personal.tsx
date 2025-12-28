"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Globe, Microscope, Heart } from "lucide-react";

// Info card with brutalist styling
function InfoCard({
    icon: Icon,
    title,
    content,
    delay = 0,
    variant = "primary"
}: {
    icon: React.ElementType;
    title: string;
    content: string;
    delay?: number;
    variant?: "primary" | "secondary" | "tertiary";
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    const colors = {
        primary: {
            border: "border-primary",
            shadow: "4px 4px 0px 0px #FFB800",
            hoverShadow: "6px 6px 0px 0px #FFB800",
            icon: "text-primary"
        },
        secondary: {
            border: "border-secondary",
            shadow: "4px 4px 0px 0px #22C55E",
            hoverShadow: "6px 6px 0px 0px #22C55E",
            icon: "text-secondary"
        },
        tertiary: {
            border: "border-tertiary",
            shadow: "4px 4px 0px 0px #F472B6",
            hoverShadow: "6px 6px 0px 0px #F472B6",
            icon: "text-tertiary"
        }
    };

    const c = colors[variant];

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.6 }}
            className="group h-full"
        >
            <motion.div
                className={`relative bg-surface border-2 ${c.border} p-6 h-full transition-all duration-200`}
                style={{ boxShadow: c.shadow }}
                whileHover={{ x: -2, y: -2 }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = c.hoverShadow)}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = c.shadow)}
            >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                    <div className={`w-10 h-10 border ${c.border} bg-surface flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${c.icon}`} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-paper-cream">
                        {title}
                    </h3>
                </div>

                {/* Content */}
                <p className="font-body text-sm text-paper-muted leading-relaxed">
                    {content}
                </p>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-8 h-8">
                    <div className={`absolute bottom-2 right-2 w-4 h-4 border-b border-r ${c.border} opacity-50`} />
                </div>
            </motion.div>
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
            <div className="grid md:grid-cols-3 gap-6">
                <InfoCard
                    icon={Globe}
                    title="Languages"
                    content={portfolioData.languages}
                    delay={0}
                    variant="primary"
                />
                <InfoCard
                    icon={Microscope}
                    title="Research Interests"
                    content={portfolioData.interests}
                    delay={0.1}
                    variant="secondary"
                />
                <InfoCard
                    icon={Heart}
                    title="Beyond the Lab"
                    content={portfolioData.hobbies}
                    delay={0.2}
                    variant="tertiary"
                />
            </div>

            {/* Decorative line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            />
        </SectionWrapper>
    );
}
