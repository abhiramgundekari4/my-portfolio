'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { portfolioData } from '@/lib/data';

export function SiteHeader() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Journey', href: '#journey' },
    { name: 'Academics', href: '#academics' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Scroll Progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      
      // Header shadow/blur trigger
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-primary via-indigo-500 to-accent z-[100] transition-all duration-75 ease-out shadow-[0_0_10px_rgba(185,95,48,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'border-b border-white/[0.06] bg-background/70 backdrop-blur-md shadow-lg shadow-black/10' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-tr from-primary to-accent p-[1px] transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-background">
                <Code2 className="h-4.5 w-4.5 text-accent transition-colors duration-300 group-hover:text-primary" />
              </div>
            </div>
            <span className="font-headline text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
              {portfolioData.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group py-1"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Button asChild className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95 duration-200">
              <a href="https://drive.google.com/file/d/1CthGoVe-GHd8rehoXf7nAEh41kOzgPrH/view?usp=sharing" target="_blank" rel="noopener noreferrer">See My Resume</a>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-secondary/50">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full glass-card border-l border-white/[0.08]">
                <div className="flex flex-col gap-8 p-4 h-full">
                  <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                      <Code2 className="h-6 w-6 text-accent" />
                      <span className="font-headline text-lg font-bold text-primary">{portfolioData.name}</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <nav className="flex flex-col items-start gap-6 mt-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-xl font-semibold text-muted-foreground transition-colors hover:text-foreground w-full py-2 border-b border-white/[0.03]"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto pb-8">
                    <Button asChild className="w-full shadow-lg shadow-primary/20">
                      <a href="https://drive.google.com/file/d/1CthGoVe-GHd8rehoXf7nAEh41kOzgPrH/view?usp=sharing" target="_blank" rel="noopener noreferrer">See My Resume</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

