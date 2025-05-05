import { SplittingText } from '@/registry/text/splitting';

export const SplittingLinesDemo = () => {
  return (
    <SplittingText
      className="text-lg"
      type="lines"
      inView
      motionVariants={{
        initial: { y: 50, opacity: 0, x: 0 },
        animate: { y: 0, opacity: 1, x: 0 },
      }}
      text={[
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      ]}
    />
  );
};
