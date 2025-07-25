import {
  TypingText,
  TypingTextCursor,
} from '@/registry/primitives/texts/typing';

interface TypingTextDemoProps {
  delay: number;
}

export const TypingTextDemo = ({ delay }: TypingTextDemoProps) => {
  return (
    <TypingText
      key={delay}
      delay={delay}
      className="text-4xl font-semibold"
      text="Typing Text"
    >
      <TypingTextCursor className="!h-8 !w-1 rounded-full ml-1" />
    </TypingText>
  );
};
