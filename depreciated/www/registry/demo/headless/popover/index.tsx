'use client';

import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@/registry/headless/popover';

export function RadixPopoverDemo() {
  return (
    <Popover>
      <PopoverButton>Open popover</PopoverButton>
      <PopoverPanel className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="width" className="text-sm">
                Width
              </label>
              <input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8 p-2 border"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="maxWidth" className="text-sm">
                Max. width
              </label>
              <input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8 p-2 border"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="height" className="text-sm">
                Height
              </label>
              <input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8 p-2 border"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="maxHeight" className="text-sm">
                Max. height
              </label>
              <input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8 p-2 border"
              />
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
