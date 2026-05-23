"use client";

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<SVGRectElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setIsLoading(false);
            }
        });

        // Setup initial states
        if (fillRef.current) gsap.set(fillRef.current, { scaleY: 0, transformOrigin: "bottom" });
        if (progressRef.current) gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });

        // Animation sequence
        tl.to(fillRef.current, {
            scaleY: 1,
            duration: 1.2,
            ease: "power2.inOut"
        }, 0)
        .to(progressRef.current, {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut"
        }, 0)
        // Exit animation
        .to(containerRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.inOut"
        }, 1.2);

        return () => {
            tl.kill();
        };
    }, []);

    if (!isLoading) return null;

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 z-[999999] bg-[#0a0d0f] flex flex-col items-center justify-center pointer-events-none"
        >
            {/* Pipette Container */}
            <div className="relative w-24 h-48 mb-8">
                <svg width="100%" height="100%" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Outline */}
                    <path d="M20 10 L40 10 L35 70 L25 70 Z" stroke="#00e5cc" strokeWidth="2" strokeLinejoin="round" opacity="0.3"/>
                    <path d="M25 70 L35 70 L31 110 L29 110 Z" stroke="#00e5cc" strokeWidth="2" strokeLinejoin="round" opacity="0.3"/>
                    
                    {/* Liquid Fill Mask */}
                    <mask id="pipette-mask">
                        <path d="M20 10 L40 10 L35 70 L25 70 Z" fill="white" />
                        <path d="M25 70 L35 70 L31 110 L29 110 Z" fill="white" />
                    </mask>

                    {/* Animated Fill */}
                    <g mask="url(#pipette-mask)">
                        <rect 
                            ref={fillRef}
                            x="10" 
                            y="10" 
                            width="40" 
                            height="100" 
                            fill="url(#liquid-gradient)" 
                        />
                    </g>

                    <defs>
                        <linearGradient id="liquid-gradient" x1="30" y1="110" x2="30" y2="10" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#00e5cc" />
                            <stop offset="100%" stopColor="#00c8ff" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Progress Bar Container */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                <div 
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-[#00e5cc] to-[#00c8ff] shadow-[0_0_15px_rgba(0,229,204,0.5)]"
                />
            </div>
            
            <div className="text-[#00e5cc] font-mono text-xs tracking-widest uppercase animate-pulse">
                Calibrating Instruments...
            </div>
        </div>
    );
}
