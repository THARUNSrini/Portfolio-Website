"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Atom data: [x, y, z, element]
type AtomData = { pos: THREE.Vector3; color: string; size: number };
type BondData = { from: THREE.Vector3; to: THREE.Vector3 };

// Color palette for atoms matching Lab Precision theme
const ELEMENT_COLORS: Record<string, string> = {
    C: "#FFB800",   // Carbon = Amber
    O: "#F472B6",   // Oxygen = Rose
    N: "#22C55E",   // Nitrogen = Green
    H: "#F5F2EB",   // Hydrogen = Paper cream
    P: "#3B82F6",   // Phosphorus = Graph blue
    S: "#FBBF24",   // Sulfur = Gold
};

// Generate a benzene ring molecule
function createBenzeneRing(): { atoms: AtomData[]; bonds: BondData[] } {
    const atoms: AtomData[] = [];
    const bonds: BondData[] = [];
    const radius = 0.6;

    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const pos = new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
        );
        atoms.push({ pos, color: ELEMENT_COLORS.C, size: 0.08 });

        // H atoms extending outward
        const hPos = new THREE.Vector3(
            Math.cos(angle) * (radius + 0.35),
            Math.sin(angle) * (radius + 0.35),
            0
        );
        atoms.push({ pos: hPos, color: ELEMENT_COLORS.H, size: 0.04 });
        bonds.push({ from: pos, to: hPos });

        // Bond to next carbon
        const nextAngle = ((i + 1) / 6) * Math.PI * 2;
        const nextPos = new THREE.Vector3(
            Math.cos(nextAngle) * radius,
            Math.sin(nextAngle) * radius,
            0
        );
        bonds.push({ from: pos, to: nextPos });
    }

    return { atoms, bonds };
}

// Generate a nucleotide-like structure
function createNucleotide(): { atoms: AtomData[]; bonds: BondData[] } {
    const atoms: AtomData[] = [];
    const bonds: BondData[] = [];

    // Sugar ring (5-membered)
    const sugarRadius = 0.4;
    const sugarCenter = new THREE.Vector3(0, 0, 0);
    const sugarAtoms: THREE.Vector3[] = [];

    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const pos = new THREE.Vector3(
            Math.cos(angle) * sugarRadius + sugarCenter.x,
            Math.sin(angle) * sugarRadius + sugarCenter.y,
            0
        );
        sugarAtoms.push(pos);
        atoms.push({ pos, color: i === 0 ? ELEMENT_COLORS.O : ELEMENT_COLORS.C, size: 0.07 });
        if (i > 0) bonds.push({ from: sugarAtoms[i - 1], to: pos });
    }
    bonds.push({ from: sugarAtoms[4], to: sugarAtoms[0] });

    // Base (extend upward)
    const basePos = new THREE.Vector3(0, 0.8, 0);
    atoms.push({ pos: basePos, color: ELEMENT_COLORS.N, size: 0.09 });
    bonds.push({ from: sugarAtoms[2], to: basePos });

    const baseTop = new THREE.Vector3(0.3, 1.2, 0);
    atoms.push({ pos: baseTop, color: ELEMENT_COLORS.C, size: 0.07 });
    bonds.push({ from: basePos, to: baseTop });

    const baseTop2 = new THREE.Vector3(-0.3, 1.2, 0);
    atoms.push({ pos: baseTop2, color: ELEMENT_COLORS.O, size: 0.07 });
    bonds.push({ from: basePos, to: baseTop2 });

    // Phosphate group (extend downward-left)
    const pPos = new THREE.Vector3(-0.8, -0.5, 0);
    atoms.push({ pos: pPos, color: ELEMENT_COLORS.P, size: 0.1 });
    bonds.push({ from: sugarAtoms[4], to: pPos });

    const oPos1 = new THREE.Vector3(-1.2, -0.3, 0.2);
    const oPos2 = new THREE.Vector3(-1.2, -0.7, -0.2);
    atoms.push({ pos: oPos1, color: ELEMENT_COLORS.O, size: 0.06 });
    atoms.push({ pos: oPos2, color: ELEMENT_COLORS.O, size: 0.06 });
    bonds.push({ from: pPos, to: oPos1 });
    bonds.push({ from: pPos, to: oPos2 });

    return { atoms, bonds };
}

