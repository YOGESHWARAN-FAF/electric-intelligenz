import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import dogImg from '../assets/dog-new.png';
import brochureImg from '../assets/brochure.jpg';

gsap.registerPlugin(ScrollTrigger);

const EventCard = ({ evt, index, isExpanded, toggleExpand }) => {
    // 0 = left, 1 = right, 2 = left, 3 = right
    const isLeft = index % 2 === 0;

    return (
        <div className={`event-card-wrapper ${isLeft ? 'zig-left' : 'zig-right'}`} style={{ cursor: 'pointer' }} onClick={() => toggleExpand(index)}>
            <div className="event-marker" style={{ borderColor: evt.color, color: evt.color }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: evt.color, transition: 'transform 0.3s ease', transform: isExpanded ? 'scale(1.5)' : 'scale(1)' }}></div>
            </div>
            
            <div className="event-card" style={{ 
                border: `1px solid ${evt.color}66`, 
                borderTop: `4px solid ${evt.color}`, 
                boxShadow: isExpanded ? `0 15px 40px rgba(0,0,0,0.7), 0 0 30px ${evt.color}44 inset` : `0 10px 30px rgba(0,0,0,0.5), 0 0 10px ${evt.color}11 inset`,
                transform: isExpanded ? 'scale(1.02)' : 'scale(1)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ color: evt.color, fontSize: 'clamp(1.2rem, 4vw, 2rem)', margin: 0, textShadow: `0 0 15px ${evt.color}88`, fontFamily: '"Outfit", sans-serif', letterSpacing: '1px' }}>
                        {evt.category}
                    </h3>
                    <div style={{ 
                        color: evt.color, 
                        fontSize: '1.5rem', 
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', 
                        transition: 'transform 0.3s ease' 
                    }}>▼</div>
                </div>

                <div className="event-details" style={{ 
                    maxHeight: isExpanded ? '1000px' : '0px', 
                    opacity: isExpanded ? 1 : 0, 
                    overflow: 'hidden', 
                    transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out, margin-top 0.3s',
                    marginTop: isExpanded ? '1.5rem' : '0'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {evt.items.map((item, idx) => (
                            <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', borderLeft: `2px solid ${evt.color}88` }}>
                                <h4 style={{ color: 'var(--text-white)', fontSize: '1.1rem', margin: '0 0 0.5rem 0', fontWeight: 700 }}>{item.name}</h4>
                                {item.desc && (
                                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
                                        {item.desc}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const timelineRef = useRef(null);
    const [expandedEvent, setExpandedEvent] = useState(0); // First event expanded by default

    const toggleExpand = (index) => {
        setExpandedEvent(expandedEvent === index ? null : index);
        // Refresh GSAP after accordion expansion animation ends
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 550);
    };

    useEffect(() => {
        const nodes = gsap.utils.toArray('.event-card-wrapper');
        
        nodes.forEach((node) => {
            gsap.fromTo(node, 
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: node,
                        start: 'top 95%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Dog floating animation (GPU optimized)
        gsap.to('.dancing-dog-img', {
            y: -15,
            rotationZ: 1,
            repeat: -1,
            yoyo: true,
            duration: 2.5,
            ease: "sine.inOut",
            force3D: true
        });

    }, []);

    const events = [
        {
            category: "Technical Events",
            color: "#00F5FF",
            items: [
                { name: "Paper Presentation", desc: "Present your research ideas. Separate prizes are allocated for each presentation venue." },
                { name: "Ideathon – 6 Hour Hackathon", desc: "Brainstorm, build, and innovate real-world solutions under intensive time constraints." },
                { name: "Project Expo", desc: "Showcase your innovative working models to evaluating panels." },
                { name: "Electro Hunt", desc: "Circuit Debugging and Simulation Challenge." }
            ]
        },
        {
            category: "Non-Technical Events",
            color: "#0f0",
            items: [
                { name: "Make a Story", desc: "Unleash your creative writing and storytelling skills!" },
                { name: "Silent Skit", desc: "Express everything through pure acting, zero words." },
                { name: "Snap Sync", desc: "Photography and media alignment competition." }
            ]
        },
        {
            category: "Workshops",
            color: "#FFD84D",
            items: [
                { name: "LABVIEW Workshop", desc: "Gain hands-on exposure to advanced industry tools." },
                { name: "MATLAB Workshop", desc: "Learn algorithmic computation and simulation." }
            ]
        }
    ];

    return (
        <section style={{ padding: 'clamp(2rem, 5vw, 6rem) 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>
            
            <style>
            {`
                .roadmap-container {
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                    width: 100%;
                    max-width: 900px;
                    margin: 0 auto;
                    position: relative;
                }
                .roadmap-line {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    top: 0;
                    bottom: 0;
                    width: 4px;
                    background: linear-gradient(180deg, rgba(0,245,255,0.8), #0f0, rgba(255,216,77,0.8), rgba(255,77,255,0.8));
                    box-shadow: 0 0 15px rgba(0,245,255,0.6);
                    border-radius: 4px;
                    z-index: 0;
                }
                .event-card-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    position: relative;
                    z-index: 1;
                    width: 100%;
                }
                
                /* Zig Zag Logic for Desktop */
                .zig-left {
                    flex-direction: row-reverse;
                }
                .zig-right {
                    flex-direction: row;
                }

                .zig-left .event-card, .zig-right .event-card {
                    text-align: left;
                }
                .zig-left .event-card {
                    transform-origin: right center;
                }
                .zig-right .event-card {
                    transform-origin: left center;
                }

                .event-marker {
                    flex-shrink: 0;
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    background: var(--bg-color, #0B0F2B);
                    border: 4px solid;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 0 20px currentColor;
                    z-index: 2;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .event-card {
                    width: calc(50% - 40px); /* 50% minus half the timeline gap */
                    background: rgba(11, 15, 43, 0.7);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border-radius: 16px;
                    padding: clamp(1.2rem, 3vw, 2rem);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    will-change: transform, opacity;
                }
                .event-card::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
                    animation: glassyFlash 2.5s infinite linear;
                    pointer-events: none;
                    z-index: 10;
                    will-change: transform;
                }
                @keyframes glassyFlash {
                    0% { transform: translateX(-300%) skewX(-25deg); }
                    30% { transform: translateX(300%) skewX(-25deg); }
                    100% { transform: translateX(300%) skewX(-25deg); }
                }
                .dancing-dog-img {
                    width: 100%;
                    max-width: 350px;
                    background: transparent;
                    /* GPU optimized shadow */
                    box-shadow: 0 0 50px rgba(0, 245, 255, 0.4);
                    border-radius: 50%;
                    object-fit: contain;
                    display: block;
                    margin: 2rem auto;
                    will-change: transform;
                }

                /* Mobile Zig Zag Flow Map */
                @media (max-width: 768px) {
                    .roadmap-container {
                        padding-left: 0;
                        gap: 2.5rem;
                    }
                    .roadmap-line {
                        left: 20px;
                        transform: none;
                        width: 3px;
                    }
                    .event-card-wrapper {
                        flex-direction: row !important; /* Force all to align left */
                        gap: 1.5rem;
                        align-items: flex-start;
                    }
                    .event-marker {
                        position: relative;
                        left: auto;
                        transform: none;
                        width: 36px;
                        height: 36px;
                        border-width: 3px;
                        margin-top: 5px;
                    }
                    .event-card {
                        width: calc(100% - 60px); 
                        text-align: left !important;
                        padding: 1.2rem;
                        border-radius: 12px;
                        backdrop-filter: none;
                        -webkit-backdrop-filter: none;
                        background: rgba(11, 15, 43, 0.95);
                    }
                    
                    /* Create a sub-zig-zag effect on cards themselves for mobile */
                    .zig-left .event-card {
                        border-right: none !important;
                        border-left: 4px solid !important;
                    }
                    .zig-right .event-card {
                        border-left: none !important;
                        border-right: 4px solid !important;
                    }
                }
            `}
            </style>

            <h2 className="section-title text-cyan" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', textAlign: 'center', marginBottom: '1rem', fontFamily: '"Outfit", sans-serif', textShadow: '0 0 20px rgba(0, 245, 255, 0.8)' }}>
                EVENT ROADMAP
            </h2>

            {/* Glowing Download Brochure Button */}
            <div style={{ textAlign: 'center', marginBottom: '4rem', zIndex: 10 }}>
                <a href={brochureImg} download="Electric-Intelligenz-2K26-Brochure.jpg" className="btn-primary" style={{
                    padding: '12px 30px',
                    fontSize: '1rem',
                    background: 'transparent',
                    border: '2px solid var(--glow-cyan)',
                    color: 'var(--glow-cyan)',
                    boxShadow: '0 0 20px rgba(0, 245, 255, 0.3) inset, 0 0 10px rgba(0, 245, 255, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                    DOWNLOAD BROCHURE
                </a>
            </div>

            <div className="roadmap-container" ref={timelineRef}>
                <div className="roadmap-line"></div>

                {events.map((evt, index) => (
                    <EventCard key={index} evt={evt} index={index} isExpanded={expandedEvent === index} toggleExpand={toggleExpand} />
                ))}

                {/* Special Robo Dog Event Node */}
                <div className="event-card-wrapper zig-right" style={{ marginTop: '2rem' }}>
                    <div className="event-marker" style={{ borderColor: '#FF4DFF', color: '#FF4DFF' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF4DFF', transform: expandedEvent === 3 ? 'scale(1.5)' : 'scale(1)', transition: 'transform 0.3s' }}></div>
                    </div>
                    <div className="event-card" style={{ border: '1px solid rgba(255, 77, 255, 0.4)', borderTop: '4px solid #FF4DFF', boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(255, 77, 255, 0.2) inset' }} onClick={() => toggleExpand(3)}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ color: '#FF4DFF', fontSize: 'clamp(1.2rem, 4vw, 2rem)', margin: 0, textShadow: '0 0 15px rgba(255, 77, 255, 0.8)', fontFamily: '"Outfit", sans-serif', letterSpacing: '1px' }}>
                                Special Fun Events
                            </h3>
                            <div style={{ color: '#FF4DFF', fontSize: '1.5rem', transform: expandedEvent === 3 ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</div>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', margin: '0.5rem 0' }}>No separate Registration Required</p>
                        
                        <div className="event-details" style={{ 
                            maxHeight: expandedEvent === 3 ? '1500px' : '0px', 
                            opacity: expandedEvent === 3 ? 1 : 0, 
                            overflow: 'hidden', 
                            transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out, margin-top 0.3s',
                            marginTop: expandedEvent === 3 ? '1.5rem' : '0'
                        }}>
                            <img src={dogImg} alt="Robo Dog" className="dancing-dog-img" />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.5rem', textAlign: 'left' }}>
                                <div style={{ background: 'rgba(0,245,255,0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '2px solid #00F5FF' }}>
                                    <h4 style={{ color: '#00F5FF', fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: 800 }}>Dare with Robo Dog</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', margin: 0, lineHeight: 1.5 }}>Take up thrilling challenges presented by the animatronic machine.</p>
                                </div>
                                <div style={{ background: 'rgba(0,245,255,0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '2px solid #00F5FF' }}>
                                    <h4 style={{ color: '#00F5FF', fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: 800 }}>Break the Logic with Robo Dog</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', margin: 0, lineHeight: 1.5 }}>Puzzle solving and logic games designed alongside robotic interactions.</p>
                                </div>
                                <div style={{ background: 'rgba(0,245,255,0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '2px solid #00F5FF' }}>
                                    <h4 style={{ color: '#00F5FF', fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: 800 }}>Reel with Robo Dog</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', margin: 0, lineHeight: 1.5 }}>Capture cinematic moments and perform alongside the robot for social reels.</p>
                                </div>
                                <div style={{ padding: '1.5rem', background: 'rgba(255, 216, 77, 0.1)', borderLeft: '4px solid #FFD84D', marginTop: '1rem', borderRadius: '8px' }}>
                                    <h4 style={{ color: '#FFD84D', fontSize: '1.3rem', margin: '0 0 0.5rem 0', textShadow: '0 0 10px rgba(255, 216, 77, 0.5)' }}>Exclusive Reward Available</h4>
                                    <p style={{ color: 'var(--text-white)', fontSize: '1.1rem', margin: 0, fontWeight: 600 }}>Win authentic Google Gemini Swags for excelling in special events.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Dashboard;
