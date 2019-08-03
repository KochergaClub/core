import { Schedule } from './types';

import {
  UPDATE_SHIFT,
  REPLACE_SCHEDULE,
  SET_EDITING,
  ActionTypes,
} from './actions';

interface State {
  editing: boolean;
  schedule?: Schedule;
}

const initialState: State = {
  editing: false,
  schedule: undefined,
};

const reducer = (state: State = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case UPDATE_SHIFT:
      const shift = action.payload.shift;
      if (!state.schedule) {
        return state;
      }
      const schedule = state.schedule;
      return {
        ...state,
        schedule: {
          ...schedule,
          [shift.date]: schedule[shift.date].map(existingShift => {
            return existingShift.shift === shift.shift ? shift : existingShift;
          }),
        },
      };
    case REPLACE_SCHEDULE:
      return {
        ...state,
        schedule: action.payload.schedule,
      };
    case SET_EDITING:
      return {
        ...state,
        editing: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
