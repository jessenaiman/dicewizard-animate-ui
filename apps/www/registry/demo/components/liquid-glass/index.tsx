import { LiquidGlass } from '@/registry/components/liquid-glass';
import { GlassesIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function LiquidGlassDemo() {
  return (
    <div className="absolute inset-0">
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <div className="overflow-y-auto h-full">
          <LiquidGlass
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            radius={10}
            blur={1}
            childClassName="flex items-center gap-2 text-white font-medium px-3"
            as={motion.button}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <GlassesIcon className="size-5" />
            <span>Liquid Glass</span>
          </LiquidGlass>
          <div
            className="size-full dark:bg-neutral-900 bg-neutral-100"
            style={{
              backgroundImage:
                'url(https://upload.wikimedia.org/wikipedia/commons/9/93/Rainbow_on_Rara_Lake.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            className="size-full dark:bg-neutral-950 bg-white"
            style={{
              backgroundImage:
                'url(https://www.terdav.com/Content/img/mag/vignettes/grande/1515.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            className="size-full dark:bg-neutral-900 bg-neutral-100"
            style={{
              backgroundImage:
                'url(https://www.amplitudes.com/blog/wp-content/uploads/2019/07/iStock-1014791492-1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            className="size-full dark:bg-neutral-950 bg-white"
            style={{
              backgroundImage:
                'url(https://m.media-amazon.com/images/I/714N8vbkr6L._AC_UF1000,1000_QL80_.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
      </div>
    </div>
  );
}
