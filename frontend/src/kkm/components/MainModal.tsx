import { useState } from 'react';

import { Button, Modal, ControlsFooter } from '@kocherga/frontkit';

import { Action, State } from '../reducer';
import { SignMethodCalculation } from '../kkmServer';

import { useKkmRegisterCheckMutation } from '../queries.generated';

interface Props {
  state: State;
  dispatch: (a: Action) => void;
}

export default function MainModal({ state, dispatch }: Props) {
  const [registerMutation] = useKkmRegisterCheckMutation();
  const [loading, setLoading] = useState(false);

  const close = () => {
    dispatch({
      type: 'CANCEL_CONFIRMATION',
    });
  };

  const click = async () => {
    const request = {
      title: state.cheque.title,
      sign_method_calculation: state.cheque.method,
      email: state.cheque.email,
      sum: state.cheque.amount,
    };

    setLoading(true);

    try {
      const result = await registerMutation({
        variables: {
          params: request,
        },
      });
      dispatch({
        type: 'SET_OUTCOME',
        payload: {
          result: result.data || {},
          error: {},
        },
      });
    } catch (e) {
      dispatch({
        type: 'SET_OUTCOME',
        payload: {
          result: {},
          error: e,
        },
      });
    }
  };

  return (
    <Modal>
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
