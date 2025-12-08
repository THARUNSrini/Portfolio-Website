"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CRISPRScissorsProps {
    position?: [number, number, number];
    scale?: number;
    cutting?: boolean;
}

export default function CRISPRScissors({
    position = [0, 0, 0],
    scale = 1,
    cutting = true
}: CRISPRScissorsProps) {
    const groupRef = useRef<THREE.Group>(null);
    const blade1Ref = useRef<THREE.Group>(null);
    const blade2Ref = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.Points>(null);

    // Create blade geometry
    const bladeGeometry = useMemo(() => {
        const shape = new THREE.Shape();
        // Scissor blade shape
        shape.moveTo(0, 0);
        shape.lineTo(2, 0.3);
        shape.quadraticCurveTo(2.5, 0.2, 2.8, -0.1);
        shape.lineTo(2.8, -0.3);
        shape.quadraticCurveTo(2.5, 0, 2, -0.2);
        shape.lineTo(0, -0.1);
        shape.lineTo(0, 0);

        const extrudeSettings = {
            depth: 0.1,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelSegments: 3
        };

        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }, []);

    // Handle geometry - ring shape
    const handleGeometry = useMemo(() => {
        return new THREE.TorusGeometry(0.3, 0.08, 8, 16);
    }, []);

    // Particle positions for cutting effect
    const particlePositions = useMemo(() => {
        const positions = new Float32Array(50 * 3);
        for (let i = 0; i < 50; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 0.5;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;

        // Gentle rotation
        groupRef.current.rotation.y += 0.003;

        if (cutting) {
            // Cutting animation - blades open and close
            const cutAngle = Math.sin(state.clock.elapsedTime * 2) * 0.3;

            if (blade1Ref.current) {
                blade1Ref.current.rotation.z = cutAngle;
            }
            if (blade2Ref.current) {
                blade2Ref.current.rotation.z = -cutAngle;
            }

            // Particle burst on cut
            if (particlesRef.current) {
                const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
                const time = state.clock.elapsedTime;

                for (let i = 0; i < 50; i++) {
                    const i3 = i * 3;
                    const speed = Math.sin(time * 3 + i) > 0.8 ? 0.05 : 0;
                    positions[i3] += (Math.random() - 0.5) * speed;
                    positions[i3 + 1] += Math.random() * speed;
                    positions[i3 + 2] += (Math.random() - 0.5) * speed;

                    // Reset particles
                    if (Math.abs(positions[i3]) > 1 || positions[i3 + 1] > 1) {
                        positions[i3] = (Math.random() - 0.5) * 0.2;
                        positions[i3 + 1] = (Math.random() - 0.5) * 0.2;
                        positions[i3 + 2] = (Math.random() - 0.5) * 0.2;
                    }
                }
                particlesRef.current.geometry.attributes.position.needsUpdate = true;
            }
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Blade 1 (top) */}
            <group ref={blade1Ref} position={[0, 0.1, 0]}>
                <mesh geometry={bladeGeometry}>
                    <meshStandardMaterial
                        color="#4a5568"
                        metalness={0.9}
                        roughness={0.1}
                        emissive="#00e5ff"
                        emissiveIntensity={0.1}
                    />
                </mesh>
                {/* Cutting edge glow */}
                <mesh position={[1.5, 0, 0.05]}>
                    <boxGeometry args={[1.5, 0.02, 0.02]} />
                    <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} />
                </mesh>
                {/* Handle */}
                <mesh geometry={handleGeometry} position={[-0.4, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
                </mesh>
            </group>

            {/* Blade 2 (bottom) - mirrored */}
            <group ref={blade2Ref} position={[0, -0.1, 0]} scale={[1, -1, 1]}>
                <mesh geometry={bladeGeometry}>
                    <meshStandardMaterial
                        color="#4a5568"
                        metalness={0.9}
                        roughness={0.1}
                        emissive="#00ff9f"
                        emissiveIntensity={0.1}
                    />
                </mesh>
                {/* Cutting edge glow */}
                <mesh position={[1.5, 0, 0.05]}>
                    <boxGeometry args={[1.5, 0.02, 0.02]} />
                    <meshBasicMaterial color="#00ff9f" transparent opacity={0.8} />
                </mesh>
                {/* Handle */}
                <mesh geometry={handleGeometry} position={[-0.4, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
                </mesh>
            </group>

            {/* Pivot point */}
            <mesh>
                <cylinderGeometry args={[0.15, 0.15, 0.25, 16]} />
                <meshStandardMaterial color="#1a202c" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* DNA strand being cut */}
            <DNAStrandFragment position={[2.2, 0, 0]} />

            {/* Cutting particles */}
            {cutting && (
                <points ref={particlesRef} position={[2, 0, 0]}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={50}
                            array={particlePositions}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <pointsMaterial
                        size={0.05}
                        color="#00e5ff"
                        transparent
                        opacity={0.8}
                        blending={THREE.AdditiveBlending}
                    />
                </points>
            )}

            {/* Glow light */}
            <pointLight position={[1.5, 0, 0]} color="#00e5ff" intensity={1} distance={3} />
        </group>
    );
}

// DNA strand fragment for the scissors
function DNAStrandFragment({ position }: { position: [number, number, number] }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Simple DNA fragment representation */}
            {[...Array(5)].map((_, i) => {
                const angle = (i / 5) * Math.PI;
                const y = (i - 2) * 0.3;
                return (
                    <group key={i}>
                        {/* Strand 1 */}
                        <mesh position={[Math.cos(angle) * 0.3, y, Math.sin(angle) * 0.3]}>
                            <sphereGeometry args={[0.06, 8, 8]} />
                            <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} />
                        </mesh>
                        {/* Strand 2 */}
                        <mesh position={[Math.cos(angle + Math.PI) * 0.3, y, Math.sin(angle + Math.PI) * 0.3]}>
                            <sphereGeometry args={[0.06, 8, 8]} />
                            <meshBasicMaterial color="#00ff9f" transparent opacity={0.8} />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
}
