import { createSelector, Selector } from 'reselect';

import { format, parseISO } from 'date-fns';

import { State } from '~/redux/store';

import { DaySchedule, Watchman } from './types';

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

export const selectAllWatchmen = (state: State) => state.watchmen.watchmen;

// current only
export const selectWatchmen: Selector<State, Watchman[]> = createSelector(
  selectAllWatchmen,
  watchmen => watchmen.filter(w => w.is_current)
);

// only current and with priority 1 or 2
export const selectActiveWatchmen: Selector<State, Watchman[]> = createSelector(
  selectWatchmen,
  watchmen =>
    [...watchmen]
      .filter(w => w.priority <= 2)
      .sort((a, b) => a.priority - b.priority)
);

export const selectGrades = (state: State) => state.watchmen.grades;

export const selectWatchmanById = (
  state: State,
  id: number
): Watchman | undefined => state.watchmen.watchmen.find(w => w.id === id);

export const selectAskingForGradeWatchman = (
  state: State
): Watchman | undefined => {
  const id = state.watchmen.gradeUI.askingForWatchmanGrade;
  if (!id) {
    return;
  }
  return selectWatchmanById(state, id);
};

export const selectPickingWatchmanGrade = (state: State): number | undefined =>
  state.watchmen.gradeUI.pickingWatchmanGrade;