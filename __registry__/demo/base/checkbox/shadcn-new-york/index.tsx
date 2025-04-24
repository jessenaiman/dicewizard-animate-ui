import { Label } from '@/components/ui/label';
import { Checkbox } from '@/__registry__/base/checkbox/shadcn-new-york';

export const BaseCheckboxDemo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox defaultChecked id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
};
