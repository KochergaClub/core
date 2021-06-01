import { motion } from 'framer-motion';
import React, { useCallback, useContext, useReducer } from 'react';

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

const Toast: React.FC<{ id: string }> = ({ id, children }) => {
  const dispatch = useContext(ToasterContext);

  const dismissCb = useCallback(() => {
    dispatch({
      type: 'DISMISS',
      payload: id,
    });
  }, [dispatch, id]);

  return (
    <motion.div
      className="bg-accent-100 py-2 px-4 cursor-pointer shadow-toast rounded break-words"
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      onClick={dismissCb}
    >
      {children}
    </motion.div>
  );
};

const ToastList = ({ toasts }: { toasts: Notification[] }) => {
  if (!toasts.length) {
    return null;
  }

  return (
    <div className="fixed left-5 bottom-5 z-50 max-w-xs space-y-2">
      {toasts.map((toast, i) => (
        <Toast key={i} id={toast.id}>
          {toast.text}
        </Toast>
      ))}
    </div>
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
