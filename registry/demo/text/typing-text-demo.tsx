import { TypingText } from '@/registry/text/typing-text';

export const TypingTextDemo = () => {
  return (
    <TypingText
      className="text-2xl"
      text="Typing Text"
      cursor
      cursorClassName="h-7"
    />
  );
};
