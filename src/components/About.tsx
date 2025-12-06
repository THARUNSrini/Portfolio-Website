"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionWrapper, { fadeInUp } from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { User } from "lucide-react";

export default function About() {
    return (
        <SectionWrapper id="about" title="About Me">
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="flex flex-col lg:flex-row items-center gap-12"
            >
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="relative">
                        {/* Outer glow ring */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-xl opacity-50 animate-pulse" />

                        {/* Avatar container */}
                        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden glass-card border-2 border-primary/30 flex items-center justify-center">
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                <User className="w-24 h-24 md:w-32 md:h-32 text-white/50" />
                            </div>
                        </div>

                        {/* Decorative orbiting dots */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(0,247,255,0.8)]" />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                        >
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_rgba(255,0,170,0.8)]" />
                        </motion.div>
                    </div>
                </div>

                {/* Text content */}
                <div className="flex-1 text-center lg:text-left">
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl text-gray-300 leading-relaxed"
                    >
                        {portfolioData.heroSummary}
                    </motion.p>

                    {/* Location badge */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30"
                    >
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-gray-400 text-sm">
                            Currently based in <span className="text-white">{portfolioData.contact.location}</span>
                        </span>
                    </motion.div>
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
