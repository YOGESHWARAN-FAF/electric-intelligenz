import React, { useRef, useState } from 'react';
import { Cpu, Gamepad2, Wrench } from 'lucide-react';

const EventCard = ({ title, items, icon: Icon, color }) => {
    const cardRef = useRef(null);
    const [style, setStyle] = useState({});
    const [expandedIdx, setExpandedIdx] = useState(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg
        const rotateY = ((x - centerX) / centerX) * 15;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'none',
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: `perspective(1000px) rotateX(0deg) rotateY(0deg)`,
            transition: 'transform 0.5s ease',
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass-panel"
            style={{
                ...style,
                padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 2rem)',
                border: `1px solid ${color}`,
                boxShadow: `0 0 20px ${color}33`, // 33 is ~20% opacity hex
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'visible'
            }}
        >
            {/* Glow backing */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100px',
                height: '100px',
                background: color,
                filter: 'blur(80px)',
                opacity: 0.3,
                zIndex: -1,
                pointerEvents: 'none'
            }} />

            <div style={{ padding: '1.5rem', background: 'var(--bg-color)', borderRadius: '50%', border: `2px solid ${color}`, boxShadow: `0 0 15px ${color}` }}>
                <Icon size={40} color={color} />
            </div>

            <h3 style={{ fontSize: '1.8rem', color: color, textShadow: `0 0 10px ${color}`, textAlign: 'center', margin: '1rem 0' }}>
                {title}
            </h3>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                {items.map((item, idx) => {
                    const isExpanded = expandedIdx === idx;
                    return (
                        <li key={idx} style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = `${color}22`; if (!isExpanded) e.currentTarget.style.transform = 'scale(1.05)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; if (!isExpanded) e.currentTarget.style.transform = 'scale(1)'; }}
                            onClick={(e) => { e.stopPropagation(); setExpandedIdx(isExpanded ? null : idx); }}
                        >
                            <div style={{ fontWeight: isExpanded ? 'bold' : 'normal', color: isExpanded ? color : 'inherit', transition: 'color 0.3s ease' }}>
                                {item.name || item}
                            </div>
                            {isExpanded && item.details && (
                                <div style={{
                                    marginTop: '0.8rem',
                                    fontSize: '0.9rem',
                                    color: 'rgba(255,255,255,0.9)',
                                    lineHeight: '1.4',
                                    padding: '0.5rem',
                                    borderTop: `1px solid ${color}44`,
                                    animation: 'fadeIn 0.3s ease'
                                }}>
                                    {item.details}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

const Events = () => {
    return (
        <section style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 2rem)', maxWidth: '1400px', margin: '0 auto' }}>
            <h2 className="section-title text-cyan" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', textShadow: '0 0 20px rgba(0, 245, 255, 0.5)' }}>EXPLORE EVENTS</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 100%, 300px), 1fr))', gap: 'clamp(1.5rem, 4vw, 3rem)', padding: 'clamp(1rem, 4vw, 2rem) 0' }}>
                <EventCard
                    title="Technical Events"
                    icon={Cpu}
                    color="#00F5FF"
                    items={[
                        {
                            name: "Paper Presentation",
                            details: (
                                <ul style={{ textAlign: 'left', paddingLeft: '1.2rem', margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <li><strong>Topic:</strong> Any Trending Technical topics</li>
                                    <li><strong>Format:</strong> Paper should be clear and well-structured</li>
                                    <li><strong>Team:</strong> Max 4 members per team</li>
                                    <li><strong>Time:</strong> 7 mins presentation + 3 mins Q&A</li>
                                    <li><strong>Rule:</strong>Participants must report and present at their 
                                    allotted time without delay. </li>
                                </ul>
                            )
                        },
                        {
                            name: "Project Expo",
                            details: (
                                <ul style={{ textAlign: 'left', paddingLeft: '1.2rem', margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <li><strong>Theme:</strong> Innovation in Electrical & Electronics+IOT&AI</li>
                                    <li><strong>Team:</strong> Max 4 members per project</li>
                                    <li><strong>Setup:</strong> Working models only (Hardware/Software)</li>
                                    <li><strong>Judging:</strong> Based on innovation, implementation, and presentation</li>
                                    <li><strong>Rule:</strong> Bring required power supplies & adapters</li>
                                </ul>
                            )
                        },
                        {
                            name: "Ideathon",
                            details: (
                                <ul style={{ textAlign: 'left', paddingLeft: '1.2rem', margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <li><strong>Focus:</strong> Technical solution + Business viability</li>
                                    <li><strong>Format:</strong> PPT presentation (Max 10 slides)</li>
                                    <li><strong>Team:</strong> Max 4 members</li>
                                    <li><strong>Pitch Time:</strong> 5 mins pitch + 5 mins judge feedback</li>
                                </ul>
                            )
                        },
                        {
                            name: "Electro Hunt",
                            details: (
                                <div style={{ textAlign: 'left', margin: '0.5rem 0' }}>
                                    <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>The event consists of 3 intensive rounds:</p>
                                    <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                        <li><strong>Round 1:</strong> Technical Quiz (MCQs on core EEE concepts)</li>
                                        <li><strong>Round 2:</strong> Component Identification (Identify hardware components physically)</li>
                                        <li><strong>Round 3:</strong> Circuit Connection (Build a working circuit based on a given schematic)</li>
                                    </ul>
                                </div>
                            )
                        }
                    ]}
                />
                <EventCard
                    title="Non-Technical Events"
                    icon={Gamepad2}
                    color="#FFD84D"
                    items={[
                        { name: "Snap Sync", details: "Wait for the suspense! 🤫❓😄" },
                        { name: "Silent Skit", details: "Wait for the suspense! 🤫❓😆" },
                        { name: "Make a Story", details: "Wait for the suspense! 🤫❓" }
                    ]}
                />
                <EventCard
                    title="Workshops"
                    icon={Wrench}
                    color="#E10600"
                    items={[
                        { name: "LabVIEW", details: "Interactive hands-on session on core LabVIEW concepts." },
                        { name: "MATLAB", details: "Learn the fundamentals of MATLAB simulations." }
                    ]}
                />
            </div>
        </section>
    );
};

export default Events;
