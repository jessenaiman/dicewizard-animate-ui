'use client';

import * as React from 'react';
import {
  useSpring,
  useTransform,
  motion,
  type MotionValue,
  type SpringOptions,
} from 'motion/react';
import useMeasure from 'react-use-measure';

import {
  useIsInView,
  type UseIsInViewOptions,
} from '@/registry/hooks/use-is-in-view';

type SlidingNumberRollerProps = {
  prevValue: number;
  value: number;
  place: number;
  transition: SpringOptions;
};

function SlidingNumberRoller({
  prevValue,
  value,
  place,
  transition,
}: SlidingNumberRollerProps) {
  const startNumber = Math.floor(prevValue / place) % 10;
  const targetNumber = Math.floor(value / place) % 10;
  const animatedValue = useSpring(startNumber, transition);

  React.useEffect(() => {
    animatedValue.set(targetNumber);
  }, [targetNumber, animatedValue]);

  const [measureRef, { height }] = useMeasure();

  return (
    <span
      ref={measureRef}
      data-slot="sliding-number-roller"
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '1ch',
        overflowX: 'visible',
        overflowY: 'clip',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      <span style={{ visibility: 'hidden' }}>0</span>
      {Array.from({ length: 10 }, (_, i) => (
        <SlidingNumberDisplay
          key={i}
          motionValue={animatedValue}
          number={i}
          height={height}
          transition={transition}
        />
      ))}
    </span>
  );
}

type SlidingNumberDisplayProps = {
  motionValue: MotionValue<number>;
  number: number;
  height: number;
  transition: SpringOptions;
};

function SlidingNumberDisplay({
  motionValue,
  number,
  height,
  transition,
}: SlidingNumberDisplayProps) {
  const y = useTransform(motionValue, (latest) => {
    if (!height) return 0;
    const currentNumber = latest % 10;
    const offset = (10 + number - currentNumber) % 10;
    let translateY = offset * height;
    if (offset > 5) translateY -= 10 * height;
    return translateY;
  });

  if (!height) {
    return (
      <span style={{ visibility: 'hidden', position: 'absolute' }}>
        {number}
      </span>
    );
  }

  return (
    <motion.span
      data-slot="sliding-number-display"
      style={{
        y,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      transition={{ ...transition, type: 'spring' }}
    >
      {number}
    </motion.span>
  );
}

type SlidingNumberProps = Omit<React.ComponentProps<'span'>, 'children'> & {
  number: number | string;
  padStart?: boolean;
  decimalSeparator?: string;
  decimalPlaces?: number;
  transition?: SpringOptions;
} & UseIsInViewOptions;

function SlidingNumber({
  ref,
  number,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  padStart = false,
  decimalSeparator = '.',
  decimalPlaces = 0,
  transition = { stiffness: 200, damping: 20, mass: 0.4 },
  ...props
}: SlidingNumberProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLElement>,
    {
      inView,
      inViewOnce,
      inViewMargin,
    },
  );
  const start = React.useMemo(
    () => (isInView && inView) || !inView,
    [isInView, inView],
  );

  const prevNumberRef = React.useRef<number>(0);

  const effectiveNumber = React.useMemo(
    () => (!start ? 0 : Math.abs(Number(number))),
    [number, start],
  );

  const formatNumber = React.useCallback(
    (num: number) =>
      decimalPlaces != null ? num.toFixed(decimalPlaces) : num.toString(),
    [decimalPlaces],
  );

  const numberStr = formatNumber(effectiveNumber);
  const [newIntStrRaw, newDecStrRaw = ''] = numberStr.split('.');
  const newIntStr =
    padStart && newIntStrRaw?.length === 1 ? '0' + newIntStrRaw : newIntStrRaw;

  const prevFormatted = formatNumber(prevNumberRef.current);
  const [prevIntStrRaw = '', prevDecStrRaw = ''] = prevFormatted.split('.');
  const prevIntStr =
    padStart && prevIntStrRaw.length === 1
      ? '0' + prevIntStrRaw
      : prevIntStrRaw;

  const adjustedPrevInt = React.useMemo(() => {
    return prevIntStr.length > (newIntStr?.length ?? 0)
      ? prevIntStr.slice(-(newIntStr?.length ?? 0))
      : prevIntStr.padStart(newIntStr?.length ?? 0, '0');
  }, [prevIntStr, newIntStr]);

  const adjustedPrevDec = React.useMemo(() => {
    if (!newDecStrRaw) return '';
    return prevDecStrRaw.length > newDecStrRaw.length
      ? prevDecStrRaw.slice(0, newDecStrRaw.length)
      : prevDecStrRaw.padEnd(newDecStrRaw.length, '0');
  }, [prevDecStrRaw, newDecStrRaw]);

  React.useEffect(() => {
    if (start) prevNumberRef.current = effectiveNumber;
  }, [effectiveNumber, start]);

  const intDigitCount = newIntStr?.length ?? 0;
  const intPlaces = React.useMemo(
    () =>
      Array.from({ length: intDigitCount }, (_, i) =>
        Math.pow(10, intDigitCount - i - 1),
      ),
    [intDigitCount],
  );
  const decPlaces = React.useMemo(
    () =>
      newDecStrRaw
        ? Array.from({ length: newDecStrRaw.length }, (_, i) =>
            Math.pow(10, newDecStrRaw.length - i - 1),
          )
        : [],
    [newDecStrRaw],
  );

  const newDecValue = newDecStrRaw ? parseInt(newDecStrRaw, 10) : 0;
  const prevDecValue = adjustedPrevDec ? parseInt(adjustedPrevDec, 10) : 0;

  return (
    <span
      ref={localRef}
      data-slot="sliding-number"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
      }}
      {...props}
    >
      {start && Number(number) < 0 && (
        <span style={{ marginRight: '0.25rem' }}>-</span>
      )}

      {intPlaces.map((place) => (
        <SlidingNumberRoller
          key={`int-${place}`}
          prevValue={parseInt(adjustedPrevInt, 10)}
          value={parseInt(newIntStr ?? '0', 10)}
          place={place}
          transition={transition}
        />
      ))}

      {newDecStrRaw && (
        <>
          <span>{decimalSeparator}</span>
          {decPlaces.map((place) => (
            <SlidingNumberRoller
              key={`dec-${place}`}
              prevValue={prevDecValue}
              value={newDecValue}
              place={place}
              transition={transition}
            />
          ))}
        </>
      )}
    </span>
  );
}

export { SlidingNumber, type SlidingNumberProps };
