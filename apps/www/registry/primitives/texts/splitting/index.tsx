'use client';

import * as React from 'react';
import {
  motion,
  type Variants,
  type TargetAndTransition,
  type HTMLMotionProps,
  type Transition,
} from 'motion/react';

import {
  useIsInView,
  type UseIsInViewOptions,
} from '@/registry/hooks/use-is-in-view';

type DefaultSplittingTextProps = Omit<
  HTMLMotionProps<'div'>,
  'children' | 'initial' | 'animate' | 'transition'
> & {
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  transition?: Transition;
  stagger?: number;
  delay?: number;
} & UseIsInViewOptions;

type CharsOrWordsSplittingTextProps = DefaultSplittingTextProps & {
  type?: 'chars' | 'words';
  text: string;
};

type LinesSplittingTextProps = DefaultSplittingTextProps & {
  type?: 'lines';
  text: string[];
};

type SplittingTextProps =
  | CharsOrWordsSplittingTextProps
  | LinesSplittingTextProps;

const defaultItemVariant: Variants = {
  hidden: { x: 150, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const SplittingText: React.FC<SplittingTextProps> = ({
  ref,
  text,
  type = 'chars',
  initial,
  animate,
  transition,
  stagger,
  delay = 0,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  ...props
}) => {
  const items = React.useMemo<React.ReactNode[]>(() => {
    if (Array.isArray(text)) {
      return text.flatMap((line, i) => [
        <React.Fragment key={`line-${i}`}>{line}</React.Fragment>,
        i < text.length - 1 ? <br key={`br-${i}`} /> : null,
      ]);
    }

    if (type === 'words') {
      const tokens = text.match(/\S+\s*/g) || [];
      return tokens.map((token, i) => (
        <React.Fragment key={i}>{token}</React.Fragment>
      ));
    }

    return text
      .split('')
      .map((char, i) => <React.Fragment key={i}>{char}</React.Fragment>);
  }, [text, type]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren:
          stagger ?? (type === 'chars' ? 0.05 : type === 'words' ? 0.2 : 0.3),
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      ...defaultItemVariant.hidden,
      ...(initial || {}),
    },
    visible: {
      ...defaultItemVariant.visible,
      ...(animate || {}),
      transition: {
        ...((defaultItemVariant.visible as TargetAndTransition).transition ||
          {}),
        ...(transition || {}),
      },
    },
  };

  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLElement>,
    {
      inView,
      inViewOnce,
      inViewMargin,
    },
  );

  return (
    <motion.span
      ref={localRef}
      initial="hidden"
      animate={(isInView && inView) || !inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      {...props}
    >
      {items.map(
        (item, index) =>
          item && (
            <React.Fragment key={index}>
              <motion.span
                key={index}
                variants={itemVariants}
                style={{
                  display: 'inline-block',
                  whiteSpace: type === 'chars' ? 'pre' : 'normal',
                }}
              >
                {item}
              </motion.span>
              {type === 'words' && ' '}
            </React.Fragment>
          ),
      )}
    </motion.span>
  );
};

export { SplittingText, type SplittingTextProps };
