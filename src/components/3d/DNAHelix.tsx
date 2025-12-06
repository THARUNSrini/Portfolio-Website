"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DNAHelix() {
    const groupRef = useRef<THREE.Group>(null);

    // Generate particles for a double helix
    const particles = useMemo(() => {
        const temp = [];
        const count = 200; // Number of base pairs
        const radius = 2;
        const height = 15;
        const turns = 3;

        for (let i = 0; i < count; i++) {
            const t = (i / count) * Math.PI * 2 * turns;
            const x1 = Math.cos(t) * radius;
            const z1 = Math.sin(t) * radius;
            const y = (i / count) * height - height / 2;

            const x2 = Math.cos(t + Math.PI) * radius;
            const z2 = Math.sin(t + Math.PI) * radius;

            // Strand 1
            temp.push({ position: [x1, y, z1], color: "#00f7ff" });
            // Strand 2
            temp.push({ position: [x2, y, z2], color: "#ff00aa" });

            // Connection (base pair) - occasionally add particles in between
            if (i % 5 === 0) {
                for (let j = 1; j < 5; j++) {
                    const ratio = j / 5;
                    const bx = x1 * (1 - ratio) + x2 * ratio;
                    const bz = z1 * (1 - ratio) + z2 * ratio;
                    temp.push({ position: [bx, y, bz], color: "#ffffff", size: 0.05 });
                }
            }
        }
        return temp;
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.2; // Slow rotation
        }
    });

    return (
        <group ref={groupRef} rotation={[0, 0, Math.PI / 6]}>
            {particles.map((p, i) => (
                <mesh key={i} position={new THREE.Vector3(...(p.position as [number, number, number]))}>
                    <sphereGeometry args={[p.size || 0.1, 8, 8]} />
                    <meshBasicMaterial color={p.color} transparent opacity={0.8} />
                </mesh>
            ))}
        </group>
    );
}
