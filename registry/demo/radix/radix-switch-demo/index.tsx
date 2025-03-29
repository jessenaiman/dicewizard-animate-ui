import { Switch } from '@/registry/radix/radix-switch';

export const RadixSwitchDemo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Switch defaultChecked id="airplane-mode" />
      <label
        htmlFor="airplane-mode"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
};
