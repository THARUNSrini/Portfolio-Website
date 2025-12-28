"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
    children: React.ReactNode;
    id: string;
    className?: string;
    title?: string;
    subtitle?: string;
}

export default function SectionWrapper({
    children,
    id,
    className = "",
    title,
    subtitle
}: SectionWrapperProps) {
    return (
        <section
            id={id}
            className={`relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}
        >
            {title && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-20"
                >
                    {/* Section label */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="w-12 h-px bg-primary" />
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                            {id.replace(/-/g, ' ')}
                        </span>
                    </motion.div>

                    {/* Title with serif font */}
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-paper-cream mb-6">
                        {title}
                    </h2>

                    {/* Subtitle */}
                    {subtitle && (
                        <p className="text-paper-muted text-lg max-w-2xl font-body">
                            {subtitle}
                        </p>
                    )}

                    {/* Decorative divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-8 h-px bg-gradient-to-r from-primary/50 via-secondary/30 to-transparent origin-left max-w-md"
                    />
                </motion.div>
            )}
            {children}
        </section>
    );
}

export const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    },
};

export const fadeIn = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 0.6,
        }
    },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
        }
    },
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    },
};

export const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    },
};
