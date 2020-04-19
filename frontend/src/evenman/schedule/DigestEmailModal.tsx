import autosize from 'autosize';

import { Modal } from '@kocherga/frontkit';
import { AsyncButton } from '~/components';
import { useRef, useCallback } from 'react';

interface Props {
  close: () => void;
  save: (text: string) => Promise<any>;
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
      <Modal.Header toggle={close}>Текст еженедельной рассылки</Modal.Header>
      <Modal.Body>
        <textarea ref={setTextarea} defaultValue={''} />
      </Modal.Body>
      <Modal.Footer>
        <AsyncButton act={submit} kind="primary">
          Создать черновик
        </AsyncButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DigestEmailModal;
