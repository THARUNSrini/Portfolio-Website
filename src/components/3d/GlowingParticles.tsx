"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GlowingParticlesProps {
    count?: number;
    radius?: number;
    colors?: string[];
}

export default function GlowingParticles({
    count = 100,
    radius = 10,
    // Default to the new cyan/green bioluminescent palette
    colors = ["#00f5d4", "#39ff14", "#72fce8"]
}: GlowingParticlesProps) {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, colorArray } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colorArray = new Float32Array(count * 3);

        const threeColors = colors.map(c => new THREE.Color(c));

        for (let i = 0; i < count; i++) {
            // Spherical distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * Math.cbrt(Math.random());

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            // Assign random color from palette
            const particleColor = threeColors[Math.floor(Math.random() * threeColors.length)];
            
            colorArray[i * 3] = particleColor.r;
            colorArray[i * 3 + 1] = particleColor.g;
            colorArray[i * 3 + 2] = particleColor.b;
        }

        return { positions, colorArray };
    }, [count, radius, colors]);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.0003;
            // Twinkling size oscillation
            const material = pointsRef.current.material as THREE.PointsMaterial;
            material.size = 0.1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colorArray}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

// Simplified nucleotide particles (Updated colors)
export function NucleotideParticles({ count = 15, radius = 6 }: { count?: number; radius?: number }) {
    const groupRef = useRef<THREE.Group>(null);

    const particles = useMemo(() => {
        const items = [];
        const pallete = ['#00f5d4', '#39ff14', '#00c4a7'];

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * (0.5 + Math.random() * 0.5);

            items.push({
                position: [
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi)
                ] as [number, number, number],
                color: pallete[i % 3],
            });
        }

        return items;
    }, [count, radius]);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <group ref={groupRef}>
            {particles.map((particle, i) => (
                <mesh key={i} position={particle.position}>
                    <sphereGeometry args={[0.08, 6, 6]} />
                    <meshBasicMaterial color={particle.color} transparent opacity={0.6} />
                </mesh>
            ))}
        </group>
    );
}
