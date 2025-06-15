import { StarsScrollingWheel } from '@/registry/components/stars-scrolling-wheel';

export const StarsScrollingWheelDemo = () => {
  return (
    <div className="size-full flex items-center justify-center">
      <StarsScrollingWheel stars={1000} delay={1000} />
    </div>
  );
};
