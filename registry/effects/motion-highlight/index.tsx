'use client';

import * as React from 'react';
import { AnimatePresence, Transition, motion } from 'motion/react';

import { cn } from '@/lib/utils';

type MotionHighlightMode = 'children' | 'parent';
type Bounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

interface MotionHighlightContextType {
  mode: MotionHighlightMode;
  activeValue: string | null;
  setActiveValue: (value: string | null) => void;
  setBounds: (bounds: DOMRect) => void;
  clearBounds: () => void;
  id: string;
  hover: boolean;
  className?: string;
  transition?: Transition;
  disabled?: boolean;
  exitDelay?: number;
}

const MotionHighlightContext = React.createContext<
  MotionHighlightContextType | undefined
>(undefined);

const useMotionHighlight = (): MotionHighlightContextType => {
  const context = React.useContext(MotionHighlightContext);
  if (!context) {
    throw new Error(
      'useMotionHighlight must be used within a MotionHighlightProvider',
    );
  }
  return context;
};

interface BaseMotionHighlightProps {
  mode?: MotionHighlightMode;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  className?: string;
  transition?: Transition;
  hover?: boolean;
  disabled?: boolean;
  exitDelay?: number;
}

interface ParentModeMotionHighlightProps {
  boundsOffset?: Partial<Bounds>;
  containerClassName?: string;
}

interface ControlledParentModeMotionHighlightProps
  extends BaseMotionHighlightProps,
    ParentModeMotionHighlightProps {
  mode: 'parent';
  controlledItems: true;
  children: React.ReactNode;
}

interface ControlledChildrenModeMotionHighlightProps
  extends BaseMotionHighlightProps {
  mode?: 'children' | undefined;
  controlledItems: true;
  children: React.ReactNode;
}

interface UncontrolledParentModeMotionHighlightProps
  extends BaseMotionHighlightProps,
    ParentModeMotionHighlightProps {
  mode: 'parent';
  controlledItems?: false;
  itemsClassName?: string;
  children: React.ReactElement | React.ReactElement[];
}

interface UncontrolledChildrenModeMotionHighlightProps
  extends BaseMotionHighlightProps {
  mode?: 'children';
  controlledItems?: false;
  itemsClassName?: string;
  children: React.ReactElement | React.ReactElement[];
}

type MotionHighlightProps =
  | ControlledParentModeMotionHighlightProps
  | ControlledChildrenModeMotionHighlightProps
  | UncontrolledParentModeMotionHighlightProps
  | UncontrolledChildrenModeMotionHighlightProps;

const MotionHighlight = React.forwardRef<HTMLDivElement, MotionHighlightProps>(
  (props, ref) => {
    const {
      children,
      value,
      defaultValue,
      onValueChange,
      className,
      transition = { type: 'spring', stiffness: 200, damping: 25 },
      hover = false,
      controlledItems,
      disabled = false,
      exitDelay = 0.2,
      mode = 'children',
    } = props;

    const localRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

    const [activeValue, setActiveValue] = React.useState<string | null>(
      value ?? defaultValue ?? null,
    );
    const [boundsState, setBoundsState] = React.useState<Bounds | null>(null);

    const id = React.useId();

    const handleSetActiveId = React.useCallback(
      (id: string | null) => {
        setActiveValue(id);
        onValueChange?.(id);
      },
      [onValueChange],
    );

    const setBounds = React.useCallback(
      (bounds: DOMRect) => {
        if (!localRef.current) return;
        const boundsOffset = (props as ParentModeMotionHighlightProps)
          ?.boundsOffset ?? {
          top: 0,
          left: 0,
          width: 0,
          height: 0,
        };
        const containerRect = localRef.current.getBoundingClientRect();
        setBoundsState({
          top: bounds.top - containerRect.top + (boundsOffset.top ?? 0),
          left: bounds.left - containerRect.left + (boundsOffset.left ?? 0),
          width: bounds.width + (boundsOffset.width ?? 0),
          height: bounds.height + (boundsOffset.height ?? 0),
        });
      },
      [props],
    );

    const clearBounds = React.useCallback(() => setBoundsState(null), []);

    React.useEffect(() => {
      if (value !== undefined) setActiveValue(value);
      else if (defaultValue !== undefined) setActiveValue(defaultValue);
    }, [value, defaultValue]);

    const render = React.useCallback(
      (children: React.ReactNode) => {
        if (mode === 'parent') {
          return (
            <div
              ref={localRef}
              className={cn(
                'relative',
                (props as ParentModeMotionHighlightProps)?.containerClassName,
              )}
            >
              <AnimatePresence>
                {boundsState && (
                  <motion.div
                    animate={{
                      top: boundsState.top,
                      left: boundsState.left,
                      width: boundsState.width,
                      height: boundsState.height,
                      opacity: 1,
                    }}
                    initial={{ opacity: 0 }}
                    exit={{
                      opacity: 0,
                      transition: {
                        ...transition,
                        delay: (transition?.delay ?? 0) + (exitDelay ?? 0),
                      },
                    }}
                    transition={transition}
                    className={cn('absolute bg-muted z-0', className)}
                  />
                )}
              </AnimatePresence>
              {children}
            </div>
          );
        }

        return children;
      },
      [mode, props, boundsState, transition, exitDelay, className],
    );

    return (
      <MotionHighlightContext.Provider
        value={{
          mode,
          activeValue,
          setActiveValue: handleSetActiveId,
          id,
          hover,
          className,
          transition,
          disabled,
          exitDelay,
          setBounds,
          clearBounds,
        }}
      >
        {controlledItems
          ? render(children)
          : render(
              React.Children.map(children, (child, index) => (
                <MotionHighlightItem
                  key={index}
                  className={props?.itemsClassName}
                >
                  {child}
                </MotionHighlightItem>
              )),
            )}
      </MotionHighlightContext.Provider>
    );
  },
);

