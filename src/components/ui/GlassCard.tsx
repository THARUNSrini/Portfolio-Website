"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: "cyan" | "magenta" | "white";
    tiltEnabled?: boolean;
}

export default function GlassCard({
    children,
    className = "",
    glowColor = "cyan",
    tiltEnabled = true
}: GlassCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const glowClass = {
        cyan: "group-hover:shadow-[0_0_30px_rgba(0,247,255,0.3)]",
        magenta: "group-hover:shadow-[0_0_30px_rgba(255,0,170,0.3)]",
        white: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
    };

    const borderHoverClass = {
        cyan: "group-hover:border-primary/50",
        magenta: "group-hover:border-secondary/50",
        white: "group-hover:border-white/30"
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!tiltEnabled || !cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateXVal = (mouseY / (rect.height / 2)) * -8;
        const rotateYVal = (mouseX / (rect.width / 2)) * 8;

        setRotateX(rotateXVal);
        setRotateY(rotateYVal);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`
        group relative glass-card rounded-2xl p-6 
        transition-all duration-300 ease-out
        ${glowClass[glowColor]}
        ${borderHoverClass[glowColor]}
        ${className}
      `}
            style={{
                transform: tiltEnabled
                    ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
                    : undefined,
                transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
            {children}
        </motion.div>
    );
}
