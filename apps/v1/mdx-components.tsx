import { cn } from '@workspace/ui/lib/utils';
import { Card } from 'fumadocs-ui/components/card';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    Card: ({ children, className, ...props }) => (
      <Card
        className={cn(
          'flex items-center justify-center py-7 bg-accent/50 border-none',
          className,
        )}
        {...props}
      >
        {children}
      </Card>
    ),
  };
}
