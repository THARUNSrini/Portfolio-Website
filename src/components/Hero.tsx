"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import DNAHelix from "@/components/3d/DNAHelix";
import { portfolioData } from "@/lib/data";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";

function TypingTitle({ text }: { text: string }) {
    const [displayText, setDisplayText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

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
        }, 800);
        return () => clearTimeout(timer);
    }, [text]);

    return (
        <span>
            {displayText}
            {!isComplete && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="text-primary"
                >|</motion.span>
            )}
        </span>
    );
}

export default function Hero() {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00aa" />
                    <DNAHelix />
                    <Environment preset="city" />
                </Canvas>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-[1]" />

            {/* Overlay Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <span className={`relative inline-block cursor-default ${isHovering ? "glitch" : ""}`}>
                            <span className="text-gradient">{portfolioData.name}</span>
                            {isHovering && (
                                <>
                                    <span className="glitch-layer glitch-layer-1 text-gradient absolute inset-0" aria-hidden="true">
                                        {portfolioData.name}
                                    </span>
                                    <span className="glitch-layer glitch-layer-2 text-gradient absolute inset-0" aria-hidden="true">
                                        {portfolioData.name}
                                    </span>
                                </>
                            )}
                        </span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="h-16 md:h-20"
                >
                    <h2 className="text-lg md:text-xl lg:text-2xl text-gray-300 font-medium">
                        <TypingTitle text={portfolioData.title} />
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto italic"
                >
                    &ldquo;{portfolioData.tagline}&rdquo;
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.6 }}
                    className="flex justify-center items-center gap-6 flex-wrap"
                >
                    <a
                        href={portfolioData.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <motion.div
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-4 rounded-full glass-card border border-white/10 group-hover:border-primary/50 group-hover:shadow-[0_0_25px_rgba(0,247,255,0.4)] transition-all duration-300"
                        >
                            <Linkedin className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                        </motion.div>
                    </a>
                    <a
                        href={`mailto:${portfolioData.contact.email}`}
                        className="group"
                    >
                        <motion.div
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-4 rounded-full glass-card border border-white/10 group-hover:border-secondary/50 group-hover:shadow-[0_0_25px_rgba(255,0,170,0.4)] transition-all duration-300"
                        >
                            <Mail className="w-6 h-6 text-white group-hover:text-secondary transition-colors" />
                        </motion.div>
                    </a>
                    <div className="group relative">
                        <motion.div
                            whileHover={{ scale: 1.15 }}
                            className="p-4 rounded-full glass-card border border-white/10 group-hover:border-white/30 transition-all cursor-default"
                        >
                            <Phone className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                        </motion.div>
                        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 px-2 py-1 rounded">
                            {portfolioData.contact.phone}
                        </span>
                    </div>
                    <div className="group relative">
                        <motion.div
                            whileHover={{ scale: 1.15 }}
                            className="p-4 rounded-full glass-card border border-white/10 group-hover:border-white/30 transition-all cursor-default"
                        >
                            <MapPin className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
                        </motion.div>
                        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 px-2 py-1 rounded">
                            {portfolioData.contact.location}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <a href="#about" className="block">
                    <div className="w-[30px] h-[50px] rounded-3xl border-2 border-white/20 flex justify-center p-2 hover:border-primary/50 transition-colors">
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(0,247,255,0.8)]"
                        />
                    </div>
                </a>
            </motion.div>
        </section>
    );
}
