import { combineReducers } from 'redux';

import events from './features/events';
import eventPage from './features/eventPage';
import eventPageFeedbacks from './features/eventPageFeedbacks';
import calendarUI from './features/calendarUI';

export default combineReducers({
  events: events.reducer,
  eventPage: eventPage.reducer,
  eventPageFeedbacks: eventPageFeedbacks.reducer,
  calendarUI: calendarUI.reducer,
});
