import { Switch, SwitchThumb } from '@/registry/primitives/headless/switch';
import { Field, Label } from '@headlessui/react';
import { cn } from '@workspace/ui/lib/utils';

export const HeadlessSwitchDemo = () => {
  return (
    <Field className="flex items-center space-x-2">
      <Label htmlFor="airplane-mode">Airplane mode</Label>
      <Switch
        className={cn(
          'relative flex p-0.5 h-6 w-10 items-center justify-start rounded-full border transition-colors',
          'data-[checked]:bg-primary data-[checked]:justify-end',
        )}
        defaultChecked
        id="airplane-mode"
      >
        <SwitchThumb
          className="rounded-full bg-accent h-full aspect-square"
          pressedAnimation={{ width: 22 }}
        />
      </Switch>
    </Field>
  );
};
