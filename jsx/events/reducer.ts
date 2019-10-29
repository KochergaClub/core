import { combineReducers } from 'redux';

import { feedbacksSlice, ticketsSlice, events2ticketsSlice } from './slices';

export default combineReducers({
  feedbacks: feedbacksSlice.reducer,
  tickets: ticketsSlice.reducer,
  events2tickets: events2ticketsSlice.reducer,
});
