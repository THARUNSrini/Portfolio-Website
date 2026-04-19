"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

import DNAHelix from "./DNAHelix";
import GlowingParticles from "./GlowingParticles";
import VolumetricEffects from "./VolumetricEffects";
import ProteinRibbon from "./ProteinRibbon";

// Camera path keyframes for smooth looping orbit
const CAMERA_KEYFRAMES = [
    new THREE.Vector3(0, 2, 14),      // Front - wide establishing
    new THREE.Vector3(8, 3, 10),      // Right sweep - see DNA
    new THREE.Vector3(10, 1, 0),      // Side - close to molecules
    new THREE.Vector3(6, -1, -8),     // Behind
    new THREE.Vector3(-4, 3, -10),    // Left behind
    new THREE.Vector3(-10, 2, 0),     // Left side
    new THREE.Vector3(-6, 4, 8),      // Upper left returning
    new THREE.Vector3(0, 2, 14),      // Back to start (loop)
];

const LOOK_AT_CENTER = new THREE.Vector3(0, 0, -2);
const LOOP_DURATION = 40; // slower, more cinematic loop

function AnimatedCamera() {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const { mouse } = useThree();

    // Create smooth spline from keyframes
    const cameraPath = useMemo(
        () => new THREE.CatmullRomCurve3(CAMERA_KEYFRAMES, true, "centripetal", 0.5),
        []
    );

    useFrame((state) => {
        if (!cameraRef.current) return;

        const t = (state.clock.elapsedTime % LOOP_DURATION) / LOOP_DURATION;
        const pos = cameraPath.getPointAt(t);

        // Apply position from spline
        cameraRef.current.position.copy(pos);

        // Subtle mouse parallax (reduced for more stable look)
        cameraRef.current.position.x += mouse.x * 0.3;
        cameraRef.current.position.y += mouse.y * 0.2;

        // Look at center with slight floating bob
        const lookTarget = LOOK_AT_CENTER.clone();
        lookTarget.y += Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
        cameraRef.current.lookAt(lookTarget);
    });

    return (
        <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 2, 14]}
            fov={45}
            near={0.1}
            far={100}
        />
    );
}

// Network style structure connecting points
function NeuralNetworkField({ count = 30 }: { count?: number }) {
    const points = useMemo(() => {
        const pts = [];
        for (let i = 0; i < count; i++) {
            pts.push(new THREE.Vector3(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            ));
        }
        return pts;
    }, [count]);

    const lines = useMemo(() => {
        const lns = [];
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                if (points[i].distanceTo(points[j]) < 6) {
                    lns.push(points[i], points[j]);
                }
            }
        }
        return lns;
    }, [count, points]);

    const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(lines), [lines]);

    return (
        <group>
            {/* The nodes */}
            {points.map((p, i) => (
                <mesh key={i} position={p}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshBasicMaterial color="#00f5d4" transparent opacity={0.6} />
                </mesh>
            ))}
            {/* The connections */}
            <lineSegments geometry={lineGeometry}>
                <lineBasicMaterial color="#00f5d4" transparent opacity={0.15} />
            </lineSegments>
        </group>
    );
}

// Main cinematic hero scene
export default function CinematicHeroScene() {
    return (
        <>
            {/* Animated camera on spline path */}
            <AnimatedCamera />

            {/* Volumetric atmosphere — lights, dust, fog */}
            <VolumetricEffects />

            {/* === FOREGROUND LAYER === */}

            {/* Central DNA double helix — updated to cyan glow */}
            <group position={[0, 0, -2]} rotation={[0, 0, Math.PI / 12]}>
                <DNAHelix
                    position={[0, 0, 0]}
                    scale={0.6}
                    color1="#00f5d4" // Cyan primary
                    color2="#39ff14" // Neon green
                />
            </group>

            {/* === MID-GROUND LAYER === */}
            
            {/* Secondary molecular structures */}
            <group position={[4, 1, -4]}>
                <ProteinRibbon position={[0, 0, 0]} scale={0.4} speed={0.2} color="#00f5d4" />
            </group>

            {/* Neural network / Cellular automaton field representing AI/Computational aspect */}
            <NeuralNetworkField count={40} />

            {/* === BACKGROUND LAYER === */}

            {/* Bioluminescent particles filling the space (updated colors) */}
            <GlowingParticles count={150} radius={18} colors={["#00f5d4", "#39ff14", "#72fce8"]} />

            {/* Distant secondary DNA for depth */}
            <DNAHelix
                position={[8, -3, -12]}
                scale={0.3}
                color1="#00f5d4"
                color2="#00c4a7"
            />

            {/* Environment lighting */}
            <Environment preset="night" />
        </>
    );
}
