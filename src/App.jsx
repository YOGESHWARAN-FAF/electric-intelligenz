import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';

import Hero from './components/Hero';
import Dashboard from './components/Dashboard';

import Pricing from './components/Pricing';
import PrizePool from './components/PrizePool';
import Background from './components/Background';
import CursorTrail from './components/CursorTrail';
import OrganizingCommittee from './components/OrganizingCommittee';
import InstagramFollow from './components/InstagramFollow';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const containerRef = useRef(null);
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        // Parallax depth layers and smooth transitions
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            gsap.fromTo(section,
                { autoAlpha: 0, y: 50 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        });

    }, []);

    return (
        <>
            <div className="vignette"></div>

            {/* 3D WebGL Background */}
            <Background />

            {/* Interactive Cursor Trail */}
            <CursorTrail />

            {/* Vercel Analytics */}
            <Analytics />

            {/* Registration Notification Popup */}
            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 10000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(30, 30, 50, 0.95), rgba(10, 10, 20, 0.98))',
                        border: '2px solid var(--cta-red, #ff4c4c)',
                        borderRadius: '20px',
                        padding: '40px 30px',
                        maxWidth: '500px',
                        width: '100%',
                        position: 'relative',
                        boxShadow: '0 0 40px rgba(255, 76, 76, 0.4), inset 0 0 20px rgba(255, 76, 76, 0.1)',
                        textAlign: 'center',
                        color: 'white',
                        fontFamily: 'Outfit, sans-serif'
                    }}>
                        <button
                            onClick={() => setShowPopup(false)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '20px',
                                background: 'transparent',
                                border: 'none',
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                transition: 'color 0.3s'
                            }}
                            onMouseOver={(e) => e.target.style.color = '#fff'}
                            onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                            aria-label="Close"
                        >
                            ✖
                        </button>

                        <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🚨</div>
                        <h2 style={{ color: 'var(--cta-red, #ff4c4c)', marginBottom: '15px', letterSpacing: '2px', fontSize: '1.8rem' }}>
                            ONLINE REGISTRATION IS CLOSED
                        </h2>
                        <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: '1.6', marginBottom: '25px' }}>
                            Our department symposium online registration is now officially closed.
                        </p>
                        <div style={{
                            background: 'rgba(255, 216, 77, 0.1)',
                            border: '1px solid var(--heading-yellow, #ffd84d)',
                            padding: '15px',
                            borderRadius: '12px',
                            color: 'var(--heading-yellow, #ffd84d)',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            letterSpacing: '1px'
                        }}>
                            MEET US ON-SPOT FOR REGISTRATION!
                        </div>
                    </div>
                </div>
            )}

            <main ref={containerRef} className="app-container">
                <Hero />
                <Dashboard />
                <PrizePool />
                <Pricing />
                <OrganizingCommittee />
                <InstagramFollow />

                <footer style={{
                    textAlign: 'center',
                    padding: '3rem',
                    fontFamily: 'Outfit, sans-serif',
                    color: 'rgba(255, 255, 255, 0.5)',
                    borderTop: '1px solid rgba(0, 245, 255, 0.1)',
                    marginTop: '5rem',
                    background: 'rgba(11, 15, 43, 0.8)'
                }}>
                    <p>Electric Intelligenz 2K26 &copy; Mahendra Engineering College</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--glow-cyan)' }}>
                        Electrical and Electronics Engineering
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <a
                            href="https://www.linkedin.com/in/mahendra-engineering-college-eee-05928b392?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--text-white)',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                border: '1px solid rgba(0, 245, 255, 0.4)',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                background: 'rgba(0, 245, 255, 0.1)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = 'rgba(0, 245, 255, 0.2)';
                                e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 245, 255, 0.5)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'rgba(0, 245, 255, 0.1)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            Connect on LinkedIn
                        </a>
                    </div>
                </footer>
            </main>
        </>
    );
}

export default App;
