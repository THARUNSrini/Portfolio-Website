"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionWrapper, { staggerContainer, fadeInUp } from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { GraduationCap, MapPin, Sparkles } from "lucide-react";

export default function Education() {
    return (
        <SectionWrapper id="education" title="Education" subtitle="My academic journey in biotechnology and life sciences">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
            >
                {/* Timeline line */}
                <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-[1px]">
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="w-full bg-gradient-to-b from-primary via-secondary to-primary"
                    />
                </div>

                {/* Timeline items */}
                <div className="space-y-16">
                    {portfolioData.education.map((edu, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className={`relative flex items-start gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 z-10">
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-background border-4 border-primary flex items-center justify-center">
                                        <GraduationCap className="w-4 h-4 text-primary" />
                                    </div>
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 rounded-full bg-primary/30 blur-md animate-pulse" />
                                </div>
                            </div>

                            {/* Content card */}
                            <div className={`
                ml-16 md:ml-0 md:w-[calc(50%-40px)]
                ${index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}
              `}>
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    className="glass-card rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 group cursor-default"
                                >
                                    {/* Year badge */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
                                        <span>{edu.year}</span>
                                    </div>

                                    {/* Degree */}
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
                                        {edu.degree}
                                    </h3>

                                    {/* School */}
                                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                                        <MapPin className="w-4 h-4 text-secondary" />
                                        <span>{edu.school}</span>
                                    </div>

                                    {/* Highlight */}
                                    {edu.highlight && (
                                        <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                                            <Sparkles className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                                            <p className="text-sm text-gray-300">{edu.highlight}</p>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
