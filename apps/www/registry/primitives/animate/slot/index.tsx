import * as React from 'react';
import { motion, isMotionComponent, type HTMLMotionProps } from 'motion/react';

type AnyProps = Record<string, unknown>;

type DOMMotionProps<T extends HTMLElement = HTMLElement> = Omit<
  HTMLMotionProps<'div'>,
  'ref'
> & {
  ref?: React.Ref<T>;
};

type WithAsChild<Base extends object, Default extends object> =
  | (Base & Default & { asChild: true; children: React.ReactElement })
  | (Base &
      Default & {
        asChild?: false | undefined;
      });

type SlotProps<T extends HTMLElement = HTMLElement> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
} & DOMMotionProps<T>;

function Slot<T extends HTMLElement = HTMLElement>({
  children,
  ref: outerRef,
  ...props
}: SlotProps<T>) {
  const isAlreadyMotion =
    typeof children.type === 'object' &&
    children.type !== null &&
    isMotionComponent(children.type);

  const Base = isAlreadyMotion
    ? (children.type as React.ElementType)
    : motion(children.type as React.ElementType);

  const { ref: childRef, ...childProps } = children.props as AnyProps;
  const ref = React.useImperativeHandle(outerRef, () => childRef as T);

  if (!React.isValidElement(children)) return null;

  return <Base {...childProps} {...props} ref={ref} />;
}

export {
  Slot,
  type SlotProps,
  type WithAsChild,
  type DOMMotionProps,
  type AnyProps,
};
