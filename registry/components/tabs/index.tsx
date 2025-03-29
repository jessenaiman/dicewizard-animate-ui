'use client';

import * as React from 'react';
import { motion, type Transition } from 'motion/react';

import { cn } from '@/lib/utils';

interface TabsContextProps {
  activeValue: string;
  handleValueChange: (value: string) => void;
  registerTrigger: (value: string, node: HTMLElement | null) => void;
  getTrigger: (value: string) => HTMLElement | null;
}

const TabsContext = React.createContext<TabsContextProps | undefined>(
  undefined,
);

type TabsProps =
  | {
      defaultValue?: string;
      children: React.ReactNode;
      className?: string;
      value?: never;
      onValueChange?: never;
    }
  | {
      value: string;
      onValueChange?: (value: string) => void;
      children: React.ReactNode;
      className?: string;
      defaultValue?: never;
    };

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    { defaultValue, value, onValueChange, children, className },
    forwardedRef,
  ) => {
    const [activeValue, setActiveValue] = React.useState(defaultValue);
    const triggersRef = React.useRef(new Map<string, HTMLElement>());

    React.useEffect(() => {
      if (activeValue === undefined && triggersRef.current.size > 0) {
        const firstTab = Array.from(triggersRef.current.keys())[0];
        setActiveValue(firstTab);
      }
    }, [activeValue]);

    const registerTrigger = (value: string, node: HTMLElement | null) => {
      if (node) {
        triggersRef.current.set(value, node);
      } else {
        triggersRef.current.delete(value);
      }
    };

    const getTrigger = (value: string): HTMLElement | null => {
      return triggersRef.current.get(value) || null;
    };

    const handleValueChange = (val: string) => {
      if (value === undefined) {
        setActiveValue(val);
      } else {
        onValueChange?.(val);
      }
    };

    const setRef = (node: HTMLDivElement | null) => {
      if (forwardedRef) {
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else {
          (forwardedRef as React.RefObject<HTMLDivElement | null>).current =
            node;
        }
      }
    };

    return (
      <TabsContext.Provider
        value={{
          activeValue: (value ?? activeValue)!,
          handleValueChange,
          registerTrigger,
          getTrigger,
        }}
      >
        <div ref={setRef} className={cn('flex flex-col gap-2', className)}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  transition?: Transition;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  (
    {
      children,
      className,
      activeClassName,
      transition = {
        type: 'spring',
        bounce: 0,
        stiffness: 300,
        damping: 30,
      },
    },
    forwardedRef,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { activeValue, getTrigger } = React.useContext(TabsContext)!;
    const [indicatorStyle, setIndicatorStyle] = React.useState({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    });

    const updateIndicator = React.useCallback(() => {
      if (!containerRef.current) return;

      const trigger = getTrigger(activeValue);
      if (!trigger) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const triggerRect = trigger.getBoundingClientRect();

      setIndicatorStyle({
        left: triggerRect.left - containerRect.left,
        top: triggerRect.top - containerRect.top,
        width: triggerRect.width,
        height: triggerRect.height,
      });
    }, [activeValue, getTrigger]);

    React.useEffect(() => {
      updateIndicator();
      window.addEventListener('resize', updateIndicator);
      return () => window.removeEventListener('resize', updateIndicator);
    }, [updateIndicator, children]);

    const setRef = (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (forwardedRef) {
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else {
          (forwardedRef as React.RefObject<HTMLDivElement | null>).current =
            node;
        }
      }
    };

    return (
      <div ref={setRef} className="relative">
        <div
          role="tablist"
          className={cn(
            'bg-muted text-muted-foreground inline-flex h-10 w-fit items-center justify-center rounded-lg p-[4px]',
            className,
          )}
        >
          {children}
        </div>
        <motion.div
          className={cn(
            'absolute rounded-sm bg-background shadow-sm',
            activeClassName,
          )}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            top: indicatorStyle.top,
            height: indicatorStyle.height,
          }}
          transition={transition}
        />
      </div>
    );
  },
);
TabsList.displayName = 'TabsList';

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, children, className }, forwardedRef) => {
    const { activeValue, handleValueChange, registerTrigger } =
      React.useContext(TabsContext)!;

    const setRef = (node: HTMLButtonElement | null) => {
      registerTrigger(value, node);
      if (forwardedRef) {
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else {
          (forwardedRef as React.RefObject<HTMLButtonElement | null>).current =
            node;
        }
      }
    };

    return (
      <motion.button
        role="tab"
        whileTap={{ scale: 0.95 }}
        ref={setRef}
        onClick={() => handleValueChange(value)}
        data-state={activeValue === value ? 'active' : 'inactive'}
        className={cn(
          'inline-flex items-center h-full justify-center whitespace-nowrap rounded-sm px-2 py-1 text-sm font-medium ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground z-10',
          className,
        )}
      >
        {children}
      </motion.button>
    );
  },
);
TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentsProps {
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
}

const TabsContents = React.forwardRef<HTMLDivElement, TabsContentsProps>(
  (
    { children, className, transition = { duration: 0.3, ease: 'easeInOut' } },
    forwardedRef,
  ) => {
    const { activeValue } = React.useContext(TabsContext)!;
    const childrenArray = React.Children.toArray(children);
    const activeIndex = childrenArray.findIndex(
      (child): child is React.ReactElement<{ value: string }> =>
        React.isValidElement(child) &&
        typeof child.props === 'object' &&
        child.props !== null &&
        'value' in child.props &&
        child.props.value === activeValue,
    );

    const setRef = (node: HTMLDivElement | null) => {
      if (forwardedRef) {
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else {
          (forwardedRef as React.RefObject<HTMLDivElement | null>).current =
            node;
        }
      }
    };

    return (
      <div ref={setRef} className={cn('overflow-hidden', className)}>
        <motion.div
          className="flex"
          animate={{ x: activeIndex * -100 + '%' }}
          transition={transition}
        >
          {childrenArray.map((child, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {child}
            </div>
          ))}
        </motion.div>
      </div>
    );
  },
);
TabsContents.displayName = 'TabsContents';

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ children, className }, forwardedRef) => {
    return (
      <div role="tabpanel" ref={forwardedRef} className={className}>
        {children}
      </div>
    );
  },
);
TabsContent.displayName = 'TabsContent';

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentsProps,
  type TabsContentProps,
};
