'use client';

import * as React from 'react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

const CursorBlinker = ({ className }: { className?: string }) => {
  return (
    <motion.span
      variants={{
        blinking: {
          opacity: [0, 0, 1, 1],
          transition: {
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0,
            ease: 'linear',
            times: [0, 0.5, 0.5, 1],
          },
        },
      }}
      animate="blinking"
      className={cn(
        'inline-block h-5 w-[1px] translate-y-1 bg-black dark:bg-white',
        className,
      )}
    />
  );
};

interface TypingTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  duration?: number;
  delay?: number;
  startOnView?: boolean;
  cursor?: boolean;
  loop?: boolean;
  holdDelay?: number;
  text: string | string[];
  cursorClassName?: string;
}

const TypingText = React.forwardRef<HTMLSpanElement, TypingTextProps>(
  (
    {
      className,
      duration = 100,
      delay = 0,
      startOnView = false,
      cursor = false,
      loop = false,
      holdDelay = 1000,
      text,
      cursorClassName,
      ...props
    },
    forwardedRef,
  ) => {
    const localRef = React.useRef<HTMLElement | null>(null);

    const setRef = (node: HTMLElement | null) => {
      localRef.current = node;
      if (forwardedRef) {
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else {
          (forwardedRef as React.RefObject<HTMLElement | null>).current = node;
        }
      }
    };

    const [displayedText, setDisplayedText] = React.useState<string>('');
    const [started, setStarted] = React.useState(false);

    React.useEffect(() => {
      if (!startOnView) {
        const timeoutId = setTimeout(() => {
          setStarted(true);
        }, delay);
        return () => clearTimeout(timeoutId);
      }
      const observerCallback = ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStarted(true);
          }, delay);
          observer.disconnect();
        }
      };
      const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1,
      });
      if (localRef.current) observer.observe(localRef.current);
      return () => observer.disconnect();
    }, [delay, startOnView]);

    React.useEffect(() => {
      if (!started) return;
      const timeoutIds: Array<ReturnType<typeof setTimeout>> = [];
      const texts: string[] = typeof text === 'string' ? [text] : text;

      const typeText = (str: string, onComplete: () => void) => {
        let currentIndex = 0;
        const type = () => {
          if (currentIndex <= str.length) {
            setDisplayedText(str.substring(0, currentIndex));
            currentIndex++;
            const id = setTimeout(type, duration);
            timeoutIds.push(id);
          } else {
            onComplete();
          }
        };
        type();
      };

      const eraseText = (str: string, onComplete: () => void) => {
        let currentIndex = str.length;
        const erase = () => {
          if (currentIndex >= 0) {
            setDisplayedText(str.substring(0, currentIndex));
            currentIndex--;
            const id = setTimeout(erase, duration);
            timeoutIds.push(id);
          } else {
            onComplete();
          }
        };
        erase();
      };

      const animateTexts = (index: number) => {
        typeText(texts[index], () => {
          const isLast = index === texts.length - 1;
          if (isLast && !loop) {
            return;
          }
          const id = setTimeout(() => {
            eraseText(texts[index], () => {
              const nextIndex = isLast ? 0 : index + 1;
              animateTexts(nextIndex);
            });
          }, holdDelay);
          timeoutIds.push(id);
        });
      };

      animateTexts(0);

      return () => {
        timeoutIds.forEach(clearTimeout);
      };
    }, [text, duration, started, loop, holdDelay]);

    return (
      <span ref={setRef} className={className} {...props}>
        <motion.span>{displayedText}</motion.span>
        {cursor && <CursorBlinker className={cursorClassName} />}
      </span>
    );
  },
);
TypingText.displayName = 'TypingText';

export { TypingText, type TypingTextProps };
