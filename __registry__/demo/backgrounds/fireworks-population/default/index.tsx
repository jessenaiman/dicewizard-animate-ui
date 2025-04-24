'use client';

import { FireworksBackground } from '@/__registry__/backgrounds/fireworks/default';

export default function FireworksBackgroundPopulationDemo() {
  return (
    <FireworksBackground
      className="absolute inset-0 flex items-center justify-center rounded-xl"
      population={8}
    />
  );
}
