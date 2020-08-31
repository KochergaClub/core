import BasicFieldWidget from './BasicFieldWidget';
import ListFieldWidget from './ListFieldWidget';
import ShapeFieldWidget from './ShapeFieldWidget';
import { AnyFormValues, FormField } from './types';

interface Props {
  field: FormField;
  name: string;
  value: AnyFormValues[keyof AnyFormValues];
}

const AnyFieldWidget: React.FC<Props> = ({ field, name, value }) => {
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
    return <ShapeFieldWidget field={field} values={value || {}} name={name} />;
  } else if (field.type === 'list') {
    if (!Array.isArray(value)) {
      throw new Error(
        `Expected array value for list widget ${name}, got: ${JSON.stringify(
          value
        )}`
      );
    }
    return <ListFieldWidget field={field} values={value || []} name={name} />;
  } else {
    return <BasicFieldWidget field={field} name={name} />;
  }
};

export default AnyFieldWidget;
