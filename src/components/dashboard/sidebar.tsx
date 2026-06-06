'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Settings, 
  User,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'My Courses', icon: BookOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <>
      <aside className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 border-r border-border/40 bg-card/30 backdrop-blur-xl transition-all duration-300 z-30",
        "lg:w-64 md:w-20"
      )}>
        <div className="h-20 flex items-center px-6 border-b border-border/40 gap-3">
          <GraduationCap className="h-8 w-8 text-primary animate-pulse" />
          <span className="font-semibold text-lg tracking-wider hidden lg:block gradient-text">
            NEXUS
          </span>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-sm transition-colors duration-200 outline-none",
                  isActive ? "text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-primary/95 rounded-xl shadow-lg shadow-primary/20 z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                <Icon className={cn("h-5 w-5 relative z-10", isActive ? "text-white" : "text-muted-foreground")} />
                <span className="relative z-10 hidden lg:block">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-border/40 hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-sm text-white shadow-md shadow-primary/10">
              AG
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">Abhiram G.</span>
              <span className="text-xs text-muted-foreground font-medium">Student Intern</span>
            </div>
          </div>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-t border-border/40 px-6 flex items-center justify-around z-40 pb-safe shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative p-3 flex flex-col items-center justify-center rounded-xl"
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicatorMobile"
                  className="absolute inset-0 bg-primary/10 rounded-xl z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <Icon className={cn("h-5 w-5 relative z-10", isActive ? "text-primary" : "text-muted-foreground")} />
            </button>
          );
        })}
      </nav>
    </>
  );
}
