import { AnyAction, Reducer, combineReducers } from 'redux';

import { ticketsSlice, trainingsSlice, trainersSlice } from './slices';
import {
  TICKET_TRY_FISCALIZE,
  TICKET_FISCALIZED,
  ActionTypes,
} from './actions';

type TicketsState = ReturnType<typeof ticketsSlice.reducer>;

const ticketsReducer: Reducer<TicketsState> = (
  prevState = ticketsSlice.initialState,
  anyAction: AnyAction
) => {
  const state = ticketsSlice.reducer(prevState, anyAction);
  const action = anyAction as ActionTypes;
  switch (action.type) {
    case TICKET_FISCALIZED:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload]: {
            ...state.byId[action.payload],
            fiscalization_status: 'fiscalized',
          },
        },
      };
    case TICKET_TRY_FISCALIZE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload]: {
            ...state.byId[action.payload],
            fiscalization_status: 'in_progress',
          },
        },
      };
    default:
      return state;
  }
};

export default combineReducers({
  tickets: ticketsReducer,
  trainings: trainingsSlice.reducer,
  trainers: trainersSlice.reducer,
});
