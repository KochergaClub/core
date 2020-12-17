import { useCallback, useState } from 'react';

import { Button } from '~/frontkit';

import { ConfirmModal } from './ConfirmModal';

interface Props {
  act: () => Promise<unknown>;
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

  const openConfirm = useCallback(() => {
    setConfirming(true);
  }, []);

  const closeConfirm = useCallback(() => {
    setConfirming(false);
  }, []);

  // TODO - unify with ButtonWithModal?
  return (
    <>
      <Button
        loading={confirming}
        disabled={confirming}
        onClick={openConfirm}
        size={size}
        kind={kind}
      >
        {children}
      </Button>
      {confirming && (
        <ConfirmModal
          title={headerText}
          cancelText={cancelText}
          close={closeConfirm}
          act={act}
          submitButton={children}
        >
          {confirmText}
        </ConfirmModal>
      )}
    </>
  );
};

export default AsyncButtonWithConfirm;
