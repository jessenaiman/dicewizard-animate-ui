'use client';

import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/registry/components/tabs';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { cn } from '@/lib/utils';

export const InstallTabs = ({
  commands,
}: {
  commands: Record<'npm' | 'pnpm' | 'yarn' | 'bun', string>;
}) => {
  return (
    <Tabs
      defaultValue="npm"
      className="relative overflow-hidden w-full border border-fd-border rounded-lg gap-0"
    >
      <TabsList
        className="justify-start border-b border-fd-border w-full rounded-none h-9 flex flex-row items-end bg-fd-secondary/50 overflow-x-auto text-fd-muted-foreground"
        activeClassName="bg-neutral-200 dark:bg-neutral-950 shadow-none rounded-md"
      >
        {Object.keys(commands).map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="relative border-none rounded-md px-4 py-2 h-full font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContents>
        {Object.entries(commands).map(([tab, code]) => (
          <TabsContent key={tab} value={tab} className="overflow-hidden">
            <DynamicCodeBlock
              options={{
                components: {
                  pre(props) {
                    return (
                      <CodeBlock
                        {...props}
                        className={cn(
                          'my-0 border-none rounded-none [&_button]:top-2.5 [&_button]:right-2.5',
                          props.className,
                        )}
                      >
                        <Pre>{props.children}</Pre>
                      </CodeBlock>
                    );
                  },
                },
              }}
              code={code}
              lang="bash"
            />
          </TabsContent>
        ))}
      </TabsContents>
    </Tabs>
  );
};
