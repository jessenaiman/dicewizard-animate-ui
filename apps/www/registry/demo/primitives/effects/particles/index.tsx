import {
  Particles,
  ParticlesEffect,
  type ParticlesEffectProps,
} from '@/registry/primitives/effects/particles';
import { useState } from 'react';

type ParticlesDemoProps = Pick<
  ParticlesEffectProps,
  'side' | 'align' | 'count' | 'radius' | 'spread' | 'duration'
>;

export function ParticlesDemo(props: ParticlesDemoProps) {
  const [key, setKey] = useState(0);

  return (
    <Particles key={key}>
      <button
        className="px-4 py-2 bg-accent"
        onClick={() => setKey((k) => k + 1)}
      >
        Particles
      </button>
      <ParticlesEffect className="bg-primary size-1 rounded-full" {...props} />
    </Particles>
  );
}
