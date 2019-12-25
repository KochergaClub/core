import { combineReducers } from '@reduxjs/toolkit';

import { default as editing } from './features/editing';

const reducer = combineReducers({
  editing: editing.reducer,
});

export default reducer;
