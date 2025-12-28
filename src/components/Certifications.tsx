"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { BadgeCheck, GraduationCap } from "lucide-react";

// Certification item with brutalist styling
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
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="group"
        >
            <div className="flex items-start gap-3 p-4 bg-surface border border-white/10 hover:border-primary/40 transition-all duration-200 hover:translate-x-1">
                <div className="w-8 h-8 border border-primary bg-surface flex items-center justify-center flex-shrink-0">
                    <BadgeCheck className="w-4 h-4 text-primary" />
                </div>
                <p className="font-body text-sm text-paper-muted group-hover:text-paper-cream transition-colors leading-relaxed">
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {portfolioData.certifications.map((cert, index) => (
                    <CertificationItem key={index} certification={cert} index={index} />
                ))}
            </div>

            {/* Learning indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-12 flex items-center gap-4"
            >
                <div className="w-12 h-px bg-secondary/30" />
                <div className="flex items-center gap-3 px-4 py-2 border border-white/10 bg-surface">
                    <GraduationCap className="w-5 h-5 text-secondary" />
                    <span className="font-mono text-sm text-paper-muted">
                        <span className="text-paper-cream font-bold">{portfolioData.certifications.length}</span> certifications from leading institutions
                    </span>
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
