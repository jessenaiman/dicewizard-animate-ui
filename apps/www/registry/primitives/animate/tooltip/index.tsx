'use client';

import * as React from 'react';
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  type Transition,
  type HTMLMotionProps,
} from 'motion/react';

import { useStrictContext } from '@/registry/hooks/use-strict-context';
import { Slot, type WithAsChild } from '@/registry/primitives/animate/slot';

import { FloatingPortal } from '@floating-ui/react';
import {
  useFloating,
  autoUpdate,
  offset as floatingOffset,
  flip,
  shift,
  arrow as floatingArrow,
} from '@floating-ui/react';

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
  setReferenceEl: (el: HTMLElement | null) => void;
  referenceElRef: React.RefObject<HTMLElement | null>;
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

type TooltipPosition = { x: number; y: number };

type TooltipProviderProps = {
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
  transition?: Transition;
};

function initialFromSide(side: Side): Partial<Record<'x' | 'y', number>> {
  if (side === 'top') return { y: 15 };
  if (side === 'bottom') return { y: -15 };
  if (side === 'left') return { x: 15 };
  return { x: -15 };
}

const oppositeSide: Record<Side, Side> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
} as const;

function TooltipProvider({
  children,
  openDelay = 700,
  closeDelay = 300,
  transition = { type: 'spring', stiffness: 300, damping: 25 },
}: TooltipProviderProps) {
  const globalId = React.useId();
  const [currentTooltip, setCurrentTooltip] =
    React.useState<TooltipData | null>(null);
  const timeoutRef = React.useRef<number | null>(null);
  const lastCloseTimeRef = React.useRef<number>(0);
  const referenceElRef = React.useRef<HTMLElement | null>(null);

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

  const setReferenceEl = React.useCallback((el: HTMLElement | null) => {
    referenceElRef.current = el;
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', hideImmediate, true);
    window.addEventListener('resize', hideImmediate, true);
    return () => {
      window.removeEventListener('scroll', hideImmediate, true);
      window.removeEventListener('resize', hideImmediate, true);
    };
  }, [hideImmediate]);

  return (
    <GlobalTooltipProvider
      value={{
        showTooltip,
        hideTooltip,
        currentTooltip,
        transition,
        globalId,
        setReferenceEl,
        referenceElRef,
      }}
    >
      <LayoutGroup>{children}</LayoutGroup>
      <TooltipOverlay />
    </GlobalTooltipProvider>
  );
}

type RenderedTooltipContextType = {
  side: Side;
  align: Align;
  arrowX: number | null;
  arrowY: number | null;
};

const [RenderedTooltipProvider, useRenderedTooltip] =
  useStrictContext<RenderedTooltipContextType>('RenderedTooltipContext');

type TooltipArrowProps = React.ComponentProps<'div'> & {
  side?: Side;
  sideOffset?: number;
};

function TooltipArrow({
  side: sideOverride,
  sideOffset = 0,
  style,
  ...props
}: TooltipArrowProps) {
  const rendered = useRenderedTooltip();

  const effectiveSide: Side | undefined =
    sideOverride ?? (rendered?.side && oppositeSide[rendered.side]);
  const effectiveAlign: Align | undefined = rendered?.align;

  const centered: Record<Side, React.CSSProperties> = {
    top: {
      left: rendered.arrowX ?? '50%',
      transform: rendered.arrowX != null ? 'translateX(0)' : 'translateX(-50%)',
      top: -sideOffset,
    },
    bottom: {
      left: rendered.arrowX ?? '50%',
      transform: rendered.arrowX != null ? 'translateX(0)' : 'translateX(-50%)',
      bottom: -sideOffset,
    },
    left: {
      top: rendered.arrowY ?? '50%',
      transform: rendered.arrowY != null ? 'translateY(0)' : 'translateY(-50%)',
      left: -sideOffset,
    },
    right: {
      top: rendered.arrowY ?? '50%',
      transform: rendered.arrowY != null ? 'translateY(0)' : 'translateY(-50%)',
      right: -sideOffset,
    },
  };

  return (
    <div
      data-slot="tooltip-arrow"
      data-side={effectiveSide}
      data-align={effectiveAlign}
      style={{
        position: 'absolute',
        ...(effectiveSide ? centered[effectiveSide] : {}),
        ...style,
      }}
      {...props}
    />
  );
}

type TooltipPortalProps = React.ComponentProps<typeof FloatingPortal>;
function TooltipPortal(props: TooltipPortalProps) {
  return <FloatingPortal {...props} />;
}

