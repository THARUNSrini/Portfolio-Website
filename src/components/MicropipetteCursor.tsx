"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function MicropipetteCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const dropletRef = useRef<SVGCircleElement>(null);
    
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    
    // Check if device has touch capability
    const [hasTouch, setHasTouch] = useState(true); // Default true to prevent flash of cursor on mobile

    useEffect(() => {
        setHasTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
        
        if (hasTouch) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;
        
        // Initial setup
        gsap.set(cursor, { xPercent: -10, yPercent: -10 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
            
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                ease: "power2.out"
            });
        };

        const onMouseDown = () => {
            setIsClicking(true);
            if (dropletRef.current) {
                gsap.to(dropletRef.current, {
                    cy: 32, // Move down
                    opacity: 0,
                    duration: 0.15,
                    ease: "power2.in"
                });
            }
        };

        const onMouseUp = () => {
            setIsClicking(false);
            if (dropletRef.current) {
                gsap.set(dropletRef.current, { cy: 26, opacity: isHovering ? 1 : 0 });
            }
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('a, button, input, textarea, select, [role="button"], .group, .glass-card, .hover-target, [tabindex="0"]');
            
            if (isClickable) {
                setIsHovering(true);
                gsap.to(cursor, {
                    filter: "drop-shadow(0 0 8px rgba(0, 229, 204, 0.8))",
                    duration: 0.3
                });
                if (dropletRef.current && !isClicking) {
                    gsap.to(dropletRef.current, {
                        opacity: 1,
                        r: 2.5,
                        duration: 0.2,
                        ease: "back.out(2)"
                    });
                }
            } else {
                setIsHovering(false);
                gsap.to(cursor, {
                    filter: "drop-shadow(0 0 2px rgba(0, 229, 204, 0.3))",
                    duration: 0.3
                });
                if (dropletRef.current) {
                    gsap.to(dropletRef.current, {
                        opacity: 0,
                        r: 0,
                        duration: 0.2
                    });
                }
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseover', onMouseOver);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseover', onMouseOver);
        };
    }, [hasTouch, isHovering, isClicking]);

    if (hasTouch) return null;

    return (
        <>
            {/* Main Pipette Cursor */}
            <div 
                ref={cursorRef} 
                className="fixed top-0 left-0 pointer-events-none z-[99999]"
                style={{ width: '32px', height: '32px' }}
            >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(-15deg)' }}>
                    {/* Ejector button */}
                    <rect x="14" y="2" width="4" height="3" fill="none" stroke="#00e5cc" strokeWidth="1.5" />
                    {/* Barrel body */}
                    <path d="M12 5 L20 5 L18 18 L14 18 Z" fill="none" stroke="#00e5cc" strokeWidth="1.5" strokeLinejoin="round" />
                    {/* Tip */}
                    <path d="M14 18 L18 18 L16.5 28 L15.5 28 Z" fill="none" stroke="#00e5cc" strokeWidth="1.5" strokeLinejoin="round" />
                    {/* Droplet (animated) */}
                    <circle ref={dropletRef} cx="16" cy="26" r="0" fill="#00e5cc" opacity="0" />
                </svg>
            </div>
            
            {/* Trailing Follower */}
            <div 
                ref={followerRef}
                className="fixed top-0 left-0 pointer-events-none z-[99998] w-1.5 h-1.5 rounded-full bg-[#00e5cc] opacity-40 mix-blend-screen"
            />
        </>
    );
}
