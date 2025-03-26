'use client';

import * as React from 'react';
import { HTMLMotionProps, motion } from 'motion/react';

import { cn } from '@/lib/utils';

interface HighlightTextProps extends HTMLMotionProps<'span'> {
  children: React.ReactNode;
  startOnView?: boolean;
  duration?: number;
  delay?: number;
}

const animation = { backgroundSize: '100% 100%' };

const HighlightText = React.forwardRef<HTMLSpanElement, HighlightTextProps>(
  (
    { children, className, startOnView, duration = 2, delay = 0, ...props },
    ref,
  ) => {
    return (
      <motion.span
        ref={ref}
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
        {...props}
      >
        {children}
      </motion.span>
    );
  },
);
HighlightText.displayName = 'HighlightText';

export { HighlightText, type HighlightTextProps };
