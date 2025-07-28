import * as React from 'react';

type OnChangeOneArg<T> = (value: T) => void;
type OnChangeTwoArgs<T, E> = (value: T, event: E) => void;
type OnChangeThreeArgs<T, E, R> = (value: T, event: E, reason: R) => void;

interface CommonControlledStateProps<T> {
  value?: T;
  defaultValue?: T;
}

export function useControlledState<T>(
  props: CommonControlledStateProps<T> & {
    onChange?: OnChangeOneArg<T>;
  },
): readonly [T, (next: T) => void];

export function useControlledState<T, E>(
  props: CommonControlledStateProps<T> & {
    onChange?: OnChangeTwoArgs<T, E>;
  },
): readonly [T, (next: T, event: E) => void];

export function useControlledState<T, E, R>(
  props: CommonControlledStateProps<T> & {
    onChange?: OnChangeThreeArgs<T, E, R>;
  },
): readonly [T, (next: T, event: E, reason: R) => void];

export function useControlledState<T, E, R>(
  props: CommonControlledStateProps<T> & {
    onChange?:
      | OnChangeOneArg<T>
      | OnChangeTwoArgs<T, E>
      | OnChangeThreeArgs<T, E, R>;
  },
): readonly [T, (next: T, event?: E, reason?: R) => void] {
  const { value, defaultValue, onChange } = props;

  const [state, setInternalState] = React.useState<T>(
    value !== undefined ? value : (defaultValue as T),
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalState(value);
    }
  }, [value]);

  const setState = React.useCallback(
    (next: T, event?: E, reason?: R) => {
      setInternalState(next);
      if (!onChange) return;
      if (onChange.length === 3) {
        (onChange as OnChangeThreeArgs<T, E, R>)(next, event as E, reason as R);
      } else if (onChange.length === 2) {
        (onChange as OnChangeTwoArgs<T, E>)(next, event as E);
      } else {
        (onChange as OnChangeOneArg<T>)(next);
      }
    },
    [onChange],
  );

  return [state, setState] as const;
}
