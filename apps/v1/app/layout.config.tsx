import { Logo } from '@/components/logo';
import AnimateUIIcon from '@workspace/ui/components/icons/animateui-icon';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import {
  BookIcon,
  BotMessageSquareIcon,
  CircleAlertIcon,
  Download,
} from 'lucide-react';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="mb-2 mt-1 ml-0.5">
        <Logo />
      </div>
    ),
  },

  links: [
    {
      type: 'custom',
      children: (
        <p
          className="inline-flex items-center gap-2 mb-1.5 px-2 empty:mb-0 [&amp;_svg]:size-4 [&amp;_svg]:shrink-0"
          style={{ paddingInlineStart: 'calc(var(--spacing) * 2)' }}
        >
          Guide
        </p>
      ),
    },
    {
      text: 'Introduction',
      url: '/docs',
      secondary: false,
    },
    {
      text: 'Installation',
      url: '/docs/installation',
      secondary: false,
    },
    {
      text: 'MCP',
      url: '/docs/mcp',
      secondary: false,
    },
    {
      text: 'Troubleshooting',
      url: '/docs/troubleshooting',
      secondary: false,
    },
  ],
};
