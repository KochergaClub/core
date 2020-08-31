import AnyFieldWidget from './AnyFieldWidget';
import { AnyFormValues, ListFormField } from './types';

interface Props {
  field: ListFormField;
  values: AnyFormValues[];
  name: string;
}

const ListFieldWidget: React.FC<Props> = ({ field, values, name }) => {
  return (
    <div>
      <header>list</header>
      {values.map((value, i) => (
        <AnyFieldWidget
          key={i}
          field={field.field}
          value={value}
          name={name + '[' + i + ']'}
        />
      ))}
    </div>
  );
};

export default ListFieldWidget;
