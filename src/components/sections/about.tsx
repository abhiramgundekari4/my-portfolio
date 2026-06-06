import { SectionTitle } from '@/components/ui/section-title';
import { CardContent } from '@/components/ui/card';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { portfolioData } from '@/lib/data';
import { UserCircle, Shield, BrainCircuit, Terminal, Briefcase } from 'lucide-react';

export function AboutSection() {
  const pillars = [
    {
      icon: BrainCircuit,
      title: 'Problem Solver',
      desc: 'Active DSA explorer with 240+ resolved puzzles on LeetCode.',
    },
    {
      icon: Terminal,
      title: 'Backend & Data',
      desc: 'Skilled in writing clean object-oriented Python scripts and C.',
    },
    {
      icon: Shield,
      title: 'Database Systems',
      desc: 'Proficient in structured queries, relational design, and management.',
    },
    {
      icon: Briefcase,
      title: 'Industry Ready',
      desc: 'Dual corporate virtual internships completed focusing on tech development.',
    },
  ];

  return (
    <section id="about" className="container mx-auto scroll-mt-20 px-4 py-16">
      <SectionTitle number="01">About Me</SectionTitle>
      <div className="mx-auto max-w-5xl">
        <SpotlightCard className="border-slate-200/80 p-0 shadow-sm bg-white">
          <CardContent className="p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-12 items-center">
              
              {/* Left Column: Summary */}
              <div className="md:col-span-6 space-y-6">
                <h3 className="font-headline text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  <span>Engineering Value & Logical Mindsets</span>
                </h3>
                <p className="text-lg leading-relaxed text-slate-600">
                  {portfolioData.summary}
                </p>
                <div className="h-[2px] w-24 bg-slate-900 rounded-full" />
              </div>
 
              {/* Right Column: Key Pillars */}
              <div className="md:col-span-6 grid gap-4 sm:grid-cols-2">
                {pillars.map((pillar, index) => {
                  const PillarIcon = pillar.icon;
                  return (
                    <div 
                      key={index} 
                      className="group p-5 rounded-xl bg-slate-50/50 border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all duration-200"
                    >
                      <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center mb-3">
                        <PillarIcon className="h-5 w-5 text-slate-800" />
                      </div>
                      <h4 className="font-semibold text-slate-900 text-sm mb-1">{pillar.title}</h4>
                      <p className="text-xs text-slate-500 leading-normal">{pillar.desc}</p>
                    </div>
                  );
                })}
              </div>

            </div>
          </CardContent>
        </SpotlightCard>
      </div>
    </section>
  );
}

