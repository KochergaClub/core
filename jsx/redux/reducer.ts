import { combineReducers } from 'redux';

import staffReducer from '~/staff/reducer';
import watchmenReducer from '~/watchmen/reducer';

const reducer = combineReducers({
  staff: staffReducer,
  watchmen: watchmenReducer,
});

export default reducer;
