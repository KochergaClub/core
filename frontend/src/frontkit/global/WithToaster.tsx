import React, { useCallback, useContext, useReducer } from 'react';
import styled from 'styled-components';

import * as colors from '../colors';

type NotificationType = 'Error';

interface Notification {
  id: string;
  type: NotificationType;
  text: string;
}

type State = Notification[];

interface NotifyAction {
  type: 'NOTIFY';
  payload: {
    type: NotificationType;
    text: string;
  };
}

interface DismissAction {
  type: 'DISMISS';
  payload: string;
}

type Action = NotifyAction | DismissAction;

export const ToasterContext = React.createContext<React.Dispatch<Action>>(
  () => {
    // mock dispatch
  }
);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'NOTIFY':
      return [
        ...state,
        {
          id: String(state.length ? state[state.length - 1].id + 1 : 1),
          ...action.payload,
        },
      ];
    case 'DISMISS':
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
};

const ToastContainer = styled.div`
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 1500;

  > * + * {
    margin-top: 8px;
  }
`;

const ToastBox = styled.div`
  border: 1px solid ${colors.accent[500]};
  background-color: ${colors.accent[100]};
  padding: 8px;
  cursor: pointer;
`;

const Toast: React.FC<{ id: string }> = ({ id, children }) => {
  const dispatch = useContext(ToasterContext);

  const dismissCb = useCallback(() => {
    dispatch({
      type: 'DISMISS',
      payload: id,
    });
  }, [dispatch, id]);

  return <ToastBox onClick={dismissCb}>{children}</ToastBox>;
};

const ToastList = ({ toasts }: { toasts: Notification[] }) => {
  if (!toasts.length) {
    return null;
  }

  return (
    <ToastContainer>
      {toasts.map((toast, i) => (
        <Toast key={i} id={toast.id}>
          {toast.text}
        </Toast>
      ))}
    </ToastContainer>
  );
};

export const WithToaster: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <ToasterContext.Provider value={dispatch}>
      <>
        {children}
        <ToastList toasts={state} />
      </>
    </ToasterContext.Provider>
  );
};

export const useNotification = () => {
  const dispatch = useContext(ToasterContext);
  return (payload: { text: string; type: NotificationType }) =>
    dispatch({
      type: 'NOTIFY',
      payload,
    });
};
