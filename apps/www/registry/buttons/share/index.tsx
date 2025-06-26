'use client';
import * as React from 'react';
import {} from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@workspace/ui/lib/utils';
import { HTMLMotionProps } from 'motion/react';

type ShareButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<'button'>;

function ShareButton({ children, className, ...props }: ShareButtonProps) {
  return (
    <button className={cn(className)} {...props}>
      {children}
    </button>
  );
}

export { ShareButton, type ShareButtonProps };
