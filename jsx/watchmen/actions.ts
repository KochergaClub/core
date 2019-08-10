import { format } from 'date-fns';

import { AsyncAction } from '~/redux/store';
import { selectAPI } from '~/core/selectors';

import { getSchedule } from './api';
import { Shift, Schedule, shifts2schedule } from './types';

export const UPDATE_SHIFT = '[watchmen] UPDATE_SHIFT';
export const REPLACE_SCHEDULE = '[watchmen] REPLACE_SCHEDULE';
export const SET_EDITING = '[watchmen] SET_EDITING';
export const SET_DATES_WINDOW = '[watchmen] SET_DATES_WINDOW';

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
  from_date: Date,
  to_date: Date
): AsyncAction<void> => async (dispatch, getState) => {
  const api = selectAPI(getState());

  const shifts = await getSchedule(api, from_date, to_date);
  const schedule = shifts2schedule(shifts);
  dispatch(replaceSchedule(schedule));
};

export const setDatesWindow = (from_date: Date, to_date: Date) => ({
  type: SET_DATES_WINDOW as typeof SET_DATES_WINDOW,
  payload: [format(from_date, 'yyyy-MM-dd'), format(to_date, 'yyyy-MM-dd')] as [
    string,
    string
  ],
});

export type ActionTypes =
  | ReturnType<typeof updateShift>
  | ReturnType<typeof replaceSchedule>
  | ReturnType<typeof setEditing>
  | ReturnType<typeof setDatesWindow>;
