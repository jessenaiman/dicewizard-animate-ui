import { index } from '@/__registry__';
import { STYLES } from '@/providers/style-provider';

export function getStyleName(name: string, style: string) {
  const styleName = `${style}-${name}`;
  if (index[styleName]) return styleName;
  return name;
}

export function getAvailableStyles(name: string) {
  return {
    ...Object.fromEntries(
      Object.entries(STYLES).filter(
        ([key]) =>
          index[`${key}-${name.replace('-demo', '')}`] || key === 'default',
      ),
    ),
  };
}
