"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FlaskConical, Dna, Pipette, Beaker } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function LabBenchDivider({ iconType = "beaker" }: { iconType?: "beaker" | "dna" | "pipette" | "flask" }) {
    const dividerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!dividerRef.current || !iconRef.current) return;

        gsap.fromTo(iconRef.current, 
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: dividerRef.current,
                    start: "top 80%",
                    once: true,
                }
            }
        );
    }, []);

    const renderIcon = () => {
        const props = { className: "w-5 h-5 text-[#00e5cc]" };
        switch (iconType) {
            case "beaker": return <Beaker {...props} />;
            case "dna": return <Dna {...props} />;
            case "pipette": return <Pipette {...props} />;
            case "flask": return <FlaskConical {...props} />;
            default: return <Beaker {...props} />;
        }
    };

    return (
        <div ref={dividerRef} className="w-full flex items-center justify-center py-8 relative">
            {/* The thin line */}
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00e5cc]/30 to-transparent"></div>
            
            {/* The icon in the center */}
            <div 
                ref={iconRef}
                className="relative z-10 w-10 h-10 rounded-full bg-[#0a0d0f] border border-[#00e5cc]/50 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,204,0.3)]"
            >
                {renderIcon()}
            </div>
        </div>
    );
}
