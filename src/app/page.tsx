import { SiteHeader } from '@/components/site-header';
import { HeroSection } from '@/components/sections/hero';
import { SkillsSection } from '@/components/sections/skills';
import { ProjectsSection } from '@/components/sections/projects';
import { AcademicsSection } from '@/components/sections/academics';
import { ContactSection } from '@/components/sections/contact';
import { SiteFooter } from '@/components/site-footer';
import { portfolioData } from '@/lib/data';
import ContributionGraph from '@/components/github-contribution-graph';
import { SectionTitle } from '@/components/ui/section-title';
import { Github } from 'lucide-react';

const summaryText = 'I am a motivated student with a strong foundation in programming fundamentals, object-oriented concepts, and database management. I enjoy building logical, data-driven solutions and continuously improving my skills through hands-on projects and learning. I am eager to contribute to real-world applications while growing as a software professional.';

export default function PortfolioPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
                <HeroSection name={portfolioData.name} title={portfolioData.title} summary={summaryText} />
                <SkillsSection />
                <ProjectsSection />
                
                {/* GitHub Activity Section */}
                <section className="container mx-auto px-4 py-16 border-t border-primary/5">
                    <SectionTitle icon={Github}>Coding Activity</SectionTitle>
                    <div className="mx-auto max-w-4xl rounded-xl border bg-card p-6 shadow-sm">
                        <p className="mb-4 text-center text-sm text-muted-foreground font-medium">
                            GitHub Contributions in the last year
                        </p>
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
