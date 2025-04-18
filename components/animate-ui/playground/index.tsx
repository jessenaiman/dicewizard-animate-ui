'use client';

import React, { useState } from 'react';
import { CodeEditor } from './code-editor';
import { motion } from 'motion/react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { CopyButton } from '@/registry/buttons/copy-button';
import ReactIcon from '@/components/icons/react-icon';

export const Playground = () => {
  const globalId = React.useId();
  const [code, setCode] = useState(`'use client';

import * as React from 'react';

export const Demo = () => {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
};
`);

  return (
    <>
      <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm" />
      <motion.div
        layoutId={`playground-${globalId}`}
        className="flex flex-col fixed inset-10 p-4 bg-background rounded-[28px]"
      >
        <div className="w-full h-10 bg-muted rounded-t-2xl flex flex-row justify-between items-center gap-2 text-muted-foreground px-4">
          <div className="flex flex-row items-center gap-2">
            <ReactIcon className="size-3.5" />

            <figcaption className="flex-1 truncate text-muted-foreground text-[13px]">
              Playground
            </figcaption>
          </div>
          <div className="flex flex-row items-center gap-2">
            <CopyButton
              content={code}
              size="sm"
              variant="ghost"
              className="-me-2 bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
            />
          </div>
        </div>

        <div className="flex flex-row size-full">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel minSize={20} className="pr-2">
              <CodeEditor code={code} setCode={setCode} />
            </ResizablePanel>
            <ResizableHandle className="bg-transparent after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:w-1.5 after:h-20 after:rounded-full after:bg-border" />
            <ResizablePanel minSize={20} className="pl-2">
              <div className="w-full h-full border border-border rounded-2xl">
                <h1>Hello</h1>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </motion.div>
    </>
  );
};
