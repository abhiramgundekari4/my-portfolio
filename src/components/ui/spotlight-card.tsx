'use client';

import React from 'react';
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
  spotlightColor,
  borderColor,
  glowSize,
  ...props
}: SpotlightCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 shadow-sm hover:border-slate-300 hover:shadow-md",
        className
      )}
      {...props}
    >
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}

