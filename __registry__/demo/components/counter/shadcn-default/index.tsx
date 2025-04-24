'use client';

import * as React from 'react';

import { Counter } from '@/__registry__/components/counter/shadcn-default';

export const CounterDemo = () => {
  const [number, setNumber] = React.useState(100);

  return <Counter number={number} setNumber={setNumber} />;
};
