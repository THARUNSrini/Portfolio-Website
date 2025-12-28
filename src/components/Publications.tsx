"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { BookOpen, FileText, ExternalLink, Library } from "lucide-react";

// Publication card with brutalist styling
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

    const borderColor = isBookChapter ? "border-secondary" : "border-primary";
    const shadowColor = isBookChapter ? "4px 4px 0px 0px #22C55E" : "4px 4px 0px 0px #FFB800";
    const hoverShadow = isBookChapter ? "6px 6px 0px 0px #22C55E" : "6px 6px 0px 0px #FFB800";

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group"
        >
            <motion.a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block bg-surface border-2 ${borderColor} p-6 transition-all duration-200`}
                style={{ boxShadow: shadowColor }}
                whileHover={{ x: -3, y: -3 }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = hoverShadow)}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = shadowColor)}
            >
                <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 border ${borderColor} bg-surface flex items-center justify-center flex-shrink-0`}>
                        {isBookChapter ? (
                            <Library className="w-5 h-5 text-secondary" />
                        ) : (
                            <FileText className="w-5 h-5 text-primary" />
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Type badge */}
                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 border ${isBookChapter ? 'border-secondary text-secondary' : 'border-primary text-primary'} font-mono text-xs uppercase tracking-wider mb-3`}>
                            <BookOpen className="w-3 h-3" />
                            {publication.type}
                        </div>

                        {/* Citation */}
                        <p className="font-body text-paper-cream text-sm leading-relaxed mb-2">
                            {publication.citation}
                        </p>

                        {/* Journal */}
                        <p className="font-mono text-xs text-paper-muted mb-3">
                            {publication.journal}
                        </p>

                        {/* DOI */}
                        <div className="flex items-center gap-2 text-xs">
                            <span className="text-paper-muted">DOI:</span>
                            <span className={`${isBookChapter ? 'text-secondary' : 'text-primary'} flex items-center gap-1`}>
                                {publication.doi}
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8">
                    <div className={`absolute top-2 right-2 w-4 h-4 border-t border-r ${borderColor} opacity-50`} />
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
            subtitle="Peer-reviewed research and book chapters in CRISPR and AI"
        >
            <div className="relative">
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
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-12 flex items-center gap-4"
                >
                    <div className="w-12 h-px bg-primary/30" />
                    <div className="flex items-center gap-3 px-4 py-2 border border-white/10 bg-surface">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <span className="font-mono text-sm text-paper-muted">
                            <span className="text-paper-cream font-bold text-lg">{portfolioData.publications.length}</span> peer-reviewed publications
                        </span>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
