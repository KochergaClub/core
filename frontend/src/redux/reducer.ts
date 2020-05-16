import { combineReducers } from 'redux';

import coreReducer from '~/core/reducer';

const reducer = combineReducers({
  core: coreReducer,
});

export default reducer;
