'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Send, Github, Linkedin, User, Briefcase, Code, Sparkles } from 'lucide-react';
import { Icons } from '@/components/icons';
import { portfolioData } from '@/lib/data';

type HeroSectionProps = {
  name: string;
  title: string;
};

export function HeroSection({ name, title }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="home" className="relative min-h-[75vh] flex items-center overflow-hidden py-16 md:py-24 border-b border-slate-100">
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Hero text */}
          <div className="space-y-3 flex flex-col items-center">
            <span className="font-mono text-xs tracking-widest text-slate-400 font-bold uppercase select-none">
              [00 // INTRO]
            </span>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Opportunities</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl uppercase">
              <span className="block mt-1 font-serif italic normal-case text-slate-950 font-semibold">
                {name}
              </span>
            </h1>

            
            <p className="font-headline text-lg sm:text-xl md:text-2xl font-normal text-slate-600">
              {title}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Focused on crafting clean, high-performance software systems. Experienced in writing efficient scripts in Python, relational query modeling, and designing full-stack web applications.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center pt-2">
            <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800 transition-colors">
              <a href="https://drive.google.com/file/d/1rR5YQibv9Kl8DLhFTy_SUxPWB7l6POqJ/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                View Resume
              </a>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-slate-200 hover:bg-slate-50 transition-colors">
              <Link href="#contact">
                <Send className="mr-2 h-4 w-4 text-slate-600" />
                Get in Touch
              </Link>
            </Button>
          </div>

          <div className="flex justify-center items-center gap-3 pt-6 border-t border-slate-100 max-w-xs mx-auto">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mr-1">Find Me On</span>
            
            <Button asChild variant="outline" size="icon" className="h-9 w-9 rounded-md border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-4.5 w-4.5" />
              </a>
            </Button>
            
            <Button asChild variant="outline" size="icon" className="h-9 w-9 rounded-md border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-4.5 w-4.5" />
              </a>
            </Button>

            {portfolioData.socials.leetcode && (
              <Button asChild variant="outline" size="icon" className="h-9 w-9 rounded-md border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                <a href={portfolioData.socials.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                  <Icons.leetcode className="h-4.5 w-4.5" />
                </a>
              </Button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}


