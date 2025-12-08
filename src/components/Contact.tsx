"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Mail, Linkedin, Phone, MapPin, Send, Sparkles, Dna, Rocket, Zap, Heart } from "lucide-react";

// DNA Letter animation for CTA text
function AnimatedText({ text }: { text: string }) {
    const textRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(textRef, { once: true });
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        if (isInView && textRef.current) {
            const letters = textRef.current.querySelectorAll('.animated-letter');

            gsap.fromTo(
                letters,
                {
                    opacity: 0,
                    y: 40,
                    rotateX: -90,
                    scale: 0.5
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.025,
                    ease: "back.out(1.7)",
                    onComplete: () => setAnimationComplete(true)
                }
            );
        }
    }, [isInView]);

    return (
        <div
            ref={textRef}
            className="flex flex-wrap justify-center gap-1 perspective-1000"
        >
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    className={`animated-letter inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold 
                        ${char === ' ' ? 'w-3 md:w-4' : 'text-gradient'}
                        ${animationComplete ? '' : 'opacity-0'}
                    `}
                    style={{
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}

// Enhanced floating particles
function ParticleField() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${2 + Math.random() * 4}px`,
                        height: `${2 + Math.random() * 4}px`,
                        backgroundColor: i % 2 === 0 ? '#00e5ff' : '#00ff9f',
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, (Math.random() - 0.5) * 30, 0],
                        opacity: [0.1, 0.6, 0.1],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}

// Contact card with enhanced animation
function ContactCard({
    icon: Icon,
    label,
    value,
    href,
    variant = "teal",
    delay = 0
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    href?: string;
    variant?: "teal" | "green";
    delay?: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true });
    const [isHovered, setIsHovered] = useState(false);

    const colors = {
        teal: {
            bg: "bg-primary/10",
            border: "border-primary/30 hover:border-primary/60",
            icon: "text-primary",
            glow: "0 0 40px rgba(0,229,255,0.3)"
        },
        green: {
            bg: "bg-secondary/10",
            border: "border-secondary/30 hover:border-secondary/60",
            icon: "text-secondary",
            glow: "0 0 40px rgba(0,255,159,0.3)"
        }
    };

    const color = colors[variant];

    const content = (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay, duration: 0.6 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="h-full"
        >
            <motion.div
                className={`glass-card rounded-2xl p-6 border ${color.border} transition-all duration-500 cursor-pointer h-full`}
                animate={{
                    y: isHovered ? -8 : 0,
                    scale: isHovered ? 1.02 : 1,
                    boxShadow: isHovered ? color.glow : "none"
                }}
            >
                <div className="flex items-center gap-4">
                    <motion.div
                        className={`w-14 h-14 rounded-xl ${color.bg} flex items-center justify-center`}
                        animate={{
                            rotate: isHovered ? 360 : 0,
                            scale: isHovered ? 1.1 : 1
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <Icon className={`w-7 h-7 ${color.icon}`} />
                    </motion.div>
                    <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</p>
                        <motion.p
                            className="text-white font-medium group-hover:text-gradient transition-all"
                            animate={{ x: isHovered ? 3 : 0 }}
                        >
                            {value}
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="group">
                {content}
            </a>
        );
    }

    return <div className="group">{content}</div>;
}

export default function Contact() {
    return (
        <SectionWrapper
            id="contact"
            title="Get in Touch"
            subtitle="Let's collaborate on the future of biotechnology"
        >
            <div className="relative">
                {/* Particle field */}
                <ParticleField />

                {/* Main CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <AnimatedText text="Let's build the future" />

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="text-gray-400 text-lg mt-6 max-w-xl mx-auto"
                    >
                        Whether it&apos;s protein engineering, CRISPR applications, or AI in biotech —
                        I&apos;m always excited to discuss new ideas and collaborations.
                    </motion.p>
                </motion.div>

                {/* Contact cards grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    <ContactCard
                        icon={Mail}
                        label="Email"
                        value={portfolioData.contact.email}
                        href={`mailto:${portfolioData.contact.email}`}
                        variant="teal"
                        delay={0}
                    />
                    <ContactCard
                        icon={Linkedin}
                        label="LinkedIn"
                        value="Connect with me"
                        href={portfolioData.contact.linkedin}
                        variant="green"
                        delay={0.1}
                    />
                    <ContactCard
                        icon={Phone}
                        label="Phone"
                        value={portfolioData.contact.phone}
                        variant="teal"
                        delay={0.2}
                    />
                    <ContactCard
                        icon={MapPin}
                        label="Location"
                        value={portfolioData.contact.location}
                        variant="green"
                        delay={0.3}
                    />
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center"
                >
                    <motion.a
                        href={`mailto:${portfolioData.contact.email}`}
                        className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-primary via-teal-400 to-secondary text-navy-900 font-bold text-lg relative overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Shine effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        />

                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Send className="w-5 h-5" />
                        </motion.div>
                        <span className="relative">Start a Conversation</span>
                        <motion.div
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                        >
                            <Rocket className="w-5 h-5" />
                        </motion.div>
                    </motion.a>
                </motion.div>

                {/* Footer decoration */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-20 pt-8 border-t border-white/5 text-center"
                >
                    <motion.div
                        className="flex items-center justify-center gap-3 text-gray-600 text-sm"
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            <Dna className="w-5 h-5 text-primary/50" />
                        </motion.div>
                        <span>© {new Date().getFullYear()} Tharun Srinivasan Sudha</span>
                        <span className="text-gray-700">•</span>
                        <span className="flex items-center gap-1">
                            Built with <Heart className="w-4 h-4 text-red-500/70 inline" /> and <Zap className="w-4 h-4 text-primary/70 inline" />
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
