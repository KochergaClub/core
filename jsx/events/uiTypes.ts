import moment from 'moment';

export interface UIStore {
  modalIsOpen: boolean;
  editingStart?: moment.Moment;
  editingEnd?: moment.Moment;
}

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

export const uiReducer = (store: UIStore, action: UIAction) => {
  switch (action.type) {
    case 'START_NEW':
      return {
        ...store,
        modalIsOpen: true,
        editingStart: action.payload.start,
        editingEnd: action.payload.end,
      };
    case 'CLOSE_NEW':
      return {
        ...store,
        modalIsOpen: false,
        editingStart: undefined,
        editingEnd: undefined,
      };
    default:
      return store;
  }
};
