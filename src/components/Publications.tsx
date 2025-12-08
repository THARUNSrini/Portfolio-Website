"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { BookOpen, FileText, ExternalLink, Library, Sparkles, Dna } from "lucide-react";

// Animated gel band with glow effect
function GelBand({
    publication,
    index
}: {
    publication: typeof portfolioData.publications[0];
    index: number;
}) {
    const bandRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(bandRef, { once: true, margin: "-30px" });
    const [isHovered, setIsHovered] = useState(false);
    const isBookChapter = publication.type === "Book Chapter";

    return (
        <motion.div
            ref={bandRef}
            initial={{ opacity: 0, x: -80, scaleX: 0.8 }}
            animate={isInView ? { opacity: 1, x: 0, scaleX: 1 } : {}}
            transition={{
                delay: index * 0.12,
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group"
        >
            <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                <motion.div
                    className={`relative glass-card rounded-xl p-5 border ${isBookChapter ? 'border-secondary/40' : 'border-primary/40'} transition-all duration-500 overflow-hidden`}
                    animate={{
                        x: isHovered ? 8 : 0,
                        boxShadow: isHovered
                            ? isBookChapter
                                ? "0 0 40px rgba(0, 255, 159, 0.2)"
                                : "0 0 40px rgba(0, 229, 255, 0.2)"
                            : "0 0 0 0 rgba(0, 0, 0, 0)"
                    }}
                >
                    {/* Animated background gradient */}
                    <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${isBookChapter ? 'from-secondary/10 to-transparent' : 'from-primary/10 to-transparent'}`}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Shine effect on hover */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        animate={{ x: isHovered ? ["0%", "200%"] : "-100%" }}
                        transition={{ duration: 0.6 }}
                    />

                    <div className="relative flex items-start gap-4">
                        {/* Animated icon */}
                        <motion.div
                            className={`w-12 h-12 rounded-xl ${isBookChapter ? 'bg-secondary/20' : 'bg-primary/20'} flex items-center justify-center flex-shrink-0`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {isBookChapter ? (
                                <Library className="w-5 h-5 text-secondary" />
                            ) : (
                                <FileText className="w-5 h-5 text-primary" />
                            )}
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            {/* Type badge */}
                            <motion.div
                                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium mb-2 ${isBookChapter ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}
                                whileHover={{ scale: 1.05 }}
                            >
                                <BookOpen className="w-3 h-3" />
                                {publication.type}
                            </motion.div>

                            {/* Citation */}
                            <motion.p
                                className="text-white text-sm leading-relaxed mb-2 group-hover:text-gradient transition-all"
                                animate={{ x: isHovered ? 2 : 0 }}
                            >
                                {publication.citation}
                            </motion.p>

                            {/* Journal */}
                            <p className="text-gray-500 text-xs mb-2">
                                {publication.journal}
                            </p>

                            {/* DOI with animation */}
                            <motion.div
                                className="flex items-center gap-2 text-xs"
                                animate={{ x: isHovered ? 3 : 0 }}
                            >
                                <span className="text-gray-600">DOI:</span>
                                <span className={`${isBookChapter ? 'text-secondary/80 group-hover:text-secondary' : 'text-primary/80 group-hover:text-primary'} transition-colors flex items-center gap-1`}>
                                    {publication.doi}
                                    <motion.div
                                        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -5 }}
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                    </motion.div>
                                </span>
                            </motion.div>
                        </div>

                        {/* Animated gel band visual */}
                        <div className="hidden md:flex flex-col items-center gap-1">
                            <motion.div
                                className={`w-2 rounded-full bg-gradient-to-b ${isBookChapter ? 'from-secondary/80 to-secondary/30' : 'from-primary/80 to-primary/30'}`}
                                animate={{
                                    height: isHovered ? "80px" : "64px",
                                    opacity: isHovered ? 1 : 0.6
                                }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    boxShadow: isHovered
                                        ? isBookChapter
                                            ? "0 0 15px rgba(0, 255, 159, 0.5)"
                                            : "0 0 15px rgba(0, 229, 255, 0.5)"
                                        : "none"
                                }}
                            />
                        </div>
                    </div>

                    {/* Corner decoration */}
                    <motion.div
                        className="absolute top-0 right-0 w-12 h-12"
                        animate={{ opacity: isHovered ? 0.5 : 0.2 }}
                    >
                        <div className={`absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 ${isBookChapter ? 'border-secondary/30' : 'border-primary/30'} rounded-tr-lg`} />
                    </motion.div>
                </motion.div>
            </a>
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
                {/* Background decoration */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <motion.div
                        animate={{
                            rotate: 360,
                            opacity: [0.05, 0.1, 0.05]
                        }}
                        transition={{
                            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                            opacity: { duration: 5, repeat: Infinity }
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <Dna className="w-48 h-48 text-primary/10" />
                    </motion.div>
                </div>

                {/* Gel electrophoresis visual */}
                <div className="flex gap-8">
                    {/* Electrode indicator - negative */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="hidden lg:flex flex-col items-center"
                    >
                        <motion.div
                            className="w-2 h-10 bg-red-500/60 rounded-full"
                            animate={{
                                boxShadow: [
                                    "0 0 0 0 rgba(239, 68, 68, 0.4)",
                                    "0 0 10px 2px rgba(239, 68, 68, 0.4)",
                                    "0 0 0 0 rgba(239, 68, 68, 0.4)"
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-red-400/60 text-sm font-bold mt-1">−</span>
                    </motion.div>

                    {/* Publications list */}
                    <div className="flex-1 space-y-4">
                        {portfolioData.publications.map((pub, index) => (
                            <GelBand key={index} publication={pub} index={index} />
                        ))}
                    </div>

                    {/* Electrode indicator - positive */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="hidden lg:flex flex-col items-center"
                    >
                        <motion.div
                            className="w-2 h-10 bg-green-500/60 rounded-full"
                            animate={{
                                boxShadow: [
                                    "0 0 0 0 rgba(34, 197, 94, 0.4)",
                                    "0 0 10px 2px rgba(34, 197, 94, 0.4)",
                                    "0 0 0 0 rgba(34, 197, 94, 0.4)"
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                        <span className="text-green-400/60 text-sm font-bold mt-1">+</span>
                    </motion.div>
                </div>

                {/* Publication count with animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-10 text-center"
                >
                    <motion.div
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border border-white/10 hover:border-primary/30 transition-all"
                        whileHover={{ scale: 1.05, y: -3 }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <BookOpen className="w-5 h-5 text-primary" />
                        </motion.div>
                        <span className="text-sm text-gray-400">
                            <span className="text-white font-bold text-lg">{portfolioData.publications.length}</span> peer-reviewed publications
                        </span>
                        <Sparkles className="w-4 h-4 text-secondary/50" />
                    </motion.div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
