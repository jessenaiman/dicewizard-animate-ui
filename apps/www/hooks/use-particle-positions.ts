"use client";

import { useEffect, useMemo, useState } from 'react';

type Particle = { left: string; top: string };

// Simple, deterministic-ish particle field sized to viewport
export function useParticlePositions(count: number = 48): Particle[] {
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const handler = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const positions = useMemo<Particle[]>(() => {
    const arr: Particle[] = [];
    const seed = 1337;
    let x = seed;
    const rand = () => {
      // LCG for stable pseudo-random distribution
      x = (1103515245 * x + 12345) % 0x80000000;
      return x / 0x80000000;
    };
    for (let i = 0; i < count; i++) {
      const left = `${Math.round(rand() * 100)}%`;
      const top = `${Math.round(rand() * 100)}%`;
      arr.push({ left, top });
    }
    return arr;
  }, [count, dims?.w, dims?.h]);

  return positions;
}

