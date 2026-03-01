import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import chiefGuestImg from '../assets/chief-guest.jpg';

const ChiefGuest = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        // We use scrollTrigger from App.jsx's generic section animation, 
        // but we can add an extra specific parallax/reveal effect for the image here.
        gsap.fromTo(imageRef.current,
            { scale: 0.9, opacity: 0, filter: 'blur(10px)' },
            {
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%'
                }
            }
        );

        // Pulse animation for the question mark text
        gsap.to('.suspense-text', {
            textShadow: '0 0 20px rgba(0, 245, 255, 0.8), 0 0 40px rgba(0, 245, 255, 0.4)',
            scale: 1.02,
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: "power2.inOut"
        });
    }, []);

    return (
        <section ref={sectionRef} style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 2rem)', display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '900px',
                padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem)',
                border: '2px solid rgba(0, 245, 255, 0.4)',
                boxShadow: '0 0 30px rgba(0, 245, 255, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
                position: 'relative',
                overflow: 'hidden' // So the background glow doesn't spill over
            }}>
                {/* Background Glow */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '150%',
                    height: '150%',
                    background: 'radial-gradient(circle, rgba(0, 245, 255, 0.05) 0%, transparent 70%)',
                    zIndex: -1,
                    pointerEvents: 'none'
                }}></div>

                <h2 className="section-title text-cyan" style={{ margin: 0, fontSize: 'clamp(2rem, 6vw, 3rem)', textAlign: 'center', letterSpacing: '4px' }}>
                    CHIEF GUEST
                </h2>

                <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '350px',
                    aspectRatio: '2/3',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '2px solid var(--heading-yellow)',
                    boxShadow: '0 0 30px rgba(255, 216, 77, 0.3)',
                    background: '#05081c'
                }}>
                    <img
                        ref={imageRef}
                        src={chiefGuestImg}
                        alt="Mystery Chief Guest"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                    />

                    {/* Overlay gradient for extra mystery blending */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '40%',
                        background: 'linear-gradient(to top, rgba(11, 15, 43, 0.9) 0%, transparent 100%)',
                        pointerEvents: 'none'
                    }}></div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '1rem', zIndex: 10 }}>
                    <h3 className="suspense-text" style={{
                        color: 'var(--text-white)',
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                        fontFamily: 'Orbitron, sans-serif',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        margin: 0
                    }}>
                        Who will it be<span style={{ color: 'var(--glow-cyan)' }}>?</span>
                    </h3>
                    <p style={{
                        marginTop: '1.5rem',
                        fontSize: '1.2rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        maxWidth: '600px',
                        lineHeight: '1.6',
                        fontFamily: 'Inter, sans-serif'
                    }}>
                        Stay tuned. We have an incredible visionary joining us to spark the future of electrical and electronics engineering. The grand reveal is going to be <strong className="text-yellow">electrifying!</strong>
                    </p>
                </div>

                {/* Cyberpunk decoration frame lines */}
                <div style={{ position: 'absolute', top: '20px', left: '20px', width: '30px', height: '30px', borderTop: '3px solid var(--glow-cyan)', borderLeft: '3px solid var(--glow-cyan)' }}></div>
                <div style={{ position: 'absolute', top: '20px', right: '20px', width: '30px', height: '30px', borderTop: '3px solid var(--glow-cyan)', borderRight: '3px solid var(--glow-cyan)' }}></div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', width: '30px', height: '30px', borderBottom: '3px solid var(--glow-cyan)', borderLeft: '3px solid var(--glow-cyan)' }}></div>
                <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '30px', height: '30px', borderBottom: '3px solid var(--glow-cyan)', borderRight: '3px solid var(--glow-cyan)' }}></div>
            </div>
        </section>
    );
};

export default ChiefGuest;
