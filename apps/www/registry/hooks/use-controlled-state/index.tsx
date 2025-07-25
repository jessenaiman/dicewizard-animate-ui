import * as React from 'react';

interface UseControlledStateProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

type UseControlledStateReturn<T> = readonly [T, (next: T) => void];

function useControlledState<T>(
  props: UseControlledStateProps<T>,
): UseControlledStateReturn<T> {
  const { value, defaultValue, onChange } = props;

  const [state, setInternalState] = React.useState<T>(
    value !== undefined ? value! : defaultValue!,
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalState(value);
    }
  }, [value]);

  const setState = React.useCallback(
    (next: T) => {
      setInternalState(next);
      onChange?.(next);
    },
    [onChange],
  );

  return [state, setState] as const;
}

export {
  useControlledState,
  type UseControlledStateProps,
  type UseControlledStateReturn,
};
