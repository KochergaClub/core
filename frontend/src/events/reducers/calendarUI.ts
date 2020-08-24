import { createContext, useReducer } from 'react';

interface CalendarUIContextShape {
  dispatch: (action: Action) => void;
  state: UIState;
}

export const CalendarUIContext = createContext<CalendarUIContextShape>({
  dispatch: () => null,
  state: { mode: 'passive' },
});

interface NewUIState {
  mode: 'new';
  context: {
    start: Date; // FIXME - shouldn't store Date in context, even if for now it's for frontend only
    end: Date;
  };
}

interface EditUIState {
  mode: 'edit';
  context: {
    event_id: string;
  };
}

interface ViewUIState {
  mode: 'view';
  context: {
    event_id: string;
  };
}

interface PassiveUIState {
  mode: 'passive';
}

export type UIState = NewUIState | EditUIState | ViewUIState | PassiveUIState;

interface StartNewAction {
  type: 'START_NEW';
  payload: {
    start: Date;
    end: Date;
  };
}

interface StartViewAction {
  type: 'START_VIEW';
  payload: string;
}

interface StartEditAction {
  type: 'START_EDIT';
  payload: string;
}

interface ViewToEditAction {
  type: 'VIEW_TO_EDIT';
}

interface CloseAction {
  type: 'CLOSE';
}

type Action =
  | StartNewAction
  | StartEditAction
  | StartViewAction
  | ViewToEditAction
  | CloseAction;

export const startNewUI = (
  payload: StartNewAction['payload']
): StartNewAction => ({
  type: 'START_NEW',
  payload,
});

export const startViewUI = (
  payload: StartViewAction['payload']
): StartViewAction => ({
  type: 'START_VIEW',
  payload,
});

export const closeUI = (): CloseAction => ({
  type: 'CLOSE',
});

export const viewToEditUI = (): ViewToEditAction => ({
  type: 'VIEW_TO_EDIT',
});

const reducer = (state: UIState, action: Action): UIState => {
  switch (action.type) {
    case 'START_NEW':
      if (state.mode !== 'passive') {
        return state;
      }
      return {
        mode: 'new',
        context: action.payload,
      };
    case 'START_VIEW':
      if (state.mode !== 'passive') {
        return state;
      }
      return {
        mode: 'view',
        context: {
          event_id: action.payload,
        },
      };
    case 'START_EDIT':
      if (state.mode !== 'passive') {
        return state;
      }
      return {
        mode: 'edit',
        context: {
          event_id: action.payload,
        },
      };
    case 'VIEW_TO_EDIT':
      if (state.mode !== 'view') {
        return state;
      }
      return {
        ...state,
        mode: 'edit',
      };
    case 'CLOSE':
      return { mode: 'passive' };
  }
};

export const useCalendarUIReducer = () => {
  return useReducer(reducer, { mode: 'passive' });
};
