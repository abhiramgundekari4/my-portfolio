'use client';

import React from 'react';
import { ComponentProps } from '@/lib/types';

interface DashboardCardProps {
  id: string;
  props: ComponentProps;
}

export function DashboardCard({ id, props }: DashboardCardProps) {
  const { title, value, metric, trend } = props;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        {title && <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</span>}
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
            trend.direction === 'up' 
              ? 'text-green-700 bg-green-50' 
              : trend.direction === 'down' 
                ? 'text-red-700 bg-red-50' 
                : 'text-gray-600 bg-gray-50'
          }`}>
            {trend.value}
          </span>
        )}
      </div>

      <div className="mt-3">
        {value !== undefined && (
          <p className="text-2xl font-bold text-gray-900 tracking-tight">
            {value}
          </p>
        )}
        {metric && <p className="text-xs text-gray-400 mt-1">{metric}</p>}
      </div>
    </div>
  );
}
