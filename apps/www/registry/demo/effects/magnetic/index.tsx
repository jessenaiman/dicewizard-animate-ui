import { Magnetic } from '@/registry/effects/magnetic';

interface MagneticDemoProps {
  onlyOnHover: boolean;
  strength: number;
  range: number;
}

export const MagneticDemo = (props: MagneticDemoProps) => {
  return (
    <div className="size-full flex items-center justify-center">
      <Magnetic {...props}>
        <div className="size-32 rounded-2xl bg-emerald-500" />
      </Magnetic>
    </div>
  );
};
