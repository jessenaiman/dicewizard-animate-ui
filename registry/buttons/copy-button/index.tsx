'use client';

import * as React from 'react';
import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center cursor-pointer rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        muted: 'bg-muted text-muted-foreground',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
      },
      size: {
        default: 'size-8 rounded-lg [&_svg]:size-4',
        sm: 'size-6 [&_svg]:size-3',
        md: 'size-10 rounded-lg [&_svg]:size-5',
        lg: 'size-12 rounded-xl [&_svg]:size-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface CopyButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'>,
    VariantProps<typeof buttonVariants> {
  content: string;
  delay?: number;
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ content, className, size, variant, delay = 3000, ...props }, ref) => {
    const [isCopied, setIsCopied] = React.useState(false);
    const Icon = isCopied ? CheckIcon : CopyIcon;

    const handleCopy = React.useCallback(() => {
      if (isCopied) return;
      navigator.clipboard
        .writeText(content)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), delay);
        })
        .catch((error) => {
          console.error('Error copying command', error);
        });
    }, [isCopied, content, delay]);

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={handleCopy}
        {...props}
        ref={ref}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isCopied ? 'check' : 'copy'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Icon />
          </motion.div>
        </AnimatePresence>
      </motion.button>
    );
  },
);

CopyButton.displayName = 'CopyButton';

export { CopyButton, buttonVariants, type CopyButtonProps };
