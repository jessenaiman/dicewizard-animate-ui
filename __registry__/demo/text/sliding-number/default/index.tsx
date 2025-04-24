import { SlidingNumber } from '@/__registry__/text/sliding-number/default';

export const SlidingNumberDemo = () => {
  return (
    <SlidingNumber
      number={new Date().getFullYear()}
      padStart
      className="text-4xl"
    />
  );
};
