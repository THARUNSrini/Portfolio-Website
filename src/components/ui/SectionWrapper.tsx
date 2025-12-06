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
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient">{title}</span>
                    </h2>
                    {subtitle && (
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
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
