import { generatePortfolioSummary, type PortfolioSummaryInput } from '@/ai/flows/generate-portfolio-summary';
import { SiteHeader } from '@/components/site-header';
import { HeroSection } from '@/components/sections/hero';
import { SkillsSection } from '@/components/sections/skills';
import { ProjectsSection } from '@/components/sections/projects';
import { AcademicsSection } from '@/components/sections/academics';
import { ContactSection } from '@/components/sections/contact';
import { SiteFooter } from '@/components/site-footer';
import { portfolioData } from '@/lib/data';

const aiInput: PortfolioSummaryInput = {
    skills: 'Python, SQL, C, HTML, CSS, Data Structures & Algorithms, Problem Solving, Django, Flask, Pandas, NumPy, Scikit-learn, React, Next.js, Tailwind CSS, Git, Docker',
    experience: 'I am a motivated Python developer with a strong foundation in programming fundamentals, object-oriented concepts, and database management. I enjoy building logical, data-driven solutions and continuously improving my skills through hands-on projects and learning. I am eager to contribute to real-world applications while growing as a software professional.',
};

export default async function PortfolioPage() {
    let summary;
    try {
        const result = await generatePortfolioSummary(aiInput);
        summary = result.summary;
    } catch (error) {
        console.error("Failed to generate portfolio summary with AI. This may be due to a missing or invalid API key.", error);
        summary = aiInput.experience;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
                <HeroSection name={portfolioData.name} title={portfolioData.title} summary={summary} />
                <SkillsSection />
                <ProjectsSection />
                <AcademicsSection />
                <ContactSection />
            </main>
            <SiteFooter />
        </div>
    );
}
