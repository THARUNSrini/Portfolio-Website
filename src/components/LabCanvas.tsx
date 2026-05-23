"use client";

import React, { useEffect, useRef, useState } from 'react';

// Pre-render icons to offscreen canvases for performance
const createIconCanvas = (type: string, color: string, size: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    ctx.strokeStyle = color;
    ctx.lineWidth = size * 0.08;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = color;

    ctx.beginPath();

    switch (type) {
        case 'beaker':
            // Beaker shape
            ctx.moveTo(size * 0.3, size * 0.2);
            ctx.lineTo(size * 0.3, size * 0.8);
            ctx.lineTo(size * 0.7, size * 0.8);
            ctx.lineTo(size * 0.7, size * 0.2);
            // Rim
            ctx.moveTo(size * 0.25, size * 0.2);
            ctx.lineTo(size * 0.75, size * 0.2);
            // Liquid line
            ctx.moveTo(size * 0.3, size * 0.6);
            ctx.lineTo(size * 0.7, size * 0.6);
            ctx.stroke();
            break;
        case 'flask':
            // Erlenmeyer flask
            ctx.moveTo(size * 0.4, size * 0.2);
            ctx.lineTo(size * 0.4, size * 0.4);
            ctx.lineTo(size * 0.2, size * 0.8);
            ctx.lineTo(size * 0.8, size * 0.8);
            ctx.lineTo(size * 0.6, size * 0.4);
            ctx.lineTo(size * 0.6, size * 0.2);
            // Rim
            ctx.moveTo(size * 0.35, size * 0.2);
            ctx.lineTo(size * 0.65, size * 0.2);
            ctx.stroke();
            break;
        case 'pipette_tip':
            // Pipette tip
            ctx.moveTo(size * 0.3, size * 0.1);
            ctx.lineTo(size * 0.7, size * 0.1);
            ctx.lineTo(size * 0.6, size * 0.5);
            ctx.lineTo(size * 0.55, size * 0.9);
            ctx.lineTo(size * 0.45, size * 0.9);
            ctx.lineTo(size * 0.4, size * 0.5);
            ctx.closePath();
            ctx.stroke();
            break;
        case 'pcr_plate':
            // 3x3 grid of dots
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    ctx.moveTo(size * 0.3 + i * (size * 0.2), size * 0.3 + j * (size * 0.2));
                    ctx.arc(size * 0.3 + i * (size * 0.2), size * 0.3 + j * (size * 0.2), size * 0.05, 0, Math.PI * 2);
                }
            }
            ctx.fill();
            break;
        case 'dna':
            // Simple sine wave pair
            ctx.moveTo(size * 0.2, size * 0.1);
            ctx.bezierCurveTo(size * 0.8, size * 0.4, size * 0.2, size * 0.6, size * 0.8, size * 0.9);
            ctx.moveTo(size * 0.8, size * 0.1);
            ctx.bezierCurveTo(size * 0.2, size * 0.4, size * 0.8, size * 0.6, size * 0.2, size * 0.9);
            ctx.stroke();
            break;
    }

    return canvas;
};

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    type: string;
    iconCanvas: HTMLCanvasElement;
    phase: number;
    oscillationSpeed: number;

    constructor(width: number, height: number, types: string[], color: string) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = 12 + Math.random() * 16; // 12 to 28px
        this.opacity = 0.04 + Math.random() * 0.08; // 0.04 to 0.12
        this.type = types[Math.floor(Math.random() * types.length)];
        this.iconCanvas = createIconCanvas(this.type, color, this.size);
        this.phase = Math.random() * Math.PI * 2;
        this.oscillationSpeed = 0.01 + Math.random() * 0.02;
    }

    update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy + Math.sin(this.phase) * 0.5; // sine-wave vertical oscillation
        this.phase += this.oscillationSpeed;

        // Wrap around
        if (this.x < -this.size) this.x = width + this.size;
        if (this.x > width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = height + this.size;
        if (this.y > height + this.size) this.y = -this.size;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.iconCanvas, this.x, this.y);
    }
}

export default function LabCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        
        const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', listener);
        return () => mediaQuery.removeEventListener('change', listener);
    }, []);

    useEffect(() => {
        if (prefersReducedMotion || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const numParticles = 70; // 60-80 as requested
        const types = ['beaker', 'flask', 'pipette_tip', 'pcr_plate', 'dna'];
        
        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                // Mix of white and teal (#00e5cc)
                const color = Math.random() > 0.5 ? '#ffffff' : '#00e5cc';
                particles.push(new Particle(canvas.width, canvas.height, types, color));
            }
        };

        const render = () => {
            if (!ctx || !canvas) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update(canvas.width, canvas.height);
                p.draw(ctx);
            });
            
            animationFrameId = requestAnimationFrame(render);
        };

        // Handle visibility change to pause animation when tab is inactive
        const handleVisibilityChange = () => {
            if (document.hidden) {
                cancelAnimationFrame(animationFrameId);
            } else {
                render();
            }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        init();
        render();

        window.addEventListener('resize', handleResize);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [prefersReducedMotion]);

    if (prefersReducedMotion) return null;

    return (
        <canvas
            ref={canvasRef}
            id="lab-canvas"
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ zIndex: 0 }}
        />
    );
}
