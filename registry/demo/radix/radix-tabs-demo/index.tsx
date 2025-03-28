import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
} from '@/registry/radix/radix-tabs';

export const RadixTabsDemo = () => {
  return (
    <Tabs
      defaultValue="tab1"
      className="w-[400px] bg-neutral-100 dark:bg-neutral-800 rounded-lg p-0.5"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>

      <TabsContents className="mx-1 mb-1 -mt-1.5 rounded-sm bg-background h-full overflow-y-hidden">
        <TabsContent value="tab1" className="grid grid-cols-2 gap-1.5 p-1.5">
          <div className="h-20 w-full bg-muted rounded-sm" />
          <div className="h-20 w-full bg-muted rounded-sm" />
        </TabsContent>
        <TabsContent value="tab2" className="grid grid-cols-2 gap-1.5 p-1.5">
          <div className="h-20 w-full bg-muted rounded-sm" />
          <div className="h-20 w-full bg-muted rounded-sm" />
          <div className="h-20 w-full bg-muted rounded-sm" />
          <div className="h-20 w-full bg-muted rounded-sm" />
        </TabsContent>
        <TabsContent value="tab3" className="grid grid-cols-2 gap-1.5 p-1.5">
          <div className="h-20 w-full bg-muted rounded-sm" />
          <div className="h-20 w-full bg-muted rounded-sm" />
        </TabsContent>
      </TabsContents>
    </Tabs>
  );
};
