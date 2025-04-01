import { BubbleBackground } from '@/registry/backgrounds/bubble-background';

export const BubbleBackgroundDemo = () => {
  return (
    <BubbleBackground
      interactive
      className="absolute inset-0 flex items-center justify-center rounded-xl"
    >
      <h1 className="text-3xl font-bold text-white z-10">
        Bubble Background
      </h1>
    </BubbleBackground>
  );
};
