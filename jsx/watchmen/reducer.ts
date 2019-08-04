import { combineReducers } from 'redux';

import { Schedule } from './types';

import {
  UPDATE_SHIFT,
  REPLACE_SCHEDULE,
  SET_EDITING,
  ActionTypes,
} from './actions';

type EditingState = boolean;
type ScheduleState = Schedule;

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
});

export default reducer;
