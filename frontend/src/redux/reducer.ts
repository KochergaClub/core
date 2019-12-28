import { combineReducers } from 'redux';

import coreReducer from '~/core/reducer';

import eventsReducer from '~/events/reducer';

const reducer = combineReducers({
  core: coreReducer,
  events: eventsReducer,
});

export default reducer;