function TooltipOverlay() {
  const { currentTooltip, transition, globalId, referenceElRef } =
    useGlobalTooltip();

  const [rendered, setRendered] = React.useState<{
    data: TooltipData | null;
    open: boolean;
  }>({ data: null, open: false });

  const arrowRef = React.useRef<HTMLDivElement | null>(null);

  const side = rendered.data?.side ?? 'top';
  const align = rendered.data?.align ?? 'center';

  const { refs, x, y, strategy, middlewareData, update } = useFloating({
    placement: align === 'center' ? side : (`${side}-${align}` as any),
    whileElementsMounted: autoUpdate,
    middleware: [
      floatingOffset({
        mainAxis: rendered.data?.sideOffset ?? 0,
        crossAxis: rendered.data?.alignOffset ?? 0,
      }),
      flip(),
      shift({ padding: 8 }),
      floatingArrow({ element: arrowRef }),
    ],
  });

  React.useEffect(() => {
    if (currentTooltip) {
      setRendered({ data: currentTooltip, open: true });
    } else {
      setRendered((p) => (p.data ? { ...p, open: false } : p));
    }
  }, [currentTooltip]);

  React.useLayoutEffect(() => {
    if (referenceElRef.current) {
      refs.setReference(referenceElRef.current);
      // force un compute synchrone juste après avoir fixé la ref
      // pour éviter tout frame à (0,0)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      update();
    }
  }, [referenceElRef, refs, update, rendered.data]);

  // prêt à rendre seulement quand Floating UI a calculé une position
  const ready = x != null && y != null;

  const Component = rendered.data?.contentAsChild ? Slot : motion.div;

  return (
    <AnimatePresence>
      {rendered.data && ready && (
        <TooltipPortal>
          <div
            ref={refs.setFloating}
            data-slot="tooltip-overlay"
            data-side={rendered.data.side}
            data-align={rendered.data.align}
            style={{
              position: strategy,
              top: 0,
              left: 0,
              zIndex: 50,
              transform: `translate3d(${x!}px, ${y!}px, 0)`,
            }}
          >
            <RenderedTooltipProvider
              value={{
                side: rendered.data.side,
                align: rendered.data.align,
                arrowX: (middlewareData.arrow as any)?.x ?? null,
                arrowY: (middlewareData.arrow as any)?.y ?? null,
              }}
            >
              <Component
                data-slot="tooltip-content"
                data-side={rendered.data.side}
                data-align={rendered.data.align}
                layoutId={`tooltip-content-${globalId}`}
                initial={{
                  opacity: 0,
                  scale: 0,
                  ...initialFromSide(rendered.data.side),
                }}
                animate={
                  rendered.open
                    ? { opacity: 1, scale: 1, x: 0, y: 0 }
                    : {
                        opacity: 0,
                        scale: 0,
                        ...initialFromSide(rendered.data.side),
                      }
                }
                exit={{
                  opacity: 0,
                  scale: 0,
                  ...initialFromSide(rendered.data.side),
                }}
                onAnimationComplete={() => {
                  if (!rendered.open) setRendered({ data: null, open: false });
                }}
                transition={transition}
                {...rendered.data.contentProps}
                style={{
                  position: 'relative',
                  ...(rendered.data.contentProps?.style || {}),
                }}
              />
              <div
                ref={arrowRef}
                style={{
                  position: 'absolute',
                  width: 0,
                  height: 0,
                  pointerEvents: 'none',
                }}
              />
            </RenderedTooltipProvider>
          </div>
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

function shallowEqualWithoutChildren(
  a?: HTMLMotionProps<'div'>,
  b?: HTMLMotionProps<'div'>,
) {
  if (a === b) return true;
  if (!a || !b) return false;
  const keysA = Object.keys(a).filter((k) => k !== 'children');
  const keysB = Object.keys(b).filter((k) => k !== 'children');
  if (keysA.length !== keysB.length) return false;
  for (const k of keysA) {
    // @ts-expect-error index
    if (a[k] !== b[k]) return false;
  }
  return true;
}

function TooltipContent({ asChild = false, ...props }: TooltipContentProps) {
  const { setProps, setAsChild } = useTooltip();
  const lastPropsRef = React.useRef<HTMLMotionProps<'div'> | undefined>(
    undefined,
  );

  React.useEffect(() => {
    if (!shallowEqualWithoutChildren(lastPropsRef.current, props)) {
      lastPropsRef.current = props;
      setProps(props);
    }
  }, [props, setProps]);

  React.useEffect(() => {
    setAsChild(asChild);
  }, [asChild, setAsChild]);

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
  const { showTooltip, hideTooltip, currentTooltip, setReferenceEl } =
    useGlobalTooltip();

  const triggerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => triggerRef.current as HTMLDivElement);

  const handleOpen = React.useCallback(() => {
    if (!triggerRef.current) return;
    setReferenceEl(triggerRef.current);
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
    setReferenceEl,
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
