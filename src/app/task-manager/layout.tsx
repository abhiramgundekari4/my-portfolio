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
  title: 'Smart Task Manager | Academic Planner',
  description: 'An elegant, student-centric academic planner designed to track workloads.',
};

export default function TaskManagerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('dark', inter.variable)} suppressHydrationWarning>
      <body className={cn(inter.className, 'antialiased bg-[#09070f] text-gray-100 min-h-screen relative')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
