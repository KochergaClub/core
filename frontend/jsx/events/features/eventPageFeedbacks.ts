import { createValueSlice } from '~/redux/slices/value';
import { apiThunk } from '~/redux/action-utils';

import { CreateFeedbackParams, Feedback } from '../types';

import { selectEventId } from './eventPage';

const slice = createValueSlice({
  name: 'events/eventPageFeedbacks',
  initialState: [] as Feedback[],
});

/******************** selectors *********************/
export const selectEventFeedbacks = slice.selectors.self;

/******************** thunks *********************/

export const loadEventFeedbacks = () =>
  apiThunk(async (api, dispatch, getState) => {
    const event_id = selectEventId(getState());
    const tickets = (await api.call(
      `events/${event_id}/feedbacks`,
      'GET'
    )) as Feedback[];
    dispatch(slice.actions.set(tickets));
  });

export const addEventFeedback = (values: CreateFeedbackParams) =>
  apiThunk(async (api, dispatch, getState) => {
    const event_id = selectEventId(getState());
    await api.call('event_feedbacks', 'POST', {
      ...values,
      event_id,
    });
    await dispatch(loadEventFeedbacks());
  });

export const deleteEventFeedback = (id: number) =>
  apiThunk(async (api, dispatch) => {
    await api.callDelete(`event_feedbacks/${id}`);
    await dispatch(loadEventFeedbacks());
  });

export default slice;
