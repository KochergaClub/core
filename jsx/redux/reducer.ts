import { combineReducers } from 'redux';

import coreReducer from '~/navigation/reducer';
import staffReducer from '~/staff/reducer';
import watchmenReducer from '~/watchmen/reducer';
import myReducer from '~/my/reducer';

const reducer = combineReducers({
  staff: staffReducer,
  watchmen: watchmenReducer,
  my: myReducer,
  core: coreReducer,
});

export default reducer;
