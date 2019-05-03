import { LocalEvent } from './types';

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
    event: LocalEvent;
  };
}

interface ViewUIStore {
  mode: 'view';
  context: {
    event: LocalEvent;
  };
}

interface PassiveUIStore {
  mode: 'passive';
}

export type UIStore = NewUIStore | EditUIStore | ViewUIStore | PassiveUIStore;

interface StartNewUIAction {
  type: 'START_NEW';
  payload: {
    start: Date;
    end: Date;
  };
}

interface StartViewUIAction {
  type: 'START_VIEW';
  payload: {
    event: LocalEvent;
  };
}

interface StartEditUIAction {
  type: 'START_EDIT';
  payload: {
    event: LocalEvent;
  };
}

interface CloseUIAction {
  type: 'CLOSE';
}

export type UIAction =
  | StartNewUIAction
  | StartViewUIAction
  | StartEditUIAction
  | CloseUIAction;

export const initialUIState: UIStore = {
  mode: 'passive',
};

export const uiReducer = (store: UIStore, action: UIAction): UIStore => {
  switch (action.type) {
    case 'START_NEW':
      return {
        mode: 'new',
        context: {
          ...action.payload,
        },
      };
    case 'START_VIEW':
      // TODO - forbid if mode is 'new'?
      return {
        mode: 'view',
        context: {
          event: action.payload.event,
        },
      };
    case 'START_EDIT':
      // TODO - forbid if mode is 'new'?
      return {
        mode: 'edit',
        context: {
          event: action.payload.event,
        },
      };
    case 'CLOSE':
      return {
        mode: 'passive',
      };
    default:
      return store;
  }
};
