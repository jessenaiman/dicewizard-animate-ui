'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { cn } from '@/lib/cn';
import { AnimatedShinyText } from '@workspace/ui/components/magicui/animated-shiny-text';
import { ShimmerButton } from '@workspace/ui/components/magicui/shimmer-button';
import { TextAnimate } from '@workspace/ui/components/magicui/text-animate';
import { LampContainer } from '@workspace/ui/components/ui/lamp';

interface HeroLandingProps {
  className?: string;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({ className }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      className={cn(
        'relative flex items-center justify-center px-6 hero-section',
        className,
      )}
      aria-labelledby="main-hero-heading"
    >
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Build lamps <br /> the right way
        </motion.h1>

        {/* Subtitle */}
        <TextAnimate className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground">
          I craft scalable, animated component systems in React + Tailwind,
          balancing performance, accessibility, and visual polish. Strong focus
          on DX, clean APIs, and design token workflows.
        </TextAnimate>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {[
            {
              href: '#tool-explorer-wrapper',
              label: 'Explore Tools',
              primary: true,
            },
            {
              href: '#pricing-tiers',
              label: 'Pricing',
            },
            { href: 'https://animate-ui.com', label: 'Animate UI Site' },
          ].map((btn) => (
            <Link
              key={btn.href}
              href={btn.href}
              target={btn.href.startsWith('http') ? '_blank' : undefined}
              rel={
                btn.href.startsWith('http') ? 'noreferrer noopener' : undefined
              }
            >
              <ShimmerButton
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
              </ShimmerButton>
            </Link>
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
      </LampContainer>
    </section>
  );
};

export default HeroLanding;
