"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { BookOpen, FileText, ExternalLink, Library } from "lucide-react";

// Publication card with glass styling
function PublicationCard({
    publication,
    index
}: {
    publication: typeof portfolioData.publications[0];
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-30px" });
    const isBookChapter = publication.type === "Book Chapter";

    const accentColor = isBookChapter ? "secondary" : "primary";

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group"
        >
            <motion.a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-6 transition-all duration-300 relative overflow-hidden glass-panel border-white/5 hover:border-${accentColor}/30`}
            >
                 {/* Subtle gradient hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-${accentColor}/0 to-${accentColor}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="flex flex-col sm:flex-row items-start gap-4 relative z-10">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg border border-${accentColor}/20 bg-${accentColor}/10 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_15px_rgba(var(--${accentColor}-rgb),0.3)] transition-all duration-300`}>
                        {isBookChapter ? (
                            <Library className="w-6 h-6 text-secondary" />
                        ) : (
                            <FileText className="w-6 h-6 text-primary" />
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Type badge */}
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-${accentColor}/10 border border-${accentColor}/20 text-${accentColor} font-mono text-[10px] uppercase tracking-widest mb-3 glow-${accentColor}-sm`}>
                            <BookOpen className="w-3 h-3" />
                            {publication.type}
                        </div>

                        {/* Citation */}
                        <p className="font-body text-white text-sm md:text-base leading-relaxed mb-3 group-hover:text-white transition-colors">
                            {publication.citation}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 font-mono text-xs">
                             {/* Journal */}
                            <span className="text-paper-muted">
                                {publication.journal}
                            </span>
                            
                            <span className="hidden sm:block text-white/20">•</span>

                            {/* DOI */}
                            <div className="flex items-center gap-1.5">
                                <span className="text-paper-dim">DOI:</span>
                                <span className={`text-${accentColor} flex items-center gap-1.5 hover:underline decoration-${accentColor}/30 underline-offset-4`}>
                                    {publication.doi}
                                    <ExternalLink className="w-3 h-3" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.a>
        </motion.div>
    );
}

export default function Publications() {
    return (
        <SectionWrapper
            id="publications"
            title="Publications"
            subtitle="Peer-reviewed research and book chapters in CRISPR, immunology, and targeted therapies"
        >
            <div className="relative max-w-4xl mx-auto">
                {/* Publications list */}
                <div className="space-y-4">
                    {portfolioData.publications.map((pub, index) => (
                        <PublicationCard key={index} publication={pub} index={index} />
                    ))}
                </div>

                {/* Publication count */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-12 flex items-center gap-4 justify-center"
                >
                    <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/30" />
                    <div className="flex items-center gap-3 px-5 py-2.5 rounded-full glass-panel border-primary/20 bg-primary/5">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <span className="font-mono text-sm text-paper-muted">
                            <span className="text-white font-bold text-base">{portfolioData.publications.length}</span> peer-reviewed works
                        </span>
                    </div>
                    <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/30" />
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
