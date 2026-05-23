"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Create a noisy/jittery line path for the trace
const generateNoisyPath = (height: number, width: number = 20) => {
    let path = `M ${width / 2} 0 `;
    const segments = 50; // Number of vertical segments
    const segmentHeight = height / segments;

    for (let i = 1; i <= segments; i++) {
        const y = i * segmentHeight;
        // Add some random horizontal jitter
        const xOffset = (Math.random() - 0.5) * width;
        path += `L ${width / 2 + xOffset} ${y} `;
    }

    return path;
};

export default function ScrollTrace() {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        if (!pathRef.current) return;

        const path = pathRef.current;
        const length = path.getTotalLength();

        // Set up initial state for stroke animation
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length
        });

        // Create ScrollTrigger animation
        const traceAnim = gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Smooth scrub
            }
        });

        return () => {
            if (traceAnim.scrollTrigger) {
                traceAnim.scrollTrigger.kill();
            }
            traceAnim.kill();
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-[30px] h-full pointer-events-none z-[1] opacity-60 mix-blend-screen hidden sm:block">
            <svg 
                ref={svgRef}
                width="100%" 
                height="100%" 
                preserveAspectRatio="none"
                className="overflow-visible"
            >
                {/* A faint straight background line */}
                <line 
                    x1="15" 
                    y1="0" 
                    x2="15" 
                    y2="100%" 
                    stroke="#00e5cc" 
                    strokeWidth="0.5" 
                    opacity="0.1" 
                    strokeDasharray="4 4"
                />
                
                {/* The animated jittery trace line */}
                <path
                    ref={pathRef}
                    d={generateNoisyPath(4000, 15)} // Generate a long enough path (4000px). The SVG is scaled to 100% height.
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                    stroke="#00e5cc"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_8px_rgba(0,229,204,0.6)]"
                />
            </svg>
        </div>
    );
}
