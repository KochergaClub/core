import { Shift, Schedule } from './types';

export const updateShift = (shift: Shift) => {
  return {
    type: 'UPDATE_SHIFT' as const,
    payload: {
      shift,
    },
  };
};

export const replaceSchedule = (schedule: Schedule) => {
  return {
    type: 'REPLACE_SCHEDULE' as const,
    payload: {
      schedule,
    },
  };
};

export type Action =
  | ReturnType<typeof updateShift>
  | ReturnType<typeof replaceSchedule>;
