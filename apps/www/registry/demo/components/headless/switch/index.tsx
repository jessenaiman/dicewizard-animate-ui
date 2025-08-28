import { Label } from '@workspace/ui/components/ui/label';
import { Switch } from '@/registry/components/headless/switch';

export function HeadlessSwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}
