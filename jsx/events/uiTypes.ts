import moment from 'moment';

interface NewUIStore {
  mode: 'new';
  context: {
    start: moment.Moment;
    end: moment.Moment;
  };
}

interface PassiveUIStore {
  mode: 'passive';
}

export type UIStore = NewUIStore | PassiveUIStore;

interface StartNewUIAction {
  type: 'START_NEW';
  payload: {
    start: moment.Moment;
    end: moment.Moment;
  };
}

interface CloseNewUIAction {
  type: 'CLOSE_NEW';
}

export type UIAction = StartNewUIAction | CloseNewUIAction;

export const initialUIState = {
  modalIsOpen: false,
  editingStart: undefined,
  editingEnd: undefined,
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
    default:
      return store;
  }
};
