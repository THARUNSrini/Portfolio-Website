"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper, { staggerContainer, fadeInUp } from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { BookOpen, ExternalLink, Copy, Check } from "lucide-react";

export default function Publications() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const copyDOI = (doi: string, index: number) => {
        navigator.clipboard.writeText(doi);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <SectionWrapper id="publications" title="Publications" subtitle="Peer-reviewed papers and book chapters in life sciences">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-4"
            >
                {portfolioData.publications.map((pub, index) => (
                    <motion.div
                        key={index}
                        variants={fadeInUp}
                        className="group"
                    >
                        <motion.div
                            whileHover={{ scale: 1.01, x: 8 }}
                            className="glass-card rounded-xl p-5 border border-white/10 hover:border-secondary/40 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-secondary" />
                                    </div>
                                </div>

                                {/* Citation */}
                                <div className="flex-grow">
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {pub.citation}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    {/* Copy DOI button */}
                                    <button
                                        onClick={() => copyDOI(pub.doi, index)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all text-sm"
                                    >
                                        {copiedIndex === index ? (
                                            <>
                                                <Check className="w-4 h-4 text-green-400" />
                                                <span className="text-green-400">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                <span>Copy DOI</span>
                                            </>
                                        )}
                                    </button>

                                    {/* Open DOI link */}
                                    <a
                                        href={`https://doi.org/${pub.doi}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 text-secondary hover:text-white transition-all text-sm group/link"
                                    >
                                        <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                                        <span className="hidden sm:inline">View</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </SectionWrapper>
    );
}
