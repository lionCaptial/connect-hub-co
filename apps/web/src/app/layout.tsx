import '@/app/globals.css';
import React, { Suspense } from 'react';
import { Fraunces, Source_Sans_3 } from 'next/font/google';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { PublicHeader } from '@/components/auth/PublicHeader';
import { BusinessFooter } from '@/components/auth/BusinessFooter';
import { PageContent } from '@/components/common/PageContent';
import { ServicesDrawerProvider } from '@/components/auth/ServicesDrawerContext';
import { ServicesDrawerHost } from '@/components/auth/ServicesDrawerHost';
import { FloatingContactUtilities } from '@/components/common/FloatingContactUtilities';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'Holy Yatra | Religious Services',
  description:
    'Trusted coordination for ancestral rites — Verified Priests, human support, responsible AI guidance.',
  icons: {
    icon: [{ url: '/images/brand/golden-lotus-mark.svg', type: 'image/svg+xml' }],
    shortcut: ['/images/brand/golden-lotus-mark.svg'],
    apple: [{ url: '/images/brand/golden-lotus-mark.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body
        className="min-h-full flex flex-col"
        style={{ margin: 0, padding: 0 }}
        suppressHydrationWarning
      >
        <AuthProvider>
          <ServicesDrawerProvider>
            <PublicHeader />
            <PageContent>{children}</PageContent>
            <BusinessFooter />
            <FloatingContactUtilities />
            <Suspense fallback={null}>
              <ServicesDrawerHost />
            </Suspense>
          </ServicesDrawerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
