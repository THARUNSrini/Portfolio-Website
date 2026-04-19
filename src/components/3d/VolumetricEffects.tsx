"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Ultra-fine atmospheric dust particles
function AtmosphericDust({ count = 200, radius = 15 }: { count?: number; radius?: number }) {
    const pointsRef = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * radius * 2;
            pos[i * 3 + 1] = (Math.random() - 0.5) * radius * 2;
            pos[i * 3 + 2] = (Math.random() - 0.5) * radius * 2;
        }
        return pos;
    }, [count, radius]);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.0001;
            const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < count; i++) {
                // Slow vertical drift
                posArr[i * 3 + 1] += 0.002;
                // Reset when too high
                if (posArr[i * 3 + 1] > radius) {
                    posArr[i * 3 + 1] = -radius;
                }
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true;

            // Twinkling
            const mat = pointsRef.current.material as THREE.PointsMaterial;
            mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
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
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#F5F2EB"
                transparent
                opacity={0.3}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

// Volumetric light cone
function LightShaft({
    position = [0, 5, 0] as [number, number, number],
    color = "#FFB800",
    angle = 0.3,
    height = 8
}: {
    position?: [number, number, number];
    color?: string;
    angle?: number;
    height?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const mat = meshRef.current.material as THREE.MeshBasicMaterial;
            mat.opacity = 0.03 + Math.sin(state.clock.elapsedTime * 0.4) * 0.015;
        }
    });

    return (
        <mesh ref={meshRef} position={position} rotation={[0, 0, angle]}>
            <coneGeometry args={[2, height, 16, 1, true]} />
            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.04}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    );
}

// Ambient color rig — strategically placed colored lights
function AmbientLightRig() {
    return (
        <group>
            {/* Main amber key light */}
            <pointLight position={[8, 6, 4]} color="#FFB800" intensity={0.6} distance={20} />
            {/* Green fill light */}
            <pointLight position={[-6, -3, 6]} color="#22C55E" intensity={0.4} distance={18} />
            {/* Rose accent from below */}
            <pointLight position={[0, -8, -2]} color="#F472B6" intensity={0.2} distance={15} />
            {/* Blue backlight for depth */}
            <pointLight position={[-3, 4, -8]} color="#3B82F6" intensity={0.3} distance={16} />
            {/* Soft ambient fill */}
            <ambientLight intensity={0.15} color="#1a1a2e" />
        </group>
    );
}

// Full volumetric effects setup
export default function VolumetricEffects() {
    return (
        <group>
            {/* Atmospheric dust */}
            <AtmosphericDust count={150} radius={12} />

            {/* Light shafts */}
            <LightShaft position={[5, 8, -3]} color="#FFB800" angle={-0.2} height={10} />
            <LightShaft position={[-4, 7, -5]} color="#22C55E" angle={0.25} height={8} />
            <LightShaft position={[0, 9, -6]} color="#3B82F6" angle={0} height={12} />

            {/* Cinematic lighting rig */}
            <AmbientLightRig />

            {/* Fog plane (depth cue) */}
            <fog attach="fog" args={["#0D0D0D", 8, 30]} />
        </group>
    );
}
