'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/registry/icons/icon';

type BinaryProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    path1: {},
    path2: {
      initial: {
        y: 0,
      },
      animate: {
        y: 4,
        transition: {
          duration: 0.4,
          ease: 'easeInOut',
        },
      },
    },
    path3: {},
    path4: {},
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: BinaryProps) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.path
        d="M6 20h4"
        variants={variants.path1}
        initial="initial"
        animate={controls}
      />
      <motion.path
        d="M14 10h4"
        variants={variants.path2}
        initial="initial"
        animate={controls}
      />
      <motion.path
        d="M6 14h2v6"
        variants={variants.path3}
        initial="initial"
        animate={controls}
      />
      <motion.path
        d="M14 4h2v6"
        variants={variants.path4}
        initial="initial"
        animate={controls}
      />
    </motion.svg>
  );
}

function Binary(props: BinaryProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  Binary,
  Binary as BinaryIcon,
  type BinaryProps,
  type BinaryProps as BinaryIconProps,
};
