'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabsContents,
  type TabsProps,
} from '@/components/animate-ui/tabs';
import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/animate-ui/copy-button';

type InstallTabsProps = {
  commands: Record<string, string>;
  lang?: string;
  themes?: {
    light: string;
    dark: string;
  };
  copyButton?: boolean;
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
      defaultValue,
      value,
      onValueChange,
      copyButton = true,
      ...props
    },
    ref,
  ) => {
    const { resolvedTheme } = useTheme();

    const [highlightedCommands, setHighlightedCommands] = React.useState<
      Record<string, string>
    >({});
    const [selectedCommand, setSelectedCommand] = React.useState<string>(
      value ?? defaultValue ?? Object.keys(commands)[0],
    );

    React.useEffect(() => {
      async function loadHighlightedCode() {
        try {
          const { codeToHtml } = await import('shiki');
          const newHighlightedCommands: Record<string, string> = {};

          for (const [command, val] of Object.entries(commands)) {
            const highlighted = await codeToHtml(val, {
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
        {...(props as Omit<
          TabsProps,
          'value' | 'defaultValue' | 'onValueChange'
        >)}
        value={selectedCommand}
        onValueChange={(val) => {
          setSelectedCommand(val);
          onValueChange?.(val);
        }}
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

          {copyButton && (
            <CopyButton
              content={commands[selectedCommand]}
              size="sm"
              variant="ghost"
              className="-mr-2.5 bg-transparent hover:bg-neutral-300 dark:hover:bg-neutral-700"
            />
          )}
        </TabsList>
        <TabsContents className="rounded-b-lg dark:bg-neutral-900 dark:text-white bg-neutral-100 text-black">
          {Object.entries(highlightedCommands).map(([command, val]) => (
            <TabsContent
              key={command}
              className="h-12 w-full text-sm flex items-center px-4 overflow-auto"
              value={command}
            >
              <div
                className="[&>pre,_&_code]:!bg-transparent [&>pre,_&_code]:[background:transparent_!important] [&>pre,_&_code]:border-none [&_code]:!text-sm"
                dangerouslySetInnerHTML={{ __html: val }}
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
