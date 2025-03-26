'use client';

import * as React from 'react';
import { motion } from 'motion/react';

interface WritingTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  duration?: number;
  delay?: number;
  startOnView?: boolean;
  text: string;
}

const WritingText = React.forwardRef<HTMLSpanElement, WritingTextProps>(
  ({ startOnView = false, delay = 0.5, duration = 2, text, ...props }, ref) => {
    const words = React.useMemo(() => text.split(' '), [text]);

    return (
      <span ref={ref} {...props}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-1 will-change-transform will-change-opacity"
            initial={{ opacity: 0, y: 10 }}
            {...(startOnView
              ? {
                  whileInView: { opacity: 1, y: 0 },
                }
              : {
                  animate: { opacity: 1, y: 0 },
                })}
            transition={{
              type: 'spring',
              duration,
              bounce: 0,
              delay: index * delay,
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
