'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
  type TooltipProviderProps,
  type TooltipProps,
} from '@/registry/primitives/animate/tooltip';
import { cn } from '@workspace/ui/lib/utils';

type TooltipDemoProps = Pick<TooltipProviderProps, 'openDelay' | 'closeDelay'> &
  Pick<TooltipProps, 'side' | 'sideOffset' | 'align' | 'alignOffset'>;

export const AnimateTooltipDemo = ({
  openDelay,
  closeDelay,
  side,
  sideOffset,
  align,
  alignOffset,
}: TooltipDemoProps) => {
  return (
    <TooltipProvider
      key={`${side}-${sideOffset}-${align}-${alignOffset}-${openDelay}-${closeDelay}`}
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="flex flex-row gap-2 border p-2">
          <Tooltip
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
          >
            <TooltipTrigger asChild>
              <button className="bg-accent px-4 py-2">Docs</button>
            </TooltipTrigger>

            <TooltipContent className="bg-primary px-3 py-1.5 text-sm text-primary-foreground">
              <p>Documentation</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
          >
            <TooltipTrigger asChild>
              <button className="bg-accent px-4 py-2">API</button>
            </TooltipTrigger>

            <TooltipContent className="bg-primary px-3 py-1.5 text-sm text-primary-foreground">
              <p>API Reference</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
          >
            <TooltipTrigger asChild>
              <button className="bg-accent px-4 py-2">Guide</button>
            </TooltipTrigger>

            <TooltipContent className="bg-primary px-3 py-1.5 text-sm text-primary-foreground">
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
            <TooltipTrigger asChild>
              <button className="bg-accent px-4 py-2">Repo</button>
            </TooltipTrigger>

            <TooltipContent className="bg-primary px-3 py-1.5 text-sm text-primary-foreground">
              <TooltipArrow sideOffset={4}>
                <div className="bg-primary size-2.5 rotate-45" />
              </TooltipArrow>
              <p>GitHub</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};
