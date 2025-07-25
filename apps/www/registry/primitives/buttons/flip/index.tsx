'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps, type Variant } from 'motion/react';

import { useStrictContext } from '@/registry/hooks/use-strict-context';

const buildVariant = ({
  opacity,
  rotation,
  offset,
  isVertical,
  rotateAxis,
}: {
  opacity: number;
  rotation: number;
  offset: string | null;
  isVertical: boolean;
  rotateAxis: string;
}): Variant => ({
  opacity,
  [rotateAxis]: rotation,
  ...(isVertical && offset !== null ? { y: offset } : {}),
  ...(!isVertical && offset !== null ? { x: offset } : {}),
});

type FlipDirection = 'top' | 'bottom' | 'left' | 'right';

type FlipButtonContextType = {
  from: FlipDirection;
  isVertical: boolean;
  rotateAxis: string;
};

const [FlipButtonProvider, useFlipButton] =
  useStrictContext<FlipButtonContextType>('FlipButtonContext');

type FlipButtonProps = HTMLMotionProps<'button'> & {
  from?: FlipDirection;
  tapScale?: number;
};

function FlipButton({
  from = 'top',
  tapScale = 0.95,
  style,
  ...props
}: FlipButtonProps) {
  const isVertical = from === 'top' || from === 'bottom';
  const rotateAxis = isVertical ? 'rotateX' : 'rotateY';

  return (
    <FlipButtonProvider value={{ from, isVertical, rotateAxis }}>
      <motion.button
        data-slot="flip-button"
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: tapScale }}
        style={{
          display: 'inline-grid',
          placeItems: 'center',
          perspective: '1000px',
          ...style,
        }}
        {...props}
      />
    </FlipButtonProvider>
  );
}

type FlipButtonFaceProps = HTMLMotionProps<'span'>;

function FlipButtonFront({
  transition = { type: 'spring', stiffness: 280, damping: 20 },
  style,
  ...props
}: FlipButtonFaceProps) {
  const { from, isVertical, rotateAxis } = useFlipButton();

  const frontOffset = from === 'top' || from === 'left' ? '50%' : '-50%';

  const frontVariants = {
    initial: buildVariant({
      opacity: 1,
      rotation: 0,
      offset: '0%',
      isVertical,
      rotateAxis,
    }),
    hover: buildVariant({
      opacity: 0,
      rotation: 90,
      offset: frontOffset,
      isVertical,
      rotateAxis,
    }),
  };

  return (
    <motion.span
      data-slot="flip-button-front"
      variants={frontVariants}
      transition={transition}
      style={{
        gridArea: '1 / 1',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      {...props}
    />
  );
}

function FlipButtonBack({
  transition = { type: 'spring', stiffness: 280, damping: 20 },
  style,
  ...props
}: FlipButtonFaceProps) {
  const { from, isVertical, rotateAxis } = useFlipButton();

  const backOffset = from === 'top' || from === 'left' ? '-50%' : '50%';

  const backVariants = {
    initial: buildVariant({
      opacity: 0,
      rotation: 90,
      offset: backOffset,
      isVertical,
      rotateAxis,
    }),
    hover: buildVariant({
      opacity: 1,
      rotation: 0,
      offset: '0%',
      isVertical,
      rotateAxis,
    }),
  };

  return (
    <motion.span
      data-slot="flip-button-back"
      variants={backVariants}
      transition={transition}
      style={{
        gridArea: '1 / 1',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      {...props}
    />
  );
}

export {
  FlipButton,
  FlipButtonFront,
  FlipButtonBack,
  useFlipButton,
  type FlipButtonProps,
  type FlipButtonFaceProps as FlipButtonFrontProps,
  type FlipButtonFaceProps as FlipButtonBackProps,
  type FlipDirection,
  type FlipButtonContextType,
};
