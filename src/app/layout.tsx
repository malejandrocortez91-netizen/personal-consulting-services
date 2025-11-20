
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Dancing_Script } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers';
import AppCheckProvider from '@/components/app-check-provider';

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://studio-847528267-75732.web.app';
const title = 'Alejandro Cortez Velasquez | Executive Operations & Transformation Leader';
const description = 'Driving operational excellence, strategic growth, and high-impact business transformation for enterprise-level organizations.';
const ogImage = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxidXNpbmVzcyUyMGhhbmRzaGFrZXxlbnwwfHx8fDE3NjIxODI4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1200";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: title,
    description: description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Alejandro Cortez Velasquez - Executive Leader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [ogImage],
  },
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
        <AppCheckProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AppCheckProvider>
      </body>
    </html>
  );
}
