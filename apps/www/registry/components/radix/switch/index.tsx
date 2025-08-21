import * as React from 'react';

import {
  Switch as SwitchPrimitive,
  SwitchThumb as SwitchThumbPrimitive,
  type SwitchProps as SwitchPrimitiveProps,
} from '@/registry/primitives/radix/switch';
import { cn } from '@workspace/ui/lib/utils';

type SwitchProps = SwitchPrimitiveProps & {
  pressedWidth?: number;
};

function Switch({ className, pressedWidth = 19, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive
      className={cn(
        'peer focus-visible:border-ring focus-visible:ring-ring/50 flex h-5 w-8 px-px shrink-0 items-center justify-start rounded-full border border-transparent shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80 data-[state=checked]:justify-end',
        className,
      )}
      {...props}
    >
      <SwitchThumbPrimitive
        className={cn(
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0',
        )}
        pressedAnimation={{ width: pressedWidth }}
      />
    </SwitchPrimitive>
  );
}

export { Switch, type SwitchProps };
