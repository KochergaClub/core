import React from 'react';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

import { EntityNames } from './types';

interface Props<A> {
  names?: EntityNames;
  shape: FormShape;
  add: (item: A) => Promise<void>;
}

function CreateItemButton<A>(props: Props<A>) {
  return (
    <ModalFormButton
      post={props.add}
      buttonName="Создать"
      modalButtonName="Создать"
      modalTitle={`Создать${
        props.names && props.names.genitive ? ' ' + props.names.genitive : ''
      }`}
      fields={props.shape}
    />
  );
}

export default CreateItemButton;
