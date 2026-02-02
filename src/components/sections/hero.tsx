import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Send, Github, Linkedin } from 'lucide-react';
import { portfolioData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type HeroSectionProps = {
  name: string;
  title: string;
  summary: string;
};

export function HeroSection({ name, title, summary }: HeroSectionProps) {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-picture');

  return (
    <section id="home" className="relative h-[90vh] min-h-[600px] overflow-hidden bg-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 md:grid-cols-2">
                <div className="space-y-6 text-center md:text-left">
                    <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
                        {name}
                    </h1>
                    <p className="font-headline text-xl font-medium text-accent md:text-2xl">
                        {title}
                    </p>
                    <p className="max-w-xl text-lg text-muted-foreground mx-auto md:mx-0">
                        {summary}
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                        <Button asChild size="lg">
                            <a href="/resume.pdf" download>
                                <Download className="mr-2 h-5 w-5" />
                                Download Resume
                            </a>
                        </Button>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="#contact">
                                <Send className="mr-2 h-5 w-5" />
                                Contact Me
                            </Link>
                        </Button>
                    </div>
                    <div className="flex justify-center space-x-4 md:justify-start">
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
                    {profileImage && (
                        <Image
                            src={profileImage.imageUrl}
                            alt="PortfolioPro"
                            width={400}
                            height={400}
                            data-ai-hint={profileImage.imageHint}
                            className="rounded-full object-cover shadow-2xl border-4 border-background"
                        />
                    )}
                </div>
            </div>
        </div>
    </section>
  );
}
