'use client';

import * as React from 'react';
import { Switch as SwitchPrimitives } from '@base-ui-components/react/switch';
import { motion, type HTMLMotionProps } from 'motion/react';

import { cn } from '@/lib/utils';

type SwitchProps = Omit<
  React.ComponentProps<typeof SwitchPrimitives.Root>,
  'render'
> & {
  motionProps?: HTMLMotionProps<'button'>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  thumbIcon?: React.ReactNode;
};

function Switch({
  className,
  leftIcon,
  rightIcon,
  thumbIcon,
  onCheckedChange,
  motionProps,
  ...props
}: SwitchProps) {
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
      data-slot="switch"
      {...props}
      onCheckedChange={handleCheckedChange}
      className={cn('{{styles.switch}}', className)}
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
          data-slot="switch-left-icon"
          animate={
            isChecked ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{ type: 'spring', bounce: 0 }}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 dark:text-neutral-500 text-neutral-400',
            '{{styles.leftIcon}}',
          )}
        >
          {typeof leftIcon !== 'string' ? leftIcon : null}
        </motion.div>
      )}

      {rightIcon && (
        <motion.div
          data-slot="switch-right-icon"
          animate={
            isChecked ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }
          }
          transition={{ type: 'spring', bounce: 0 }}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 dark:text-neutral-400 text-neutral-500',
            '{{styles.rightIcon}}',
          )}
        >
          {typeof rightIcon !== 'string' ? rightIcon : null}
        </motion.div>
      )}

      <SwitchPrimitives.Thumb
        data-slot="switch-thumb"
        render={
          <motion.div
            whileTap="tab"
            className="{{styles.thumb}}"
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{ width: '{{styles.size}}', height: '{{styles.size}}' }}
            animate={
              isTapped
                ? {
                    width: '{{styles.tappedSize}}',
                    transition: { duration: 0.1 },
                  }
                : { width: '{{styles.size}}', transition: { duration: 0.1 } }
            }
          />
        }
      >
        {thumbIcon && typeof thumbIcon !== 'string' ? thumbIcon : null}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
}

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, type SwitchProps };
