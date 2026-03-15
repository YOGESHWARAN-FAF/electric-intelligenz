import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Octahedron, Sphere, Icosahedron } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';
import RealisticLightning from './RealisticLightning';
import deptLogoImg from '../assets/dept-logo.png';
import collegeLogoImg from '../assets/college-logo.png';
import swagsImg from '../assets/swags.png';
import ambassadorImg from '../assets/ambassador.png';
import collabImg from '../assets/collab.png';

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
    const [isMobile, setIsMobile] = useState(false);
    const heroRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true });
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

        // Scroll animations for new sections
        gsap.utils.toArray('.scroll-fade-left').forEach(el => {
            gsap.fromTo(el, 
                { x: -100, opacity: 0 }, 
                { x: 0, opacity: 1, duration: 1, ease: "power2.out", scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play reverse play reverse' } }
            );
        });
        gsap.utils.toArray('.scroll-fade-right').forEach(el => {
            gsap.fromTo(el, 
                { x: 100, opacity: 0 }, 
                { x: 0, opacity: 1, duration: 1, ease: "power2.out", scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play reverse play reverse' } }
            );
        });


        return () => {
            clearInterval(timerId);
        };
    }, []);

    const formatNum = (num) => String(num).padStart(2, '0');

    return (
        <section ref={heroRef} className="hero-section">

            <style>
                {`
                .hero-section {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center; /* Center horizontally/vertically on desktop */
                    position: relative;
                    padding: clamp(1rem, 2vw, 2rem);
                }
                .hero-header-flex {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    gap: clamp(0.2rem, 1vw, 2rem);
                }
                .hero-left-logo, .hero-right-logo {
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                }
                .hero-title-area {
                    flex: 1 1 auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                @keyframes electricPulse {
                    0% { text-shadow: 0 0 10px rgba(255, 216, 77, 0.5), 0 0 20px rgba(255, 216, 77, 0.2); }
                    50% { text-shadow: 0 0 15px rgba(255, 216, 77, 0.8), 0 0 35px rgba(255, 216, 77, 0.6); }
                    100% { text-shadow: 0 0 10px rgba(255, 216, 77, 0.5), 0 0 20px rgba(255, 216, 77, 0.2); }
                }
                @keyframes shineWave {
                    0% { background-position: 200% center; }
                    100% { background-position: -200% center; }
                }
                @media (max-width: 768px) {
                    .hero-section {
                        justify-content: flex-start; /* Push all content to the top on mobile */
                        padding-top: 1rem;
                        padding-left: 0.5rem;
                        padding-right: 0.5rem;
                    }
                    .mobile-reverse-col {
                        flex-direction: column-reverse !important;
                        gap: 2.5rem !important;
                    }
                    .ambassador-row {
                        flex-direction: column !important;
                        gap: 2.5rem !important;
                    }
                    .hero-img-container, .scroll-fade-left, .scroll-fade-right {
                        max-width: 100% !important;
                        min-width: 100% !important;
                        margin: 0 auto;
                        flex: 1 1 100% !important;
                    }
                    /* Performance optimizations for mobile */
                    .floating-img {
                        filter: drop-shadow(0 0 10px rgba(0, 245, 255, 0.5)) !important;
                    }
                    .mobile-no-backdrop {
                        backdrop-filter: none !important;
                        -webkit-backdrop-filter: none !important;
                        background: transparent !important; 
                    }
                    .time-box {
                        background: transparent !important;
                        border: 1px solid rgba(255, 216, 77, 0.4) !important;
                        padding: 1.2rem 0.5rem !important;
                        border-radius: 4px;
                        min-width: calc(50% - 0.5rem) !important; /* Perfect 2x2 grid alignment */
                        flex: 1 1 calc(50% - 0.5rem) !important;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        position: relative;
                        box-shadow: none !important;
                    }
                    .time-box::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background: linear-gradient(90deg, transparent, #FFD84D, transparent);
                    }
                }
            `}
            </style>

            {/* Render intensive WebGL Canvas only on Desktop devices for 60fps mobile execution target */}
            {!isMobile && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', maxWidth: '400px', maxHeight: '400px', zIndex: -1, opacity: 0.8 }}>
                    <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1]} gl={{ powerPreference: "high-performance" }}>
                        <CyberCore />
                    </Canvas>
                </div>
            )}

            {/* Container for the Logos and College Name */}
            <div style={{
                width: '100%',
                maxWidth: '1400px', // Improved box width constraint for desktop
                zIndex: 2,
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div className="hero-header-flex">

                    {/* Left Logo Container - Static Always Left */}
                    <div className="hero-left-logo" style={{ justifyContent: 'flex-start' }}>
                        <img src={collegeLogoImg} alt="College Logo" style={{
                            width: 'clamp(40px, 12vw, 150px)',
                            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
                        }} />
                    </div>

                    {/* Center Text Container - Static Always Middle */}
                    <div className="hero-title-area mono" style={{
                        gap: 'clamp(0.1rem, 0.5vw, 0.2rem)',
                        color: 'var(--text-white)',
                        background: 'rgba(11, 15, 43, 0.5)',
                        padding: 'clamp(0.2rem, 1.5vw, 2rem) clamp(0.2rem, 2vw, 2rem)',
                        border: '1px solid rgba(0, 245, 255, 0.3)',
                        borderRadius: '8px',
                        backdropFilter: 'blur(5px)'
                    }}>
                        <h3 style={{
                            letterSpacing: 'clamp(0.5px, 0.5vw, 5px)',
                            fontSize: 'clamp(0.6rem, 2.5vw, 2.2rem)',
                            textTransform: 'uppercase',
                            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                            margin: 0,
                            whiteSpace: 'nowrap' // Trying to hold single line as long as possible
                        }}>
                            Mahendra Engineering College
                        </h3>

                        <div style={{
                            fontSize: 'clamp(0.25rem, 1vw, 0.85rem)', // Extremely aggressive clamp down for tiny displays
                            letterSpacing: '0.2px',
                            color: 'var(--text-white)',
                            opacity: 0.9,
                            marginTop: 'clamp(0.2rem, 1vw, 0.5rem)',
                            lineHeight: 1.3,
                            fontWeight: 300
                        }}>
                            AUTONOMOUS ACCREDITED BY NAAC WITH "A++ GRADE (CYCLE-2)"<br />
                            ACCREDITED BY NBA TIER-1 UG: CSE, ECE ,EEE<br />
                            MALLASAMUDRAM (W), NAMAKKAL (DT)-637503, TAMIL NADU
                        </div>
                    </div>

                    {/* Right Logo Container - Static Always Right */}
                    <div className="hero-right-logo" style={{ justifyContent: 'flex-end' }}>
                        <img src={deptLogoImg} alt="ELXA Logo" style={{
                            width: 'clamp(40px, 12vw, 150px)', // Match college logo size
                            filter: 'drop-shadow(0 0 15px rgba(0, 245, 255, 0.4))'
                        }} />
                    </div>

                </div>
            </div>



            <h1 className="main-title" style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                textAlign: 'center',
                fontWeight: 900,
                textTransform: 'uppercase',
                margin: '1rem 0',
                lineHeight: 1.1,
                zIndex: 2,
                position: 'relative',
                animation: 'electricPulse 4s infinite ease-in-out',
                background: 'linear-gradient(90deg, #FFD84D, #FFF080, #FFC107, #FFD84D)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '2px'
            }}>
                <div style={{ animation: 'shineWave 8s infinite linear', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                    Electric Intelligenz<br />
                    <span style={{ fontSize: '1.2em' }}>2K26</span>
                </div>
            </h1>

            {/* Redesigned High-Tier Timer UI */}
            <div className="countdown mobile-no-backdrop" style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                margin: '2rem auto 4rem auto',
                zIndex: 2,
                width: '100%',
                maxWidth: '900px',
                padding: '0 1rem'
            }}>
                {[
                    { label: 'DAYS', value: timeLeft.days },
                    { label: 'HOURS', value: timeLeft.hours },
                    { label: 'MINS', value: timeLeft.mins },
                    { label: 'SECS', value: timeLeft.secs }
                ].map((item, i) => (
                    <div key={i} className="time-box" style={{ 
                        background: 'transparent', 
                        border: '1px solid rgba(0, 245, 255, 0.4)', 
                        borderRadius: '4px',
                        padding: 'clamp(1rem, 2vw, 2.5rem)',
                        minWidth: 'clamp(80px, 20vw, 160px)',
                        boxShadow: '0 0 30px rgba(0, 245, 255, 0.1)',
                        position: 'relative'
                    }}>
                        {/* Unit Number */}
                        <span style={{ 
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
                            fontWeight: 900, 
                            color: '#FFD84D', 
                            textShadow: '0 0 20px rgba(255, 216, 77, 0.6)', 
                            lineHeight: 1,
                            fontFamily: '"Share Tech Mono", monospace'
                        }}>
                            {formatNum(item.value)}
                        </span>
                        
                        {/* Bottom Label Bar */}
                        <div style={{
                            width: '100%',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                            margin: '0.8rem 0'
                        }}></div>

                        <span style={{ 
                            fontSize: 'clamp(0.7rem, 1.5vw, 1rem)', 
                            letterSpacing: '3px', 
                            color: 'rgba(255,255,255,0.7)', 
                            fontWeight: 600,
                            textTransform: 'uppercase'
                        }}>
                            {item.label}
                        </span>
                        
                        {/* Decorative Corner Bracket */}
                        <div style={{ position: 'absolute', top: '5px', left: '5px', width: '10px', height: '10px', borderLeft: '2px solid #00F5FF', borderTop: '2px solid #00F5FF' }}></div>
                        <div style={{ position: 'absolute', bottom: '5px', right: '5px', width: '10px', height: '10px', borderRight: '2px solid #FFD84D', borderBottom: '2px solid #FFD84D' }}></div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, marginBottom: '2rem', textAlign: 'center', width: '100%', padding: '0 1rem' }}>
                <div style={{
                    marginBottom: '3rem',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '140%',
                        height: '140%',
                        background: 'radial-gradient(circle, rgba(0,245,255,0.4) 0%, rgba(0,0,0,0) 60%)',
                        filter: 'blur(30px)',
                        zIndex: -1
                    }}></div>
                    <img src={collabImg} alt="Collaboration" className="floating-img" style={{
                        width: '100%',
                        maxWidth: '800px',
                        filter: 'drop-shadow(0 0 35px rgba(0, 245, 255, 0.8)) drop-shadow(0 0 15px rgba(255, 216, 77, 0.4))',
                        zIndex: 1
                    }} />
                </div>

                <h3 className="tagline" style={{
                    color: 'var(--glow-cyan)',
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    fontWeight: 900,
                    textShadow: '0 0 20px rgba(255, 216, 77, 0.8), 0 0 50px rgba(0, 245, 255, 0.8)',
                    transform: 'scale(1.05)',
                    marginBottom: '1rem'
                }}>
                    A Grand One-Day National Level Technical Symposium
                </h3>
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '4rem',
                    gap: '0.5rem',
                    background: 'rgba(11, 15, 43, 0.5)',
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}>
                    <span style={{ 
                        color: 'rgba(255,255,255,0.7)', 
                        fontSize: 'clamp(0.8rem, 2vw, 1rem)', 
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        fontWeight: 600
                    }}>
                        In Association with
                    </span>
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 'clamp(1rem, 3vw, 2rem)', 
                        flexWrap: 'wrap', 
                        justifyContent: 'center' 
                    }}>
                        <span className="text-google" style={{ 
                            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', 
                            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' 
                        }}>
                            Google Gemini
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300, fontSize: '1.5rem' }}>|</span>
                        <span style={{ 
                            color: '#FF4DFF', 
                            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', 
                            fontWeight: 900, 
                            textShadow: '0 0 20px rgba(255, 77, 255, 0.8), 0 0 10px rgba(255, 77, 255, 0.4)',
                            letterSpacing: '1px'
                        }}>
                            ELEXA CLUB
                        </span>
                    </div>
                </div>

                {/* New Section Design Outside the Box */}
                
                {/* Container Box for Awards & Ambassadorship */}
                <div className="mobile-no-backdrop" style={{
                    background: 'rgba(11, 15, 43, 0.65)',
                    borderTop: '2px solid rgba(0, 245, 255, 0.5)',
                    borderBottom: '2px solid rgba(255, 216, 77, 0.5)',
                    borderLeft: '1px solid rgba(0, 245, 255, 0.2)',
                    borderRight: '1px solid rgba(255, 216, 77, 0.2)',
                    borderRadius: '24px',
                    padding: 'clamp(1.5rem, 3vw, 2rem) clamp(1rem, 3vw, 3rem)',
                    maxWidth: '100%',
                    width: '100%',
                    margin: '0 auto',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    boxShadow: '0 0 50px rgba(0, 245, 255, 0.1) inset, 0 20px 40px rgba(0,0,0,0.5)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Inner glowing accents for the box */}
                    <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 }}></div>
                    <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(255,216,77,0.1) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 }}></div>

                    {/* Swags Section */}
                    <div className="swags-row mobile-reverse-col" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'clamp(2rem, 5vw, 6rem)',
                        width: '100%',
                        position: 'relative',
                        zIndex: 1,
                        marginBottom: 'clamp(1rem, 3vw, 2rem)', /* Space between the two sections */
                        flexWrap: 'wrap'
                    }}>
                        <div className="scroll-fade-left" style={{ flex: '1 1 400px', textAlign: 'left', minWidth: '300px' }}>
                            <div style={{ display: 'inline-block', background: 'rgba(0, 245, 255, 0.05)', padding: '0.5rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(0, 245, 255, 0.2)', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0, color: 'var(--text-white)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '2px', fontFamily: '"Outfit", sans-serif', textShadow: '0 0 15px rgba(0, 245, 255, 0.8), 0 0 30px rgba(0, 245, 255, 0.4)' }}>
                                    Exclusive Google Rewards
                                </h3>
                            </div>
                            <div style={{ background: 'rgba(0, 245, 255, 0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(0, 245, 255, 0.15)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                                <p style={{ color: 'var(--text-white)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: '1.8', margin: 0, opacity: 0.95, fontWeight: 500 }}>
                                    Participate in our exciting events and showcase your skills.<br /><br />
                                    Top performers will win exclusive Google Gemini swags. Rewards include college bags, T-shirts, tea cups, and stickers.<br /><br />
                                    Take home these amazing swags as a memory of the event. Don’t miss the chance to win and show your talent!
                                </p>
                            </div>
                        </div>

                        <div className="scroll-fade-right hero-img-container" style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                bottom: '10%',
                                width: '70%',
                                height: '20px',
                                background: 'rgba(0, 245, 255, 0.5)',
                                filter: 'blur(25px)',
                                borderRadius: '50%',
                                zIndex: 0
                            }}></div>
                            <img src={swagsImg} alt="Google Swags" className="floating-img" style={{ width: '100%', maxWidth: '400px', maxHeight: '350px', objectFit: 'contain', borderRadius: '16px', filter: 'drop-shadow(0 0 35px rgba(0, 245, 255, 0.8)) drop-shadow(0 0 15px rgba(0, 245, 255, 0.4))', zIndex: 1 }} />
                        </div>
                    </div>

                    {/* Horizontal Divider */}
                    <div style={{ width: '80%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', margin: '0 auto clamp(1.5rem, 3vw, 2rem) auto', zIndex: 1, position: 'relative' }}></div>

                    {/* Ambassador Section */}
                    <div className="ambassador-row" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'clamp(2rem, 5vw, 6rem)',
                        width: '100%',
                        position: 'relative',
                        zIndex: 1,
                        flexWrap: 'wrap'
                    }}>
                        <div className="scroll-fade-left hero-img-container" style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                bottom: '10%',
                                width: '70%',
                                height: '20px',
                                background: 'rgba(255, 216, 77, 0.5)',
                                filter: 'blur(25px)',
                                borderRadius: '50%',
                                zIndex: 0
                            }}></div>
                            <img src={ambassadorImg} alt="Campus Ambassador" className="floating-img" style={{ width: '100%', maxWidth: '400px', maxHeight: '350px', objectFit: 'contain', borderRadius: '16px', filter: 'drop-shadow(0 0 35px rgba(255, 216, 77, 0.8)) drop-shadow(0 0 15px rgba(255, 216, 77, 0.4))', zIndex: 1 }} />
                        </div>

                        <div className="scroll-fade-right" style={{ flex: '1 1 400px', textAlign: 'left', minWidth: '300px' }}>
                            <div style={{ display: 'inline-block', background: 'rgba(255, 216, 77, 0.05)', padding: '0.5rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(255, 216, 77, 0.2)', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0, color: 'var(--text-white)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '2px', fontFamily: '"Outfit", sans-serif', textShadow: '0 0 15px rgba(255, 216, 77, 0.8), 0 0 30px rgba(255, 216, 77, 0.4)' }}>
                                    Campus Leadership
                                </h3>
                            </div>
                            <div style={{ background: 'rgba(255, 216, 77, 0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255, 216, 77, 0.15)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                                <p style={{ color: 'var(--text-white)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: '1.8', margin: 0, opacity: 0.95, fontWeight: 500, marginBottom: '1.5rem' }}>
                                    Top performers will get Campus Ambassador Referral Opportunities.<br /><br />
                                    This opportunity helps you represent Google Gemini in your campus. Gain recognition, leadership experience, and networking opportunities. Show your talent and take the first step toward becoming a Campus Ambassador.
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--glow-cyan)', fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', fontWeight: 700, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><span style={{ color: '#FFD84D' }}>✦</span> Open to All Engineering Students</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><span style={{ color: '#FFD84D' }}>✦</span> Cross-College Collaboration Allowed</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}><span style={{ color: '#FFD84D' }}>✦</span> Professional Networking Development</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Real Procedural Thunder Strikes */}
            <RealisticLightning />

        </section>
    );
};

export default Hero;
