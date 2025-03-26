'use client';

import React, { useMemo } from 'react';
import { HTMLMotionProps, motion } from 'motion/react';
import { cn, getRandomNumber } from '@/lib/utils';

interface FloatingComponentProps extends HTMLMotionProps<'div'> {}

const FloatingComponent: React.FC<FloatingComponentProps> = ({
  children,
  className,
  ...props
}) => {
  const delay = useMemo(() => getRandomNumber(0, 5, 0.1), []);
  return (
    <motion.div
      {...props}
      className={cn('flex items-center justify-center', className)}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        type: 'keyframes',
        stiffness: 50,
        damping: 10,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingComponent;
