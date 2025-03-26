'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Logo } from '@/components/logo';
import { Hero } from '@/components/hero';

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

const logoVariants = {
  center: {
    top: '50%',
    left: '50%',
    x: '-50%',
    y: '-50%',
    scale: 1,
  },
  topLeft: {
    top: 20,
    left: -43,
    x: 0,
    y: 0,
    scale: 0.6,
  },
};

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
            variants={logoVariants}
            initial="center"
            animate={transition ? 'topLeft' : 'center'}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          >
            <Logo size="xl" draw betaTag />
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
