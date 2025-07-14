import type { BuildPageTreeOptions } from 'fumadocs-core/source';
import { cn } from '@workspace/ui/lib/utils';
import { Dancing_Script } from 'next/font/google';

const dancing = Dancing_Script({ subsets: ['latin'] });

const Badge = ({
  name,
  className,
  children,
}: {
  name: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <span className="flex items-center gap-3 w-full">
      {name}{' '}
      <span
        className={cn(
          'ms-auto text-[17px] text-nowrap text-white rounded-[4px] leading-1 px-1.5 h-5 font-black flex items-center justify-center -mr-1',
          className,
        )}
      >
        <span className={cn(dancing.className, '-mt-0.5')}>{children}</span>
      </span>
    </span>
  );
};

export const attachFile: BuildPageTreeOptions['attachFile'] = (node, file) => {
  if (!file) return node;
  const data = file.data;

  if ('new' in data && typeof data.new === 'boolean' && data.new) {
    node.name = (
      <Badge
        name={node.name as React.ReactNode}
        className="text-blue-600 dark:text-blue-400"
      >
        new
      </Badge>
    );
  }

  if ('alpha' in data && typeof data.alpha === 'boolean' && data.alpha) {
    node.name = (
      <Badge
        name={node.name as React.ReactNode}
        className="bg-gradient-to-br text-pink-600 dark:text-pink-400"
      >
        alpha
      </Badge>
    );
  }

  if ('beta' in data && typeof data.beta === 'boolean' && data.beta) {
    node.name = (
      <Badge
        name={node.name as React.ReactNode}
        className="bg-gradient-to-br text-purple-600 dark:text-purple-400"
      >
        beta
      </Badge>
    );
  }

  if (
    'deprecated' in data &&
    typeof data.deprecated === 'boolean' &&
    data.deprecated
  ) {
    node.name = (
      <Badge
        name={node.name as React.ReactNode}
        className="text-red-600 dark:text-red-400"
      >
        deprecated
      </Badge>
    );
  }

  if ('updated' in data && typeof data.updated === 'boolean' && data.updated) {
    node.name = (
      <Badge
        name={node.name as React.ReactNode}
        className="text-emerald-600 dark:text-emerald-400"
      >
        updated
      </Badge>
    );
  }

  return node;
};
