'use client';

import * as React from 'react';
import { type HTMLMotionProps, motion, type Transition } from 'motion/react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(`{{styles.button}}`, {
  variants: {
    variant: {
      default: '{{styles.variantDefault}}',
      destructive: '{{styles.variantDestructive}}',
      outline: '{{styles.variantOutline}}',
      secondary: '{{styles.variantSecondary}}',
      ghost: '{{styles.variantGhost}}',
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

const rippleVariants = cva('absolute rounded-full size-5 pointer-events-none', {
  variants: {
    variant: {
      default: 'bg-primary-foreground',
      destructive: 'bg-destructive',
      outline: 'bg-input',
      secondary: 'bg-secondary',
      ghost: 'bg-accent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type Ripple = {
  id: number;
  x: number;
  y: number;
};

type RippleButtonProps = HTMLMotionProps<'button'> & {
  children: React.ReactNode;
  rippleClassName?: string;
  scale?: number;
  transition?: Transition;
} & VariantProps<typeof buttonVariants>;

function RippleButton({
  ref,
  children,
  onClick,
  className,
  rippleClassName,
  variant,
  size,
  scale = 10,
  transition = { duration: 0.6, ease: 'easeOut' },
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

  const createRipple = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newRipple: Ripple = {
        id: Date.now(),
        x,
        y,
      };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    },
    [],
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      if (onClick) {
        onClick(event);
      }
    },
    [createRipple, onClick],
  );

  return (
    <motion.button
      ref={buttonRef}
      data-slot="ripple-button"
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale, opacity: 0 }}
          transition={transition}
          className={cn(
            rippleVariants({ variant, className: rippleClassName }),
          )}
          style={{
            top: ripple.y - 10,
            left: ripple.x - 10,
          }}
        />
      ))}
    </motion.button>
  );
}

export { RippleButton, type RippleButtonProps };
