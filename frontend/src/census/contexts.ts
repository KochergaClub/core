import React from 'react';

export interface MainContextShape {
  rightSideWidth: number | null;
  total: number | null;
}

export const MainContext = React.createContext<MainContextShape>({
  rightSideWidth: null,
  total: null,
});
