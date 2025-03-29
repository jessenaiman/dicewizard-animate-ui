'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { motion, type HTMLMotionProps } from 'motion/react';

import { cn } from '@/lib/utils';

const baseContainerWidth = 40;
const baseContainerHeight = 24;
const baseMargin = 2.5;
const baseIconSize = baseContainerHeight / 2;
const baseIconOffset = baseIconSize / 3;

const MotionSwitch = motion.create(SwitchPrimitives.Root);
const MotionThumb = motion.create(SwitchPrimitives.Thumb);

type SwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
> &
  HTMLMotionProps<'button'> & {
    leftIcon?: React.ElementType;
    rightIcon?: React.ElementType;
    thumbIcon?: React.ElementType;
    width?: number;
    height?: number;
    margin?: number;
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
      width = baseContainerWidth,
      height = baseContainerHeight,
      margin = baseMargin,
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

    const marginSize = (baseMargin / baseContainerHeight) * height;
    const thumbSize = height - 2 * marginSize;
    const checkedTranslateX = width - thumbSize - marginSize;
    const uncheckedTranslateX = marginSize;

    const tappedWidth = thumbSize + 3 * (height / baseContainerHeight);
    const tappedCheckedTranslateX = checkedTranslateX - marginSize;

    const iconSize = (baseIconSize / baseContainerHeight) * height;
    const iconOffset = (baseIconOffset / baseContainerHeight) * height;

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
          width: tappedWidth + 'px',
          translateX: isChecked
            ? tappedCheckedTranslateX + 'px'
            : uncheckedTranslateX + 'px',
          transition: { duration: 0.1 },
        },
        checked: {
          translateX: checkedTranslateX + 'px',
          transition: { ease: 'circInOut' },
        },
        unchecked: {
          translateX: uncheckedTranslateX + 'px',
          transition: { ease: 'circInOut' },
        },
      }),
      [
        isChecked,
        tappedWidth,
        tappedCheckedTranslateX,
        uncheckedTranslateX,
        checkedTranslateX,
      ],
    );

    return (
      <MotionSwitch
        ref={switchRef}
        style={{ width: width + 'px', height: height + 'px' }}
        className={cn(
          'inline-flex items-center shrink-0 cursor-pointer bg-neutral-100 dark:bg-neutral-800 rounded-full relative data-[state=checked]:bg-neutral-950 dark:data-[state=checked]:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
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
            className="absolute top-1/2 -translate-y-1/2 dark:text-neutral-500 text-neutral-400"
            style={{ left: iconOffset + 'px' }}
          >
            <LeftIcon
              style={{ width: iconSize + 'px', height: iconSize + 'px' }}
            />
          </motion.div>
        )}

        {RightIcon && (
          <motion.div
            animate={
              isChecked ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }
            }
            transition={{ type: 'spring', bounce: 0 }}
            className="absolute top-1/2 -translate-y-1/2 dark:text-neutral-400 text-neutral-500"
            style={{ right: iconOffset + 'px' }}
          >
            <RightIcon
              style={{ width: iconSize + 'px', height: iconSize + 'px' }}
            />
          </motion.div>
        )}

        <MotionThumb
          initial={{ translateX: uncheckedTranslateX + 'px' }}
          style={{
            width: thumbSize + 'px',
            height: thumbSize + 'px',
          }}
          className="bg-white dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400 rounded-full shadow-sm flex items-center justify-center"
          variants={thumbVariants}
        >
          {ThumbIcon && (
            <ThumbIcon
              style={{ width: iconSize + 'px', height: iconSize + 'px' }}
            />
          )}
        </MotionThumb>
      </MotionSwitch>
    );
  },
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, type SwitchProps };
