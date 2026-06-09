import { SectionTitle } from '@/components/ui/section-title';
import { SpotlightCard } from '@/components/ui/spotlight-card';

export function SkillsSection() {
  const categories = [
    {
      title: "Languages & Databases",
      skills: ['Python', 'JavaScript', 'SQL', 'MongoDB', 'MySQL', 'C', 'HTML', 'CSS'],
      span: "col-span-1 md:col-span-2",
      bg: "bg-slate-50/50"
    },

    {
      title: "Frameworks & Libraries",
      skills: ['MERN Stack', 'React', 'Node.js', 'Express', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'NumPy'],
      span: "col-span-1",
      bg: "bg-white"
    },
    {
      title: "Core Concepts & Tools",
      skills: ['Data Structures & Algorithms (150+ Solved)', 'Machine Learning', 'REST APIs', 'DBMS', 'OOP', 'Git & GitHub'],
      span: "col-span-1 md:col-span-3",
      bg: "bg-slate-50/50"
    }
  ];

  return (
    <section id="skills" className="container mx-auto scroll-mt-20 px-4 py-20 border-t border-slate-100">
      <SectionTitle number="02">Technical Skills</SectionTitle>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {categories.map((cat, idx) => (
          <SpotlightCard
            key={idx}
            className={`p-6 sm:p-8 flex flex-col justify-between border border-slate-200 bg-white shadow-sm glass-card-hover ${cat.span}`}
          >
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">
                {cat.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center rounded border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>

  );
}

