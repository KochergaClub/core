import { createListSlice } from '~/redux/slices/list';
import { createResourceSlice } from '~/redux/slices/resource';

import { Ticket, Training } from './types';

export const ticketsSlice = createListSlice<Ticket>({
  actionPrefix: '[ratio] TICKET',
});

export const trainingsSlice = createResourceSlice<Training>({
  url: 'ratio/training',
  actionPrefix: '[ratio] TRAINING',
});
