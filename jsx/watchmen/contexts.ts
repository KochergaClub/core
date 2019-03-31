import React from 'react';

import { Watchman } from './types';

interface ScheduleContextShape {
  csrfToken: string;
  watchmen: Watchman[];
  editing: boolean;
  setEditing: (value: boolean) => void;
}

export const ScheduleContext = React.createContext<ScheduleContextShape | null>(
  null
);
