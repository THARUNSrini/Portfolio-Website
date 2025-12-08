"use client";

import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera, PerformanceMonitor } from "@react-three/drei";
import { useInView } from "framer-motion";
import ProteinRibbon from "./ProteinRibbon";
import DNAHelix from "./DNAHelix";
import CRISPRScissors from "./CRISPRScissors";
import GlowingParticles, { NucleotideParticles } from "./GlowingParticles";
import { Pipette, Microscope, CultureFlask, PCRMachine, WellPlate } from "./LabEquipment";
import NeuralNetwork from "./NeuralNetwork";

interface LabSceneProps {
    variant?: "hero" | "about" | "education" | "projects" | "publications" | "skills" | "contact";
    className?: string;
}

// Lazy loaded scene - only renders 3D when in viewport
export default function LabScene({ variant = "hero", className = "" }: LabSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, {
        margin: "-100px",
        once: false // Allow re-rendering when scrolling back
    });
    const [dpr, setDpr] = useState(1);
    const [shouldRender, setShouldRender] = useState(false);

    // Delay rendering to prevent all scenes loading at once
    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setShouldRender(true), 100);
            return () => clearTimeout(timer);
        } else {
            // Disable rendering when out of view to save GPU
            setShouldRender(false);
        }
    }, [isInView]);

    return (
        <div ref={containerRef} className={`absolute inset-0 ${className}`}>
            {shouldRender && (
                <Canvas
                    dpr={[1, dpr]}
                    gl={{
                        antialias: false, // Disable for performance
                        alpha: true,
                        powerPreference: "high-performance",
                        stencil: false,
                        depth: true
                    }}
                    frameloop="demand" // Only render when needed
                    performance={{ min: 0.5 }}
                >
                    <PerformanceMonitor
                        onDecline={() => setDpr(0.8)}
                        onIncline={() => setDpr(1.5)}
                    >
                        <Suspense fallback={null}>
                            <SceneContent variant={variant} />
                        </Suspense>
                    </PerformanceMonitor>
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
        case "projects":
            return <ProjectsScene />;
        case "publications":
            return <PublicationsScene />;
        case "skills":
            return <SkillsScene />;
        case "contact":
            return <ContactScene />;
        default:
            return <HeroScene />;
    }
}

// Hero: Optimized - fewer particles, simpler scene
function HeroScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#00e5ff" />

            {/* Main rotating protein - simplified */}
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
                <ProteinRibbon position={[0, 0, 0]} scale={0.7} speed={0.5} />
            </Float>

            {/* Background DNA - reduced complexity */}
            <DNAHelix position={[-4, 0, -4]} scale={0.4} />

            {/* Reduced particle count for performance */}
            <GlowingParticles count={60} radius={12} />

            <Environment preset="night" />
        </>
    );
}

// About: Simplified scene
function AboutScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={45} />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#00e5ff" />

            {/* Single DNA strand */}
            <Float speed={1} rotationIntensity={0.15}>
                <DNAHelix position={[0, 0, -2]} scale={0.35} />
            </Float>

            {/* Minimal particles */}
            <GlowingParticles count={40} radius={10} />

            <Environment preset="night" />
        </>
    );
}

// Education: Minimal scene
function EducationScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={50} />
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 5, 5]} intensity={0.8} color="#00e5ff" />

            {/* Single DNA */}
            <Float speed={0.8} rotationIntensity={0.15}>
                <DNAHelix position={[0, 0, 0]} scale={0.4} />
            </Float>

            {/* Minimal particles */}
            <GlowingParticles count={30} radius={8} />

            <Environment preset="night" />
        </>
    );
}

// Projects: Simplified
function ProjectsScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={45} />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#00e5ff" />

            {/* Simple protein */}
            <Float speed={0.8} rotationIntensity={0.2}>
                <ProteinRibbon position={[0, 0, 0]} scale={0.5} speed={0.3} />
            </Float>

            {/* Minimal particles */}
            <GlowingParticles count={40} radius={10} />

            <Environment preset="night" />
        </>
    );
}

// Publications: Minimal
function PublicationsScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 5, 5]} intensity={0.8} color="#00e5ff" />

            {/* Single DNA */}
            <Float speed={1} rotationIntensity={0.15}>
                <DNAHelix position={[0, 0, 0]} scale={0.4} />
            </Float>

            {/* Minimal particles */}
            <GlowingParticles count={30} radius={8} />

            <Environment preset="night" />
        </>
    );
}

// Skills: Simplified
function SkillsScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={45} />
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#00e5ff" />

            {/* Simple protein */}
            <Float speed={0.8} rotationIntensity={0.2}>
                <ProteinRibbon position={[0, 0, 0]} scale={0.4} speed={0.3} />
            </Float>

            {/* Minimal particles */}
            <GlowingParticles count={50} radius={12} />

            <Environment preset="night" />
        </>
    );
}

// Contact: Particle focus
function ContactScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 0, 5]} intensity={1} color="#00e5ff" />

            {/* Single DNA */}
            <Float speed={1.2} rotationIntensity={0.2}>
                <DNAHelix position={[0, 0, 0]} scale={0.5} />
            </Float>

            {/* More particles for finale */}
            <GlowingParticles count={80} radius={10} />

            <Environment preset="night" />
        </>
    );
}
