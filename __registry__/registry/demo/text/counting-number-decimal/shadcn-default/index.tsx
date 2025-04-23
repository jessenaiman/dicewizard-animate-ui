import { CountingNumber } from '@/registry/__registry__/text/counting-number/shadcn-default';

export const CountingNumberDecimalDemo = () => {
  return (
    <CountingNumber
      number={12345.67}
      decimalPlaces={2}
      decimalSeparator=","
      className="text-4xl"
      inView
    />
  );
};
