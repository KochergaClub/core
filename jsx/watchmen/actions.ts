import { format } from 'date-fns';

import { AsyncAction } from '~/redux/store';
import { selectAPI } from '~/core/selectors';

import { getSchedule, getWatchmen, getGrades, patchWatchman } from './api';
import { Shift, Schedule, Watchman, Grade, shifts2schedule } from './types';

export const UPDATE_SHIFT = '[watchmen] UPDATE_SHIFT';
export const REPLACE_SCHEDULE = '[watchmen] REPLACE_SCHEDULE';
export const WATCHMEN_REPLACE = '[watchmen] WATCHMEN_REPLACE';
export const SET_EDITING = '[watchmen] SET_EDITING';
export const SET_DATES_WINDOW = '[watchmen] SET_DATES_WINDOW';
export const GRADES_REPLACE = '[watchmen] GRADES_REPLACE';
export const WATCHMAN_ASK_FOR_GRADE = '[watchmen] WATCHMAN_ASK_FOR_GRADE';
export const WATCHMAN_PICKING_GRADE = '[watchmen] WATCHMAN_PICKING_GRADE';
export const WATCHMAN_STOP_ASKING_FOR_GRADE =
  '[watchmen] WATCHMAN_STOP_ASKING_FOR_GRADE';

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

export const replaceWatchmen = (watchmen: Watchman[]) => ({
  type: WATCHMEN_REPLACE as typeof WATCHMEN_REPLACE,
  payload: watchmen,
});

export const loadWatchmen = (): AsyncAction<void> => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());
  const watchmen = await getWatchmen(api);
  dispatch(replaceWatchmen(watchmen));
};

export const replaceGrades = (grades: Grade[]) => ({
  type: GRADES_REPLACE as typeof GRADES_REPLACE,
  payload: grades,
});

export const loadGrades = (): AsyncAction<void> => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());
  const grades = await getGrades(api);
  dispatch(replaceGrades(grades));
};

export const askForWatchmanGrade = (watchman: Watchman) => ({
  type: WATCHMAN_ASK_FOR_GRADE as typeof WATCHMAN_ASK_FOR_GRADE,
  payload: watchman.id,
});

export const pickingWatchmanGrade = (grade: Grade) => ({
  type: WATCHMAN_PICKING_GRADE as typeof WATCHMAN_PICKING_GRADE,
  payload: grade.id,
});

export const stopAskingForWatchmanGrade = () => ({
  type: WATCHMAN_STOP_ASKING_FOR_GRADE as typeof WATCHMAN_STOP_ASKING_FOR_GRADE,
});

export const pickWatchmanGrade = (
  watchman: Watchman,
  grade: Grade
): AsyncAction<void> => async (dispatch, getState) => {
  const api = selectAPI(getState());
  dispatch(pickingWatchmanGrade(grade));
  await patchWatchman(api, watchman, {
    grade_id: grade.id,
  });
  await dispatch(loadWatchmen());
  dispatch(stopAskingForWatchmanGrade());
};

export const setWatchmanPriority = (
  watchman: Watchman,
  priority: number
): AsyncAction<void> => async (dispatch, getState) => {
  const api = selectAPI(getState());
  await patchWatchman(api, watchman, {
    priority,
  });
  await dispatch(loadWatchmen());
};

export type ActionTypes =
  | ReturnType<typeof updateShift>
  | ReturnType<typeof replaceSchedule>
  | ReturnType<typeof setEditing>
  | ReturnType<typeof setDatesWindow>
  | ReturnType<typeof replaceWatchmen>
  | ReturnType<typeof replaceGrades>
  | ReturnType<typeof askForWatchmanGrade>
  | ReturnType<typeof pickingWatchmanGrade>
  | ReturnType<typeof stopAskingForWatchmanGrade>;
