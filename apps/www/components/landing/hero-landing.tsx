'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';
import { SplittingText } from '@/registry/primitives/texts/splitting';
import { HeroBackground } from '@/components/hero-background';

interface HeroLandingProps {
  className?: string;
}

const headlineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};
const subVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};
const ctaVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export const HeroLanding: React.FC<HeroLandingProps> = ({ className }) => {
  const [isMobile, setIsMobile] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      className={cn(
        'relative flex min-h-[88vh] items-center justify-center px-6 pt-28 md:pt-32',
        className,
      )}
      aria-labelledby="main-hero-heading"
    >
      {/* Ambient background using local HeroBackground */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <HeroBackground className="fixed -bottom-70 -right-120 size-[800px]" />
        <HeroBackground className="fixed -top-70 -left-120 size-[800px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1 text-xs font-medium tracking-wide text-primary/90 backdrop-blur-sm"
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_0_3px_rgba(var(--primary-rgb),0.25)]" />
          Friction Reduction Lab
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="main-hero-heading"
          initial="hidden"
          animate="visible"
          variants={headlineVariants}
          transition={{ duration: 0.7, ease: [0.16, 0.8, 0.24, 1] }}
          className={cn(
            'text-balance relative',
            'text-4xl md:text-6xl font-extrabold tracking-tight leading-tight',
          )}
        >
          <span className="sr-only">
            Remove Interface Drag. Ship Creative UI Faster.
          </span>
          <span className="bg-gradient-to-b from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent">
            Remove Interface{' '}
            {/* Approximate shiny effect using local SplittingText */}
            <SplittingText
              text="Drag"
              className="px-1 inline-block"
              initial={{ y: 8, opacity: 0, filter: 'blur(6px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            .
          </span>
          <br className="hidden md:block" />
          <span className="bg-gradient-to-b from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent inline-block mt-2">
            Ship
            <SplittingText
              text=" Creative UI "
              className="px-1 inline-block"
              initial={{ y: 8, opacity: 0, filter: 'blur(6px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            Faster
            <span className="text-foreground/60">.</span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={subVariants}
          transition={{
            delay: 0.15,
            duration: 0.65,
            ease: [0.16, 0.8, 0.24, 1],
          }}
          className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground"
        >
          A tactile design workshop + component sandbox. Touch layouts, motion,
          spacing & styling directly. Each tweak yields clean React + Tailwind
          code. Exploration first—commit later.
        </motion.p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {[
            {
              href: '#tool-explorer',
              label: 'Start Experimenting',
              primary: true,
            },
            {
              href: '/docs/styleguides',
              label: 'Style Guides',
            },
            {
              href: '/docs',
              label: 'Design Library',
            },
            {
              href: '#pricing',
              label: 'Services',
            },
          ].map((btn, i) => (
            <motion.div
              key={btn.href}
              initial="hidden"
              animate="visible"
              variants={ctaVariants}
              transition={{
                delay: 0.15 + i * 0.08,
                duration: 0.55,
                ease: [0.16, 0.8, 0.24, 1],
              }}
            >
              <Link
                href={btn.href}
                className={cn(
                  'group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                  btn.primary
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40'
                    : 'border border-border/60 bg-background/60 text-foreground backdrop-blur-sm hover:border-border',
                )}
              >
                <span>{btn.label}</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 transition group-hover:translate-x-0.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M6 12L10 8L6 4" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Sub-note */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 text-xs text-muted-foreground"
        >
          <span>
            {isMobile
              ? 'Optimized for mobile experimentation.'
              : 'Resize the window—tokens + motion adapt live.'}
          </span>
        </motion.div>

        {/* Ambient accent shapes */}
        {!reduce && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <motion.div
              className="absolute left-[10%] top-[25%] h-40 w-40 rounded-full bg-primary/10 blur-3xl"
              initial={{ opacity: 0.15, scale: 0.8 }}
              animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.8, 1.05, 0.8] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute right-[8%] bottom-[20%] h-56 w-56 rounded-full bg-secondary/10 blur-3xl"
              initial={{ opacity: 0.12, scale: 0.85 }}
              animate={{
                opacity: [0.12, 0.3, 0.12],
                scale: [0.85, 1.07, 0.85],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroLanding;
