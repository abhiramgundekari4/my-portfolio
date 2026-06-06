'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroTile } from './hero-tile';
import { ActivityTile } from './activity-tile';
import { CourseCard } from './course-card';
import { Course } from '@/lib/supabase';

interface BentoGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
} as const;

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 24,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring' as const, 
      stiffness: 100, 
      damping: 16 
    },
  },
} as const;

export function BentoGrid({ courses }: BentoGridProps) {
  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,_auto)]"
    >
      <motion.div 
        variants={itemVariants} 
        className="col-span-1 md:col-span-2 lg:col-span-2 min-h-[220px]"
      >
        <HeroTile />
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="col-span-1 md:col-span-2 lg:col-span-1 min-h-[220px]"
      >
        <ActivityTile />
      </motion.div>

      {courses.map((course) => (
        <motion.div 
          key={course.id} 
          variants={itemVariants}
          className="col-span-1 min-h-[190px] flex"
        >
          <div className="w-full flex">
            <CourseCard course={course} />
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}
