import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import qrImage from '../assets/qr.png';

const Pricing = () => {
    const scannerRef = useRef(null);

    useEffect(() => {
        // Scanning line animation
        gsap.to(scannerRef.current, {
            top: '100%',
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "linear"
        });
    }, []);

    return (
        <section style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 2rem)', display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '900px',
                padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem)',
                border: '2px solid var(--heading-yellow)',
                boxShadow: '0 0 40px rgba(255, 216, 77, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'clamp(1.5rem, 4vw, 3rem)',
                position: 'relative'
            }}>
                <h2 className="section-title text-yellow" style={{ margin: 0, fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', textAlign: 'center' }}>Secure Your Spot</h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(1rem, 3vw, 2rem)', width: '100%' }}>
                    {/* Early Bird Badge */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(0, 245, 255, 0.2)',
                        padding: 'clamp(1.5rem, 4vw, 2rem) clamp(1.5rem, 4vw, 3rem)',
                        borderRadius: '16px',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 2,
                        filter: 'grayscale(1) opacity(0.7)',
                        cursor: 'not-allowed',
                        flex: '1 1 min-content'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%) rotate(-15deg)',
                            background: 'var(--cta-red)',
                            color: 'white',
                            padding: '0.5rem 2rem',
                            borderRadius: '4px',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            boxShadow: '0 0 20px var(--cta-red)',
                            zIndex: 10
                        }}>CLOSED</div>
                        <h4 style={{ color: 'var(--glow-cyan)', marginBottom: '1rem', letterSpacing: '2px', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>EARLY REGISTRATION</h4>
                        <strong style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', display: 'block' }}>₹250</strong>
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Valid till 23 Mar 2026</span>
                    </div>

                    {/* Spot Registration Badge */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 216, 77, 0.2)',
                        padding: 'clamp(1.5rem, 4vw, 2rem) clamp(1.5rem, 4vw, 3rem)',
                        borderRadius: '16px',
                        textAlign: 'center',
                        zIndex: 2,
                        position: 'relative',
                        filter: 'grayscale(1) opacity(0.7)',
                        cursor: 'not-allowed',
                        flex: '1 1 min-content'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%) rotate(-15deg)',
                            background: 'var(--cta-red)',
                            color: 'white',
                            padding: '0.5rem 2rem',
                            borderRadius: '4px',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            boxShadow: '0 0 20px var(--cta-red)',
                            zIndex: 10
                        }}>CLOSED</div>
                        <h4 style={{ color: 'var(--heading-yellow)', marginBottom: '1rem', letterSpacing: '2px', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>SPOT REGISTRATION</h4>
                        <strong style={{ fontSize: 'clamp(3rem, 7vw, 4rem)', display: 'block', color: 'var(--heading-yellow)' }}>₹300</strong>
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>On 26 Mar 2026</span>
                    </div>
                </div>

                {/* Registration Closed Notice */}
                <div style={{
                    marginTop: '2rem',
                    padding: 'clamp(1.5rem, 4vw, 3rem)',
                    border: '2px dashed #ff4c4c',
                    borderRadius: '24px',
                    textAlign: 'center',
                    background: 'rgba(255, 76, 76, 0.05)',
                    boxShadow: '0 0 20px rgba(255, 0, 0, 0.2)'
                }}>
                    <h3 style={{ color: '#ff4c4c', marginBottom: '1rem', letterSpacing: '2px', fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}>⚠️ ALL REGISTRATIONS CLOSED</h3>
                    <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', opacity: 0.9, lineHeight: '1.6' }}>
                        The registration windows for Electric Intelligenz 2K26 have officially closed.
                        <br /><br />
                        <strong style={{ color: 'var(--glow-cyan)', display: 'block', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', textShadow: '0 0 10px rgba(0, 245, 255, 0.3)' }}>
                            We look forward to seeing all registered participants at the symposium!
                        </strong>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
