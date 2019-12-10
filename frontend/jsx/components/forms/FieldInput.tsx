import Select from 'react-select';

import { Label, Input } from '@kocherga/frontkit';

import LabeledField from './LabeledField';

import { FormField, ChoiceFormField } from './types';

interface Props {
  field: FormField;
}

const FieldInputForType: React.FC<{ field: FormField; type: string }> = ({
  field,
  type,
}) => (
  <LabeledField for={field}>
    {({ field }) => <Input {...field} type={type} />}
  </LabeledField>
);

const ChoiceFieldInput: React.FC<{ field: ChoiceFormField }> = ({ field }) => {
  switch (field.widget) {
    case 'radio':
      return (
        <LabeledField for={field}>
          {({ field: formikField }) => (
            <>
              {field.options.map(option => {
                return (
                  <div key={option}>
                    <label key={option}>
                      <input
                        type="radio"
                        {...formikField}
                        checked={formikField.value === option}
                        value={option}
                      />{' '}
                      {option}
                    </label>
                  </div>
                );
              })}
            </>
          )}
        </LabeledField>
      );
    default:
      return (
        <LabeledField for={field}>
          {({ field: formikField, form }) => (
            <Select
              value={{ value: formikField.value, label: formikField.value }}
              onChange={(selected: any) => {
                // FIXME - fix type
                if (selected && !Array.isArray(selected)) {
                  form.setFieldValue(formikField.name, selected.value);
                } // TODO - else?
              }}
              options={field.options.map(option => ({
                value: option,
                label: option,
              }))}
              menuPlacement="auto"
              styles={{
                menuPortal: provided => ({ ...provided, zIndex: 1100 }),
                container: provided => ({ ...provided, width: '100%' }),
              }}
            />
          )}
        </LabeledField>
      );
  }
};

const FieldInput: React.FC<Props> = ({ field }) => {
  if (field.readonly) {
    return (
      <div>
        <Label>{field.name}</Label>
        <div>{field.value}</div>
      </div>
    );
  }
  switch (field.type) {
    case 'string':
      return <FieldInputForType field={field} type="text" />;
    case 'email':
      return <FieldInputForType field={field} type="email" />;
    case 'date':
      return <FieldInputForType field={field} type="date" />;
    case 'password':
      return <FieldInputForType field={field} type="password" />;
    case 'number':
      return (
        <LabeledField for={field}>
          {({ field: formikField }) => (
            <Input
              {...formikField}
              type="number"
              min={field.min}
              max={field.max}
            />
          )}
        </LabeledField>
      );
    case 'choice':
      return <ChoiceFieldInput field={field} />;
    case 'boolean':
      return <FieldInputForType field={field} type="checkbox" />;
  }
};

export default FieldInput;
