"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ProteinRibbonProps {
    position?: [number, number, number];
    scale?: number;
    speed?: number;
}

export default function ProteinRibbon({
    position = [0, 0, 0],
    scale = 1,
    speed = 1
}: ProteinRibbonProps) {
    const groupRef = useRef<THREE.Group>(null);

    // Generate simplified alpha helix ribbon path
    const { tubeGeometry, particlePositions } = useMemo(() => {
        const points: THREE.Vector3[] = [];
        const particles: THREE.Vector3[] = [];
        const segments = 60; // Reduced from 100

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const radius = 1.5 + Math.sin(t * Math.PI * 6) * 0.3;
            const angle = t * Math.PI * 8;
            const x = Math.cos(angle) * radius;
            const y = (t - 0.5) * 8;
            const z = Math.sin(angle) * radius;

            points.push(new THREE.Vector3(x, y, z));

            // Fewer particle positions
            if (i % 10 === 0) {
                particles.push(new THREE.Vector3(
                    x + (Math.random() - 0.5) * 0.5,
                    y + (Math.random() - 0.5) * 0.5,
                    z + (Math.random() - 0.5) * 0.5
                ));
            }
        }

        const curve = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(curve, 60, 0.12, 6, false); // Reduced segments

        return {
            tubeGeometry: geometry,
            particlePositions: particles
        };
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002 * speed;
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Main protein ribbon with gradient-like effect */}
            <mesh geometry={tubeGeometry}>
                <meshBasicMaterial
                    color="#00e5ff"
                    transparent
                    opacity={0.85}
                />
            </mesh>

            {/* Secondary strand for gradient effect */}
            <mesh geometry={tubeGeometry} scale={0.9}>
                <meshBasicMaterial
                    color="#00ff9f"
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Fewer glowing particles */}
            {particlePositions.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.06, 6, 6]} />
                    <meshBasicMaterial
                        color={i % 2 === 0 ? "#00e5ff" : "#00ff9f"}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            ))}

            {/* Core glow - reduced intensity */}
            <pointLight position={[0, 0, 0]} color="#00e5ff" intensity={1} distance={4} />
        </group>
    );
}
