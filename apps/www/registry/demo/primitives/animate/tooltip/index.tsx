'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipPortal,
} from '@/registry/primitives/animate/tooltip';

export const AnimateTooltipDemo = () => {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="flex flex-row gap-2 border p-2">
          <Tooltip placement="top">
            <TooltipTrigger className="bg-accent px-4 py-2">
              Docs
            </TooltipTrigger>

            <TooltipPortal>
              <TooltipContent className="bg-primary px-3 py-1.5 text-sm text-primary-foreground">
                <p>Documentation</p>
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>

          <Tooltip placement="top">
            <TooltipTrigger className="bg-accent px-4 py-2">API</TooltipTrigger>

            <TooltipPortal>
              <TooltipContent className="bg-primary px-3 py-1.5 text-sm text-primary-foreground">
                <p>API Reference</p>
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>

          <Tooltip placement="top">
            <TooltipTrigger className="bg-accent px-4 py-2">
              Guide
            </TooltipTrigger>

            <TooltipPortal>
              <TooltipContent className="bg-primary px-3 py-1.5 text-sm text-primary-foreground">
                <p>User Guide</p>
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        </div>
        <div className="flex flex-row gap-5">
          <Tooltip placement="top">
            <TooltipTrigger className="bg-accent px-4 py-2">
              Repo
            </TooltipTrigger>

            <TooltipPortal>
              <TooltipContent className="bg-primary px-3 py-1.5 text-sm text-primary-foreground">
                {/* <TooltipArrow className="bg-primary size-2.5 rotate-45" /> */}
                <p>GitHub</p>
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};
