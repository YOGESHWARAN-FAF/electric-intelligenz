import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Dashboard = () => {
    const cardRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        // Neon pulse animation for status badge
        gsap.to('.status-dot', {
            opacity: 0.5,
            scale: 1.2,
            repeat: -1,
            yoyo: true,
            duration: 0.5,
            ease: "power1.inOut"
        });

        // Registration Progress animation
        gsap.fromTo(progressRef.current,
            { width: '0%' },
            {
                width: '85%',
                duration: 2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 75%'
                }
            }
        );

    }, []);

    return (
        <section style={{ padding: '6rem 2rem', display: 'flex', justifyContent: 'center' }}>
            <div ref={cardRef} className="glass-panel" style={{
                width: '100%',
                maxWidth: '800px',
                padding: '3rem',
                border: '2px solid var(--glow-cyan)',
                position: 'relative'
            }}>

                {/* Background Grid Pattern */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    opacity: 0.2,
                    zIndex: -1
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(0, 245, 255, 0.3)', paddingBottom: '1rem' }}>
                    <h2 className="section-title" style={{ margin: 0, fontSize: '2rem', textAlign: 'left' }}>Event Dashboard</h2>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(0,255,0,0.1)', padding: '0.5rem 1.5rem', borderRadius: '30px', border: '1px solid rgba(0,255,0,0.5)' }}>
                        <div className="status-dot" style={{ width: '12px', height: '12px', background: '#0f0', borderRadius: '50%', boxShadow: '0 0 10px #0f0' }}></div>
                        <span style={{ color: '#0f0', fontWeight: 'bold', letterSpacing: '2px' }}>OPEN</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.5', fontSize: '1.1rem' }}>
                        <li><strong className="text-cyan">Event Name:</strong> Electric Intelligenz 2K26</li>
                        <li><strong className="text-cyan">Department:</strong> Electrical and Electronics Eng.</li>
                        <li><strong className="text-cyan">Institution:</strong> Mahendra Engineering College</li>
                    </ul>
                    <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2.5', fontSize: '1.1rem' }}>
                        <li><strong className="text-cyan">Type:</strong> National Level Tech Symposium</li>
                        <li><strong className="text-cyan">Date:</strong> 26 March 2026</li>
                        <li><strong className="text-cyan">Mode:</strong> Offline (On Campus)</li>
                    </ul>
                </div>

                {/* Contact Email Highlight */}
                <div style={{ background: 'rgba(0, 245, 255, 0.05)', border: '1px solid rgba(0, 245, 255, 0.3)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: 'var(--text-white)' }}>Contact Us:</span>
                    <a href="mailto:electricintelligenzmec@gmail.com" style={{ color: 'var(--glow-cyan)', fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none', textShadow: '0 0 10px rgba(0,245,255,0.5)' }}>
                        electricintelligenzmec@gmail.com
                    </a>
                </div>

                <div style={{ background: 'rgba(255, 216, 77, 0.05)', border: '1px solid rgba(255, 216, 77, 0.3)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ display: 'block', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Early Bird</span>
                        <strong className="text-yellow" style={{ fontSize: '1.5rem' }}>₹250</strong>
                    </div>
                    <div style={{ width: '1px', background: 'rgba(255, 216, 77, 0.3)' }}></div>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ display: 'block', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Spot Registration</span>
                        <strong className="text-yellow" style={{ fontSize: '1.5rem' }}>₹300</strong>
                    </div>
                </div>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        <span>Registration Open</span>
                        <span className="text-cyan">Deadline: 23 Mar 2026</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div ref={progressRef} style={{ height: '100%', background: 'linear-gradient(90deg, #00F5FF, #FFD84D)', width: '0%', boxShadow: '0 0 10px #00F5FF' }}></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Dashboard;
