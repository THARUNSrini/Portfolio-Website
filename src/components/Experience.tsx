"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionWrapper, { staggerContainer, fadeInUp } from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import { portfolioData } from "@/lib/data";
import { Briefcase, Clock, FlaskConical } from "lucide-react";

export default function Experience() {
    return (
        <SectionWrapper id="experience" title="Experience" subtitle="Hands-on research and industry experience">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {portfolioData.experience.map((exp, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                        <GlassCard glowColor={index === 0 ? "cyan" : index === 1 ? "magenta" : "white"}>
                            <div className="flex flex-col h-full">
                                {/* Icon */}
                                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center mb-4
                  ${index === 0 ? "bg-primary/20 text-primary" :
                                        index === 1 ? "bg-secondary/20 text-secondary" :
                                            "bg-white/10 text-white"}
                `}>
                                    {index === 0 ? <FlaskConical className="w-6 h-6" /> :
                                        index === 1 ? <Briefcase className="w-6 h-6" /> :
                                            <Briefcase className="w-6 h-6" />}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {exp.title}
                                </h3>

                                {/* Organization */}
                                <p className="text-gray-400 text-sm mb-4 flex-grow">
                                    {exp.organization}
                                </p>

                                {/* Status badge */}
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span className={`
                    text-sm px-2 py-1 rounded-full
                    ${exp.status === "ongoing"
                                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                            : "bg-white/10 text-gray-400 border border-white/10"
                                        }
                  `}>
                                        {exp.status === "ongoing" ? "🔬 Ongoing" : exp.status}
                                    </span>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </motion.div>
        </SectionWrapper>
    );
}
