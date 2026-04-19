"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Translucent cell membrane
function CellMembrane({ radius = 2, color = "#22C55E" }: { radius?: number; color?: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const wireRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Breathing animation
            const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
            meshRef.current.scale.setScalar(breathe);
            if (wireRef.current) wireRef.current.scale.setScalar(breathe);
        }
    });

    return (
        <group>
            {/* Solid translucent membrane */}
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[radius, 2]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.1}
                    transparent
                    opacity={0.08}
                    side={THREE.DoubleSide}
                />
            </mesh>
            {/* Wireframe overlay */}
            <mesh ref={wireRef}>
                <icosahedronGeometry args={[radius, 2]} />
                <meshBasicMaterial
                    color={color}
                    wireframe
                    transparent
                    opacity={0.15}
                />
            </mesh>
        </group>
    );
}

// Nucleus
function Nucleus({ position = [0, 0, 0] as [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
            meshRef.current.scale.setScalar(pulse);
        }
    });

    return (
        <group position={position}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.6, 16, 16]} />
                <meshStandardMaterial
                    color="#FFB800"
                    emissive="#FFB800"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.6}
                />
            </mesh>
            {/* Nuclear envelope */}
            <mesh>
                <sphereGeometry args={[0.65, 16, 16]} />
                <meshBasicMaterial
                    color="#FFB800"
                    wireframe
                    transparent
                    opacity={0.2}
                />
            </mesh>
            {/* Light removed to prevent WebGL limit issues */}
        </group>
    );
}

// Mitochondria-like organelles
function Organelles({ count = 5, radius = 1.2 }: { count?: number; radius?: number }) {
    const groupRef = useRef<THREE.Group>(null);

    const organelles = useMemo(() => {
        const items: { pos: THREE.Vector3; rot: number; scale: number }[] = [];
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = radius * (0.4 + Math.random() * 0.6);
            items.push({
                pos: new THREE.Vector3(
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi)
                ),
                rot: Math.random() * Math.PI,
                scale: 0.08 + Math.random() * 0.08,
            });
        }
        return items;
    }, [count, radius]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {organelles.map((org, i) => (
                <mesh key={i} position={org.pos} rotation={[org.rot, org.rot * 0.5, 0]}>
                    <capsuleGeometry args={[org.scale, org.scale * 3, 4, 8]} />
                    <meshStandardMaterial
                        color="#F472B6"
                        emissive="#F472B6"
                        emissiveIntensity={0.3}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            ))}
        </group>
    );
}

// ER-like tubular network
function EndoplasmicReticulum() {
    const groupRef = useRef<THREE.Group>(null);

    const tubeGeometry = useMemo(() => {
        const points: THREE.Vector3[] = [];
        for (let i = 0; i <= 20; i++) {
            const t = i / 20;
            points.push(new THREE.Vector3(
                Math.sin(t * Math.PI * 3) * 0.8,
                (t - 0.5) * 2.5,
                Math.cos(t * Math.PI * 2) * 0.6
            ));
        }
        const curve = new THREE.CatmullRomCurve3(points);
        return new THREE.TubeGeometry(curve, 30, 0.04, 6, false);
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0015;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh geometry={tubeGeometry}>
                <meshStandardMaterial
                    color="#3B82F6"
                    emissive="#3B82F6"
                    emissiveIntensity={0.2}
                    transparent
                    opacity={0.4}
                />
            </mesh>
        </group>
    );
}

// Chloroplast disc stacks (plant origin element)
function Chloroplasts({ count = 3 }: { count?: number }) {
    const groupRef = useRef<THREE.Group>(null);

    const positions = useMemo(() => {
        const items: THREE.Vector3[] = [];
        for (let i = 0; i < count; i++) {
            items.push(new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 1.5,
                (Math.random() - 0.5) * 1.5
            ));
        }
        return items;
    }, [count]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {positions.map((pos, i) => (
                <group key={i} position={pos}>
                    {/* Stacked thylakoid discs */}
                    {[...Array(4)].map((_, j) => (
                        <mesh key={j} position={[0, j * 0.06 - 0.09, 0]}>
                            <cylinderGeometry args={[0.12, 0.12, 0.03, 8]} />
                            <meshStandardMaterial
                                color="#22C55E"
                                emissive="#22C55E"
                                emissiveIntensity={0.4}
                                transparent
                                opacity={0.5}
                            />
                        </mesh>
                    ))}
                </group>
            ))}
        </group>
    );
}

// Full cell with all organelles
export default function CellStructures({
    position = [0, 0, 0] as [number, number, number],
    scale = 1
}: {
    position?: [number, number, number];
    scale?: number;
}) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            <CellMembrane radius={2} color="#22C55E" />
            <Nucleus position={[0, 0, 0]} />
            <Organelles count={6} radius={1.3} />
            <EndoplasmicReticulum />
            <Chloroplasts count={3} />
        </group>
    );
}
