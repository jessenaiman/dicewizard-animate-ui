'use client';

import * as React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react';

import { useStrictContext } from '@/registry/hooks/use-strict-context';
import { useControlledState } from '@/registry/hooks/use-controlled-state';

type TooltipContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const [LocalTooltipProvider, useTooltip] =
  useStrictContext<TooltipContextType>('TooltipContext');

type Side = 'top' | 'bottom' | 'left' | 'right';

const getInitialPosition = (side: Side, offset: number) => {
  const axisMap = { top: 'y', bottom: 'y', left: 'x', right: 'x' } as const;
  const sign = side === 'top' || side === 'left' ? 1 : -1;
  return { [axisMap[side]]: sign * offset };
};

type TooltipProviderProps = React.ComponentProps<
  typeof TooltipPrimitive.Provider
>;

function TooltipProvider(props: TooltipProviderProps) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" {...props} />;
}

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

function Tooltip(props: TooltipProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
  });

  return (
    <LocalTooltipProvider value={{ isOpen, setIsOpen }}>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        {...props}
        onOpenChange={setIsOpen}
      />
    </LocalTooltipProvider>
  );
}

type TooltipTriggerProps = React.ComponentProps<
  typeof TooltipPrimitive.Trigger
>;

function TooltipTrigger(props: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

type TooltipPortalProps = Omit<
  React.ComponentProps<typeof TooltipPrimitive.Portal>,
  'forceMount'
>;

function TooltipPortal(props: TooltipPortalProps) {
  const { isOpen } = useTooltip();

  return (
    <AnimatePresence>
      {isOpen && (
        <TooltipPrimitive.Portal
          forceMount
          data-slot="tooltip-portal"
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

type TooltipContentProps = Omit<
  React.ComponentProps<typeof TooltipPrimitive.Content>,
  'forceMount' | 'asChild'
> &
  HTMLMotionProps<'div'> & {
    transitionOffset?: number;
  };

function TooltipContent({
  onEscapeKeyDown,
  onPointerDownOutside,
  side = 'top',
  sideOffset = 4,
  align,
  alignOffset,
  avoidCollisions,
  collisionBoundary,
  collisionPadding,
  arrowPadding,
  sticky,
  hideWhenDetached,
  transition = { type: 'spring', stiffness: 300, damping: 25 },
  transitionOffset = 15,
  ...props
}: TooltipContentProps) {
  const initialPosition = getInitialPosition(side, transitionOffset);

  return (
    <TooltipPrimitive.Content
      asChild
      forceMount
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      avoidCollisions={avoidCollisions}
      collisionBoundary={collisionBoundary}
      collisionPadding={collisionPadding}
      arrowPadding={arrowPadding}
      sticky={sticky}
      hideWhenDetached={hideWhenDetached}
    >
      <motion.div
        key="popover-content"
        data-slot="popover-content"
        initial={{ opacity: 0, scale: 0.5, ...initialPosition }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, ...initialPosition }}
        transition={transition}
        {...props}
      />
    </TooltipPrimitive.Content>
  );
}

type TooltipArrowProps = React.ComponentProps<typeof TooltipPrimitive.Arrow>;

function TooltipArrow(props: TooltipArrowProps) {
  return <TooltipPrimitive.Arrow data-slot="tooltip-arrow" {...props} />;
}

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipArrow,
  useTooltip,
  type TooltipProviderProps,
  type TooltipProps,
  type TooltipTriggerProps,
  type TooltipPortalProps,
  type TooltipContentProps,
  type TooltipArrowProps,
  type TooltipContextType,
};
