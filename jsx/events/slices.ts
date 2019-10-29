import { createListSlice } from '~/redux/slices/list';
import { createBagSlice } from '~/redux/slices/bag';

import {
  ServerEvent,
  Feedback,
  EventTicket,
  EventTicketIdsList,
} from './types';

export const eventsSlice = createBagSlice<ServerEvent>({
  actionPrefix: '[events/event] ',
});

export const feedbacksSlice = createListSlice<Feedback>({
  actionPrefix: '[events/feedback] ',
});

export const ticketsSlice = createBagSlice<EventTicket>({
  actionPrefix: '[events/ticket] ',
});

export const events2ticketsSlice = createBagSlice<EventTicketIdsList>({
  actionPrefix: '[events/event2tickets] ',
});
