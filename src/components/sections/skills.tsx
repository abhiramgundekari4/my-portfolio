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
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center gap-4">
                <Icon className="h-10 w-10 text-accent" />
                <CardTitle className="font-headline text-2xl">{skillCategory.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  {skillCategory.skills.map((skill, skillIndex) => (
                    <li key={skillIndex}>{skill}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
