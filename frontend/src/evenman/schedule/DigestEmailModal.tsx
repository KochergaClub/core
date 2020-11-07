import autosize from 'autosize';
import React, { useCallback, useRef } from 'react';

import { AsyncButton, Column, ControlsFooter, Modal } from '~/frontkit';

interface Props {
  close: () => void;
  save: (text: string) => Promise<unknown>;
}

const DigestEmailModal: React.FC<Props> = ({ close, save }) => {
  const textarea = useRef<HTMLTextAreaElement>();
  const setTextarea = useCallback((node: HTMLTextAreaElement) => {
    if (node) {
      node.focus();
      autosize(node);
    }
    textarea.current = node;
  }, []);

  const submit = useCallback(async () => {
    if (!textarea.current) {
      return;
    }
    await save(textarea.current.value || '');
  }, [save]);

  return (
    <Modal>
      <Modal.Header close={close}>Текст еженедельной рассылки</Modal.Header>
      <Modal.Body>
        <Column stretch>
          <textarea ref={setTextarea} defaultValue={''} />
        </Column>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <AsyncButton act={submit} kind="primary">
            Создать черновик
          </AsyncButton>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

export default DigestEmailModal;
