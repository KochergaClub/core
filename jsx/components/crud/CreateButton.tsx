import React, { useCallback, useState } from 'react';

import { Button, Modal, ControlsFooter } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';

import { FormField } from './types';
import GenericForm from './GenericForm';

interface Props {
  apiEndpoint: string;
  fields: FormField[];
  displayName?: string;
}

interface ModalProps extends Props {
  close: () => void;
}

const CreateModal = ({
  fields: originalFields,
  apiEndpoint,
  close,
  displayName,
}: ModalProps) => {
  const api = useAPI();
  const [fields, setFields] = useState(originalFields);
  const [creating, setCreating] = useState(false);

  const create = useCallback(async () => {
    setCreating(true);

    const values: { [k: string]: string | number | undefined } = {};
    fields.forEach(field => {
      values[field.name] = field.value;
    });
    await api.call(apiEndpoint, 'POST', values);
    close();
  }, [api, fields]);

  return (
    <Modal isOpen={true}>
      <Modal.Header toggle={close}>
        Добавить{displayName && ': ' + displayName}
      </Modal.Header>
      <Modal.Body>
        <GenericForm fields={fields} onChange={setFields} />
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button onClick={create} loading={creating} disabled={creating}>
            Добавить
          </Button>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

const CreateButton = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <Button onClick={openModal}>Добавить</Button>
      {isOpen && <CreateModal {...props} close={closeModal} />}
    </>
  );
};

export default CreateButton;
