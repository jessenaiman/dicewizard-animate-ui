import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type TooltipProviderProps,
  type TooltipProps,
  type TooltipContentProps,
} from '@/registry/__registry__/components/tooltip/shadcn-new-york';
import React from 'react';

type TooltipDemoProps = Pick<TooltipProviderProps, 'openDelay' | 'closeDelay'> &
  Pick<TooltipProps, 'side' | 'sideOffset' | 'align' | 'alignOffset'> &
  Pick<TooltipContentProps, 'arrow'>;

export const TooltipDemo = ({
  openDelay,
  closeDelay,
  side,
  sideOffset,
  align,
  alignOffset,
  arrow,
}: TooltipDemoProps) => {
  return (
    <TooltipProvider openDelay={openDelay} closeDelay={closeDelay}>
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="flex flex-row gap-5 border rounded-lg p-5">
          <Tooltip
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
          >
            <TooltipTrigger>
              <Button variant="outline">Docs</Button>
            </TooltipTrigger>
            <TooltipContent arrow={arrow}>
              <p>Documentation</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
          >
            <TooltipTrigger>
              <Button variant="outline">API</Button>
            </TooltipTrigger>
            <TooltipContent arrow={arrow}>
              <p>API Reference</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
          >
            <TooltipTrigger>
              <Button variant="outline">Guide</Button>
            </TooltipTrigger>
            <TooltipContent arrow={arrow}>
              <p>User Guide</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-row gap-5">
          <Tooltip
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
          >
            <TooltipTrigger>
              <Button variant="outline">Repo</Button>
            </TooltipTrigger>
            <TooltipContent arrow={arrow}>
              <p>GitHub</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};
