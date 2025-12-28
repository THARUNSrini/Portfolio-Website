"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { ExternalLink, Star, FlaskConical, Rocket, ArrowUpRight } from "lucide-react";

// Tech tag
function TechTag({ tech, index }: { tech: string; index: number }) {
    return (
        <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="px-3 py-1 border border-primary/30 text-primary font-mono text-xs hover:bg-primary/10 transition-colors cursor-default"
        >
            {tech}
        </motion.span>
    );
}

// Project card with brutalist styling
function ProjectCard({
    project,
    index,
    featured = false
}: {
    project: typeof portfolioData.projects[0];
    index: number;
    featured?: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-30px" });

    const borderColor = featured ? "border-primary" : "border-secondary";
    const shadowColor = featured ? "6px 6px 0px 0px #FFB800" : "4px 4px 0px 0px #22C55E";
    const hoverShadow = featured ? "8px 8px 0px 0px #FFB800" : "6px 6px 0px 0px #22C55E";

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group h-full"
        >
            <motion.div
                className={`relative bg-surface border-2 ${borderColor} h-full flex flex-col transition-all duration-200`}
                style={{ boxShadow: shadowColor }}
                whileHover={{ x: -3, y: -3 }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = hoverShadow)}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = shadowColor)}
            >
                {/* Featured banner */}
                {featured && (
                    <div className="bg-primary text-background px-4 py-2 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span className="font-mono text-xs uppercase tracking-wider font-bold">
                            Current Project
                        </span>
                        <Rocket className="w-4 h-4 ml-auto" />
                    </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className={`w-10 h-10 border ${borderColor} bg-surface flex items-center justify-center flex-shrink-0`}>
                            <FlaskConical className={`w-5 h-5 ${featured ? 'text-primary' : 'text-secondary'}`} />
                        </div>
                        <h3 className="font-display text-lg font-semibold text-paper-cream leading-tight">
                            {project.title}
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="font-body text-sm text-paper-muted mb-4 flex-1">
                        {project.desc}
                    </p>

                    {/* Tech stack */}
                    {project.tech && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.split(', ').map((tech, i) => (
                                <TechTag key={i} tech={tech} index={i} />
                            ))}
                        </div>
                    )}

                    {/* Links */}
                    {project.links && project.links.length > 0 && (
                        <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                            {project.links.map((link, i) => (
                                <motion.a
                                    key={i}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 border border-primary text-primary font-mono text-xs uppercase tracking-wider hover:bg-primary hover:text-background transition-all"
                                    whileHover={{ x: 2 }}
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    View
                                </motion.a>
                            ))}
                        </div>
                    )}
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8">
                    <div className={`absolute top-2 right-2 w-4 h-4 border-t border-r ${borderColor} opacity-50`} />
                </div>

                {/* Hover indicator */}
                <motion.div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ArrowUpRight className={`w-5 h-5 ${featured ? 'text-primary' : 'text-secondary'}`} />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const featuredProjects = portfolioData.projects.filter(p => p.featured);
    const regularProjects = portfolioData.projects.filter(p => !p.featured);

    return (
        <SectionWrapper
            id="projects"
            title="Projects"
            subtitle="Research projects and applications bridging biology with technology"
        >
            <div className="relative">
                {/* Featured project - full width */}
                {featuredProjects.map((project, index) => (
                    <div key={index} className="mb-8">
                        <ProjectCard project={project} index={0} featured />
                    </div>
                ))}

                {/* Regular projects grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index + 1} />
                    ))}
                </div>

                {/* Bottom indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-12 flex items-center gap-4"
                >
                    <div className="w-12 h-px bg-primary/30" />
                    <span className="font-mono text-xs text-paper-muted uppercase tracking-wider">
                        More projects available on request
                    </span>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
