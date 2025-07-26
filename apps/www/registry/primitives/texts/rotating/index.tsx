'use client';

import * as React from 'react';
import { AnimatePresence, motion, type Transition } from 'motion/react';

type RotatingTextProps = Omit<React.ComponentProps<'span'>, 'children'> & {
  text: string | string[];
  duration?: number;
  transition?: Transition;
  y?: number;
  delay?: number;
};

function RotatingText({
  text,
  y = -50,
  duration = 2000,
  delay = 0,
  transition = { duration: 0.3, ease: 'easeOut' },
  style,
  ...props
}: RotatingTextProps) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!Array.isArray(text)) return;

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
  }, [text, duration, delay]);

  const currentText = Array.isArray(text) ? text[index] : text;

  return (
    <span
      style={{
        overflow: 'hidden',
        paddingBlock: '0.25rem',
        ...style,
      }}
      {...props}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentText}
          transition={transition}
          initial={{ opacity: 0, y: -y }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y }}
        >
          {currentText}
        </motion.div>
      </AnimatePresence>
    </span>
  );
}

export { RotatingText, type RotatingTextProps };
