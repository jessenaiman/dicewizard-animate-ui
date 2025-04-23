import { CountingNumber } from '@/registry/__registry__/text/counting-number/default';

export const CountingNumberDemo = () => {
  return (
    <CountingNumber number={new Date().getFullYear()} className="text-4xl" />
  );
};
