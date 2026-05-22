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
      <SectionTitle icon={UserCircle}>About Me</SectionTitle>
      <div className="mx-auto max-w-5xl">
        <SpotlightCard className="border-white/[0.05] p-0">
          <CardContent className="p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-12 items-center">
              
              {/* Left Column: Summary */}
              <div className="md:col-span-6 space-y-6">
                <h3 className="font-headline text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <span>Engineering Value & Logical Mindsets</span>
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {portfolioData.summary}
                </p>
                <div className="h-[2px] w-24 bg-gradient-to-r from-primary to-accent rounded-full" />
              </div>

              {/* Right Column: Key Pillars */}
              <div className="md:col-span-6 grid gap-4 sm:grid-cols-2">
                {pillars.map((pillar, index) => {
                  const PillarIcon = pillar.icon;
                  return (
                    <div 
                      key={index} 
                      className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-accent/20 transition-all duration-200"
                    >
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                        <PillarIcon className="h-5 w-5 text-accent" />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">{pillar.title}</h4>
                      <p className="text-xs text-muted-foreground leading-normal">{pillar.desc}</p>
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

