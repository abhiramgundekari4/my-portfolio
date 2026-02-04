import { SectionTitle } from '@/components/ui/section-title';
import { Card, CardContent } from '@/components/ui/card';
import { portfolioData } from '@/lib/data';
import { UserCircle } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="container mx-auto scroll-mt-20 px-4 py-16">
      <SectionTitle icon={UserCircle}>About Me</SectionTitle>
      <div className="mx-auto max-w-4xl">
        <Card className="border-primary/10 bg-primary/5 transition-all hover:shadow-lg">
          <CardContent className="p-8">
            <p className="text-xl leading-relaxed text-muted-foreground">
              {portfolioData.summary}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
