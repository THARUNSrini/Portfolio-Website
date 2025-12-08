"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LabScene from "@/components/3d/LabScene";
import { portfolioData } from "@/lib/data";
import { Linkedin, Mail, MapPin, Phone, Sparkles, Dna, Zap, Quote, Rocket, FlaskConical } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Welcome text animation
function WelcomeText() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
        >
            <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 text-sm"
                whileHover={{ scale: 1.05 }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                    <FlaskConical className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="text-gray-300">Welcome to my portfolio</span>
                <Sparkles className="w-4 h-4 text-secondary" />
            </motion.span>
        </motion.div>
    );
}

// Typewriter effect with cursor
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
            }, 40);
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
        <span>
            {displayText}
            <span
                className={`text-primary ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.1s' }}
            >
                |
            </span>
        </span>
    );
}

// Glitch effect on name - improved alignment
function GlitchName({ name }: { name: string }) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <motion.div
            className="relative inline-block"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ scale: 1.02 }}
        >
            <span className={`text-gradient ${isHovering ? "glitch" : ""}`}>{name}</span>
            {isHovering && (
                <>
                    <span
                        className="glitch-layer glitch-layer-1 text-gradient absolute inset-0"
                        aria-hidden="true"
                    >
                        {name}
                    </span>
                    <span
                        className="glitch-layer glitch-layer-2 text-gradient absolute inset-0"
                        aria-hidden="true"
                    >
                        {name}
                    </span>
                </>
            )}
        </motion.div>
    );
}

// Motivational Quote - Life enthusiasm
function MotivationalQuote() {
    const quoteRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            ref={quoteRef}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12 max-w-4xl mx-auto"
        >
            <div className="relative glass-card rounded-3xl p-8 md:p-10 border border-primary/30 overflow-hidden">
                {/* Animated background gradient */}
                <motion.div
                    animate={{
                        background: [
                            "radial-gradient(circle at 0% 0%, rgba(0,229,255,0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 100% 0%, rgba(0,255,159,0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 100% 100%, rgba(0,229,255,0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 0% 100%, rgba(0,255,159,0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 0% 0%, rgba(0,229,255,0.1) 0%, transparent 50%)"
                        ]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-0 rounded-3xl"
                />

                {/* Floating decorations */}
                <motion.div
                    animate={{ rotate: 360, y: [0, -10, 0] }}
                    transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 3, repeat: Infinity } }}
                    className="absolute -top-4 -left-4 opacity-20"
                >
                    <Rocket className="w-16 h-16 text-primary" />
                </motion.div>
                <motion.div
                    animate={{ rotate: -360, y: [0, 10, 0] }}
                    transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity } }}
                    className="absolute -bottom-4 -right-4 opacity-20"
                >
                    <Dna className="w-16 h-16 text-secondary" />
                </motion.div>

                {/* Quote marks */}
                <Quote className="absolute top-4 left-4 w-10 h-10 text-primary/30" />
                <Quote className="absolute bottom-4 right-4 w-10 h-10 text-secondary/30 rotate-180" />

                <div className="relative z-10 text-center">
                    <motion.p
                        className="text-lg md:text-2xl text-white font-light italic leading-relaxed mb-6"
                    >
                        &ldquo;The future belongs to those who believe in the beauty of their dreams. Chase the impossible, embrace the unknown, and let curiosity be your compass!&rdquo;
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-center gap-3"
                    >
                        <motion.div
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            <Sparkles className="w-5 h-5 text-secondary" />
                        </motion.div>
                        <span className="text-gradient font-bold text-lg">
                            — Live Curious, Stay Hungry
                        </span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Zap className="w-5 h-5 text-primary" />
                        </motion.div>
                    </motion.div>
                    <motion.span
                        className="text-gray-500 text-sm block mt-2"
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : {}}
                        transition={{ delay: 0.7 }}
                    >
                        🚀 Engineering the future, one molecule at a time
                    </motion.span>
                </div>

                {/* Animated border glow */}
                <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-transparent"
                    animate={{
                        borderColor: [
                            "rgba(0, 229, 255, 0.3)",
                            "rgba(0, 255, 159, 0.3)",
                            "rgba(0, 229, 255, 0.3)"
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20">
                    <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-20">
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-secondary/40 rounded-br-lg" />
                </div>
            </div>
        </motion.div>
    );
}

// Social link button with enhanced animation
function SocialButton({
    href,
    icon: Icon,
    label,
    variant = "teal"
}: {
    href?: string;
    icon: React.ElementType;
    label: string;
    variant?: "teal" | "green";
}) {
    const colors = {
        teal: "group-hover:border-primary/60 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] group-hover:text-primary group-hover:bg-primary/10",
        green: "group-hover:border-secondary/60 group-hover:shadow-[0_0_30px_rgba(0,255,159,0.4)] group-hover:text-secondary group-hover:bg-secondary/10"
    };

    const content = (
        <motion.div
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-full glass-card border border-white/10 transition-all duration-300 ${colors[variant]}`}
        >
            <Icon className="w-6 h-6 text-white/80 transition-colors" />
        </motion.div>
    );

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label={label}
            >
                {content}
                <motion.span
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 px-3 py-1.5 rounded-full"
                    initial={{ y: 5 }}
                    whileHover={{ y: 0 }}
                >
                    {label}
                </motion.span>
            </a>
        );
    }

    return (
        <div className="group relative cursor-default">
            {content}
            <motion.span
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 px-3 py-1.5 rounded-full"
            >
                {label}
            </motion.span>
        </div>
    );
}

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
        >
            {/* 3D Lab Scene Background */}
            <LabScene variant="hero" className="z-0" />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-[1]" />
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80 z-[1]" />

            {/* Main content */}
            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 text-center px-4 max-w-5xl mx-auto"
            >
                {/* Welcome badge */}
                <WelcomeText />

                {/* Name with glitch effect - Better alignment */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex justify-center"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 tracking-tight leading-tight">
                        <GlitchName name={portfolioData.name} />
                    </h1>
                </motion.div>

                {/* Title with typewriter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-10 md:h-14 flex items-center justify-center"
                >
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">
                        <span className="text-primary">
                            <TypewriterText text={portfolioData.title} delay={800} />
                        </span>
                    </h2>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="text-gray-400 text-base md:text-lg lg:text-xl mt-4 mb-8 max-w-2xl mx-auto italic"
                >
                    &ldquo;{portfolioData.tagline}&rdquo;
                </motion.p>

                {/* Social links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.6 }}
                    className="flex justify-center items-center gap-3 md:gap-5 flex-wrap"
                >
                    <SocialButton
                        href={portfolioData.contact.linkedin}
                        icon={Linkedin}
                        label="LinkedIn"
                        variant="teal"
                    />
                    <SocialButton
                        href={`mailto:${portfolioData.contact.email}`}
                        icon={Mail}
                        label={portfolioData.contact.email}
                        variant="green"
                    />
                    <SocialButton
                        icon={Phone}
                        label={portfolioData.contact.phone}
                        variant="teal"
                    />
                    <SocialButton
                        icon={MapPin}
                        label={portfolioData.contact.location}
                        variant="green"
                    />
                </motion.div>

                {/* Motivational Quote */}
                <MotivationalQuote />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            >
                <a href="#about" className="block group">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-xs text-gray-500 uppercase tracking-widest group-hover:text-primary transition-colors">
                            Explore
                        </span>
                        <div className="w-8 h-12 rounded-full border-2 border-white/20 flex items-start justify-center pt-2 group-hover:border-primary/50 transition-colors">
                            <motion.div
                                animate={{ y: [0, 16, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-1.5 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                            />
                        </div>
                    </motion.div>
                </a>
            </motion.div>
        </section>
    );
}
