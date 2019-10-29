import { batch } from 'react-redux';

import { AsyncAction } from '~/redux/store';

import { selectAPI } from '~/core/selectors';
import { apiThunk } from '~/redux/action-utils';

import {
  eventsSlice,
  feedbacksSlice,
  ticketsSlice,
  events2ticketsSlice,
} from './slices';
import {
  ServerEvent,
  Feedback,
  EventTicket,
  CreateFeedbackParams,
} from './types';

export const loadEvent = (event_id: string): AsyncAction =>
  apiThunk(async (api, dispatch) => {
    const event = (await api.call(`events/${event_id}`, 'GET')) as ServerEvent;

    dispatch(eventsSlice.actions.add(event));
  });

export const loadEventFeedbacks = (event_id: string): AsyncAction =>
  apiThunk(async (api, dispatch) => {
    const tickets = (await api.call(
      `events/${event_id}/feedbacks`,
      'GET'
    )) as Feedback[];
    dispatch(feedbacksSlice.actions.replaceAll(tickets));
  });

export const addEventFeedback = (
  event_id: string,
  values: CreateFeedbackParams
): AsyncAction =>
  apiThunk(async (api, dispatch) => {
    await api.call('event_feedbacks', 'POST', {
      ...values,
      event_id,
    });
    await dispatch(loadEventFeedbacks(event_id));
  });

export const deleteEventFeedback = (
  event_id: string,
  id: number
): AsyncAction =>
  apiThunk(async (api, dispatch) => {
    await api.callDelete(`event_feedbacks/${id}`);
    await dispatch(loadEventFeedbacks(event_id));
  });

export const loadEventTickets = (event_id: string): AsyncAction => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());
  const tickets = (await api.call(
    `events/${event_id}/tickets`,
    'GET'
  )) as EventTicket[];

  batch(() => {
    dispatch(ticketsSlice.actions.addItems(tickets));
    dispatch(
      events2ticketsSlice.actions.addItems([
        {
          id: event_id,
          ticket_ids: tickets.map(ticket => ticket.id),
        },
      ])
    );
  });
};
