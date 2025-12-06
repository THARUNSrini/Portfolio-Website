"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionWrapper, { staggerContainer, fadeInUp } from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import { portfolioData } from "@/lib/data";
import { Dna, ExternalLink, Code2, FlaskConical } from "lucide-react";

export default function Projects() {
    const getProjectIcon = (index: number) => {
        if (index === 0) return <Dna className="w-6 h-6" />;
        if (index === 1) return <Code2 className="w-6 h-6" />;
        return <FlaskConical className="w-6 h-6" />;
    };

    return (
        <SectionWrapper id="projects" title="Projects" subtitle="Research and development work across wetlab and computational biology">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid md:grid-cols-2 gap-6"
            >
                {portfolioData.projects.map((project, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                        <GlassCard
                            glowColor={index === 0 ? "cyan" : index === 1 ? "magenta" : "white"}
                            className="h-full"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                    ${index === 0 ? "bg-primary/20 text-primary" :
                                            index === 1 ? "bg-secondary/20 text-secondary" :
                                                "bg-white/10 text-white/70"}
                  `}>
                                        {getProjectIcon(index)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white leading-tight">
                                            {project.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-400 text-sm mb-4 flex-grow">
                                    {project.desc}
                                </p>

                                {/* Tech stack */}
                                {project.tech && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.split(", ").map((tech, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-2 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Links */}
                                {project.links && project.links.length > 0 && (
                                    <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                                        {project.links.map((link, i) => (
                                            <a
                                                key={i}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors group"
                                            >
                                                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                                <span>Live Demo {i + 1}</span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </motion.div>
        </SectionWrapper>
    );
}
