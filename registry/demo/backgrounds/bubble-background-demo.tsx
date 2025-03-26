import { BubbleBackground } from '@/registry/backgrounds/bubble';

export const GradientBackgroundDemo = () => {
  return (
    <BubbleBackground
      interactive
      className="absolute inset-0 flex items-center justify-center rounded-xl"
    >
      <h1 className="text-3xl font-bold text-white z-10">
        Gradient Background
      </h1>
    </BubbleBackground>
  );
};
