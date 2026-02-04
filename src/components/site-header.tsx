'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { portfolioData } from '@/lib/data';

export function SiteHeader() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Academics', href: '#academics' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-accent" />
          <span className="font-headline text-lg font-bold text-primary">{portfolioData.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          <Button asChild>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">See My Resume</a>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
              <div className="flex flex-col gap-8 p-4">
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
                <nav className="flex flex-col items-start gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                 <Button asChild className="w-full">
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">See My Resume</a>
                 </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
