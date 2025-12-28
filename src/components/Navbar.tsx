"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Atom } from "lucide-react";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Publications", href: "#publications" },
    { name: "Skills", href: "#skills" },
    { name: "Personal", href: "#personal" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = navLinks.map(link => link.href.slice(1));
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-background/95 backdrop-blur-xl border-b-2 border-primary/20"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <a
                            href="#hero"
                            className="flex items-center gap-3 group"
                        >
                            <motion.div
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.5 }}
                                className="w-10 h-10 border-2 border-primary bg-surface flex items-center justify-center"
                                style={{ boxShadow: '2px 2px 0px 0px #FFB800' }}
                            >
                                <Atom className="w-5 h-5 text-primary" />
                            </motion.div>
                            <span className="hidden sm:block font-display text-xl font-semibold">
                                <span className="text-gradient-amber">TSS</span>
                            </span>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${activeSection === link.href.slice(1)
                                        ? "text-primary"
                                        : "text-paper-muted hover:text-paper-cream"
                                        }`}
                                >
                                    {link.name}
                                    {activeSection === link.href.slice(1) && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-0.5 bg-primary"
                                        />
                                    )}
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 border-2 border-primary/30 hover:border-primary transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-primary" />
                            ) : (
                                <Menu className="w-6 h-6 text-paper-cream" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 top-16 z-40 md:hidden"
                    >
                        <div className="bg-surface border-b-2 border-primary/20">
                            <div className="px-4 py-4 space-y-1">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block px-4 py-3 font-mono text-sm uppercase tracking-wider border-l-2 transition-all ${activeSection === link.href.slice(1)
                                            ? "border-primary text-primary bg-primary/5"
                                            : "border-transparent text-paper-muted hover:border-primary/50 hover:text-paper-cream"
                                            }`}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
