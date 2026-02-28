import React, { useEffect, useRef } from 'react';

const RealisticLightning = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Resize canvas to full screen
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        let lightningBolts = [];

        // Generates a jagged path between a start and an end
        const createBolt = (startX, startY, endX, endY, thickness, branchProb) => {
            const path = [{ x: startX, y: startY }];
            let currX = startX;
            let currY = startY;

            while (currY < endY) {
                // Move mostly down, randomly left/right
                currX += (Math.random() - 0.5) * 60;
                currY += Math.random() * 40 + 10;

                path.push({ x: currX, y: currY });

                // Create a sub-branch
                if (Math.random() < branchProb) {
                    const bEndX = currX + (Math.random() - 0.5) * 200;
                    const bEndY = currY + Math.random() * 200 + 50;
                    lightningBolts.push({
                        path: createPath(currX, currY, bEndX, bEndY),
                        thickness: thickness * 0.6,
                        alpha: 1,
                        flashIntensity: 0
                    });
                }
            }
            return path;
        };

        const createPath = (sx, sy, ex, ey) => {
            const p = [{ x: sx, y: sy }];
            let cx = sx; let cy = sy;
            while (cy < ey) {
                cx += (Math.random() - 0.5) * 40;
                cy += Math.random() * 30 + 10;
                p.push({ x: cx, y: cy });
            }
            return p;
        }

        const triggerThunder = () => {
            lightningBolts = [];
            const startX = Math.random() * canvas.width;

            // Main bolt
            lightningBolts.push({
                path: createBolt(startX, 0, startX + (Math.random() - 0.5) * 300, canvas.height, 4, 0.2),
                thickness: 4,
                alpha: 1,
                flashIntensity: 1 // screen flash
            });
        };

        // Render loop
        const drawLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen completely

            // Randomly trigger a thunder strike
            if (Math.random() < 0.005) { // 0.5% chance per frame (every few seconds roughly)
                triggerThunder();
            }

            let maxFlash = 0;

            for (let i = lightningBolts.length - 1; i >= 0; i--) {
                const bolt = lightningBolts[i];

                if (bolt.alpha <= 0) {
                    lightningBolts.splice(i, 1);
                    continue;
                }

                if (bolt.flashIntensity > maxFlash) maxFlash = bolt.flashIntensity;

                ctx.beginPath();
                ctx.moveTo(bolt.path[0].x, bolt.path[0].y);
                for (let j = 1; j < bolt.path.length; j++) {
                    ctx.lineTo(bolt.path[j].x, bolt.path[j].y);
                }

                // Outer cyan glow
                ctx.shadowBlur = 30;
                ctx.shadowColor = '#00F5FF';
                ctx.strokeStyle = `rgba(100, 245, 255, ${bolt.alpha})`;
                ctx.lineWidth = bolt.thickness + 4;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'miter';
                ctx.stroke();

                // Inner bright white core
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#FFFFFF';
                ctx.strokeStyle = `rgba(255, 255, 255, ${bolt.alpha})`;
                ctx.lineWidth = bolt.thickness;
                ctx.stroke();

                // Fade out lightning
                bolt.alpha -= 0.05; // Fade over ~20 frames
                bolt.flashIntensity -= 0.1;
            }

            // Draw full screen flash if intense
            if (maxFlash > 0) {
                ctx.fillStyle = `rgba(255, 255, 255, ${maxFlash * 0.3})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            animationFrameId = requestAnimationFrame(drawLoop);
        };

        drawLoop();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
                mixBlendMode: 'screen'
            }}
        />
    );
};

export default RealisticLightning;
