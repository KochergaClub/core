import { format } from 'date-fns';

import { State } from '~/redux/store';

import { DaySchedule } from './types';

export const selectEditing = (state: State): boolean => state.watchmen.editing;

export const selectDaySchedule = (state: State, date: Date): DaySchedule => {
  const key = format(date, 'yyyy-MM-dd');
  return state.watchmen.schedule[key] || [];
};
