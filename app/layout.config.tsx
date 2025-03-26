import { Logo } from '@/components/logo';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Logo containerClassName="mt-0.5 mb-2.5" size="sm" betaTag />,
  },
};
