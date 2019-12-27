import { PayloadAction, createSelector } from '@reduxjs/toolkit';
import { createExtendedSlice } from '~/redux/slices/utils';

import { default as eventsSlice, selectServerEvents } from './events';

import { serverEventToEvent } from '../types';

interface NewUIStore {
  mode: 'new';
  context: {
    start: Date; // FIXME - shouldn't store Date in redux store, even if for now it's for frontend only
    end: Date;
  };
}

interface EditUIStore {
  mode: 'edit';
  context: {
    event_id: string;
  };
}

interface ViewUIStore {
  mode: 'view';
  context: {
    event_id: string;
  };
}

interface PassiveUIStore {
  mode: 'passive';
}

export type UIStore = NewUIStore | EditUIStore | ViewUIStore | PassiveUIStore;

const slice = createExtendedSlice({
  name: 'events/calendarUI',
  initialState: { mode: 'passive' } as UIStore,
  reducers: {
    startNewUI(state, action: PayloadAction<{ start: Date; end: Date }>) {
      if (state.mode !== 'passive') {
        return;
      }
      return {
        mode: 'new',
        context: action.payload,
      };
    },
    startViewUI(state, action: PayloadAction<string>) {
      if (state.mode !== 'passive') {
        return;
      }
      return {
        mode: 'view',
        context: {
          event_id: action.payload,
        },
      };
    },
    startEditUI(state, action: PayloadAction<string>) {
      if (state.mode !== 'passive') {
        return;
      }
      return {
        mode: 'edit',
        context: {
          event_id: action.payload,
        },
      };
    },
    switchFromViewToEditUI: {
      prepare: () => ({ payload: null }),
      reducer: state => {
        if (state.mode !== 'view') {
          return;
        }
        return {
          ...state,
          mode: 'edit',
        };
      },
    },
    closeUI() {
      return { mode: 'passive' };
    },
  },
  extraReducers: builder =>
    builder
      .addCase(eventsSlice.actions.replaceAll, (state, action) => {
        if (state.mode !== 'edit' && state.mode !== 'view') {
          return;
        }
        if (action.payload.map(e => e.id).includes(state.context.event_id)) {
          return;
        }
        // current event is missing from new events list
        return { mode: 'passive' };
      })
      .addCase(eventsSlice.actions.deleteOne, (state, action) => {
        if (state.mode !== 'edit' && state.mode !== 'view') {
          return;
        }
        if (action.payload === state.context.event_id) {
          return { mode: 'passive' };
        }
      }),
});

/***************** actions ********************/
export const {
  closeUI,
  startNewUI,
  startEditUI,
  startViewUI,
  switchFromViewToEditUI,
} = slice.actions;

/***************** selectors *****************/
export const selectUIState = slice.selectors.self;

export const selectUIMode = createSelector(
  selectUIState,
  uiState => uiState.mode
);

export const selectActiveEvent = createSelector(
  [selectUIState, selectServerEvents],
  (uiState, serverEvents) => {
    if (uiState.mode !== 'edit' && uiState.mode !== 'view') {
      return null;
    }
    const serverEvent = serverEvents[uiState.context.event_id];
    if (!serverEvent) {
      return null;
    }
    return serverEventToEvent(serverEvent);
  }
);

export const selectRangeForNewEvent = createSelector(selectUIState, uiState => {
  if (uiState.mode !== 'new') {
    throw new Error("Can't select range for non-new UI mode");
  }
  return {
    start: uiState.context.start,
    end: uiState.context.end,
  };
});

export default slice;
