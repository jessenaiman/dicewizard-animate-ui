import { Switch, SwitchThumb } from '@/registry/primitives/radix/switch';
import { cn } from '@workspace/ui/lib/utils';

export const RadixSwitchDemo = () => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="airplane-mode">Airplane mode</label>
      <Switch
        className={cn(
          'relative flex p-0.5 h-6 w-10 items-center justify-start rounded-full border transition-colors',
          'data-[state=checked]:bg-primary data-[state=checked]:justify-end',
        )}
        defaultChecked
        id="airplane-mode"
      >
        <SwitchThumb
          className="rounded-full bg-accent h-full aspect-square"
          pressedAnimation={{ width: 22 }}
        />
      </Switch>
    </div>
  );
};
