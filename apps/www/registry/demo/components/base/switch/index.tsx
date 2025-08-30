import { Label } from '@workspace/ui/components/ui/label';
import { Switch } from '@/registry/components/base/switch';

export function BaseSwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}
