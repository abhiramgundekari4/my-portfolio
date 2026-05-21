'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Send, Github, Linkedin, User, Sparkles, Terminal, Database } from 'lucide-react';
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
    <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden py-16 md:py-28 grid-bg">
      {/* Aurora light effects */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-accent/10 blur-[120px] animate-pulse [animation-delay:3s]" />

      <div className="container mx-auto px-4 z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          
          {/* Hero text */}
          <div className="space-y-8 text-center lg:text-left lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary backdrop-blur-md animate-fade-in">
              <Sparkles className="h-4 w-4 text-accent animate-spin-slow" />
              <span>Open to Opportunities</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                Hi there, I&apos;m{' '}
                <span className="block mt-2 font-black bg-gradient-to-r from-accent via-indigo-400 to-primary bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(185,95,48,0.15)]">
                  {name}
                </span>
              </h1>
              
              <p className="font-headline text-lg sm:text-xl md:text-2xl font-medium text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                {title}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105 duration-200">
                <a href="https://drive.google.com/file/d/1_Waja-JeaBK5fswLjX-KFrjeb1xSXH1m/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-5 w-5" />
                  See My Resume
                </a>
              </Button>
              
              <Button asChild size="lg" variant="secondary" className="border border-white/[0.05] bg-secondary/80 hover:bg-secondary transition-all hover:scale-105 duration-200">
                <Link href="#contact">
                  <Send className="mr-2 h-5 w-5 text-accent" />
                  Contact Me
                </Link>
              </Button>
            </div>

            <div className="flex justify-center lg:justify-start items-center gap-3 pt-2">
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mr-2">Connect</span>
              
              <Button asChild variant="outline" size="icon" className="h-10 w-10 rounded-full border-white/[0.08] hover:border-primary/45 hover:text-primary transition-all duration-300 hover:scale-110">
                <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              
              <Button asChild variant="outline" size="icon" className="h-10 w-10 rounded-full border-white/[0.08] hover:border-primary/45 hover:text-primary transition-all duration-300 hover:scale-110">
                <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>

              {portfolioData.socials.leetcode && (
                <Button asChild variant="outline" size="icon" className="h-10 w-10 rounded-full border-white/[0.08] hover:border-primary/45 hover:text-primary transition-all duration-300 hover:scale-110">
                  <a href={portfolioData.socials.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                    <Icons.leetcode className="h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Hero Profile Photo Container */}
          <div className="relative mx-auto lg:col-span-5 flex items-center justify-center pt-8 lg:pt-0">
            
            {/* Double spinning glowing orbits */}
            <div className="absolute inset-0 max-h-[380px] max-w-[380px] sm:max-h-[420px] sm:max-w-[420px] rounded-full border border-dashed border-accent/20 animate-spin-slow" />
            <div className="absolute -inset-4 max-h-[412px] max-w-[412px] sm:max-h-[452px] sm:max-w-[452px] rounded-full border border-dashed border-primary/15 animate-reverse-spin-slow" />
            
            {/* Profile Avatar Frame */}
            <div className="relative group cursor-pointer h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96 transition-transform duration-500 hover:scale-105">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent via-indigo-500 to-primary opacity-60 blur-lg group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-background bg-secondary shadow-2xl flex items-center justify-center">
                {mounted && !imageError ? (
                  <Image
                    src="/profile.jpg?v=5"
                    alt={name}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground/40">
                    <User className="h-24 w-24 mb-2 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Engineering Portal</span>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Tech Badges */}
            <div className="absolute top-12 left-4 bg-background/90 border border-primary/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg shadow-black/35 animate-float">
              <Terminal className="h-3.5 w-3.5 text-accent" />
              <span>Python & C</span>
            </div>
            
            <div className="absolute bottom-16 right-4 bg-background/90 border border-accent/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg shadow-black/35 animate-float [animation-delay:2s]">
              <Database className="h-3.5 w-3.5 text-primary" />
              <span>SQL Queries</span>
            </div>
            
            <div className="absolute bottom-6 left-8 bg-background/90 border border-indigo-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg shadow-black/35 animate-float [animation-delay:4s]">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>DSA / LeetCode</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

