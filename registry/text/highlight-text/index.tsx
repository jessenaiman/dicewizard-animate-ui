'use client';

import * as React from 'react';
import { type HTMLMotionProps, motion, type Transition } from 'motion/react';

import { cn } from '@/lib/utils';

interface HighlightTextProps extends HTMLMotionProps<'span'> {
  text: string;
  startOnView?: boolean;
  transition?: Transition;
}

const animation = { backgroundSize: '100% 100%' };

const HighlightText = React.forwardRef<HTMLSpanElement, HighlightTextProps>(
  (
    {
      text,
      className,
      startOnView,
      transition = { duration: 2, ease: 'easeInOut' },
      ...props
    },
    ref,
  ) => {
    return (
      <motion.span
        ref={ref}
        initial={{
          backgroundSize: '0% 100%',
        }}
        {...(startOnView ? { whileInView: animation } : { animate: animation })}
        transition={transition}
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
        {text}
      </motion.span>
    );
  },
);
HighlightText.displayName = 'HighlightText';

export { HighlightText, type HighlightTextProps };
