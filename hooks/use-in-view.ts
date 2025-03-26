'use client';

import * as React from 'react';

/**
 * Custom hook to detect if an element is in the viewport using IntersectionObserver.
 * @param options - IntersectionObserver options (e.g., threshold, root, etc.)
 * @returns A tuple with a ref to attach to the element and a boolean indicating if the element is in view.
 */
function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit,
): [React.RefObject<T | null>, boolean] {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [options]);

  return [ref, inView];
}

export { useInView };
