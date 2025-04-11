'use client';

import * as React from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  type MotionProps,
  type UseInViewOptions,
  type Transition,
} from 'motion/react';

type MarginType = UseInViewOptions['margin'];

interface SlideInProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
  delay?: number;
}

const SlideIn = React.forwardRef<HTMLDivElement, SlideInProps>(
  (
    {
      children,
      className,
      transition = { type: 'spring', stiffness: 200, damping: 20 },
      delay = 0,
      offset = 100,
      direction = 'left',
      inView = false,
      inViewMargin = '-50px',
      blur = '0px',
      ...props
    }: SlideInProps,
    ref,
  ) => {
    const localRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

    const inViewResult = useInView(localRef, {
      once: true,
      margin: inViewMargin,
    });
    const isInView = !inView || inViewResult;
    const axis: 'x' | 'y' =
      direction === 'up' || direction === 'down' ? 'y' : 'x';
    const initialPosition =
      axis === 'x'
        ? direction === 'left'
          ? -offset
          : offset
        : direction === 'up'
          ? -offset
          : offset;

    return (
      <AnimatePresence>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          exit="hidden"
          variants={{
            hidden: {
              [axis]: initialPosition,
              opacity: 0,
              filter: `blur(${blur})`,
            },
            visible: {
              [axis]: 0,
              opacity: 1,
              filter: 'blur(0px)',
            },
          }}
          transition={{
            ...transition,
            delay: (transition?.delay ?? 0) + delay,
          }}
          className={className}
          {...props}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  },
);

SlideIn.displayName = 'SlideIn';

export { SlideIn, type SlideInProps };
