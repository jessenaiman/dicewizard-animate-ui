'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  type Transition,
  type HTMLMotionProps,
} from 'motion/react';

import { useStrictContext } from '@/registry/hooks/use-strict-context';
import { Slot, type WithAsChild } from '@/registry/primitives/animate/slot';

type Side = 'top' | 'bottom' | 'left' | 'right';

type Align = 'start' | 'center' | 'end';

type TooltipData = {
  contentProps: HTMLMotionProps<'div'>;
  contentAsChild: boolean;
  rect: DOMRect;
  side: Side;
  sideOffset: number;
  align: Align;
  alignOffset: number;
  id: string;
};

type GlobalTooltipContextType = {
  showTooltip: (data: TooltipData) => void;
  hideTooltip: () => void;
  currentTooltip: TooltipData | null;
  transition: Transition;
  globalId: string;
};

const [GlobalTooltipProvider, useGlobalTooltip] =
  useStrictContext<GlobalTooltipContextType>('GlobalTooltipProvider');

type TooltipContextType = {
  props: HTMLMotionProps<'div'>;
  setProps: React.Dispatch<React.SetStateAction<HTMLMotionProps<'div'>>>;
  asChild: boolean;
  setAsChild: React.Dispatch<React.SetStateAction<boolean>>;
  side: Side;
  sideOffset: number;
  align: Align;
  alignOffset: number;
  id: string;
};

const [LocalTooltipProvider, useTooltip] = useStrictContext<TooltipContextType>(
  'LocalTooltipProvider',
);

type TooltipPosition = {
  x: number;
  y: number;
  transform: string;
  initial: { x?: number; y?: number };
};

function getTooltipPosition({
  rect,
  side,
  sideOffset,
  align,
  alignOffset,
}: {
  rect: DOMRect;
  side: Side;
  sideOffset: number;
  align: Align;
  alignOffset: number;
}): TooltipPosition {
  switch (side) {
    case 'top':
      if (align === 'start') {
        return {
          x: rect.left + alignOffset,
          y: rect.top - sideOffset,
          transform: 'translate(0, -100%)',
          initial: { y: 15 },
        };
      } else if (align === 'end') {
        return {
          x: rect.right + alignOffset,
          y: rect.top - sideOffset,
          transform: 'translate(-100%, -100%)',
          initial: { y: 15 },
        };
      } else {
        // center
        return {
          x: rect.left + rect.width / 2,
          y: rect.top - sideOffset,
          transform: 'translate(-50%, -100%)',
          initial: { y: 15 },
        };
      }
    case 'bottom':
      if (align === 'start') {
        return {
          x: rect.left + alignOffset,
          y: rect.bottom + sideOffset,
          transform: 'translate(0, 0)',
          initial: { y: -15 },
        };
      } else if (align === 'end') {
        return {
          x: rect.right + alignOffset,
          y: rect.bottom + sideOffset,
          transform: 'translate(-100%, 0)',
          initial: { y: -15 },
        };
      } else {
        // center
        return {
          x: rect.left + rect.width / 2,
          y: rect.bottom + sideOffset,
          transform: 'translate(-50%, 0)',
          initial: { y: -15 },
        };
      }
    case 'left':
      if (align === 'start') {
        return {
          x: rect.left - sideOffset,
          y: rect.top + alignOffset,
          transform: 'translate(-100%, 0)',
          initial: { x: 15 },
        };
      } else if (align === 'end') {
        return {
          x: rect.left - sideOffset,
          y: rect.bottom + alignOffset,
          transform: 'translate(-100%, -100%)',
          initial: { x: 15 },
        };
      } else {
        // center
        return {
          x: rect.left - sideOffset,
          y: rect.top + rect.height / 2,
          transform: 'translate(-100%, -50%)',
          initial: { x: 15 },
        };
      }
    case 'right':
      if (align === 'start') {
        return {
          x: rect.right + sideOffset,
          y: rect.top + alignOffset,
          transform: 'translate(0, 0)',
          initial: { x: -15 },
        };
      } else if (align === 'end') {
        return {
          x: rect.right + sideOffset,
          y: rect.bottom + alignOffset,
          transform: 'translate(0, -100%)',
          initial: { x: -15 },
        };
      } else {
        // center
        return {
          x: rect.right + sideOffset,
          y: rect.top + rect.height / 2,
          transform: 'translate(0, -50%)',
          initial: { x: -15 },
        };
      }
  }
}

type TooltipProviderProps = {
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
  transition?: Transition;
};

function TooltipProvider({
  children,
  openDelay = 700,
  closeDelay = 300,
  transition = { type: 'spring', stiffness: 300, damping: 25 },
}: TooltipProviderProps) {
  const globalId = React.useId();
  const [currentTooltip, setCurrentTooltip] =
    React.useState<TooltipData | null>(null);
  const timeoutRef = React.useRef<number>(null);
  const lastCloseTimeRef = React.useRef<number>(0);

  const showTooltip = React.useCallback(
    (data: TooltipData) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (currentTooltip !== null) {
        setCurrentTooltip(data);
        return;
      }
      const now = Date.now();
      const delay = now - lastCloseTimeRef.current < closeDelay ? 0 : openDelay;
      timeoutRef.current = window.setTimeout(
        () => setCurrentTooltip(data),
        delay,
      );
    },
    [openDelay, closeDelay, currentTooltip],
  );

  const hideTooltip = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setCurrentTooltip(null);
      lastCloseTimeRef.current = Date.now();
    }, closeDelay);
  }, [closeDelay]);

  const hideImmediate = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCurrentTooltip(null);
    lastCloseTimeRef.current = Date.now();
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', hideImmediate, true);
    return () => window.removeEventListener('scroll', hideImmediate, true);
  }, [hideImmediate]);

  return (
    <GlobalTooltipProvider
      value={{
        showTooltip,
        hideTooltip,
        currentTooltip,
        transition,
        globalId,
      }}
    >
      <LayoutGroup>{children}</LayoutGroup>
      <TooltipOverlay />
    </GlobalTooltipProvider>
  );
}

