'use client';

import * as React from 'react';
import { Switch as SwitchPrimitive } from '@headlessui/react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

type SwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitive<typeof motion.button>
> & {
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  thumbIcon?: React.ElementType;
  onCheckedChange?: (checked: boolean) => void;
};

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      thumbIcon: ThumbIcon,
      onChange,
      as = motion.button,
      ...props
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = React.useState(
      props.checked ?? props.defaultChecked ?? false,
    );
    const [isTapped, setIsTapped] = React.useState(false);

    React.useEffect(() => {
      setIsChecked(props.checked ?? props.defaultChecked ?? false);
    }, [props.checked, props.defaultChecked]);

    const handleChange = React.useCallback(
      (checked: boolean) => {
        setIsChecked(checked);
        onChange?.(checked);
      },
      [onChange],
    );

    return (
      <SwitchPrimitive
        checked={isChecked}
        onChange={handleChange}
        ref={ref}
        className={cn(
          'relative flex p-[3px] h-6 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary bg-input data-[checked]:justify-end justify-start',
          className,
        )}
        as={as}
        whileTap="tap"
        initial={false}
        onTapStart={() => setIsTapped(true)}
        onTapCancel={() => setIsTapped(false)}
        onTap={() => setIsTapped(false)}
        {...props}
      >
        {LeftIcon && (
          <motion.div
            animate={
              isChecked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{ type: 'spring', bounce: 0 }}
            className="absolute left-1 top-1/2 -translate-y-1/2 dark:text-neutral-500 text-neutral-400"
          >
            <LeftIcon className="size-3" />
          </motion.div>
        )}

        {RightIcon && (
          <motion.div
            animate={
              isChecked ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }
            }
            transition={{ type: 'spring', bounce: 0 }}
            className="absolute right-1 top-1/2 -translate-y-1/2 dark:text-neutral-400 text-neutral-500"
          >
            <RightIcon className="size-3" />
          </motion.div>
        )}

        <motion.span
          whileTap="tab"
          className={cn(
            'relative z-[1] flex items-center justify-center rounded-full bg-background shadow-lg ring-0 dark:text-neutral-400 text-neutral-500',
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
        >
          {ThumbIcon && <ThumbIcon className="size-3" />}
        </motion.span>
      </SwitchPrimitive>
    );
  },
);

Switch.displayName = 'Switch';

export { Switch, type SwitchProps };
