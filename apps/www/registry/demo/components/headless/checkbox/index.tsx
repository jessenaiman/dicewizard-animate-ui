import { Label } from '@workspace/ui/components/ui/label';
import {
  Checkbox,
  type CheckboxProps,
} from '@/registry/components/headless/checkbox';

interface HeadlessCheckboxDemoProps {
  indeterminate: boolean;
  variant: CheckboxProps['variant'];
  size: CheckboxProps['size'];
}

export const HeadlessCheckboxDemo = ({
  indeterminate,
  variant,
  size,
}: HeadlessCheckboxDemoProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        indeterminate={indeterminate}
        variant={variant}
        size={size}
      />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
};
