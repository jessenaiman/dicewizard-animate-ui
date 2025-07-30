'use client';

import * as React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

import {
  ScrollProgressProvider,
  ScrollProgress,
  ScrollProgressContainer,
  type ScrollProgressDirection,
} from '@/registry/primitives/animate/scroll-progress';
import { cn } from '@workspace/ui/lib/utils';

interface ScrollProgressDemoProps {
  global?: boolean;
  direction?: ScrollProgressDirection;
}

export const ScrollProgressDemo = ({
  global = false,
  direction = 'vertical',
}: ScrollProgressDemoProps) => {
  return (
    <div className="absolute inset-0" key={String(global) + direction}>
      <div className="relative h-full w-full overflow-hidden">
        <ScrollProgressProvider global={global} direction={direction}>
          <ScrollProgress
            className={cn(
              'z-50 bg-foreground h-1',
              global ? 'fixed' : 'absolute',
            )}
          />

          {global ? (
            <div className="size-full flex items-center justify-center dark:bg-neutral-950 bg-white">
              <p className="flex items-center gap-2 font-medium">
                Scroll the page to see the progress bar
              </p>
            </div>
          ) : (
            <ScrollProgressContainer className="w-full h-full data-[direction=vertical]:overflow-y-auto data-[direction=horizontal]:overflow-x-auto">
              <div
                className={cn('flex', direction === 'vertical' && 'flex-col')}
              >
                <div className="w-full h-[400px] shrink-0 flex items-center justify-center dark:bg-neutral-950 bg-white">
                  <p className="flex items-center gap-2 font-medium">
                    Scroll to see the progress bar{' '}
                    <motion.span
                      className={direction === 'horizontal' ? '-rotate-90' : ''}
                      animate={{ y: [3, -3, 3] }}
                      transition={{
                        duration: 1.25,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        type: 'keyframes',
                      }}
                    >
                      <ArrowDown className="size-5" />
                    </motion.span>
                  </p>
                </div>
                <div className="w-full h-[400px] shrink-0 dark:bg-neutral-900 bg-neutral-100" />
                <div className="w-full h-[400px] shrink-0 dark:bg-neutral-950 bg-white" />
                <div className="w-full h-[400px] shrink-0 dark:bg-neutral-900 bg-neutral-100" />
                <div className="w-full h-[400px] shrink-0 dark:bg-neutral-950 bg-white" />
              </div>
            </ScrollProgressContainer>
          )}
        </ScrollProgressProvider>
      </div>
    </div>
  );
};
