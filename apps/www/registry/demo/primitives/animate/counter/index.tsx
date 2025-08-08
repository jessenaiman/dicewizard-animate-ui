import {
  Counter,
  CounterMinusButton,
  CounterNumber,
  CounterPlusButton,
} from '@/registry/primitives/animate/counter';
import { MinusIcon, PlusIcon } from 'lucide-react';

export const CounterDemo = () => {
  return (
    <Counter className="flex items-center p-1 bg-accent">
      <CounterMinusButton className="bg-background size-7 flex items-center justify-center">
        <MinusIcon className="size-4" />
      </CounterMinusButton>
      <CounterNumber className="px-2.5" />
      <CounterPlusButton className="bg-background size-7 flex items-center justify-center">
        <PlusIcon className="size-4" />
      </CounterPlusButton>
    </Counter>
  );
};
