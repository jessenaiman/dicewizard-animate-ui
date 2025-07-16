'use client';

import { Features } from '@/components/features';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { cn } from '@workspace/ui/lib/utils';
import { useMediaQuery } from 'fumadocs-core/utils/use-media-query';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

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

  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <main className={cn('relative h-dvh', !isLoaded && 'overflow-y-hidden')}>
      <Header transition={transition} />

      <div className="h-dvh w-full flex items-center">
        {transition && (
          <motion.div
            variants={CONTENT_VARIANTS}
            initial="hidden"
            animate={transition ? 'visible' : 'hidden'}
            className="w-full"
          >
            {isMobile !== null && (
              <Hero key={String(transition)} isMobile={isMobile} />
            )}
          </motion.div>
        )}
      </div>

      <Features />

      <Footer />
    </main>
  );
}
