import { combineReducers } from '@reduxjs/toolkit';

import data from './features/data';

const reducer = combineReducers({
  data: data.reducer,
});

export default reducer;
