import { Dancing_Script } from 'next/font/google';
import { MotionEffect } from './effects/motion-effect';
import { Primitives } from './icons/primitives';
import { cn } from '@workspace/ui/lib/utils';
import { Components } from './icons/components';
import { Blocks } from './icons/blocks';
import Link from 'next/link';
import {
  AlarmClockIcon,
  ArrowRightIcon,
  AudioLinesIcon,
  BatteryFullIcon,
  BellRingIcon,
  ClockIcon,
  Disc3Icon,
  LoaderIcon,
  MessageSquareMoreIcon,
  SettingsIcon,
  UsersIcon,
  WifiIcon,
} from 'lucide-react';
import { motion } from 'motion/react';

const COMPONENTS = [
  {
    name: 'Primitives',
    href: '/docs/primitives',
    icon: <Primitives />,
  },
  {
    name: 'Components',
    href: '/docs/components',
    icon: <Components />,
  },
  {
    name: 'Icons',
    href: '/docs/icons',
    icon: (
      <div className="w-full flex flex-col gap-5 sm:gap-10 pt-10 justify-center items-center h-full aspect-[350/259.17] dark:text-neutral-500 text-neutral-400">
        <div className="flex flex-row gap-7 sm:gap-10">
          <WifiIcon className="sm:size-9 size-6.5" />
          <ClockIcon className="sm:size-9 size-6.5" />
          <AudioLinesIcon className="sm:size-9 size-6.5" />
          <LoaderIcon className="sm:size-9 size-6.5" />
        </div>
        <div className="flex flex-row gap-7 sm:gap-10">
          <SettingsIcon className="sm:size-9 size-6.5" />
          <Disc3Icon className="sm:size-9 size-6.5" />
          <BatteryFullIcon className="sm:size-9 size-6.5" />
          <UsersIcon className="sm:size-9 size-6.5" />
        </div>
        <div className="flex flex-row gap-7 sm:gap-10">
          <MessageSquareMoreIcon className="sm:size-9 size-6.5" />
          <BellRingIcon className="sm:size-9 size-6.5" />
          <AlarmClockIcon className="sm:size-9 size-6.5" />
          <ArrowRightIcon className="sm:size-9 size-6.5" />
        </div>
      </div>
    ),
  },
  {
    name: 'Soon...',
    icon: (
      <div className="relative">
        <Blocks />
      </div>
    ),
  },
];

const dancing = Dancing_Script({ subsets: ['latin'] });

export const Features = () => {
  return (
    <div className="relative pt-10 pb-20 px-5 flex flex-col items-center justify-center">
      <MotionEffect
        slide={{
          direction: 'down',
        }}
        fade
        zoom
        inView
      >
        <h2 className="text-4xl font-bold">Components</h2>
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
        <p className="text-center sm:text-base text-sm text-muted-foreground sm:max-w-sm max-w-[350px] mt-5">
          From primitives and icons to complete components, find everything you
          need to animate your app.
        </p>
      </MotionEffect>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto xs:px-10 mt-15">
        {COMPONENTS.map((component, index) => {
          const Component = component.href ? Link : 'div';
          return (
            <MotionEffect
              slide={{
                direction: 'down',
              }}
              fade
              zoom
              inView
              delay={0.15 * index}
              key={index}
            >
              {/* @ts-ignore */}
              <Component {...(component.href ? { href: component.href } : {})}>
                <motion.div
                  whileHover={{
                    scale: component.href ? 1.025 : 1,
                  }}
                  whileTap={{
                    scale: component.href ? 0.925 : 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                  }}
                  className={cn(
                    'relative w-full dark:bg-neutral-800 bg-neutral-100 rounded-2xl ring-4 ring-black/5 dark:ring-white/5',
                    !component?.href && 'opacity-50 cursor-not-allowed',
                  )}
                >
                  <p
                    className={cn(
                      dancing.className,
                      'sm:text-[25px] text-xl font-black text-muted-foreground absolute sm:top-5 top-4 left-1/2 -translate-x-1/2',
                    )}
                  >
                    {component.name}
                  </p>

                  {component.icon}
                </motion.div>
              </Component>
            </MotionEffect>
          );
        })}
      </div>
    </div>
  );
};
