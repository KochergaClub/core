import React, { useCallback } from 'react';

import { useAPI } from '~/common/hooks';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

interface Props {
  apiEndpoint: string;
  fields: FormShape;
  entityName?: string;
  buttonName?: string;
  modalButtonName?: string;
  modalTitle?: string;
  onCreate: () => void;
}

const CreateButton = (props: Props) => {
  const api = useAPI();
  const { apiEndpoint, onCreate } = props;

  const post = useCallback(async values => {
    await api.call(apiEndpoint, 'POST', values);
    if (onCreate) {
      onCreate();
    }
  }, []);

  const modalTitle =
    props.modalTitle ||
    'Добавить' + (props.entityName ? `: ${props.entityName}` : '');
  const modalButtonName =
    props.modalButtonName || props.buttonName || 'Добавить';
  const buttonName = props.buttonName || 'Добавить';

  return (
    <ModalFormButton
      post={post}
      fields={props.fields}
      modalTitle={modalTitle}
      modalButtonName={modalButtonName}
      buttonName={buttonName}
    />
  );
};

export default CreateButton;
