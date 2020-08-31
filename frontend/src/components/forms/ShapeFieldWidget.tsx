import AnyFieldWidget from './AnyFieldWidget';
import { AnyFormValues, ShapeFormField } from './types';

interface Props {
  field: ShapeFormField;
  values: AnyFormValues;
  name: string;
}

const ShapeFieldWidget: React.FC<Props> = ({ field, values, name }) => {
  return (
    <div>
      <header>shape</header>
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
