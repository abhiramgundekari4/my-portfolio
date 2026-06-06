'use client';

import React, { useState } from 'react';
import { Flame, Sparkles, Trophy, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const DAYS_OF_WEEK = [
  { label: 'M', name: 'Mon', completed: true },
  { label: 'T', name: 'Tue', completed: true },
  { label: 'W', name: 'Wed', completed: true },
  { label: 'T', name: 'Thu', completed: false },
  { label: 'F', name: 'Fri', completed: false },
  { label: 'S', name: 'Sat', completed: false },
  { label: 'S', name: 'Sun', completed: false },
];

export function HeroTile() {
  const [streak, setStreak] = useState(3);
  const [days, setDays] = useState(DAYS_OF_WEEK);

  const toggleDay = (index: number) => {
    const updated = [...days];
    updated[index].completed = !updated[index].completed;
    setDays(updated);
    
    let count = 0;
    for (let i = 0; i < updated.length; i++) {
      if (updated[i].completed) {
        count++;
      } else {
        break;
      }
    }
    setStreak(count);
  };

  return (
    <div className="flex flex-col justify-between h-full p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-card/45 via-card/20 to-primary/10 border border-border/40 relative overflow-hidden group">
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-500" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-primary uppercase mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Next-Gen Platform</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
          Welcome back, <span className="gradient-text font-extrabold">Abhiram</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-md font-medium leading-relaxed">
          Ready to level up your engineering skills today? Your personalized courses are up-to-date and synced live.
        </p>
      </div>

      <div className="relative z-10 mt-6 lg:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white/[0.02] border border-white/[0.04] p-4 lg:p-5 rounded-2xl backdrop-blur-md">
        
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3] 
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute w-12 h-12 bg-orange-500/20 rounded-full blur-md"
            />
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Flame className="h-6 w-6 text-white fill-white/10" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground tracking-tight">{streak}</span>
              <span className="text-xs text-muted-foreground font-semibold">day streak</span>
            </div>
            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1 mt-0.5">
              <Trophy className="h-3 w-3 text-amber-400" /> Keep it going!
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Weekly Progress
          </span>
          <div className="flex items-center gap-2">
            {days.map((day, idx) => (
              <button
                key={idx}
                onClick={() => toggleDay(idx)}
                title={`Mark ${day.name}`}
                className={`relative w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all duration-200 border ${
                  day.completed
                    ? 'bg-gradient-to-tr from-primary to-accent border-transparent text-white shadow-md shadow-primary/10'
                    : 'bg-card/40 border-border/40 text-muted-foreground hover:border-muted-foreground/40'
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
