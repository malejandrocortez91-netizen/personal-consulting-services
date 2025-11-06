
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Dancing_Script } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import {ThemeProvider} from '@/components/providers';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const fontHandwriting = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-handwriting',
});

export const metadata: Metadata = {
  title: 'Alejandro Cortez Velasquez | Executive Operations & Transformation Leader',
  description: 'Driving operational excellence, strategic growth, and high-impact business transformation for enterprise-level organizations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          'antialiased',
          fontBody.variable,
          fontHeadline.variable,
          fontHandwriting.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
