import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Starfield } from '@/components/starfield';
import { CustomCursor } from '@/components/ui/custom-cursor';

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
    <html lang="en" className={cn(spaceGrotesk.variable)} suppressHydrationWarning>
      <body className={cn(spaceGrotesk.className, 'antialiased font-body relative bg-white')}>
        <div className="grid-bg min-h-screen w-full relative z-0">
          <Starfield />
          <CustomCursor />
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}

