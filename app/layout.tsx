import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import './global.css';
import { Providers } from './providers';
import { jsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  title: {
    template: '%s - Animate UI',
    default: 'Animate UI - Animated React Components',
  },
  description:
    'Fully animated, open-source component distribution built with React, TypeScript, Tailwind CSS, and Motion. Browse a list of components you can install, modify, and use in your projects.',
  keywords: [
    'Animate UI',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Open-source components',
    'Animated UI components',
    'UI library',
  ],
  authors: [
    {
      name: 'Skyleen77',
      url: 'https://github.com/Skyleen77',
    },
  ],
  creator: 'Skyleen77',
  openGraph: {
    title: 'Animate UI',
    description:
      'Fully animated, open-source component distribution built with React, TypeScript, Tailwind CSS, and Motion. Browse a list of components you can install, modify, and use in your projects.',
    url: 'https://animate-ui.com',
    siteName: 'Animate UI',
    images: [
      {
        url: 'https://animate-ui.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Animate UI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ defaultTheme: 'dark' }}>
          <Providers>{children}</Providers>
        </RootProvider>
      </body>
    </html>
  );
}
