import React, { useState, useCallback } from 'react';

import { Button, Modal, ControlsFooter } from '@kocherga/frontkit';

import ButtonWithModal from '../ButtonWithModal';

import {
  useAPI,
  useFocusOnFirstModalRender,
  useCommonHotkeys,
} from '~/common/hooks';

interface Props {
  endpoint: string;
  id: number;
  redirectOnDelete: string;
}

interface ModalProps extends Props {
  close: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({
  endpoint,
  id,
  close,
  redirectOnDelete,
}) => {
  const api = useAPI();
  const [deleting, setDeleting] = useState(false);

  const act = useCallback(async () => {
    setDeleting(true);
    const url = `${endpoint}/${id}`;
    await api.callDelete(url);

    window.location.href = redirectOnDelete;
  }, [api, close, endpoint, id, redirectOnDelete]);

  const focus = useFocusOnFirstModalRender();
  const hotkeys = useCommonHotkeys({
    onEscape: close,
    onEnter: act,
  });

  return (
    <Modal isOpen={true}>
      <Modal.Header toggle={close}>Подтвердите действие</Modal.Header>
      <Modal.Footer ref={focus} {...hotkeys}>
        <ControlsFooter>
          <Button onClick={close}>Отмена</Button>
          <Button
            onClick={act}
            loading={deleting}
            disabled={deleting}
            kind="danger"
          >
            Удалить
          </Button>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

const DeleteButton: React.FC<Props> = props => {
  return (
    <ButtonWithModal title="Удалить">
      {({ close }) => <DeleteModal {...props} close={close} />}
    </ButtonWithModal>
  );
};

export default DeleteButton;
