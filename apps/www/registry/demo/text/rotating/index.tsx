import { RotatingText } from '@/registry/text/rotating';

export const RotatingTextDemo = () => {
  return (
    <RotatingText
      className="text-4xl font-semibold"
      text={['Rotating', 'Text', 'Demo']}
    />
  );
};
