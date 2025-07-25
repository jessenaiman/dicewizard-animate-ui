import { CountingNumber } from '@/registry/primitives/texts/counting-number';

interface CountingFromNumberDemoProps {
  number: number;
  fromNumber: number;
  padStart: boolean;
  decimalSeparator: string;
  decimalPlaces: number;
}

export const CountingFromNumberDemo = ({
  number,
  fromNumber,
  padStart,
  decimalSeparator,
  decimalPlaces,
}: CountingFromNumberDemoProps) => {
  return (
    <CountingNumber
      number={number}
      fromNumber={fromNumber}
      padStart={padStart}
      decimalSeparator={decimalSeparator}
      decimalPlaces={decimalPlaces}
      className="text-4xl font-semibold"
    />
  );
};
