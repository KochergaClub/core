import { combineReducers } from '@reduxjs/toolkit';

import { default as editing } from './features/editing';
import { default as datesWindow } from './features/datesWindow';
import { default as schedule } from './features/schedule';

const reducer = combineReducers({
  editing: editing.reducer,
  datesWindow: datesWindow.reducer,
  schedule: schedule.reducer,
});

export default reducer;
