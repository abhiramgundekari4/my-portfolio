'use client';

import React from 'react';
import { ComponentProps } from '@/lib/types';
import { cn } from '@/lib/utils';

interface LayoutSectionProps {
  id: string;
  props: ComponentProps;
  children?: React.ReactNode;
}

export function LayoutSection({ id, props, children }: LayoutSectionProps) {
  const { columns = 1, gap = 'md' } = props;

  const getGridColsClass = (cols: number) => {
    if (cols === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    if (cols === 2) return 'grid-cols-1 lg:grid-cols-2';
    return 'grid-cols-1';
  };

  const getGapClass = (g: string) => {
    if (g === 'lg') return 'gap-6';
    if (g === 'sm') return 'gap-3';
    return 'gap-4';
  };

  return (
    <section 
      id={id} 
      className={cn(
        "grid w-full",
        getGridColsClass(columns),
        getGapClass(gap)
      )}
    >
      {children}
    </section>
  );
}
