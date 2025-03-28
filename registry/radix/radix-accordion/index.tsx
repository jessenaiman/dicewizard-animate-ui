'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { cn } from '@/lib/utils';

interface AccordionItemContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AccordionItemContext = React.createContext<
  AccordionItemContextValue | undefined
>(undefined);

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    children: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn('border-b', className)}
      {...props}
    >
      <AccordionItemContext.Provider value={{ isOpen, setIsOpen }}>
        {children}
      </AccordionItemContext.Provider>
    </AccordionPrimitive.Item>
  );
});
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const context = React.useContext(AccordionItemContext);

  if (!context) {
    throw new Error('AccordionTrigger must be used within an AccordionItem');
  }

  React.useEffect(() => {
    const node = triggerRef.current;
    if (!node) return;

    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.attributeName === 'data-state') {
          const currentState = node.getAttribute('data-state');
          context.setIsOpen(currentState === 'open');
        }
      });
    });
    observer.observe(node, {
      attributes: true,
      attributeFilter: ['data-state'],
    });
    const initialState = node.getAttribute('data-state');
    context.setIsOpen(initialState === 'open');
    return () => {
      observer.disconnect();
    };
  }, [context]);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={(node) => {
          triggerRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.RefObject<HTMLButtonElement | null>).current = node;
          }
        }}
        className={cn(
          'flex flex-1 items-center justify-between py-4 font-medium hover:underline',
          className,
        )}
        {...props}
      >
        {children}
        <motion.div
          animate={{ rotate: context.isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 17 }}
        >
          <ChevronDown className="size-5 shrink-0" />
        </motion.div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionItemContext);

  if (!context) {
    throw new Error('AccordionContent must be used within an AccordionItem');
  }

  return (
    <AnimatePresence>
      {context.isOpen && (
        <AccordionPrimitive.Content forceMount {...props}>
          <motion.div
            key="accordion-content"
            initial={{ height: 0, opacity: 0, '--mask-stop': '0%' }}
            animate={{ height: 'auto', opacity: 1, '--mask-stop': '100%' }}
            exit={{ height: 0, opacity: 0, '--mask-stop': '0%' }}
            transition={{ type: 'spring', stiffness: 150, damping: 17 }}
            style={{
              maskImage:
                'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
              WebkitMaskImage:
                'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
            }}
            className={cn('overflow-hidden text-sm', className)}
            ref={ref}
          >
            <div className="pb-4 pt-0">{children}</div>
          </motion.div>
        </AccordionPrimitive.Content>
      )}
    </AnimatePresence>
  );
});
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
