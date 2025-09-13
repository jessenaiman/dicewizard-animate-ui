'use client';

import { Features } from '@/components/features';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { cn } from '@workspace/ui/lib/utils';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import LandingPage from '@/components/landing/landing-page';

const CONTENT_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 30 },
  },
} as const;

export default function HomePage() {
  const [transition, setTransition] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTransition(true), 2000);
    const timer2 = setTimeout(() => setIsLoaded(true), 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className={cn('relative min-h-screen', !isLoaded && 'overflow-y-hidden')}>
      <Header transition={transition} />

      {transition && (
        <motion.div
          variants={CONTENT_VARIANTS}
          initial="hidden"
          animate={transition ? 'visible' : 'hidden'}
          className="w-full"
        >
          <LandingPage key={String(transition)} />
        </motion.div>
      )}

      <Footer />
    </main>
  );
}
