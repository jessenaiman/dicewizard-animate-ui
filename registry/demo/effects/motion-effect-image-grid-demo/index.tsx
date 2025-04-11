import { MotionEffect } from '@/registry/effects/motion-effect';

export const MotionEffectImageGridDemo = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <MotionEffect
          key={index}
          slide={{
            direction: 'down',
          }}
          fade
          zoom
          delay={0.5 + index * 0.1}
        >
          <img
            src={`https://picsum.photos/seed/${index + 100}/600/600`}
            alt="Slide In Demo"
            className="w-[300px] h-[300px] object-cover object-center bg-muted rounded-xl flex items-center justify-center"
          />
        </MotionEffect>
      ))}
    </div>
  );
};
