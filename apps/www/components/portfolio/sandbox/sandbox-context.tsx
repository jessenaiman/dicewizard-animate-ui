"use client";
import React from "react";

type SandboxState = {
  playing: boolean;
  resetKey: number;
  buttonText: string;
  clearInputsToken: number;
};

type SandboxActions = {
  play: () => void;
  stop: () => void;
  toggle: () => void;
  reset: () => void;
  setButtonText: (v: string) => void;
  clearInputs: () => void;
};

const SandboxContext = React.createContext<(SandboxState & SandboxActions) | null>(null);

export function SandboxProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = React.useState(false);
  const [resetKey, setResetKey] = React.useState(0);
  const [buttonText, setButtonText] = React.useState("Click me");
  const [clearInputsToken, setClearInputsToken] = React.useState(0);

  const value = React.useMemo(
    () => ({
      playing,
      resetKey,
      buttonText,
      clearInputsToken,
      play: () => setPlaying(true),
      stop: () => setPlaying(false),
      toggle: () => setPlaying((p) => !p),
      reset: () => setResetKey((k) => k + 1),
      setButtonText,
      clearInputs: () => setClearInputsToken((t) => t + 1),
    }),
    [playing, resetKey, buttonText, clearInputsToken],
  );

  return <SandboxContext.Provider value={value}>{children}</SandboxContext.Provider>;
}

export function useSandbox() {
  const ctx = React.useContext(SandboxContext);
  if (!ctx) throw new Error("useSandbox must be used within SandboxProvider");
  return ctx;
}
