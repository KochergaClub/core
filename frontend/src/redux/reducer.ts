import { combineReducers } from 'redux';

import coreReducer from '~/core/reducer';

// TODO - lazy-load non-core reducers instead of using everything; replace with replaceReducer()
import watchmenReducer from '~/watchmen/reducer';
import myReducer from '~/my/reducer';
import imageTemplaterReducer from '~/image-templater/reducer';
import kkmReducer from '~/kkm/redux-reducer';
import nowReducer from '~/now/reducer';
import emailReducer from '~/email/reducer';
import eventsReducer from '~/events/reducer';

const reducer = combineReducers({
  watchmen: watchmenReducer,
  my: myReducer,
  core: coreReducer,
  'image-templater': imageTemplaterReducer,
  kkm: kkmReducer,
  now: nowReducer,
  email: emailReducer,
  events: eventsReducer,
});

export default reducer;
