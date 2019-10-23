import { createSelector, Selector } from 'reselect';

import { State } from '~/redux/store';

import { feedbacksSlice } from './slices';
import { Feedback } from './types';

export const selectFeedbacksSlice: Selector<
  State,
  ReturnType<typeof feedbacksSlice.reducer>
> = state => state.events.feedbacks;

export const selectFeedbacks: Selector<State, Feedback[]> = createSelector(
  selectFeedbacksSlice,
  feedbacksSlice.selectors.selectAll
);
