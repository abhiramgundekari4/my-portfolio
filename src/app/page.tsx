import { SiteHeader } from '@/components/site-header';
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { SkillsSection } from '@/components/sections/skills';
import { ProjectsSection } from '@/components/sections/projects';
import { JourneySection } from '@/components/sections/journey';
import { AcademicsSection } from '@/components/sections/academics';
import { ContactSection } from '@/components/sections/contact';
import { SiteFooter } from '@/components/site-footer';
import { portfolioData } from '@/lib/data';
import { LeetCodeStats } from '@/components/leetcode-stats';
import { SectionTitle } from '@/components/ui/section-title';
import { Icons } from '@/components/icons';

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
                    <SectionTitle icon={Icons.leetcode as any}>LeetCode Stats & Activity</SectionTitle>
                    <LeetCodeStats />
                </section>

                <JourneySection />
                <AcademicsSection />
                <ContactSection />
            </main>
            <SiteFooter />
        </div>
    );
}
