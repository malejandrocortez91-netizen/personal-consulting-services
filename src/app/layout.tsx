import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import {ThemeProvider} from '@/components/providers';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import ProjectHighlights from '@/components/landing/project-highlights';
import ResumeTimeline from '@/components/landing/resume-timeline';
import Services from '@/components/landing/services';
import Skills from '@/components/landing/skills';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'Alejandro Cortez | Software Consultant',
  description: 'Expertise in Full-Stack Development, Cloud, and AI.',
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
          fontHeadline.variable
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
