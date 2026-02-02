import { SectionTitle } from '@/components/ui/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { portfolioData } from '@/lib/data';
import { GraduationCap, Award, Github } from 'lucide-react';
import Link from 'next/link';
import ContributionGraph from '@/components/github-contribution-graph';

export function AcademicsSection() {
  return (
    <section id="academics" className="container mx-auto scroll-mt-20 px-4 py-16">
      <SectionTitle icon={GraduationCap}>Academics & Contributions</SectionTitle>
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
        
        <div>
            <div className="flex items-center gap-2 mb-4">
                <h3 className="font-headline text-2xl font-semibold text-primary">GitHub Contributions</h3>
                <Github className="h-6 w-6 text-primary"/>
            </div>
          <Card>
            <CardContent className="p-4">
                <p className="text-muted-foreground text-sm mb-4">My activity over the last year. I am constantly learning and building.</p>
                <ContributionGraph />
                <div className="flex justify-end items-center mt-4 gap-2 text-xs text-muted-foreground">
                    <span>Less</span>
                    <div className="w-3 h-3 rounded-sm bg-secondary"></div>
                    <div className="w-3 h-3 rounded-sm bg-accent/40"></div>
                    <div className="w-3 h-3 rounded-sm bg-accent/60"></div>
                    <div className="w-3 h-3 rounded-sm bg-accent/80"></div>
                    <div className="w-3 h-3 rounded-sm bg-accent"></div>
                    <span>More</span>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
