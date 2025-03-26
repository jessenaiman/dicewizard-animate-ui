'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>;

const Tabs = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      ref={ref}
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
});
Tabs.displayName = 'Tabs';

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> & {
  activeClassName?: string;
};

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, activeClassName, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

    const [indicatorStyle, setIndicatorStyle] = useState({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    });

    const updateIndicator = useCallback(() => {
      if (!localRef.current) return;

      const activeTab = localRef.current.querySelector<HTMLElement>(
        '[data-state="active"]',
      );
      if (!activeTab) return;

      const activeRect = activeTab.getBoundingClientRect();
      const tabsRect = localRef.current.getBoundingClientRect();

      setIndicatorStyle({
        left: activeRect.left - tabsRect.left,
        top: activeRect.top - tabsRect.top,
        width: activeRect.width,
        height: activeRect.height,
      });
    }, []);

    useEffect(() => {
      updateIndicator();
      window.addEventListener('resize', updateIndicator);
      const observer = new MutationObserver(updateIndicator);

      if (localRef.current) {
        observer.observe(localRef.current, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      }

      return () => {
        window.removeEventListener('resize', updateIndicator);
        observer.disconnect();
      };
    }, [updateIndicator]);

    return (
      <div className="relative" ref={localRef}>
        <TabsPrimitive.List
          data-slot="tabs-list"
          className={cn(
            'bg-muted text-muted-foreground inline-flex h-10 w-fit items-center justify-center rounded-lg p-[4px]',
            className,
          )}
          {...props}
        />
        <motion.div
          className={cn(
            'absolute rounded-sm bg-background shadow-sm',
            activeClassName,
          )}
          animate={{
            left: indicatorStyle.left,
            top: indicatorStyle.top,
            width: indicatorStyle.width,
            height: indicatorStyle.height,
          }}
          transition={{
            type: 'spring',
            bounce: 0,
            stiffness: 300,
            damping: 30,
          }}
        />
      </div>
    );
  },
);
TabsList.displayName = 'TabsList';

type TabsTriggerProps = React.ComponentProps<typeof TabsPrimitive.Trigger>;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'inline-flex items-center h-full justify-center whitespace-nowrap rounded-sm px-2 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground z-10',
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = 'TabsTrigger';

type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Content>;

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <TabsPrimitive.Content
        asChild
        data-slot="tabs-content"
        className={cn('flex-1 outline-none', className)}
        {...props}
      >
        <motion.div
          ref={ref}
          layout
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut',
          }}
        >
          {children}
        </motion.div>
      </TabsPrimitive.Content>
    );
  },
);
TabsContent.displayName = 'TabsContent';

type TabsContentsProps = {
  children: React.ReactNode;
  className?: string;
};

const TabsContents = React.forwardRef<HTMLDivElement, TabsContentsProps>(
  ({ children, className }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
    );

    const [height, setHeight] = useState(0);

    useEffect(() => {
      if (!containerRef.current) return;

      const resizeObserver = new ResizeObserver((entries) => {
        const newHeight = entries[0].contentRect.height;
        requestAnimationFrame(() => {
          setHeight(newHeight);
        });
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }, [children]);

    useLayoutEffect(() => {
      if (containerRef.current) {
        const initialHeight =
          containerRef.current.getBoundingClientRect().height;
        setHeight(initialHeight);
      }
    }, [children]);

    return (
      <motion.div
        layout
        animate={{ height: height }}
        transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        className={className}
      >
        <div ref={containerRef}>{children}</div>
      </motion.div>
    );
  },
);
TabsContents.displayName = 'TabsContents';

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
  type TabsContentsProps,
};
