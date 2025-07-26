'use client';

import * as React from 'react';
import { motion, AnimatePresence, type Transition } from 'motion/react';

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
  transition = { duration: 0.3, ease: 'easeOut' },
  delay = 0,
  style,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  ...props
}: RotatingTextProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLElement>,
    {
      inView,
      inViewOnce,
      inViewMargin,
    },
  );

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!Array.isArray(text)) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, duration);
    return () => clearInterval(interval);
  }, [text, duration]);

  const currentText = Array.isArray(text) ? text[index] : text;

  return (
    <span
      ref={localRef}
      style={{
        display: 'inline-block',
        padding: '0.25rem 0',
        ...style,
      }}
      {...props}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentText}
          transition={transition}
          initial={{ opacity: 0, y: -y }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y }}
        >
          {currentText}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export { RotatingText, type RotatingTextProps };
