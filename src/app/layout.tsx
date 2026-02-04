import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Abhiram Gundekari | Python & SQL Developer',
  description: "A professional student portfolio highlighting skills in Python, SQL, and web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('dark', outfit.variable)} suppressHydrationWarning>
      <body className={cn(outfit.className, 'antialiased font-body')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
