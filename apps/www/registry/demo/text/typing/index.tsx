import { TypingText } from '@/registry/text/typing';

export const TypingTextDemo = () => {
  return (
    <TypingText
      className="text-4xl"
      text="Typing Text"
      cursor
      cursorClassName="h-9"
    />
  );
};
