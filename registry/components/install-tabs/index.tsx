'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'motion/react';
import { CheckIcon, CopyIcon } from 'lucide-react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabsContents,
  type TabsProps,
} from '@/components/animate-ui/tabs';
import { cn } from '@/lib/utils';

type InstallTabsProps = {
  commands: Record<string, string>;
  lang?: string;
  themes?: {
    light: string;
    dark: string;
  };
} & Omit<TabsProps, 'children'>;

const InstallTabs = React.forwardRef<HTMLDivElement, InstallTabsProps>(
  (
    {
      commands,
      lang = 'bash',
      themes = {
        light: 'github-light',
        dark: 'github-dark',
      },
      className,
      ...props
    },
    ref,
  ) => {
    const { resolvedTheme } = useTheme();

    const [highlightedCommands, setHighlightedCommands] = React.useState<
      Record<string, string>
    >({});
    const [isCopied, setIsCopied] = React.useState(false);

    React.useEffect(() => {
      async function loadHighlightedCode() {
        try {
          const { codeToHtml } = await import('shiki');
          const newHighlightedCommands: Record<string, string> = {};

          for (const [command, value] of Object.entries(commands)) {
            const highlighted = await codeToHtml(value, {
              lang,
              themes: {
                light: themes.light,
                dark: themes.dark,
              },
              defaultColor: resolvedTheme === 'dark' ? 'dark' : 'light',
            });

            newHighlightedCommands[command] = highlighted;
          }

          setHighlightedCommands(newHighlightedCommands);
        } catch (error) {
          console.error('Error highlighting commands', error);
          setHighlightedCommands(commands);
        }
      }
      loadHighlightedCode();
    }, [commands, resolvedTheme, lang, themes.light, themes.dark]);

    return (
      <Tabs
        ref={ref}
        className={cn(
          'w-full gap-0 dark:bg-neutral-800 bg-neutral-200 rounded-lg border border-neutral-200 dark:border-neutral-800',
          className,
        )}
        {...(props as TabsProps)}
      >
        <TabsList
          className="w-full relative justify-between rounded-b-none h-9 dark:text-white text-black dark:bg-neutral-800 bg-neutral-200 py-0 px-4"
          activeClassName="rounded-none shadow-none bg-transparent after:content-[''] after:absolute after:inset-x-0 after:h-0.5 after:bottom-0 dark:after:bg-white after:bg-black after:rounded-t-full"
        >
          <div className="flex gap-x-3 h-full">
            {Object.keys(highlightedCommands).map((command) => (
              <TabsTrigger
                key={command}
                value={command}
                className="dark:text-neutral-400 text-neutral-500 dark:data-[state=active]:text-white data-[state=active]:text-black px-0"
              >
                {command}
              </TabsTrigger>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="size-6 rounded-sm -mr-2.5 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center"
            onClick={() => {
              if (isCopied) return;
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            }}
          >
            <AnimatePresence mode="wait">
              {isCopied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <CheckIcon className="size-3.5" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <CopyIcon className="size-3.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </TabsList>
        <TabsContents className="rounded-b-lg dark:bg-neutral-900 dark:text-white bg-neutral-100 text-black">
          {Object.entries(highlightedCommands).map(([command, value]) => (
            <TabsContent
              key={command}
              className="h-12 w-full text-sm flex items-center px-4 overflow-auto"
              value={command}
            >
              <div
                className="[&>pre,_&_code]:!bg-transparent [&>pre,_&_code]:[background:transparent_!important] [&>pre,_&_code]:border-none [&_code]:!text-sm"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            </TabsContent>
          ))}
        </TabsContents>
      </Tabs>
    );
  },
);

InstallTabs.displayName = 'InstallTabs';

export { InstallTabs, type InstallTabsProps };
