import React from 'react';
import { Instagram } from 'lucide-react';

const InstagramFollow = () => {
    return (
        <section style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 2rem)', display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '700px',
                padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem)',
                border: '1px solid rgba(221, 42, 123, 0.4)',
                boxShadow: '0 0 30px rgba(221, 42, 123, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Subtle gradient background mixed with the glassmorphism */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(45deg, rgba(245, 133, 41, 0.05), rgba(221, 42, 123, 0.1), rgba(129, 52, 175, 0.05))',
                    zIndex: -1
                }}></div>

                <div style={{
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    padding: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 0 25px rgba(221, 42, 123, 0.6)'
                }}>
                    <Instagram size={45} color="white" strokeWidth={2.5} />
                </div>

                <h3 style={{ margin: 0, fontSize: 'clamp(1.8rem, 5vw, 2.2rem)', fontFamily: 'Orbitron, sans-serif', color: 'var(--text-white)' }}>
                    Follow Us on Instagram
                </h3>

                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: '500px', lineHeight: '1.6' }}>
                    Stay updated with the latest event announcements, behind-the-scenes, surprise drops, and sneak peeks!
                </p>

                <a
                    href="https://instagram.com/electric_intelligenz_mec"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        padding: '12px 30px',
                        borderRadius: '30px',
                        color: 'var(--text-white)',
                        textDecoration: 'none',
                        fontFamily: 'Share Tech Mono, monospace',
                        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                        transition: 'all 0.3s ease',
                        marginTop: '1rem',
                        boxShadow: '0 0 15px rgba(0,0,0,0.2) inset'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(221, 42, 123, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(221, 42, 123, 0.8)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(221, 42, 123, 0.6)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(0,0,0,0.2) inset';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    @<span style={{ fontWeight: 'bold' }}>electric_intelligenz_mec</span>
                </a>
            </div>
        </section>
    );
};

export default InstagramFollow;
