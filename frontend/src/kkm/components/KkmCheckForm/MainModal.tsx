import { useCallback, useState } from 'react';

import { Button, ControlsFooter, Modal } from '~/frontkit';

import { FormValues, SignMethodCalculation } from '../../types';

interface Props {
  values: FormValues;
  submit: () => Promise<void>;
  close: () => void;
}

export default function MainModal({ values, submit, close }: Props) {
  const [loading, setLoading] = useState(false);

  const wrappedSubmit = useCallback(async () => {
    setLoading(true);
    await submit();
  }, [submit]);

  return (
    <Modal>
      <Modal.Header close={close}>Напечатать чек</Modal.Header>
      <Modal.Body>
        <header>{values.title}</header>
        <div>{values.amount} руб.</div>
        <div>{SignMethodCalculation[values.method]}</div>
        <div>{values.email}</div>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button onClick={close} disabled={loading}>
            Отменить
          </Button>
          <Button
            kind="danger"
            onClick={wrappedSubmit}
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
