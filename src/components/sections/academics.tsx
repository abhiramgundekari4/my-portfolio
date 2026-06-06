import { SectionTitle } from '@/components/ui/section-title';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { portfolioData } from '@/lib/data';
import { Award, Trophy, ExternalLink, GraduationCap, Calendar, Briefcase, FileText } from 'lucide-react';

export function AcademicsSection() {
  return (
    <section id="academics" className="container mx-auto scroll-mt-20 px-4 py-20">
      <SectionTitle number="06">Academics & Milestones</SectionTitle>
      
      <div className="mx-auto max-w-5xl space-y-16">
        
        {/* Education & Achievements Timeline Grid */}
        <div className="grid gap-8 md:grid-cols-12 items-start">
          
          {/* Education Card (7 Cols) */}
          <div className="md:col-span-7 space-y-6">
            <h3 className="font-headline text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-slate-800" />
              <span>Education</span>
            </h3>
            
            <SpotlightCard className="border-slate-200 bg-white p-0 overflow-hidden relative shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{portfolioData.education.period}</span>
                </div>
                <CardTitle className="font-headline text-2xl font-black text-slate-900">
                  {portfolioData.education.degree}
                </CardTitle>
                <p className="text-sm font-semibold text-slate-700">{portfolioData.education.institution}</p>
              </CardHeader>
              <CardContent className="pt-2">
                <ul className="space-y-3.5 pl-0 text-sm text-slate-600">
                  {portfolioData.education.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-900 mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </SpotlightCard>
          </div>

          {/* Internships Timeline (5 Cols) */}
          <div className="md:col-span-5 space-y-6">
            {portfolioData.achievements.map((achievementCategory, index) => {
              const CategoryIcon = achievementCategory.icon;
              return (
                <div key={index} className="space-y-6">
                  <h3 className="font-headline text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    <CategoryIcon className="h-6 w-6 text-slate-850" />
                    <span>{achievementCategory.category}</span>
                  </h3>
                  
                  <div className="relative border-l-2 border-slate-200 pl-6 ml-3 space-y-8 py-2">
                    {achievementCategory.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="relative group">
                        
                        {/* Timeline Node */}
                        <div className="absolute -left-[31px] top-1 bg-white border border-slate-300 h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-800" />
                        </div>
                        
                        <div className="space-y-1.5 pl-1.5">
                          {item.url ? (
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="font-bold text-slate-900 text-base hover:text-slate-700 hover:underline flex items-center gap-1.5 group/link"
                            >
                              {item.title}
                              <ExternalLink className="h-3.5 w-3.5 text-slate-400 transition-colors group-hover/link:text-slate-800" />
                            </a>
                          ) : (
                            <p className="font-bold text-slate-900 text-base">{item.title}</p>
                          )}
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="space-y-6">
          <h3 className="font-headline text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Award className="h-6 w-6 text-slate-800" />
            <span>Professional Credentials</span>
          </h3>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioData.certifications.map((cert, index) => (
              <SpotlightCard 
                key={index}
                className="border-slate-200 bg-white flex items-center p-5 relative overflow-hidden group shadow-sm animate-none"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 flex-shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    {cert.url ? (
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-bold text-sm text-slate-900 hover:text-slate-700 hover:underline line-clamp-1 flex items-center gap-1 group/item"
                      >
                        {cert.name}
                        <ExternalLink className="h-3 w-3 text-slate-400 group-hover/item:text-slate-700 flex-shrink-0" />
                      </a>
                    ) : (
                      <p className="font-bold text-sm text-slate-900 line-clamp-1">{cert.name}</p>
                    )}
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {cert.issuer} &middot; {cert.date}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

