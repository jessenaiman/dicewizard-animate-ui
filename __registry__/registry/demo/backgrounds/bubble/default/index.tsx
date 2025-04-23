import { BubbleBackground } from '@/registry/__registry__/backgrounds/bubble/default';

export const BubbleBackgroundDemo = () => {
  return (
    <BubbleBackground
      interactive
      className="absolute inset-0 flex items-center justify-center rounded-xl"
    />
  );
};
