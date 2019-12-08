import { combineReducers } from 'redux';

import events from './features/events';
import eventPage from './features/eventPage';
import eventPageFeedbacks from './features/eventPageFeedbacks';
import eventPageTickets from './features/eventPageTickets';

export default combineReducers({
  events: events.reducer,
  eventPage: eventPage.reducer,
  eventPageFeedbacks: eventPageFeedbacks.reducer,
  eventPageTickets: eventPageTickets.reducer,
});
