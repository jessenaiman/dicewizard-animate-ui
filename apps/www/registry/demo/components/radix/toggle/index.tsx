import { Toggle, type ToggleProps } from '@/registry/components/radix/toggle';
import { Bold } from 'lucide-react';

interface RadixToggleDemoProps {
  variant: ToggleProps['variant'];
  size: ToggleProps['size'];
}

export function RadixToggleDemo({ variant, size }: RadixToggleDemoProps) {
  return (
    <Toggle aria-label="Toggle italic" variant={variant} size={size}>
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}
