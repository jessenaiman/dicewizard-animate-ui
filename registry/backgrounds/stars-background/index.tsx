'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from 'motion/react';

import { cn } from '@/lib/utils';

interface StarLayerProps {
  count: number;
  size: number;
  duration: number;
}

const StarLayer = ({ count, size, duration }: StarLayerProps) => {
  const boxShadow = React.useMemo(() => {
    const shadows: string[] = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 4000) - 2000;
      const y = Math.floor(Math.random() * 4000) - 2000;
      shadows.push(`${x}px ${y}px #FFF`);
    }
    return shadows.join(', ');
  }, [count]);

  return (
    <motion.div
      animate={{ y: [0, -2000] }}
      transition={{ repeat: Infinity, duration: duration, ease: 'linear' }}
      className="absolute top-0 left-0 w-full h-[2000px]"
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
};

interface StarsBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
}

const StarsBackground = React.forwardRef<HTMLDivElement, StarsBackgroundProps>(
  (
    {
      children,
      className,
      factor = 0.05,
      speed = 50,
      transition = { stiffness: 50, damping: 20 },
      ...props
    },
    ref,
  ) => {
    const offsetX = useMotionValue(1);
    const offsetY = useMotionValue(1);

    const springX = useSpring(offsetX, transition);
    const springY = useSpring(offsetY, transition);

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const newOffsetX = -(e.clientX - centerX) * factor;
        const newOffsetY = -(e.clientY - centerY) * factor;
        offsetX.set(newOffsetX);
        offsetY.set(newOffsetY);
      },
      [offsetX, offsetY, factor],
    );

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)]',
          className,
        )}
        onMouseMove={handleMouseMove}
        {...props}
      >
        <motion.div style={{ x: springX, y: springY }}>
          <StarLayer count={1000} size={1} duration={speed} />
          <StarLayer count={400} size={2} duration={speed * 2} />
          <StarLayer count={200} size={3} duration={speed * 3} />
        </motion.div>
        {children}
      </div>
    );
  },
);

StarsBackground.displayName = 'StarsBackground';

export { StarsBackground, type StarsBackgroundProps };
