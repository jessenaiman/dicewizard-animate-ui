import { Button } from '@workspace/ui/components/ui/button';
import { Input } from '@workspace/ui/components/ui/input';
import { Label } from '@workspace/ui/components/ui/label';
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@/registry/headless/tabs';

export const HeadlessTabsDemo = () => {
  return (
    <TabGroup defaultValue="account" className="w-[400px] bg-muted rounded-lg">
      <TabList className="grid w-full grid-cols-2">
        <Tab index={0}>Account</Tab>
        <Tab index={1}>Password</Tab>
      </TabList>

      <TabPanels className="mx-1 mb-1 -mt-2 rounded-sm h-full bg-background">
        <TabPanel className="space-y-6 p-6">
          <p className="text-sm text-muted-foreground">
            Make changes to your account here. Click save when you&apos;re done.
          </p>

          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </div>

          <Button>Save changes</Button>
        </TabPanel>
        <TabPanel className="space-y-6 p-6">
          <p className="text-sm text-muted-foreground">
            Change your password here. After saving, you&apos;ll be logged out.
          </p>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input id="confirm" type="password" />
            </div>
          </div>

          <Button>Save password</Button>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};
