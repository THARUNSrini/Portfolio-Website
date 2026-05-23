"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Github, ExternalLink, Dna, Database, Terminal, Cpu, X, ChevronRight, Activity, MousePointerClick } from "lucide-react";
import { ProjectsDecorations } from "@/components/SectionDecorations";

// Determine icon based on tech stack
const getProjectIcon = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes('scrna-seq') || t.includes('biology')) return <Dna className="w-5 h-5" />;
    if (t.includes('pytorch') || t.includes('ai') || t.includes('ml')) return <Cpu className="w-5 h-5" />;
    if (t.includes('bioinformatics') || t.includes('database')) return <Database className="w-5 h-5" />;
    return <Terminal className="w-5 h-5" />;
};

// Project card with holographic tilt & glass styling
function ProjectCard({
    project,
    index,
    onClick
}: {
    project: typeof portfolioData.projects[0];
    index: number;
    onClick: () => void;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Calculate holographic tilt on mouse move
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        // Calculate position -0.5 to 0.5
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        setMousePosition({ x, y });
    };

    const tiltX = isHovering ? mousePosition.y * -15 : 0; // Rotate opposite to mouse Y
    const tiltY = isHovering ? mousePosition.x * 15 : 0;  // Rotate same as mouse X

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={onClick}
        >
            <motion.div
                animate={{
                    rotateX: tiltX,
                    rotateY: tiltY,
                    scale: isHovering ? 1.02 : 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => {
                    setIsHovering(false);
                    setMousePosition({ x: 0, y: 0 });
                }}
                className={`h-full flex flex-col p-6 transition-all duration-300 relative overflow-hidden ${
                    project.featured 
                        ? "glass-panel-glow border-primary/20" 
                        : "glass-panel border-white/5 hover:border-primary/30"
                }`}
            >
                {/* Holographic overlay */}
                <div 
                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x * 100 + 50}% ${mousePosition.y * 100 + 50}%, rgba(0, 245, 212, 0.8) 0%, transparent 50%)`
                    }}
                />

                {/* Scanline Sweep overlay */}
                <div className="scanline-overlay z-0" />

                <div className="relative z-10 flex flex-col h-full">
                    {/* Header: Icons */}
                    <div className="flex justify-between items-start mb-6">
                        <div className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${
                            project.featured 
                                ? "bg-primary/10 border-primary/30 text-primary group-hover:shadow-[0_0_15px_rgba(0,245,212,0.3)]" 
                                : "bg-white/5 border-white/10 text-paper-muted group-hover:text-primary group-hover:border-primary/30"
                        }`}>
                            {getProjectIcon(project.tech)}
                        </div>

                        {/* External Links */}
                        <div className="flex items-center gap-3">
                            {project.links?.map((link, i) => (
                                <a
                                    key={i}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-paper-muted hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {link.includes('github') ? (
                                        <Github className="w-5 h-5" />
                                    ) : (
                                        <ExternalLink className="w-5 h-5" />
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                        {project.featured && (
                            <div className="font-mono text-xs text-primary mb-2 tracking-widest uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                Featured Research
                            </div>
                        )}
                        <h3 className={`font-display text-xl font-medium mb-3 group-hover:text-primary transition-colors ${
                            project.featured ? "text-white" : "text-paper-cream"
                        }`}>
                            {project.title}
                        </h3>
                        <p className="font-body text-paper-muted text-sm leading-relaxed mb-6 group-hover:text-white transition-colors duration-300 line-clamp-3">
                            {project.desc}
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="pt-4 border-t border-white/10 mt-auto flex items-center justify-between">
                        <div className="flex flex-wrap gap-2 overflow-hidden max-h-6">
                            {project.tech.split(',').slice(0, 3).map((tech, i) => (
                                <span
                                    key={i}
                                    className="font-mono text-[10px] sm:text-xs text-paper-muted px-2 py-0.5 sm:py-1 bg-white/5 border border-white/5 group-hover:border-primary/20 group-hover:text-primary/90 transition-colors whitespace-nowrap"
                                >
                                    {tech.trim()}
                                </span>
                            ))}
                            {project.tech.split(',').length > 3 && (
                                <span className="font-mono text-[10px] text-paper-muted pt-1">...</span>
                            )}
                        </div>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center gap-2 bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-primary/30 text-primary shadow-[0_0_20px_rgba(0,229,204,0.4)] z-20">
                        <MousePointerClick className="w-8 h-8 animate-bounce" />
                        <span className="font-mono text-sm tracking-widest uppercase font-bold">Click to Expand</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Project Modal overlay
function ProjectModal({ project, onClose }: { project: typeof portfolioData.projects[0], onClose: () => void }) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-y-auto"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#050d1a]/80 backdrop-blur-md" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl max-h-full overflow-y-auto glass-panel border-primary/20 bg-[#050d1a]/90 shadow-[0_0_50px_rgba(0,245,212,0.1)] rounded-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary/20 text-paper-muted hover:text-primary transition-colors border border-transparent hover:border-primary/30"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col md:flex-row h-full">
                    {/* Left/Top Content Area */}
                    <div className="p-6 md:p-10 flex-1 relative overflow-hidden">
                        {/* Decorative gradient orb */}
                        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="w-14 h-14 rounded-xl border border-primary/30 flex items-center justify-center bg-primary/10 text-primary shadow-[0_0_20px_rgba(0,245,212,0.2)]">
                                {getProjectIcon(project.tech)}
                            </div>
                            <div>
                                {project.featured && (
                                    <div className="font-mono text-xs text-primary mb-1 tracking-widest uppercase flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                        Featured Research
                                    </div>
                                )}
                                <h3 className="font-display text-2xl md:text-3xl text-white font-medium">
                                    {project.title}
                                </h3>
                            </div>
                        </div>

                        <p className="font-body text-paper-cream text-lg leading-relaxed mb-10 border-l-2 border-primary/30 pl-4 py-1 relative z-10 bg-gradient-to-r from-primary/5 to-transparent">
                            {project.desc}
                        </p>

                        <div className="relative z-10 space-y-4 mb-10">
                            <h4 className="font-mono text-sm uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                                <Activity className="w-4 h-4" /> Methodology & Execution
                            </h4>
                            
                            {(project as any).details?.map((detail: string, i: number) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="flex items-start gap-3"
                                >
                                    <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                                    <p className="font-body text-paper-muted leading-relaxed">
                                        {detail}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="relative z-10">
                             <h4 className="font-mono text-sm uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                                <Database className="w-4 h-4" /> Technology Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.split(',').map((tech, i) => (
                                    <span
                                        key={i}
                                        className="font-mono text-xs text-white px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-md"
                                    >
                                        {tech.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right side interactions/links (if any) */}
                    {project.links && project.links.length > 0 && (
                        <div className="md:w-64 bg-white/5 border-l border-white/10 p-6 md:p-10 flex flex-col justify-center">
                            <h4 className="font-mono text-sm uppercase tracking-widest text-paper-muted mb-6 text-center md:text-left">
                                External Links
                            </h4>
                            <div className="flex flex-col gap-4">
                                {project.links.map((link, i) => (
                                    <a
                                        key={i}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center md:justify-start gap-3 w-full px-4 py-3 bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-colors text-white rounded-md group"
                                    >
                                        {link.includes('github') ? (
                                            <Github className="w-4 h-4 text-paper-muted group-hover:text-primary transition-colors" />
                                        ) : (
                                            <ExternalLink className="w-4 h-4 text-paper-muted group-hover:text-primary transition-colors" />
                                        )}
                                        <span className="font-mono text-xs truncate">View Project</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof portfolioData.projects[0] | null>(null);

    return (
        <SectionWrapper
            id="projects"
            title="Projects"
            subtitle="Bridging biology and computer science through applied research"
        >
            <ProjectsDecorations />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {portfolioData.projects.map((project, index) => (
                    <ProjectCard 
                        key={index} 
                        project={project} 
                        index={index} 
                        onClick={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal 
                        project={selectedProject} 
                        onClose={() => setSelectedProject(null)} 
                    />
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
