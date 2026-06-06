import { SectionTitle } from '@/components/ui/section-title';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { portfolioData } from '@/lib/data';

export function SkillsSection() {
  return (
    <section id="skills" className="container mx-auto scroll-mt-20 px-4 py-16">
      <SectionTitle number="02">Technical Skills</SectionTitle>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {portfolioData.skills.map((skillCategory, index) => {
          const Icon = skillCategory.icon;
          return (
            <SpotlightCard 
              key={index} 
              className="border border-slate-200 bg-white shadow-sm flex flex-col glass-card-hover"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-slate-800">
                  <Icon className="h-5 w-5 text-slate-800" />
                </div>
                <CardTitle className="font-headline text-lg font-bold tracking-tight text-slate-900">
                  {skillCategory.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow pt-2">
                <div className="flex flex-wrap gap-2">
                  {skillCategory.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}

