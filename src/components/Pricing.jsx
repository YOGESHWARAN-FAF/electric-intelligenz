import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

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
                        background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(0, 245, 255, 0.05))',
                        border: '1px solid var(--glow-cyan)',
                        padding: 'clamp(1.5rem, 4vw, 2rem) clamp(1.5rem, 4vw, 3rem)',
                        borderRadius: '16px',
                        textAlign: 'center',
                        boxShadow: '0 0 20px rgba(0, 245, 255, 0.2)',
                        transition: 'transform 0.3s',
                        cursor: 'default',
                        flex: '1 1 min-content'
                    }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05) translateY(-10px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
                    >
                        <h4 style={{ color: 'var(--glow-cyan)', marginBottom: '1rem', letterSpacing: '2px', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>EARLY BIRD</h4>
                        <strong style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', display: 'block' }}>₹250</strong>
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Valid till 23 Mar 2026</span>
                    </div>

                    {/* Spot Registration Badge */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(255, 216, 77, 0.3), rgba(255, 216, 77, 0.05))',
                        border: '2px solid var(--heading-yellow)',
                        padding: 'clamp(1.5rem, 4vw, 2rem) clamp(1.5rem, 4vw, 3rem)',
                        borderRadius: '16px',
                        textAlign: 'center',
                        boxShadow: '0 0 30px rgba(255, 216, 77, 0.3)',
                        zIndex: 2,
                        position: 'relative',
                        transition: 'transform 0.3s',
                        cursor: 'default',
                        flex: '1 1 min-content'
                    }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05) translateY(-10px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
                    >
                        <div style={{
                            position: 'absolute',
                            top: '-15px',
                            right: '-15px',
                            background: 'var(--cta-red)',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            boxShadow: '0 0 10px var(--cta-red)'
                        }}>POPULAR</div>
                        <h4 style={{ color: 'var(--heading-yellow)', marginBottom: '1rem', letterSpacing: '2px', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>SPOT REGISTRATION</h4>
                        <strong style={{ fontSize: 'clamp(3rem, 7vw, 4rem)', display: 'block', color: 'var(--heading-yellow)' }}>₹300</strong>
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>On 26 Mar 2026</span>
                    </div>
                </div>

                {/* Glowing QR Code Frame */}
                <div style={{
                    marginTop: '2rem',
                    padding: '2rem',
                    border: '2px dashed rgba(255, 255, 255, 0.3)',
                    borderRadius: '24px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem',
                    background: 'rgba(255,255,255,0.02)'
                }}>
                    <div ref={scannerRef} style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: 'var(--glow-cyan)',
                        boxShadow: '0 0 15px 5px rgba(0, 245, 255, 0.5)',
                        zIndex: 5
                    }}></div>

                    <img
                        src="/src/assets/qr.png"
                        alt="Registration QR Code"
                        style={{
                            width: 'clamp(120px, 40vw, 180px)',
                            height: 'auto',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.4))',
                            borderRadius: '8px',
                            background: 'white',
                            padding: '10px'
                        }}
                    />
                    <p className="mono" style={{ letterSpacing: '2px', opacity: 0.8, textAlign: 'center' }}>SCAN OR CLICK TO REGISTER</p>
                </div>

                <a href="https://forms.gle/Fj3hHDK1RuGb7RW77" target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop: 'clamp(1rem, 3vw, 2rem)', fontSize: 'clamp(1rem, 3vw, 1.2rem)', padding: 'clamp(0.8rem, 2vw, 1rem) clamp(2rem, 5vw, 4rem)', textAlign: 'center' }}>
                    REGISTER NOW FAST
                </a>
            </div>
        </section>
    );
};

export default Pricing;
