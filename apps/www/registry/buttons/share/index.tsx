'use client';
import * as React from 'react';
import { Share2, Github, X, Facebook } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@workspace/ui/lib/utils';
import { HTMLMotionProps, motion } from 'motion/react';

const buttonVariants = cva(
  "relative overflow-hidden cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-11 px-8 has-[>svg]:px-6',
      },
      icon: {
        suffix: 'pl-4 pr-12',
        prefix: 'pl-12 pr-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ShareButtonProps = HTMLMotionProps<'button'> & {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  icon?: 'suffix' | 'prefix';
} & VariantProps<typeof buttonVariants>;

function ShareButton({
  children,
  className,
  variant,
  size,
  icon,
  ...props
}: ShareButtonProps) {
  return (
    <motion.button
      className={cn(buttonVariants({ variant, size, className, icon }))}
      {...props}
    >
      {/* {icon === 'prefix' && <Share2 className="size-4" />}
      {children}
      {icon === 'suffix' && <Share2 className="size-4" />} */}
      <ShareIconGroup size={size} />
    </motion.button>
  );
}

const shareIconGroupVariants = cva('flex items-center justify-center gap-3', {
  variants: {
    size: {
      sm: 'text-[16px]',
      md: 'text-[20px]',
      lg: 'text-[28px]',
      default: 'text-[16px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type ShareIconGroupProps = {
  size?: 'sm' | 'md' | 'lg' | 'default';
  className?: string;
} & VariantProps<typeof shareIconGroupVariants>;

function ShareIconGroup({ size = 'default', className }: ShareIconGroupProps) {
  return (
    <motion.div className={cn(shareIconGroupVariants({ size }), className)}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.5, type: 'spring', bounce: 0.4 }}
      >
        <Github size={size} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, type: 'spring', bounce: 0.4 }}
      >
        <X size={size} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, type: 'spring', bounce: 0.4 }}
      >
        <Facebook size={size} />
      </motion.div>
    </motion.div>
  );
}

export { ShareButton, type ShareButtonProps, ShareIconGroup };
