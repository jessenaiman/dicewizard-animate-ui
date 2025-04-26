'use client';

import { useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/__registry__/base/switch/shadcn-default';

interface BaseSwitchDemoProps {
  leftIcon?: boolean;
  rightIcon?: boolean;
  thumbIcon?: boolean;
}

export const BaseSwitchDemo = ({
  leftIcon,
  rightIcon,
  thumbIcon,
}: BaseSwitchDemoProps) => {
  const [checked, setChecked] = useState(true);

  const ThumbIcon = checked ? <MoonIcon /> : <SunIcon />;

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="switch-theme">Switch theme</Label>
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        id="switch-theme"
        leftIcon={leftIcon ? <MoonIcon /> : null}
        rightIcon={rightIcon ? <SunIcon /> : null}
        thumbIcon={thumbIcon ? ThumbIcon : null}
      />
    </div>
  );
};
