'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

import { cn } from '@/lib/utils';

type LiquidButtonProps = HTMLMotionProps<'button'>;

function LiquidButton({ className, ...props }: LiquidButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className={cn('relative h-12 px-6 py-3 text-base font-medium text-secondary hover:text-primary-foreground', className)}
      {...props}
    />
  );
}

export { LiquidButton, type LiquidButtonProps };
