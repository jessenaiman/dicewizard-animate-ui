'use client';

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { InstallTabs } from './install-tabs';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { CollapsibleContent } from 'fumadocs-ui/components/ui/collapsible';
import { Collapsible } from 'fumadocs-ui/components/ui/collapsible';
import { CollapsibleTrigger } from 'fumadocs-ui/components/ui/collapsible';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';

export const ComponentManualInstallation = ({
  dependencies,
  code,
}: {
  dependencies?: string[];
  code: string;
}) => {
  const commands = {
    npm: `npm install ${dependencies?.join(' ')}`,
    pnpm: `pnpm add ${dependencies?.join(' ')}`,
    yarn: `yarn add ${dependencies?.join(' ')}`,
    bun: `bun add ${dependencies?.join(' ')}`,
  };

  const [isOpened, setIsOpened] = useState(false);
  const collapsibleRef = useRef<HTMLDivElement>(null);

  return (
    <Steps>
      {dependencies && (
        <Step>
          <h4 className="pt-1 pb-4">Install the following dependencies:</h4>
          <InstallTabs commands={commands} />
        </Step>
      )}

      <Step>
        <h4 className="pt-1 pb-4">
          Copy and paste the following code into your project:
        </h4>

        <Collapsible open={isOpened} onOpenChange={setIsOpened}>
          <div ref={collapsibleRef} className="relative overflow-hidden">
            <CollapsibleContent
              forceMount
              className={cn('overflow-hidden', !isOpened && 'max-h-32')}
            >
              <div
                className={cn(
                  '[&_pre]:my-0 [&_pre]:max-h-[650px] [&_code]:pb-[60px]',
                  !isOpened
                    ? '[&_pre]:overflow-hidden'
                    : '[&_pre]:overflow-auto]',
                )}
              >
                <DynamicCodeBlock code={code} lang="tsx" />
              </div>
            </CollapsibleContent>
            <div
              className={cn(
                'absolute flex items-center justify-center bg-gradient-to-b from-zinc-700/30 to-zinc-950/90 p-2',
                isOpened ? 'inset-x-0 bottom-0 h-12' : 'inset-0',
              )}
            >
              <CollapsibleTrigger asChild>
                <Button variant="secondary" className="h-8 text-xs">
                  {isOpened ? 'Collapse' : 'Expand'}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
        </Collapsible>
      </Step>

      <Step>
        <h4 className="pt-1 pb-4">
          Update the import paths to match your project setup.
        </h4>
      </Step>
    </Steps>
  );
};
