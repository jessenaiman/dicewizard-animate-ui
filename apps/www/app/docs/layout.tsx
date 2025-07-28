import { DocsLayout, DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { Component, Cuboid } from 'lucide-react';
import { LucideIcons } from '@/components/icons/lucide-icons';
import { ThemeSwitcher } from '@/components/animate/theme-switcher';
import XIcon from '@workspace/ui/components/icons/x-icon';
import { Dancing_Script } from 'next/font/google';
import { cn } from '@workspace/ui/lib/utils';
import { DocsSidebar } from '@/components/docs/sidebar';

const dancing = Dancing_Script({ subsets: ['latin'] });

const DOCS_LAYOUT_PROPS: DocsLayoutProps = {
  tree: source.pageTree,
  sidebar: {
    tabs: [
      {
        title: 'Components',
        description: 'Animated Components',
        icon: (
          <div className="[&_svg]:size-full rounded-lg size-full text-muted-foreground max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5">
            <Component />
          </div>
        ),
        url: '/docs/components',
      },
      {
        title: 'Primitives',
        description: 'Animated Primitives',
        icon: (
          <div className="[&_svg]:size-full rounded-lg size-full text-muted-foreground max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5">
            <Cuboid />
          </div>
        ),
        url: '/docs/primitives',
      },
      {
        title: 'Icons',
        description: (
          <span>
            Animated Icons{' '}
            <span
              className={cn(
                dancing.className,
                'text-sm ml-2 text-blue-600 dark:text-blue-400',
              )}
            >
              beta
            </span>
          </span>
        ),
        icon: (
          <div className="[&_svg]:size-full rounded-lg size-full text-muted-foreground max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5">
            <LucideIcons />
          </div>
        ),
        url: '/docs/icons',
      },
    ],
  },

  githubUrl: 'https://github.com/imskyleen/animate-ui',
  themeSwitch: {
    component: <ThemeSwitcher />,
  },
  ...baseOptions,
  links: [
    ...(baseOptions.links || []),
    {
      icon: <XIcon />,
      url: 'https://x.com/animate_ui',
      text: 'X',
      type: 'icon',
    },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...DOCS_LAYOUT_PROPS}
      sidebar={{
        component: <DocsSidebar {...DOCS_LAYOUT_PROPS} />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
