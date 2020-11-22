import { useCallback, useState } from 'react';

import { Button, ControlsFooter, Modal, useNotification } from '~/frontkit';

interface Props {
  act: () => Promise<void>;
  size?: Parameters<typeof Button>[0]['size'];
  kind?: Parameters<typeof Button>[0]['kind'];
  children?: React.ReactNode;
  confirmText: string;
  cancelText?: string;
  headerText?: string;
}

const AsyncButtonWithConfirm = ({
  act,
  children,
  size,
  kind,
  confirmText,
  cancelText,
  headerText,
}: Props) => {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const notify = useNotification();

  const askConfirm = useCallback(() => {
    setConfirming(true);
  }, []);

  const closeConfirm = useCallback(() => {
    setConfirming(false);
  }, []);

  const confirm = useCallback(async () => {
    setLoading(true);
    try {
      await act();
    } catch (e) {
      notify({ text: String(e), type: 'Error' });
      setLoading(false);
      return;
    }
    setLoading(false);
    closeConfirm();
  }, [act, closeConfirm, notify]);

  return (
    <>
      <Button
        loading={confirming}
        disabled={confirming}
        onClick={askConfirm}
        size={size}
        kind={kind}
      >
        {children}
      </Button>
      {confirming && (
        <Modal>
          <Modal.Header close={closeConfirm}>
            {headerText ?? 'Точно?'}
          </Modal.Header>
          <Modal.Body>{confirmText}</Modal.Body>
          <Modal.Footer>
            <ControlsFooter>
              <Button onClick={closeConfirm}>{cancelText || 'Отменить'}</Button>
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
      )}
    </>
  );
};

export default AsyncButtonWithConfirm;
