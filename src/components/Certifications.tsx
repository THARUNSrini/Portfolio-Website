"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { BadgeCheck, GraduationCap } from "lucide-react";

// Certification item with glass styling
function CertificationItem({
    certification,
    index
}: {
    certification: string;
    index: number;
}) {
    const itemRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(itemRef, { once: true, margin: "-20px" });

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group"
        >
            <div className="flex items-center gap-4 p-4 glass-panel border-white/5 hover:border-primary/40 transition-all duration-300 hover:translate-x-1 hover:shadow-[0_0_15px_rgba(0,245,212,0.15)] overflow-hidden relative">
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 group-hover:bg-primary/20 transition-colors">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                </div>
                <p className="font-body text-sm text-paper-muted group-hover:text-white transition-colors leading-relaxed relative z-10">
                    {certification}
                </p>
            </div>
        </motion.div>
    );
}

export default function Certifications() {
    return (
        <SectionWrapper
            id="certifications"
            title="Certifications"
            subtitle="Continuous learning across genomics, bioinformatics, and CRISPR technologies"
        >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolioData.certifications.map((cert, index) => (
                    <CertificationItem key={index} certification={cert} index={index} />
                ))}
            </div>

            {/* Learning indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 flex items-center justify-center gap-4"
            >
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-secondary/30" />
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-full glass-panel border-secondary/20 bg-secondary/5">
                    <GraduationCap className="w-5 h-5 text-secondary" />
                    <span className="font-mono text-sm text-paper-muted">
                        <span className="text-white font-bold">{portfolioData.certifications.length}</span> certifications
                    </span>
                </div>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-secondary/30" />
            </motion.div>
        </SectionWrapper>
    );
}
