'use client';

import { Switch } from '@/registry/radix/radix-switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ThemeSwitcher = () => {
  const { resolvedTheme: theme, setTheme } = useTheme();

  return (
    <Switch
      leftIcon={Sun}
      rightIcon={Moon}
      checked={theme === 'dark'}
      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      width={45}
      height={26}
    />
  );
};
