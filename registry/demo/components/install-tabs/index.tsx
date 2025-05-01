import { CodeTabs } from '@/registry/components/code-tabs';

const COMMANDS = {
  npm: `npx shadcn@latest add "https://animate-ui.com/r/code-tabs"`,
  pnpm: `pnpm dlx shadcn@latest add "https://animate-ui.com/r/code-tabs"`,
  yarn: `npx shadcn@latest add "https://animate-ui.com/r/code-tabs"`,
  bun: `bun x --bun shadcn@latest add "https://animate-ui.com/r/code-tabs"`,
};

export const InstallTabsDemo = () => {
  return (
    <CodeTabs defaultValue="pnpm" className="max-w-[650px]" codes={COMMANDS} />
  );
};
