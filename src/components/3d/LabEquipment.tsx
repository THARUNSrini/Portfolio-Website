"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Pipette component
export function Pipette({ position = [0, 0, 0] as [number, number, number], scale = 1 }) {
    const groupRef = useRef<THREE.Group>(null);
    const dropletRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        }
        if (dropletRef.current) {
            const dropY = Math.sin(state.clock.elapsedTime * 2) * 0.5 - 2.3;
            dropletRef.current.position.y = dropY;
            dropletRef.current.visible = dropY > -2.5;
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Pipette body */}
            <mesh>
                <cylinderGeometry args={[0.08, 0.05, 2, 16]} />
                <meshStandardMaterial color="#e0e0e0" metalness={0.3} roughness={0.4} />
            </mesh>

            {/* Tip */}
            <mesh position={[0, -1.2, 0]}>
                <coneGeometry args={[0.05, 0.4, 16]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
            </mesh>

            {/* Liquid inside */}
            <mesh position={[0, -0.5, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
                <meshBasicMaterial color="#00e5ff" transparent opacity={0.6} />
            </mesh>

            {/* Droplet */}
            <mesh ref={dropletRef} position={[0, -2.3, 0]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} />
            </mesh>

            {/* Button */}
            <mesh position={[0, 1.1, 0]}>
                <cylinderGeometry args={[0.1, 0.08, 0.2, 16]} />
                <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.3} />
            </mesh>
        </group>
    );
}

// Microscope component
export function Microscope({ position = [0, 0, 0] as [number, number, number], scale = 1 }) {
    const lensFlareRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (lensFlareRef.current) {
            lensFlareRef.current.rotation.z += 0.02;
            const intensity = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7;
            (lensFlareRef.current.material as THREE.MeshBasicMaterial).opacity = intensity;
        }
    });

    return (
        <group position={position} scale={scale}>
            {/* Base */}
            <mesh position={[0, -0.8, 0]}>
                <boxGeometry args={[1.2, 0.15, 0.8]} />
                <meshStandardMaterial color="#1a202c" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Arm */}
            <mesh position={[0, 0.2, -0.2]}>
                <boxGeometry args={[0.15, 2, 0.3]} />
                <meshStandardMaterial color="#2d3748" metalness={0.6} roughness={0.4} />
            </mesh>

            {/* Head */}
            <mesh position={[0, 1.3, 0.2]} rotation={[0.3, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.2, 0.6, 16]} />
                <meshStandardMaterial color="#1a202c" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Eyepiece */}
            <mesh position={[0, 1.7, 0.35]} rotation={[0.3, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.1, 0.3, 16]} />
                <meshStandardMaterial color="#0a1128" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Lens flare effect */}
            <mesh ref={lensFlareRef} position={[0, 1.85, 0.4]} rotation={[0.3, 0, 0]}>
                <ringGeometry args={[0.02, 0.08, 16]} />
                <meshBasicMaterial color="#00e5ff" transparent opacity={0.7} side={THREE.DoubleSide} />
            </mesh>

            {/* Stage */}
            <mesh position={[0, -0.3, 0.3]}>
                <boxGeometry args={[0.6, 0.05, 0.6]} />
                <meshStandardMaterial color="#2d3748" metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Light indicator */}
            <pointLight position={[0, -0.2, 0.3]} color="#00e5ff" intensity={0.5} distance={1} />
        </group>
    );
}

