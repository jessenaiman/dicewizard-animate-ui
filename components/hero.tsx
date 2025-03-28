'use client';

import { ArrowRightIcon, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { HighlightText } from '@/registry/text/highlight-text';
import { motion } from 'motion/react';
import FloatingComponent from './animate-ui/floating-component';
import { Tabs, TabsList, TabsTrigger } from '@/registry/components/tabs';
import { Switch } from '@/registry/radix/radix-switch';
import { useTheme } from 'next-themes';
import { Counter } from '@/registry/components/counter';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/registry/radix/radix-tooltip';
import { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/registry/radix/radix-accordion';

export const Hero = () => {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const [number, setNumber] = useState(100);

  return (
    <div className="relative mx-auto max-w-7xl px-6 pt-8 w-full flex flex-col gap-10">
      <div className="lg:max-w-[50%] max-w-[700px] space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-[43px] font-semibold text-neutral-800 dark:text-white !leading-relaxed lg:!leading-snug text-start">
          Make{' '}
          <HighlightText delay={0.5} startOnView text="animated websites" />{' '}
          easily and quickly
        </h1>

        <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-2xl">
          A fully animated, open-source component distribution{' '}
          <strong>
            built with React, TypeScript, Tailwind CSS, and Motion
          </strong>
          . Design fluid interfaces, customize every detail, and bring your UIs
          to life without breaking a sweat.
        </p>

        <div className="flex sm:flex-row flex-col sm:gap-5 gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="w-fit rounded-full pr-5" asChild>
              <Link href="/docs">
                Get Started <ArrowRightIcon className="!size-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="w-fit rounded-full"
              variant="neutral"
              asChild
            >
              <Link href="/docs/components">Browse Components</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="hidden lg:block">
        <FloatingComponent className="absolute -top-5 right-0">
          <Tabs>
            <TabsList className="w-[250px]">
              <TabsTrigger className="flex-1" value="code">
                Code
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="issues">
                Issues
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="docs">
                Docs
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </FloatingComponent>

        <FloatingComponent className="absolute top-24 right-10">
          <Switch
            className="scale-125"
            leftIcon={Sun}
            rightIcon={Moon}
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </FloatingComponent>

        <FloatingComponent className="absolute top-20 right-40">
          <Counter
            number={number}
            setNumber={setNumber}
            slidingNumberProps={{
              startOnView: true,
            }}
          />
        </FloatingComponent>

        <FloatingComponent className="absolute top-20 right-92">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="neutral">Hover</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </FloatingComponent>

        <FloatingComponent className="absolute top-46 right-0">
          <Accordion
            type="single"
            defaultValue="item-1"
            collapsible
            className="w-[400px] px-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm">
                What is Animate UI?
              </AccordionTrigger>
              <AccordionContent className="text-neutral-500 dark:text-neutral-400">
                Animate UI is an open-source distribution of React components
                built with TypeScript, Tailwind CSS, and Motion.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm">
                How is it different from other libraries?
              </AccordionTrigger>
              <AccordionContent className="text-neutral-500 dark:text-neutral-400">
                Instead of installing via NPM, you copy and paste the components
                directly. This gives you full control to modify or customize
                them as needed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b-0">
              <AccordionTrigger className="text-sm">
                Is Animate UI free to use?
              </AccordionTrigger>
              <AccordionContent className="text-neutral-500 dark:text-neutral-400">
                Absolutely! Animate UI is fully open-source. You can use,
                modify, and adapt it to fit your needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </FloatingComponent>
      </div>
    </div>
  );
};
