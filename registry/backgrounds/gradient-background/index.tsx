'use client';

import * as React from 'react';
import { HTMLMotionProps, motion } from 'motion/react';

import { cn } from '@/lib/utils';

interface GradientBackgroundProps extends HTMLMotionProps<'div'> {
  duration?: number;
}

const GradientBackground = React.forwardRef<
  HTMLDivElement,
  GradientBackgroundProps
>(({ className, duration = 15, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        'w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-[length:400%_400%]',
        className,
      )}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
      {...props}
    />
  );
});

GradientBackground.displayName = 'GradientBackground';

export { GradientBackground, type GradientBackgroundProps };
