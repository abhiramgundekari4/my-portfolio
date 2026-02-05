import { SiteHeader } from '@/components/site-header';
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { SkillsSection } from '@/components/sections/skills';
import { ProjectsSection } from '@/components/sections/projects';
import { AcademicsSection } from '@/components/sections/academics';
import { ContactSection } from '@/components/sections/contact';
import { SiteFooter } from '@/components/site-footer';
import { portfolioData } from '@/lib/data';
import ContributionGraph from '@/components/github-contribution-graph';
import { SectionTitle } from '@/components/ui/section-title';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

export default function PortfolioPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
                <HeroSection 
                  name={portfolioData.name} 
                  title={portfolioData.title} 
                />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                
                <section className="container mx-auto px-4 py-16 border-t border-primary/5">
                    <SectionTitle icon={Github}>Coding Activity</SectionTitle>
                    <div className="mx-auto max-w-4xl rounded-xl border bg-card p-6 shadow-sm">
                        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Simulated GitHub Contributions
                                </p>
                                <p className="text-xs text-muted-foreground/60">
                                    Showcasing activity visualization
                                </p>
                            </div>
                            <Button asChild variant="outline" size="sm">
                                <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer">
                                    View Real Profile <ExternalLink className="ml-2 h-3 w-3" />
                                </a>
                            </Button>
                        </div>
                        <ContributionGraph />
                    </div>
                </section>

                <AcademicsSection />
                <ContactSection />
            </main>
            <SiteFooter />
        </div>
    );
}
