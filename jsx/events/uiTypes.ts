import moment from 'moment';

import { LocalEvent } from './types';

interface NewUIStore {
  mode: 'new';
  context: {
    start: moment.Moment;
    end: moment.Moment;
  };
}

interface EditUIStore {
  mode: 'edit';
  context: {
    event: LocalEvent;
  };
}

interface PassiveUIStore {
  mode: 'passive';
}

export type UIStore = NewUIStore | EditUIStore | PassiveUIStore;

interface StartNewUIAction {
  type: 'START_NEW';
  payload: {
    start: moment.Moment;
    end: moment.Moment;
  };
}

interface StartEditUIAction {
  type: 'START_EDIT';
  payload: {
    event: LocalEvent;
  };
}

interface CloseNewUIAction {
  type: 'CLOSE_NEW';
}

export type UIAction = StartNewUIAction | StartEditUIAction | CloseNewUIAction;

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
    case 'CLOSE_NEW':
      return {
        mode: 'passive',
      };
    case 'START_EDIT':
      // TODO - forbid EDIT if mode is 'new'?
      return {
        mode: 'edit',
        context: {
          event: action.payload.event,
        },
      };
    default:
      return store;
  }
};
