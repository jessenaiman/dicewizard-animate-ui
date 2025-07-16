import { SplittingText } from '@/registry/text/splitting';

export const SplittingWithCustomVariantsDemo = () => {
  return (
    <SplittingText
      className="text-lg"
      type="chars"
      inView
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      motionVariants={{
        initial: { y: 50, scale: 0.5, opacity: 0, x: 50, rotate: 90 },
        animate: { y: 0, scale: 1, opacity: 1, x: 0, rotate: 0 },
        transition: { duration: 0.5, ease: 'easeOut' },
      }}
    />
  );
};
