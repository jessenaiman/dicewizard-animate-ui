import { MotionEffect } from '@/registry/__registry__/effects/motion-effect/default';

export const MotionEffectFadeBlurDemo = () => {
  return (
    <MotionEffect
      fade
      blur="10px"
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
      inView
    >
      <p className="text-4xl font-bold">Motion Effect Fade Blur</p>
    </MotionEffect>
  );
};
