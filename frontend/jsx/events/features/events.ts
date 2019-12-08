import { createSelector, PayloadAction } from '@reduxjs/toolkit';
import { createExtendedSlice } from '~/redux/slices/utils';
import { apiThunk } from '~/redux/action-utils';

import { State } from '~/redux/store';

import {
  ServerEvent,
  ServerEventPatch,
  Event,
  NewEvent,
  serverEventToEvent,
  LocalEventWithMetadata,
} from '../types';

interface SliceState {
  byId: {
    [k: string]: ServerEvent;
  };
  saving: {
    [k: string]: boolean;
  };
}

const slice = createExtendedSlice({
  name: 'events/events',
  initialState: { byId: {} } as SliceState,
  reducers: {
    add(state, action: PayloadAction<ServerEvent>) {
      const event = action.payload;
      state.byId[event.id] = event;
    },
    replaceAll(state, action: PayloadAction<ServerEvent[]>) {
      state.saving = {};
      state.byId = {};
      for (const event of action.payload) {
        state.byId[event.id] = event;
      }
    },
    replaceOne(state, action: PayloadAction<ServerEvent>) {
      const event = action.payload;
      state.byId[event.id] = event;
      delete state.saving[event.id];
    },
    startPatching(state, action: PayloadAction<[string, ServerEventPatch]>) {
      const [id, patch] = action.payload;
      const oldEvent = state.byId[id];
      if (!oldEvent) {
        return;
      }

      state.saving[id] = true;
      state.byId[id] = {
        ...oldEvent,
        ...patch,
      };
    },
    deleteOne(state, action: PayloadAction<string>) {
      const id = action.payload;
      delete state.saving[id];
      delete state.byId[id];
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

export const selectEventsWithMetadata = createSelector(
  slice.selectors.self,
  sliceState => {
    const serverEvents = Object.values(sliceState.byId);
    const events = serverEvents.map(serverEventToEvent);
    const eventsWithMetadata: LocalEventWithMetadata[] = events.map(event => ({
      event,
      saving: sliceState.saving[event.id] || false,
    }));
    return eventsWithMetadata;
  }
);

/*************** actions ******************/
export const {
  add: addEventToBag,
  deleteOne,
  replaceAll: replaceEvents,
  replaceOne: replaceEvent,
} = slice.actions;

/*************** thunks *******************/
export const patchEvent = (event_id: string, patch: ServerEventPatch) =>
  apiThunk(async (api, dispatch, getState) => {
    const event = selectEventById(getState(), event_id);

    dispatch(slice.actions.startPatching([event_id, patch]));

    const patchedServerEvent = (await api.call(
      `event/${event.id}`,
      'PATCH',
      patch
    )) as ServerEvent;

    dispatch(slice.actions.replaceOne(patchedServerEvent));
  });

export const deleteEvent = (event_id: string) =>
  apiThunk(async (api, dispatch, getState) => {
    const event = selectEventById(getState(), event_id);

    dispatch(slice.actions.startPatching([event_id, {}]));

    await api.callDelete(`event/${event.id}`);

    dispatch(slice.actions.deleteOne(event_id));
  });

export const createEvent = (params: NewEvent) =>
  apiThunk(async (api, dispatch) => {
    const event = (await api.call('events', 'POST', params)) as ServerEvent;
    dispatch(addEventToBag(event));
  });

export default slice;
