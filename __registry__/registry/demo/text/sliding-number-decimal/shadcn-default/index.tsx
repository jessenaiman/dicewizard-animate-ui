import { SlidingNumber } from '@/registry/__registry__/text/sliding-number/shadcn-default';

export const SlidingNumberDecimalDemo = () => {
  return (
    <SlidingNumber
      number={12345.67}
      decimalSeparator=","
      padStart
      className="text-4xl"
      inView
    />
  );
};