type TooltipArrowProps = {
  side: Side;
} & React.ComponentProps<'div'>;

function TooltipArrow({ side, ...props }: TooltipArrowProps) {
  return <div data-slot="tooltip-arrow" data-side={side} {...props} />;
}

type TooltipPortalProps = {
  children: React.ReactNode;
};

function TooltipPortal({ children }: TooltipPortalProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => setIsMounted(true), []);
  return isMounted ? createPortal(children, document.body) : null;
}

function TooltipOverlay() {
  const { currentTooltip, transition, globalId } = useGlobalTooltip();

  const position = React.useMemo(() => {
    if (!currentTooltip) return null;
    return getTooltipPosition({
      rect: currentTooltip.rect,
      side: currentTooltip.side,
      sideOffset: currentTooltip.sideOffset,
      align: currentTooltip.align,
      alignOffset: currentTooltip.alignOffset,
    });
  }, [currentTooltip]);

  const Component = currentTooltip?.contentAsChild ? Slot : motion.div;

  return (
    <AnimatePresence>
      {currentTooltip && currentTooltip.contentProps && position && (
        <TooltipPortal>
          <motion.div
            data-slot="tooltip-overlay"
            className="fixed z-50"
            style={{
              top: position.y,
              left: position.x,
              transform: position.transform,
            }}
          >
            <Component
              data-slot="tooltip-content"
              layoutId={`tooltip-content-${globalId}`}
              initial={{ opacity: 0, scale: 0, ...position.initial }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0, ...position.initial }}
              transition={transition}
              {...currentTooltip.contentProps}
            />
          </motion.div>
        </TooltipPortal>
      )}
    </AnimatePresence>
  );
}

type TooltipProps = {
  children: React.ReactNode;
  side?: Side;
  sideOffset?: number;
  align?: Align;
  alignOffset?: number;
};

function Tooltip({
  children,
  side = 'top',
  sideOffset = 14,
  align = 'center',
  alignOffset = 0,
}: TooltipProps) {
  const id = React.useId();
  const [props, setProps] = React.useState<HTMLMotionProps<'div'>>({});
  const [asChild, setAsChild] = React.useState(false);

  return (
    <LocalTooltipProvider
      value={{
        props,
        setProps,
        asChild,
        setAsChild,
        side,
        sideOffset,
        align,
        alignOffset,
        id,
      }}
    >
      {children}
    </LocalTooltipProvider>
  );
}

type TooltipContentProps = WithAsChild<HTMLMotionProps<'div'>>;

function TooltipContent({ asChild = false, ...props }: TooltipContentProps) {
  const { setProps, setAsChild } = useTooltip();
  React.useEffect(() => {
    setProps(props);
    setAsChild(asChild);
  }, [props, setProps, setAsChild, asChild]);
  return null;
}

type TooltipTriggerProps = WithAsChild<HTMLMotionProps<'div'>>;

function TooltipTrigger({
  ref,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  asChild = false,
  ...props
}: TooltipTriggerProps) {
  const {
    props: contentProps,
    asChild: contentAsChild,
    side,
    sideOffset,
    align,
    alignOffset,
    id,
  } = useTooltip();
  const { showTooltip, hideTooltip, currentTooltip } = useGlobalTooltip();

  const triggerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => triggerRef.current as HTMLDivElement);

  const handleOpen = React.useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    showTooltip({
      contentProps,
      contentAsChild,
      rect,
      side,
      sideOffset,
      align,
      alignOffset,
      id,
    });
  }, [
    showTooltip,
    contentProps,
    contentAsChild,
    side,
    sideOffset,
    align,
    alignOffset,
    id,
  ]);

  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e);
      handleOpen();
    },
    [handleOpen, onMouseEnter],
  );

  const handleMouseLeave = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e);
      hideTooltip();
    },
    [hideTooltip, onMouseLeave],
  );

  const handleFocus = React.useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      onFocus?.(e);
      handleOpen();
    },
    [handleOpen, onFocus],
  );

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      onBlur?.(e);
      hideTooltip();
    },
    [hideTooltip, onBlur],
  );

  const Component = asChild ? Slot : motion.div;

  return (
    <Component
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      data-state={currentTooltip?.id === id ? 'open' : 'closed'}
      data-side={side}
      data-align={align}
      data-slot="tooltip-trigger"
      {...props}
    />
  );
}

export {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipArrow,
  useGlobalTooltip,
  useTooltip,
  type TooltipProviderProps,
  type TooltipProps,
  type TooltipContentProps,
  type TooltipTriggerProps,
  type TooltipArrowProps,
  type TooltipPosition,
  type GlobalTooltipContextType,
  type TooltipContextType,
};
