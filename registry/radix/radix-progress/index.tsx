'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

const MotionProgressIndicator = motion.create(ProgressPrimitive.Indicator);

type ProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
>;

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-3 w-full overflow-hidden rounded-full bg-secondary',
      className,
    )}
    {...props}
  >
    <MotionProgressIndicator
      className="h-full w-full flex-1 bg-primary"
      animate={{
        translateX: `-${100 - (value || 0)}%`,
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 30,
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, type ProgressProps };
