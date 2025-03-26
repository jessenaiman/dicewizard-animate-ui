'use client';

import * as React from 'react';
import {
  useSpring,
  useTransform,
  type MotionValue,
  motion,
} from 'motion/react';
import useMeasure from 'react-use-measure';
import { cn } from '@/lib/utils';

function useInView(
  ref: React.RefObject<Element | null>,
  options?: IntersectionObserverInit,
): boolean {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1, ...options },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);
  return inView;
}

interface DigitProps {
  prevValue: number;
  value: number;
  place: number;
  transition?: {
    type: 'spring';
    stiffness: number;
    damping: number;
    mass: number;
  };
}

const Digit = ({ prevValue, value, place, transition }: DigitProps) => {
  const startDigit = Math.floor(prevValue / place) % 10;
  const targetDigit = Math.floor(value / place) % 10;
  const animatedValue = useSpring(startDigit, transition);
  React.useEffect(() => {
    animatedValue.set(targetDigit);
  }, [targetDigit, animatedValue]);
  return (
    <div className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums">
      <div className="invisible">0</div>
      {Array.from({ length: 10 }, (_, i) => (
        <AnimatedDigit
          key={i}
          motionValue={animatedValue}
          digit={i}
          transition={transition}
        />
      ))}
    </div>
  );
};

interface AnimatedDigitProps {
  motionValue: MotionValue<number>;
  digit: number;
  transition?: {
    type: 'spring';
    stiffness: number;
    damping: number;
    mass: number;
  };
}

const AnimatedDigit = ({
  motionValue,
  digit,
  transition,
}: AnimatedDigitProps) => {
  const [ref, bounds] = useMeasure();
  const y = useTransform(motionValue, (latest) => {
    if (!bounds.height) return 0;
    const currentDigit = latest % 10;
    const offset = (10 + digit - currentDigit) % 10;
    let translateY = offset * bounds.height;
    if (offset > 5) translateY -= 10 * bounds.height;
    return translateY;
  });
  if (!bounds.height)
    return (
      <span ref={ref} className="invisible absolute">
        {digit}
      </span>
    );
  return (
    <motion.span
      ref={ref}
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
      transition={transition}
    >
      {digit}
    </motion.span>
  );
};

interface SlidingNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  number: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  startOnView?: boolean;
}

const SlidingNumber = ({
  number,
  className,
  stiffness = 180,
  damping = 20,
  mass = 0.4,
  startOnView = false,
  ...props
}: SlidingNumberProps) => {
  const containerRef = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(containerRef);
  const effectiveNumber = startOnView && !inView ? 0 : Math.abs(number);
  const prevNumberRef = React.useRef<number>(0);
  const newStr = effectiveNumber.toString();
  const [newIntStr, newDecStr] = newStr.split('.');
  const prevStr = prevNumberRef.current.toString();
  const [prevIntStr = '', prevDecStr = ''] = prevStr.split('.');
  const adjustedPrevInt =
    prevIntStr.length > newIntStr.length
      ? prevIntStr.slice(-newIntStr.length)
      : prevIntStr.padStart(newIntStr.length, '0');
  const adjustedPrevDec = newDecStr
    ? prevDecStr.length > newDecStr.length
      ? prevDecStr.slice(0, newDecStr.length)
      : prevDecStr.padEnd(newDecStr.length, '0')
    : '';
  React.useEffect(() => {
    if (!startOnView || inView) {
      prevNumberRef.current = effectiveNumber;
    }
  }, [effectiveNumber, newStr, inView, startOnView]);
  const intDigitCount = newIntStr.length;
  const intPlaces = Array.from({ length: intDigitCount }, (_, i) =>
    Math.pow(10, intDigitCount - i - 1),
  );
  const decPlaces = newDecStr
    ? Array.from({ length: newDecStr.length }, (_, i) =>
        Math.pow(10, newDecStr.length - i - 1),
      )
    : [];
  const newDecValue = newDecStr ? parseInt(newDecStr, 10) : 0;
  const prevDecValue = adjustedPrevDec ? parseInt(adjustedPrevDec, 10) : 0;

  return (
    <span
      ref={containerRef}
      className={cn('flex items-center', className)}
      {...props}
    >
      {!(startOnView && !inView) && number < 0 && (
        <span className="mr-1">-</span>
      )}
      {intPlaces.map((place) => (
        <Digit
          key={`int-${place}`}
          prevValue={parseInt(adjustedPrevInt, 10)}
          value={parseInt(newIntStr, 10)}
          place={place}
          transition={{ type: 'spring', stiffness, damping, mass }}
        />
      ))}
      {newDecStr && (
        <>
          <span>.</span>
          {decPlaces.map((place) => (
            <Digit
              key={`dec-${place}`}
              prevValue={prevDecValue}
              value={newDecValue}
              place={place}
              transition={{ type: 'spring', stiffness, damping, mass }}
            />
          ))}
        </>
      )}
    </span>
  );
};

export { SlidingNumber, type SlidingNumberProps };
