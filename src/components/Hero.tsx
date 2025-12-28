"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LabScene from "@/components/3d/LabScene";
import { portfolioData } from "@/lib/data";
import { Linkedin, Mail, MapPin, ArrowDown, Microscope, Atom, TestTubes } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Animated welcome badge with mono font
function WelcomeBadge() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
        >
            <motion.div
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-surface border-2 border-primary rounded-none"
                style={{ boxShadow: '3px 3px 0px 0px #FFB800' }}
                whileHover={{ x: -2, y: -2, boxShadow: '5px 5px 0px 0px #FFB800' }}
            >
                <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Microscope className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper-muted">
                    Biotech × Artificial Intelligence
                </span>
                <Atom className="w-4 h-4 text-secondary" />
            </motion.div>
        </motion.div>
    );
}

// Typewriter with mono font styling
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
    const [displayText, setDisplayText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let index = 0;
        const timer = setTimeout(() => {
            const intervalId = setInterval(() => {
                if (index < text.length) {
                    setDisplayText(text.slice(0, index + 1));
                    index++;
                } else {
                    setIsComplete(true);
                    clearInterval(intervalId);
                }
            }, 50);
            return () => clearInterval(intervalId);
        }, delay);
        return () => clearTimeout(timer);
    }, [text, delay]);

    useEffect(() => {
        if (isComplete) {
            const cursorInterval = setInterval(() => {
                setShowCursor(prev => !prev);
            }, 530);
            return () => clearInterval(cursorInterval);
        }
    }, [isComplete]);

    return (
        <span className="font-mono">
            {displayText}
            <span
                className={`text-primary ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.1s' }}
            >
                _
            </span>
        </span>
    );
}

// Elegant name display with serif font
function DisplayName({ name }: { name: string }) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <motion.div
            className="relative inline-block"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <motion.h1
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold text-paper-cream tracking-tight"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {name.split(' ').map((word, i) => (
                    <span key={i} className={i === 0 ? 'text-gradient-amber' : ''}>
                        {word}{' '}
                    </span>
                ))}
            </motion.h1>

            {/* Decorative underline */}
            <motion.div
                className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-tertiary"
                initial={{ width: 0 }}
                animate={{ width: isHovering ? '100%' : '60%' }}
                transition={{ duration: 0.5 }}
            />
        </motion.div>
    );
}

// Quote card with brutalist styling
function QuoteCard() {
    const quoteRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            ref={quoteRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-16 max-w-3xl mx-auto"
        >
            <div className="relative bg-surface border-2 border-primary p-8 md:p-10"
                style={{ boxShadow: '6px 6px 0px 0px #FFB800' }}
            >
                {/* Corner markers */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-secondary" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-secondary" />

                {/* Quote */}
                <div className="relative">
                    <span className="absolute -top-6 -left-2 text-6xl text-primary/30 font-display">"</span>
                    <p className="font-display text-xl md:text-2xl text-paper-cream italic leading-relaxed pl-6">
                        {portfolioData.quote.text}
                    </p>
                    <span className="absolute -bottom-8 right-0 text-6xl text-primary/30 font-display">"</span>
                </div>

                {/* Attribution */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                        <p className="font-mono text-sm text-primary font-medium">
                            — {portfolioData.quote.author}
                        </p>
                        <p className="font-mono text-xs text-paper-muted mt-1">
                            {portfolioData.quote.context}
                        </p>
                    </div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <TestTubes className="w-8 h-8 text-secondary/50" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

// Social link with brutalist hover
function SocialLink({
    href,
    icon: Icon,
    label,
    variant = "primary"
}: {
    href: string;
    icon: React.ElementType;
    label: string;
    variant?: "primary" | "secondary";
}) {
    const colors = {
        primary: {
            border: "border-primary",
            shadow: "4px 4px 0px 0px #FFB800",
            hoverShadow: "6px 6px 0px 0px #FFB800",
            text: "group-hover:text-primary"
        },
        secondary: {
            border: "border-secondary",
            shadow: "4px 4px 0px 0px #22C55E",
            hoverShadow: "6px 6px 0px 0px #22C55E",
            text: "group-hover:text-secondary"
        }
    };
    const c = colors[variant];

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex items-center gap-3 px-5 py-3 bg-surface border-2 ${c.border} transition-all duration-200`}
            style={{ boxShadow: c.shadow }}
            whileHover={{ x: -2, y: -2 }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = c.hoverShadow)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = c.shadow)}
        >
            <Icon className={`w-5 h-5 text-paper-muted transition-colors ${c.text}`} />
            <span className={`font-mono text-sm text-paper-muted transition-colors ${c.text}`}>
                {label}
            </span>
        </motion.a>
    );
}

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
        >
            {/* 3D Lab Scene Background */}
            <LabScene variant="hero" className="z-0" />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-[1]" />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/90 z-[1]" />

            {/* Main content */}
            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 text-center px-4 max-w-6xl mx-auto"
            >
                {/* Welcome badge */}
                <WelcomeBadge />

                {/* Name */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="mb-6"
                >
                    <DisplayName name={portfolioData.name} />
                </motion.div>

                {/* Title with typewriter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="h-12 md:h-16 flex items-center justify-center mb-4"
                >
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary">
                        <TypewriterText text={portfolioData.title} delay={1200} />
                    </h2>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="text-paper-muted text-base md:text-lg max-w-2xl mx-auto mb-10 font-body"
                >
                    {portfolioData.tagline}
                </motion.p>

                {/* Social links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.3, duration: 0.6 }}
                    className="flex flex-wrap justify-center items-center gap-4"
                >
                    <SocialLink
                        href={portfolioData.contact.linkedin}
                        icon={Linkedin}
                        label="LinkedIn"
                        variant="primary"
                    />
                    <SocialLink
                        href={`mailto:${portfolioData.contact.email}`}
                        icon={Mail}
                        label="Email"
                        variant="secondary"
                    />
                    <motion.div
                        className="flex items-center gap-2 px-5 py-3 border-2 border-white/20 bg-surface"
                        whileHover={{ borderColor: 'rgba(244, 114, 182, 0.5)' }}
                    >
                        <MapPin className="w-5 h-5 text-paper-muted" />
                        <span className="font-mono text-sm text-paper-muted">
                            {portfolioData.contact.location}
                        </span>
                    </motion.div>
                </motion.div>

                {/* Quote */}
                <QuoteCard />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            >
                <a href="#about" className="block group">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-3"
                    >
                        <span className="font-mono text-xs text-paper-muted uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                            Explore
                        </span>
                        <div className="w-10 h-16 border-2 border-white/20 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ArrowDown className="w-4 h-4 text-primary" />
                            </motion.div>
                        </div>
                    </motion.div>
                </a>
            </motion.div>
        </section>
    );
}
