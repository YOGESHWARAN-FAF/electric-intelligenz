import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Environment, Float, Sparkles, Line, Instances, Instance } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, DepthOfField, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

// Procedurally generated circuit traces
const CircuitTraces = () => {
    const lines = useMemo(() => {
        const generatedLines = [];
        for (let i = 0; i < 30; i++) {
            const startX = (Math.random() - 0.5) * 40;
            const startZ = (Math.random() - 0.5) * 40;
            const length1 = Math.random() * 5 + 2;
            const length2 = Math.random() * 5 + 2;

            const points = [];
            points.push(new THREE.Vector3(startX, -4.9, startZ));

            const dirX = Math.random() > 0.5 ? 1 : -1;
            const dirZ = Math.random() > 0.5 ? 1 : -1;

            points.push(new THREE.Vector3(startX + dirX * length1, -4.9, startZ));
            points.push(new THREE.Vector3(startX + dirX * length1, -4.9, startZ + dirZ * length2));

            // Optional branch
            if (Math.random() > 0.5) {
                points.push(new THREE.Vector3(startX + dirX * length1 + dirX * 2, -4.9, startZ + dirZ * length2));
            }

            const color = Math.random() > 0.7 ? '#FFD84D' : '#00F5FF';
            generatedLines.push({ points, color });
        }
        return generatedLines;
    }, []);

    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.z = (state.clock.elapsedTime * 2) % 20;
        }
    });

    return (
        <group ref={groupRef}>
            {lines.map((line, idx) => (
                <group key={idx}>
                    <Line points={line.points} color={line.color} lineWidth={2} transparent opacity={0.6} />
                    {/* Glowing node at the end of the trace */}
                    <mesh position={line.points[line.points.length - 1]}>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshBasicMaterial color={line.color} />
                    </mesh>
                </group>
            ))}
            {/* Duplicate for infinite scrolling effect */}
            {lines.map((line, idx) => (
                <group key={`dup-${idx}`} position={[0, 0, -20]}>
                    <Line points={line.points} color={line.color} lineWidth={2} transparent opacity={0.6} />
                    <mesh position={line.points[line.points.length - 1]}>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshBasicMaterial color={line.color} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

// Data particles flowing (electrons)
const ElectronFlow = () => {
    const ref = useRef();
    const count = 150;

    const [positions, colors, speeds] = useMemo(() => {
        const p = new Float32Array(count * 3);
        const c = new Float32Array(count * 3);
        const s = new Float32Array(count);
        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 40;
            p[i * 3 + 1] = (Math.random() - 0.5) * 20;
            p[i * 3 + 2] = (Math.random() - 0.5) * 40;

            s[i] = Math.random() * 2 + 0.5;

            const mix = Math.random();
            if (mix > 0.6) color.set('#00F5FF'); // Cyan
            else if (mix > 0.3) color.set('#FFD84D'); // Yellow
            else color.set('#E10600'); // Red

            c[i * 3] = color.r;
            c[i * 3 + 1] = color.g;
            c[i * 3 + 2] = color.b;
        }
        return [p, c, s];
    }, []);

    useFrame((state, delta) => {
        const positions = ref.current.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            // Move particles along Z axis (electron flow)
            positions[i * 3 + 2] += speeds[i] * delta * 5;
            // Reset position if it goes too far
            if (positions[i * 3 + 2] > 20) {
                positions[i * 3 + 2] = -20;
            }
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
            <PointMaterial transparent vertexColors size={0.15} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
        </Points>
    );
};

const GridFloor = () => {
    const gridRef = useRef();

    useFrame((state) => {
        if (gridRef.current) {
            gridRef.current.position.z = (state.clock.elapsedTime * 2) % 10;
        }
    });

    return (
        <group position={[0, -5, 0]}>
            <gridHelper ref={gridRef} args={[100, 100, '#00F5FF', 'rgba(0, 245, 255, 0.1)']} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial color="#0B0F2B" transparent opacity={0.8} />
            </mesh>
        </group>
    );
}

// Microchips and Capacitors floating
const ElectronicComponents = () => {
    return (
        <group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* Central CPU Chip */}
                <mesh position={[4, 1, -5]} rotation={[0.2, -0.4, 0]}>
                    <boxGeometry args={[2, 0.2, 2]} />
                    <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
                    {/* CPU Core Glow */}
                    <mesh position={[0, 0.11, 0]}>
                        <planeGeometry args={[1.2, 1.2]} />
                        <meshBasicMaterial color="#00F5FF" transparent opacity={0.6} rotation={[-Math.PI / 2, 0, 0]} />
                    </mesh>
                    {/* Pins/Legs */}
                    {[[-1.1, 0], [1.1, 0], [0, -1.1], [0, 1.1]].map((pos, i) => (
                        <mesh key={i} position={[pos[0] ? pos[0] : 0, 0, pos[1] ? pos[1] : 0]}>
                            <boxGeometry args={[pos[0] ? 0.2 : 1.6, 0.1, pos[1] ? 0.2 : 1.6]} />
                            <meshStandardMaterial color="#FFD84D" metalness={1} roughness={0.2} />
                        </mesh>
                    ))}
                </mesh>

                {/* Capacitor */}
                <mesh position={[-5, -1, -8]} rotation={[0.4, 0.5, 0.2]}>
                    <cylinderGeometry args={[0.5, 0.5, 1.5, 16]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
                    <mesh position={[0, 0.76, 0]}>
                        <cylinderGeometry args={[0.5, 0.5, 0.05, 16]} />
                        <meshStandardMaterial color="#aaa" metalness={0.9} roughness={0.1} />
                    </mesh>
                    {/* Stripe */}
                    <mesh position={[0, 0, 0.505]}>
                        <planeGeometry args={[0.2, 1.5]} />
                        <meshBasicMaterial color="#FFD84D" />
                    </mesh>
                </mesh>

                {/* Resistor */}
                <mesh position={[-3, 2, -12]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.2, 0.2, 1.2, 16]} />
                    <meshStandardMaterial color="#d4b483" />
                    {/* Bands */}
                    <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.205, 0.205, 0.1, 16]} /><meshBasicMaterial color="red" /></mesh>
                    <mesh position={[0, 0.1, 0]}><cylinderGeometry args={[0.205, 0.205, 0.1, 16]} /><meshBasicMaterial color="black" /></mesh>
                    <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.205, 0.205, 0.1, 16]} /><meshBasicMaterial color="brown" /></mesh>
                    <mesh position={[0, -0.5, 0]}><cylinderGeometry args={[0.205, 0.205, 0.1, 16]} /><meshBasicMaterial color="gold" /></mesh>
                    {/* Wires */}
                    <mesh position={[0, 1, 0]}><cylinderGeometry args={[0.02, 0.02, 1, 8]} /><meshStandardMaterial color="#aaa" /></mesh>
                    <mesh position={[0, -1, 0]}><cylinderGeometry args={[0.02, 0.02, 1, 8]} /><meshStandardMaterial color="#aaa" /></mesh>
                </mesh>
            </Float>
        </group>
    );
};

const Background = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 1.5]}>
                <color attach="background" args={['#05081c']} />
                <fog attach="fog" args={['#05081c', 10, 40]} />
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} color="#00F5FF" />
                <directionalLight position={[-10, -10, -10]} intensity={1} color="#FFD84D" />

                <GridFloor />
                <CircuitTraces />
                <ElectronFlow />
                <ElectronicComponents />

                <Sparkles count={50} scale={25} size={3} speed={0.5} opacity={0.6} color="#00F5FF" />

                <EffectComposer disableNormalPass>
                    <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
                    <ChromaticAberration offset={[0.002, 0.002]} />
                    <Vignette eskil={false} offset={0.15} darkness={1.2} />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default Background;
