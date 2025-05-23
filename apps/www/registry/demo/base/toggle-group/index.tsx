import { ToggleGroup, ToggleGroupItem } from '@/registry/base/toggle-group';
import { Bold, Italic, Underline } from 'lucide-react';

interface BaseToggleGroupDemoProps {
  multiple: boolean;
  size: 'default' | 'sm' | 'lg';
  variant: 'default' | 'outline';
}

export const BaseToggleGroupDemo = ({
  multiple,
  size,
  variant,
}: BaseToggleGroupDemoProps) => {
  return (
    <ToggleGroup
      defaultValue={['bold']}
      toggleMultiple={multiple}
      size={size}
      variant={variant}
    >
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
