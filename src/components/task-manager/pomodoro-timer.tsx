'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, RotateCcw, Flame, CheckCircle2 } from 'lucide-react';
import type { Task } from './types';

interface PomodoroTimerProps {
  tasks: Task[];
  onAccumulateTime: (taskId: string, seconds: number) => void;
}

type TimerMode = 'work' | 'short' | 'long';

const MODE_CONFIGS = {
  work: { label: 'Work Focus', duration: 25 * 60, color: 'text-rose-400 stroke-rose-500' },
  short: { label: 'Short Break', duration: 5 * 60, color: 'text-cyan-400 stroke-cyan-400' },
  long: { label: 'Long Break', duration: 15 * 60, color: 'text-indigo-400 stroke-indigo-400' },
};

export function PomodoroTimer({ tasks, onAccumulateTime }: PomodoroTimerProps) {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(MODE_CONFIGS.work.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const accumulatedSecondsRef = useRef(0);

  // Filter tasks to only show Active/To Do tasks to link to
  const activeTasks = tasks.filter((t) => t.status !== 'completed');

  useEffect(() => {
    setTimeLeft(MODE_CONFIGS[mode].duration);
    setIsRunning(false);
    accumulatedSecondsRef.current = 0;
  }, [mode]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const playChime = (chimeType: 'work_done' | 'break_done') => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (chimeType === 'work_done') {
        // Uplifting arpeggio chime for focus completed
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
          
          gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.12);
          gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + idx * 0.12 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.6);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(ctx.currentTime + idx * 0.12);
          osc.stop(ctx.currentTime + idx * 0.12 + 0.6);
        });
      } else {
        // Soft double chime for break completed
        const notes = [587.33, 440.00]; // D5, A4
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.2);
          
          gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.2);
          gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.2 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.2 + 0.8);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(ctx.currentTime + idx * 0.2);
          osc.stop(ctx.currentTime + idx * 0.2 + 0.8);
        });
      }
    } catch (err) {
      console.warn('AudioContext chime blocked by browser autoplay policy', err);
    }
  };

  const handleStartStop = () => {
    if (isRunning) {
      // Pause
      setIsRunning(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      // Save accumulated focus time to selected task
      if (selectedTaskId && accumulatedSecondsRef.current > 0) {
        onAccumulateTime(selectedTaskId, accumulatedSecondsRef.current);
        accumulatedSecondsRef.current = 0;
      }
    } else {
      // Start
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer Finished!
            setIsRunning(false);
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }

            // Sync remaining time
            if (selectedTaskId && accumulatedSecondsRef.current > 0) {
              onAccumulateTime(selectedTaskId, accumulatedSecondsRef.current + 1);
            }

            // Play Chime sound programmatically
            if (mode === 'work') {
              playChime('work_done');
              setMode('short'); // Transition to break
            } else {
              playChime('break_done');
              setMode('work'); // Transition to focus
            }

            return 0;
          }

          // Accumulate seconds if mode is work and task is attached
          if (mode === 'work' && selectedTaskId) {
            accumulatedSecondsRef.current += 1;
            // Proactively save to store every 30s to prevent data loss on tab close
            if (accumulatedSecondsRef.current % 30 === 0) {
              onAccumulateTime(selectedTaskId, 30);
              accumulatedSecondsRef.current = 0;
            }
          }

          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    // Save any pending focus time
    if (selectedTaskId && accumulatedSecondsRef.current > 0) {
      onAccumulateTime(selectedTaskId, accumulatedSecondsRef.current);
    }
    accumulatedSecondsRef.current = 0;
    setTimeLeft(MODE_CONFIGS[mode].duration);
  };

  const handleSkip = () => {
    handleReset();
    if (mode === 'work') {
      setMode('short');
    } else if (mode === 'short') {
      setMode('long');
    } else {
      setMode('work');
    }
  };

  const formatMinutesSeconds = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentConfig = MODE_CONFIGS[mode];
  const progressRatio = timeLeft / currentConfig.duration;
  const strokeCircumference = 2 * Math.PI * 90; // radius = 90
  const strokeDashoffset = strokeCircumference * (1 - progressRatio);

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Mode Switch Tabs */}
      <div className="flex bg-white/[0.03] p-1 rounded-xl border border-white/[0.06] backdrop-blur-sm">
        {(['work', 'short', 'long'] as TimerMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
              mode === m
                ? m === 'work'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                  : m === 'short'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.01]'
            }`}
          >
            {m === 'work' ? 'Focus' : m === 'short' ? 'Short Break' : 'Long Break'}
          </button>
        ))}
      </div>

      {/* Main Timer Display */}
      <Card className="glass-card border-white/[0.05] p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[380px]">
        {/* Glow behind */}
        <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl opacity-20 pointer-events-none transition-all ${
          mode === 'work' ? 'bg-rose-500' : mode === 'short' ? 'bg-cyan-500' : 'bg-indigo-500'
        }`} />

        <div className="relative h-56 w-56 flex items-center justify-center">
          <svg className="h-full w-full transform -rotate-90">
            {/* Track Ring */}
            <circle
              cx="112"
              cy="112"
              r="90"
              className="stroke-white/[0.03]"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Active countdown progress ring */}
            <circle
              cx="112"
              cy="112"
              r="90"
              className={`transition-all duration-300 ${currentConfig.color}`}
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={strokeCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Time text inner overlay */}
          <div className="absolute flex flex-col items-center justify-center space-y-1">
            <span className="text-4xl font-black tracking-tight text-foreground font-code">
              {formatMinutesSeconds(timeLeft)}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-1">
              <Flame className={`h-3 w-3 ${isRunning ? 'animate-pulse text-amber-500' : ''}`} />
              {currentConfig.label}
            </span>
          </div>
        </div>

        {/* Timer Operations Control Action Panel */}
        <div className="flex items-center gap-4 mt-8 z-10 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            className="h-10 w-10 rounded-full border border-white/[0.06] hover:bg-white/[0.04] text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button
            onClick={handleStartStop}
            className={`h-14 w-14 rounded-full text-foreground font-bold shadow-lg shadow-black/20 hover:scale-105 active:scale-95 transition-all ${
              isRunning ? 'bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.06]' : 'bg-primary hover:bg-primary/95 text-foreground'
            }`}
          >
            {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 fill-current ml-0.5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkip}
            className="h-10 w-10 rounded-full border border-white/[0.06] hover:bg-white/[0.04] text-muted-foreground hover:text-foreground"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Task association panel */}
      {mode === 'work' && (
        <Card className="glass-card border-white/[0.05] p-4">
          <CardContent className="p-0 space-y-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <span>🎯 Associate Active Task</span>
            </label>
            
            <select
              value={selectedTaskId}
              onChange={(e) => setSelectedTaskId(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-sm text-foreground outline-none cursor-pointer"
            >
              <option value="" className="bg-card text-muted-foreground">Select task to log focus hours...</option>
              {activeTasks.map((t) => (
                <option key={t.id} value={t.id} className="bg-card text-foreground">
                  [{t.category}] {t.title}
                </option>
              ))}
            </select>

            {selectedTask && (
              <div className="p-2.5 rounded bg-primary/5 border border-primary/10 flex items-center gap-2 text-xs font-medium text-foreground transition-all">
                <CheckCircle2 className="h-4 w-4 text-accent animate-pulse shrink-0" />
                <span className="truncate">
                  Currently logging study sessions to <strong>{selectedTask.title}</strong> (Total spent: {Math.round(selectedTask.timeSpent / 60)}m).
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
