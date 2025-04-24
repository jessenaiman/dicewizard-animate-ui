'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(`{{styles.button}}`, {
  variants: {
    variant: {
      default: '{{styles.variantDefault}}',
      outline: '{{styles.variantOutline}}',
      secondary: '{{styles.variantSecondary}}',
    },
    size: {
      default: '{{styles.sizeDefault}}',
      sm: '{{styles.sizeSm}}',
      lg: '{{styles.sizeLg}}',
      icon: '{{styles.sizeIcon}}',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type LiquidButtonProps = HTMLMotionProps<'button'> &
  VariantProps<typeof buttonVariants>;

function LiquidButton({
  className,
  variant,
  size,
  ...props
}: LiquidButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { LiquidButton, type LiquidButtonProps };
