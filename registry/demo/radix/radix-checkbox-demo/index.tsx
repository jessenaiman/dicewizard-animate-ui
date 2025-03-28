import { Checkbox } from '@/registry/radix/radix-checkbox';

export const CheckboxDemo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox defaultChecked id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
};
