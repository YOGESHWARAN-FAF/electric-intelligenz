import React from 'react';

const OrganizingCommittee = () => {
    return (
        <section style={{ padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 2rem)', display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '900px',
                padding: 'clamp(1.5rem, 5vw, 3rem)',
                border: '1px solid rgba(0, 245, 255, 0.3)',
            }}>
                <h3 className="section-title" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)', textAlign: 'center', color: 'var(--glow-cyan)' }}>Organizing Committee</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 100%, 300px), 1fr))', gap: 'clamp(1.5rem, 4vw, 2rem)' }}>

                    {/* ... (Coordinators) ... */}
                    {/* 3rd Year Coordinators */}
                    <div style={{ background: 'rgba(11, 15, 43, 0.6)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(255, 216, 77, 0.2)' }}>
                        <h4 className="text-yellow" style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255, 216, 77, 0.3)', paddingBottom: '0.5rem' }}>3rd Year Coordinators</h4>
                        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
                            <li style={{ display: 'flex', flexDirection: 'column', marginBottom: '0.8rem' }}>
                                <span style={{ fontWeight: 'bold' }}>1. DJ JENITHDIWAKAR</span>
                                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}><span style={{ color: 'var(--glow-cyan)' }}>✆</span> 98945 22867</span>
                            </li>
                            <li style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 'bold' }}>2. S PRASANTH</span>
                                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}><span style={{ color: 'var(--glow-cyan)' }}>✆</span> 72006 08333</span>
                            </li>
                        </ul>
                    </div>

                    {/* 2nd Year Coordinators */}
                    <div style={{ background: 'rgba(11, 15, 43, 0.6)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(0, 245, 255, 0.2)' }}>
                        <h4 className="text-cyan" style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(0, 245, 255, 0.3)', paddingBottom: '0.5rem' }}>2nd Year Coordinators</h4>
                        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
                            <li style={{ fontWeight: 'bold', marginBottom: '0.8rem' }}>1. MR DHILIPAN</li>
                            <li style={{ fontWeight: 'bold' }}>2. B KAVIN</li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OrganizingCommittee;
