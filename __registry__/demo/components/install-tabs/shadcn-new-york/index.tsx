import { InstallTabs } from '@/__registry__/components/install-tabs/shadcn-new-york';

const COMMANDS = {
  npm: `npx shadcn@latest add "https://animate-ui.com/r/install-tabs"`,
  pnpm: `pnpm dlx shadcn@latest add "https://animate-ui.com/r/install-tabs"`,
  yarn: `npx shadcn@latest add "https://animate-ui.com/r/install-tabs"`,
  bun: `bun x --bun shadcn@latest add "https://animate-ui.com/r/install-tabs"`,
};

export const InstallTabsDemo = () => {
  return (
    <InstallTabs
      defaultValue="pnpm"
      className="max-w-[650px]"
      commands={COMMANDS}
    />
  );
};
