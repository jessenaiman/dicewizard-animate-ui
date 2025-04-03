'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Logo } from '@/components/logo';
import { Hero } from '@/components/hero';
import { useIsMobile } from '@/hooks/use-mobile';
import GithubIcon from '@/components/icons/github-icon';
import XIcon from '@/components/icons/x-icon';

const logoWrapperVariants = {
  center: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  topLeft: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 'auto',
    height: 'auto',
  },
};

const logoVariants = (isMobile: boolean) => ({
  center: {
    top: '50%',
    left: '50%',
    x: '-50%',
    y: '-50%',
    scale: 1,
  },
  topLeft: {
    top: 20,
    left: isMobile ? -36 : -43,
    x: 0,
    y: 0,
    scale: 0.6,
  },
});

const contentVariants = {
  hidden: {
    y: 2000,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 30 },
  },
};

export default function HomePage() {
  const [transition, setTransition] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransition(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative h-screen">
      <style>{`
        html, body {
          overflow: hidden;
        }
      `}</style>

      <motion.div
        variants={logoWrapperVariants}
        initial="center"
        animate={transition ? 'topLeft' : 'center'}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className="fixed z-40 flex items-center justify-center"
      >
        <div className="relative w-full max-w-7xl h-full">
          <motion.div
            className="absolute"
            variants={logoVariants(isMobile)}
            initial="center"
            animate={transition ? 'topLeft' : 'center'}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          >
            <Logo size={isMobile ? 'lg' : 'xl'} draw betaTag />
          </motion.div>

          <motion.div
            initial={{ top: 28, right: -43, opacity: 0 }}
            animate={
              transition
                ? { right: 20, opacity: 1 }
                : { right: -43, opacity: 0 }
            }
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            className="absolute z-40 flex items-center gap-x-1"
          >
            <a
              href="https://github.com/Skyleen77/animate-ui"
              rel="noreferrer noopener"
              target="_blank"
              className="inline-flex sm:mt-1 items-center justify-center rounded-md text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 hover:bg-fd-accent hover:text-fd-accent-foreground p-1.5 [&_svg]:size-5 text-fd-muted-foreground sm:[&_svg]:size-5.5"
              data-active="false"
            >
              <GithubIcon />
            </a>
            <a
              href="https://x.com/animate_ui"
              rel="noreferrer noopener"
              target="_blank"
              className="inline-flex sm:mt-1 items-center justify-center rounded-md text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 hover:bg-fd-accent hover:text-fd-accent-foreground p-1.5 [&_svg]:size-5 text-fd-muted-foreground sm:[&_svg]:size-5.5"
              data-active="false"
            >
              <XIcon />
            </a>
          </motion.div>
        </div>
      </motion.div>

      <div className="h-screen w-full flex items-center">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={transition ? 'visible' : 'hidden'}
          className="w-full"
        >
          <Hero key={String(transition)} />
        </motion.div>
      </div>
    </main>
  );
}
