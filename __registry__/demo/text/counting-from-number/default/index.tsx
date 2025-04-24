import { CountingNumber } from '@/__registry__/text/counting-number/default';

export const CountingFromNumberDemo = () => {
  return (
    <CountingNumber
      number={0}
      fromNumber={new Date().getFullYear()}
      className="text-4xl"
      inView
    />
  );
};
