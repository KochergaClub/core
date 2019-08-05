import { format, parseISO } from 'date-fns';

import { State } from '~/redux/store';

import { DaySchedule, DatesWindow } from './types';

export const selectEditing = (state: State): boolean => state.watchmen.editing;

export const selectDaySchedule = (state: State, date: Date): DaySchedule => {
  const key = format(date, 'yyyy-MM-dd');
  return state.watchmen.schedule[key] || [];
};

export const selectDatesWindow = (state: State): DatesWindow => {
  const from_date = parseISO(state.watchmen.datesWindow[0]);
  const to_date = parseISO(state.watchmen.datesWindow[1]);

  return [from_date, to_date];
};
