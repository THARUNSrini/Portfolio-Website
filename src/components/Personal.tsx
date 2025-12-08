"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Globe, Microscope, Heart, Sparkles } from "lucide-react";

// Animated info card with 3D hover effect
function InfoCard({
    icon: Icon,
    title,
    content,
    delay = 0,
    variant = "teal"
}: {
    icon: React.ElementType;
    title: string;
    content: string;
    delay?: number;
    variant?: "teal" | "green" | "gradient";
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    const colors = {
        teal: {
            bg: "from-primary/10 to-primary/5",
            border: "border-primary/30 hover:border-primary/60",
            icon: "bg-primary/20 text-primary",
            glow: "hover:shadow-[0_0_40px_rgba(0,229,255,0.2)]"
        },
        green: {
            bg: "from-secondary/10 to-secondary/5",
            border: "border-secondary/30 hover:border-secondary/60",
            icon: "bg-secondary/20 text-secondary",
            glow: "hover:shadow-[0_0_40px_rgba(0,255,159,0.2)]"
        },
        gradient: {
            bg: "from-primary/10 via-secondary/5 to-primary/10",
            border: "border-white/20 hover:border-primary/50",
            icon: "bg-gradient-to-br from-primary/20 to-secondary/20 text-white",
            glow: "hover:shadow-[0_0_40px_rgba(0,229,255,0.15)]"
        }
    };

    const color = colors[variant];

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40, rotateX: -15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ delay, duration: 0.7, ease: "easeOut" }}
            whileHover={{
                y: -8,
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.3 }
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="group perspective-1000"
        >
            <div className={`
                glass-card rounded-2xl p-6 h-full
                bg-gradient-to-br ${color.bg}
                border ${color.border}
                ${color.glow}
                transition-all duration-500
            `}>
                {/* Header with icon */}
                <div className="flex items-center gap-4 mb-4">
                    <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`w-12 h-12 rounded-xl ${color.icon} flex items-center justify-center`}
                    >
                        <Icon className="w-6 h-6" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white group-hover:text-gradient transition-all">
                        {title}
                    </h3>
                </div>

                {/* Content with animated reveal */}
                <motion.p
                    className="text-gray-300 text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: delay + 0.2, duration: 0.5 }}
                >
                    {content}
                </motion.p>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl pointer-events-none">
                    <div className={`absolute top-0 right-0 w-10 h-10 bg-gradient-to-bl ${variant === 'teal' ? 'from-primary/20' : variant === 'green' ? 'from-secondary/20' : 'from-primary/10'} to-transparent`} />
                </div>

                {/* Animated sparkle on hover */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4"
                >
                    <Sparkles className="w-4 h-4 text-primary/50" />
                </motion.div>
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
            <div className="grid md:grid-cols-3 gap-6">
                <InfoCard
                    icon={Globe}
                    title="Languages"
                    content={portfolioData.languages}
                    delay={0}
                    variant="teal"
                />
                <InfoCard
                    icon={Microscope}
                    title="Research Interests"
                    content={portfolioData.interests}
                    delay={0.1}
                    variant="green"
                />
                <InfoCard
                    icon={Heart}
                    title="Beyond the Lab"
                    content={portfolioData.hobbies}
                    delay={0.2}
                    variant="gradient"
                />
            </div>

            {/* Decorative animated line */}
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
