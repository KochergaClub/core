import { useState } from 'react';

import { Button, Modal, ControlsFooter } from '@kocherga/frontkit';

import { Action, State } from './reducer';
import { SignMethodCalculation } from './kkmServer';

import { KKMServer } from './kkmServer';

interface Props {
  state: State;
  dispatch: (a: Action) => void;
}

export default function MainModal({ state, dispatch }: Props) {
  const [loading, setLoading] = useState(false);
  const [server] = useState(() => new KKMServer());

  const close = () => {
    dispatch({
      type: 'CANCEL_CONFIRMATION',
    });
  };

  const click = (): void => {
    const request = {
      title: state.cheque.title,
      signMethodCalculation: state.cheque.method,
      email: state.cheque.email,
      sum: state.cheque.amount,
    };

    setLoading(true);

    server.setPassword(state.password);

    server.call(
      server.getCheckRequest(request),
      (result: object) => {
        dispatch({
          type: 'SET_OUTCOME',
          payload: {
            result,
            error: {},
          },
        });
      },
      (error: object) => {
        dispatch({
          type: 'SET_OUTCOME',
          payload: {
            result: {},
            error,
          },
        });
      }
    );
  };

  return (
    <Modal isOpen={true}>
      <Modal.Header toggle={close}>Напечатать чек</Modal.Header>
      <Modal.Body>
        <header>{state.cheque.title}</header>
        <div>{state.cheque.amount} руб.</div>
        <div>{SignMethodCalculation[state.cheque.method]}</div>
        <div>{state.cheque.email}</div>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button onClick={close} disabled={loading}>
            Отменить
          </Button>
          <Button
            kind="danger"
            onClick={click}
            loading={loading}
            disabled={loading}
          >
            Напечатать
          </Button>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
}
