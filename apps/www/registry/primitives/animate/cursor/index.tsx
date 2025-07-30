'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  type HTMLMotionProps,
  type SpringOptions,
} from 'motion/react';

import { useStrictContext } from '@/registry/hooks/use-strict-context';
import { Slot, type WithAsChild } from '@/registry/primitives/animate/slot';

type CursorContextType = {
  cursorPos: { x: number; y: number };
  isActive: boolean;
  isGlobal: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  cursorRef: React.RefObject<HTMLDivElement | null>;
};

const [LocalCursorProvider, useCursor] =
  useStrictContext<CursorContextType>('CursorContext');

type CursorProviderProps = {
  children: React.ReactNode;
  global?: boolean;
};

function CursorProvider({
  children,
  global: isGlobal = false,
}: CursorProviderProps) {
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const cursorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const id = '__cursor_none_style__';
    if (document.getElementById(id)) return;

    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      .animate-ui-cursor-none, .animate-ui-cursor-none * { cursor: none !important; }
    `;
    document.head.appendChild(style);
  }, []);

  React.useEffect(() => {
    let removeListeners: () => void;

    if (isGlobal) {
      const handlePointerMove = (e: PointerEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
        setIsActive(true);
      };

      const handlePointerOut = (e: PointerEvent | MouseEvent) => {
        if (e instanceof PointerEvent && e.relatedTarget === null) {
          setIsActive(false);
        }
      };

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') setIsActive(false);
      };

      window.addEventListener('pointermove', handlePointerMove, {
        passive: true,
      });
      window.addEventListener('pointerout', handlePointerOut, {
        passive: true,
      });
      window.addEventListener('mouseout', handlePointerOut, { passive: true });
      document.addEventListener('visibilitychange', handleVisibilityChange);

      removeListeners = () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerout', handlePointerOut);
        window.removeEventListener('mouseout', handlePointerOut);
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange,
        );
      };
    } else {
      if (!containerRef.current) return;

      const parent = containerRef.current.parentElement;
      if (!parent) return;

      if (getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
      }

      const handlePointerMove = (e: PointerEvent) => {
        const rect = parent.getBoundingClientRect();
        setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setIsActive(true);
      };

      const handlePointerOut = (e: PointerEvent | MouseEvent) => {
        if (
          e.relatedTarget === null ||
          !(parent as Node).contains(e.relatedTarget as Node)
        ) {
          setIsActive(false);
        }
      };

      parent.addEventListener('pointermove', handlePointerMove, {
        passive: true,
      });
      parent.addEventListener('pointerout', handlePointerOut, {
        passive: true,
      });
      parent.addEventListener('mouseout', handlePointerOut, { passive: true });

      removeListeners = () => {
        parent.removeEventListener('pointermove', handlePointerMove);
        parent.removeEventListener('pointerout', handlePointerOut);
        parent.removeEventListener('mouseout', handlePointerOut);
      };
    }

    return removeListeners;
  }, [isGlobal]);

  return (
    <LocalCursorProvider
      value={{ cursorPos, isActive, isGlobal, containerRef, cursorRef }}
    >
      {children}
    </LocalCursorProvider>
  );
}

type CursorContainerProps = WithAsChild<HTMLMotionProps<'div'>>;

function CursorContainer({
  ref,
  asChild = false,
  ...props
}: CursorContainerProps) {
  const { containerRef } = useCursor();
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const Component = asChild ? Slot : motion.div;

  return (
    <Component ref={containerRef} data-slot="cursor-provider" {...props} />
  );
}

type CursorProps = WithAsChild<
  HTMLMotionProps<'div'> & {
    children: React.ReactNode;
  }
>;

function Cursor({ ref, asChild = false, style, ...props }: CursorProps) {
  const { cursorPos, isActive, containerRef, cursorRef, isGlobal } =
    useCursor();
  React.useImperativeHandle(ref, () => cursorRef.current as HTMLDivElement);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  React.useEffect(() => {
    const target = isGlobal
      ? document.documentElement
      : containerRef.current?.parentElement;

    if (!target) return;

    if (isActive) {
      target.classList.add('animate-ui-cursor-none');
    } else {
      target.classList.remove('animate-ui-cursor-none');
    }

    return () => {
      target.classList.remove('animate-ui-cursor-none');
    };
  }, [isActive, isGlobal, containerRef]);

  React.useEffect(() => {
    x.set(cursorPos.x);
    y.set(cursorPos.y);
  }, [cursorPos, x, y]);

  const Component = asChild ? Slot : motion.div;

  return (
    <AnimatePresence>
      {isActive && (
        <Component
          ref={cursorRef}
          data-slot="cursor"
          style={{
            transform: 'translate(-50%,-50%)',
            pointerEvents: 'none',
            zIndex: 9999,
            position: isGlobal ? 'fixed' : 'absolute',
            top: y,
            left: x,
            ...style,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

type CursorFollowAlign =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right'
  | 'center';

type CursorFollowProps = WithAsChild<
  HTMLMotionProps<'div'> & {
    align?: CursorFollowAlign;
    sideOffset?: number;
    transition?: SpringOptions;
    children: React.ReactNode;
  }
>;

function CursorFollow({
  ref,
  asChild = false,
  sideOffset = 15,
  align = 'bottom-right',
  style,
  transition = { stiffness: 500, damping: 50, bounce: 0 },
  ...props
}: CursorFollowProps) {
  const { cursorPos, isActive, cursorRef, isGlobal } = useCursor();
  const cursorFollowRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(
    ref,
    () => cursorFollowRef.current as HTMLDivElement,
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, transition);
  const springY = useSpring(y, transition);

  const calculateOffset = React.useCallback(() => {
    const rect = cursorFollowRef.current?.getBoundingClientRect();
    const width = rect?.width ?? 0;
    const height = rect?.height ?? 0;

    let newOffset;

    switch (align) {
      case 'center':
        newOffset = { x: width / 2, y: height / 2 };
        break;
      case 'top':
        newOffset = { x: width / 2, y: height + sideOffset };
        break;
      case 'top-left':
        newOffset = { x: width + sideOffset, y: height + sideOffset };
        break;
      case 'top-right':
        newOffset = { x: -sideOffset, y: height + sideOffset };
        break;
      case 'bottom':
        newOffset = { x: width / 2, y: -sideOffset };
        break;
      case 'bottom-left':
        newOffset = { x: width + sideOffset, y: -sideOffset };
        break;
      case 'bottom-right':
        newOffset = { x: -sideOffset, y: -sideOffset };
        break;
      case 'left':
        newOffset = { x: width + sideOffset, y: height / 2 };
        break;
      case 'right':
        newOffset = { x: -sideOffset, y: height / 2 };
        break;
      default:
        newOffset = { x: 0, y: 0 };
    }

    return newOffset;
  }, [align, sideOffset]);

  React.useEffect(() => {
    const offset = calculateOffset();
    const cursorRect = cursorRef.current?.getBoundingClientRect();
    const cursorWidth = cursorRect?.width ?? 20;
    const cursorHeight = cursorRect?.height ?? 20;

    x.set(cursorPos.x - offset.x + cursorWidth / 2);
    y.set(cursorPos.y - offset.y + cursorHeight / 2);
  }, [calculateOffset, cursorPos, cursorRef, x, y]);

  const Component = asChild ? Slot : motion.div;

  return (
    <AnimatePresence>
      {isActive && (
        <Component
          ref={cursorFollowRef}
          data-slot="cursor-follow"
          style={{
            transform: 'translate(-50%,-50%)',
            pointerEvents: 'none',
            zIndex: 9998,
            position: isGlobal ? 'fixed' : 'absolute',
            top: springY,
            left: springX,
            ...style,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

export {
  CursorProvider,
  Cursor,
  CursorContainer,
  CursorFollow,
  useCursor,
  type CursorProviderProps,
  type CursorProps,
  type CursorContainerProps,
  type CursorFollowProps,
  type CursorFollowAlign,
  type CursorContextType,
};
