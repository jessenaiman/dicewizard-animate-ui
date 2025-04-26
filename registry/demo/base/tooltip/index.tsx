import { Button } from '@/components/ui/button';
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
    | 'side'
    | 'sideOffset'
    | 'align'
    | 'alignOffset'
    // IF styles == 'shadcn-new-york' OR styles == 'default'
    | 'arrow'
    // END IF
  >;

export const BaseTooltipDemo = ({
  delay,
  closeDelay,
  side,
  sideOffset,
  align,
  alignOffset,
  // IF styles == 'shadcn-new-york' OR styles == 'default'
  arrow,
  // END IF
}: BaseTooltipDemoProps) => {
  return (
    <TooltipProvider delay={delay} closeDelay={closeDelay}>
      <Tooltip defaultOpen>
        <TooltipTrigger
          render={
            <Button variant="outline" className="{{styles.button}}">
              Hover me
            </Button>
          }
        />
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          // IF styles == 'shadcn-new-york' OR styles == 'default'
          arrow={arrow}
          // END IF
        >
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
