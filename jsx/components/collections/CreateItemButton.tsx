import React from 'react';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

interface Props<A> {
  entityName: string;
  shape: FormShape;
  add: (item: A) => Promise<void>;
}

function CreateItemButton<A>(props: Props<A>) {
  return (
    <ModalFormButton
      post={props.add}
      buttonName="Создать"
      modalButtonName="Создать"
      modalTitle={`Создать ${props.entityName}`}
      fields={props.shape}
    />
  );
}

export default CreateItemButton;
