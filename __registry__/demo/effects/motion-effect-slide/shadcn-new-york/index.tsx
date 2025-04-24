import { MotionEffect } from '@/__registry__/effects/motion-effect/shadcn-new-york';

export const MotionEffectSlideDemo = () => {
  return (
    <MotionEffect slide inView>
      <p className="text-4xl font-bold">Motion Effect Slide</p>
    </MotionEffect>
  );
};
