import { createSelector, Selector } from 'reselect';

import { State } from '~/redux/store';

import {
  eventsSlice,
  feedbacksSlice,
  ticketsSlice,
  events2ticketsSlice,
} from './slices';
import { Event, Feedback, EventTicket, serverEventToEvent } from './types';

export const selectEventsSlice = (state: State) => state.events.events;

export const selectFeedbacksSlice = (state: State) => state.events.feedbacks;

export const selectTicketsSlice = (state: State) => state.events.tickets;

export const selectEvents2ticketsSlice = (state: State) =>
  state.events.events2tickets;

export const selectFeedbacks: Selector<State, Feedback[]> = createSelector(
  selectFeedbacksSlice,
  feedbacksSlice.selectors.selectAll
);

// TODO - reselect
export const selectEventById = (state: State, event_id: string): Event => {
  const serverEvent = eventsSlice.selectors.selectById(
    selectEventsSlice(state),
    event_id
  );

  if (!serverEvent) {
    throw new Error(`Event ${event_id} not found in store`);
  }

  return serverEventToEvent(serverEvent);
};

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
