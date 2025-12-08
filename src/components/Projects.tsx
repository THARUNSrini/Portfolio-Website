"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Cpu, ExternalLink, Star, FlaskConical, GitBranch, Sparkles, Zap, Rocket } from "lucide-react";

// Floating particles around featured project
function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${10 + Math.random() * 80}%`,
                        backgroundColor: i % 2 === 0 ? '#00e5ff' : '#00ff9f',
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, (Math.random() - 0.5) * 15, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}

// Enhanced project card with 3D effects
function ProjectCard({
    project,
    index
}: {
    project: typeof portfolioData.projects[0];
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-30px" });
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60, rotateX: -20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
            transition={{
                delay: index * 0.12,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group perspective-1000"
            style={{ transformStyle: "preserve-3d" }}
        >
            <motion.div
                className={`
                    relative glass-card rounded-2xl overflow-hidden 
                    border ${project.featured ? 'border-primary/50' : 'border-white/10'} 
                    transition-all duration-500 h-full flex flex-col
                `}
                animate={{
                    rotateY: isHovered ? 5 : 0,
                    rotateX: isHovered ? -5 : 0,
                    scale: isHovered ? 1.02 : 1,
                    boxShadow: isHovered
                        ? project.featured
                            ? "0 25px 50px -12px rgba(0, 229, 255, 0.3)"
                            : "0 25px 50px -12px rgba(0, 255, 159, 0.2)"
                        : "0 0 0 0 rgba(0, 0, 0, 0)"
                }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Featured project particles */}
                {project.featured && <FloatingParticles />}

                {/* Animated gradient background */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.featured ? 'from-primary/20 via-transparent to-secondary/10' : 'from-secondary/10 via-transparent to-primary/5'}`}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Featured badge with animation */}
                {project.featured && (
                    <motion.div
                        className="relative bg-gradient-to-r from-primary via-teal-400 to-secondary text-navy-900 text-xs font-bold px-4 py-2 flex items-center gap-2 overflow-hidden"
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        style={{ backgroundSize: "200% 200%" }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Star className="w-4 h-4" />
                        </motion.div>
                        CURRENT PROJECT
                        <motion.div
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        />
                        <Rocket className="w-4 h-4 ml-auto" />
                    </motion.div>
                )}

                <div className="relative p-6 flex-1 flex flex-col z-10">
                    {/* Header with animated icon */}
                    <div className="flex items-start gap-4 mb-4">
                        <motion.div
                            className={`w-12 h-12 rounded-xl ${project.featured ? 'bg-gradient-to-br from-primary/30 to-secondary/30' : 'bg-secondary/20'} flex items-center justify-center flex-shrink-0`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <FlaskConical className={`w-6 h-6 ${project.featured ? 'text-white' : 'text-secondary'}`} />
                        </motion.div>
                        <div className="flex-1">
                            <motion.h3
                                className="text-lg font-bold text-white group-hover:text-gradient transition-all leading-tight"
                                animate={{ x: isHovered ? 3 : 0 }}
                            >
                                {project.title}
                            </motion.h3>
                            {project.featured && (
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: isHovered ? "100%" : "0%" }}
                                    className="h-0.5 bg-gradient-to-r from-primary to-secondary mt-1"
                                />
                            )}
                        </div>
                    </div>

                    {/* Description with animated reveal */}
                    <motion.p
                        className="text-gray-400 text-sm mb-4 flex-1"
                        animate={{ opacity: isHovered ? 1 : 0.8 }}
                    >
                        {project.desc}
                    </motion.p>

                    {/* Tech stack with animated chips */}
                    {project.tech && (
                        <motion.div
                            className="flex items-center gap-2 text-xs mb-4 flex-wrap"
                            animate={{ y: isHovered ? -2 : 0 }}
                        >
                            <Cpu className="w-3.5 h-3.5 text-primary/70" />
                            {project.tech.split(', ').map((tech, i) => (
                                <motion.span
                                    key={i}
                                    className="px-2 py-1 rounded-full bg-white/5 text-gray-400"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: index * 0.1 + i * 0.05 }}
                                    whileHover={{
                                        backgroundColor: "rgba(0, 229, 255, 0.2)",
                                        color: "#00e5ff",
                                        scale: 1.05
                                    }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </motion.div>
                    )}

                    {/* Links with animated buttons */}
                    <AnimatePresence>
                        {project.links && project.links.length > 0 && (
                            <motion.div
                                className="flex flex-wrap gap-2 pt-4 border-t border-white/5"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {project.links.map((link, i) => (
                                    <motion.a
                                        key={i}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all"
                                        whileHover={{ scale: 1.05, x: 3 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        View Project
                                        <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                                    </motion.a>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Corner decoration */}
                <motion.div
                    className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden pointer-events-none"
                    animate={{ opacity: isHovered ? 0.5 : 0.2 }}
                >
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/30 rounded-br-lg" />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <SectionWrapper
            id="projects"
            title="Projects"
            subtitle="Research projects and applications bridging biology with technology"
        >
            <div className="relative">
                {/* Background glow */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.1, 0.15, 0.1]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
                    />
                </div>

                {/* Project grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Featured project spans 2 columns */}
                    {portfolioData.projects.filter(p => p.featured).map((project, index) => (
                        <div key={index} className="md:col-span-2 lg:col-span-2">
                            <ProjectCard project={project} index={0} />
                        </div>
                    ))}

                    {/* Regular projects */}
                    {portfolioData.projects.filter(p => !p.featured).map((project, index) => (
                        <ProjectCard key={index} project={project} index={index + 1} />
                    ))}
                </div>

                {/* GitHub indicator with animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-12 flex items-center justify-center gap-3"
                >
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        <GitBranch className="w-5 h-5 text-primary/50" />
                    </motion.div>
                    <p className="text-gray-500 text-sm">
                        More projects available on request
                    </p>
                    <Sparkles className="w-4 h-4 text-secondary/50" />
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
