import BasicFieldWidget from './BasicFieldWidget';
import ListFieldWidget from './ListFieldWidget';
import ShapeFieldWidget from './ShapeFieldWidget';
import { AnyFormValues, FieldShape } from './types';

interface Props {
  field: FieldShape;
  name: string;
  value: AnyFormValues[keyof AnyFormValues];
  hideLabel?: boolean;
}

const AnyFieldWidget: React.FC<Props> = ({ field, name, value, hideLabel }) => {
  if (field.type === 'shape') {
    if (typeof value !== 'object') {
      throw new Error(
        `Expected object value for shape widget ${name}, got: ${JSON.stringify(
          value
        )}`
      );
    }
    if (Array.isArray(value)) {
      throw new Error('Expected non-array value for shape widget');
    }
    return (
      <ShapeFieldWidget
        field={field}
        values={value || {}}
        name={name}
        hideLabel={hideLabel}
      />
    );
  } else if (field.type === 'list') {
    if (!Array.isArray(value)) {
      throw new Error(
        `Expected array value for list widget ${name}, got: ${JSON.stringify(
          value
        )}`
      );
    }
    return (
      <ListFieldWidget
        field={field}
        values={value || []}
        name={name}
        hideLabel={hideLabel}
      />
    );
  } else {
    return <BasicFieldWidget field={field} name={name} hideLabel={hideLabel} />;
  }
};

export default AnyFieldWidget;
