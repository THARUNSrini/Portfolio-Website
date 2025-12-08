"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GlowingParticlesProps {
    count?: number;
    radius?: number;
    color?: string;
    secondaryColor?: string;
}

export default function GlowingParticles({
    count = 100,
    radius = 10,
    color = "#00e5ff",
    secondaryColor = "#00ff9f"
}: GlowingParticlesProps) {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorA = new THREE.Color(color);
        const colorB = new THREE.Color(secondaryColor);

        for (let i = 0; i < count; i++) {
            // Spherical distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * Math.cbrt(Math.random());

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            // Gradient between teal and green
            const t = Math.random();
            const particleColor = colorA.clone().lerp(colorB, t);
            colors[i * 3] = particleColor.r;
            colors[i * 3 + 1] = particleColor.g;
            colors[i * 3 + 2] = particleColor.b;
        }

        return { positions, colors };
    }, [count, radius, color, secondaryColor]);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.0003;
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
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

// Simplified nucleotide particles
export function NucleotideParticles({ count = 15, radius = 6 }: { count?: number; radius?: number }) {
    const groupRef = useRef<THREE.Group>(null);

    const particles = useMemo(() => {
        const items = [];
        const colors = ['#00e5ff', '#00ff9f', '#00b8d4', '#00c853'];

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
                color: colors[i % 4],
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
                    <sphereGeometry args={[0.1, 6, 6]} />
                    <meshBasicMaterial color={particle.color} transparent opacity={0.7} />
                </mesh>
            ))}
        </group>
    );
}
