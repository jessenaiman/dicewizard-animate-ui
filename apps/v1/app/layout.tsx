import { RootProvider } from 'fumadocs-ui/provider';
import { Outfit } from 'next/font/google';
import type { ReactNode } from 'react';
import '@workspace/ui/globals.css';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={outfit.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
