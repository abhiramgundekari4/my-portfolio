import { SectionTitle } from '@/components/ui/section-title';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { portfolioData } from '@/lib/data';
import { Award, Trophy, ExternalLink, GraduationCap, Calendar, Briefcase, FileText } from 'lucide-react';

export function AcademicsSection() {
  return (
    <section id="academics" className="container mx-auto scroll-mt-20 px-4 py-20">
      <SectionTitle icon={Trophy}>Academics & Milestones</SectionTitle>
      
      <div className="mx-auto max-w-5xl space-y-16">
        
        {/* Education & Achievements Timeline Grid */}
        <div className="grid gap-8 md:grid-cols-12 items-start">
          
          {/* Education Card (7 Cols) */}
          <div className="md:col-span-7 space-y-6">
            <h3 className="font-headline text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-accent" />
              <span>Education</span>
            </h3>
            
            <SpotlightCard className="border-white/[0.05] p-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 h-24 w-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 text-xs text-accent font-semibold mb-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{portfolioData.education.period}</span>
                </div>
                <CardTitle className="font-headline text-2xl font-black text-foreground">
                  {portfolioData.education.degree}
                </CardTitle>
                <p className="text-sm font-semibold text-primary">{portfolioData.education.institution}</p>
              </CardHeader>
              <CardContent className="pt-2">
                <ul className="space-y-3.5 pl-0 text-sm text-muted-foreground">
                  {portfolioData.education.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
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
                  <h3 className="font-headline text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                    <CategoryIcon className="h-6 w-6 text-accent" />
                    <span>{achievementCategory.category}</span>
                  </h3>
                  
                  <div className="relative border-l-2 border-primary/20 pl-6 ml-3 space-y-8 py-2">
                    {achievementCategory.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="relative group">
                        
                        {/* Timeline Node */}
                        <div className="absolute -left-[31px] top-1 bg-background border border-primary/30 h-4.5 w-4.5 rounded-full flex items-center justify-center shadow-md shadow-black/40 group-hover:border-accent group-hover:scale-110 transition-all duration-300">
                          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                        </div>
                        
                        <div className="space-y-1.5 pl-1.5">
                          {item.url ? (
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="font-bold text-foreground text-base hover:text-accent hover:underline flex items-center gap-1.5 group/link"
                            >
                              {item.title}
                              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover/link:text-accent" />
                            </a>
                          ) : (
                            <p className="font-bold text-foreground text-base">{item.title}</p>
                          )}
                          <p className="text-xs text-muted-foreground leading-relaxed">
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
          <h3 className="font-headline text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Award className="h-6 w-6 text-accent" />
            <span>Professional Credentials</span>
          </h3>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioData.certifications.map((cert, index) => (
              <SpotlightCard 
                key={index}
                className="border-white/[0.05] flex items-center p-5 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 h-16 w-16 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />
                <div className="flex items-center gap-4.5 w-full">
                  <div className="h-11 w-11 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    {cert.url ? (
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-bold text-sm text-foreground hover:text-accent hover:underline line-clamp-1 flex items-center gap-1 group/item"
                      >
                        {cert.name}
                        <ExternalLink className="h-3 w-3 text-muted-foreground group-hover/item:text-accent flex-shrink-0" />
                      </a>
                    ) : (
                      <p className="font-bold text-sm text-foreground line-clamp-1">{cert.name}</p>
                    )}
                    <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
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

