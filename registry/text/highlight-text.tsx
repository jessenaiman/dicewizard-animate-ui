'use client';

import * as React from 'react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

type HighlightTextProps = {
  children: React.ReactNode;
  className?: string;
  startOnView?: boolean;
  duration?: number;
  delay?: number;
};

const animation = { backgroundSize: '100% 100%' };

const HighlightText = ({
  children,
  className,
  startOnView,
  duration = 2,
  delay = 0,
}: HighlightTextProps) => {
  return (
    <motion.span
      initial={{
        backgroundSize: '0% 100%',
      }}
      {...(startOnView ? { whileInView: animation } : { animate: animation })}
      transition={{
        type: 'keyframes',
        duration,
        ease: 'easeInOut',
        delay,
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={cn(
        `relative inline-block px-2 py-1 rounded-lg bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500`,
        className,
      )}
    >
      {children}
    </motion.span>
  );
};

export { HighlightText, type HighlightTextProps };