// 96-well plate
export function WellPlate({ position = [0, 0, 0] as [number, number, number], scale = 1 }) {
    const wells = useMemo(() => {
        const items = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 12; col++) {
                const filled = Math.random() > 0.3;
                items.push({
                    position: [(col - 5.5) * 0.1, 0.05, (row - 3.5) * 0.1] as [number, number, number],
                    filled,
                    color: filled ? (Math.random() > 0.5 ? "#00e5ff" : "#00ff9f") : "transparent"
                });
            }
        }
        return items;
    }, []);

    return (
        <group position={position} scale={scale}>
            {/* Plate body */}
            <mesh>
                <boxGeometry args={[1.4, 0.1, 1]} />
                <meshStandardMaterial color="#f0f0f0" transparent opacity={0.9} />
            </mesh>

            {/* Wells */}
            {wells.map((well, i) => (
                <group key={i} position={well.position}>
                    <mesh>
                        <cylinderGeometry args={[0.035, 0.035, 0.08, 8]} />
                        <meshStandardMaterial color="#e0e0e0" />
                    </mesh>
                    {well.filled && (
                        <mesh position={[0, 0.02, 0]}>
                            <cylinderGeometry args={[0.03, 0.03, 0.04, 8]} />
                            <meshBasicMaterial color={well.color} transparent opacity={0.7} />
                        </mesh>
                    )}
                </group>
            ))}
        </group>
    );
}

// Centrifuge
export function Centrifuge({ position = [0, 0, 0] as [number, number, number], scale = 1, spinning = true }) {
    const rotorRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (rotorRef.current && spinning) {
            rotorRef.current.rotation.y += 0.1;
        }
    });

    return (
        <group position={position} scale={scale}>
            {/* Body */}
            <mesh>
                <cylinderGeometry args={[0.8, 0.8, 0.5, 32]} />
                <meshStandardMaterial color="#e0e0e0" metalness={0.4} roughness={0.4} />
            </mesh>

            {/* Lid */}
            <mesh position={[0, 0.35, 0]}>
                <cylinderGeometry args={[0.75, 0.85, 0.2, 32]} />
                <meshStandardMaterial color="#d0d0d0" metalness={0.5} roughness={0.3} />
            </mesh>

            {/* Rotor (visible through transparent lid) */}
            <group ref={rotorRef} position={[0, 0.1, 0]}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <mesh key={i} position={[Math.cos(i * Math.PI / 3) * 0.4, 0, Math.sin(i * Math.PI / 3) * 0.4]}>
                        <cylinderGeometry args={[0.08, 0.06, 0.2, 8]} />
                        <meshBasicMaterial color={i % 2 === 0 ? "#00e5ff" : "#00ff9f"} transparent opacity={0.7} />
                    </mesh>
                ))}
            </group>

            {/* Control panel */}
            <mesh position={[0.5, 0.6, 0]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.3, 0.15, 0.1]} />
                <meshStandardMaterial color="#1a202c" />
            </mesh>

            {/* LED indicator */}
            <mesh position={[0.4, 0.62, 0.06]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color={spinning ? "#00ff9f" : "#ff0000"} />
            </mesh>
        </group>
    );
}

