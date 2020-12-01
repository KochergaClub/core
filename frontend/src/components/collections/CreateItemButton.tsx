import { FormShapeModalButton } from '~/components/forms';
import { FormShape, ShapeToValues } from '~/components/forms/types';

import { EntityNames } from './types';

interface Props<S extends FormShape> {
  names?: EntityNames;
  shape: S;
  add: (item: ShapeToValues<S>) => Promise<void>;
}

function CreateItemButton<S extends FormShape>(props: Props<S>) {
  return (
    <FormShapeModalButton
      post={props.add}
      buttonLabel="Создать"
      modalSubmitLabel="Создать"
      modalTitle={`Создать${
        props.names && props.names.genitive ? ' ' + props.names.genitive : ''
      }`}
      shape={props.shape}
    />
  );
}

export default CreateItemButton;
