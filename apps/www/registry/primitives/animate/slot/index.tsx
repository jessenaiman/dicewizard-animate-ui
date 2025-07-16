import * as React from 'react';
import {
  motion,
  useInView,
  type Variant,
  type MotionProps,
  type UseInViewOptions,
} from 'motion/react';

type WithoutRef<E extends React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<E>,
  keyof MotionProps | 'as'
>;

export type SlotProps<E extends React.ElementType = 'div'> = {
  as?: E;
  inView?: boolean;
  inViewOnce?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  hidden?: Variant;
  visible?: Variant;
} & MotionProps &
  WithoutRef<E>;

export function Slot<E extends React.ElementType = 'div'>({
  ref,
  as,
  inView,
  inViewOnce = false,
  inViewMargin = '0px',
  hidden,
  visible,
  variants,
  ...props
}: SlotProps<E>) {
  const Base = as ?? ('div' as React.ElementType);
  const Component =
    typeof Base === 'string'
      ? // @ts-expect-error: Cannot index motion with a dynamic ElementType
        motion[Base]
      : motion(Base as React.ComponentType);

  const localRef = React.useRef<HTMLElement>(null);
  React.useImperativeHandle(ref, () => localRef.current as HTMLElement);

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = inView ?? inViewResult;

  return (
    <Component
      ref={localRef}
      {...(inView && hidden && visible
        ? {
            initial: 'hidden',
            animate: isInView ? 'visible' : 'hidden',
            exit: 'hidden',
            variants: {
              hidden: hidden ?? {},
              visible: visible ?? {},
              ...variants,
            },
          }
        : {
            variants,
          })}
      {...props}
    />
  );
}
