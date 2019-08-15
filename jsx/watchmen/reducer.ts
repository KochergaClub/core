import { combineReducers } from 'redux';

import { Schedule, Watchman, Grade } from './types';

import {
  UPDATE_SHIFT,
  REPLACE_SCHEDULE,
  SET_EDITING,
  SET_DATES_WINDOW,
  WATCHMEN_REPLACE,
  GRADES_REPLACE,
  WATCHMAN_ASK_FOR_GRADE,
  WATCHMAN_PICKING_GRADE,
  WATCHMAN_STOP_ASKING_FOR_GRADE,
  ActionTypes,
} from './actions';

type EditingState = boolean;

const editingReducer = (
  state: EditingState = false,
  action: ActionTypes
): EditingState => {
  switch (action.type) {
    case SET_EDITING:
      return action.payload;
    default:
      return state;
  }
};

type WindowState = [string, string];

const windowReducer = (
  state: WindowState = ['2018-12-31', '2019-01-27'],
  action: ActionTypes
): WindowState => {
  switch (action.type) {
    case SET_DATES_WINDOW:
      return action.payload;
    default:
      return state;
  }
};

type ScheduleState = Schedule;

const scheduleReducer = (
  schedule: ScheduleState = {},
  action: ActionTypes
): ScheduleState => {
  switch (action.type) {
    case UPDATE_SHIFT:
      const shift = action.payload.shift;
      if (!schedule) {
        return schedule;
      }
      return {
        ...schedule,
        [shift.date]: schedule[shift.date].map(existingShift => {
          return existingShift.shift === shift.shift ? shift : existingShift;
        }),
      };
    case REPLACE_SCHEDULE:
      return action.payload.schedule;
    default:
      return schedule;
  }
};

type WatchmenState = Watchman[];

const watchmenReducer = (
  state: WatchmenState = [],
  action: ActionTypes
): WatchmenState => {
  switch (action.type) {
    case WATCHMEN_REPLACE:
      return action.payload;
    default:
      return state;
  }
};

type GradesState = Grade[];

const gradesReducer = (
  state: GradesState = [],
  action: ActionTypes
): GradesState => {
  switch (action.type) {
    case GRADES_REPLACE:
      return action.payload;
    default:
      return state;
  }
};

type GradeUIState = {
  askingForWatchmanGrade?: number;
  pickingWatchmanGrade?: number;
};

const gradeUIReducer = (
  state: GradeUIState = {},
  action: ActionTypes
): GradeUIState => {
  switch (action.type) {
    case WATCHMAN_ASK_FOR_GRADE:
      return {
        ...state,
        askingForWatchmanGrade: action.payload,
      };
    case WATCHMAN_PICKING_GRADE:
      return {
        ...state,
        pickingWatchmanGrade: action.payload,
      };
    case WATCHMAN_STOP_ASKING_FOR_GRADE:
      return {
        ...state,
        askingForWatchmanGrade: undefined,
        pickingWatchmanGrade: undefined,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  editing: editingReducer,
  schedule: scheduleReducer,
  datesWindow: windowReducer,
  watchmen: watchmenReducer,
  grades: gradesReducer,
  gradeUI: gradeUIReducer,
});

export default reducer;
