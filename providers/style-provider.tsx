import * as React from 'react';
import AnimateUIIcon from '@/components/icons/animateui-icon';
import ShadcnIcon from '@/components/icons/shadcn-icon';
import { Styles } from '@/constants';

const STYLES_INFO = {
  [Styles.Default]: {
    label: 'Default',
    icon: <AnimateUIIcon className="size-3.5" />,
  },
  [Styles.ShadcnDefault]: {
    label: 'Shadcn Default',
    icon: <ShadcnIcon className="size-3.5" />,
  },
  [Styles.ShadcnNewYork]: {
    label: 'Shadcn New York',
    icon: <ShadcnIcon className="size-3.5" />,
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
