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

        // Generates a jagged path
        const createBolt = (startX, startY, endX, endY, maxBranches, branchProb) => {
            const path = [{ x: startX, y: startY }];
            let currX = startX;
            let currY = startY;

            while (currY < endY) {
                // sharper, more erratic lateral movements (more realistic thunder)
                currX += (Math.random() - 0.5) * 80;
                currY += Math.random() * 25 + 5; // shorter drops make it look more jagged

                path.push({ x: currX, y: currY });

                // Create aggressive sub-branches
                if (maxBranches > 0 && Math.random() < branchProb) {
                    const bEndX = currX + (Math.random() - 0.5) * 300;
                    const bEndY = currY + Math.random() * 300 + 100;
                    lightningBolts.push({
                        path: createPath(currX, currY, bEndX, bEndY),
                        thickness: Math.random() * 1.5 + 0.5,
                        alpha: 1,
                        flashIntensity: 0
                    });
                    maxBranches--;
                }
            }
            return path;
        };

        // Helper path generator for branches
        const createPath = (sx, sy, ex, ey) => {
            const p = [{ x: sx, y: sy }];
            let cx = sx; let cy = sy;
            while (cy < ey) {
                cx += (Math.random() - 0.5) * 60;
                cy += Math.random() * 20 + 5;
                p.push({ x: cx, y: cy });
            }
            return p;
        }

        const triggerThunder = () => {
            // Occasionally create multiple simultaneous strikes for realism
            const strikes = Math.random() > 0.8 ? 2 : 1;

            for (let k = 0; k < strikes; k++) {
                const startX = Math.random() * canvas.width;
                lightningBolts.push({
                    path: createBolt(startX, 0, startX + (Math.random() - 0.5) * 400, canvas.height, 6, 0.4),
                    thickness: Math.random() * 2 + 2,
                    alpha: 1.2, // Over-alpha for harder initial strike
                    flashIntensity: 0.8 // Screen flash
                });
            }
        };

        // Render loop
        const drawLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Trigger a thunder strike
            if (Math.random() < 0.003) {
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

                // Aggressive, tight outer cyan glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#00F5FF';
                ctx.strokeStyle = `rgba(0, 245, 255, ${bolt.alpha})`;
                ctx.lineWidth = bolt.thickness + 2;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'miter';
                ctx.stroke();

                // Blinding Inner bright white core
                ctx.shadowBlur = 5;
                ctx.shadowColor = '#FFFFFF';
                ctx.strokeStyle = `rgba(255, 255, 255, ${bolt.alpha * 1.5})`; // Core stays brighter longer
                ctx.lineWidth = bolt.thickness * 0.5;
                ctx.stroke();

                // Non-linear fade out (lightning flashes fast, lingers slightly)
                bolt.alpha -= 0.08;
                bolt.flashIntensity -= 0.15;
            }

            // Draw full screen flash if intense, capped so it doesn't wash out completely
            if (maxFlash > 0) {
                ctx.fillStyle = `rgba(200, 245, 255, ${Math.min(maxFlash * 0.15, 0.4)})`;
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
