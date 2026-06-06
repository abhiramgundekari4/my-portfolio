'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Course } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
}

const getIcon = (name: string) => {
  const IconComponent = (LucideIcons as any)[name];
  if (IconComponent) return IconComponent;
  return LucideIcons.BookOpen;
};

export function CourseCard({ course }: CourseCardProps) {
  const Icon = getIcon(course.icon_name);

  const idHash = course.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const meshColors = [
    'from-emerald-500/10 to-teal-500/5',
    'from-blue-500/10 to-indigo-500/5',
    'from-violet-500/10 to-purple-500/5',
    'from-amber-500/10 to-rose-500/5',
  ];
  const selectedMesh = meshColors[idHash % meshColors.length];

  return (
    <motion.article
      whileHover={{ 
        scale: 1.015,
        y: -4,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className="group relative flex flex-col justify-between p-6 rounded-3xl glass-card glass-card-hover overflow-hidden cursor-pointer"
    >
      <div className={cn(
        "absolute -right-10 -bottom-10 w-36 h-36 bg-gradient-to-br -z-10 transition-all duration-300 opacity-20 blur-2xl group-hover:scale-125 group-hover:opacity-40",
        idHash % 4 === 0 ? 'from-emerald-500 to-teal-500' :
        idHash % 4 === 1 ? 'from-blue-500 to-indigo-500' :
        idHash % 4 === 2 ? 'from-violet-500 to-purple-500' :
        'from-amber-500 to-rose-500'
      )} />
      
      <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_10px_10px,rgba(255,255,255,0.01)_1px,transparent_0)] [background-size:12px_12px] -z-10" />

      <div className="absolute inset-0 border border-white/[0.03] group-hover:border-primary/20 rounded-3xl transition-colors duration-300 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-primary group-hover:text-foreground transition-colors duration-200">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-[10px] text-muted-foreground bg-white/[0.02] border border-white/[0.04] px-2 py-1 rounded-md font-semibold uppercase tracking-wider">
            Active
          </span>
        </div>

        <h3 className="font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {course.title}
        </h3>
      </div>

      <div className="relative z-10 mt-6 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground">{course.progress}%</span>
        </div>

        <div className="h-2 w-full bg-white/[0.04] border border-white/[0.02] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ 
              type: "spring", 
              stiffness: 80, 
              damping: 15,
              delay: 0.1
            }}
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          />
        </div>
      </div>
    </motion.article>
  );
}
