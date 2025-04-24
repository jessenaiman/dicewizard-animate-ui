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
      <div className="bg-primary size-6 flex items-center justify-center rounded-md">
        <AnimateUIIcon className="size-3.5 text-primary-foreground" />
      </div>
    ),
  },
  [Styles.ShadcnDefault]: {
    label: 'Shadcn Default',
    icon: (
      <div className="bg-black dark:bg-white size-6 flex items-center justify-center rounded-md">
        <ShadcnIcon className="size-4 text-white dark:text-black" />
      </div>
    ),
  },
  [Styles.ShadcnNewYork]: {
    label: 'Shadcn New York',
    icon: (
      <div className="bg-black dark:bg-white size-6 flex items-center justify-center rounded-md">
        <ShadcnIcon className="size-3.5 text-white dark:text-black" />
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
