'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FileIcon, FolderClosedIcon, FolderOpenIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionItemProps,
  AccordionTrigger,
  AccordionTriggerProps,
  useAccordionItem,
} from '@/registry/radix/radix-accordion';
import {
  MotionHighlight,
  MotionHighlightItem,
} from '@/registry/effects/motion-highlight';

interface FileButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  icons?: {
    close: React.ElementType;
    open: React.ElementType;
  };
  icon?: React.ElementType;
  open?: boolean;
}

const FileButton = React.forwardRef<HTMLDivElement, FileButtonProps>(
  ({ children, className, icons: Icons, icon: Icon, open, ...props }, ref) => {
    return (
      <MotionHighlightItem className="size-full">
        <div
          ref={ref}
          className={cn(
            'flex items-center gap-2 p-2 h-10 relative z-10 rounded-lg w-full cursor-default',
            className,
          )}
          {...props}
        >
          {Icon ? (
            <Icon className="size-4" />
          ) : (
            Icons && (
              <AnimatePresence mode="wait">
                <motion.span
                  key={open ? 'open' : 'close'}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                >
                  {open ? (
                    <Icons.open className="size-4" />
                  ) : (
                    <Icons.close className="size-4" />
                  )}
                </motion.span>
              </AnimatePresence>
            )
          )}
          <span className="text-sm block truncate">{children}</span>
        </div>
      </MotionHighlightItem>
    );
  },
);
FileButton.displayName = 'FileButton';

type FilesProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  activeClassName?: string;
  defaultOpen?: string[];
  open?: string[];
  onOpenChange?: (open: string[]) => void;
};

const Files = React.forwardRef<HTMLDivElement, FilesProps>(
  (
    {
      children,
      className,
      activeClassName,
      defaultOpen,
      open,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative size-full rounded-xl border bg-background overflow-auto',
          className,
        )}
        {...props}
      >
        <MotionHighlight
          controlledItems
          mode="parent"
          hover
          className={cn(
            'bg-muted rounded-lg pointer-events-none',
            activeClassName,
          )}
        >
          <Accordion
            type="multiple"
            className="p-2"
            defaultValue={defaultOpen}
            value={open}
            onValueChange={onOpenChange}
          >
            {children}
          </Accordion>
        </MotionHighlight>
      </div>
    );
  },
);
Files.displayName = 'Files';

type FolderTriggerProps = AccordionTriggerProps;

const FolderTrigger = React.forwardRef<HTMLButtonElement, FolderTriggerProps>(
  ({ children, className, ...props }, ref) => {
    const { isOpen } = useAccordionItem();

    return (
      <AccordionTrigger
        ref={ref}
        className="h-auto py-0 hover:no-underline font-normal relative z-10"
        {...props}
        chevron={false}
      >
        <FileButton
          open={isOpen}
          icons={{ open: FolderOpenIcon, close: FolderClosedIcon }}
          className={className}
        >
          {children}
        </FileButton>
      </AccordionTrigger>
    );
  },
);
FolderTrigger.displayName = 'FolderTrigger';

type FolderProps = Omit<
  AccordionItemProps,
  'value' | 'onValueChange' | 'defaultValue' | 'children'
> & {
  children?: React.ReactNode;
  name: string;
  open?: string[];
  onOpenChange?: (open: string[]) => void;
  defaultOpen?: string[];
};

const Folder = React.forwardRef<HTMLDivElement, FolderProps>(
  (
    { children, className, name, open, defaultOpen, onOpenChange, ...props },
    ref,
  ) => (
    <AccordionItem
      ref={ref}
      value={name}
      className="relative border-b-0"
      {...props}
    >
      <FolderTrigger className={className}>{name}</FolderTrigger>
      {children && (
        <AccordionContent className="relative pb-0 !ml-7 before:absolute before:-left-3 before:inset-y-0 before:w-px before:h-full before:bg-border">
          <Accordion
            type="multiple"
            defaultValue={defaultOpen}
            value={open}
            onValueChange={onOpenChange}
          >
            {children}
          </Accordion>
        </AccordionContent>
      )}
    </AccordionItem>
  ),
);
Folder.displayName = 'Folder';

type FileProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  name: string;
};

const File = React.forwardRef<HTMLDivElement, FileProps>(
  ({ name, className, ...props }, ref) => (
    <FileButton ref={ref} icon={FileIcon} className={className} {...props}>
      {name}
    </FileButton>
  ),
);
File.displayName = 'File';

export {
  Files,
  Folder,
  File,
  type FilesProps,
  type FolderProps,
  type FileProps,
};
