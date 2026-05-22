'use client';

import { SectionTitle } from '@/components/ui/section-title';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { portfolioData } from '@/lib/data';
import { 
  Milestone, 
  Sparkles, 
  Code, 
  Layers, 
  Briefcase, 
  BrainCircuit, 
  Rocket 
} from 'lucide-react';

export function JourneySection() {
  // Map icons to the index of journey checkpoints
  const journeyIcons = [
    Sparkles,      // 2023 - Discovered CS
    Code,          // Early 2024 - OOP & DSA
    Layers,        // Mid 2024 - Full-Stack MERN
    Briefcase,     // Late 2024 - Internships
    BrainCircuit,  // 2025 - TensorFlow & LeetCode
    Rocket,        // Now (2026) - Ready for Roles
  ];

  return (
    <section id="journey" className="container mx-auto scroll-mt-20 px-4 py-20 border-t border-white/[0.02]">
      <SectionTitle icon={Milestone}>How I Got Here</SectionTitle>

      <div className="mx-auto max-w-4xl">
        <div className="relative border-l-2 border-primary/15 pl-6 sm:pl-10 ml-4 sm:ml-6 space-y-12 py-2">
          {portfolioData.journey.map((item, index) => {
            const Icon = journeyIcons[index % journeyIcons.length];
            return (
              <div key={index} className="relative group">
                
                {/* Timeline Pulsing Node */}
                <div className="absolute -left-[37px] sm:-left-[53px] top-1.5 bg-background border border-primary/30 h-7 w-7 rounded-full flex items-center justify-center shadow-lg shadow-black/50 group-hover:border-accent group-hover:scale-110 transition-all duration-300">
                  <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="h-3 w-3 text-accent group-hover:animate-pulse" />
                  </div>
                </div>

                {/* Timeline Card */}
                <div className="grid gap-2 sm:grid-cols-12 items-start">
                  {/* Left Column: Year Badge */}
                  <div className="sm:col-span-2 pt-1.5">
                    <span className="inline-block px-3 py-1 text-xs font-bold font-headline uppercase tracking-wider text-accent bg-accent/5 border border-accent/15 rounded-md shadow-inner shadow-accent/5">
                      {item.year}
                    </span>
                  </div>

                  {/* Right Column: Premium Card Content */}
                  <div className="sm:col-span-10">
                    <SpotlightCard className="border-white/[0.04] p-5 sm:p-6 transition-all duration-300 hover:bg-white/[0.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/[0.02]">
                      <div className="flex flex-col space-y-2">
                        <h4 className="font-headline text-lg font-black text-foreground group-hover:text-accent transition-colors duration-200">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </SpotlightCard>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
