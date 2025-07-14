import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { ArrowRightIcon, PartyPopper } from 'lucide-react';
import { SplittingText } from './texts/splitting';
import { useEffect } from 'react';
import { animate } from 'motion';
import ReactIcon from '@workspace/ui/components/icons/react-icon';
import TSIcon from '@workspace/ui/components/icons/ts-icon';
import TailwindIcon from '@workspace/ui/components/icons/tailwind-icon';
import MotionIcon from '@workspace/ui/components/icons/motion-icon';
import ShadcnIcon from '@workspace/ui/components/icons/shadcn-icon';
import { Button } from '@workspace/ui/components/ui/button';
import Link from 'next/link';
import { MotionEffect } from './effects/motion-effect';

const ICONS = [ReactIcon, TSIcon, TailwindIcon, MotionIcon, ShadcnIcon];

export const Hero = ({ isMobile }: { isMobile: boolean }) => {
  const opacity = useMotionValue(0.8);

  useEffect(() => {
    animate(opacity, [0.8, 0.6, 0.7, 0.9, 0.7, 0.8], {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, var(--color-background) 50%, var(--color-foreground))`;

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center">
      <motion.div
        style={{
          backgroundImage,
          opacity,
          WebkitMaskImage:
            'linear-gradient(to bottom, black 40%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
        }}
        className="absolute inset-0 -bottom-30 z-0"
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        <MotionEffect
          slide={{
            direction: 'down',
          }}
          fade
          zoom
          inView
        >
          <div className="mb-10 rounded-full bg-accent py-1 pl-3 pr-1 text-sm flex items-center gap-2">
            <p className="flex items-center gap-2 text-accent-foreground">
              <PartyPopper className="size-4 text-muted-foreground" />{' '}
              Introducing Animate UI{' '}
              <span className="bg-white dark:bg-neutral-950 rounded-full font-bold -ml-0.5 tracking-tighter px-[7px] py-1.5 text-xs">
                1.0
              </span>
            </p>
          </div>
        </MotionEffect>

        <MotionEffect
          slide={{
            direction: 'down',
          }}
          fade
          zoom
          inView
          delay={0.15}
        >
          <div className="relative z-10">
            <h1 className="md:max-w-[700px] sm:max-w-[580px] max-w-[350px]">
              <SplittingText
                text="Elevate your UI with fluid, animated components"
                className="block md:text-6xl sm:text-5xl text-4xl font-semibold text-center text-neutral-200 dark:text-neutral-800"
                type={isMobile ? 'words' : 'chars'}
                disableAnimation
              />
            </h1>
            <div className="md:max-w-[700px] sm:max-w-[580px] max-w-[350px] absolute inset-0 flex items-center justify-center">
              <SplittingText
                text="Elevate your UI with fluid, animated components"
                className="block md:text-6xl sm:text-5xl text-4xl font-semibold text-center"
                type={isMobile ? 'words' : 'chars'}
                motionVariants={{
                  initial: { y: 0, opacity: 0, x: 0, filter: 'blur(10px)' },
                  animate: { y: 0, opacity: 1, x: 0, filter: 'blur(0px)' },
                  transition: { duration: 0.4, ease: 'easeOut' },
                }}
              />
            </div>
          </div>
        </MotionEffect>

        <MotionEffect
          slide={{
            direction: 'down',
          }}
          fade
          zoom
          inView
          delay={0.3}
        >
          <p className="block md:text-lg sm:text-base text-sm text-center mt-5 text-muted-foreground sm:max-w-[550px] max-w-[350px]">
            A fully animated, open-source component distribution built with
            React, TypeScript, Tailwind CSS, Motion and Shadcn CLI. Browse a
            list of components you can install, modify, and use in your
            projects.
          </p>
        </MotionEffect>

        <div className="flex sm:flex-row flex-col sm:gap-5 gap-3 my-8 max-sm:w-full">
          <MotionEffect
            slide={{
              direction: 'down',
            }}
            fade
            zoom
            inView
            delay={0.45}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="w-full rounded-full pr-5"
                variant="default"
                asChild
              >
                <Link href="/docs/installation">
                  Get Started <ArrowRightIcon className="!size-5" />
                </Link>
              </Button>
            </motion.div>
          </MotionEffect>

          <MotionEffect
            slide={{
              direction: 'down',
            }}
            fade
            zoom
            inView
            delay={0.6}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="w-full rounded-full"
                variant="accent"
                asChild
              >
                <Link href="/docs/components">Browse Components</Link>
              </Button>
            </motion.div>
          </MotionEffect>
        </div>

        <div className="flex items-center gap-4 justify-center sm:justify-start">
          {ICONS.map((Icon, index) => (
            <MotionEffect
              key={index}
              slide={{
                direction: 'down',
              }}
              fade
              zoom
              inView
              delay={0.75 + index * 0.1}
            >
              <Icon className="size-8" />
            </MotionEffect>
          ))}
        </div>
      </div>
    </div>
  );
};
