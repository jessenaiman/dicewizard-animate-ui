import { TypingText } from '@/registry/__registry__/text/typing/default';

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
