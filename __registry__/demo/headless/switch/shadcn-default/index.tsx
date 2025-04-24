import { Switch } from '@/__registry__/headless/switch/shadcn-default';
import { Field, Label } from '@headlessui/react';

export const HeadlessSwitchDemo = () => {
  return (
    <Field className="flex items-center space-x-2">
      <Label htmlFor="airplane-mode" className="text-sm font-medium">
        Airplane mode
      </Label>
      <Switch defaultChecked id="airplane-mode" />
    </Field>
  );
};
