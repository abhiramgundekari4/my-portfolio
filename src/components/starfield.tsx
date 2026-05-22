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
      alpha: number;
      alphaSpeed: number;
    }> = [];

    const numStars = 130;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.4, // Small star sizes for premium look
        speedX: (Math.random() - 0.5) * 0.05,
        speedY: (Math.random() - 0.5) * 0.05,
        alpha: Math.random(),
        alphaSpeed: (Math.random() * 0.005 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
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

      // Smooth mouse interpolation (easing)
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Soft professional cursor spotlight tracking (indigo-to-cyan glow)
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.08)');  // Indigo base
      gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.04)'); // Cyan highlight
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');           // Fade away
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 300, 0, Math.PI * 2);
      ctx.fill();

      // Subtler parallax ratio (0.015 instead of 0.07) for stable, premium background motion
      const parallaxX = (mouseX - width / 2) * 0.015;
      const parallaxY = (mouseY - height / 2) * 0.015;

      stars.forEach((star) => {
        // Apply parallax offset
        let drawX = star.x - parallaxX;
        let drawY = star.y - parallaxY;

        // Keep star wrapping inside boundaries correctly
        if (drawX < 0) drawX = width + (drawX % width);
        if (drawX > width) drawX = drawX % width;
        if (drawY < 0) drawY = height + (drawY % height);
        if (drawY > height) drawY = drawY % height;

        // Twinkle opacity update
        star.alpha += star.alphaSpeed;
        if (star.alpha <= 0.08 || star.alpha >= 0.92) {
          star.alphaSpeed = -star.alphaSpeed;
        }

        // Active interaction: Brighten stars in close proximity to the cursor
        const dx = drawX - mouseX;
        const dy = drawY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let finalAlpha = star.alpha;
        
        if (dist < 200) {
          const proximityFactor = 1 - (dist / 200);
          finalAlpha = Math.min(0.95, star.alpha + proximityFactor * 0.5);
        }
        
        // Star glow
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(finalAlpha, 0.95))})`;
        ctx.fill();

        // Slow drift
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
      className="fixed inset-0 pointer-events-none -z-20 bg-transparent transition-opacity duration-1000"
      style={{ opacity: 0.8 }}
    />
  );
}
