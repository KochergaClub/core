import React from 'react';

import { Shift, Watchman } from './types';

interface ScheduleContextShape {
  csrfToken: string;
  watchmen: Watchman[];
  editing: boolean;
  setEditing: (value: boolean) => void;
  setShift: (shift: Shift) => void;
}

export const ScheduleContext = React.createContext<ScheduleContextShape | null>(
  null
);
