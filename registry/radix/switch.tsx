'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { motion, type HTMLMotionProps } from 'motion/react';

import { cn } from '@/lib/utils';

// Create motion-enabled components for the switch and thumb
const MotionSwitch = motion.create(SwitchPrimitives.Root);
const MotionThumb = motion.create(SwitchPrimitives.Thumb);

// Define the Switch component props with optional icons
type SwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
> &
  HTMLMotionProps<'button'> & {
    leftIcon?: React.ElementType;
    rightIcon?: React.ElementType;
    thumbIcon?: React.ElementType;
  };

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(
  (
    {
      className,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      thumbIcon: ThumbIcon,
      ...props
    },
    ref,
  ) => {
    const switchRef = React.useRef<HTMLButtonElement>(null);
    React.useImperativeHandle(
      ref,
      () => switchRef.current as HTMLButtonElement,
    );

    const [isChecked, setIsChecked] = React.useState(false);

    React.useEffect(() => {
      if (!switchRef.current) return;

      if (props.checked !== undefined) {
        setIsChecked(props.checked);
      }

      const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
          if (mutation.attributeName === 'data-state') {
            const currentState = switchRef.current?.getAttribute('data-state');
            setIsChecked(currentState === 'checked');
          }
        });
      });

      observer.observe(switchRef.current, {
        attributes: true,
        attributeFilter: ['data-state'],
      });

      const initialState = switchRef.current.getAttribute('data-state');
      setIsChecked(initialState === 'checked');

      return () => {
        observer.disconnect();
      };
    }, [props.checked]);

    const thumbVariants = React.useMemo(
      () => ({
        tap: {
          width: '25px',
          translateX: isChecked ? '20px' : '3px',
          transition: { duration: 0.1 },
        },
        checked: {
          translateX: '23px',
          transition: { ease: 'circInOut' },
        },
        unchecked: {
          translateX: '3px',
          transition: { ease: 'circInOut' },
        },
      }),
      [isChecked],
    );

    return (
      <MotionSwitch
        ref={switchRef}
        className={cn(
          'inline-flex items-center h-7 w-12 shrink-0 cursor-pointer bg-neutral-100 dark:bg-neutral-800 rounded-full relative data-[state=checked]:bg-neutral-950 dark:data-[state=checked]:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        whileTap="tap"
        animate={isChecked ? 'checked' : 'unchecked'}
        {...props}
      >
        {LeftIcon && (
          <motion.div
            animate={
              isChecked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{ type: 'spring', bounce: 0 }}
            className="absolute top-1/2 -translate-y-1/2 left-1.5 dark:text-neutral-500 text-neutral-400"
          >
            <LeftIcon className="size-[14px]" />
          </motion.div>
        )}

        {RightIcon && (
          <motion.div
            animate={
              isChecked ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }
            }
            transition={{ type: 'spring', bounce: 0 }}
            className="absolute top-1/2 -translate-y-1/2 right-1.5 dark:text-neutral-400 text-neutral-500"
          >
            <RightIcon className="size-[14px]" />
          </motion.div>
        )}

        <MotionThumb
          initial={{ translateX: '2px' }}
          className="size-[22px] bg-white dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400 rounded-full shadow-sm flex items-center justify-center"
          variants={thumbVariants}
        >
          {ThumbIcon && <ThumbIcon className="size-[14px]" />}
        </MotionThumb>
      </MotionSwitch>
    );
  },
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, type SwitchProps };
