import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AI App Generator Dashboard',
  description: 'A simple dynamic configuration-driven application renderer.',
};

export default function GeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('light', inter.variable)} suppressHydrationWarning>
      <body className={cn(inter.className, 'antialiased bg-gray-50 text-gray-900 min-h-screen relative')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
