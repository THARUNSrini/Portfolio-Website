"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { HeroDecorations } from "@/components/SectionDecorations";
import { portfolioData } from "@/lib/data";
import { Linkedin, Mail, MapPin } from "lucide-react";

// Cinematic DrawSVG-style Name Reveal
function DrawNameReveal({ name }: { name: string }) {
    const letters = name.split("");

    return (
        <motion.h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white tracking-tight flex flex-wrap justify-center drop-shadow-[0_0_15px_rgba(0,245,212,0.3)]">
            {letters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
                    transition={{
                        duration: 1.2,
                        delay: 0.5 + index * 0.05,
                        ease: [0.16, 1, 0.3, 1] // Easing standard
                    }}
                    className={char === " " ? "w-[0.2em]" : "inline-block"}
                >
                    {char}
                </motion.span>
            ))}
        </motion.h1>
    );
}

// Tagline Tag stagger
function TaglineReveal({ text }: { text: string }) {
    const words = text.split(" ");
    return (
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                        delay: 1.5 + index * 0.06, // 60ms stagger per word
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="font-body text-paper-muted text-base md:text-lg"
                >
                    {word}
                </motion.span>
            ))}
        </div>
    );
}

// Social link with frosted glass
function SocialLink({
    href,
    icon: Icon,
    label
}: {
    href: string;
    icon: React.ElementType;
    label: string;
}) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 px-5 py-3 glass-panel transition-all duration-300"
        >
            <Icon className="w-5 h-5 text-paper-muted group-hover:text-primary transition-colors" />
            <span className="font-mono text-sm text-paper-muted group-hover:text-primary transition-colors">
                {label}
            </span>
            <div className="absolute inset-0 rounded-xl rounded-m bg-primary/0 group-hover:bg-primary/5 transition-colors pointer-events-none" />
            <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/30 transition-colors shadow-[0_0_15px_rgba(0,229,204,0)] group-hover:shadow-[0_0_15px_rgba(0,229,204,0.2)] pointer-events-none" />
        </motion.a>
    );
}

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // We do NOT use translateY on scroll per user rules, only opacity
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            id="hero"
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
        >
            <HeroDecorations />

            {/* Gradient overlays to blend with the body background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-[1] pointer-events-none" />

            {/* Main content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full pt-10"
            >
                {/* Hero Portrait / Scanner Area */}
                <motion.div
                    initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
                    animate={{ opacity: 1, clipPath: 'circle(100% at 50% 50%)' }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-10 flex items-center justify-center"
                >
                    <div className="absolute inset-0 scanner-ring" />
                    {/* Placeholder for portrait photo using frosted glass */}
                    <div className="w-full h-full rounded-full glass-panel-strong flex items-center justify-center overflow-hidden bg-background/50 border-primary/20 shadow-[0_0_30px_rgba(0,229,204,0.1)]">
                        <span className="font-display text-4xl text-primary/40 font-light">TS</span>
                    </div>
                </motion.div>

                {/* Name */}
                <div className="mb-4">
                    <DrawNameReveal name={portfolioData.name} />
                </div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-mono text-primary tracking-widest uppercase">
                        {portfolioData.title}
                    </h2>
                </motion.div>

                {/* Tagline */}
                <div className="mb-12 max-w-3xl mx-auto">
                    <TaglineReveal text={portfolioData.tagline} />
                </div>

                {/* Social links */}
                <motion.div
                    initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
                    transition={{ delay: 2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap justify-center items-center gap-4"
                >
                    <SocialLink
                        href={portfolioData.contact.linkedin}
                        icon={Linkedin}
                        label="LinkedIn"
                    />
                    <SocialLink
                        href={`mailto:${portfolioData.contact.email}`}
                        icon={Mail}
                        label="Email"
                    />
                    <motion.div
                        className="flex items-center gap-2 px-5 py-3 glass-panel"
                    >
                        <MapPin className="w-5 h-5 text-paper-muted" />
                        <span className="font-mono text-sm text-paper-muted">
                            {portfolioData.contact.location}
                        </span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
