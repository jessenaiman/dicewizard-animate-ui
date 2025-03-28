import { Checkbox } from '@/registry/radix/radix-checkbox';

export const RadixCheckboxDemo = () => {
  return (
    <div className="flex items-center space-x-3">
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
