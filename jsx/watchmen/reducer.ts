import { Shift, Schedule } from './types';

interface UpdateShiftAction {
  type: 'UPDATE_SHIFT';
  payload: {
    shift: Shift;
  };
}

interface ReplaceScheduleAction {
  type: 'REPLACE_SCHEDULE';
  payload: {
    schedule: Schedule;
  };
}

type Action = UpdateShiftAction | ReplaceScheduleAction;

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
    default:
      return schedule;
  }
};
