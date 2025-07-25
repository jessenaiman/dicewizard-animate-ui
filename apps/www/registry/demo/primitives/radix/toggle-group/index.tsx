import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupHighlight,
  ToggleGroupHighlightItem,
} from '@/registry/primitives/radix/toggle-group';
import { Bold, Italic, Underline } from 'lucide-react';

export const RadixToggleGroupDemo = () => {
  return (
    <ToggleGroup type="single" defaultValue="bold" className="flex gap-2">
      <ToggleGroupHighlight className="bg-accent absolute z-0 inset-0">
        <ToggleGroupHighlightItem value="bold">
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle bold"
            className="size-8 flex items-center justify-center"
          >
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroupHighlightItem>
        <ToggleGroupHighlightItem value="italic">
          <ToggleGroupItem
            value="italic"
            aria-label="Toggle italic"
            className="size-8 flex items-center justify-center"
          >
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroupHighlightItem>
        <ToggleGroupHighlightItem value="underline">
          <ToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
            className="size-8 flex items-center justify-center"
          >
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroupHighlightItem>
      </ToggleGroupHighlight>
    </ToggleGroup>
  );
};
