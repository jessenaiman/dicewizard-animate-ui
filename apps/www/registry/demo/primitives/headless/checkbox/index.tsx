import {
  Checkbox,
  CheckboxIndicator,
} from '@/registry/primitives/headless/checkbox';
import { Field, Label } from '@headlessui/react';

type HeadlessCheckboxDemoProps = {
  indeterminate: boolean;
};

export const HeadlessCheckboxDemo = ({
  indeterminate,
}: HeadlessCheckboxDemoProps) => {
  return (
    <Field className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        indeterminate={indeterminate}
        className="size-5 flex justify-center items-center border [&[data-checked],&[data-indeterminate]]:bg-primary [&[data-checked],&[data-indeterminate]]:text-primary-foreground transition-colors duration-500"
      >
        <CheckboxIndicator className="size-3.5" />
      </Checkbox>
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </Field>
  );
};
