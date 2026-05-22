'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  borderColor?: string;
  glowSize?: number;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(99, 102, 241, 0.1)', // Indigo hover spotlight
  borderColor = 'rgba(185, 95, 48, 0.35)',    // Electric Cyan hover border
  glowSize = 250,
  ...props
}: SpotlightCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/[0.06] bg-card/45 backdrop-blur-md transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1",
        className
      )}
      style={{
        background: isHovered
          ? `radial-gradient(${glowSize}px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%), rgba(23, 23, 30, 0.45)`
          : undefined,
      }}
      {...props}
    >
      {/* Dynamic Laser-Glowing Border Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, ${borderColor}, transparent 80%)`,
          maskImage: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
          WebkitMaskImage: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      
      {/* Inner Content Wrapper */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
