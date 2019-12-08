import { PayloadAction, createSelector } from '@reduxjs/toolkit';
import { createExtendedSlice } from '~/redux/slices/utils';

interface NewUIStore {
  mode: 'new';
  context: {
    start: Date;
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
    startNewUI(_, action: PayloadAction<{ start: Date; end: Date }>) {
      return {
        mode: 'new',
        context: action.payload,
      };
    },
    startViewUI(_, action: PayloadAction<string>) {
      // TODO - forbid if mode is 'new'?
      return {
        mode: 'view',
        context: {
          event_id: action.payload,
        },
      };
    },
    startEditUI(_, action: PayloadAction<string>) {
      // TODO - forbid if mode is 'new'?
      return {
        mode: 'edit',
        context: {
          event_id: action.payload,
        },
      };
    },
    closeUI() {
      return { mode: 'passive' };
    },
  },
});

/***************** actions ********************/
export const { closeUI, startNewUI, startEditUI, startViewUI } = slice.actions;

/***************** selectors *****************/
export const selectUIState = slice.selectors.self;

export const selectUIMode = createSelector(
  selectUIState,
  uiState => uiState.mode
);

export default slice;
