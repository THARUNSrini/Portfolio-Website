"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import { Mail, Linkedin, MapPin, Send, Atom, ArrowRight, Dna } from "lucide-react";

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
        <div ref={textRef} className="flex flex-wrap justify-center font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight">
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className={`letter opacity-0 ${char === ' ' ? 'w-4' : 'text-white drop-shadow-[0_0_15px_rgba(0,245,212,0.3)]'}`}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}

// Contact card with glass styling
function ContactCard({
    icon: Icon,
    label,
    value,
    href,
    delay = 0,
    accent = "cyan"
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    href?: string;
    delay?: number;
    accent?: "cyan" | "green" | "amber";
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    const styles = {
        cyan: {
            border: "border-primary/20 group-hover:border-primary/50 text-primary glow-cyan",
            bg: "bg-primary/10",
        },
        green: {
            border: "border-secondary/20 group-hover:border-secondary/50 text-secondary glow-green",
            bg: "bg-secondary/10",
        },
        amber: {
            border: "border-tertiary/20 group-hover:border-tertiary/50 text-tertiary glow-amber",
            bg: "bg-tertiary/10",
        }
    };

    const s = styles[accent];

    const content = (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
        >
            <div className={`relative glass-panel p-6 h-full transition-all duration-300 group ${href ? 'cursor-pointer hover:-translate-y-1' : ''} ${s.border}`}>
                 {/* Subtle gradient hover effect */}
                 <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${s.bg.replace('/10', '/5')}`} />
                
                <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:border-current group-hover:shadow-[0_0_15px_currentColor] ${s.bg}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-mono text-[10px] text-paper-muted uppercase tracking-widest mb-1 group-hover:text-white/60 transition-colors">
                            {label}
                        </p>
                        <p className={`font-body text-white font-medium transition-colors ${href ? 'group-hover:text-primary' : ''}`}>
                            {value}
                        </p>
                    </div>
                </div>
            </div>
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
            subtitle="Let's collaborate on the future of genomic medicine"
        >
            <div className="relative">
                {/* Background animated petri dish colonies */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl pointer-events-none z-0 opacity-30 blur-2xl">
                    <div className="absolute top-[20%] left-[20%] w-32 h-32 petri-colony" style={{ animationDelay: '0s' }} />
                    <div className="absolute top-[60%] right-[30%] w-48 h-48 petri-colony" style={{ animationDelay: '1s', background: 'radial-gradient(circle, rgba(57,255,20,0.5), transparent 70%)' }} />
                    <div className="absolute bottom-[20%] left-[40%] w-24 h-24 petri-colony" style={{ animationDelay: '2s' }} />
                </div>

                {/* Main CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 relative z-10"
                >
                    <AnimatedHeadline text="Let's build the future" />

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-paper-muted text-lg mt-8 max-w-xl mx-auto font-body font-light"
                    >
                        Whether it's single-cell genomics, immunology research, or ML/AI in biotech —
                        I'm always excited to discuss new ideas and collaborations.
                    </motion.p>
                </motion.div>

                {/* Contact cards grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 relative z-10">
                    <ContactCard
                        icon={Mail}
                        label="Email"
                        value={portfolioData.contact.email}
                        href={`mailto:${portfolioData.contact.email}`}
                        delay={0}
                        accent="cyan"
                    />
                    <ContactCard
                        icon={Linkedin}
                        label="LinkedIn"
                        value="Connect with me"
                        href={portfolioData.contact.linkedin}
                        delay={0.15}
                        accent="cyan"
                    />
                    <ContactCard
                        icon={MapPin}
                        label="Location"
                        value={portfolioData.contact.location}
                        delay={0.3}
                        accent="cyan"
                    />
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-center relative z-10"
                >
                    <motion.a
                        href={`mailto:${portfolioData.contact.email}`}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-tertiary/10 text-tertiary font-mono text-sm uppercase tracking-widest font-bold border border-tertiary/40 rounded-full overflow-hidden transition-all duration-300 hover:border-tertiary hover:bg-tertiary/20 glow-amber"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Interactive glow effect inside button */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-tertiary/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                        
                        <Send className="w-4 h-4 relative z-10 group-hover:hidden" />
                        
                        {/* DNA spin replaces icon on hover */}
                        <Dna className="w-4 h-4 relative z-10 hidden group-hover:block animate-[dna-rotate_2s_linear_infinite]" />
                        
                        <span className="relative z-10">Start a Conversation</span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-24 pt-8 border-t border-white/10 relative z-10"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center bg-primary/10">
                                <Atom className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-mono text-sm text-paper-muted">
                                © {new Date().getFullYear()} Tharun Srinivasan Sudha
                            </span>
                        </div>
                        <span className="font-mono text-[10px] text-paper-muted uppercase tracking-widest">
                            Decoding immunity, one cell at a time.
                        </span>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
