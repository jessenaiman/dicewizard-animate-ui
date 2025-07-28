import {
  Checkbox,
  CheckboxIndicator,
} from '@/registry/primitives/base/checkbox';

interface BaseCheckboxDemoProps {
  indeterminate: boolean;
}

export const BaseCheckboxDemo = ({ indeterminate }: BaseCheckboxDemoProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        indeterminate={indeterminate}
        className="size-5 flex justify-center items-center border [&[data-checked],&[data-indeterminate]]:bg-primary [&[data-checked],&[data-indeterminate]]:text-primary-foreground transition-colors duration-500"
      >
        <CheckboxIndicator className="size-3.5" />
      </Checkbox>
      <label htmlFor="terms">Accept terms and conditions</label>
    </div>
  );
};
