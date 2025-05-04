import { Button } from '@workspace/ui/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type TooltipProviderProps,
  type TooltipContentProps,
} from '@/registry/base/tooltip';

type BaseTooltipDemoProps = Pick<TooltipProviderProps, 'delay' | 'closeDelay'> &
  Pick<
    TooltipContentProps,
    'side' | 'sideOffset' | 'align' | 'alignOffset' | 'arrow'
  >;

export const BaseTooltipDemo = ({
  delay,
  closeDelay,
  side,
  sideOffset,
  align,
  alignOffset,
  arrow,
}: BaseTooltipDemoProps) => {
  return (
    <TooltipProvider delay={delay} closeDelay={closeDelay}>
      <Tooltip defaultOpen>
        <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          arrow={arrow}
        >
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