// Cell culture flask
export function CultureFlask({ position = [0, 0, 0] as [number, number, number], scale = 1, bubbling = true }) {
    const bubblesRef = useRef<THREE.Group>(null);
    const bubblePositions = useMemo(() => {
        return Array.from({ length: 10 }, () => ({
            x: (Math.random() - 0.5) * 0.3,
            z: (Math.random() - 0.5) * 0.3,
            speed: 0.5 + Math.random() * 0.5,
            phase: Math.random() * Math.PI * 2
        }));
    }, []);

    useFrame((state) => {
        if (bubblesRef.current && bubbling) {
            bubblesRef.current.children.forEach((bubble, i) => {
                const pos = bubblePositions[i];
                bubble.position.y = ((state.clock.elapsedTime * pos.speed + pos.phase) % 1) * 0.5 - 0.1;
            });
        }
    });

    return (
        <group position={position} scale={scale}>
            {/* Flask body */}
            <mesh>
                <boxGeometry args={[0.6, 0.8, 0.15]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>

            {/* Neck */}
            <mesh position={[0, 0.55, 0]}>
                <cylinderGeometry args={[0.08, 0.1, 0.3, 16]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>

            {/* Cap */}
            <mesh position={[0, 0.75, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
                <meshStandardMaterial color="#00e5ff" />
            </mesh>

            {/* Media */}
            <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[0.55, 0.5, 0.12]} />
                <meshBasicMaterial color="#ff9f9f" transparent opacity={0.4} />
            </mesh>

            {/* Bubbles */}
            <group ref={bubblesRef}>
                {bubblePositions.map((pos, i) => (
                    <mesh key={i} position={[pos.x, 0, pos.z]}>
                        <sphereGeometry args={[0.02, 8, 8]} />
                        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

// PCR Machine
export function PCRMachine({ position = [0, 0, 0] as [number, number, number], scale = 1 }) {
    const indicatorRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (indicatorRef.current) {
            const phase = Math.floor(state.clock.elapsedTime / 2) % 3;
            const colors = ["#00e5ff", "#00ff9f", "#ffff00"];
            (indicatorRef.current.material as THREE.MeshBasicMaterial).color.set(colors[phase]);
        }
    });

    return (
        <group position={position} scale={scale}>
            {/* Body */}
            <mesh>
                <boxGeometry args={[1, 0.6, 0.8]} />
                <meshStandardMaterial color="#e0e0e0" metalness={0.3} roughness={0.5} />
            </mesh>

            {/* Lid */}
            <mesh position={[0, 0.35, 0]}>
                <boxGeometry args={[0.9, 0.1, 0.7]} />
                <meshStandardMaterial color="#c0c0c0" metalness={0.4} roughness={0.4} />
            </mesh>

            {/* Display */}
            <mesh position={[0, 0.15, 0.41]}>
                <boxGeometry args={[0.4, 0.2, 0.02]} />
                <meshBasicMaterial color="#0a1128" />
            </mesh>

            {/* Temperature display */}
            <mesh position={[0, 0.15, 0.42]}>
                <planeGeometry args={[0.35, 0.15]} />
                <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} />
            </mesh>

            {/* Status indicator */}
            <mesh ref={indicatorRef} position={[0.35, 0.15, 0.41]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial color="#00e5ff" />
            </mesh>
        </group>
    );
}

// Gel Electrophoresis Rig
export function GelElectrophoresis({
    position = [0, 0, 0] as [number, number, number],
    scale = 1,
    running = true
}) {
    const bandsRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (bandsRef.current && running) {
            bandsRef.current.children.forEach((band, i) => {
                const progress = (state.clock.elapsedTime * 0.1 + i * 0.1) % 1;
                band.position.z = -0.3 + progress * 0.6;
            });
        }
    });

    return (
        <group position={position} scale={scale}>
            {/* Tank body */}
            <mesh>
                <boxGeometry args={[1.2, 0.2, 0.8]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>

            {/* Buffer solution */}
            <mesh position={[0, -0.02, 0]}>
                <boxGeometry args={[1.15, 0.12, 0.75]} />
                <meshBasicMaterial color="#00b8d4" transparent opacity={0.3} />
            </mesh>

            {/* Gel */}
            <mesh position={[0, 0.05, 0]}>
                <boxGeometry args={[0.8, 0.08, 0.6]} />
                <meshStandardMaterial color="#f0f0f0" transparent opacity={0.7} />
            </mesh>

            {/* UV light glow */}
            <mesh position={[0, 0.15, 0]}>
                <boxGeometry args={[0.8, 0.02, 0.6]} />
                <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
            </mesh>

            {/* DNA bands */}
            <group ref={bandsRef}>
                {[0, 1, 2, 3, 4].map((i) => (
                    <mesh key={i} position={[(i - 2) * 0.15, 0.1, -0.2 + i * 0.08]}>
                        <boxGeometry args={[0.08, 0.02, 0.02]} />
                        <meshBasicMaterial color="#00ff9f" />
                    </mesh>
                ))}
            </group>

            {/* Electrodes */}
            <mesh position={[-0.55, 0.05, 0]}>
                <boxGeometry args={[0.05, 0.15, 0.7]} />
                <meshStandardMaterial color="#ff0000" />
            </mesh>
            <mesh position={[0.55, 0.05, 0]}>
                <boxGeometry args={[0.05, 0.15, 0.7]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
        </group>
    );
}
