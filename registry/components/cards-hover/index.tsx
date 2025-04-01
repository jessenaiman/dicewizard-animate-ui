'use client';

import * as React from 'react';
import { AnimatePresence, motion, Transition } from 'motion/react';

import { cn } from '@/lib/utils';

const EXIT_DELAY = 0.3;

interface CardsHoverContextType {
  activeValue: string | null;
  setActiveValue: (value: string | null) => void;
  scheduleReset: () => void;
  clearReset: () => void;
}

const CardsHoverContext = React.createContext<
  CardsHoverContextType | undefined
>(undefined);

const useCardsHover = (): CardsHoverContextType => {
  const context = React.useContext(CardsHoverContext);
  if (!context) {
    throw new Error('useCardsHover must be used within a CardsHoverProvider');
  }
  return context;
};

interface CardsHoverProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue'> {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
}

const CardsHover = React.forwardRef<HTMLDivElement, CardsHoverProps>(
  ({ value, defaultValue, onValueChange, className, ...props }, ref) => {
    const [activeValue, setActiveValueState] = React.useState<string | null>(
      value ?? defaultValue ?? null,
    );

    const exitTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

    const scheduleReset = React.useCallback(() => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
      exitTimeoutRef.current = setTimeout(() => {
        setActiveValueState(null);
        exitTimeoutRef.current = null;
        onValueChange?.(null);
      }, EXIT_DELAY * 1000);
    }, [onValueChange]);

    const clearReset = React.useCallback(() => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
        exitTimeoutRef.current = null;
      }
    }, []);

    React.useEffect(() => {
      return () => {
        if (exitTimeoutRef.current) {
          clearTimeout(exitTimeoutRef.current);
        }
      };
    }, []);

    React.useEffect(() => {
      if (value !== undefined) {
        setActiveValueState(value);
      }
    }, [value]);

    const setActiveValue = (val: string | null) => {
      clearReset();
      setActiveValueState(val);
      onValueChange?.(val);
    };

    const contextValue = {
      activeValue,
      setActiveValue,
      scheduleReset,
      clearReset,
    };

    return (
      <CardsHoverContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
            className,
          )}
          {...props}
        />
      </CardsHoverContext.Provider>
    );
  },
);
CardsHover.displayName = 'CardsHover';

interface CardHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  transition?: Transition;
}

const CardHover = React.forwardRef<HTMLDivElement, CardHoverProps>(
  (
    {
      value,
      className,
      transition = { type: 'spring', stiffness: 200, damping: 20 },
      ...props
    },
    ref,
  ) => {
    const { activeValue, setActiveValue, scheduleReset, clearReset } =
      useCardsHover();

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      clearReset();
      setActiveValue(value);
      props.onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      scheduleReset();
      props.onMouseLeave?.(e);
    };

    return (
      <div
        key={value}
        className="relative block h-full w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence>
          {activeValue === value && (
            <motion.div
              className="absolute inset-0 h-full w-full bg-neutral-100 dark:bg-neutral-900 rounded-lg"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition,
              }}
              exit={{
                opacity: 0,
                transition: {
                  ...transition,
                  delay: EXIT_DELAY + (transition?.delay ?? 0),
                },
              }}
            />
          )}
        </AnimatePresence>
        <div
          ref={ref}
          className={cn(
            'h-full w-full p-4 overflow-hidden rounded-lg border relative z-20',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
CardHover.displayName = 'CardHover';

export {
  CardsHover,
  CardHover,
  useCardsHover,
  type CardsHoverContextType,
  type CardsHoverProps,
  type CardHoverProps,
};
