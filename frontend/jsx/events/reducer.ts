import { combineReducers } from 'redux';

import {
  eventsSlice,
  feedbacksSlice,
  ticketsSlice,
  events2ticketsSlice,
} from './slices';

export default combineReducers({
  events: eventsSlice.reducer,
  feedbacks: feedbacksSlice.reducer,
  tickets: ticketsSlice.reducer,
  events2tickets: events2ticketsSlice.reducer,
});
