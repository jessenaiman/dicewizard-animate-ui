import { HighlightText } from '@/registry/primitives/texts/highlight';

export const HighlightTextDemo = () => {
  return (
    <HighlightText
      className="text-4xl font-semibold bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-500 dark:to-purple-500"
      text="Highlight Text"
    />
  );
};
