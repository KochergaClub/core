import { RootStore } from './stores/RootStore';
import React from 'react';

export const Context = React.createContext<RootStore | null>(null);

export const useRootStore = () => React.useContext(Context);
