import { Effect } from '@/registry/primitives/effects/effect';

export default function EffectDemo() {
  return (
    <Effect
      slide={{
        direction: 'down',
      }}
      fade
      zoom
      inView
      className="px-6 py-4 bg-accent"
    >
      Hello
    </Effect>
  );
}
