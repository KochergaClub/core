import { useCallback, useState } from 'react';

import { Button, ControlsFooter, Modal } from '~/frontkit';

interface Props {
  act: () => Promise<void>;
  size?: Parameters<typeof Button>[0]['size'];
  kind?: Parameters<typeof Button>[0]['kind'];
  small?: boolean; // deprecated
  children?: React.ReactNode;
  confirmText: string;
  cancelText?: string;
  headerText?: string;
}

const AsyncButtonWithConfirm = ({
  act,
  children,
  small,
  size,
  kind,
  confirmText,
  cancelText,
  headerText,
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
    <>
      <Button
        loading={confirming}
        disabled={confirming}
        onClick={askConfirm}
        small={small}
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
