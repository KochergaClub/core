import { PayloadAction } from '@reduxjs/toolkit';
import { createExtendedSlice } from '~/redux/slices/utils';

import { State } from '~/redux/store';

import { ServerEvent, Event, serverEventToEvent } from '../types';

interface SliceState {
  byId: {
    [k: string]: ServerEvent;
  };
}

const slice = createExtendedSlice({
  name: 'events/events',
  initialState: { byId: {} } as SliceState,
  reducers: {
    add: (state, action: PayloadAction<ServerEvent>) => {
      const event = action.payload;
      state.byId[event.id] = event;
    },
  },
});

/**************** selectors ****************/
// TODO - reselect
export const selectEventById = (state: State, event_id: string): Event => {
  const sliceState = slice.selectors.self(state);
  const serverEvent = sliceState.byId[event_id];

  if (!serverEvent) {
    throw new Error(`Event ${event_id} not found in store`);
  }

  return serverEventToEvent(serverEvent);
};

/*************** actions ******************/
export const addEventToBag = slice.actions.add;

export default slice;
