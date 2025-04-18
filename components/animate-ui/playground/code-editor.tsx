'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Editor, type Monaco } from '@monaco-editor/react';
import { createHighlighter, type Highlighter } from 'shiki';
import { shikiToMonaco } from '@shikijs/monaco';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { editor } from 'monaco-editor';
interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

export const CodeEditor = ({ code, setCode }: CodeEditorProps) => {
  const { resolvedTheme } = useTheme();
  const monacoRef = useRef<Monaco | null>(null);
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);

  useEffect(() => {
    createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['tsx', 'javascript', 'typescript', 'jsx'],
    }).then((hl) => {
      setHighlighter(hl);
    });
  }, []);

  const handleEditorBeforeMount = useCallback(
    (monaco: Monaco) => {
      monacoRef.current = monaco;
      monaco.languages.register({ id: 'javascript' });
      monaco.languages.register({ id: 'typescript' });
      monaco.languages.register({ id: 'jsx' });
      monaco.languages.register({ id: 'tsx' });

      if (highlighter) {
        shikiToMonaco(highlighter, monaco);
      }
    },
    [highlighter],
  );

  const handleEditorMount = useCallback(
    (editorInstance: editor.IEditor, monaco: Monaco) => {
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.Preserve,
        jsxFactory: 'React.createElement',
        reactNamespace: 'React',
        allowNonTsExtensions: true,
        allowJs: true,
        target: monaco.languages.typescript.ScriptTarget.Latest,
      });
    },
    [],
  );

  const themeName = resolvedTheme === 'dark' ? 'github-dark' : 'github-light';

  return (
    <div
      className={cn(
        'flex flex-col size-full rounded-2xl border border-border bg-[#F9F9F9] dark:bg-[#181818]',
        '[&_.margin]:!bg-[#F9F9F9] [&_.monaco-editor]:!outline-none [&_.monaco-editor-background]:!bg-[#F9F9F9]',
        'dark:[&_.margin]:!bg-[#181818] dark:[&_.monaco-editor-background]:!bg-[#181818]',
      )}
    >
      <div className="py-5 size-full">
        {highlighter ? (
          <Editor
            height="100%"
            width="100%"
            defaultLanguage="tsx"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme={themeName}
            beforeMount={handleEditorBeforeMount}
            onMount={handleEditorMount}
            loading={
              <Loader2 className="size-12 animate-spin text-muted-foreground/50" />
            }
            options={{
              overviewRulerLanes: 0,
              overviewRulerBorder: false,
              scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
              minimap: { enabled: false },
              tabSize: 2,
              insertSpaces: true,
              lineNumbersMinChars: 4,
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="size-12 animate-spin text-muted-foreground/50" />
          </div>
        )}
      </div>
    </div>
  );
};
