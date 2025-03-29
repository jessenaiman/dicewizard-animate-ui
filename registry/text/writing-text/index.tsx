'use client';

import * as React from 'react';
import { motion, type Transition } from 'motion/react';

interface WritingTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  transition?: Transition;
  startOnView?: boolean;
  spacing?: number | string;
  text: string;
}

const WritingText = React.forwardRef<HTMLSpanElement, WritingTextProps>(
  (
    {
      startOnView = false,
      spacing = 5,
      text,
      transition = { type: 'spring', bounce: 0, duration: 2, delay: 0.5 },
      ...props
    },
    ref,
  ) => {
    const words = React.useMemo(() => text.split(' '), [text]);

    return (
      <span ref={ref} {...props}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block will-change-transform will-change-opacity"
            style={{ marginRight: spacing }}
            initial={{ opacity: 0, y: 10 }}
            {...(startOnView
              ? {
                  whileInView: { opacity: 1, y: 0 },
                }
              : {
                  animate: { opacity: 1, y: 0 },
                })}
            transition={{
              ...transition,
              delay: index * (transition?.delay ?? 0),
            }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </span>
    );
  },
);
WritingText.displayName = 'WritingText';

export { WritingText, type WritingTextProps };
