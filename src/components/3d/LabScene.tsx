"use client";

import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import { useInView } from "framer-motion";
import ProteinRibbon from "./ProteinRibbon";
import DNAHelix from "./DNAHelix";
import GlowingParticles from "./GlowingParticles";
import CinematicHeroScene from "./CinematicHeroScene";
import { Pipette, Microscope, CultureFlask, PCRMachine, WellPlate, Centrifuge } from "./LabEquipment";

interface LabSceneProps {
    variant?: "hero" | "about" | "education" | "experience" | "projects" | "publications" | "skills" | "contact";
    className?: string;
}

// Lazy loaded scene - only renders 3D when in viewport
export default function LabScene({ variant = "hero", className = "" }: LabSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, {
        margin: "-100px",
        once: false // Allow re-rendering when scrolling back
    });
    const [shouldRender, setShouldRender] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Delay rendering to prevent all scenes loading at once
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        if (isInView) {
            const timer = setTimeout(() => setShouldRender(true), 100);
            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', checkMobile);
            };
        } else {
            // Disable rendering when out of view to save GPU
            setShouldRender(false);
            return () => window.removeEventListener('resize', checkMobile);
        }
    }, [isInView]);

    // Don't render complex 3D scenes on mobile, fall back to CSS gradients
    if (isMobile && variant !== "hero") {
        return null; // The CSS class .mobile-gradient-fallback in the section will take over
    }

    return (
        <div ref={containerRef} className={`absolute inset-0 pointer-events-none three-canvas-wrapper ${className}`}>
            {shouldRender && (
                <Canvas
                    dpr={variant === "hero" ? [1, 1.5] : [1, 1]}
                    gl={{
                        antialias: variant === "hero",
                        alpha: true,
                        powerPreference: "high-performance",
                        stencil: false,
                        depth: true
                    }}
                    frameloop={variant === "hero" ? "always" : "demand"}
                    performance={{ min: 0.5 }}
                >
                    <Suspense fallback={null}>
                        <SceneContent variant={variant} />
                    </Suspense>
                </Canvas>
            )}
        </div>
    );
}

function SceneContent({ variant }: { variant: string }) {
    switch (variant) {
        case "hero":
            return <HeroScene />;
        case "about":
            return <AboutScene />;
        case "education":
            return <EducationScene />; 
        case "experience":
            return <ExperienceScene />; 
        case "projects":
            return <ProjectsScene />;
        case "publications":
            return <MobileFallbackScene />;
        case "skills":
            return <SkillsScene />;
        case "contact":
            return <MobileFallbackScene />;
        default:
            return <HeroScene />;
    }
}

// Hero: Cinematic orchestrated scene
function HeroScene() {
    return <CinematicHeroScene />;
}

// Ultra minimal scene for sections that don't need heavy 3D
function MobileFallbackScene() {
    return null; 
}

// About: Microscope & DNA
function AboutScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={45} />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#00f5d4" />
            <pointLight position={[-5, 0, 5]} intensity={0.5} color="#39ff14" />

            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
                <Microscope position={[-3, -1, 0]} scale={1.5} />
            </Float>

            <Float speed={1} rotationIntensity={0.15}>
                <DNAHelix position={[3, 0, -2]} scale={0.3} color1="#00f5d4" color2="#39ff14" />
            </Float>

            <GlowingParticles count={40} radius={10} colors={["#00f5d4", "#39ff14"]} />
            <Environment preset="night" />
        </>
    );
}

// Education: Centrifuge & Culture Flask
function EducationScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={45} />
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 5, 5]} intensity={0.8} color="#00f5d4" />

            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <Centrifuge position={[-3, -1, 0]} scale={1.2} spinning={true} />
            </Float>

            <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
                <CultureFlask position={[4, 0, -2]} scale={1.5} bubbling={true} />
            </Float>

            <GlowingParticles count={30} radius={8} colors={["#00f5d4", "#39ff14"]} />
            <Environment preset="night" />
        </>
    );
}

// Experience: Pipette & WellPlate
function ExperienceScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={45} />
            <ambientLight intensity={0.4} />
            <pointLight position={[3, 4, 3]} intensity={1} color="#00f5d4" />
            <pointLight position={[-3, 2, 2]} intensity={0.5} color="#39ff14" />

            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
                <WellPlate position={[0, -1, 0]} scale={2} />
            </Float>

            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Pipette position={[-1, 2, 0]} scale={1.5} />
            </Float>

            <GlowingParticles count={45} radius={12} colors={["#00f5d4", "#39ff14"]} />
            <Environment preset="night" />
        </>
    );
}

// Projects: PCR Machine & Protein
function ProjectsScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={45} />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#00f5d4" />
            <pointLight position={[-5, 3, 0]} intensity={0.5} color="#39ff14" />

            <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.5}>
                <PCRMachine position={[4, -1, 0]} scale={1.5} />
            </Float>

            <Float speed={0.8} rotationIntensity={0.2}>
                <ProteinRibbon position={[-3, 0, -2]} scale={0.4} speed={0.3} color="#00f5d4" />
            </Float>

            <GlowingParticles count={40} radius={10} colors={["#00f5d4", "#39ff14"]} />
            <Environment preset="night" />
        </>
    );
}

// Skills: DNA & Centrifuge (Simplified cinematic loop)
function SkillsScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={45} />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#00f5d4" />

            <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
                <DNAHelix position={[-4, 0, -2]} scale={0.4} color1="#00f5d4" color2="#39ff14" />
            </Float>

            <GlowingParticles count={50} radius={12} colors={["#00f5d4", "#39ff14"]} />
            <Environment preset="night" />
        </>
    );
}
