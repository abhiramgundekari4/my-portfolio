import { SectionTitle } from '@/components/ui/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { portfolioData } from '@/lib/data';
import { Sparkles } from 'lucide-react';

export function SkillsSection() {
  return (
    <section id="skills" className="container mx-auto scroll-mt-20 px-4 py-16">
      <SectionTitle icon={Sparkles}>Technical Skills</SectionTitle>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {portfolioData.skills.map((skillCategory, index) => {
          const Icon = skillCategory.icon;
          return (
            <Card 
              key={index} 
              className="glass-card glass-card-hover border-white/[0.05] flex flex-col"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-accent">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-headline text-xl font-bold tracking-tight text-foreground">
                  {skillCategory.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow pt-2">
                <div className="flex flex-wrap gap-2">
                  {skillCategory.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-flex items-center rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all duration-300 hover:-translate-y-[2px] hover:bg-accent/10 hover:border-accent/40 hover:text-accent hover:shadow-[0_2px_8px_rgba(185,95,48,0.15)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

