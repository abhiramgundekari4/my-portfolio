import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
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
    <html lang="en" className={cn('dark', spaceGrotesk.variable)} suppressHydrationWarning>
      <body className={cn(spaceGrotesk.className, 'antialiased font-body')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