MotionHighlight.displayName = 'MotionHighlight';

interface ExtendedChildProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  'data-active'?: string;
  'data-value'?: string;
  'data-disabled'?: string;
}

interface MotionHighlightItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
  id?: string;
  value?: string;
  className?: string;
  transition?: Transition;
  activeClassName?: string;
  disabled?: boolean;
  exitDelay?: number;
}

const MotionHighlightItem = React.forwardRef<
  HTMLDivElement,
  MotionHighlightItemProps
>(
  (
    {
      children,
      id,
      value,
      className,
      transition,
      disabled = false,
      activeClassName,
      exitDelay,
      ...props
    },
    ref,
  ) => {
    const itemId = React.useId();
    const {
      activeValue,
      setActiveValue,
      mode,
      setBounds,
      clearBounds,
      hover,
      className: contextClassName,
      transition: contextTransition,
      id: contextId,
      disabled: contextDisabled,
      exitDelay: contextExitDelay,
    } = useMotionHighlight();

    const element = children as React.ReactElement<ExtendedChildProps>;
    const childValue =
      id ??
      value ??
      element.props?.['data-value'] ??
      element.props?.id ??
      itemId;
    const isActive = activeValue === childValue;
    const isDisabled = disabled === undefined ? contextDisabled : disabled;
    const itemTransition = transition ?? contextTransition;

    const localRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

    React.useEffect(() => {
      if (mode !== 'parent') return;

      if (activeValue === childValue) {
        if (!localRef.current) return;
        const bounds = localRef.current.getBoundingClientRect();
        setBounds(bounds);
      }

      if (!activeValue) clearBounds();
    }, [mode, activeValue, setBounds, clearBounds, childValue]);

    if (!React.isValidElement(children)) return children;

    return (
      <div
        key={childValue}
        ref={localRef}
        className={cn('relative', className)}
        data-active={isActive ? 'true' : 'false'}
        data-value={childValue}
        aria-selected={isActive}
        data-disabled={isDisabled ? 'true' : 'false'}
        {...(hover
          ? {
              onMouseEnter: () => setActiveValue(childValue),
              onMouseLeave: () => setActiveValue(null),
            }
          : {
              onClick: () => setActiveValue(childValue),
            })}
        {...props}
      >
        {mode === 'children' && (
          <AnimatePresence>
            {isActive && !isDisabled && (
              <motion.div
                layoutId={`transition-background-${contextId}`}
                className={cn(
                  'absolute inset-0 bg-muted z-0',
                  contextClassName,
                  activeClassName,
                )}
                transition={itemTransition}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: {
                    ...itemTransition,
                    delay:
                      (itemTransition?.delay ?? 0) +
                      (exitDelay ?? contextExitDelay ?? 0),
                  },
                }}
                data-active={isActive ? 'true' : 'false'}
                aria-selected={isActive}
                data-disabled={isDisabled ? 'true' : 'false'}
                data-value={childValue}
              />
            )}
          </AnimatePresence>
        )}

        {React.cloneElement(element, {
          className: cn('relative z-[1]', element.props.className),
          'data-active': isActive ? 'true' : 'false',
          'aria-selected': isActive,
          'data-disabled': isDisabled ? 'true' : 'false',
          'data-value': childValue,
        })}
      </div>
    );
  },
);
MotionHighlightItem.displayName = 'MotionHighlightItem';

export {
  MotionHighlight,
  MotionHighlightItem,
  useMotionHighlight,
  type MotionHighlightProps,
  type MotionHighlightItemProps,
};
