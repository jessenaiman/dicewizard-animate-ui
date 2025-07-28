'use client';

import * as React from 'react';
import { AnimatePresence, motion, type Transition } from 'motion/react';

import {
  useIsInView,
  type UseIsInViewOptions,
} from '@/registry/hooks/use-is-in-view';

type RotatingTextProps = Omit<React.ComponentProps<'span'>, 'children'> & {
  text: string | string[];
  duration?: number;
  transition?: Transition;
  y?: number;
  delay?: number;
} & UseIsInViewOptions;

function RotatingText({
  ref,
  text,
  y = -50,
  duration = 2000,
  delay = 0,
  transition = { duration: 0.3, ease: 'easeOut' },
  style,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  ...props
}: RotatingTextProps) {
  const [index, setIndex] = React.useState(0);

  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLElement>,
    {
      inView,
      inViewOnce,
      inViewMargin,
    },
  );

  React.useEffect(() => {
    if (!Array.isArray(text)) return;
    if (inView && !isInView) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const timeoutId = setTimeout(() => {
      setIndex((prev) => (prev + 1) % text.length);
      intervalId = setInterval(
        () => setIndex((prev) => (prev + 1) % text.length),
        duration,
      );
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, duration, delay, inView, isInView]);

  const currentText = Array.isArray(text) ? text[index] : text;

  return (
    <span
      ref={localRef}
      style={{
        overflow: 'hidden',
        paddingBlock: '0.25rem',
        ...style,
      }}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isInView && (
          <motion.div
            key={currentText}
            transition={transition}
            initial={{ opacity: 0, y: -y }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y }}
          >
            {currentText}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

export { RotatingText, type RotatingTextProps };
