"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Award, GraduationCap, BadgeCheck } from "lucide-react";

// Certification card
function CertificationCard({
    certification,
    index
}: {
    certification: string;
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-20px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="group"
        >
            <div className="glass-card rounded-xl p-4 border border-white/10 hover:border-primary/40 transition-all duration-300 h-full flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors leading-relaxed">
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
                    <CertificationCard key={index} certification={cert} index={index} />
                ))}
            </div>

            {/* Learning indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-10 flex items-center justify-center gap-2"
            >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10">
                    <GraduationCap className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-gray-400">
                        <span className="text-white font-semibold">{portfolioData.certifications.length}</span> certifications from leading institutions
                    </span>
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
