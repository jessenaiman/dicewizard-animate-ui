import { RotatingText } from '@/registry/primitives/texts/rotating';

interface RotatingTextDemoProps {
  delay: number;
}

export const RotatingTextDemo = ({ delay }: RotatingTextDemoProps) => {
  return (
    <RotatingText
      key={delay}
      delay={delay}
      className="text-4xl font-semibold"
      text={['Rotating', 'Text', 'Demo']}
    />
  );
};
