"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DNAHelixProps {
    position?: [number, number, number];
    scale?: number;
    color1?: string;
    color2?: string;
}

export default function DNAHelix({
    position = [0, 0, 0],
    scale = 1,
    color1 = "#00f5d4", // Default to cyan
    color2 = "#39ff14"  // Default to green
}: DNAHelixProps) {
    const groupRef = useRef<THREE.Group>(null);

    // Generate simplified particles for double helix
    const { strand1, strand2, connections } = useMemo(() => {
        const s1: THREE.Vector3[] = [];
        const s2: THREE.Vector3[] = [];
        const conn: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];

        const count = 40; // Reduced from 80
        const radius = 1.5;
        const height = 10;
        const turns = 2;

        for (let i = 0; i < count; i++) {
            const t = (i / count) * Math.PI * 2 * turns;
            const y = (i / count) * height - height / 2;

            const x1 = Math.cos(t) * radius;
            const z1 = Math.sin(t) * radius;
            s1.push(new THREE.Vector3(x1, y, z1));

            const x2 = Math.cos(t + Math.PI) * radius;
            const z2 = Math.sin(t + Math.PI) * radius;
            s2.push(new THREE.Vector3(x2, y, z2));

            // Fewer base pair connections
            if (i % 6 === 0) {
                conn.push({
                    start: new THREE.Vector3(x1, y, z1),
                    end: new THREE.Vector3(x2, y, z2)
                });
            }
        }

        return { strand1: s1, strand2: s2, connections: conn };
    }, []);

    // Create tube curves for the strands
    const strand1Geometry = useMemo(() => {
        const curve = new THREE.CatmullRomCurve3(strand1);
        return new THREE.TubeGeometry(curve, 40, 0.14, 6, false);
    }, [strand1]);

    const strand2Geometry = useMemo(() => {
        const curve = new THREE.CatmullRomCurve3(strand2);
        return new THREE.TubeGeometry(curve, 40, 0.14, 6, false);
    }, [strand2]);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003;
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale} rotation={[0, 0, Math.PI / 8]}>
            {/* Strand 1 - Cyan */}
            <mesh geometry={strand1Geometry}>
                <meshStandardMaterial color={color1} emissive={color1} emissiveIntensity={0.6} transparent opacity={0.85} />
            </mesh>

            {/* Strand 2 - Green */}
            <mesh geometry={strand2Geometry}>
                <meshStandardMaterial color={color2} emissive={color2} emissiveIntensity={0.6} transparent opacity={0.85} />
            </mesh>

            {/* Base pair connections - simplified */}
            {connections.map((conn, i) => (
                <ConnectionBeam key={i} start={conn.start} end={conn.end} color={i % 2 === 0 ? color1 : color2} />
            ))}
        </group>
    );
}

function ConnectionBeam({ start, end, color }: { start: THREE.Vector3; end: THREE.Vector3; color: string }) {
    const { midpoint, length, quaternion } = useMemo(() => {
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const len = start.distanceTo(end);
        const direction = end.clone().sub(start).normalize();
        const quat = new THREE.Quaternion();
        quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

        return { midpoint: mid, length: len, quaternion: quat };
    }, [start, end]);

    return (
        <mesh position={midpoint} quaternion={quaternion}>
            <cylinderGeometry args={[0.02, 0.02, length, 4]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
    );
}

export function CompactDNA({ position = [0, 0, 0] as [number, number, number] }) {
    return <DNAHelix position={position} scale={0.5} />;
}
