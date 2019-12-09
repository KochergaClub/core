import { createValueSlice } from '~/redux/slices/value';
import { apiThunk } from '~/redux/action-utils';
import { State } from '~/redux/store';

import { ServerEvent, Event } from '../types';

import { addEventToBag, selectEventById } from './events';

// stores event_id
const slice = createValueSlice<string | null>({
  name: 'events/eventPage',
  initialState: null,
});

export const loadEvent = (event_id: string) =>
  apiThunk(async (api, dispatch) => {
    const event = (await api.call(`events/${event_id}`, 'GET')) as ServerEvent;

    dispatch(addEventToBag(event));
    dispatch(slice.actions.set(event_id));
  });

export const selectEvent = (state: State): Event => {
  const id: string | null = slice.selectors.self(state);
  if (id === null) {
    throw new Error("Can't select event - none is being viewed");
  }

  return selectEventById(state, id);
};

export const selectEventId = slice.selectors.self;

export default slice;
