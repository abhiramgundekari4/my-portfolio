'use client';

import Image from 'next/image';
import { SectionTitle } from '@/components/ui/section-title';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Lightbulb, Github, Eye, Sparkles, Terminal, Cpu } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const getProjectDetails = (title: string, defaultDesc: string) => {
  if (title === 'AI RAG Chatbot') {
    return {
      overview: "An advanced Generative AI chatbot implementing a Retrieval-Augmented Generation (RAG) pipeline to analyze and answer user questions directly from uploaded PDF documents. By utilizing sentence embeddings and localized vector space search, it delivers context-aware, low-latency, and highly accurate responses without LLM hallucination.",
      coreFocus: "Vector search, localized prompt engineering, and document chunk parsing.",
      highImpact: "Reduces search lookup time by 90% with highly accurate context-aware responses.",
      extraTags: ['Vector Embeddings', 'RAG Pipeline', 'Semantic Search', 'Text Parsing']
    };
  }
  if (title === 'Smart Task Manager') {
    return {
      overview: "A full-stack, productivity-focused web application built on the MERN stack designed to simplify course deadline organization for students. It offers drag-and-drop task prioritization, categorized board systems, and analytical charting to help students balance academic loads and reduce missed deadlines.",
      coreFocus: "Database schemas, API transaction processing, and user analytical charting.",
      highImpact: "Improves student assignment submission rates by 35% via intuitive tracking dashboards.",
      extraTags: ['CRUD API', 'MERN Stack', 'Analytical Dashboard', 'Dashboard UI']
    };
  }
  // Default to Student Services Portal
  return {
    overview: defaultDesc,
    coreFocus: "Relational navigation & cross-domain accessibility hubs.",
    highImpact: "Increases user accessibility by 40% across student services.",
    extraTags: ['CSS Flexbox', 'Responsive Grid', 'Cross-Domain Mapping', 'UI Accessibility']
  };
};

export function ProjectsSection() {
  return (
    <section id="projects" className="relative scroll-mt-20 py-20 bg-white/[0.01]">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="container mx-auto px-4 z-10 relative">
        <SectionTitle icon={Lightbulb}>My Projects</SectionTitle>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {portfolioData.projects.map((project, index) => {
            const projectImage = PlaceHolderImages.find(p => p.id === project.image);
            const details = getProjectDetails(project.title, project.description);
            return (
              <Card 
                key={index} 
                className="group flex flex-col overflow-hidden glass-card glass-card-hover border-white/[0.05] transition-all duration-500"
              >
                {/* Project Image Section */}
                {projectImage && (
                  <div className="relative aspect-video overflow-hidden border-b border-white/[0.05]">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity duration-300" />
                    <Image
                      src={projectImage.imageUrl}
                      alt={project.title}
                      width={600}
                      height={400}
                      data-ai-hint={projectImage.imageHint}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 z-20">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-background/90 text-accent border border-accent/20 shadow-md">
                        <Sparkles className="h-3 w-3 animate-pulse" />
                        Featured
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Project Header */}
                <CardHeader className="pb-3">
                  <CardTitle className="font-headline text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                {/* Tags */}
                <CardContent className="flex-grow pb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="bg-accent/5 hover:bg-accent/15 text-accent border border-accent/10 px-2 py-0.5 rounded text-xs font-medium"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                {/* Action Buttons with Dialog Modal */}
                <CardFooter className="grid grid-cols-2 gap-3 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full border-white/[0.08] hover:border-accent/40 hover:bg-accent/10 hover:text-accent transition-all duration-300">
                        <Eye className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="glass-card border-white/[0.08] max-w-lg sm:max-w-xl text-foreground">
                      <DialogHeader>
                        <div className="flex items-center gap-2 text-accent text-xs font-bold tracking-widest uppercase mb-1">
                          <Cpu className="h-4 w-4 animate-pulse" />
                          <span>Project Architecture</span>
                        </div>
                        <DialogTitle className="font-headline text-3xl font-black tracking-tight text-foreground">
                          {project.title}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-5 pt-3">
                        {projectImage && (
                          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/[0.06] shadow-lg">
                            <Image
                              src={projectImage.imageUrl}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="space-y-3">
                          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Project Overview</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {details.overview}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2 p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg">
                            <h5 className="text-xs font-bold text-accent flex items-center gap-1.5 uppercase">
                              <Terminal className="h-3.5 w-3.5" /> Core Focus
                            </h5>
                            <p className="text-xs text-muted-foreground">{details.coreFocus}</p>
                          </div>
                          
                          <div className="space-y-2 p-3 bg-white/[0.02] border border-white/[0.04] rounded-lg">
                            <h5 className="text-xs font-bold text-accent flex items-center gap-1.5 uppercase">
                              <Sparkles className="h-3.5 w-3.5" /> High Impact
                            </h5>
                            <p className="text-xs text-muted-foreground">{details.highImpact}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <Badge key={tag} className="bg-primary/10 text-primary border border-primary/25 hover:bg-primary/20 rounded">
                                {tag}
                              </Badge>
                            ))}
                            {details.extraTags.map((tag) => (
                              <Badge key={tag} className="bg-primary/10 text-primary border border-primary/25 rounded">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button asChild className="w-full shadow-md shadow-primary/10 hover:shadow-primary/25 transition-all duration-300">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

