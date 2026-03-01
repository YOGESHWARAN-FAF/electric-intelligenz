import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ChiefGuest from './components/ChiefGuest';
import Events from './components/Events';
import Pricing from './components/Pricing';
import PrizePool from './components/PrizePool';
import Background from './components/Background';
import CursorTrail from './components/CursorTrail';
import OrganizingCommittee from './components/OrganizingCommittee';
import InstagramFollow from './components/InstagramFollow';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const containerRef = useRef(null);

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

            <main ref={containerRef} className="app-container">
                <Hero />
                <ChiefGuest />
                <Dashboard />
                <Events />
                <PrizePool />
                <Pricing />
                <OrganizingCommittee />
                <InstagramFollow />

                <footer style={{
                    textAlign: 'center',
                    padding: '3rem',
                    fontFamily: 'Orbitron, sans-serif',
                    color: 'rgba(255, 255, 255, 0.5)',
                    borderTop: '1px solid rgba(0, 245, 255, 0.1)',
                    marginTop: '5rem',
                    background: 'rgba(11, 15, 43, 0.8)'
                }}>
                    <p>Electric Intelligenz 2K26 &copy; Mahendra Engineering College</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--glow-cyan)' }}>
                        Electrical and Electronics Engineering
                    </p>
                </footer>
            </main>
        </>
    );
}

export default App;
