import {
  PreviewCard,
  PreviewCardTrigger,
  PreviewCardContent,
  type PreviewCardProps,
  type PreviewCardContentProps,
} from '@/registry/base/preview-card';

type BasePreviewCardDemoProps = Pick<PreviewCardProps, 'delay' | 'closeDelay'> &
  Pick<
    PreviewCardContentProps,
    'side' | 'sideOffset' | 'align' | 'alignOffset'
  >;

export const BasePreviewCardDemo = ({
  delay,
  closeDelay,
  side,
  sideOffset,
  align,
  alignOffset,
}: BasePreviewCardDemoProps) => {
  return (
    <PreviewCard delay={delay} closeDelay={closeDelay} defaultOpen>
      <PreviewCardTrigger
        render={
          <a
            className="size-12 rounded-full overflow-hidden border"
            href="https://twitter.com/animate_ui"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src="https://pbs.twimg.com/profile_images/1904970066770214912/lYBctz26_400x400.jpg"
              alt="Animate UI"
            />
          </a>
        }
      />
      <PreviewCardContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="w-80"
      >
        <div className="flex flex-col gap-4">
          <img
            className="size-16 rounded-full overflow-hidden border"
            src="https://pbs.twimg.com/profile_images/1904970066770214912/lYBctz26_400x400.jpg"
            alt="Animate UI"
          />
          <div className="flex flex-col gap-4">
            <div>
              <div className="font-bold">Animate UI</div>
              <div className="text-sm text-muted-foreground">@animate_ui</div>
            </div>
            <div className="text-sm text-muted-foreground">
              A fully animated, open-source component distribution built with
              React, TypeScript, Tailwind CSS, and Motion.
            </div>
            <div className="flex gap-4">
              <div className="flex gap-1 text-sm items-center">
                <div className="font-bold">0</div>{' '}
                <div className="text-muted-foreground">Following</div>
              </div>
              <div className="flex gap-1 text-sm items-center">
                <div className="font-bold">2,900</div>{' '}
                <div className="text-muted-foreground">Followers</div>
              </div>
            </div>
          </div>
        </div>
      </PreviewCardContent>
    </PreviewCard>
  );
};
