"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionWrapper, { staggerContainer, fadeInUp } from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Award, GraduationCap, BookOpen, Microscope, Dna, FlaskConical } from "lucide-react";

const certIcons = [GraduationCap, Microscope, BookOpen, Dna, FlaskConical, Award];

export default function Certifications() {
    return (
        <SectionWrapper id="certifications" title="Certifications" subtitle="Professional development and specialized training">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {portfolioData.certifications.map((cert, index) => {
                    const Icon = certIcons[index % certIcons.length];
                    return (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.03, y: -4 }}
                            className="glass-card rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-all duration-300 group cursor-default"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-gray-300 text-sm leading-relaxed font-medium">
                                        {cert}
                                    </p>
                                </div>
                            </div>

                            {/* Decorative gradient line */}
                            <div className="mt-4 h-[2px] w-full bg-gradient-to-r from-primary/50 via-secondary/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    );
                })}
            </motion.div>
        </SectionWrapper>
    );
}
