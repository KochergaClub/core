import { RootStore } from './stores/RootStore';
import React from 'react';

export const Context = React.createContext<RootStore | null>(null);

export const useRootStore = () => {
  const root = React.useContext(Context);
  if (!root) {
    throw new Error('Root store is not initialized');
  }
  return root;
};

export const useEventPrototypeStore = () => {
  const root = useRootStore();
  return root.eventPrototypeStore;
};
