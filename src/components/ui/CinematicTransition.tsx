"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface CinematicTransitionProps {
    variant?: "dna-strand" | "molecular-wipe" | "cell-division" | "particle-burst" | "helix-bridge";
    className?: string;
}

// DNA connecting strand between sections (Updated colors)
function DNAStrand() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div ref={ref} style={{ opacity }} className="relative h-40 flex items-center justify-center overflow-hidden">
            {/* Central helix line */}
            <svg className="w-full h-full absolute" viewBox="0 0 1200 160" preserveAspectRatio="none">
                <motion.path
                    d="M0,80 C200,20 400,140 600,80 C800,20 1000,140 1200,80"
                    fill="none"
                    stroke="url(#dna-gradient)"
                    strokeWidth="2"
                    style={{ pathLength }}
                />
                <motion.path
                    d="M0,80 C200,140 400,20 600,80 C800,140 1000,20 1200,80"
                    fill="none"
                    stroke="url(#dna-gradient-2)"
                    strokeWidth="2"
                    style={{ pathLength }}
                />
                {/* Base pair rungs */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.line
                        key={i}
                        x1={60 * i + 30}
                        y1={60}
                        x2={60 * i + 30}
                        y2={100}
                        stroke="rgba(0,245,212,0.15)"
                        strokeWidth="1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                    />
                ))}
                <defs>
                    <linearGradient id="dna-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(0,245,212,0)" />
                        <stop offset="20%" stopColor="rgba(0,245,212,0.6)" />
                        <stop offset="50%" stopColor="rgba(57,255,20,0.8)" />
                        <stop offset="80%" stopColor="rgba(0,245,212,0.6)" />
                        <stop offset="100%" stopColor="rgba(0,245,212,0)" />
                    </linearGradient>
                    <linearGradient id="dna-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(57,255,20,0)" />
                        <stop offset="20%" stopColor="rgba(57,255,20,0.6)" />
                        <stop offset="50%" stopColor="rgba(0,245,212,0.8)" />
                        <stop offset="80%" stopColor="rgba(57,255,20,0.6)" />
                        <stop offset="100%" stopColor="rgba(57,255,20,0)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Floating particles along the path */}
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                        left: `${12 + i * 10}%`,
                        background: i % 2 === 0 ? '#00f5d4' : '#39ff14',
                        boxShadow: `0 0 8px ${i % 2 === 0 ? 'rgba(0,245,212,0.6)' : 'rgba(57,255,20,0.6)'}`,
                    }}
                    animate={{
                        y: [0, -15, 0, 15, 0],
                        opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                        duration: 3 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}
        </motion.div>
    );
}

// Molecular wipe transition (Updated colors)
function MolecularWipe() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="relative h-32 flex items-center justify-center overflow-hidden">
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-[1px] origin-center"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0,245,212,0.3), rgba(57,255,20,0.8), rgba(0,245,212,0.3), transparent)',
                }}
            />
            {/* Center molecular node */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="absolute"
            >
                <div className="w-4 h-4 border border-primary/50 rotate-45 relative bg-[#050d1a]">
                    <div className="absolute inset-1 bg-primary/40 glow-cyan-sm" />
                </div>
            </motion.div>

            {/* Side nodes */}
            {[-200, -100, 100, 200].map((x, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                        left: `calc(50% + ${x}px)`,
                        background: i % 2 === 0 ? '#00f5d4' : '#39ff14',
                        boxShadow: `0 0 8px ${i % 2 === 0 ? 'rgba(0,245,212,0.5)' : 'rgba(57,255,20,0.5)'}`,
                    }}
                />
            ))}
        </div>
    );
}

// Cell division animation (Updated colors)
function CellDivision() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="relative h-36 flex items-center justify-center overflow-hidden">
            {/* Left cell - Cyan */}
            <motion.div
                initial={{ x: 0, scale: 0.8 }}
                animate={isInView ? { x: -40, scale: 1 } : {}}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-16 h-16 rounded-full border border-primary/30"
                style={{
                    background: 'radial-gradient(circle at 40% 40%, rgba(0,245,212,0.15), transparent)',
                    boxShadow: '0 0 20px rgba(0,245,212,0.1)',
                }}
            >
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-2 rounded-full border border-primary/20"
                />
            </motion.div>

            {/* Right cell - Green */}
            <motion.div
                initial={{ x: 0, scale: 0.8 }}
                animate={isInView ? { x: 40, scale: 1 } : {}}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-16 h-16 rounded-full border border-secondary/30"
                style={{
                    background: 'radial-gradient(circle at 60% 40%, rgba(57,255,20,0.15), transparent)',
                    boxShadow: '0 0 20px rgba(57,255,20,0.1)',
                }}
            >
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute inset-2 rounded-full border border-secondary/20"
                />
            </motion.div>

            {/* Connecting bridge */}
            <motion.div
                initial={{ scaleX: 1, opacity: 1 }}
                animate={isInView ? { scaleX: 0, opacity: 0 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-20 h-[1px] bg-gradient-to-r from-primary/40 to-secondary/40"
            />

            {/* Scattered particles */}
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? {
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: (Math.random() - 0.5) * 100,
                        y: (Math.random() - 0.5) * 60,
                    } : {}}
                    transition={{ delay: 0.8 + i * 0.1, duration: 1 }}
                    className="absolute w-1 h-1 rounded-full bg-primary/50"
                />
            ))}
        </div>
    );
}

// Particle burst (Updated colors)
function ParticleBurst() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="relative h-28 flex items-center justify-center overflow-hidden">
            {/* Central burst */}
            <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: [0, 1.5, 1] } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-3 h-3 rounded-full bg-primary/80 glow-cyan"
            />

            {/* Radiating particles */}
            {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const radius = 60;
                return (
                    <motion.div
                        key={i}
                        initial={{ x: 0, y: 0, opacity: 0 }}
                        animate={isInView ? {
                            x: Math.cos(angle) * radius,
                            y: Math.sin(angle) * radius,
                            opacity: [0, 1, 0],
                        } : {}}
                        transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                            background: i % 3 === 0 ? '#00f5d4' : i % 3 === 1 ? '#39ff14' : '#F472B6',
                            boxShadow: `0 0 6px ${i % 3 === 0 ? 'rgba(0,245,212,0.5)' : i % 3 === 1 ? 'rgba(57,255,20,0.5)' : 'rgba(244,114,182,0.5)'}`,
                        }}
                    />
                );
            })}

            {/* Horizontal line through */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            />
        </div>
    );
}

export default function CinematicTransition({ variant = "dna-strand", className = "" }: CinematicTransitionProps) {
    return (
        <div className={`relative ${className}`}>
            {variant === "dna-strand" && <DNAStrand />}
            {variant === "molecular-wipe" && <MolecularWipe />}
            {variant === "cell-division" && <CellDivision />}
            {variant === "particle-burst" && <ParticleBurst />}
            {variant === "helix-bridge" && <DNAStrand />}
        </div>
    );
}
