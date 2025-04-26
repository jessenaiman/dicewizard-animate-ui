import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type TooltipProviderProps,
  type TooltipContentProps,
} from '@/__registry__/base/tooltip/shadcn-default';

type BaseTooltipDemoProps = Pick<TooltipProviderProps, 'delay' | 'closeDelay'> &
  Pick<TooltipContentProps, 'side' | 'sideOffset' | 'align' | 'alignOffset'>;

export const BaseTooltipDemo = ({
  delay,
  closeDelay,
  side,
  sideOffset,
  align,
  alignOffset,
}: BaseTooltipDemoProps) => {
  return (
    <TooltipProvider delay={delay} closeDelay={closeDelay}>
      <Tooltip defaultOpen>
        <TooltipTrigger
          render={
            <Button variant="outline" className="rounded-md">
              Hover me
            </Button>
          }
        />
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
        >
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
