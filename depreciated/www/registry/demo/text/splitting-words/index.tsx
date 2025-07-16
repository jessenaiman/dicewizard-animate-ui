import { SplittingText } from '@/registry/text/splitting';

export const SplittingWordsDemo = () => {
  return (
    <SplittingText
      className="text-lg"
      type="words"
      inView
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
    />
  );
};
