'use client';

import * as React from 'react';
import { motion } from 'motion/react';

import { cn } from '@workspace/ui/lib/utils';

type Coordinate = [number, number];
type Coordinates = Coordinate[][];

type MotionGridProps = {
  gridSize: Coordinate;
  frames: Coordinates;
  duration?: number;
  animate?: boolean;
  cellClassName?: string;
  cellActiveClassName?: string;
  cellInactiveClassName?: string;
} & React.ComponentProps<'div'>;

const MotionGrid = ({
  gridSize,
  frames,
  duration = 200,
  animate = true,
  cellClassName,
  cellActiveClassName,
  cellInactiveClassName,
  className,
  style,
  ...props
}: MotionGridProps) => {
  const [index, setIndex] = React.useState(0);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (!animate || frames.length === 0) return;
    intervalRef.current = setInterval(
      () => setIndex((i) => (i + 1) % frames.length),
      duration,
    );
    return () => clearInterval(intervalRef.current!);
  }, [frames.length, duration, animate]);

  const [cols, rows] = gridSize;

  const active = new Set<number>(
    frames[index]?.map(([x, y]) => y * cols + x) ?? [],
  );

  return (
    <div
      className={cn('grid w-fit gap-0.5', className)}
      style={{
        ...style,
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
      {...props}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            'size-3 rounded-sm',
            active.has(i)
              ? cn('bg-primary scale-110', cellActiveClassName)
              : cn('bg-muted scale-100', cellInactiveClassName),
            cellClassName,
          )}
          transition={{ duration, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

export { MotionGrid, type MotionGridProps, type Coordinate, type Coordinates };
