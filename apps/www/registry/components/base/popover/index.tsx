import * as React from 'react';

import {
  Popover as PopoverPrimitive,
  PopoverTrigger as PopoverTriggerPrimitive,
  PopoverPositioner as PopoverPositionerPrimitive,
  PopoverPopup as PopoverPopupPrimitive,
  PopoverPortal as PopoverPortalPrimitive,
  PopoverClose as PopoverClosePrimitive,
  type PopoverProps as PopoverPrimitiveProps,
  type PopoverTriggerProps as PopoverTriggerPrimitiveProps,
  type PopoverPositionerProps as PopoverPositionerPrimitiveProps,
  type PopoverPopupProps as PopoverPopupPrimitiveProps,
  type PopoverCloseProps as PopoverClosePrimitiveProps,
} from '@/registry/primitives/base/popover';
import { cn } from '@workspace/ui/lib/utils';

type PopoverProps = PopoverPrimitiveProps;

function Popover(props: PopoverProps) {
  return <PopoverPrimitive {...props} />;
}

type PopoverTriggerProps = PopoverTriggerPrimitiveProps;

function PopoverTrigger(props: PopoverTriggerProps) {
  return <PopoverTriggerPrimitive {...props} />;
}

type PopoverPanelProps = PopoverPositionerPrimitiveProps &
  PopoverPopupPrimitiveProps;

function PopoverPanel({
  className,
  align = 'center',
  sideOffset = 4,
  initialFocus,
  finalFocus,
  style,
  children,
  ...props
}: PopoverPanelProps) {
  return (
    <PopoverPortalPrimitive>
      <PopoverPositionerPrimitive
        align={align}
        sideOffset={sideOffset}
        className="z-50"
        {...props}
      >
        <PopoverPopupPrimitive
          initialFocus={initialFocus}
          finalFocus={finalFocus}
          className={cn(
            'bg-popover text-popover-foreground w-72 rounded-md border p-4 shadow-md outline-hidden origin-(--transform-origin)',
            className,
          )}
          style={style}
        >
          {children}
        </PopoverPopupPrimitive>
      </PopoverPositionerPrimitive>
    </PopoverPortalPrimitive>
  );
}

type PopoverCloseProps = PopoverClosePrimitiveProps;

function PopoverClose(props: PopoverCloseProps) {
  return <PopoverClosePrimitive {...props} />;
}

export {
  Popover,
  PopoverTrigger,
  PopoverPanel,
  PopoverClose,
  type PopoverProps,
  type PopoverTriggerProps,
  type PopoverPanelProps,
  type PopoverCloseProps,
};
