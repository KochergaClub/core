import { createValueSlice } from '~/redux/slices/value';
import { apiThunk } from '~/redux/action-utils';

import { EventTicket } from '../types';

import { selectEventId } from './eventPage';

const slice = createValueSlice({
  name: 'events/eventPageTickets',
  initialState: [] as EventTicket[],
});

/******************** selectors *********************/
export const selectEventTickets = slice.selectors.self;

/******************** thunks *********************/

export const loadEventTickets = () =>
  apiThunk(async (api, dispatch, getState) => {
    const event_id = selectEventId(getState());
    const tickets = (await api.call(
      `events/${event_id}/tickets`,
      'GET'
    )) as EventTicket[];
    dispatch(slice.actions.set(tickets));
  });

export default slice;
