import { createSelector, Selector } from 'reselect';

import { State } from '~/redux/store';

import { feedbacksSlice, ticketsSlice, events2ticketsSlice } from './slices';
import { Feedback, EventTicket } from './types';

export const selectFeedbacksSlice = (state: State) => state.events.feedbacks;

export const selectTicketsSlice = (state: State) => state.events.tickets;

export const selectEvents2ticketsSlice = (state: State) =>
  state.events.events2tickets;

export const selectFeedbacks: Selector<State, Feedback[]> = createSelector(
  selectFeedbacksSlice,
  feedbacksSlice.selectors.selectAll
);

// TODO - reselect
export const selectEventTickets = (
  state: State,
  event_id: string
): EventTicket[] => {
  const eventTicketIdsList = events2ticketsSlice.selectors.selectById(
    selectEvents2ticketsSlice(state),
    event_id
  );
  if (!eventTicketIdsList) {
    throw new Error(`Ticket ids not found for event ${event_id}`);
  }
  return ticketsSlice.selectors.selectByIdsList(
    selectTicketsSlice(state),
    eventTicketIdsList.ticket_ids
  );
};
