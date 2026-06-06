'use client';

import { useEffect, useRef } from 'react';

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Star properties
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      time: number;
      twinkleSpeed: number;
    }> = [];

    const numStars = 70; // Minimalist clean star density
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.3 + 0.4, // Soft elegant sizes
        speedX: (Math.random() - 0.5) * 0.04, // Very slow drift
        speedY: (Math.random() - 0.5) * 0.04,
        time: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.015 + 0.005, // Smooth slow twinkle
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Very high damping (0.015) for smooth, premium delayed response
      mouseX += (targetMouseX - mouseX) * 0.015;
      mouseY += (targetMouseY - mouseY) * 0.015;

      const parallaxX = (mouseX - width / 2) * 0.008;
      const parallaxY = (mouseY - height / 2) * 0.008;

      stars.forEach((star) => {
        let drawX = star.x - parallaxX;
        let drawY = star.y - parallaxY;

        // Keep star wrapping inside boundaries
        if (drawX < 0) drawX = width + (drawX % width);
        if (drawX > width) drawX = drawX % width;
        if (drawY < 0) drawY = height + (drawY % height);
        if (drawY > height) drawY = drawY % height;

        // Smooth sine wave twinkle animation
        star.time += star.twinkleSpeed;
        const currentAlpha = Math.sin(star.time) * 0.12 + 0.22;

        // Star glow (slate grey particles for white background)
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 23, 42, ${Math.max(0.04, currentAlpha)})`;
        ctx.fill();

        // Slow organic drift
        star.x += star.speedX;
        star.y += star.speedY;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-20 bg-transparent"
      style={{ opacity: 0.7 }}
    />
  );
}


