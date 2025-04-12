import { CodeEditor } from '@/registry/components/code-editor';

export const CodeEditorDemo = () => {
  return (
    <CodeEditor
      cursor
      className="w-[640px] h-[480px]"
      code={`'use client';

import * as React from 'react';

type MyComponentProps = {
  myProps: string;
} & React.HTMLAttributes<HTMLDivElement>;

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ myProps, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        <p>My Component</p>
      </div>
    );
  },
);
MyComponent.displayName = 'MyComponent';

export { MyComponent, type MyComponentProps };`}
      lang="tsx"
      duration={15}
      delay={0.5}
      copyButton
    />
  );
};
