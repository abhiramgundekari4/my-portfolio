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
    skills: 'Python, SQL, Data Structures & Algorithms, Problem Solving, Django, Flask, Pandas, NumPy, Scikit-learn, React, Next.js, Tailwind CSS, Git, Docker',
    experience: 'A dedicated and hardworking student with a strong foundation in computer science. Developed several full-stack and data-focused projects, demonstrating the ability to quickly learn and apply new technologies to solve real-world problems. Proven ability to solve complex problems using Data Structures and Algorithms, with achievements in competitive programming.',
    objective: 'To secure a challenging role as a Software Engineer or Data Scientist, applying my skills in software development and problem-solving to contribute to innovative projects and grow within a dynamic team.',
};

export default async function PortfolioPage() {
    let summary;
    try {
        const result = await generatePortfolioSummary(aiInput);
        summary = result.summary;
    } catch (error) {
        console.error("Failed to generate portfolio summary with AI. This may be due to a missing or invalid API key.", error);
        summary = `${aiInput.experience} ${aiInput.objective}`;
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
