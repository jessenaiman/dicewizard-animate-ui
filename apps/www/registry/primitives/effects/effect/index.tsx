'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps, type Variant } from 'motion/react';

import {
  useIsInView,
  type UseIsInViewOptions,
} from '@/registry/hooks/use-is-in-view';
import { Slot, type WithAsChild } from '@/registry/primitives/animate/slot';

type SlideDirection = 'up' | 'down' | 'left' | 'right';

type Slide = {
  direction?: SlideDirection;
  offset?: number;
};

type Fade = { initialOpacity?: number; opacity?: number };

type Zoom = {
  initialScale?: number;
  scale?: number;
};

type EffectProps = WithAsChild<
  {
    children?: React.ReactNode;
    delay?: number;
    blur?: string | boolean;
    slide?: Slide | boolean;
    fade?: Fade | boolean;
    zoom?: Zoom | boolean;
    ref?: React.Ref<HTMLElement>;
  } & UseIsInViewOptions,
  HTMLMotionProps<'div'>
>;

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
  asChild = false,
  ...props
}: EffectProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLElement>,
    {
      inView,
      inViewOnce,
      inViewMargin,
    },
  );

  const hiddenVariant: Variant = {};
  const visibleVariant: Variant = {};

  if (slide) {
    const offset = typeof slide === 'boolean' ? 100 : (slide.offset ?? 100);
    const direction =
      typeof slide === 'boolean' ? 'left' : (slide.direction ?? 'left');
    const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
    hiddenVariant[axis] =
      direction === 'right' || direction === 'down' ? -offset : offset;
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

  const Component = asChild ? Slot : motion.div;

  return (
    <Component
      ref={localRef as React.Ref<HTMLDivElement>}
      initial="hidden"
      animate={(isInView && inView) || !inView ? 'visible' : 'hidden'}
      exit="hidden"
      variants={{
        hidden: hiddenVariant,
        visible: visibleVariant,
      }}
      transition={{
        ...transition,
        delay: (transition?.delay ?? 0) + delay / 1000,
      }}
      {...props}
    />
  );
}

export { Effect, type EffectProps };
