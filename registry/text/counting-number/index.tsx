'use client';

import * as React from 'react';
import {
  type SpringOptions,
  useInView,
  useMotionValue,
  useSpring,
} from 'motion/react';

interface CountingNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  number: number;
  fromNumber?: number;
  padStart?: boolean;
  startOnView?: boolean;
  decimalSeparator?: string;
  transition?: SpringOptions;
  decimalPlaces?: number;
}

const CountingNumber = React.forwardRef<HTMLSpanElement, CountingNumberProps>(
  (
    {
      number,
      fromNumber = 0,
      padStart = false,
      startOnView = false,
      decimalSeparator = '.',
      transition = { stiffness: 90, damping: 50 },
      decimalPlaces = 0,
      className,
      ...props
    },
    ref,
  ) => {
    const viewRef = React.useRef<HTMLSpanElement>(null);
    React.useImperativeHandle(ref, () => viewRef.current as HTMLSpanElement);

    const numberStr = number.toString();
    const decimals =
      typeof decimalPlaces === 'number'
        ? decimalPlaces
        : numberStr.includes('.')
          ? numberStr.split('.')[1].length
          : 0;

    const motionVal = useMotionValue(fromNumber);
    const springVal = useSpring(motionVal, transition);
    const inView = useInView(viewRef, { once: true, margin: '0px' });

    React.useEffect(() => {
      if (!startOnView || inView) motionVal.set(number);
    }, [inView, startOnView, number, motionVal]);

    React.useEffect(() => {
      const unsubscribe = springVal.on('change', (latest) => {
        if (viewRef.current) {
          let formatted =
            decimals > 0
              ? latest.toFixed(decimals)
              : Math.round(latest).toString();

          if (decimals > 0) {
            formatted = formatted.replace('.', decimalSeparator);
          }

          if (padStart) {
            const finalIntLength = Math.floor(Math.abs(number)).toString()
              .length;
            const [intPart, fracPart] = formatted.split(decimalSeparator);
            const paddedInt = intPart.padStart(finalIntLength, '0');
            formatted = fracPart
              ? `${paddedInt}${decimalSeparator}${fracPart}`
              : paddedInt;
          }

          viewRef.current.textContent = formatted;
        }
      });
      return () => unsubscribe();
    }, [springVal, decimals, padStart, number, decimalSeparator]);

    const finalIntLength = Math.floor(Math.abs(number)).toString().length;
    const initialText = padStart
      ? '0'.padStart(finalIntLength, '0') +
        (decimals > 0 ? decimalSeparator + '0'.repeat(decimals) : '')
      : '0' + (decimals > 0 ? decimalSeparator + '0'.repeat(decimals) : '');

    return (
      <span ref={viewRef} className={className} {...props}>
        {initialText}
      </span>
    );
  },
);

export { CountingNumber, type CountingNumberProps };
