'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Flame, Calendar, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const generateMockGrid = () => {
  const grid = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  for (let week = 0; week < 14; week++) {
    const weekData = [];
    for (let day = 0; day < 7; day++) {
      const isZero = Math.random() < 0.25;
      const minutes = isZero ? 0 : Math.floor(Math.random() * 160) + 20;
      weekData.push({
        day: days[day],
        weekIndex: week,
        minutes,
      });
    }
    grid.push(weekData);
  }
  return grid;
};

export function ActivityTile() {
  const [gridData] = useState(() => generateMockGrid());
  const [hoveredCell, setHoveredCell] = useState<{ day: string; weekIndex: number; minutes: number } | null>(null);

  const totalMinutes = gridData.flat().reduce((acc, cell) => acc + cell.minutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const activeDays = gridData.flat().filter(cell => cell.minutes > 0).length;

  const getColorClass = (mins: number) => {
    if (mins === 0) return 'bg-white/[0.02] border-white/[0.01]';
    if (mins < 45) return 'bg-primary/20 border-primary/10';
    if (mins < 90) return 'bg-primary/40 border-primary/20';
    if (mins < 135) return 'bg-primary/75 border-primary/30';
    return 'bg-primary border-primary/40 shadow-sm shadow-primary/20';
  };

  return (
    <div className="flex flex-col justify-between h-full p-6 rounded-3xl bg-card/25 border border-border/40 relative overflow-hidden group">
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm tracking-tight">Study Frequency</h3>
            <p className="text-[10px] text-muted-foreground font-medium">Activity matrix last 90 days</p>
          </div>
        </div>
        
        <div className="flex items-baseline gap-1 text-right">
          <span className="text-lg font-bold text-foreground tracking-tight">{totalHours}h</span>
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Total</span>
        </div>
      </div>

      <div className="relative z-10 my-5 overflow-x-auto select-none no-scrollbar flex items-center justify-center py-2">
        <div className="grid gap-1.5 min-w-[320px]" style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}>
          {gridData.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1.5">
              {week.map((cell, dIdx) => (
                <div
                  key={dIdx}
                  onMouseEnter={() => setHoveredCell(cell)}
                  onMouseLeave={() => setHoveredCell(null)}
                  className={cn(
                    "w-[14px] h-[14px] rounded-sm border transition-all duration-150 cursor-pointer relative",
                    getColorClass(cell.minutes),
                    hoveredCell?.weekIndex === wIdx && hoveredCell?.day === cell.day ? "scale-125 z-20 border-white/50" : ""
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 h-10 flex items-center justify-between border-t border-border/20 pt-3">
        <AnimatePresence mode="wait">
          {hoveredCell ? (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="text-xs text-muted-foreground font-medium flex items-center gap-1.5"
            >
              <Calendar className="h-3.5 w-3.5 text-primary" />
              <span>
                {hoveredCell.day}: <strong className="text-foreground">{hoveredCell.minutes} mins</strong> studied
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-4 text-xs font-semibold text-muted-foreground"
            >
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-foreground">{activeDays}</span> active days
              </span>
              <span className="flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-orange-500" />
                avg <span className="text-foreground">{Math.round(totalMinutes / (activeDays || 1))}m</span>/day
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-1 text-[9px] text-muted-foreground font-semibold uppercase tracking-wider">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-white/[0.02] border border-white/[0.01]" />
          <div className="w-2.5 h-2.5 rounded-sm bg-primary/20 border border-primary/10" />
          <div className="w-2.5 h-2.5 rounded-sm bg-primary/50 border border-primary/25" />
          <div className="w-2.5 h-2.5 rounded-sm bg-primary border border-primary/40" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
