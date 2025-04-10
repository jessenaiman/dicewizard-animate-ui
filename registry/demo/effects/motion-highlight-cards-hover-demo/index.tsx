import { MotionHighlight } from '@/registry/effects/motion-highlight';
import { BringToFront, GitPullRequest } from 'lucide-react';

const CARDS = [
  {
    value: '1',
    icon: BringToFront,
    title: 'Animated components',
    description: 'Beautiful Motion-animated components for dynamic websites.',
  },
  {
    value: '2',
    icon: GitPullRequest,
    title: 'Open Source',
    description:
      'Install the components in your project and modify them as you wish.',
  },
  {
    value: '3',
    icon: ({ className }: { className: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className={className}
      >
        <rect width="256" height="256" fill="none" />
        <line
          x1="208"
          y1="128"
          x2="128"
          y2="208"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
        <line
          x1="192"
          y1="40"
          x2="40"
          y2="192"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
      </svg>
    ),
    title: 'Complementary to Shadcn UI',
    description:
      'The components are designed to be used with Shadcn UI components.',
  },
  {
    value: '4',
    icon: ({ className }: { className: string }) => (
      <svg viewBox="0 0 34 20" fill="currentColor" className={className}>
        <path d="M17.183 0C12.6 0 9.737 2.291 8.59 6.873c1.719-2.29 3.723-3.15 6.014-2.577 1.307.326 2.242 1.274 3.275 2.324 1.685 1.71 3.635 3.689 7.894 3.689 4.582 0 7.445-2.291 8.591-6.872-1.718 2.29-3.723 3.15-6.013 2.576-1.308-.326-2.243-1.274-3.276-2.324C23.39 1.98 21.44 0 17.183 0ZM8.59 10.309C4.01 10.309 1.145 12.6 0 17.182c1.718-2.291 3.723-3.15 6.013-2.577 1.308.326 2.243 1.274 3.276 2.324 1.685 1.71 3.635 3.689 7.894 3.689 4.582 0 7.445-2.29 8.59-6.872-1.718 2.29-3.722 3.15-6.013 2.577-1.307-.327-2.242-1.276-3.276-2.325-1.684-1.71-3.634-3.689-7.893-3.689Z" />
      </svg>
    ),
    title: 'Build with Tailwind CSS',
    description: 'The components are designed with Tailwind CSS.',
  },
];

export const MotionHighlightCardsHoverDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MotionHighlight hover className="rounded-lg">
        {CARDS.map((card) => (
          <div key={card.value} data-value={card.value}>
            <div className="p-4 flex flex-col border rounded-lg">
              <div className="flex items-center justify-around size-10 rounded-lg bg-blue-500/10 mb-2">
                <card.icon className="size-5 text-blue-500" />
              </div>
              <p className="text-base font-medium mb-1">{card.title}</p>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </MotionHighlight>
    </div>
  );
};
