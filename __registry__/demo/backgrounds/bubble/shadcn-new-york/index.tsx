import { BubbleBackground } from '@/__registry__/backgrounds/bubble/shadcn-new-york';

export const BubbleBackgroundDemo = () => {
  return (
    <BubbleBackground
      interactive
      className="absolute inset-0 flex items-center justify-center rounded-xl"
    />
  );
};
