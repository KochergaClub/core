import { combineReducers } from 'redux';

import { feedbacksSlice } from './slices';

export default combineReducers({
  feedbacks: feedbacksSlice.reducer,
});
