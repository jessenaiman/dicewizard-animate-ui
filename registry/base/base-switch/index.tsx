'use client';

import * as React from 'react';
import { Switch as SwitchPrimitives } from '@base-ui-components/react/switch';
import { motion, type HTMLMotionProps } from 'motion/react';

import { cn } from '@/lib/utils';

type SwitchProps = Omit<
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
  'render'
> & {
  motionProps?: HTMLMotionProps<'button'>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  thumbIcon?: React.ReactNode;
};

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      leftIcon,
      rightIcon,
      thumbIcon,
      onCheckedChange,
      motionProps,
      ...props
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = React.useState(
      props?.checked ?? props?.defaultChecked ?? false,
    );
    const [isTapped, setIsTapped] = React.useState(false);

    React.useEffect(() => {
      if (props?.checked !== undefined) setIsChecked(props.checked);
    }, [props?.checked]);

    const handleCheckedChange = React.useCallback(
      (checked: boolean, event: Event) => {
        setIsChecked(checked);
        onCheckedChange?.(checked, event);
      },
      [onCheckedChange],
    );

    return (
      <SwitchPrimitives.Root
        {...props}
        ref={ref}
        onCheckedChange={handleCheckedChange}
        className={cn(
          'relative flex p-[3px] h-6 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary data-[unchecked]:bg-input data-[checked]:justify-end data-[unchecked]:justify-start',
          className,
        )}
        render={
          <motion.button
            whileTap="tap"
            initial={false}
            onTapStart={() => setIsTapped(true)}
            onTapCancel={() => setIsTapped(false)}
            onTap={() => setIsTapped(false)}
            {...motionProps}
          />
        }
      >
        {leftIcon && (
          <motion.div
            animate={
              isChecked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{ type: 'spring', bounce: 0 }}
            className="absolute [&_svg]:size-3 left-1 top-1/2 -translate-y-1/2 dark:text-neutral-500 text-neutral-400"
          >
            {typeof leftIcon !== 'string' ? leftIcon : null}
          </motion.div>
        )}

        {rightIcon && (
          <motion.div
            animate={
              isChecked ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }
            }
            transition={{ type: 'spring', bounce: 0 }}
            className="absolute [&_svg]:size-3 right-1 top-1/2 -translate-y-1/2 dark:text-neutral-400 text-neutral-500"
          >
            {typeof rightIcon !== 'string' ? rightIcon : null}
          </motion.div>
        )}

        <SwitchPrimitives.Thumb
          render={
            <motion.div
              whileTap="tab"
              className={cn(
                'relative z-[1] [&_svg]:size-3 flex items-center justify-center rounded-full bg-background shadow-lg ring-0 dark:text-neutral-400 text-neutral-500',
              )}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                width: 18,
                height: 18,
              }}
              animate={
                isTapped
                  ? { width: 21, transition: { duration: 0.1 } }
                  : { width: 18, transition: { duration: 0.1 } }
              }
            />
          }
        >
          {thumbIcon && typeof thumbIcon !== 'string' ? thumbIcon : null}
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>
    );
  },
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, type SwitchProps };
