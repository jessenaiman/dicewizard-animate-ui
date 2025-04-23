import { ToggleGroup, ToggleGroupItem } from '@/registry/__registry__/radix/toggle-group/shadcn-new-york';
import { Bold, Italic, Underline } from 'lucide-react';

export const RadixToggleGroupMultipleDemo = () => {
  return (
    <ToggleGroup type="multiple" defaultValue={['bold']}>
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
