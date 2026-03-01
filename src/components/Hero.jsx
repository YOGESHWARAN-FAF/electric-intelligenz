import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Octahedron, Sphere, Icosahedron } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';
import RealisticLightning from './RealisticLightning';
import collabBannerImg from '../assets/collab-banner.png';

const CyberCore = () => {
    const coreRef = useRef();
    const ring1Ref = useRef();
    const ring2Ref = useRef();

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        if (coreRef.current) {
            coreRef.current.rotation.y = time * 0.5;
            coreRef.current.rotation.x = time * 0.2;
            const scale = 1 + Math.sin(time * 3) * 0.05;
            coreRef.current.scale.set(scale, scale, scale);
        }
        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = time * 0.8;
            ring1Ref.current.rotation.y = time * 0.3;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = -time * 0.4;
            ring2Ref.current.rotation.z = time * 0.6;
        }
    });

    return (
        <group>
            {/* Central Crystal Core */}
            <Icosahedron ref={coreRef} args={[1, 0]} >
                <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={2} wireframe />
            </Icosahedron>

            {/* Inner Energy Sphere */}
            <Sphere args={[0.7, 32, 32]}>
                <meshBasicMaterial color="#FFD84D" transparent opacity={0.6} />
            </Sphere>

            {/* Outer Rings */}
            <group ref={ring1Ref}>
                <Torus args={[2, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={1} wireframe />
                </Torus>
                {/* Orbiting data packet */}
                <mesh position={[2, 0, 0]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshBasicMaterial color="#FFD84D" />
                </mesh>
            </group>

            <group ref={ring2Ref}>
                <Torus args={[2.5, 0.02, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
                    <meshStandardMaterial color="#FFD84D" emissive="#FFD84D" emissiveIntensity={1} />
                </Torus>
                <Torus args={[2.7, 0.01, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
                    <meshStandardMaterial color="#E10600" emissive="#E10600" emissiveIntensity={2} />
                </Torus>
                <mesh position={[0, 2.5, 0]}>
                    <boxGeometry args={[0.2, 0.2, 0.2]} />
                    <meshBasicMaterial color="#00F5FF" />
                </mesh>
            </group>

            <ambientLight intensity={0.5} />
            <pointLight position={[0, 0, 0]} color="#00F5FF" intensity={10} distance={10} />
            <pointLight position={[0, 0, 0]} color="#FFD84D" intensity={5} distance={5} />
        </group>
    );
};

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
    const heroRef = useRef(null);

    useEffect(() => {
        const targetDate = new Date("March 26, 2026 00:00:00").getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    secs: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        };

        const timerId = setInterval(updateTimer, 1000);
        updateTimer();

        // Initial intro animation
        gsap.fromTo(heroRef.current.querySelector('.main-title'),
            { scale: 0.8, opacity: 0, y: 50 },
            { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
        );

        gsap.fromTo(heroRef.current.querySelector('.tagline'),
            { opacity: 0 },
            { opacity: 1, duration: 2, delay: 0.5 }
        );

        // Basic Glitch/Spark text effect for department name
        gsap.to('.tagline', {
            textShadow: '0 0 40px rgba(255, 216, 77, 1), 0 0 80px rgba(0, 245, 255, 1)',
            duration: 0.1,
            repeat: -1,
            yoyo: true,
            repeatDelay: 4
        });

        // Floating glowing animation for Collab logo
        gsap.to('.collab-img-float', {
            y: -10,
            filter: 'drop-shadow(0 0 25px rgba(66, 133, 244, 1)) drop-shadow(0 0 15px rgba(255, 216, 77, 1))',
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "power1.inOut"
        });

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const formatNum = (num) => String(num).padStart(2, '0');

    return (
        <section ref={heroRef} style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '2rem',
            paddingTop: 'clamp(6rem, 15vh, 8rem)' // Dynamic top padding gives more room on mobile
        }}>

            {/* Floating Top Collab Image */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                padding: '1rem 0.5rem',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap', // Prevent stacking on tiny screens
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'clamp(0.5rem, 2vw, 1rem)',
                zIndex: 10,
                pointerEvents: 'none'
            }}>
                <span style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: 'clamp(0.45rem, 2.2vw, 0.9rem)', // Much smaller bounds for mobile
                    letterSpacing: 'clamp(1px, 1vw, 2px)',
                    color: 'var(--text-white)',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontWeight: 900,
                    textShadow: '0 0 10px rgba(66, 133, 244, 0.8), 0 0 20px rgba(0, 245, 255, 0.5)'
                }}>
                    Proudly Conducted In Collaboration With
                </span>
                <img
                    className="collab-img-float"
                    src={collabBannerImg}
                    alt="Google Gemini x Electric Intelligenz Collab"
                    style={{
                        width: '100%',
                        maxWidth: 'clamp(110px, 20vw, 180px)', // Shrinks dynamically on mobile
                        height: 'auto',
                        filter: 'drop-shadow(0 0 15px rgba(66, 133, 244, 1)) drop-shadow(0 0 10px rgba(255, 216, 77, 0.8))'
                    }}
                />
            </div>

            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', maxWidth: '400px', maxHeight: '400px', zIndex: -1, opacity: 0.8 }}>
                <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1]}>
                    <CyberCore />
                </Canvas>
            </div>

            <h3 className="mono" style={{
                color: 'var(--text-white)',
                letterSpacing: '5px',
                fontSize: 'clamp(1rem, 3vw, 1.8rem)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                position: 'relative',
                zIndex: 2,
                background: 'rgba(11, 15, 43, 0.5)',
                padding: '0.5rem 1rem',
                border: '1px solid rgba(0, 245, 255, 0.3)',
                borderRadius: '8px',
                backdropFilter: 'blur(5px)',
                textAlign: 'center'
            }}>
                Mahendra Engineering College
            </h3>

            <h2 className="tagline text-yellow" style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                fontWeight: 800,
                textShadow: '0 0 20px rgba(255, 216, 77, 0.8), 0 0 40px rgba(0, 245, 255, 0.4)',
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                padding: '0 1rem'
            }}>
                Electrical & Electronics Engineering
            </h2>

            <p style={{ color: 'var(--glow-cyan)', letterSpacing: '2px', fontSize: '1.2rem', marginBottom: '2rem', textTransform: 'uppercase', zIndex: 2 }}>
                National Level Tech Fest
            </p>

            <h1 className="main-title gradient-text" style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                textAlign: 'center',
                fontWeight: 900,
                textTransform: 'uppercase',
                margin: '1rem 0',
                lineHeight: 1.1,
                filter: 'drop-shadow(0 0 20px rgba(255, 77, 0, 0.4))',
                zIndex: 2,
                position: 'relative'
            }}>
                Electric Intelligenz<br />
                <span style={{ color: 'var(--text-white)', WebkitTextFillColor: 'var(--text-white)' }}>2K26</span>
            </h1>

            <div className="countdown glass-panel mono" style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: '1.5rem',
                marginTop: '3rem',
                border: '1px solid var(--glow-cyan)',
                boxShadow: '0 0 20px rgba(0, 245, 255, 0.2) inset',
                zIndex: 2,
                width: '100%',
                maxWidth: '600px'
            }}>
                {[
                    { label: 'DAYS', value: timeLeft.days },
                    { label: 'HOURS', value: timeLeft.hours },
                    { label: 'MINS', value: timeLeft.mins },
                    { label: 'SECS', value: timeLeft.secs }
                ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--glow-cyan)', textShadow: '0 0 15px rgba(0, 245, 255, 0.6)' }}>
                            {formatNum(item.value)}
                        </span>
                        <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--text-white)' }}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            <a href="https://forms.gle/Fj3hHDK1RuGb7RW77" target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop: '4rem', zIndex: 2 }}>
                REGISTER NOW
            </a>

            {/* Real Procedural Thunder Strikes */}
            <RealisticLightning />

        </section>
    );
};

export default Hero;
