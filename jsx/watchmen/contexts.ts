import React from 'react';

import { Shift } from './types';

interface ScheduleContextShape {
  editing: boolean;
  setEditing: (value: boolean) => void;
  setShift: (shift: Shift) => void;
}

export const ScheduleContext = React.createContext<ScheduleContextShape>({
  editing: false,
  setEditing: () => {
    throw new Error('not implemented');
  },
  setShift: () => {
    throw new Error('not implemented');
  },
});
