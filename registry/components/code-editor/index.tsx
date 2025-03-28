'use client';

import * as React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { motion, useInView } from 'motion/react';

import { cn } from '@/lib/utils';

interface CodeEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  lang: string; // "javascript", "tsx", etc.
  theme?: string; // "vsc-dark-plus", "atom-dark", etc.
  duration?: number;
  delay?: number;
  showLineNumbers?: boolean;
  header?: boolean;
  cursor?: boolean;
  startOnView?: boolean;
}

const CodeEditor = React.forwardRef<HTMLDivElement, CodeEditorProps>(
  (
    {
      code,
      lang,
      theme = 'atom-dark',
      duration = 5,
      delay = 0,
      className,
      showLineNumbers = false,
      header = true,
      cursor = false,
      startOnView = false,
      ...props
    },
    ref,
  ) => {
    const editorRef = React.useRef<HTMLDivElement>(null);
    const [visibleCode, setVisibleCode] = React.useState('');
    const [importsReady, setImportsReady] = React.useState(false);
    const [highlighterTheme, setHighlighterTheme] = React.useState<
      Record<string, React.CSSProperties>
    >({});
    const [isDone, setIsDone] = React.useState(false);

    const inView = useInView(editorRef, { once: true });

    React.useEffect(() => {
      const loadLanguageAndTheme = async () => {
        try {
          const themeMod = await import(
            `react-syntax-highlighter/dist/esm/styles/prism/${theme}`
          );
          setHighlighterTheme(themeMod.default);
          const mod = await import(
            `react-syntax-highlighter/dist/esm/languages/prism/${lang}`
          );
          SyntaxHighlighter.registerLanguage(lang, mod.default);
          setHighlighterTheme(themeMod.default);
          setImportsReady(true);
        } catch (e) {
          console.error(`Language "${lang}" could not be loaded.`, e);
        }
      };

      loadLanguageAndTheme();
    }, [lang, theme]);

    React.useEffect(() => {
      if (!importsReady || !code.length) return;
      if (startOnView && !inView) return;

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
          }
        }, interval);
      }, delay * 1000);

      return () => {
        clearTimeout(timeout);
        clearInterval(intervalId);
      };
    }, [code, duration, delay, importsReady, startOnView, inView]);

    return (
      <div
        ref={ref}
        className={cn(
          'bg-neutral-900 w-[600px] h-[400px] border border-neutral-800 text-white overflow-hidden flex flex-col rounded-xl',
          className,
        )}
        {...props}
      >
        {header && (
          <div className="flex flex-col gap-y-2 p-4 border-b border-neutral-800">
            <div className="flex flex-row gap-x-2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
          </div>
        )}
        <div
          ref={editorRef}
          className="size-full text-sm p-4 font-mono relative overflow-auto flex-1"
        >
          {importsReady && (
            <SyntaxHighlighter
              showLineNumbers={showLineNumbers}
              lineNumberStyle={{
                minWidth: `${2 + String(code.split('\n').length).length}ch`,
              }}
              codeTagProps={{ className: 'bg-transparent' }}
              wrapLines
              language={lang}
              style={highlighterTheme}
              customStyle={{
                background: 'transparent',
                padding: 0,
                margin: 0,
                border: 'none',
                overflow: 'unset',
              }}
              CodeTag={(props) => (
                <code {...props}>
                  {props.children}
                  {cursor && !isDone && (
                    <motion.span
                      className="inline-block w-[1ch] -translate-px"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                    >
                      |
                    </motion.span>
                  )}
                </code>
              )}
            >
              {visibleCode}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    );
  },
);

CodeEditor.displayName = 'CodeEditor';

export { CodeEditor, type CodeEditorProps };
