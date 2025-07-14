import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { Component, Cuboid } from 'lucide-react';
import { LucideIcons } from '@/components/icons/lucide-icons';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      sidebar={{
        tabs: [
          {
            title: 'Components',
            description: 'Animated Components',
            icon: (
              <div className="[&_svg]:size-full rounded-lg size-full text-(--tab-color) max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5">
                <Component />
              </div>
            ),
            url: '/docs/components',
          },
          {
            title: 'Primitives',
            description: 'Animated Primitives',
            icon: (
              <div className="[&_svg]:size-full rounded-lg size-full text-(--tab-color) max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5">
                <Cuboid />
              </div>
            ),
            url: '/docs/primitives',
          },
          {
            title: 'Icons',
            description: 'Animated Icons',
            icon: (
              <div className="[&_svg]:size-full rounded-lg size-full text-(--tab-color) max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5">
                <LucideIcons />
              </div>
            ),
            url: '/docs/icons',
          },
        ],
      }}
      {...baseOptions}
    >
      {children}
    </DocsLayout>
  );
}
