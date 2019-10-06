import React, { useCallback } from 'react';

import ModalFormButton from '~/components/crud/ModalFormButton';
import { FormField } from '~/components/crud/types';

const CreateSubscribeChannelButton: React.FC = () => {
  const fields: FormField[] = [{ name: 'slug', type: 'string' }];

  const postCb = useCallback(async () => {
    // TODO - call API with checked interests
    window.alert('Not implemented');
  }, []);

  return (
    <ModalFormButton
      post={postCb}
      buttonName="Создать канал подписки"
      modalButtonName="Создать"
      modalTitle="Создать канал подписки"
      fields={fields}
    />
  );
};

export default CreateSubscribeChannelButton;
