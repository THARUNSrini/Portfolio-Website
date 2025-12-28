"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Mail, Linkedin, MapPin, Send, Atom, ArrowRight } from "lucide-react";

// Animated headline
function AnimatedHeadline({ text }: { text: string }) {
    const textRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(textRef, { once: true });

    useEffect(() => {
        if (isInView && textRef.current) {
            const letters = textRef.current.querySelectorAll('.letter');
            gsap.fromTo(
                letters,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.03,
                    ease: "power3.out"
                }
            );
        }
    }, [isInView]);

    return (
        <div ref={textRef} className="flex flex-wrap justify-center">
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className={`letter font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold opacity-0 ${char === ' ' ? 'w-4' : 'text-paper-cream'}`}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}

// Contact card with brutalist styling
function ContactCard({
    icon: Icon,
    label,
    value,
    href,
    variant = "primary",
    delay = 0
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    href?: string;
    variant?: "primary" | "secondary";
    delay?: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true });

    const colors = {
        primary: {
            border: "border-primary",
            shadow: "4px 4px 0px 0px #FFB800",
            hoverShadow: "6px 6px 0px 0px #FFB800",
            icon: "text-primary"
        },
        secondary: {
            border: "border-secondary",
            shadow: "4px 4px 0px 0px #22C55E",
            hoverShadow: "6px 6px 0px 0px #22C55E",
            icon: "text-secondary"
        }
    };

    const c = colors[variant];

    const content = (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.6 }}
            className="h-full"
        >
            <motion.div
                className={`bg-surface border-2 ${c.border} p-6 h-full transition-all duration-200 group cursor-pointer`}
                style={{ boxShadow: c.shadow }}
                whileHover={{ x: -2, y: -2 }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = c.hoverShadow)}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = c.shadow)}
            >
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 border ${c.border} bg-surface flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${c.icon}`} />
                    </div>
                    <div>
                        <p className="font-mono text-xs text-paper-muted uppercase tracking-wider mb-1">
                            {label}
                        </p>
                        <p className="font-body text-paper-cream group-hover:text-primary transition-colors">
                            {value}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                {content}
            </a>
        );
    }

    return content;
}

export default function Contact() {
    return (
        <SectionWrapper
            id="contact"
            title="Get in Touch"
            subtitle="Let's collaborate on the future of biotechnology"
        >
            <div className="relative">
                {/* Main CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <AnimatedHeadline text="Let's build the future" />

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-paper-muted text-lg mt-8 max-w-xl mx-auto font-body"
                    >
                        Whether it&apos;s protein engineering, CRISPR applications, or AI in biotech —
                        I&apos;m always excited to discuss new ideas and collaborations.
                    </motion.p>
                </motion.div>

                {/* Contact cards grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <ContactCard
                        icon={Mail}
                        label="Email"
                        value={portfolioData.contact.email}
                        href={`mailto:${portfolioData.contact.email}`}
                        variant="primary"
                        delay={0}
                    />
                    <ContactCard
                        icon={Linkedin}
                        label="LinkedIn"
                        value="Connect with me"
                        href={portfolioData.contact.linkedin}
                        variant="secondary"
                        delay={0.1}
                    />
                    <ContactCard
                        icon={MapPin}
                        label="Location"
                        value={portfolioData.contact.location}
                        variant="primary"
                        delay={0.2}
                    />
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex justify-center"
                >
                    <motion.a
                        href={`mailto:${portfolioData.contact.email}`}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-background font-mono text-sm uppercase tracking-wider font-bold border-2 border-primary transition-all duration-200"
                        style={{ boxShadow: '6px 6px 0px 0px #22C55E' }}
                        whileHover={{ x: -3, y: -3 }}
                        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '8px 8px 0px 0px #22C55E')}
                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '6px 6px 0px 0px #22C55E')}
                    >
                        <Send className="w-4 h-4" />
                        Start a Conversation
                        <ArrowRight className="w-4 h-4" />
                    </motion.a>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-20 pt-8 border-t border-white/10"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Atom className="w-5 h-5 text-primary" />
                            <span className="font-mono text-sm text-paper-muted">
                                © {new Date().getFullYear()} Tharun Srinivasan Sudha
                            </span>
                        </div>
                        <span className="font-mono text-xs text-paper-muted uppercase tracking-wider">
                            Engineering life, one algorithm at a time
                        </span>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
