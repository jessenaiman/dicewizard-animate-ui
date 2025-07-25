import { SlidingNumber } from '@/registry/primitives/texts/sliding-number';

interface SlidingNumberDemoProps {
  number: number;
  padStart: boolean;
  decimalSeparator: string;
  decimalPlaces: number;
}

export const SlidingNumberDemo = ({
  number,
  padStart,
  decimalSeparator,
  decimalPlaces,
}: SlidingNumberDemoProps) => {
  return (
    <SlidingNumber
      number={number}
      padStart={padStart}
      decimalSeparator={decimalSeparator}
      decimalPlaces={decimalPlaces}
      className="text-4xl font-semibold"
    />
  );
};
