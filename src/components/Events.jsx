import React, { useRef, useState } from 'react';
import { Cpu, Gamepad2, Wrench } from 'lucide-react';

const EventCard = ({ title, items, icon: Icon, color }) => {
    const cardRef = useRef(null);
    const [style, setStyle] = useState({});

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
                padding: '3rem 2rem',
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
                {items.map((item, idx) => (
                    <li key={idx} style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border1pxSolid: 'rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = `${color}22`; e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Events = () => {
    return (
        <section style={{ padding: '6rem 2vw', maxWidth: '1400px', margin: '0 auto' }}>
            <h2 className="section-title text-cyan" style={{ fontSize: '3rem', textShadow: '0 0 20px rgba(0, 245, 255, 0.5)' }}>EXPLORE EVENTS</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', padding: '2rem 0' }}>
                <EventCard
                    title="Technical Events"
                    icon={Cpu}
                    color="#00F5FF"
                    items={["Paper Presentation", "Project Expo", "Ideathon", "Electro Hunt"]}
                />
                <EventCard
                    title="Non-Technical Events"
                    icon={Gamepad2}
                    color="#FFD84D"
                    items={["Snap Sync", "Silent Skit", "Make a Story"]}
                />
                <EventCard
                    title="Workshops"
                    icon={Wrench}
                    color="#E10600"
                    items={["LabVIEW", "MATLAB"]}
                />
            </div>
        </section>
    );
};

export default Events;
