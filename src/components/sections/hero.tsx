'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Send, Github, Linkedin, User } from 'lucide-react';
import { portfolioData } from '@/lib/data';

type HeroSectionProps = {
  name: string;
  title: string;
  summary: string;
};

export function HeroSection({ name, title, summary }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="home" className="relative min-h-[80vh] flex items-center overflow-hidden bg-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 md:grid-cols-2">
                <div className="space-y-6 text-center md:text-left">
                    <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
                        {name}
                    </h1>
                    <p className="font-headline text-xl font-medium text-accent md:text-2xl">
                        {title}
                    </p>
                    <p className="max-w-xl text-lg text-muted-foreground mx-auto md:mx-0 leading-relaxed">
                        {summary}
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                        <Button asChild size="lg">
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                <FileText className="mr-2 h-5 w-5" />
                                See My Resume
                            </a>
                        </Button>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="#contact">
                                <Send className="mr-2 h-5 w-5" />
                                Contact Me
                            </Link>
                        </Button>
                    </div>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <Button asChild variant="ghost" size="icon">
                            <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Github className="h-6 w-6" />
                            </a>
                        </Button>
                        <Button asChild variant="ghost" size="icon">
                            <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin className="h-6 w-6" />
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
                    <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-background bg-secondary shadow-2xl flex items-center justify-center">
                        {mounted && !imageError ? (
                            <Image
                                src="/profile.jpg?updated=true"
                                alt={name}
                                fill
                                priority
                                className="object-cover"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-muted-foreground/40">
                              <User className="h-24 w-24 mb-2" />
                              <span className="text-xs font-medium">No Photo Uploaded</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
