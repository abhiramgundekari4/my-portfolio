import { SectionTitle } from '@/components/ui/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { portfolioData } from '@/lib/data';
import { Award, Trophy } from 'lucide-react';

export function AcademicsSection() {
  return (
    <section id="academics" className="container mx-auto scroll-mt-20 px-4 py-16">
      <SectionTitle icon={Trophy}>Academics & Achievements</SectionTitle>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 font-headline text-2xl font-semibold text-primary">Education</h3>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{portfolioData.education.degree}</CardTitle>
              <p className="text-muted-foreground">{portfolioData.education.institution}</p>
              <p className="text-sm text-muted-foreground">{portfolioData.education.period}</p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                {portfolioData.education.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <h3 className="mb-4 font-headline text-2xl font-semibold text-primary">Certifications</h3>
          <div className="space-y-4">
            {portfolioData.certifications.map((cert, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Award className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                    <div>
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">
                        {cert.name}
                      </a>
                      <p className="text-sm text-muted-foreground">{cert.issuer} - {cert.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="space-y-8">
          {portfolioData.achievements.map((achievementCategory, index) => (
            <div key={index}>
              <h3 className="mb-4 font-headline text-2xl font-semibold text-primary">
                {achievementCategory.category}
              </h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {achievementCategory.items.map((item, itemIndex) => (
                       <div key={itemIndex} className="flex items-start gap-4">
                        <achievementCategory.icon className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
