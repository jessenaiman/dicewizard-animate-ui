'use client';

import * as React from 'react';
import {
  AnimatePresence,
  useInView,
  type HTMLMotionProps,
  type UseInViewOptions,
  type Variant,
} from 'motion/react';
import { Slot } from '../../animate/slot';

type SlideDirection = 'up' | 'down' | 'left' | 'right';
type Slide =
  | {
      direction?: SlideDirection;
      offset?: number;
    }
  | boolean;

type Fade = { initialOpacity?: number; opacity?: number } | boolean;

type Zoom =
  | {
      initialScale?: number;
      scale?: number;
    }
  | boolean;

type EffectProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
  delay?: number;
  inView?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  inViewOnce?: boolean;
  blur?: string | boolean;
  slide?: Slide;
  fade?: Fade;
  zoom?: Zoom;
};

function Effect({
  ref,
  transition = { type: 'spring', stiffness: 200, damping: 20 },
  delay = 0,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  blur = false,
  slide = false,
  fade = false,
  zoom = false,
  ...props
}: EffectProps) {
  const localRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;

  const hiddenVariant: Variant = {};
  const visibleVariant: Variant = {};

  if (slide) {
    const offset = typeof slide === 'boolean' ? 100 : (slide.offset ?? 100);
    const direction =
      typeof slide === 'boolean' ? 'left' : (slide.direction ?? 'left');
    const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
    hiddenVariant[axis] =
      direction === 'left' || direction === 'up' ? -offset : offset;
    visibleVariant[axis] = 0;
  }

  if (fade) {
    hiddenVariant.opacity =
      typeof fade === 'boolean' ? 0 : (fade.initialOpacity ?? 0);
    visibleVariant.opacity =
      typeof fade === 'boolean' ? 1 : (fade.opacity ?? 1);
  }

  if (zoom) {
    hiddenVariant.scale =
      typeof zoom === 'boolean' ? 0.5 : (zoom.initialScale ?? 0.5);
    visibleVariant.scale = typeof zoom === 'boolean' ? 1 : (zoom.scale ?? 1);
  }

  if (blur) {
    hiddenVariant.filter =
      typeof blur === 'boolean' ? 'blur(10px)' : `blur(${blur})`;
    visibleVariant.filter = 'blur(0px)';
  }

  return (
    <AnimatePresence>
      <Slot
        ref={localRef}
        data-slot="effect"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        exit="hidden"
        variants={{
          hidden: hiddenVariant,
          visible: visibleVariant,
        }}
        transition={{
          ...transition,
          delay: (transition?.delay ?? 0) + delay,
        }}
        {...props}
      />
    </AnimatePresence>
  );
}

export { Effect, type EffectProps };
