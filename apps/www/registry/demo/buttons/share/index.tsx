'use client';
import { ShareButton, type ShareButtonProps } from '@/registry/buttons/share';
import { cn } from '@workspace/ui/lib/utils';

type ShareButtonDemoProps = {
  props1: React.ReactNode;
  props2?: string;
} & ShareButtonProps;

export const ShareButtonDemo = ({
  props1,
  props2,
  ...props
}: ShareButtonDemoProps) => {
  return (
    <ShareButton {...props} className={cn(props2)}>
      {props1}
    </ShareButton>
  );
};
