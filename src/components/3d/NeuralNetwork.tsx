"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NeuralNetworkProps {
    position?: [number, number, number];
    scale?: number;
    layers?: number[];
}

export default function NeuralNetwork({
    position = [0, 0, 0],
    scale = 1,
    layers = [4, 6, 8, 6, 4]
}: NeuralNetworkProps) {
    const groupRef = useRef<THREE.Group>(null);
    const connectionsRef = useRef<THREE.Group>(null);

    // Generate nodes and connections
    const { nodes, connections } = useMemo(() => {
        const nodePositions: { layer: number; pos: THREE.Vector3 }[] = [];
        const conns: { from: THREE.Vector3; to: THREE.Vector3; delay: number }[] = [];

        const layerSpacing = 2;

        // Create nodes for each layer
        layers.forEach((nodeCount, layerIndex) => {
            const x = (layerIndex - (layers.length - 1) / 2) * layerSpacing;

            for (let i = 0; i < nodeCount; i++) {
                const y = (i - (nodeCount - 1) / 2) * 0.6;
                const z = Math.sin(i * 0.5) * 0.3;

                nodePositions.push({
                    layer: layerIndex,
                    pos: new THREE.Vector3(x, y, z)
                });
            }
        });

        // Create connections between adjacent layers
        let connectionIndex = 0;
        for (let l = 0; l < layers.length - 1; l++) {
            const currentLayerNodes = nodePositions.filter(n => n.layer === l);
            const nextLayerNodes = nodePositions.filter(n => n.layer === l + 1);

            currentLayerNodes.forEach(fromNode => {
                // Connect to roughly half of the next layer nodes
                nextLayerNodes.forEach((toNode, i) => {
                    if (Math.random() > 0.4) {
                        conns.push({
                            from: fromNode.pos,
                            to: toNode.pos,
                            delay: connectionIndex * 0.02
                        });
                        connectionIndex++;
                    }
                });
            });
        }

        return { nodes: nodePositions, connections: conns };
    }, [layers]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }

        // Animate connection pulses
        if (connectionsRef.current) {
            connectionsRef.current.children.forEach((line, i) => {
                const material = (line as THREE.Line).material as THREE.LineBasicMaterial;
                const pulse = Math.sin(state.clock.elapsedTime * 3 - i * 0.1) * 0.5 + 0.5;
                material.opacity = 0.3 + pulse * 0.5;
            });
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Nodes */}
            {nodes.map((node, i) => (
                <NeuralNode
                    key={i}
                    position={[node.pos.x, node.pos.y, node.pos.z]}
                    layer={node.layer}
                    index={i}
                />
            ))}

            {/* Connections */}
            <group ref={connectionsRef}>
                {connections.map((conn, i) => (
                    <SynapseConnection
                        key={i}
                        from={conn.from}
                        to={conn.to}
                        delay={conn.delay}
                    />
                ))}
            </group>

            {/* Central glow */}
            <pointLight position={[0, 0, 0]} color="#00e5ff" intensity={1} distance={6} />
        </group>
    );
}

function NeuralNode({
    position,
    layer,
    index
}: {
    position: [number, number, number];
    layer: number;
    index: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 2 + layer + index * 0.5) * 0.2 + 1;
            meshRef.current.scale.setScalar(pulse);
        }
        if (glowRef.current) {
            const glowPulse = Math.sin(state.clock.elapsedTime * 3 + index) * 0.3 + 0.5;
            (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowPulse;
        }
    });

    const color = layer % 2 === 0 ? "#00e5ff" : "#00ff9f";

    return (
        <group position={position}>
            {/* Core node */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshBasicMaterial color={color} />
            </mesh>

            {/* Glow halo */}
            <mesh ref={glowRef} scale={1.5}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

function SynapseConnection({
    from,
    to,
    delay
}: {
    from: THREE.Vector3;
    to: THREE.Vector3;
    delay: number;
}) {
    const pulseRef = useRef<THREE.Mesh>(null);

    const { lineObject } = useMemo(() => {
        const geometry = new THREE.BufferGeometry().setFromPoints([from, to]);
        const material = new THREE.LineBasicMaterial({
            color: "#00e5ff",
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });
        return { lineObject: new THREE.Line(geometry, material) };
    }, [from, to]);

    useFrame((state) => {
        if (pulseRef.current) {
            const t = ((state.clock.elapsedTime - delay) % 2) / 2;
            if (t > 0 && t < 1) {
                const pos = from.clone().lerp(to, t);
                pulseRef.current.position.copy(pos);
                pulseRef.current.visible = true;
            } else {
                pulseRef.current.visible = false;
            }
        }

        // Animate line opacity
        const material = lineObject.material as THREE.LineBasicMaterial;
        const pulse = Math.sin(state.clock.elapsedTime * 3 - delay * 10) * 0.3 + 0.5;
        material.opacity = pulse;
    });

    return (
        <>
            <primitive object={lineObject} />

            {/* Traveling pulse */}
            <mesh ref={pulseRef}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshBasicMaterial color="#00ff9f" />
            </mesh>
        </>
    );
}

// Compact neural network for smaller displays
export function CompactNeuralNetwork({ position = [0, 0, 0] as [number, number, number] }) {
    return <NeuralNetwork position={position} scale={0.6} layers={[3, 4, 5, 4, 3]} />;
}
