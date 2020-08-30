import ModalFormButton from '~/components/forms/ModalFormButton';
import { AnyFormValues, FormShape } from '~/components/forms/types';

import { EntityNames } from './types';

interface Props<A extends AnyFormValues> {
  names?: EntityNames;
  shape: FormShape;
  add: (item: A) => Promise<void>;
}

function CreateItemButton<A extends AnyFormValues>(props: Props<A>) {
  return (
    <ModalFormButton
      post={props.add}
      buttonName="Создать"
      modalButtonName="Создать"
      modalTitle={`Создать${
        props.names && props.names.genitive ? ' ' + props.names.genitive : ''
      }`}
      shape={props.shape}
    />
  );
}

export default CreateItemButton;
