import { SignMethodCalculation } from './types';

export interface State {
  cheque: {
    email: string;
    title: string;
    amount: number;
    method: SignMethodCalculation;
  };
  outcome?: {
    result: unknown;
    error: unknown;
  };
  modalOpen: boolean;
}

interface SetEmailAction {
  type: 'SET_EMAIL';
  payload: string;
}

interface SetTitleAction {
  type: 'SET_TITLE';
  payload: string;
}

interface SetAmountAction {
  type: 'SET_AMOUNT';
  payload: number;
}

interface SetMethodAction {
  type: 'SET_METHOD';
  payload: SignMethodCalculation;
}

interface StartConfirmationAction {
  type: 'START_CONFIRMATION';
}

interface CancelConfirmationAction {
  type: 'CANCEL_CONFIRMATION';
}

export type Action =
  | SetEmailAction
  | SetTitleAction
  | SetAmountAction
  | SetMethodAction
  | StartConfirmationAction
  | CancelConfirmationAction;

export const isChequeValid = (state: State) => {
  return state.cheque.title && state.cheque.email && state.cheque.amount;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        cheque: {
          ...state.cheque,
          email: action.payload,
        },
      };
    case 'SET_TITLE':
      return {
        ...state,
        cheque: {
          ...state.cheque,
          title: action.payload,
        },
      };
    case 'SET_AMOUNT':
      return {
        ...state,
        cheque: {
          ...state.cheque,
          amount: action.payload,
        },
      };
    case 'SET_METHOD':
      return {
        ...state,
        cheque: {
          ...state.cheque,
          method: action.payload,
        },
      };
    case 'START_CONFIRMATION':
      if (!isChequeValid) {
        return state; // can't start confirmation if check is not valid
      }
      return {
        ...state,
        modalOpen: true,
      };
    case 'CANCEL_CONFIRMATION':
      return {
        ...state,
        modalOpen: false,
      };
  }
};
