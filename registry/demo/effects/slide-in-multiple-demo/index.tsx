import { SlideIn } from '@/registry/effects/slide-in';

export const SlideInMultipleDemo = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <SlideIn key={index} direction="down" delay={0.5 + index * 0.1}>
          <img
            src={`https://picsum.photos/seed/${index + 100}/600/600`}
            alt="Slide In Demo"
            className="w-[300px] h-[300px] object-cover object-center bg-muted rounded-xl flex items-center justify-center"
          />
        </SlideIn>
      ))}
    </div>
  );
};
