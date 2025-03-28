import { StarsBackground } from '@/registry/backgrounds/stars-background';

export const StarsBackgroundDemo = () => {
  return (
    <StarsBackground className="absolute inset-0 flex items-center justify-center rounded-xl">
      <h1 className="text-3xl font-bold text-white">Stars Background</h1>
    </StarsBackground>
  );
};
