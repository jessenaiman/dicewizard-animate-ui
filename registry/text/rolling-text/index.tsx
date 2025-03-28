'use client';

import * as React from 'react';
import { motion } from 'motion/react';

const entryAnimation = {
  initial: { rotateX: 0 },
  animate: { rotateX: 90 },
};

const exitAnimation = {
  initial: { rotateX: 90 },
  animate: { rotateX: 0 },
};

const formatCharacter = (char: string): string => {
  return char === ' ' ? '\u00A0' : char;
};

interface RollingTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  duration?: number;
  delay?: number;
  startOnView?: boolean;
  text: string;
}

const RollingText = React.forwardRef<HTMLSpanElement, RollingTextProps>(
  (
    { duration = 0.5, delay = 0.1, startOnView = false, text, ...props },
    ref,
  ) => {
    const characters = React.useMemo(() => text.split(''), [text]);

    return (
      <span {...props} ref={ref}>
        {characters.map((char, idx) => (
          <span
            key={idx}
            className="relative inline-block perspective-[9999999px] transform-3d w-auto"
            aria-hidden="true"
          >
            <motion.span
              className="absolute inline-block backface-hidden origin-[50%_25%]"
              initial={entryAnimation.initial}
              animate={entryAnimation.animate}
              {...(startOnView
                ? { whileInView: entryAnimation.animate }
                : { animate: entryAnimation.animate })}
              transition={{
                ease: 'easeOut',
                duration,
                delay: idx * delay,
              }}
            >
              {formatCharacter(char)}
            </motion.span>
            <motion.span
              className="absolute inline-block backface-hidden origin-[50%_100%]"
              initial={exitAnimation.initial}
              {...(startOnView
                ? { whileInView: exitAnimation.animate }
                : { animate: exitAnimation.animate })}
              transition={{
                ease: 'easeOut',
                duration,
                delay: idx * delay + 0.3,
              }}
            >
              {formatCharacter(char)}
            </motion.span>
            <span className="invisible">{formatCharacter(char)}</span>
          </span>
        ))}

        <span className="sr-only">{text}</span>
      </span>
    );
  },
);
RollingText.displayName = 'RollingText';

export { RollingText, type RollingTextProps };
