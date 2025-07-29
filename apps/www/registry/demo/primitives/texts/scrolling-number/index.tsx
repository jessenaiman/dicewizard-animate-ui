'use client';

import React from 'react';
import {
  ScrollingNumberContainer,
  ScrollingNumber,
} from '@/registry/primitives/texts/scrolling-number';

export const ScrollingNumberDemo = () => {
  return (
    <ScrollingNumberContainer className="w-20">
      <ScrollingNumber number={1000} step={100} direction="ttb" />
    </ScrollingNumberContainer>
  );
};
