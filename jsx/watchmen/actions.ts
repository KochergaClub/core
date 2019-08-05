import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { API } from '~/common/api';
import { getSchedule } from './api';
import { Shift, Schedule, shifts2schedule } from './types';

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

export const reloadSchedule = (
  api: API,
  from_date: Date,
  to_date: Date
): ThunkAction<Promise<void>, any, undefined, Action> => {
  return async dispatch => {
    const shifts = await getSchedule(api, from_date, to_date);
    const schedule = shifts2schedule(shifts);
    dispatch(replaceSchedule(schedule));
  };
};

export type ActionTypes =
  | ReturnType<typeof updateShift>
  | ReturnType<typeof replaceSchedule>
  | ReturnType<typeof setEditing>;
