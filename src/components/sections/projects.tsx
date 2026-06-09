'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
  return {
    overview: defaultDesc,
    coreFocus: "Relational navigation & cross-domain accessibility hubs.",
    highImpact: "Increases user accessibility by 40% across student services.",
    extraTags: ['CSS Flexbox', 'Responsive Grid', 'Cross-Domain Mapping', 'UI Accessibility']
  };
};

export function ProjectsSection() {
  return (
    <section id="projects" className="relative scroll-mt-20 px-6 py-24 border-t border-slate-100 bg-white">
      <div className="max-w-[1100px] mx-auto w-full z-10 relative">
        <span className="block font-sans text-[0.78rem] font-bold uppercase tracking-[0.08em] text-slate-400 mb-8">
          03 — Projects
        </span>
        <h2 className="font-sans text-[2rem] font-bold tracking-tight text-slate-900 leading-snug mb-12">
          Featured Engineering Work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {portfolioData.projects.map((project, index) => {
            const projectImage = PlaceHolderImages.find(p => p.id === project.image);
            const details = getProjectDetails(project.title, project.description);
            return (
              <div 
                key={index} 
                className="bg-slate-50/50 border border-slate-200/80 rounded-[24px] overflow-hidden flex flex-col transition-all duration-300 hover:border-slate-900 hover:-translate-y-1.5 hover:bg-white hover:shadow-lg"
              >
                {/* Project Image Section */}
                {projectImage && (
                  <div className="relative aspect-video overflow-hidden border-b border-slate-200/80">
                    <Image
                      src={projectImage.imageUrl}
                      alt={project.title}
                      width={600}
                      height={400}
                      data-ai-hint={projectImage.imageHint}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 z-20">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white shadow-sm">
                        Featured
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Body Content */}
                <div className="p-8 flex flex-col gap-5 flex-grow">
                  {/* Tags */}
                  <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                    {project.tags.map((tag) => (
                      <li 
                        key={tag} 
                        className="text-[0.75rem] font-bold text-slate-900 uppercase tracking-wider bg-slate-200/60 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <h3 className="font-sans text-xl font-bold tracking-tight text-slate-900 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-[0.9rem] text-slate-500 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-4 mt-auto pt-4 border-t border-slate-200/40">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="inline-flex items-center gap-1.5 text-[0.85rem] font-bold text-slate-900 hover:opacity-75 transition-opacity cursor-pointer">
                          <Eye className="h-4 w-4" />
                          Details
                        </button>
                      </DialogTrigger>
                      
                      <DialogContent className="bg-white border border-slate-200 max-w-lg sm:max-w-xl text-slate-900 shadow-xl rounded-xl">
                        <DialogHeader>
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold tracking-widest uppercase mb-1">
                            <Cpu className="h-4 w-4" />
                            <span>Project Architecture</span>
                          </div>
                          <DialogTitle className="font-sans text-2xl font-black tracking-tight text-slate-950">
                            {project.title}
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-5 pt-3">
                          {projectImage && (
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                              <Image
                                src={projectImage.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Project Overview</h4>
                            <p className="text-sm text-slate-600 leading-relaxed font-sans">
                              {details.overview}
                            </p>
                          </div>
   
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                              <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase">
                                <Terminal className="h-3.5 w-3.5" /> Core Focus
                              </h5>
                              <p className="text-xs text-slate-600 font-sans">{details.coreFocus}</p>
                            </div>
                            
                            <div className="space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-lg">
                              <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase">
                                <Sparkles className="h-3.5 w-3.5" /> High Impact
                              </h5>
                              <p className="text-xs text-slate-600 font-sans">{details.highImpact}</p>
                            </div>
                          </div>
   
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <Badge key={tag} className="bg-slate-100 text-slate-800 border border-slate-200 rounded">
                                  {tag}
                                </Badge>
                              ))}
                              {details.extraTags.map((tag) => (
                                <Badge key={tag} className="bg-slate-100 text-slate-800 border border-slate-200 rounded">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
   
                          {project.liveUrl && (
                            <div className="pt-4 border-t border-slate-100">
                              <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors">
                                <Link href={project.liveUrl} target={project.liveUrl.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                                  <Eye className="mr-2 h-4 w-4" />
                                  Launch Live Showcase
                                </Link>
                              </Button>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
   
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[0.85rem] font-bold text-slate-900 hover:opacity-75 transition-opacity"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


