import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { ThemeSwitcher } from '@/components/theme-switcher';
import XIcon from '@/components/icons/x-icon';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      githubUrl="https://github.com/Skyleen77/animate-ui"
      links={[
        {
          icon: <XIcon />,
          url: 'https://x.com/animate_ui',
          text: 'X',
          type: 'icon',
        },
      ]}
      sidebar={{
        enabled: true,
      }}
      tree={source.pageTree}
      themeSwitch={{
        component: <ThemeSwitcher />,
      }}
      {...baseOptions}
    >
      {children}
    </DocsLayout>
  );
}
