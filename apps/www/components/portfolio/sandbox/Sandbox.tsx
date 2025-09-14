"use client";
import React from 'react';
import { SandboxProvider, useSandbox } from './sandbox-context';
import styles from './sandbox.module.css';
import { Button } from '@workspace/ui/components/ui/button';
import { ButtonTile } from './tiles/button-tile';

function ControlBarInner() {
  const { playing, play, stop, reset, clearInputs, buttonText, setButtonText } = useSandbox();
  return (
    <div className={styles.controls} data-slot="sandbox-controls">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant={playing ? 'secondary' : 'default'} onClick={play}>Play</Button>
        <Button size="sm" variant={!playing ? 'secondary' : 'outline'} onClick={stop}>Stop</Button>
        <Button size="sm" variant="outline" onClick={reset}>Reset Animations</Button>
        <Button size="sm" variant="outline" onClick={clearInputs}>Clear Inputs</Button>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="sb-text" className="text-xs opacity-80">Button text</label>
        <input
          id="sb-text"
          className="h-8 rounded-md border border-border bg-transparent px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          placeholder="Click me"
        />
      </div>
    </div>
  );
}

export function Sandbox() {
  return (
    <SandboxProvider>
      <ControlBarInner />
      <div className={styles.grid} data-slot="sandbox-grid">
        <ButtonTile />
      </div>
    </SandboxProvider>
  );
}

