import { RotatingText } from '@/registry/primitives/texts/rotating';

interface RotatingTextDemoProps {
  delay: number;
  y: number;
  duration: number;
}

export const RotatingTextDemo = ({
  delay,
  y,
  duration,
}: RotatingTextDemoProps) => {
  return (
    <RotatingText
      key={delay}
      delay={delay}
      y={y}
      duration={duration}
      className="text-4xl font-semibold"
      text={['Rotating', 'Text', 'Demo']}
    />
  );
};
