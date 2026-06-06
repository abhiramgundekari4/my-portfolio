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
        <Card className="border border-slate-200 bg-white shadow-sm md:col-span-7 overflow-hidden relative">
          <CardContent className="p-6 md:p-8 flex flex-col sm:flex-row items-center gap-8">
            
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
                  className="stroke-slate-850 transition-all duration-1000 ease-out" 
                  strokeWidth="8" 
                  fill="transparent"
                  strokeDasharray="314.16"
                  strokeDashoffset={314.16 - (314.16 * totalPercentage) / 100}
                  strokeLinecap="round"
                />
              </svg>
              {/* Inner content */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-black tracking-tight text-slate-900">{stats.total}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Solved</span>
              </div>
            </div>

            <div className="space-y-3.5 flex-1">
              <div>
                <h4 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Target className="h-5 w-5 text-slate-800" />
                  <span>Problem Solving Metrics</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Actively learning & expanding logic by mapping standard data structures and optimizing time/space complexities.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-900" />
                  <span>Target: {targetTotal}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span>Progress: {Math.round(totalPercentage)}%</span>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Global Standing Rank Card (5 Cols) */}
        <Card className="border border-slate-200 bg-white shadow-sm md:col-span-5 flex flex-col justify-between">
          <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-slate-100 border border-slate-200 p-3 text-slate-850">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-450 uppercase tracking-widest">Global Rank</p>
                  <p className="text-2xl font-black text-slate-900 mt-0.5">{stats.rank}</p>
                </div>
              </div>
              <Button asChild variant="outline" size="icon" className="h-9 w-9 rounded-full border-slate-200 hover:bg-slate-50 transition-colors">
                <a href={portfolioData.socials.leetcode} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4.5 w-4.5" />
                </a>
              </Button>
            </div>
            
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-2">
              <Star className="h-4 w-4 text-slate-800 flex-shrink-0" />
              <p className="text-[11px] text-slate-500 leading-normal">
                Continuous practice on HashMaps, Trees, Graphs, Sorting & Two-Pointer patterns.
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

