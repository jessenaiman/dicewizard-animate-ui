'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from 'motion/react';

import {
  useIsInView,
  type UseIsInViewOptions,
} from '@/registry/hooks/use-is-in-view';
import { WithAsChild } from '../../animate/slot';
import { useStrictContext } from '@/registry/hooks/use-strict-context';

const formatter = new Intl.NumberFormat('en-US');

function generateRange(
  max: number,
  step: number,
  sideItemsCount: number,
): number[] {
  const result: number[] = [];
  const end = max + sideItemsCount * step;
  for (let value = end; value >= 0; value -= step) {
    result.push(value);
  }
  return result;
}

type ScrollingNumberContextType = {
  itemsHeight: number;
  sideItemsCount: number;
  displayedItemsCount: number;
  isInView: boolean;
};

const [ScrollingNumberProvider, useScrollingNumber] =
  useStrictContext<ScrollingNumberContextType>('ScrollingNumberContext');

type ScrollingNumberContainerProps = React.ComponentProps<'div'> & {
  itemsHeight?: number;
  sideItemsCount?: number;
} & UseIsInViewOptions;

function ScrollingNumberContainer({
  ref,
  itemsHeight = 30,
  sideItemsCount = 2,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  style,
  ...props
}: ScrollingNumberContainerProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLDivElement>,
    {
      inView,
      inViewOnce,
      inViewMargin,
    },
  );

  const displayedItemsCount = 1 + sideItemsCount * 2;

  return (
    <ScrollingNumberProvider
      value={{ itemsHeight, sideItemsCount, displayedItemsCount, isInView }}
    >
      <div
        ref={localRef}
        data-slot="scrolling-number-container"
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: itemsHeight * displayedItemsCount,
          ...style,
        }}
        {...props}
      />
    </ScrollingNumberProvider>
  );
}

type ScrollingNumberDirection = 'ltr' | 'rtl' | 'ttb' | 'btt';

type ScrollingNumberProps = WithAsChild<
  {
    number: number;
    step: number;
    delay?: number;
    direction?: ScrollingNumberDirection;
    onCompleted?: () => void;
  },
  HTMLMotionProps<'div'>
>;

function ScrollingNumber({
  number,
  step,
  transition = { stiffness: 90, damping: 30 },
  delay = 0,
  direction = 'btt',
  onCompleted,
  ...props
}: ScrollingNumberProps) {
  const { itemsHeight, sideItemsCount, displayedItemsCount, isInView } =
    useScrollingNumber();

  const range = React.useMemo(
    () => generateRange(number, step, sideItemsCount),
    [number, step, sideItemsCount],
  );

  const initialY = -(itemsHeight * sideItemsCount);
  const finalY = itemsHeight * (range.length - displayedItemsCount);

  const yMotion = useMotionValue(initialY);
  const ySpring = useSpring(yMotion, transition);

  React.useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      yMotion.set(finalY);
    }, delay);
    return () => clearTimeout(timer);
  }, [isInView, finalY, yMotion, delay]);

  const currentIndex = useTransform(
    ySpring,
    (y) => y / itemsHeight + sideItemsCount,
  );
  const currentValue = useTransform(currentIndex, (idx) => idx * step);
  const completedTransform = useTransform(
    currentValue,
    (val) => val >= number * 0.99,
  );

  React.useEffect(() => {
    const unsubscribe = completedTransform.on('change', (latest) => {
      if (latest) onCompleted?.();
    });
    return unsubscribe;
  }, [completedTransform]);

  return (
    <motion.div
      data-slot="scrolling-number"
      style={{
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        y: ySpring,
      }}
      {...props}
    >
      {range.map((value) => (
        <div
          key={value}
          data-slot="scrolling-number-item"
          style={{ height: itemsHeight }}
        >
          {formatter.format(value)}
        </div>
      ))}
    </motion.div>
  );
}

export {
  ScrollingNumberContainer,
  ScrollingNumber,
  useScrollingNumber,
  type ScrollingNumberContainerProps,
  type ScrollingNumberProps,
  type ScrollingNumberDirection,
  type ScrollingNumberContextType,
};
