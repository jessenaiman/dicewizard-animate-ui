import * as React from 'react';
import AnimateUIIcon from '@/components/icons/animateui-icon';
import ShadcnIcon from '@/components/icons/shadcn-icon';
import { Styles } from '@/constants';

export const STYLES_INFO: Record<
  Styles,
  { label: string; icon: React.ReactNode }
> = {
  [Styles.Default]: {
    label: 'Default',
    icon: (
      <div className="bg-blue-500 size-6 p-[3px] rounded-md shrink-0">
        <div className="size-full bg-white/25 rounded-full flex items-center justify-center">
          <AnimateUIIcon className="size-3 text-white pb-px" />
        </div>
      </div>
    ),
  },
  [Styles.ShadcnDefault]: {
    label: 'Shadcn Default',
    icon: (
      <div className="bg-background border border-border size-6 flex items-center justify-center rounded-sm shrink-0">
        <ShadcnIcon className="size-4 text-foreground" />
      </div>
    ),
  },
  [Styles.ShadcnNewYork]: {
    label: 'Shadcn New York',
    icon: (
      <div className="bg-black dark:bg-white size-6 p-0.5 flex items-center justify-center rounded-sm shrink-0">
        <ShadcnIcon className="size-4 text-white dark:text-black" />
      </div>
    ),
  },
};

const LOCAL_STORAGE_KEY = 'animate-ui-style';

type StyleContextType = {
  style: Styles;
  setStyle: (style: Styles) => void;
};

const StyleContext = React.createContext<StyleContextType | undefined>(
  undefined,
);

export const useStyle = (): StyleContextType => {
  const context = React.useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
};

export const StyleProvider = ({ children }: { children: React.ReactNode }) => {
  const [style, setStyle] = React.useState<Styles>(Styles.Default);

  React.useEffect(() => {
    const style = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (style) setStyle(style as Styles);
  }, []);

  const handleStyleChange = React.useCallback(
    (style: Styles) => {
      setStyle(style);
      localStorage.setItem(LOCAL_STORAGE_KEY, style);
    },
    [setStyle],
  );

  return (
    <StyleContext.Provider value={{ style, setStyle: handleStyleChange }}>
      {children}
    </StyleContext.Provider>
  );
};
