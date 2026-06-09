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
      {/* Highlight solved concepts directly inside a small key points list */}
      <Card className="border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <span className="text-xs font-bold text-slate-800 font-mono">[Solved Concepts]:</span>
          <div className="flex flex-wrap gap-2">
            {['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Binary Search', 'Trees & Graphs', 'DP & Recursion'].map((tag) => (
              <span key={tag} className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-12 justify-center">
        
        {/* Radial Progress Analytics Card */}
        <Card className="border border-slate-200 bg-white shadow-sm md:col-span-12 overflow-hidden relative">
          <CardContent className="p-6 md:p-8 flex flex-col sm:flex-row items-center gap-8 justify-center">
            
            {/* SVG Circular Progress Ring */}
            <div className="relative h-32 w-32 flex-shrink-0 flex items-center justify-center">
              <svg className="h-full w-full transform -rotate-90">
                {/* Track circle */}
                <circle 
                  cx="64" cy="64" r="50" 
                  className="stroke-slate-100" 
                  strokeWidth="8" fill="transparent" 
                />
                {/* Active progress circle */}
                <circle 
                  cx="64" cy="64" r="50" 
                  className="stroke-slate-800" 
                  strokeWidth="8" 
                  fill="transparent"
                  strokeDasharray="314.16"
                  strokeDashoffset={0}
                  strokeLinecap="round"
                />
              </svg>
              {/* Inner content */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-black tracking-tight text-slate-900">{stats.total}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Solved</span>
              </div>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-lg text-slate-900">
                Problem Solving Metrics
              </h4>
              <p className="text-xs text-slate-555 max-w-md">
                Actively learning & expanding logic by mapping standard data structures and optimizing time/space complexities.
              </p>
            </div>

          </CardContent>
        </Card>

      </div>


      {/* Category distribution bars */}
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Easy */}
        <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-all duration-200">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Easy
            </span>
            <span className="text-slate-550">{stats.easy} <span className="text-[10px] text-slate-400">solved</span></span>
          </div>
          <Progress value={(stats.easy / stats.total) * 100} className="h-1.5 bg-emerald-100" />
        </div>
        
        {/* Medium */}
        <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-all duration-200">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Medium
            </span>
            <span className="text-slate-550">{stats.medium} <span className="text-[10px] text-slate-400">solved</span></span>
          </div>
          <Progress value={(stats.medium / stats.total) * 100} className="h-1.5 bg-amber-100" />
        </div>
        
        {/* Hard */}
        <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-all duration-200">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Hard
            </span>
            <span className="text-slate-550">{stats.hard} <span className="text-[10px] text-slate-400">solved</span></span>
          </div>
          <Progress value={(stats.hard / stats.total) * 100} className="h-1.5 bg-rose-100" />
        </div>
      </div>
    </div>
  );
}

