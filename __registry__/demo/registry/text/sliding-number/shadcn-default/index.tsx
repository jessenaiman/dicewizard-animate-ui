import { SlidingNumber } from '@/registry/__registry__/text/sliding-number/shadcn-default';

export const SlidingNumberDemo = () => {
  return (
    <SlidingNumber
      number={new Date().getFullYear()}
      padStart
      className="text-4xl"
    />
  );
};
