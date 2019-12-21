import { combineReducers } from 'redux';

import coreReducer from '~/core/reducer';

// TODO - lazy-load non-core reducers instead of using everything; replace with replaceReducer()
import staffReducer from '~/staff/reducer';
import watchmenReducer from '~/watchmen/reducer';
import myReducer from '~/my/reducer';
import imageTemplaterReducer from '~/image-templater/reducer';
import ratioReducer from '~/ratio/reducer';
import kkmReducer from '~/kkm/redux-reducer';
import cashierReducer from '~/cashier/reducer';
import auditReducer from '~/audit/reducer';
import nowReducer from '~/now/reducer';
import emailReducer from '~/email/reducer';
import eventsReducer from '~/events/reducer';

const reducer = combineReducers({
  staff: staffReducer,
  watchmen: watchmenReducer,
  my: myReducer,
  core: coreReducer,
  'image-templater': imageTemplaterReducer,
  ratio: ratioReducer,
  kkm: kkmReducer,
  cashier: cashierReducer,
  audit: auditReducer,
  now: nowReducer,
  email: emailReducer,
  events: eventsReducer,
});

export default reducer;
