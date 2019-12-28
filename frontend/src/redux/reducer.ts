import { combineReducers } from 'redux';

import coreReducer from '~/core/reducer';

import kkmReducer from '~/kkm/redux-reducer';
import eventsReducer from '~/events/reducer';

const reducer = combineReducers({
  core: coreReducer,
  kkm: kkmReducer,
  events: eventsReducer,
});

export default reducer;
