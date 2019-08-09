import { combineReducers } from 'redux';

import { Schedule } from './types';

import {
  UPDATE_SHIFT,
  REPLACE_SCHEDULE,
  SET_EDITING,
  SET_DATES_WINDOW,
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

const reducer = combineReducers({
  editing: editingReducer,
  schedule: scheduleReducer,
  datesWindow: windowReducer,
});

export default reducer;