// Generate a branching metabolite
function createMetabolite(): { atoms: AtomData[]; bonds: BondData[] } {
    const atoms: AtomData[] = [];
    const bonds: BondData[] = [];

    // Central chain
    const chainPositions: THREE.Vector3[] = [];
    for (let i = 0; i < 5; i++) {
        const pos = new THREE.Vector3(
            (i - 2) * 0.35,
            Math.sin(i * 0.8) * 0.15,
            Math.cos(i * 0.6) * 0.1
        );
        chainPositions.push(pos);
        atoms.push({ pos, color: ELEMENT_COLORS.C, size: 0.07 });
        if (i > 0) bonds.push({ from: chainPositions[i - 1], to: pos });
    }

    // Branch groups
    const branches = [
        { from: 1, offset: new THREE.Vector3(0, 0.4, 0.1), el: "O" as const },
        { from: 2, offset: new THREE.Vector3(0, -0.4, -0.1), el: "N" as const },
        { from: 3, offset: new THREE.Vector3(0.1, 0.35, 0), el: "O" as const },
        { from: 0, offset: new THREE.Vector3(-0.3, -0.3, 0), el: "S" as const },
    ];

    branches.forEach(b => {
        const pos = chainPositions[b.from].clone().add(b.offset);
        atoms.push({ pos, color: ELEMENT_COLORS[b.el], size: 0.06 });
        bonds.push({ from: chainPositions[b.from], to: pos });
    });

    return { atoms, bonds };
}

// Single molecule component
function Molecule({
    position,
    scale = 1,
    type,
    rotationSpeed = 0.3
}: {
    position: [number, number, number];
    scale?: number;
    type: "benzene" | "nucleotide" | "metabolite";
    rotationSpeed?: number;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const timeOffset = useMemo(() => Math.random() * 100, []);

    const { atoms, bonds } = useMemo(() => {
        switch (type) {
            case "benzene": return createBenzeneRing();
            case "nucleotide": return createNucleotide();
            case "metabolite": return createMetabolite();
        }
    }, [type]);

    useFrame((state) => {
        if (groupRef.current) {
            const t = state.clock.elapsedTime + timeOffset;
            groupRef.current.rotation.y += 0.002 * rotationSpeed;
            groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
            // Gentle floating bob
            groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.15;
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Atoms */}
            {atoms.map((atom, i) => (
                <mesh key={`atom-${i}`} position={atom.pos}>
                    <sphereGeometry args={[atom.size, 8, 8]} />
                    <meshStandardMaterial
                        color={atom.color}
                        emissive={atom.color}
                        emissiveIntensity={0.4}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
            ))}

            {/* Bonds */}
            {bonds.map((bond, i) => {
                const mid = bond.from.clone().add(bond.to).multiplyScalar(0.5);
                const len = bond.from.distanceTo(bond.to);
                const dir = bond.to.clone().sub(bond.from).normalize();
                const quat = new THREE.Quaternion().setFromUnitVectors(
                    new THREE.Vector3(0, 1, 0), dir
                );
                return (
                    <mesh key={`bond-${i}`} position={mid} quaternion={quat}>
                        <cylinderGeometry args={[0.015, 0.015, len, 4]} />
                        <meshBasicMaterial color="#A8A29E" transparent opacity={0.5} />
                    </mesh>
                );
            })}
        </group>
    );
}

// Exported scene component with multiple floating molecules
export default function MolecularStructures({
    position = [0, 0, 0] as [number, number, number],
    scale = 1
}: {
    position?: [number, number, number];
    scale?: number;
}) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            <Molecule position={[-3, 1.5, -2]} type="benzene" scale={1.2} rotationSpeed={0.4} />
            <Molecule position={[3.5, -1, -3]} type="nucleotide" scale={1.0} rotationSpeed={0.3} />
            <Molecule position={[0, -2, -4]} type="metabolite" scale={1.1} rotationSpeed={0.5} />
            <Molecule position={[-4, -1.5, -5]} type="benzene" scale={0.8} rotationSpeed={0.2} />
            <Molecule position={[4, 2, -6]} type="metabolite" scale={0.7} rotationSpeed={0.35} />
        </group>
    );
}
