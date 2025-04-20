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
  activeClassName?: string;
  setActiveClassName: (className: string) => void;
  transition?: Transition;
  disabled?: boolean;
  enabled?: boolean;
  exitDelay?: number;
  forceUpdateBounds?: boolean;
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
  enabled?: boolean;
  exitDelay?: number;
}

interface ParentModeMotionHighlightProps {
  boundsOffset?: Partial<Bounds>;
  containerClassName?: string;
  forceUpdateBounds?: boolean;
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
      transition = { type: 'spring', stiffness: 350, damping: 35 },
      hover = false,
      enabled = true,
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
    const [activeClassNameState, setActiveClassNameState] =
      React.useState<string>('');

    const isFirstBoundsRender = React.useRef(true);

    React.useEffect(() => {
      if (boundsState !== null) {
        isFirstBoundsRender.current = false;
        return;
      }
      isFirstBoundsRender.current = true;
    }, [boundsState]);

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
              <AnimatePresence initial={false}>
                {boundsState && (
                  <motion.div
                    animate={{
                      top: boundsState.top,
                      left: boundsState.left,
                      width: boundsState.width,
                      height: boundsState.height,
                      opacity: 1,
                    }}
                    initial={
                      isFirstBoundsRender.current
                        ? {
                            top: boundsState.top,
                            left: boundsState.left,
                            width: boundsState.width,
                            height: boundsState.height,
                            opacity: 0,
                          }
                        : { opacity: 0 }
                    }
                    exit={{
                      opacity: 0,
                      transition: {
                        ...transition,
                        delay: (transition?.delay ?? 0) + (exitDelay ?? 0),
                      },
                    }}
                    transition={transition}
                    className={cn(
                      'absolute bg-muted z-0',
                      className,
                      activeClassNameState,
                    )}
                  />
                )}
              </AnimatePresence>
              {children}
            </div>
          );
        }

        return children;
      },
      [
        mode,
        props,
        boundsState,
        transition,
        exitDelay,
        className,
        activeClassNameState,
      ],
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
          enabled,
          exitDelay,
          setBounds,
          clearBounds,
          activeClassName: activeClassNameState,
          setActiveClassName: setActiveClassNameState,
          forceUpdateBounds: (props as ParentModeMotionHighlightProps)
            ?.forceUpdateBounds,
        }}
      >
        {enabled
          ? controlledItems
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
              )
          : children}
      </MotionHighlightContext.Provider>
    );
  },
);

MotionHighlight.displayName = 'MotionHighlight';

interface ExtendedChildProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  ref?: React.Ref<HTMLElement>;
  'data-active'?: string;
  'data-value'?: string;
  'data-disabled'?: boolean;
  'data-highlight'?: boolean;
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
  asChild?: boolean;
  forceUpdateBounds?: boolean;
}

function getNonOverridingDataAttributes(
  element: React.ReactElement,
  dataAttributes: Record<string, unknown>,
): Record<string, unknown> {
  return Object.keys(dataAttributes).reduce<Record<string, unknown>>(
    (acc, key) => {
      if ((element.props as Record<string, unknown>)[key] === undefined) {
        acc[key] = dataAttributes[key];
      }
      return acc;
    },
    {},
  );
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
      asChild = false,
      forceUpdateBounds,
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
      enabled,
      className: contextClassName,
      transition: contextTransition,
      id: contextId,
      disabled: contextDisabled,
      exitDelay: contextExitDelay,
      forceUpdateBounds: contextForceUpdateBounds,
      setActiveClassName,
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
      let rafId: number;
      let previousBounds: Bounds | null = null;
      const shouldUpdateBounds =
        forceUpdateBounds === true ||
        (contextForceUpdateBounds && forceUpdateBounds !== false);

      const updateBounds = () => {
        if (!localRef.current) return;

        const bounds = localRef.current.getBoundingClientRect();

        if (shouldUpdateBounds) {
          if (
            previousBounds &&
            previousBounds.top === bounds.top &&
            previousBounds.left === bounds.left &&
            previousBounds.width === bounds.width &&
            previousBounds.height === bounds.height
          )
            return;
          previousBounds = bounds;
          rafId = requestAnimationFrame(updateBounds);
        }

        setBounds(bounds);
      };

      if (activeValue === childValue) {
        updateBounds();
        setActiveClassName(activeClassName ?? '');
      }

      if (!activeValue) clearBounds();

      if (shouldUpdateBounds) return () => cancelAnimationFrame(rafId);
    }, [
      mode,
      activeValue,
      setBounds,
      clearBounds,
      childValue,
      activeClassName,
      setActiveClassName,
      forceUpdateBounds,
      contextForceUpdateBounds,
    ]);

    if (!React.isValidElement(children)) return children;

    const dataAttributes = {
      'data-active': isActive ? 'true' : 'false',
      'aria-selected': isActive,
      'data-disabled': isDisabled,
      'data-value': childValue,
      'data-highlight': true,
    };

    if (asChild) {
      if (mode === 'children') {
        return React.cloneElement(
          element,
          {
            key: childValue,
            ref: localRef,
            className: cn('relative', element.props.className),
            ...dataAttributes,
            ...(hover
              ? {
                  onMouseEnter: () => setActiveValue(childValue),
                  onMouseLeave: () => setActiveValue(null),
                }
              : {
                  onClick: () => setActiveValue(childValue),
                }),
            ...props,
          },
          <>
            <AnimatePresence initial={false}>
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
                  {...dataAttributes}
                />
              )}
            </AnimatePresence>

            <div
              className={cn('relative z-[1]', className)}
              {...dataAttributes}
            >
              {children}
            </div>
          </>,
        );
      }

      return React.cloneElement(element, {
        ref: localRef,
        ...getNonOverridingDataAttributes(element, dataAttributes),
        ...(hover
          ? {
              onMouseEnter: (e) => {
                setActiveValue(childValue);
                element.props.onMouseEnter?.(e);
              },
              onMouseLeave: (e) => {
                setActiveValue(null);
                element.props.onMouseLeave?.(e);
              },
            }
          : {
              onClick: (e) => {
                setActiveValue(childValue);
                element.props.onClick?.(e);
              },
            }),
      });
    }

    return enabled ? (
      <div
        key={childValue}
        ref={localRef}
        className={cn(mode === 'children' && 'relative', className)}
        {...dataAttributes}
        {...props}
        {...(hover
          ? {
              onMouseEnter: (e) => {
                setActiveValue(childValue);
                element.props.onMouseEnter?.(e);
              },
              onMouseLeave: (e) => {
                setActiveValue(null);
                element.props.onMouseLeave?.(e);
              },
            }
          : {
              onClick: (e) => {
                setActiveValue(childValue);
                element.props.onClick?.(e);
              },
            })}
      >
        {mode === 'children' && (
          <AnimatePresence initial={false}>
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
                {...dataAttributes}
              />
            )}
          </AnimatePresence>
        )}

        {React.cloneElement(element, {
          className: cn('relative z-[1]', element.props.className),
          ...getNonOverridingDataAttributes(element, dataAttributes),
        })}
      </div>
    ) : (
      children
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
