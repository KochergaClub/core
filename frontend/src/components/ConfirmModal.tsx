import React, { useState, useCallback } from 'react';

import { Button, Modal, ControlsFooter } from '@kocherga/frontkit';

interface Props {
  yes: string;
  no?: string;
  act: () => Promise<void>;
  close: () => void;
}

const ConfirmModal: React.FC<Props> = ({ yes, no, act, close, children }) => {
  const [acting, setActing] = useState(false);

  const wrappedAct = useCallback(async () => {
    setActing(true);
    await act();
    close();
  }, [act, close]);

  return (
    <Modal>
      <Modal.Header toggle={close}>Подтвердите</Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button onClick={close}>{no || 'Отмена'}</Button>
          <Button
            onClick={wrappedAct}
            loading={acting}
            disabled={acting}
            kind="danger"
          >
            {yes}
          </Button>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
