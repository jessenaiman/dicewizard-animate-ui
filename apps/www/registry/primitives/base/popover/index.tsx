'use client';

import * as React from 'react';
import { Popover as PopoverPrimitive } from '@base-ui-components/react/popover';
import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Transition,
} from 'motion/react';

import { useStrictContext } from '@/registry/hooks/use-strict-context';
import { useControlledState } from '@/registry/hooks/use-controlled-state';

type PopoverContextType = {
  isOpen: boolean;
  setIsOpen: (
    isOpen: boolean,
    event: Event | undefined,
    reason: PopoverPrimitive.Root.OpenChangeReason | undefined,
  ) => void;
};

const [PopoverProvider, usePopover] =
  useStrictContext<PopoverContextType>('PopoverContext');

type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;

function Popover(props: PopoverProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
  });

  return (
    <PopoverProvider value={{ isOpen, setIsOpen }}>
      <PopoverPrimitive.Root
        data-slot="popover"
        {...props}
        onOpenChange={setIsOpen}
      />
    </PopoverProvider>
  );
}

type PopoverTriggerProps = React.ComponentProps<
  typeof PopoverPrimitive.Trigger
>;

function PopoverTrigger(props: PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

type PopoverContentProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Positioner>,
  'render'
> & {
  transition?: Transition;
  popupProps?: typeof PopoverPrimitive.Popup;
  motionProps?: HTMLMotionProps<'div'>;
  positionerClassName?: string;
};

function PopoverContent({
  children,
  align = 'center',
  side = 'bottom',
  sideOffset = 4,
  className,
  positionerClassName,
  popupProps,
  motionProps,
  transition = { type: 'spring', stiffness: 300, damping: 25 },
  ...props
}: PopoverContentProps) {
  const { isOpen } = usePopover();
  const initialPosition = getInitialPosition(side);

  return (
    <AnimatePresence>
      {isOpen && (
        <PopoverPrimitive.Portal keepMounted data-slot="popover-portal">
          <PopoverPrimitive.Positioner
            data-slot="popover-positioner"
            align={align}
            side={side}
            sideOffset={sideOffset}
            className={cn('z-50', positionerClassName)}
            {...props}
          >
            <PopoverPrimitive.Popup
              data-slot="popover-popup"
              {...popupProps}
              className={cn(
                'w-72 rounded-lg border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
                className,
              )}
              render={
                <motion.div
                  key="popover-content"
                  initial={{ opacity: 0, scale: 0.5, ...initialPosition }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, ...initialPosition }}
                  transition={transition}
                  {...motionProps}
                />
              }
            >
              {children}
            </PopoverPrimitive.Popup>
          </PopoverPrimitive.Positioner>
        </PopoverPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  usePopover,
  type PopoverContextType,
  type PopoverProps,
  type PopoverTriggerProps,
  type PopoverContentProps,
  type Side,
  type Align,
};
