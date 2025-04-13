'use client';

import * as React from 'react';
import {
  motion,
  useInView,
  type UseInViewOptions,
  type HTMLMotionProps,
} from 'motion/react';

import { cn } from '@/lib/utils';
import { CopyButton } from '@/registry/buttons/copy-button';
import { useTheme } from 'next-themes';

interface CodeEditorProps extends HTMLMotionProps<'div'> {
  code: string;
  lang: string;
  themes?: {
    light: string;
    dark: string;
  };
  duration?: number;
  delay?: number;
  showLineNumbers?: boolean;
  header?: boolean;
  cursor?: boolean;
  inView?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  inViewOnce?: boolean;
  copyButton?: boolean;
  writing?: boolean;
  onDone?: () => void;
  title?: string;
  titleLayoutId?: string;
}

const CodeEditor = React.forwardRef<HTMLDivElement, CodeEditorProps>(
  (
    {
      code,
      lang,
      themes = {
        light: 'github-light',
        dark: 'github-dark',
      },
      duration = 5,
      delay = 0,
      className,
      header = true,
      cursor = false,
      inView = false,
      inViewMargin = '0px',
      inViewOnce = true,
      copyButton = false,
      writing = true,
      onDone,
      title,
      titleLayoutId,
      ...props
    },
    ref,
  ) => {
    const { resolvedTheme } = useTheme();

    const editorRef = React.useRef<HTMLDivElement>(null);
    const [visibleCode, setVisibleCode] = React.useState('');
    const [highlightedCode, setHighlightedCode] = React.useState('');
    const [isDone, setIsDone] = React.useState(false);

    const inViewResult = useInView(editorRef, {
      once: inViewOnce,
      margin: inViewMargin,
    });
    const isInView = !inView || inViewResult;

    React.useEffect(() => {
      if (!visibleCode.length || !isInView) return;

      const loadHighlightedCode = async () => {
        try {
          const { codeToHtml } = await import('shiki');

          const highlighted = await codeToHtml(visibleCode, {
            lang,
            themes: {
              light: themes.light,
              dark: themes.dark,
            },
            defaultColor: resolvedTheme === 'dark' ? 'dark' : 'light',
          });

          setHighlightedCode(highlighted);
        } catch (e) {
          console.error(`Language "${lang}" could not be loaded.`, e);
        }
      };

      loadHighlightedCode();
    }, [
      lang,
      themes,
      writing,
      isInView,
      duration,
      delay,
      visibleCode,
      resolvedTheme,
    ]);

    React.useEffect(() => {
      if (!writing) {
        setVisibleCode(code);
        onDone?.();
        return;
      }

      if (!code.length || !isInView) return;

      const characters = Array.from(code);
      let index = 0;
      const totalDuration = duration * 1000;
      const interval = totalDuration / characters.length;
      let intervalId: NodeJS.Timeout;

      const timeout = setTimeout(() => {
        intervalId = setInterval(() => {
          if (index < characters.length) {
            setVisibleCode((prev) => {
              const currentIndex = index;
              index += 1;
              return prev + characters[currentIndex];
            });
            editorRef.current?.scrollTo({
              top: editorRef.current?.scrollHeight,
              behavior: 'smooth',
            });
          } else {
            clearInterval(intervalId);
            setIsDone(true);
            onDone?.();
          }
        }, interval);
      }, delay * 1000);

      return () => {
        clearTimeout(timeout);
        clearInterval(intervalId);
      };
    }, [code, duration, delay, isInView, writing, onDone]);

    return (
      <motion.div
        ref={ref}
        className={cn(
          'bg-background w-[600px] h-[400px] border border-border text-white overflow-hidden flex flex-col rounded-xl',
          className,
        )}
        {...props}
      >
        {header && (
          <div className="bg-muted relative flex flex-row items-center justify-between gap-y-2 h-11 pl-4 pr-2">
            <div className="flex flex-row gap-x-2">
              <div className="size-2.5 rounded-full bg-red-500"></div>
              <div className="size-2.5 rounded-full bg-yellow-500"></div>
              <div className="size-2.5 rounded-full bg-green-500"></div>
            </div>

            {title && (
              <motion.p
                layoutId={titleLayoutId}
                className="absolute max-w-[50%] truncate left-1/2 -translate-x-1/2 text-sm text-neutral-500"
              >
                {title}
              </motion.p>
            )}

            {copyButton && (
              <CopyButton
                content={code}
                size="sm"
                className="size-7 [&_svg]:size-3.5 bg-transparent hover:bg-neutral-800 text-white"
              />
            )}
          </div>
        )}
        <div
          ref={editorRef}
          className="h-[calc(100%-2.75rem)] w-full text-sm p-4 font-mono relative overflow-auto flex-1"
        >
          <div
            className={cn(
              '[&>pre,_&_code]:!bg-transparent [&>pre,_&_code]:[background:transparent_!important] [&>pre,_&_code]:border-none [&_code]:!text-sm',
              cursor &&
                !isDone &&
                "[&_.line:last-of-type::after]:content-['|'] [&_.line:last-of-type::after]:animate-pulse [&_.line:last-of-type::after]:inline-block [&_.line:last-of-type::after]:w-[1ch] [&_.line:last-of-type::after]:-translate-px",
            )}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
      </motion.div>
    );
  },
);

CodeEditor.displayName = 'CodeEditor';

export { CodeEditor, type CodeEditorProps };
