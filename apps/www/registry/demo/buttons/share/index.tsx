'use client';
import { ShareButton, type ShareButtonProps } from '@/registry/buttons/share';
import { cn } from '@workspace/ui/lib/utils';

type ShareButtonDemoProps = {
  children: React.ReactNode;
  className?: string;
} & ShareButtonProps;

export const ShareButtonDemo = ({
  children,
  className,
  size,
  ...props
}: ShareButtonDemoProps) => {
  return (
    <ShareButton {...props} className={cn(className)} size={size}>
      {children}
    </ShareButton>
  );
};
