'use client';

import { OpenInV0Button } from '@/components/docs/open-in-v0-button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

export const ComponentWrapper = ({
  className,
  children,
  name,
}: ComponentWrapperProps) => {
  const [key, setKey] = useState(0);

  return (
    <div
      className={cn(
        'max-w-screen relative rounded-xl border bg-background',
        className,
      )}
      key={key}
    >
      <div className="absolute top-3 right-3 z-10 bg-background flex items-center justify-end gap-2 p-1 rounded-[11px]">
        <OpenInV0Button url={`https://animate-ui.com/r/${name}.json`} />
        <Button
          onClick={() => setKey((prev) => prev + 1)}
          className="flex items-center rounded-lg"
          variant="neutral"
          size="icon-sm"
        >
          <RotateCcw aria-label="restart-btn" size={14} />
        </Button>
      </div>

      <div className="flex min-h-[400px] w-full items-center justify-center p-10">
        {children}
      </div>
    </div>
  );
};
