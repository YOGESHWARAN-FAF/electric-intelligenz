import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import prizeImage from '../assets/prize-money.png';

const PrizePool = () => {
    const imageRef = useRef(null);

    useEffect(() => {
        // Realistic filter-based glowing & floating animation
        // drop-shadow follows the exact transparent contours of the PNG rather than drawing a circle!
        gsap.to(imageRef.current, {
            y: -15, // float up
            rotationZ: 1.5, // slightly more dramatic rotation
            filter: 'drop-shadow(0px 25px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 50px rgba(255, 216, 77, 1)) drop-shadow(0 0 90px rgba(255, 140, 0, 0.8))',
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "power2.inOut"
        });
    }, []);

    return (
        <section style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 2rem)', position: 'relative', overflow: 'hidden' }}>

            <h2 className="section-title text-yellow" style={{ position: 'relative', zIndex: 10 }}>Prizes & Rewards</h2>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 'clamp(2rem, 5vw, 4rem)',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>

                {/* Container for the Image */}
                <div style={{ width: '100%', maxWidth: '450px', position: 'relative', zIndex: 5, padding: '2rem', display: 'flex', justifyContent: 'center' }}>

                    {/* The Prize Image with realistic native CSS drop-shadow filters */}
                    <img
                        ref={imageRef}
                        src={prizeImage}
                        alt="Massive Cash Prizes"
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                            // Initial state, to be overridden and expanded by GSAP
                            filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.5)) drop-shadow(0 0 10px rgba(255, 216, 77, 0.4)) drop-shadow(0 0 20px rgba(255, 140, 0, 0.2))',
                            zIndex: 1
                        }}
                    />
                </div>

                {/* Details Glass Panel */}
                <div className="glass-panel" style={{
                    flex: '1 1 300px',
                    padding: 'clamp(2rem, 4vw, 3rem)',
                    border: '2px solid var(--heading-yellow)',
                    boxShadow: '0 0 30px rgba(255, 216, 77, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    zIndex: 10
                }}>
                    <h3 style={{ color: 'var(--glow-cyan)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '1px' }}>
                        🎁 What You Get at the <br /> <span className="text-yellow" style={{ fontSize: '1.2em' }}>Symposium</span>
                    </h3>
                    
                    <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', padding: 0 }}>
                        {[
                            "Welcome Kit",
                            "2 Refreshments",
                            "Tasty Lunch",
                            "Access to 1 Technical Event",
                            "Free entry to Fun & Special Events",
                            "Participation Certificate for All",
                            "Chance to Win Cash Prizes",
                            "Chance to Win Google Swags & Ambassador Referral"
                        ].map((item, idx) => (
                            <li key={idx} style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '15px', 
                                background: 'rgba(0, 245, 255, 0.05)', 
                                padding: '10px 20px', 
                                borderRadius: '12px',
                                border: '1px solid rgba(0, 245, 255, 0.1)',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                            }}>
                                <span style={{ color: '#0f0', fontSize: '1.5rem', textShadow: '0 0 10px #0f0' }}>✔</span>
                                <span style={{ color: 'var(--text-white)', fontSize: '1.1rem', fontWeight: 600 }}>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(255, 216, 77, 0.1)', borderLeft: '4px solid #FFD84D', borderRadius: '0 12px 12px 0' }}>
                        <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-white)', fontWeight: 700, lineHeight: 1.6 }}>
                            ✨ More than anything – <span className="text-yellow">unforgettable memories</span>, zero disappointment, and fun guaranteed!
                        </p>
                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .pulse-button {
                    animation: vault-pulse 2s infinite;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                .pulse-button:hover {
                    transform: scale(1.05);
                }
                @keyframes vault-pulse {
                    0% { box-shadow: 0 0 10px rgba(225, 6, 0, 0.5); }
                    50% { box-shadow: 0 0 30px rgba(255, 216, 77, 0.8); }
                    100% { box-shadow: 0 0 10px rgba(225, 6, 0, 0.5); }
                }
            `}} />
        </section>
    );
};

export default PrizePool;
