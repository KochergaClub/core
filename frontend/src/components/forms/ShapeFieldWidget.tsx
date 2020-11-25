import { Label } from '~/frontkit';

import AnyFieldWidget from './AnyFieldWidget';
import { AnyFormValues, ShapeFieldShape } from './types';

interface Props {
  field: ShapeFieldShape;
  values: AnyFormValues;
  name: string;
  hideLabel?: boolean;
}

const ShapeFieldWidget: React.FC<Props> = ({
  field,
  values,
  name,
  hideLabel,
}) => {
  return (
    <div>
      {hideLabel ? null : <Label>{field.title || field.name}</Label>}
      {field.shape.map((subfield, i) => (
        <AnyFieldWidget
          key={i}
          field={subfield}
          value={values[subfield.name]}
          name={name + '.' + subfield.name}
        />
      ))}
    </div>
  );
};

export default ShapeFieldWidget;
