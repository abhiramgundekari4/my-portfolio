"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trophy, Star, Target } from "lucide-react";
import { portfolioData } from "@/lib/data";

export function LeetCodeStats() {
  const stats = {
    total: 245,
    easy: 120,
    medium: 100,
    hard: 25,
    rank: "Top 15%",
  };

  // Percentage calculations
  const targetTotal = 500;
  const totalPercentage = Math.min((stats.total / targetTotal) * 100, 100);
  const strokeDashoffset = 251.2 - (251.2 * totalPercentage) / 100;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="grid gap-6 md:grid-cols-12">
        
        {/* Radial Progress Analytics Card (7 Cols) */}
        <Card className="glass-card border-white/[0.05] md:col-span-7 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-32 w-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <CardContent className="p-6 md:p-8 flex flex-col sm:flex-row items-center gap-8">
            
            {/* SVG Circular Progress Ring */}
            <div className="relative h-32 w-32 flex-shrink-0 flex items-center justify-center">
              <svg className="h-full w-full transform -rotate-90">
                {/* Track circle */}
                <circle 
                  cx="64" cy="64" r="50" 
                  className="stroke-white/[0.03]" 
                  strokeWidth="8" fill="transparent" 
                />
                {/* Active progress circle */}
                <circle 
                  cx="64" cy="64" r="50" 
                  className="stroke-accent transition-all duration-1000 ease-out" 
                  strokeWidth="8" 
                  fill="transparent"
                  strokeDasharray="314.16"
                  strokeDashoffset={314.16 - (314.16 * totalPercentage) / 100}
                  strokeLinecap="round"
                />
              </svg>
              {/* Inner content */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-black tracking-tight text-foreground">{stats.total}</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Solved</span>
              </div>
            </div>

            <div className="space-y-3.5 flex-1">
              <div>
                <h4 className="font-bold text-lg text-foreground flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  <span>Problem Solving Metrics</span>
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Actively learning & expanding logic by mapping standard data structures and optimizing time/space complexities.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span>Target: {targetTotal}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Progress: {Math.round(totalPercentage)}%</span>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Global Standing Rank Card (5 Cols) */}
        <Card className="glass-card border-white/[0.05] md:col-span-5 flex flex-col justify-between">
          <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-accent/15 border border-accent/25 p-3 text-accent animate-float">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global Rank</p>
                  <p className="text-2xl font-black text-foreground mt-0.5">{stats.rank}</p>
                </div>
              </div>
              <Button asChild variant="outline" size="icon" className="h-9 w-9 rounded-full border-white/[0.08] hover:border-accent/40 hover:text-accent hover:bg-accent/10 transition-all duration-300">
                <a href={portfolioData.socials.leetcode} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4.5 w-4.5" />
                </a>
              </Button>
            </div>
            
            <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg flex items-center gap-2">
              <Star className="h-4 w-4 text-primary flex-shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-normal">
                Continuous practice on HashMaps, Trees, Graphs, Sorting & Two-Pointer patterns.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Category distribution bars */}
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Easy */}
        <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.03] transition-all duration-200">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Easy
            </span>
            <span className="text-muted-foreground">{stats.easy} <span className="text-[10px] text-muted-foreground/50">solved</span></span>
          </div>
          <Progress value={(stats.easy / stats.total) * 100} className="h-1.5 bg-emerald-500/10" />
        </div>
        
        {/* Medium */}
        <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.03] transition-all duration-200">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Medium
            </span>
            <span className="text-muted-foreground">{stats.medium} <span className="text-[10px] text-muted-foreground/50">solved</span></span>
          </div>
          <Progress value={(stats.medium / stats.total) * 100} className="h-1.5 bg-amber-500/10" />
        </div>
        
        {/* Hard */}
        <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.03] transition-all duration-200">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              Hard
            </span>
            <span className="text-muted-foreground">{stats.hard} <span className="text-[10px] text-muted-foreground/50">solved</span></span>
          </div>
          <Progress value={(stats.hard / stats.total) * 100} className="h-1.5 bg-rose-500/10" />
        </div>
      </div>
    </div>
  );
}

