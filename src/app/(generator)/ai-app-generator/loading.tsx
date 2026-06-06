import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-[#07070a] text-foreground">
      {/* Sidebar Mock/Skeleton */}
      <aside className="hidden md:flex flex-col w-20 lg:w-64 h-screen sticky top-0 border-r border-border/20 bg-card/10 backdrop-blur-xl p-6 gap-8">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-primary/40 animate-pulse" />
          <div className="h-4 w-20 bg-white/[0.04] rounded-md hidden lg:block" />
        </div>
        <div className="space-y-4 flex-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 w-full bg-white/[0.03] rounded-xl animate-pulse" />
          ))}
        </div>
      </aside>

      {/* Main Panel Skeleton */}
      <main className="flex-1 p-6 md:p-8 lg:p-10 space-y-6 overflow-y-auto pb-24 md:pb-10">
        <header className="flex flex-col gap-2">
          <div className="h-3 w-28 bg-white/[0.03] rounded-md animate-pulse" />
          <div className="h-7 w-56 bg-white/[0.04] rounded-md animate-pulse" />
        </header>

        {/* Warning Indicator Skeleton Space */}
        <div className="h-12 w-full bg-white/[0.02] border border-white/[0.04] rounded-2xl animate-pulse" />

        {/* Bento Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,_auto)]">
          {/* Hero skeleton */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 min-h-[220px] rounded-3xl bg-white/[0.02] border border-white/[0.04] p-8 space-y-6 flex flex-col justify-between animate-pulse">
            <div className="space-y-3">
              <div className="h-3.5 w-24 bg-white/[0.04] rounded-md" />
              <div className="h-7 w-48 bg-white/[0.05] rounded-md" />
              <div className="h-4 w-72 bg-white/[0.03] rounded-md" />
            </div>
            <div className="h-16 w-full bg-white/[0.03] rounded-2xl" />
          </div>

          {/* Activity skeleton */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 min-h-[220px] rounded-3xl bg-white/[0.02] border border-white/[0.04] p-6 flex flex-col justify-between animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-4 w-32 bg-white/[0.04] rounded-md" />
              <div className="h-4 w-12 bg-white/[0.04] rounded-md" />
            </div>
            <div className="h-16 w-full bg-white/[0.03] rounded-xl my-4" />
            <div className="h-4 w-full bg-white/[0.02] rounded-md" />
          </div>

          {/* Course card skeletons */}
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="col-span-1 min-h-[190px] rounded-3xl bg-white/[0.02] border border-white/[0.04] p-6 flex flex-col justify-between animate-pulse">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04]" />
                <div className="h-4 w-12 bg-white/[0.04] rounded-md" />
              </div>
              <div className="h-4 w-3/4 bg-white/[0.04] rounded-md mt-4" />
              <div className="space-y-2 mt-6">
                <div className="flex justify-between h-3 w-16 bg-white/[0.03] rounded-md" />
                <div className="h-2 w-full bg-white/[0.03] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
