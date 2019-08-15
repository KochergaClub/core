import React, { useCallback, useState } from 'react';

import { Button, ControlsFooter, Modal } from '@kocherga/frontkit';

interface Props {
  act: () => Promise<void>;
  small?: boolean;
  children?: React.ReactNode;
  confirmText: string;
}

const AsyncButtonWithConfirm = ({
  act,
  children,
  small,
  confirmText,
}: Props) => {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const askConfirm = useCallback(() => {
    setConfirming(true);
  }, []);

  const closeConfirm = useCallback(() => {
    setConfirming(false);
  }, []);

  const confirm = useCallback(async () => {
    setLoading(true);
    await act();
    setLoading(false);
    closeConfirm();
  }, [act, closeConfirm]);

  return (
    <React.Fragment>
      <Button
        loading={confirming}
        disabled={confirming}
        onClick={askConfirm}
        small={small}
      >
        {children}
      </Button>
      <Modal isOpen={confirming}>
        <Modal.Header toggle={closeConfirm}>Точно?</Modal.Header>
        <Modal.Body>{confirmText}</Modal.Body>
        <Modal.Footer>
          <ControlsFooter>
            <Button onClick={closeConfirm}>Отменить</Button>
            <Button
              onClick={confirm}
              loading={loading}
              disabled={loading}
              kind="primary"
            >
              {children}
            </Button>
          </ControlsFooter>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AsyncButtonWithConfirm;
