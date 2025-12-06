"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper, { fadeInUp } from "@/components/ui/SectionWrapper";
import { portfolioData } from "@/lib/data";
import {
    Mail,
    Phone,
    Linkedin,
    MapPin,
    Send,
    Heart,
    Globe,
    Gamepad2,
    Sparkles
} from "lucide-react";

export default function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Create mailto link
        const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
        const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
        window.location.href = `mailto:${portfolioData.contact.email}?subject=${subject}&body=${body}`;

        setTimeout(() => setIsSubmitting(false), 1000);
    };

    return (
        <SectionWrapper id="contact" title="Get In Touch" subtitle="Let's discuss research collaborations or opportunities">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formState.name}
                                onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={formState.email}
                                onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={5}
                                value={formState.message}
                                onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                                placeholder="Tell me about your project or research collaboration..."
                            />
                        </div>
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-[0_0_30px_rgba(0,247,255,0.4)] transition-all duration-300 disabled:opacity-50"
                        >
                            <Send className="w-5 h-5" />
                            <span>{isSubmitting ? "Opening Email..." : "Send Message"}</span>
                        </motion.button>
                    </form>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="space-y-6"
                >
                    {/* Contact cards */}
                    <div className="space-y-4">
                        <a
                            href={`mailto:${portfolioData.contact.email}`}
                            className="flex items-center gap-4 p-4 rounded-xl glass-card border border-white/10 hover:border-primary/40 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Mail className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <p className="text-white font-medium">{portfolioData.contact.email}</p>
                            </div>
                        </a>

                        <a
                            href={portfolioData.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-xl glass-card border border-white/10 hover:border-secondary/40 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Linkedin className="w-5 h-5 text-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">LinkedIn</p>
                                <p className="text-white font-medium">Connect with me</p>
                            </div>
                        </a>

                        <div className="flex items-center gap-4 p-4 rounded-xl glass-card border border-white/10">
                            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                                <Phone className="w-5 h-5 text-gray-300" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Phone</p>
                                <p className="text-white font-medium">{portfolioData.contact.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl glass-card border border-white/10">
                            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-gray-300" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Location</p>
                                <p className="text-white font-medium">{portfolioData.contact.location}</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional info */}
                    <div className="glass-card rounded-xl p-5 border border-white/10 space-y-4">
                        <div className="flex items-start gap-3">
                            <Globe className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Languages</p>
                                <p className="text-gray-300 text-sm">{portfolioData.languages}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-secondary mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Research Interests</p>
                                <p className="text-gray-300 text-sm">{portfolioData.interests}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Gamepad2 className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Hobbies</p>
                                <p className="text-gray-300 text-sm">{portfolioData.hobbies}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 pt-8 border-t border-white/10 text-center"
            >
                <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                    Made with <Heart className="w-4 h-4 text-secondary" /> by Tharun Srinivasan Sudha
                </p>
                <p className="text-gray-600 text-xs mt-2">
                    © {new Date().getFullYear()} All rights reserved.
                </p>
            </motion.footer>
        </SectionWrapper>
    );
}
