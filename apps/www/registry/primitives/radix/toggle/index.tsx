'use client';

import * as React from 'react';
import { Toggle as TogglePrimitive } from 'radix-ui';
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react';

import { getStrictContext } from '@/registry/hooks/use-strict-context';
import { useControlledState } from '@/registry/hooks/use-controlled-state';

type ToggleContextType = {
  isPressed: boolean;
  setIsPressed: (isPressed: boolean) => void;
};

const [ToggleProvider, useToggle] =
  getStrictContext<ToggleContextType>('ToggleContext');

type ToggleProps = Omit<
  React.ComponentProps<typeof TogglePrimitive.Root>,
  'asChild'
> &
  HTMLMotionProps<'button'>;

function Toggle({
  pressed,
  defaultPressed,
  onPressedChange,
  disabled,
  ...props
}: ToggleProps) {
  const [isPressed, setIsPressed] = useControlledState({
    value: pressed,
    defaultValue: defaultPressed,
    onChange: onPressedChange,
  });

  return (
    <ToggleProvider value={{ isPressed, setIsPressed }}>
      <TogglePrimitive.Root
        pressed={pressed}
        defaultPressed={defaultPressed}
        onPressedChange={setIsPressed}
        disabled={disabled}
        asChild
      >
        <motion.button
          data-slot="toggle"
          whileTap={{ scale: 0.9 }}
          {...props}
        />
      </TogglePrimitive.Root>
    </ToggleProvider>
  );
}

type ToggleHighlightProps = HTMLMotionProps<'div'>;

function ToggleHighlight({ style, ...props }: ToggleHighlightProps) {
  const { isPressed } = useToggle();

  return (
    <AnimatePresence>
      {isPressed && (
        <motion.div
          data-slot="toggle-highlight"
          style={{ position: 'absolute', zIndex: 0, inset: 0, ...style }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

type ToggleItemProps = HTMLMotionProps<'div'>;

function ToggleItem({ style, ...props }: ToggleItemProps) {
  return (
    <motion.div
      data-slot="toggle-item"
      style={{ position: 'relative', zIndex: 1, ...style }}
      {...props}
    />
  );
}

export {
  Toggle,
  ToggleHighlight,
  ToggleItem,
  useToggle,
  type ToggleProps,
  type ToggleHighlightProps,
  type ToggleItemProps,
  type ToggleContextType,
};
