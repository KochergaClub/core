import React, { useCallback, useState } from 'react';

import { Button, Modal, ControlsFooter } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';

import { FormField } from './types';
import GenericForm from './GenericForm';

interface Props {
  apiEndpoint: string;
  fields: FormField[];
}

interface ModalProps extends Props {
  close: () => void;
}

const CreateModal = ({
  fields: originalFields,
  apiEndpoint,
  close,
}: ModalProps) => {
  const api = useAPI();
  const [fields, setFields] = useState(originalFields);

  const create = useCallback(async () => {
    const values: { [k: string]: string | number | undefined } = {};
    fields.forEach(field => {
      values[field.name] = field.value;
    });
    await api.call(apiEndpoint, 'POST', values);
  }, [api, fields]);

  return (
    <Modal isOpen={true}>
      <Modal.Header toggle={close}>Добавить</Modal.Header>
      <Modal.Body>
        <GenericForm fields={fields} onChange={setFields} />
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button onClick={create}>Добавить</Button>
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
