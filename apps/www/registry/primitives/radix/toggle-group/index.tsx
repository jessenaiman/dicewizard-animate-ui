'use client';

import * as React from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { type HTMLMotionProps, motion } from 'motion/react';

import {
  Highlight,
  HighlightItem,
  type HighlightItemProps,
  type HighlightProps,
} from '@/registry/primitives/effects/highlight';
import { useStrictContext } from '@/registry/hooks/use-strict-context';
import { useControlledState } from '@/registry/hooks/use-controlled-state';

type ToggleGroupContextType = {
  value: string | string[] | undefined;
  setValue: (value: string | string[] | undefined) => void;
};

const [ToggleGroupProvider, useToggleGroup] =
  useStrictContext<ToggleGroupContextType>('ToggleGroupContext');

type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive.Root>;

function ToggleGroup(props: ToggleGroupProps) {
  const [value, setValue] = useControlledState<string | string[] | undefined>({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onValueChange as (
      value: string | string[] | undefined,
    ) => void,
  });

  return (
    <ToggleGroupProvider value={{ value, setValue }}>
      <ToggleGroupPrimitive.Root
        data-slot="toggle-group"
        {...props}
        onValueChange={setValue}
      />
    </ToggleGroupProvider>
  );
}

type ToggleGroupItemProps = Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive.Item>,
  'asChild'
> &
  HTMLMotionProps<'button'>;

function ToggleGroupItem({ value, disabled, ...props }: ToggleGroupItemProps) {
  return (
    <ToggleGroupPrimitive.Item value={value} disabled={disabled} asChild>
      <motion.button
        data-slot="toggle-group-item"
        whileTap={{ scale: 0.9 }}
        {...props}
      />
    </ToggleGroupPrimitive.Item>
  );
}

type ToggleGroupHighlightProps = Omit<HighlightProps, 'controlledItems'>;

function ToggleGroupHighlight({
  transition = { type: 'spring', stiffness: 200, damping: 25 },
  ...props
}: ToggleGroupHighlightProps) {
  const { value } = useToggleGroup();

  return (
    <Highlight
      data-slot="toggle-group-highlight"
      controlledItems
      value={typeof value === 'string' ? value : undefined}
      exitDelay={0}
      transition={transition}
      {...props}
    />
  );
}

type ToggleGroupHighlightItemProps = HighlightItemProps;

function ToggleGroupHighlightItem(props: ToggleGroupHighlightItemProps) {
  return <HighlightItem data-slot="toggle-group-highlight-item" {...props} />;
}

export {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupHighlight,
  ToggleGroupHighlightItem,
  type ToggleGroupProps,
  type ToggleGroupItemProps,
  type ToggleGroupHighlightProps,
  type ToggleGroupHighlightItemProps,
};
