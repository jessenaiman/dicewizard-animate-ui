'use client';

import * as React from 'react';
import {
  InputButton,
  InputButtonAction,
  InputButtonProvider,
  InputButtonSubmit,
  InputButtonInput,
} from '@/registry/buttons/input';

export const InputButtonDemo = () => {
  return (
    <InputButtonProvider>
      <InputButton>
        <InputButtonAction>Join the newsletter</InputButtonAction>
        <InputButtonSubmit>Subscribe</InputButtonSubmit>
      </InputButton>
      <InputButtonInput type="email" placeholder="your-email@example.com" />
    </InputButtonProvider>
  );
};
