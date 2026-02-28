import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const CursorTrail = () => {
    const canvasRef = useRef(null);
    const [mouse, setMouse] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (event) => {
            setMouse({ x: event.x, y: event.y });
            for (let i = 0; i < 5; i++) {
                particlesArray.push(new Particle());
            }
        });

        class Particle {
            constructor() {
                this.x = mouse.x;
                this.y = mouse.y;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = `rgba(0, 245, 255, ${Math.random() * 0.5 + 0.2})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.1) this.size -= 0.1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function handleParticles() {
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();

                if (particlesArray[i].size <= 0.1) {
                    particlesArray.splice(i, 1);
                    i--;
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            handleParticles();
            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener('resize', () => { });
            window.removeEventListener('mousemove', () => { });
        };
    }, [mouse]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'screen',
            }}
        />
    );
};

export default CursorTrail;
