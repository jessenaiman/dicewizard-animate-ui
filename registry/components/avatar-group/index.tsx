'use client';

import * as React from 'react';
import { motion, type Transition } from 'motion/react';

import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type TooltipProps,
  type TooltipContentProps,
} from '@/registry/components/tooltip';

interface AvatarProps extends TooltipProps {
  children: React.ReactNode;
  index: number;
  invertZIndex: boolean;
  transition: Transition;
  translate: string | number;
}

const Avatar: React.FC<AvatarProps> = ({
  children,
  index,
  invertZIndex,
  transition,
  translate,
  ...props
}: AvatarProps) => {
  return (
    <Tooltip {...props}>
      <TooltipTrigger>
        <motion.div
          initial="initial"
          whileHover="hover"
          whileTap="hover"
          className="relative"
          style={{
            zIndex: invertZIndex
              ? React.Children.count(children) - index
              : index,
          }}
        >
          <motion.div
            variants={{
              initial: { translateY: 0 },
              hover: { translateY: translate },
            }}
            transition={transition}
          >
            {children}
          </motion.div>
        </motion.div>
      </TooltipTrigger>
    </Tooltip>
  );
};

type AvatarGroupTooltipProps = TooltipContentProps;

const AvatarGroupTooltip: React.FC<AvatarGroupTooltipProps> = ({
  children,
  ...props
}) => {
  return <TooltipContent {...props}>{children}</TooltipContent>;
};
AvatarGroupTooltip.displayName = 'AvatarGroupTooltip';

interface AvatarGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'translate'> {
  children: React.ReactElement[];
  transition?: Transition;
  invertZIndex?: boolean;
  translate?: string | number;
  tooltipProps?: TooltipProps;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      children,
      className,
      transition = { type: 'spring', stiffness: 300, damping: 17 },
      invertZIndex = false,
      translate = '-30%',
      tooltipProps = { side: 'top', sideOffset: 20 },
      ...props
    },
    ref,
  ) => {
    return (
      <TooltipProvider openDelay={0} closeDelay={0}>
        <div
          ref={ref}
          className={cn('flex flex-row -space-x-2 items-center h-8', className)}
          {...props}
        >
          {children?.map((child, index) => (
            <Avatar
              key={index}
              index={index}
              invertZIndex={invertZIndex}
              transition={transition}
              translate={translate}
              {...tooltipProps}
            >
              {child}
            </Avatar>
          ))}
        </div>
      </TooltipProvider>
    );
  },
);
AvatarGroup.displayName = 'AvatarGroup';

export {
  AvatarGroup,
  AvatarGroupTooltip,
  type AvatarGroupProps,
  type AvatarGroupTooltipProps,
};
