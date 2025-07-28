'use client';

import * as React from 'react';
import { LayoutGroup, motion, type Transition } from 'motion/react';
import {
  TabGroup as TabGroupPrimitive,
  TabList as TabListPrimitive,
  Tab as TabPrimitive,
  TabPanels as TabPanelsPrimitive,
  TabPanel as TabPanelPrimitive,
  type TabGroupProps as TabGroupPrimitiveProps,
  type TabListProps as TabListPrimitiveProps,
  type TabProps as TabPrimitiveProps,
  type TabPanelsProps as TabPanelsPrimitiveProps,
  type TabPanelProps as TabPanelPrimitiveProps,
} from '@headlessui/react';

import {
  Highlight,
  HighlightItem,
  HighlightItemProps,
  HighlightProps,
} from '@/registry/primitives/effects/highlight';
import { useStrictContext } from '@/registry/hooks/use-strict-context';

type TabsContextType = {
  selectedIndex: number;
};

const [TabsProvider, useTabs] =
  useStrictContext<TabsContextType>('TabsContext');

type TabGroupProps<TTag extends React.ElementType = 'div'> =
  TabGroupPrimitiveProps<TTag> & {
    as?: TTag;
  };

function TabGroup<TTag extends React.ElementType = 'div'>({
  children,
  ...props
}: TabGroupProps<TTag>) {
  return (
    <TabGroupPrimitive data-slot="tab-group" {...props}>
      {(bag) => (
        <TabsProvider value={{ selectedIndex: bag.selectedIndex }}>
          {typeof children === 'function' ? children(bag) : children}
        </TabsProvider>
      )}
    </TabGroupPrimitive>
  );
}

type TabListProps<TTag extends React.ElementType = 'div'> =
  TabListPrimitiveProps<TTag> & {
    as?: TTag;
  };

function TabList<TTag extends React.ElementType = 'div'>(
  props: TabListProps<TTag>,
) {
  return <TabListPrimitive data-slot="tab-list" {...props} />;
}

type TabHighlightProps = Omit<HighlightProps, 'controlledItems' | 'value'>;

function TabHighlight({
  transition = { type: 'spring', stiffness: 200, damping: 25 },
  ...props
}: TabHighlightProps) {
  const { selectedIndex } = useTabs();

  return (
    <Highlight
      data-slot="tab-highlight"
      controlledItems
      value={selectedIndex.toString()}
      transition={transition}
      {...props}
    />
  );
}

type TabProps<TTag extends React.ElementType = 'button'> = Omit<
  TabPrimitiveProps<TTag>,
  'children'
> &
  Required<Pick<TabPrimitiveProps<TTag>, 'children'>> & {
    index: number;
    as?: TTag;
  };

function Tab<TTag extends React.ElementType = 'button'>(props: TabProps<TTag>) {
  const { index, as = 'button', ...rest } = props;

  return (
    <TabPrimitive
      data-slot="tabs-trigger"
      as={as as React.ElementType}
      {...rest}
    />
  );
}

type TabHighlightItemProps = HighlightItemProps & {
  index: number;
};

function TabHighlightItem({ index, ...props }: TabHighlightItemProps) {
  return (
    <HighlightItem
      data-slot="tabs-highlight-item"
      value={index.toString()}
      {...props}
    />
  );
}

type TabPanelProps<TTag extends React.ElementType = typeof motion.div> = Omit<
  TabPanelPrimitiveProps<TTag>,
  'transition'
> & {
  children: React.ReactNode;
  as?: TTag;
  transition?: Transition;
};

function TabPanel<TTag extends React.ElementType = typeof motion.div>(
  props: TabPanelProps<TTag>,
) {
  const {
    as = motion.div,
    transition = { duration: 0.5, ease: 'easeInOut' },
    ...rest
  } = props;

  return (
    <TabPanelPrimitive
      data-slot="tabs-content"
      layout
      initial={{ opacity: 0, filter: 'blur(4px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(4px)' }}
      transition={transition}
      as={as as React.ElementType}
      {...rest}
    />
  );
}

type TabPanelsProps<TTag extends React.ElementType = typeof motion.div> = Omit<
  TabPanelsPrimitiveProps<TTag>,
  'transition'
> & {
  className?: string;
  as?: TTag;
  transition?: Transition;
};

function TabPanels<TTag extends React.ElementType = typeof motion.div>(
  props: TabPanelsProps<TTag>,
) {
  const {
    as = motion.div,
    transition = { type: 'spring', stiffness: 200, damping: 25 },
    ...rest
  } = props;

  return (
    <LayoutGroup id="tabs-contents-group">
      <TabPanelsPrimitive
        data-slot="tabs-contents"
        layout="size"
        style={{ overflow: 'hidden' }}
        transition={{ layout: transition }}
        as={as as React.ElementType}
        {...rest}
      />
    </LayoutGroup>
  );
}

export {
  TabGroup,
  TabList,
  TabHighlight,
  TabHighlightItem,
  Tab,
  TabPanel,
  TabPanels,
  type TabGroupProps,
  type TabListProps,
  type TabHighlightProps,
  type TabHighlightItemProps,
  type TabProps,
  type TabPanelProps,
  type TabPanelsProps,
};
