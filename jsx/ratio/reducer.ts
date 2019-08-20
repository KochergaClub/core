import { AnyAction, Reducer, combineReducers } from 'redux';

import { ticketsSlice, trainingsSlice } from './slices';
import { TICKET_TRY_FISCALIZE, TICKET_FISCALIZED } from './actions';

type TicketsState = ReturnType<typeof ticketsSlice.reducer>;

const ticketsReducer: Reducer<TicketsState> = (
  prevState = ticketsSlice.initialState,
  action: AnyAction
) => {
  const state = ticketsSlice.reducer(prevState, action);
  switch (action.type) {
    case TICKET_FISCALIZED:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.ticket_id]: {
            ...state.byId[action.payload.ticket_id],
            fiscalization_status: 'fiscalized',
          },
        },
      };
    case TICKET_TRY_FISCALIZE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.ticket_id]: {
            ...state.byId[action.payload.ticket_id],
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
});
