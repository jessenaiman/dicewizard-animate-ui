import {
  SplittingText,
  type SplittingTextProps,
} from '@/registry/primitives/texts/splitting';
import { cn } from '@workspace/ui/lib/utils';

interface SplittingTextDemoProps {
  type: SplittingTextProps['type'];
  delay: number;
  stagger: number;
}

export const SplittingTextDemo = ({
  type,
  delay,
  stagger,
}: SplittingTextDemoProps) => {
  return (
    // @ts-expect-error
    <SplittingText
      key={`${type}-${delay}-${stagger}`}
      className={cn('text-4xl font-semibold', type === 'lines' && 'text-xl')}
      type={type}
      delay={delay}
      stagger={stagger}
      text={
        type === 'lines'
          ? [
              'Introducing Splitting Text component',
              'Made with Motion. Highly customizable and easy to use.',
            ]
          : 'Splitting Text'
      }
    />
  );
};
