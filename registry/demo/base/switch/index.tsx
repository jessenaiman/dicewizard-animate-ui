import { Label } from '@/components/ui/label';
import { Switch } from '@/registry/base/switch';

export const BaseSwitchDemo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="airplane-mode">Airplane mode</Label>
      <Switch defaultChecked id="airplane-mode" />
    </div>
  );
};
