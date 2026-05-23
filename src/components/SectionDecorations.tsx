"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function HeroDecorations() {
    const dnaRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (!dnaRef.current) return;
        
        const path = dnaRef.current;
        const length = path.getTotalLength();

        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
            delay: 0.8
        });
    }, []);

    return (
        <>
            {/* Watermark Micropipette (Right) */}
            <div className="absolute right-[5%] top-[15%] pointer-events-none opacity-[0.06] z-0 hidden lg:block" style={{ animation: 'rock-slow 8s infinite alternate ease-in-out' }}>
                <svg width="150" height="300" viewBox="0 0 60 120" fill="none" stroke="#e8eaec" strokeWidth="1">
                    <rect x="25" y="5" width="10" height="5" />
                    <path d="M20 10 L40 10 L35 70 L25 70 Z" />
                    <path d="M25 70 L35 70 L31 110 L29 110 Z" />
                </svg>
            </div>

            {/* Floating DNA Helix (Left) */}
            <div className="absolute left-[5%] bottom-[20%] pointer-events-none opacity-20 z-0 hidden lg:block">
                <svg width="100" height="200" viewBox="0 0 100 200" fill="none" stroke="#00e5cc" strokeWidth="2">
                    <path 
                        ref={dnaRef}
                        d="M 20,0 C 80,50 80,50 20,100 C -40,150 -40,150 20,200 
                           M 80,0 C 20,50 20,50 80,100 C 140,150 140,150 80,200
                           M 35,25 L 65,25 M 50,50 L 50,50 M 35,75 L 65,75
                           M 35,125 L 65,125 M 50,150 L 50,150 M 35,175 L 65,175" 
                    />
                </svg>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes rock-slow {
                    0% { transform: rotate(-5deg); }
                    100% { transform: rotate(5deg); }
                }
            `}} />
        </>
    );
}

export function AboutDecorations() {
    const slidesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!slidesRef.current) return;
        
        gsap.to(slidesRef.current, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: slidesRef.current.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.3
            }
        });
    }, []);

    return (
        <>
            {/* Parallax Microscope Slides */}
            <div ref={slidesRef} className="absolute inset-0 pointer-events-none opacity-5 z-0 overflow-hidden">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="slides" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                        <rect x="20" y="20" width="60" height="20" rx="2" fill="none" stroke="#e8eaec" strokeWidth="1" transform="rotate(15 50 30)" />
                        <rect x="120" y="80" width="60" height="20" rx="2" fill="none" stroke="#e8eaec" strokeWidth="1" transform="rotate(-20 150 90)" />
                        <rect x="40" y="140" width="60" height="20" rx="2" fill="none" stroke="#e8eaec" strokeWidth="1" transform="rotate(45 70 150)" />
                    </pattern>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#slides)" />
                </svg>
            </div>

            {/* Spinning Centrifuge Rotor (Corner) */}
            <div className="absolute top-[10%] right-[10%] pointer-events-none opacity-10 z-0 hidden md:block" style={{ animation: 'spin-slow 20s linear infinite' }}>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="#e8eaec" strokeWidth="1.5">
                    <circle cx="60" cy="60" r="50" strokeDasharray="4 4" />
                    <circle cx="60" cy="60" r="10" />
                    <line x1="60" y1="60" x2="60" y2="15" />
                    <line x1="60" y1="60" x2="60" y2="105" />
                    <line x1="60" y1="60" x2="15" y2="60" />
                    <line x1="60" y1="60" x2="105" y2="60" />
                    <circle cx="60" cy="20" r="6" />
                    <circle cx="60" cy="100" r="6" />
                    <circle cx="20" cy="60" r="6" />
                    <circle cx="100" cy="60" r="6" />
                </svg>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes spin-slow {
                    100% { transform: rotate(360deg); }
                }
            `}} />
        </>
    );
}

export function ProjectsDecorations() {
    return (
        <>
            {/* Chromatography Column Watermark */}
            <div className="absolute left-[5%] top-[20%] pointer-events-none opacity-[0.07] z-0 hidden xl:block">
                <svg width="80" height="400" viewBox="0 0 80 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="10" width="40" height="380" rx="5" stroke="#e8eaec" strokeWidth="2" />
                    <line x1="20" y1="40" x2="60" y2="40" stroke="#e8eaec" strokeWidth="2" />
                    <line x1="20" y1="360" x2="60" y2="360" stroke="#e8eaec" strokeWidth="2" />
                    {/* Gradient bands */}
                    <rect x="22" y="80" width="36" height="20" fill="#00e5cc" opacity="0.3" />
                    <rect x="22" y="150" width="36" height="40" fill="#00c8ff" opacity="0.2" />
                    <rect x="22" y="250" width="36" height="15" fill="#e8eaec" opacity="0.4" />
                    <path d="M40 390 L40 400" stroke="#e8eaec" strokeWidth="4" />
                </svg>
            </div>
        </>
    );
}

export function ContactDecorations() {
    return (
        <>
            {/* FACS Dot Plot Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.08] z-0 overflow-hidden" style={{ animation: 'drift 20s linear infinite alternate' }}>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#00e5cc">
                        {/* Cluster 1 (Teal) */}
                        {Array.from({ length: 150 }).map((_, i) => (
                            <circle key={`t-${i}`} cx={`${10 + Math.random() * 30}%`} cy={`${20 + Math.random() * 40}%`} r={Math.random() * 2 + 0.5} />
                        ))}
                    </g>
                    <g fill="#00c8ff">
                        {/* Cluster 2 (Cyan) */}
                        {Array.from({ length: 100 }).map((_, i) => (
                            <circle key={`c-${i}`} cx={`${60 + Math.random() * 20}%`} cy={`${50 + Math.random() * 30}%`} r={Math.random() * 2 + 0.5} />
                        ))}
                    </g>
                </svg>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes drift {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(-20px, 10px); }
                }
            `}} />
        </>
    );
}
