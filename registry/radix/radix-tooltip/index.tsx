'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { AnimatePresence, motion, type Transition } from 'motion/react';

import { cn } from '@/lib/utils';

type TooltipProviderProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Provider
>;

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipContext = React.createContext<{ isOpen: boolean }>({
  isOpen: false,
});

type TooltipProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Root
>;

const Tooltip: React.FC<TooltipProps> = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = React.useState(
    props?.open ?? props?.defaultOpen ?? false,
  );

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      setIsOpen(open);
      props.onOpenChange?.(open);
    },
    [props],
  );

  return (
    <TooltipContext.Provider value={{ isOpen }}>
      <TooltipPrimitive.Root {...props} onOpenChange={handleOpenChange}>
        {children}
      </TooltipPrimitive.Root>
    </TooltipContext.Provider>
  );
};

type TooltipTriggerProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Trigger
>;

const TooltipTrigger = TooltipPrimitive.Trigger;

type TooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
> & {
  transition?: Transition;
};

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(
  (
    {
      className,
      sideOffset = 4,
      transition = { type: 'spring', stiffness: 300, damping: 20 },
      children,
      ...props
    },
    ref,
  ) => {
    const { isOpen } = React.useContext(TooltipContext);

    return (
      <AnimatePresence>
        {isOpen && (
          <TooltipPrimitive.Portal forceMount>
            <TooltipPrimitive.Content
              forceMount
              sideOffset={sideOffset}
              className="z-50"
              {...props}
              ref={ref}
            >
              <motion.div
                key="tooltip"
                initial={{ opacity: 0, scale: 0, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 25 }}
                transition={transition}
                className={cn(
                  'relative overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
                  className,
                )}
              >
                {children}
              </motion.div>
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        )}
      </AnimatePresence>
    );
  },
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  type TooltipProps,
  type TooltipTriggerProps,
  type TooltipContentProps,
  type TooltipProviderProps,
};
