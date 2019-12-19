import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { format } from 'date-fns';

import { selectAPI } from '~/core/selectors';
import { State, AsyncAction } from '~/redux/store';

import { Schedule, Shift, DaySchedule, shifts2schedule } from '../types';

import { getSchedule } from '../api';

const scheduleSlice = createSlice({
  name: 'watchmen/schedule',
  initialState: {} as Schedule,
  reducers: {
    replaceShift: (state, action: PayloadAction<Shift>) => {
      state[action.payload.date] = state[action.payload.date].map(
        existingShift => {
          return existingShift.shift === action.payload.shift
            ? action.payload
            : existingShift;
        }
      );
    },
    replace: (_, action: PayloadAction<Schedule>) => action.payload,
  },
});

export default scheduleSlice;

export const selectDaySchedule = (state: State, date: Date): DaySchedule => {
  const key = format(date, 'yyyy-MM-dd');
  return state.watchmen.schedule[key] || [];
};

export const { replace: replaceSchedule } = scheduleSlice.actions;

export const reloadSchedule = (
  from_date: Date,
  to_date: Date
): AsyncAction => async (dispatch, getState) => {
  const api = selectAPI(getState());

  const shifts = await getSchedule(api, from_date, to_date);
  const schedule = shifts2schedule(shifts);
  dispatch(replaceSchedule(schedule));
};

export const updateShift = (shift: Shift): AsyncAction => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());

  const updateUrl = `watchmen/schedule/${shift.date}/${shift.shift}`;
  await api.call(updateUrl, 'PUT', {
    watchman_id: shift.watchman ? shift.watchman.id : null,
    is_night: shift.is_night,
  });

  dispatch(scheduleSlice.actions.replaceShift(shift));
};
