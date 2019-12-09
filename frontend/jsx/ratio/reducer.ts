import { combineReducers } from '@reduxjs/toolkit';

import trainers from './features/trainers';
import trainings from './features/trainings';
import trainingItem from './features/trainingItem';
import trainingTickets from './features/trainingTickets';

const reducer = combineReducers({
  trainers: trainers.reducer,
  trainings: trainings.reducer,
  trainingItem: trainingItem.reducer,
  trainingTickets: trainingTickets.reducer,
});

export default reducer;
