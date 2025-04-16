import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/registry/components/tooltip';
import React from 'react';

export const TooltipDemo = () => {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="flex flex-row gap-5 border rounded-lg p-5">
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">Docs</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Documentation</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">API</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>API Reference</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">Guide</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>User Guide</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-row gap-5">
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">Repo</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>GitHub</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};
