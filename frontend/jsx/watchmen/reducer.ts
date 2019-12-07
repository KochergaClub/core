import { combineReducers } from '@reduxjs/toolkit';

import { default as editing } from './features/editing';
import { default as datesWindow } from './features/datesWindow';
import { default as schedule } from './features/schedule';
import { default as watchmen } from './features/watchmen';
import { default as grades } from './features/grades';
import { default as gradesUI } from './features/gradesUI';

const reducer = combineReducers({
  editing: editing.reducer,
  datesWindow: datesWindow.reducer,
  schedule: schedule.reducer,
  watchmen: watchmen.reducer,
  grades: grades.reducer,
  gradesUI: gradesUI.reducer,
});

export default reducer;
