import React, { useCallback, useState } from 'react';

import { Button, ControlsFooter, Modal, useNotification } from '~/frontkit';

interface Props {
  act: () => Promise<void>;
  close: () => void;
  submitButton: React.ReactNode;
  title?: string;
  cancelText?: string;
  danger?: boolean;
}

export const ConfirmModal: React.FC<Props> = ({
  act,
  close,
  children,
  submitButton,
  title = 'Вы уверены?',
  cancelText = 'Отменить',
  danger = false,
}) => {
  const [acting, setActing] = useState(false);
  const notify = useNotification();

  const wrappedAct = useCallback(async () => {
    setActing(true);
    try {
      await act();
    } catch (e) {
      notify({ text: String(e), type: 'Error' }); // TODO - display error inside modal?
      setActing(false);
      return;
    }
    close();
  }, [act, close, notify]);

  return (
    <Modal>
      <Modal.Header close={close}>{title}</Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button onClick={close}>{cancelText}</Button>
          <Button
            onClick={wrappedAct}
            loading={acting}
            disabled={acting}
            kind={danger ? 'danger' : 'primary'}
          >
            {submitButton}
          </Button>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};
