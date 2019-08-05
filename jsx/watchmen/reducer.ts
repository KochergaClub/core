import { Schedule } from './types';

import { Action } from './actions';

export const reducer = (schedule: Schedule, action: Action): Schedule => {
  switch (action.type) {
    case 'UPDATE_SHIFT':
      const shift = action.payload.shift;
      return {
        ...schedule,
        [shift.date]: schedule[shift.date].map(existingShift => {
          return existingShift.shift === shift.shift ? shift : existingShift;
        }),
      };
    case 'REPLACE_SCHEDULE':
      return {
        ...action.payload.schedule,
      };
  }
};
