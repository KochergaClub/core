import React from 'react';

import { Shift, Watchman } from './types';

interface ScheduleContextShape {
  watchmen: Watchman[];
  editing: boolean;
  setEditing: (value: boolean) => void;
  setShift: (shift: Shift) => void;
}

export const ScheduleContext = React.createContext<ScheduleContextShape>({
  watchmen: [],
  editing: false,
  setEditing: () => {
    throw new Error('not implemented');
  },
  setShift: () => {
    throw new Error('not implemented');
  },
});
