import { createSelector } from 'reselect';

import { format, parseISO } from 'date-fns';

import { State } from '~/redux/store';

import { DaySchedule } from './types';

export const selectEditing = (state: State): boolean => state.watchmen.editing;

export const selectDaySchedule = (state: State, date: Date): DaySchedule => {
  const key = format(date, 'yyyy-MM-dd');
  return state.watchmen.schedule[key] || [];
};

export const selectDatesWindow = createSelector(
  (state: State) => state.watchmen.datesWindow,
  w => {
    const from_date = parseISO(w[0]);
    const to_date = parseISO(w[1]);

    return [from_date, to_date] as [Date, Date];
  }
);
