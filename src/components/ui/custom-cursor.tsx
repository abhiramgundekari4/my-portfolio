'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect mobile/touch screens
    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsMobile(touchQuery.matches);
    
    if (touchQuery.matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setIsHidden(false);
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    // Track active clickables for dynamic magnetic/expansion feedback
    const addHoverListeners = () => {
      const clickables = document.querySelectorAll('a, button, [role="button"], .group, input, textarea, select');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Add hover listeners initially and observe DOM adjustments
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Smooth spring physics for outer ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      requestAnimationFrame(render);
    };

    const animFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animFrame);
      observer.disconnect();
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Cyber Central Laser Dot */}
      <div
        ref={dotRef}
        className={cn(
          "pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 h-2 w-2 rounded-full bg-accent transition-opacity duration-300",
          isHidden ? "opacity-0" : "opacity-100"
        )}
      />
      {/* Elastic Glowing Outer Ring */}
      <div
        ref={ringRef}
        className={cn(
          "pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 h-8 w-8 rounded-full border border-primary/45 mix-blend-screen transition-all duration-300 ease-out shadow-[0_0_8px_rgba(99,102,241,0.15)]",
          isHidden ? "opacity-0 scale-50" : "opacity-100",
          isHovered ? "h-12 w-12 border-accent bg-accent/15 scale-110 shadow-[0_0_15px_rgba(185,95,48,0.45)]" : ""
        )}
      />
    </>
  );
}
