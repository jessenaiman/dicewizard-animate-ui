import { MotionEffect } from '@/registry/__registry__/effects/motion-effect/default';

export const MotionEffectSlideDemo = () => {
  return (
    <MotionEffect slide inView>
      <p className="text-4xl font-bold">Motion Effect Slide</p>
    </MotionEffect>
  );
};
