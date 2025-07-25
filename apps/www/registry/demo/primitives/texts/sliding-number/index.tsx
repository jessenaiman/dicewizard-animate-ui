import { SlidingNumber } from '@/registry/primitives/texts/sliding-number';

interface SlidingNumberDemoProps {
  number: number;
  padStart: boolean;
  decimalSeparator: string;
  decimalPlaces: number;
  delay: number;
}

export const SlidingNumberDemo = ({
  number,
  padStart,
  decimalSeparator,
  decimalPlaces,
  delay,
}: SlidingNumberDemoProps) => {
  return (
    <SlidingNumber
      key={delay}
      delay={delay}
      number={number}
      padStart={padStart}
      decimalSeparator={decimalSeparator}
      decimalPlaces={decimalPlaces}
      className="text-4xl font-semibold"
    />
  );
};
