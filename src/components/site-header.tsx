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
        className="fixed top-0 left-0 h-[2px] bg-slate-900 z-[100] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled 
          ? 'border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-slate-100 p-1 border border-slate-200">
              <Code2 className="h-4 w-4 text-slate-800" />
            </div>
            <span className="font-headline text-base font-bold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-slate-600">
              {portfolioData.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900 py-1"
              >
                {item.name}
              </Link>
            ))}
            <Button asChild size="sm" className="bg-slate-900 text-white hover:bg-slate-800 transition-colors">
              <a href="https://drive.google.com/file/d/1rR5YQibv9Kl8DLhFTy_SUxPWB7l6POqJ/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</a>
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
              <SheetContent side="right" className="w-full bg-white border-l border-slate-200">
                <div className="flex flex-col gap-8 p-4 h-full">
                  <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                      <Code2 className="h-5 w-5 text-slate-800" />
                      <span className="font-headline text-lg font-bold text-slate-900">{portfolioData.name}</span>
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
                        className="text-lg font-semibold text-slate-600 transition-colors hover:text-slate-900 w-full py-2 border-b border-slate-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto pb-8">
                    <Button asChild className="w-full bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                      <a href="https://drive.google.com/file/d/1rR5YQibv9Kl8DLhFTy_SUxPWB7l6POqJ/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</a>
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

