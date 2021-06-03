import { createContext } from 'react';

export interface NowTheme {
  inverted: boolean;
  tv: boolean;
}

export const NowThemeContext = createContext<NowTheme>({
  inverted: false,
  tv: false,
});
