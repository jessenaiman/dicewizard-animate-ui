'use client';

import * as React from 'react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

// Define the NeonTextProps interface with a new "gradient" prop.
// This prop expects a full CSS gradient string.
// All comments are written in English.
interface NeonTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  duration?: number; // Duration of the animation in seconds.
  repeat?: number; // Number of times the animation should repeat (Infinity for endless).
  ease?: string; // Easing function for the animation.
  gradient?: string; // CSS gradient string for the text animation background.
}

// Use React.forwardRef to forward the ref to the span element.
const NeonText = React.forwardRef<HTMLSpanElement, NeonTextProps>(
  (
    {
      text,
      className,
      duration = 50,
      repeat = Infinity,
      ease = 'linear',
      gradient = 'linear-gradient(90deg in lch longer hue, oklch(100% 70% 0) 0 0)',
      ...props
    },
    ref,
  ) => {
    // Base style for both motion spans using the provided gradient.
    const baseStyle: React.CSSProperties = {
      backgroundImage: gradient,
    };

    return (
      <span
        ref={ref}
        className={cn('relative inline-block', className)}
        {...props}
      >
        {/* Main text animation */}
        <motion.span
          className="m-0 text-transparent bg-clip-text bg-[length:700%_100%] bg-[position:0%_0%]"
          style={baseStyle}
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '500% 100%' }}
          transition={{ duration, repeat, ease }}
        >
          {text}
        </motion.span>
        {/* Blurred text animation for neon glow effect */}
        <motion.span
          className="m-0 absolute top-0 left-0 text-transparent bg-clip-text blur-[8px] mix-blend-plus-lighter bg-[length:700%_100%] bg-[position:0%_0%]"
          style={baseStyle}
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '500% 100%' }}
          transition={{ duration, repeat, ease }}
        >
          {text}
        </motion.span>
      </span>
    );
  },
);

NeonText.displayName = 'NeonText';

export { NeonText, type NeonTextProps };
