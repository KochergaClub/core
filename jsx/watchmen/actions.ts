import { Shift, Schedule } from './types';

export const UPDATE_SHIFT = '[watchmen] UPDATE_SHIFT';
export const REPLACE_SCHEDULE = '[watchmen] REPLACE_SCHEDULE';
export const SET_EDITING = '[watchmen] SET_EDITING';

export const updateShift = (shift: Shift) => ({
  type: UPDATE_SHIFT as typeof UPDATE_SHIFT,
  payload: { shift },
});

export const replaceSchedule = (schedule: Schedule) => ({
  type: REPLACE_SCHEDULE as typeof REPLACE_SCHEDULE,
  payload: { schedule },
});

export const setEditing = (value: boolean) => ({
  type: SET_EDITING as typeof SET_EDITING,
  payload: value,
});

export type ActionTypes =
  | ReturnType<typeof updateShift>
  | ReturnType<typeof replaceSchedule>
  | ReturnType<typeof setEditing>;
